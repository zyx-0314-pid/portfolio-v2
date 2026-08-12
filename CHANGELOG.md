# Changelog

All notable portfolio-level changes are recorded here.

## Version 1 - 2026-08-12

Initial baseline for the existing static portfolio website.

### Site structure

- Root landing page at `/index.html`.
- Secondary pages under `/pages/` using directory-based `index.html` routes.
- Shared styling and behavior through `/shared/css/global.css` and `/shared/js/main.js`.
- Page-local assets kept under the relevant page directories where needed.

### Top-level pages

- Home
- Projects
- Experience
- About
- Skills
- Credentials
- Notes
- Contact
- Privacy

### Project pages

Version 1 includes the Projects index and 13 project detail pages:

- `digital-governance-sucs`
- `gopick`
- `gopick-manual`
- `internal-records-storage`
- `jfp-ac-local`
- `jfp-gopick`
- `pugs`
- `saankain`
- `selebox`
- `sims`
- `talara`
- `veyra`
- `wots`

### Experience pages

Version 1 includes the Experience index and 6 experience detail pages:

- `full-stack-developer`
- `full-time-instructor`
- `iltn-holdings`
- `java-industry-immersion`
- `software-engineer-intern`
- `yenkodev-selebox`

### Credentials pages

Version 1 includes the Credentials index and 85 credential detail pages:

- 21 certification detail pages
- 64 training and program detail pages

Credential pages use the existing credential detail route pattern under:

- `/pages/credentials/certifications/`
- `/pages/credentials/training/`

### Notes pages

Version 1 includes the Notes index and 5 article pages:

- `game-balance-pygame`
- `teaching-dsa-decisions`
- `teaching-git-github`
- `teaching-reproducibility-before-deployment`
- `teaching-structure-before-frameworks`

### Shared behavior

- Theme preference handling is shared through the site script.
- Section navigation behavior is shared through `shared/js/main.js`.
- Footer Privacy links are added through shared JavaScript.
- Optional Google Analytics loading remains consent-gated.

### Metadata, schema, and crawler baseline

- Existing index pages include page-appropriate JSON-LD schema.
- `AGENTS.md` now requires future pages to include factual page-specific schema.
- `robots.txt` keeps normal indexing available while disallowing common AI and training crawlers.
- Canonical URLs and `og:url` values are intentionally not included until the production origin is confirmed.
