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

| File | Contents |
|---|---|
| `index.html` | Welcome, areas of work, recent updates |
| `about.html` | Background, approach to engineering problems, languages |
| `skills.html` | Rated skill tables: control, electronics, embedded/automation, tools |
| `projects.html` | Project archive with contributions and repository links |
| `experience.html` | Education and team experience |
| `contact.html` | Contact details and a `mailto:` form |

## Assets

```
src/classic/classic.css   Stylesheet (bundled and hashed by Vite)
public/js/classic.js      Helper script (served verbatim)
public/images/            Photograph and other static images
```

`classic.js` handles current-tab highlighting, table striping, the footer's
last-updated date, and validation of the contact form before it is handed to the
visitor's mail program.

## Development

```bash
npm install     # install dependencies
npm run dev     # development server on http://localhost:3000
npm run build   # production build into dist/
npm run preview # serve the production build
```

Each page is registered as a separate Rollup input in `vite.config.js`; adding a
page means adding both the HTML file and an entry there.

## Editing content

All content lives directly in the HTML files — there is no data layer to edit.
The masthead, navigation, sidebar and footer blocks are repeated verbatim in each
page, so a change to any of them needs to be applied across all six.

## License

MIT
