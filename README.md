# kaffeelisten.github.io

The Kaffeelisten landing page. Static HTML and CSS with one small script, no build step.

| File | |
|---|---|
| `index.html` | The page. German copy. |
| `styles.css` | Inks and type from the brand book, the paper layers, and the device frames. |
| `kiosk.js` | The device switch and the live kiosk: a rebuild of the app's member flow with invented sample data. Nothing is stored or sent. |
| `404.html` | Not-found page. |
| `assets/layers/` | Cut-paper layers in the language of `brand/plates/banner.png`: the plane fields, the dark and light bands, and two torn-edge masks. Drawn with the brand pipeline (`playbook/brand`), the torn paper shifted to Paper `#FAFAF9`. |
| `assets/app/` | Screens from the real app (`kaffeelisten/kaffeelisten`, `main`), rendered with invented companies and names. |
| `assets/og.jpg` | Copy of `brand/assets/og.jpg`, used for link previews. |
| `assets/logo.svg` | Copy of `brand/logo/logo.svg`. |
| `assets/fonts/` | Inter and JetBrains Mono, self-hosted. |

## Device frames

Each frame is drawn in the device's own points, so bezels, corner radii, status bars and the
Dynamic Island keep their real proportions at any width. The app screens are captured at the
viewport the app actually gets inside each device's system bars.

| Device | Screen (pt) | App viewport (pt) |
|---|---|---|
| iPad Air 11" (M3), landscape | 1180 × 820 | 1180 × 776 (24 status bar, 20 home indicator) |
| iPhone 17 Pro | 402 × 874 | 402 × 778 (62 status bar, 34 home indicator) |
| MacBook Air 13" (M4) | 1470 × 956 | 1470 × 867 (37 menu bar, 52 browser toolbar) |

## Run locally

```bash
python -m http.server 8000
```

Then open <http://localhost:8000/>.

## Publishing

`.github/workflows/pages.yml` publishes the repository root to GitHub Pages on every push to
`main`. The site is served at <https://kaffeelisten.github.io/>.

There is deliberately no `CNAME` yet. The apex `kaffeelisten.de` still serves the app on Vercel,
and moving it is a provider change made by the owner.

## Rules

- Brand assets come from `kaffeelisten/.github` or the brand pipeline. No stock imagery.
- Inks: Paper `#FAFAF9`, Ink `#1C1917`, Amber `#D97706`, plus the room's inks from the brand book.
  No customer's colour, name or logo, on the page or inside a screenshot.
- No real people's data. Screens and the kiosk use invented companies and names.
- Copy is German, calm and concrete. No emojis, no exclamation marks.
