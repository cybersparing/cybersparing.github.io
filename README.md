# CyberSparring — Website

Landing page **v0.7** for [cybersparring.eu](https://cybersparring.eu/).

**EN:** `/`  ·  **PL:** `/pl/`  ·  GitHub Pages  ·  Plain HTML/CSS/JavaScript; no build step.

## Deployment: organisation GitHub Pages

This archive is designed to be **unpacked into the repository root** of:

`cybersparing/cybersparing.github.io`

1. Create a **public** repository named exactly `cybersparing.github.io` in the `cybersparing` organisation. Create it **empty** (do not initialize with a README, since this archive includes one).
2. Unpack **all files from this ZIP into the root** of your working copy, including `assets/`, `pl/`, `.nojekyll` and `CNAME`.
3. Commit/push them to the `main` branch.
4. Under **Settings → Pages**, select **Deploy from a branch → main → /(root)**.
5. To use the custom domain, preferably first verify ownership of `cybersparring.eu` in the organisation settings, then under **Settings → Pages → Custom domain**, set `cybersparring.eu` and enable **Enforce HTTPS** once available.
6. In DNS (at your registrar), set `A` for `@` to **185.199.108.153**, **185.199.109.153**, **185.199.110.153**, **185.199.111.153**. Optionally set `www` `CNAME` to `cybersparing.github.io`.

> **Important:** Changing these DNS records switches traffic for the apex domain away from any previous web hosting. Avoid changing unrelated DNS records such as MX and TXT for email.

### Git commands (from the unpacked folder, after creating an empty repository)

```bash
git init -b main
git add .
git commit -m "Publish CyberSparring landing v0.7"
git remote add origin https://github.com/cybersparing/cybersparing.github.io.git
git push -u origin main
```

## Current appearance — approved decisions

- **TEST / RED on the left**, **TOGETHER / JOINT in the center**, **DEFEND / BLUE on the right**.
- Coral `#FFAB87`, yellow-lime `#E4F58A` with gentle glow, blue `#7DCAFF`.
- C/S reticle logo enlarged; the C/S geometry is also scaled within the reticle to avoid large margins.
- All accepted text, responsive structure, parallax, and SEO/WCAG foundations retained; pulse motion now follows the network lines.
- Footer attribution to [MagTK](https://github.com/magtk) is included as approved.

## Files

- `index.html`, `pl/index.html`: indexable EN and PL pages
- `style.css`, `app.js`: styling and decorative background/network animation
- `assets/`: approved image background and logo + icon SVGs
- `favicon.svg`: small C/S mark without reticle
- `CNAME`, `.nojekyll`: GitHub Pages configuration
- `robots.txt`, `sitemap.xml`: search engine metadata

No tracking, cookies, third-party fonts, or external JavaScript.

## Accessibility

The animations respect `prefers-reduced-motion`, links show keyboard focus, the language switch and pages have proper labels. The v0.3 audit is preserved in `AUDIT-WCAG-SEO-GEO.md`; the updated v0.7 appearance has **not** been independently certified WCAG 2.2 AA.

## Ownership / licensing

The source and artwork are **not offered under an open-source license** at this stage. Please agree on licensing explicitly before adding a `LICENSE` file. Repository visibility does not itself grant an open license.


## Aktualizacja v0.7 / Update v0.7
- C/S enlarged inside the reticle (the mark itself, not only the image dimensions).
- Motion follows the drawn network paths: short illuminated line segments replace independent glowing dots.
- Project information moved into a keyboard-accessible **About** modal beside EN / PL; open with click/Enter/Space and close with Escape or the × button.
- Existing EN/PL About copy, page order, footer credit, metadata, icons and page background retained.
- `prefers-reduced-motion` disables pulse animation and retains static connecting lines.
