# Project Detail Page Standard

Use an existing `/pages/projects/<project-slug>/index.html` case study as the markup starting point. Choose the closest project by system type and evidence depth; do not copy sections that the new project cannot support.

## Stable Format

- Place every project at `/pages/projects/<project-slug>/index.html` and use lowercase kebab-case for the project slug.
- Always load `/shared/css/global.css`, `/pages/projects/assets/css/case-study.css`, `/pages/projects/assets/js/case-study.js`, and `/shared/js/main.js` as the case-study foundation.
- A project may add local CSS and JavaScript under `/pages/projects/<project-slug>/assets/` when its domain benefits from a distinct identity, specialized evidence layout, custom diagram behavior, or genuinely project-specific interaction. Load local CSS after `case-study.css`; load local JavaScript without replacing the shared case-study or site initialization contracts.
- Local files must extend the shared Project system rather than copy, replace, or disable it. Preserve shared typography, colors, breadcrumbs, reading modes, navigation, theme behavior, accessibility, reduced motion, and responsive contracts.
- Keep the shared site header, footer, theme initialization, analytics metadata, and normal document navigation.
- Keep the breadcrumb order `Home / Projects / Current Project` using `.breadcrumb`. Calculate all relative paths from the project directory.
- Keep `<main class="site-main page-shell case-study-shell">` with `data-case-study-shell` and a unique `data-case-study-id`.
- Preserve the existing Article/Visual reading-mode controls and their `data-case-study-mode-value` contract. Do not replace the toggle, persistence behavior, or mode architecture.
- Keep the main case study inside `<article class="project-page" aria-labelledby="page-title">`.
- Keep `.project-header`, the project eyebrow, title, concise evidence-based summary, on-page contents, hero media, and project facts.
- Keep major chapters as semantic `.project-section` elements with unique ids, heading ids, `aria-labelledby`, and concise `data-section-navigator-label` values.
- Mark supporting sections with `data-section-navigator="subsection"` when they belong under a major chapter and should not create another desktop section-dot entry.
- Keep `.project-toc` synchronized with major case-study chapters. Do not include links to missing ids or every small subsection.
- Preserve the shared desktop section dots, mobile/tablet sticky rail, active state, keyboard navigation, smooth scrolling, and reduced-motion behavior.
- End with a retrospective or grounded outcomes when supported, related professional evidence where relevant, and `.project-nav` links back to the catalog and adjacent case studies.

## Article And Visual Modes

- Article mode is the continuous technical reading view. Keep its information architecture clear without depending on generated visual media.
- Visual mode is an alternate presentation of the same verified case-study content. It may change section rhythm, media placement, and layout emphasis, but it must not introduce different claims.
- Keep Visual-mode changes scoped under `[data-case-study-mode="visual"]`. Do not alter Article mode merely to refine Visual mode.
- Do not change `case-study.js` generated-media behavior for one project unless the shared behavior genuinely needs to change for all case studies.
- Never set `.case-study-shell` to `inline-size: 100%`; it overrides the shared page-shell constraint and can produce horizontal overflow.

## Content Structure

Choose sections according to the system and available evidence. Relevant dimensions may include:

- context and problem
- constraints and role
- users, tenants, or operational boundaries
- architecture and data design
- workflows and lifecycle states
- authorization, privacy, and security
- infrastructure and deployment
- reliability and observability
- testing and quality controls
- implementation decisions and tradeoffs
- verified outcomes
- retrospective and related work

Do not force every project to use every dimension. Capability, reasoning, constraints, and evidence must take priority over technology lists.

## Layout And Components

- Use `.project-section__split` only when two columns improve comparison or separate complementary evidence. Keep a single reading flow when the content is sequential.
- Use project facts, note lists, decision items, comparison blocks, diagrams, tables, and related links only for bounded information that benefits from those structures.
- Avoid card repetition, nested cards, decorative dashboards, generic bento layouts, and repeated call-to-action sections.
- Use section background or visual-format changes to mark meaningful chapters, not every small section.
- Keep project-specific CSS and JavaScript limited to genuinely unique media, domain presentation, or interaction. Do not duplicate the shared case-study system in a project directory.

## Local Identity

- Scope custom selectors and behavior to the project's unique `data-case-study-id`, body class, or project-owned container.
- Use local CSS to express domain-specific evidence, media composition, diagrams, or section rhythm that the shared case-study classes cannot communicate adequately.
- Use local JavaScript only for project-specific behavior that semantic HTML and CSS cannot provide. Core case-study content, links, and Article mode must remain usable without it.
- Do not recreate or bypass the Article/Visual switch, persistence, generated-media contract, theme toggle, site navigation, section navigator, or scrolling behavior.
- Project-specific Visual-mode refinements must remain scoped under `[data-case-study-mode="visual"]` together with the project identity selector.
- Do not introduce a separate font system, unrelated palette, competing icon library, duplicate dependency, or decorative animation language.
- A project's identity should come from its domain, constraints, evidence, real media, architecture, and narrative emphasis while remaining recognizably part of the Projects system.

## Evidence And Media

- Do not invent metrics, users, revenue, performance improvements, production status, uptime, team size, testimonials, or business impact.
- State qualitative outcomes as verified or observed only when the repository, public product, role page, or supplied evidence supports them.
- Prefer real product screenshots, architecture diagrams, deployment diagrams, database diagrams, workflows, and before/after evidence.
- Do not create fake product screenshots. If evidence media is unavailable, use the established placeholder convention with a temporary replacement note.
- Provide meaningful alt text, explicit image dimensions, lazy loading for below-fold media, and light/dark image pairs when the diagram requires theme-specific rendering.
- Keep repositories, live products, publications, credentials, Experience pages, and Blog articles cross-linked only when the relationship is real and explained.
- Add the project to `/pages/projects/index.html` and keep its title, status, summary, image, and route consistent with the detail page.

## Responsive And Accessibility

- Preserve semantic landmarks, logical headings, descriptive alt text, keyboard access, visible focus, and reduced-motion behavior.
- Keep metadata, tables, diagrams, code, and navigation readable at mobile, tablet, desktop, and large desktop widths.
- Restructure multi-column content on small screens rather than shrinking it until it becomes unreadable.
- Avoid horizontal page overflow, especially around `.case-study-shell`, wide diagrams, tables, and generated Visual-mode media.
