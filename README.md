# PortfolioX — Personal Portfolio Website

A responsive personal portfolio built with plain HTML, CSS, and JavaScript
(no frameworks, no build step). It showcases skills, projects, and contact
information, with a fixed sidebar nav, smooth scrolling, an active-section
indicator, and a client-side validated contact form.

## Structure

```
portfolio/
├── index.html    # Page structure and content
├── styles.css    # Layout, responsive breakpoints, design tokens
├── script.js     # Mobile nav, active-link highlighting, form validation
└── README.md
```

## Running it locally

No build tools required — just open `index.html` in a browser, or serve it
with any static server, e.g.:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Customizing

- **Content:** edit the text directly in `index.html`.
- **Colors/fonts:** all design tokens are CSS custom properties at the top
  of `styles.css` (`:root { ... }`) — change them there to retheme the site.
- **Projects:** duplicate the `<article class="project">` block in the
  Projects section to add more case studies.
- **Contact form:** the JS validates the form client-side but doesn't send
  anywhere yet. Wire it up to a service like
  [Formspree](https://formspree.io/) or your own backend by replacing the
  comment block inside the `submit` handler in `script.js`.

## Deploying to GitHub Pages

1. Create a new GitHub repository (e.g. `portfoliox`).
2. Push this folder's contents to the repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: PortfolioX"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfoliox.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`, then save.
5. Your site will be live at `https://<your-username>.github.io/portfoliox/`
   within a minute or two.

## Browser support

Uses standard, widely-supported CSS (Grid, Flexbox, custom properties) and
JavaScript (`IntersectionObserver`), so it works in all current versions of
Chrome, Firefox, Safari, and Edge.
