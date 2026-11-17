# CyberSparring — kontrola dostępności, SEO i GEO (v0.3)

Data: 10.11.2026. Zakres: pliki lokalne v0.2 → v0.3, wersje EN i PL.

## Zakres kontroli
- WCAG 2.2 AA: próbkowany kontrast tekstów na rzeczywistym, wielowarstwowym tle (Chromium, 1440×900 oraz 390×844, wyłączona animacja).
- Dodatkowe sprawdzenia: 320 px, nawigacja Tab/Enter, struktura semantyczna i drzewko dostępności Chromium, `prefers-reduced-motion` w kodzie, lokalna kontrola HTML, JSON-LD i XML.
- SEO/GEO: meta title/description, nagłówki, treści czytelne bez JavaScriptu, strony językowe, canonical, hreflang, sitemap, robots, JSON-LD, opisy projektu.

## Najważniejszy problem i poprawka
W v0.2 nieaktywny przycisk zmiany języka miał około **4,05:1** na komputerze, poniżej wymogu **4,5:1** dla drobnego tekstu (WCAG 1.4.3 AA). Po zwiększeniu czytelności w v0.3 pomiar próbki pokazuje minimum **8,70:1** na komputerze i **11,27:1** na telefonie.

## Przykładowe wyniki kontrastu v0.3 (minimum próbkowane)

| Element | Desktop 1440 px | Mobile 390 px |
|---|---:|---:|
| H1 | 13,15:1 | 16,44:1 |
| Slogan | 8,79:1 | 9,93:1 |
| Tekst wprowadzający | 11,99:1 | 13,26:1 |
| RED / TEST | 7,91:1 | 8,89:1 |
| JOINT / TOGETHER | 9,90:1 | 10,68:1 |
| BLUE / DEFEND | 8,64:1 | 10,24:1 |
| Stopka | 6,22:1 | 6,44:1 |
| Nieaktywny przełącznik języka | 8,70:1 | 11,27:1 |

**Metoda:** kolory wynikowe elementów zestawiono z próbkami pikseli tła w granicach ich prostokątów. Ponieważ tło jest fotograficzne i animowane, jest to analiza próbek, nie matematyczny dowód kontrastu każdego piksela ani certyfikat zgodności.

## Czytniki ekranowe i klawiatura
- Poprawne `html[lang]` dla obu podstron; jedno H1, semantyczne nagłówki, `main`, nazwany wybór języka, opisane role i dekoracje wyłączone z drzewa dostępności.
- Nawigacja po Tab i aktywacja pominięcia na Enter przenosi fokus do `#main-content`.
- Oddzielne, statyczne treści PL/EN umożliwiają odczyt także przy wyłączonym JS.
- Sprawdzone drzewko dostępności Chromium; **nie wykonano rzeczywistego manualnego testu NVDA/JAWS/VoiceOver**.

## SEO i GEO
- Oddzielne indeksowalne adresy `https://cybersparring.eu/` i `/pl/`, z `canonical` oraz `hreflang`.
- Opisane fakty o projekcie w widocznej sekcji **poniżej pierwszego ekranu**, bez zmiany zatwierdzonej makiety.
- Poprawne pliki `robots.txt`, `sitemap.xml`, schema.org `WebSite` i `WebPage` w JSON-LD.
- Nie opisujemy planowanego matchmakingu jako działającej usługi. Nie stosujemy ukrytych akapitów ani upychania słów kluczowych.
- Dane strukturalne i przejrzyste treści mogą ułatwiać rozumienie strony wyszukiwarkom i systemom generatywnym, ale **nie gwarantują indeksowania ani cytowania**.

## Do wykonania po publikacji
1. Sprawdzić zewnętrzną dostępność HTTPS i status HTTP 200 dla obu wersji językowych.
2. Zweryfikować `robots.txt`, `sitemap.xml`, linki i `canonical` na prawdziwym hostingu.
3. Uruchomić axe DevTools lub Lighthouse na opublikowanej stronie i przetestować NVDA + Chrome lub Firefox na Windows.
4. Sprawdzić nawigację przy powiększeniu tekstu, wysokim kontraście, czytelność na telefonie oraz zachowanie animacji przy `prefers-reduced-motion`.
5. Dodać stronę do Google Search Console i zgłosić sitemapę.

## Źródła
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- Kontrast 1.4.3: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- Ocena dostępności: https://www.w3.org/WAI/test-evaluate/
- Google JavaScript SEO: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Lokalizacje językowe: https://developers.google.com/search/docs/specialty/international/localized-versions
- Dane strukturalne: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
