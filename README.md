# kaffeelisten.github.io

The Kaffeelisten landing page. Static HTML and CSS with one small script, no build step.

| File | |
|---|---|
| `index.html` | The page. German copy. |
| `styles.css` | Inks and type from the brand book. |
| `tablet.js` | The tablet preview: the member flow with invented sample data. Nothing is stored. |
| `404.html` | Not-found page. |
| `assets/plates/` | Day plates from `kaffeelisten/.github` → `brand/plates/`, resized to WebP at 1536 and 768 px. |
| `assets/og.jpg` | Copy of `brand/assets/og.jpg`, used for link previews. |
| `assets/logo.svg` | Copy of `brand/logo/logo.svg`. |
| `assets/fonts/` | Inter and JetBrains Mono, self-hosted. |

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

- Brand assets come from `kaffeelisten/.github` only. Do not draw or generate new ones here.
- Inks: Paper `#FAFAF9`, Ink `#1C1917`, Amber `#D97706`, plus the room's inks from the brand book.
  No customer's colour, name or logo.
- No real people's data. The tablet preview uses invented names.
- Copy is German, calm and concrete. No emojis, no exclamation marks.
