/* CyberSparring — guided light pulses along connected strands. No external dependencies. */
(() => {
  'use strict';
  // About is a native modal: focus stays inside it, Escape closes it, focus returns to the trigger.
  const about = document.getElementById('about-dialog');
  const open = document.querySelector('[data-about-open]');
  const close = document.querySelector('[data-about-close]');
  if (about && open && close && typeof about.showModal === 'function') {
    open.addEventListener('click', () => about.showModal());
    close.addEventListener('click', () => about.close());
    about.addEventListener('click', event => {
      if (event.target !== about) return;
      const box = about.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right ||
          event.clientY < box.top || event.clientY > box.bottom) about.close();
    });
    about.addEventListener('close', () => open.focus());
  }

  const scene = document.querySelector('.site-scene');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (scene && !reducedMotion.matches && window.matchMedia('(pointer: fine)').matches) {
    let x = 0, y = 0, scheduled = false;
    window.addEventListener('pointermove', event => {
      x = (event.clientX / innerWidth - .5) * -13;
      y = (event.clientY / innerHeight - .5) * -10;
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scene.style.setProperty('--parallax-x', `${x.toFixed(1)}px`);
        scene.style.setProperty('--parallax-y', `${y.toFixed(1)}px`);
        scheduled = false;
      });
    }, {passive:true});
  }

  const canvas = document.getElementById('impulse-network');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', {alpha:true});
  if (!ctx) return;
  const lines=[];
  let width=0, height=0, scale=1, frameId=0, lastFrame=0, visible=!document.hidden;
  const rand = seed => { const x=Math.sin(seed*79.1+2.3)*43758.5453;return x-Math.floor(x); };
  const point = (line,t) => {
    const s=1-t;
    return {x:s*s*s*line.p0.x+3*s*s*t*line.p1.x+3*s*t*t*line.p2.x+t*t*t*line.p3.x,
            y:s*s*s*line.p0.y+3*s*s*t*line.p1.y+3*s*t*t*line.p2.y+t*t*t*line.p3.y};
  };
  const warm = [255,171,135], cool = [125,202,255];
  function colorAt(x, alpha) {
    const mix = Math.max(0,Math.min(1,(x/width-.42)/.16));
    const rgb = warm.map((channel,i)=>Math.round(channel+(cool[i]-channel)*mix));
    return `rgba(${rgb.join(',')},${alpha})`;
  }
  function setup() {
    scale=Math.min(devicePixelRatio || 1,2);
    width=innerWidth; height=innerHeight;
    canvas.width=Math.round(width*scale);canvas.height=Math.round(height*scale);
    ctx.setTransform(scale,0,0,scale,0,0);
    lines.length=0;
    // Strands cross the viewport in the upper and lower bands.
    for (let side=0; side<2; side++) {
      for (let i=0;i<10;i++) {
        const top=i<5, k=i%5, base=top?.075:.79;
        const p0={x:(side===0?-.08:1.08)*width,y:(base+k*.047+.01*rand(i+side*20))*height};
        const p1={x:(side===0?.24:.76)*width,y:(base-.065+k*.048+.055*rand(i+30+side*20))*height};
        const p2={x:(side===0?.72:.28)*width,y:(base+.08+k*.03-.056*rand(i+50+side*20))*height};
        const p3={x:(side===0?1.08:-.08)*width,y:(base+.015+k*.035+.015*rand(i+70+side*20))*height};
        const n=i+10*side;
        lines.push({p0,p1,p2,p3,baseAlpha:.11+.11*rand(n+75),
          // Stagger arrivals: brief journeys followed by a quiet gap on each route.
          period:12.4+2.7*rand(n+450),journey:6.7+1.3*rand(n+230),
          delay:9*rand(n+150)});
      }
    }
  }
  function trace(line,from,to,widthPx,paint,blur,glow) {
    if (to<=from) return;
    const count=Math.max(8,Math.ceil((to-from)*88));
    ctx.beginPath();
    let pt=point(line,from);
    ctx.moveTo(pt.x,pt.y);
    for (let i=1;i<=count;i++) {
      pt=point(line,from+(to-from)*i/count);
      ctx.lineTo(pt.x,pt.y);
    }
    ctx.strokeStyle=paint;
    ctx.lineWidth=widthPx;
    ctx.lineCap='round'; ctx.lineJoin='round';
    ctx.shadowColor=blur?glow:'transparent';
    ctx.shadowBlur=blur;
    ctx.stroke();ctx.shadowBlur=0;
  }
  function baseLines() {
    for (const line of lines) {
      ctx.beginPath();ctx.moveTo(line.p0.x,line.p0.y);
      ctx.bezierCurveTo(line.p1.x,line.p1.y,line.p2.x,line.p2.y,line.p3.x,line.p3.y);
      const gradient=ctx.createLinearGradient(0,0,width,0);
      for (const stop of [0,.42,.58,1]) {
        gradient.addColorStop(stop,colorAt(stop*width,line.baseAlpha));
      }
      ctx.strokeStyle=gradient;
      ctx.lineWidth=.8;ctx.stroke();
    }
  }
  function render(now=0) {
    if (!visible || reducedMotion.matches) return;
    if (now-lastFrame < 32) {frameId=requestAnimationFrame(render);return;}
    lastFrame=now;
    ctx.clearRect(0,0,width,height);
    baseLines();
    const seconds=now/1000;
    for (const line of lines) {
      const clock=(seconds+line.delay)%line.period;
      if (clock>=line.journey) continue;
      const progress=clock/line.journey;
      // A luminous STROKE along the existing curve, never an independent flying dot.
      const a=Math.max(0,progress-.14), b=progress;
      const start=point(line,a), tip=point(line,b);
      const grad=ctx.createLinearGradient(start.x,start.y,tip.x,tip.y);
      const stops=[[0,0],[.25,.22],[.55,.82],[.80,.68],[1,0]];
      for (const [stop,alpha] of stops) {
        grad.addColorStop(stop,colorAt(start.x+(tip.x-start.x)*stop,alpha));
      }
      trace(line,a,b,3.2,grad,11,colorAt((start.x+tip.x)/2,.74));
      trace(line,a,b,1.25,grad,0);
    }
    frameId=requestAnimationFrame(render);
  }
  function start() {
    cancelAnimationFrame(frameId);
    lastFrame=0;
    if (visible && !reducedMotion.matches) frameId=requestAnimationFrame(render);
    else {ctx.clearRect(0,0,width,height);baseLines();}
  }
  window.addEventListener('resize',()=>{setup();start();},{passive:true});
  document.addEventListener('visibilitychange',()=>{visible=!document.hidden;start();});
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change',start);
  setup(); start();
})();
