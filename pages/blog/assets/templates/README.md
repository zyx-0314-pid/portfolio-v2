# Blog Article Standard

Copy `article-template.html` to `/pages/blog/<article-slug>/index.html`, then replace its placeholder metadata and content.

## Stable Format

- Always load `/shared/css/global.css` and `/pages/blog/assets/css/blog-article.css` as the article foundation.
- A post may add local CSS and JavaScript under `/pages/blog/<article-slug>/assets/` when its subject benefits from a distinct identity, custom diagram, content-specific interaction, or specialized layout. Load local CSS after the shared Blog article CSS and local JavaScript after `/shared/js/main.js` unless the behavior explicitly needs earlier initialization.
- Local files must extend the shared article system rather than copy, replace, or disable it. Preserve shared typography, colors, content width, breadcrumbs, theme behavior, navigation, accessibility, reduced motion, and responsive contracts.
- Keep the `Home / Notes / Current Article` breadcrumb and the shared site header, footer, theme behavior, and `shared/js/main.js` integration.
- Keep the hero inside `.page-shell`. Full-width section backgrounds must continue edge to edge, while section content follows the same shared page width as the hero.
- Keep `article`, semantic `section` elements, unique section ids, `aria-labelledby`, and concise `data-section-navigator-label` values.
- Section count and headings are content-driven. Number sections sequentially; do not add sections merely to match another article.
- Use section mood classes only for meaningful narrative transitions. Available moods are `--plain`, `--ink`, `--grid`, `--paper`, `--recovery`, `--outcomes`, and `--closing`.
- Preserve the article's intent: establish context, explain reasoning, show evidence or structure where useful, distinguish observations from measured results, and close with a grounded lesson or source.
- Use one, two, or structured multi-column content only when the information benefits from that reading pattern. Mobile must return to one column.
- Add the published article to the Notes gallery and cross-reference it from relevant Experience or Project evidence when the relationship is real.

## Local Identity

- Scope custom selectors to a unique body or article class so they cannot affect other Blog pages.
- Use local CSS for subject-specific composition, meaningful media treatments, or section identity that cannot be expressed with the shared article classes.
- Use local JavaScript only for content-specific behavior that semantic HTML and CSS cannot provide. Keep normal links and core reading content functional when JavaScript is unavailable.
- Do not recreate the theme toggle, site navigation, section navigator, scrolling behavior, consent behavior, or shared article layout locally.
- Do not introduce unrelated colors, fonts, icon systems, dependencies, or animation patterns merely to make one article look different.
- A distinct identity must come from the article's context, evidence, diagrams, section rhythm, and information structure while remaining recognizably part of the same Notes system.

## Variable Content

The eyebrow, title, lead, facts, section count, section labels, headings, prose, diagrams, tables, story groups, outcomes, and source links should change for each article. Do not preserve placeholder content or invent evidence to fill the template.
