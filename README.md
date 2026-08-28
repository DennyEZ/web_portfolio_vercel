# Engineering Portfolio — Classic Edition

A plain, hand-coded portfolio site for **Deniz Meral**, presenting control and
automation engineering work: control systems, embedded electronics, industrial
automation and instrumentation.

This is the `classicEng_ver` branch. It is a deliberately separate edition of the
site from the gamified game-development portfolio on `main` — different audience,
different presentation, no shared styling.

## Design

The site is styled after a typical **circa-2010 professional website**:

- Fixed-width 940px centred layout, white content panel on a tiled grey background
- Two columns — main content on the left, sidebar boxes on the right
- Glossy gradient masthead and tab navigation, drop shadows, rounded corners
- Verdana body text with Georgia headings, blue underlined links
- Data presented in bordered, zebra-striped tables rather than cards
- Breadcrumb trail, "last updated" line and badge row in the footer
- Multi-page structure with real page loads — no single-page routing

No frameworks, no animation libraries, no tracking, no cookies. Just HTML, CSS
and about a hundred lines of plain JavaScript.

## Pages

English lives at the root and is the default; Turkish is a full parallel copy
under `tr/`. Each page carries an `ENG | TUR` switch in the masthead that links
to its counterpart, so the visitor stays on the same page when changing language.

| File | `tr/` counterpart | Contents |
|---|---|---|
| `index.html` | Anasayfa | Welcome, areas of work, recent updates |
| `about.html` | Hakkimda | Background, approach to engineering problems, languages |
| `skills.html` | Yetkinlikler | Rated skill tables: control, electronics, embedded/automation, tools |
| `projects.html` | Projeler | Project archive with contributions and repository links |
| `experience.html` | Deneyim | Education and team experience |
| `contact.html` | Iletisim | Contact details and a `mailto:` form |

Turkish characters are written as HTML entities so every file stays plain ASCII
and cannot be corrupted by an editor guessing the wrong encoding.

## Assets

```
src/classic/classic.css   Stylesheet (bundled and hashed by Vite)
public/js/classic.js      Helper script (served verbatim)
public/images/            Photograph and other static images
```

`classic.js` handles current-tab highlighting, table striping, the footer's
last-updated date, and validation of the contact form before it is handed to the
visitor's mail program. Its two user-facing strings and its month names are
translated; it picks the language from the `lang` attribute on `<html>`.

## Development

```bash
npm install     # install dependencies
npm run dev     # development server on http://localhost:3000
npm run build   # production build into dist/
npm run preview # serve the production build
```

Each page is registered as a separate Rollup input in `vite.config.js`; adding a
page means adding the HTML file, its `tr/` counterpart, and an entry for each.

Note that Vite resolves every *relative* `<link href>` as a build asset,
`rel="alternate"` included, which produces hashed duplicate pages. The `canonical`
and `hreflang` tags therefore use **absolute** URLs — Vite treats those as external
and passes them through untouched. If the site ever moves off `deniztm.me`, those
URLs, `public/sitemap.xml` and `public/robots.txt` all need updating.

## Small screens and printing

The desktop design is a fixed 940px two-column layout and stays exactly that on
any window wide enough to hold it — every rule for narrow screens lives in a
media query at the end of `classic.css`, so the classic presentation is never
touched. Below 980px the columns unstack; below 640px the type grows to a
readable phone size, the tabs wrap into a grid with proper tap targets, and the
data tables become stacked blocks rather than scrolling sideways.

Heading-only rows are hidden on phones via `tr:not(:has(td))`, because a stacked
skills row reads perfectly well as name / rating / where it was used. Rows that
pair a `th` label with a `td` value — the contact details — keep their label.

There is also a print stylesheet: navigation, sidebar and footer badges drop
away, leaving the content as a plain document.

## Social sharing

Every page carries Open Graph and Twitter Card tags so links shared on LinkedIn,
WhatsApp, Slack or X render a preview card rather than a bare URL. The card images
`public/images/og-en.png` and `og-tr.png` (1200x630) are rendered from
`scratch/ogcard.html`-style markup in the site's own colours; regenerate them if
the name, role or portrait changes. Like the canonical tags, the URLs in them are
absolute and assume `deniztm.me`.

## Search engines

Each language has its own indexable URL. Every page declares a `canonical` for
itself and `hreflang` alternates for both languages plus `x-default` (English), so
crawlers treat the two versions as translations of one page rather than duplicates.
`public/sitemap.xml` repeats the same annotations and is advertised in
`public/robots.txt`.

## Editing content

All content lives directly in the HTML files — there is no data layer to edit.
The masthead, navigation, sidebar and footer blocks are repeated verbatim in each
page, so a change to any of them needs to be applied across all twelve, and any
content edit needs making in both languages.

## License

MIT
