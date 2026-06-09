# Contributing

This repository contains a static web resume published from the repository root with GitHub Pages.

## Local Preview

```bash
python3 -m http.server 4321
```

Open <http://localhost:4321>.

## Tests

```bash
cd tests
npm install
BASE_URL=http://localhost:4321/ npm test
```

Run the local preview server from the repository root before running the Playwright and axe checks.

## Notes

- The site entrypoint is `index.html` at the repository root.
- Static assets live in `assets/`.
- Keep the MIT license and attribution in `LICENSE` and `README.md`.
- Replace personal content and assets when adapting the template for another person.
