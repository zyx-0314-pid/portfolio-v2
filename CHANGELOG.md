# Changelog

All notable portfolio-level changes are recorded here.

## Version 1.2.0 - 2026-08-12

### Owner-Only Career Tools Added

- **ATS Resume & PDF Export Builder (`/pages/resume-builder/`)**:
  - Hidden, owner-only page (`noindex, nofollow`) for customizing role profiles (Developer, DevOps, Solutions Engineer).
  - Integrates canonical education data, dynamic role-based credential star ratings (⭐ to ⭐⭐⭐), and individual experience & education item selection checkboxes.
  - Features a live simulated A4 document preview engine with page budget tracking and 1-page density controls (Comfortable, Compact, Micro Fit).
  - Client-side ATS vector PDF export via `pdfmake` CDNJS engine.

- **Cover Letter & PDF Builder (`/pages/cover-letter-builder/`)**:
  - Hidden, owner-only page (`noindex, nofollow`) for drafting tailored cover letters for Developer, DevOps, and Solutions Engineer positions.
  - Pre-fills tailored content referencing GoPick HR SaaS platforms, N-Layer architecture, Docker/AWS infrastructure, and GoPick engineering documentation.
  - Features real-time A4 document formatting, live preview sync, and client-side vector PDF export via `pdfmake`.

- **Bi-Directional Tool Navigation**:
  - Header action buttons connecting `/pages/resume-builder/` ⇄ `/pages/cover-letter-builder/` for seamless switching between career tools.

## Version 1.1.0 - 2026-08-12

### Credentials & Certifications Inventory Update

- **Complete Credential Information & Verification**:
  - Updated completion dates (`Apr 2026` / `Dec 2025`), expiration dates (`Dec 2027` for SnowPro Associate), and unique credential verification IDs across `credentials-data.js`.
  - Added direct verification links (LinkedIn Learning certificate URLs & Snowflake Accredible verification links) for all professional certifications and training courses.
  - Formatted comprehensive course descriptions, about sections, skill tags, and domain-grouped official coverage topics.

- **Issuer Images & Visual Assets**:
  - Integrated and mapped issuer logos (`docker.jpg`, `all_tech_is_human.jpg`, `kong.jpg`, `mozilla.jpg`, `github.jpg`, `snowflakes.jpg`, `pagerduty.jpg`, `microsoft.jpg`, `cybrary.jpg`, `datacamp.jpg`, `testmu.jpg`, `linkedin.jpg`) in `credential-detail.js`.

- **SEO & Schema Standardization**:
  - Standardized `<meta name="description">` tags across all credential detail pages in `/pages/credentials/certifications/` and `/pages/credentials/training/`.
  - Updated JSON-LD `@type: "EducationalOccupationalCredential"` schema definitions with factual `identifier` and `url` properties on all detail pages.

- **Editorial Refinements**:
  - Emphasized Intermediate level classification for TestMu AI Software Testing Professional Certificate (`Intermediate Professional Certificate`).
  - Removed all course duration/hour mentions across descriptions, about text, and coverage lists per design guidelines.

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
