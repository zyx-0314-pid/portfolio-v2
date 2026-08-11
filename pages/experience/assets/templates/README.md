# Experience Detail Page Standard

Use an existing `/pages/experience/<role-slug>/index.html` page as the markup starting point for a new role. The FEU full-time instructor page is the most complete reference when the role needs several technical and evidence sections.

## Stable Format

- Place every role at `/pages/experience/<role-slug>/index.html` and use lowercase kebab-case for the role slug.
- Always load `/shared/css/global.css` and `/pages/experience/assets/css/experience.css` as the Experience detail foundation.
- A role may add local CSS and JavaScript under `/pages/experience/<role-slug>/assets/` when its professional context benefits from a distinct identity, specialized evidence layout, custom diagram, or genuinely role-specific interaction. Load local CSS after `experience.css` and local JavaScript after `/shared/js/main.js` unless earlier initialization is required.
- Local files must extend the shared Experience system rather than copy, replace, or disable it. Preserve shared typography, colors, breadcrumbs, hero hierarchy, navigation, theme behavior, accessibility, reduced motion, and responsive contracts.
- Keep the shared site header, footer, theme initialization, analytics metadata, and `/shared/js/main.js` integration.
- Keep the breadcrumb order `Home / Experience / Current Role` using `.exp-detail-nav`. Calculate all relative paths from the role directory.
- Keep the main content inside `<article class="experience-page">` so shared Experience detail rules remain active.
- Keep the hero as an `.exp-detail-hero` section containing `.exp-detail-header` and one meaningful `.exp-detail-illustration` or evidence image.
- Keep the role title, organization, verified period, and a small set of useful scope tags in the hero. Do not add unsupported team size, reach, metrics, or outcomes.
- Keep the content body inside `.exp-detail-body`. Every major narrative region must be a semantic `.exp-detail-section.exp-section` with a unique heading id and `aria-labelledby`.
- Use concise `.exp-eyebrow` labels and descriptive `.exp-section-title` headings. Section count and order must follow the actual role, not another page mechanically.
- Preserve the shared wide-screen section-dot navigator. Do not add a competing desktop contents panel.
- End with qualitative outcomes and related evidence when supported. Keep Skills, Projects, Credentials, publications, and Notes in their correct evidence categories.
- Cross-reference related Project or Blog pages only when they explain work performed in this role. Include enough context to explain the relationship.
- Keep external organization, repository, publication, and product links as normal anchors with `target="_blank"` and `rel="noopener noreferrer"` where appropriate.

## Section Treatments

Use the established Experience section treatments only when they reflect a real narrative transition:

- `exp-section--plain` for primary explanation
- `exp-section--subtle` or `exp-section--tinted` for supporting context
- `exp-section--grid` for structured standards, systems, or grouped technical content
- `exp-section--paper` for validation, documentation, or evidence-oriented material
- `exp-section--contrast` for grounded outcomes or an important transition
- `exp-section--raised` for related evidence

Do not alternate treatments mechanically. Avoid adding new colors, gradients, cards, or layout variants for one role when an existing Experience pattern already communicates the content.

## Local Identity

- Scope custom selectors to a unique body or article class so they cannot affect the Experience index or other role pages.
- Use local CSS for organization- or role-specific media composition, evidence presentation, or section rhythm that the shared classes cannot express clearly.
- Use local JavaScript only for role-specific behavior that cannot be handled with semantic HTML and CSS. The role narrative, links, and evidence must remain usable without it.
- Do not recreate the theme toggle, site navigation, section navigator, breadcrumb behavior, or shared Experience layout locally.
- Do not introduce a separate font system, unrelated palette, competing icon library, or decorative animation language.
- A role's identity should come from its organization, responsibilities, systems, evidence, imagery, and narrative emphasis while remaining recognizably part of the Experience system.

## Variable Content

The role title, organization, period, tags, hero media, section count, section headings, responsibilities, technical decisions, contribution groups, tools, outcomes, links, and related evidence should change for each role.

Include only dimensions that the role genuinely supports, such as context, scope, responsibilities, systems built, standards introduced, deployment, testing, teaching, research, leadership, operations, outcomes, or retrospective. Do not force every role to use every section.

## Evidence And Media

- Write concrete responsibilities and changes before listing technologies.
- Label unmeasured results as qualitative or observed outcomes.
- Do not invent metrics, production status, clients, team size, student reach, or business impact.
- Prefer real screenshots, diagrams, repositories, publications, and credentials.
- When real media is unavailable, use the established placeholder convention and include a temporary replacement note describing the intended image and evidence. Remove the note when real media is added.
- Add the role to `/pages/experience/index.html` and verify its link, organization, dates, and summary remain consistent with the detail page.

## Responsive And Accessibility

- Preserve semantic headings, descriptive alt text, keyboard navigation, visible focus, and sufficient contrast.
- Keep desktop compositions from being squeezed onto mobile; allow the shared Experience CSS to return structured content to one column.
- Keep essential information visible without hover.
- Verify long role titles, organization names, evidence links, and metadata can wrap without horizontal overflow.
