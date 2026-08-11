# AGENTS.md

## Project Overview

This repository is a traditional static multi-page portfolio website.

The project intentionally uses simple web technologies and a conventional directory-based architecture.

Primary technologies:

* HTML5
* CSS
* Vanilla JavaScript
* Tailwind CSS through CDN when required
* Third-party browser libraries through trusted CDNs such as cdnjs when appropriate

Do not introduce application frameworks, build systems, or package managers unless explicitly requested.

---

## Repository Architecture

The root landing page is:

```text
/index.html
```

All other website pages belong under:

```text
/pages/
```

Each page must use a directory containing its own `index.html`.

Correct:

```text
/pages/about/index.html
/pages/projects/index.html
/pages/contact/index.html
```

Incorrect:

```text
/pages/about.html
/pages/projects.html
/pages/contact.html
```

Pages may contain deeper page directories when required.

Example:

```text
/pages/projects/example-project/index.html
```

Nested pages must follow the same directory + `index.html` convention.

---

## Directory Responsibilities

### `/`

Reserved for repository-level files and the main landing page.

Typical files:

```text
/index.html
/AGENTS.md
```

Do not place secondary website pages directly in the repository root.

---

### `/pages/`

Contains all pages except the landing page.

Each logical page should normally have its own directory.

Example:

```text
/pages/about/
/pages/projects/
/pages/experience/
```

A page directory may contain additional child page directories when deeper navigation is required.

---

### `/assets/`

Contains assets used specifically by the root landing page.

Typical structure:

```text
/assets/css/
/assets/js/
/assets/img/
/assets/data/
```

Do not place globally reused assets here.

---

### Page-Level `/assets/`

Pages may contain their own local assets when those resources are specific to that page or page section.

Example:

```text
/pages/projects/assets/
/pages/projects/example-project/assets/
```

Avoid creating page-level asset directories when they are unnecessary.

---

### `/shared/`

Contains resources reused across multiple pages.

Typical structure:

```text
/shared/css/
/shared/js/
/shared/img/
/shared/data/
```

Examples of appropriate shared resources:

* global styles
* navigation behavior
* footer behavior
* shared images
* reusable JSON data
* common utility scripts

Prefer a shared resource over duplicating the same file across multiple page directories.

---

## File Placement Rules

Before creating a new file, determine its scope.

Use:

```text
/assets/
```

when the resource belongs only to the root landing page.

Use:

```text
/pages/<page>/assets/
```

when the resource belongs only to that page.

Use:

```text
/shared/
```

when the resource is consumed by multiple pages.

Do not duplicate the same implementation in several directories when it can reasonably be shared.

---

## HTML Standards

Use semantic "The Living Standard". 

Every page must contain a valid document structure including:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
</body>
</html>
```

Prefer semantic elements when appropriate:

```text
header
nav
main
section
article
aside
footer
```

Avoid unnecessary wrapper elements.

Keep markup readable and properly indented.

---

## CSS Rules

Prefer the simplest appropriate styling approach. Use the latest CSS features this 2026.

Shared styling belongs in:

```text
/shared/css/
```

Page-specific styling belongs in the corresponding page's assets directory.

Do not duplicate global styles in page-specific stylesheets.

Tailwind CSS may be used through its browser/CDN distribution when requested.

Do not add:

* npm
* PostCSS
* Tailwind build tooling
* CSS preprocessors

unless explicitly requested.

---

## JavaScript Rules

Use vanilla JavaScript unless another technology is explicitly requested. Use the latest ES2025 features this 2026.

Shared behavior belongs in:

```text
/shared/js/
```

Page-specific behavior belongs in that page's assets directory.

Prefer small, focused scripts.

Avoid adding JavaScript when HTML or CSS can solve the requirement adequately.

Do not introduce JavaScript frameworks or libraries without a clear requirement.

---

## Third-Party Dependencies

Prefer browser-accessible CDN dependencies when third-party functionality is genuinely useful.

When adding a dependency:

1. Confirm that it has a clear purpose.
2. Prefer established and maintained libraries.
3. Avoid adding libraries for functionality that can be implemented simply with native HTML, CSS, or JavaScript.
4. Keep the number of dependencies small.
5. Do not add competing libraries that solve the same problem.

Do not introduce package management solely to consume a frontend dependency.

---

## Navigation and Paths

The repository contains pages at different directory depths.

Always account for the current page depth when using relative paths.

Example:

From:

```text
/index.html
```

to:

```text
/pages/about/
```

From:

```text
/pages/about/index.html
```

to the root:

```text
../../
```

From:

```text
/pages/projects/example-project/index.html
```

to the root:

```text
../../../
```

Do not assume every page has the same relative depth.

When editing navigation or shared assets, verify affected paths from each relevant page depth.

---

## Naming Conventions

Use lowercase directory and file names.

Prefer:

```text
project-name
system-design
case-study
```

Avoid:

```text
ProjectName
project_name
Project Name
```

Use kebab-case when multiple words are required.

Use descriptive names.

Avoid generic names such as:

```text
new.js
style2.css
temp.html
final-final.js
```

---

## Architecture Principles

Follow these priorities:

1. Simplicity
2. Readability
3. Maintainability
4. Clear ownership of files
5. Minimal dependencies
6. Progressive enhancement
7. Reuse without unnecessary abstraction

Do not over-engineer the project.

Do not introduce abstraction unless there is an actual repeated problem that benefits from it.

Prefer straightforward HTML, CSS, and JavaScript over complex architecture for simple requirements.

---

## Change Discipline

When modifying the repository:

1. Inspect the relevant existing files first.
2. Preserve the established directory architecture.
3. Make the smallest change that completely satisfies the task.
4. Avoid unrelated refactoring.
5. Do not rename or move existing files unless required.
6. Do not remove existing behavior without an explicit reason.
7. Reuse existing shared resources when appropriate.
8. Check references when moving or renaming resources.
9. Keep changes understandable to another developer reviewing the repository.

Do not silently change the project's architecture.

---

## Scope Control

Implement only what the current task requires.

Do not automatically add:

* frameworks
* build tools
* package managers
* TypeScript
* React
* Vue
* Next.js
* Vite
* Node.js tooling
* backend services
* databases
* authentication
* analytics
* testing frameworks
* deployment configuration

These may only be introduced when explicitly requested or when an approved task requires them.

Do not expand a simple task into a larger redesign.

---

## Validation

### Automated Validation Prohibition

Never run Playwright, browser automation, tests, test suites, linters, format checkers, static analyzers, or other automated validation/checking tools in this repository. Validation must remain source-only unless the user explicitly overrides this rule for a specific command.

After making changes:

1. Verify that affected HTML files remain valid and structurally complete.
2. Check relative links and asset paths.
3. Check navigation paths affected by the change.
4. Confirm that referenced local files exist.
5. Check the browser console when JavaScript was modified.
6. Check for obvious layout breakage when presentation was modified.
7. Remove temporary debugging code.

If automated validation is available later, run the relevant checks before considering the task complete.

---

## Codex Working Behavior

Before editing:

* inspect the affected directory
* read relevant existing files
* understand whether the resource is local or shared
* preserve existing architecture

While editing:

* keep changes focused
* follow existing conventions
* avoid unnecessary dependencies
* avoid speculative features
* do not replace working code merely to use a preferred pattern

After editing:

* review the changed files
* verify paths
* verify that no unrelated files were changed
* summarize what changed
* report any unresolved issue instead of hiding it

When requirements conflict with this document, follow the explicit task instruction and preserve the rest of these rules where possible.

## Design Direction and Anti-AI-Default Rules

This portfolio must feel intentionally designed, handcrafted, and content-driven.

The target visual character is:

- intentional
- trustworthy
- intelligent
- warm
- technical
- restrained
- editorial where appropriate
- influenced by professional developer websites from approximately 2020–2023

The website must NOT default to common AI-generated, vibe-coded, SaaS-template, or generic portfolio patterns.

The purpose of these rules is not to ban modern design techniques. It is to prevent using visual patterns without a clear information, usability, identity, or hierarchy purpose.

---

### Core Design Principle

Every visible design element must serve at least one clear purpose:

- information hierarchy
- navigation
- identity
- evidence
- usability
- readability
- grouping
- technical explanation

If an element exists only because it "looks modern", remove it.

Do not add decoration to compensate for weak composition.

Prefer:

```text
typography
spacing
alignment
contrast
borders
meaningful imagery
structural geometry
```

before introducing additional effects.

---

### Avoid Generic AI / SaaS Layout Patterns

Do not automatically introduce:

- bento grids
- card-heavy layouts
- three identical feature cards
- excessive rounded containers
- glassmorphism
- frosted panels
- glowing borders
- gradient borders
- aurora backgrounds
- blurred gradient blobs
- neon effects
- excessive shadows
- floating pills
- floating badges
- giant centered SaaS heroes
- fake dashboards
- fake browser windows
- decorative analytics charts
- testimonial sections
- customer-logo strips
- pricing-style layouts
- FAQ sections without a real need
- repeated CTA sections
- oversized marketing banners

Do not treat every content group as a card.

Use cards only when the information genuinely represents a bounded entity.

---

### Avoid Mechanical Layout Repetition

Do not make every section follow:

```text
small label
heading
paragraph
three cards
CTA
```

Do not make every section:

- exactly the same width
- exactly the same height
- exactly the same spacing
- exactly the same alignment
- exactly the same visual treatment

Controlled variation is encouraged.

Major page sections may use:

- different background surfaces
- different content widths
- different amounts of vertical spacing
- different media placement
- different text hierarchy

while still respecting the shared design system.

The page should have rhythm rather than mechanical repetition.

---

### Single-Column Instructions Must Be Respected Literally

When a task explicitly requires a single-column composition, do not reinterpret it as:

```text
text | image
```

or:

```text
content | metadata
```

at larger breakpoints.

A single-column composition means one primary vertical reading flow.

Example:

```text
heading
↓
supporting information
↓
action
↓
media
↓
next section
```

Do not create a desktop two-column layout merely to fill horizontal space.

Intentional offset decorations or metadata are acceptable only when they do not establish a second competing reading column.

---

### Avoid Excessive Centering

Do not automatically center:

- every heading
- every paragraph
- every section
- every project
- every metadata group

Centering is acceptable when appropriate to a specific composition.

Use left alignment, centered alignment, offset elements, and editorial composition deliberately.

Avoid perfect symmetry as the default solution.

---

### Structural Geometry

The portfolio may use restrained geometric elements such as:

- thin horizontal rules
- vertical rules
- partial grids
- corner brackets
- offset rectangles
- short line segments
- small squares
- subtle coordinate-like marks
- restrained dot matrices

These should reinforce the layout.

Whenever possible, align geometry with actual structure such as:

- container edges
- headings
- columns
- media edges
- section boundaries
- baselines

Do not place decorative geometry randomly.

Do not introduce:

- floating bubbles
- random circles
- arbitrary triangles
- particle fields
- decorative floating icons

Keep geometric decoration subordinate to content.

---

### Background Rhythm

Do not place the entire website on one visually identical background if section separation would improve readability.

Major narrative areas may use related background surfaces.

Use restrained variations of the established palette.

Do not alternate background color after every small section.

Background changes should represent meaningful transitions between page chapters.

Full-width background zones may contain constrained-width content.

---

### Spacing

Do not use identical vertical spacing everywhere.

Major narrative transitions should generally receive more breathing room than compact supporting sections.

Prefer generous spacing over unnecessary containers.

Do not create large empty areas without compositional purpose.

Whitespace must feel intentional rather than unfinished.

---

### Color System

Use the established semantic color system.

Primary identity:

- charcoal / near-black
- off-white
- neutral grays
- petrol teal
- brighter interaction teal

Teal is a strong identity color but must not be applied everywhere.

Do not make:

- every heading teal
- every border teal
- every icon teal
- every interactive surface bright teal

Use the strongest teal primarily for:

- interaction
- focus
- selected emphasis
- active state
- occasional important terminology

Do not introduce unrelated accent colors without a specific requirement.

Avoid purple/blue AI-style gradient palettes.

---

### Gradients

Do not use gradients as a default visual shortcut.

Avoid:

- gradient text
- gradient hero backgrounds
- aurora gradients
- glowing radial gradients
- decorative multicolor gradients

A subtle tonal gradient may be used only when:

1. it clearly supports the composition,
2. flat color cannot achieve the same effect as effectively,
3. it remains consistent with the existing palette.

---

### Typography

Use:

```text
IBM Plex Sans
IBM Plex Mono
```

IBM Plex Sans remains the primary reading font.

Use it for:

- headings
- body copy
- descriptions
- project titles
- navigation where appropriate

IBM Plex Mono provides technical identity.

Use it for:

- metadata
- dates
- labels
- breadcrumbs
- technical annotations
- technology names
- code
- small section identifiers

Do not use IBM Plex Mono for long-form paragraphs.

Do not make the website look like a terminal.

Avoid fake terminal conventions such as:

```text
$ whoami
root@
user@portfolio
> About
```

unless explicitly requested for a specific meaningful feature.

---

### Hero Design

Do not automatically make the user's name the largest message on the homepage.

Professional identity, problem-solving capability, or value may take stronger visual priority.

The user's name may appear more quietly in navigation or supporting identity areas when appropriate.

Do not assume a portfolio hero must follow:

```text
huge name
job title
paragraph
two buttons
portrait
```

Hero composition should be derived from the intended professional message.

Do not introduce a giant portrait simply because this is a personal portfolio.

---

### Content Hierarchy

The portfolio should communicate capability before technology collecting.

Prioritize:

```text
technical reasoning
system decisions
professional context
evidence
outcomes
case studies
```

before:

```text
framework logos
technology badges
tool lists
```

Technology should support the evidence, not replace it.

---

### Avoid Tool-Collector Presentation

Do not create:

- giant technology logo walls
- skill percentage bars
- `95% PHP`
- `90% JavaScript`
- skill meters
- hundreds of badges
- endless pill tags
- technology icons floating around portraits

Tools may appear contextually in:

- project case studies
- experience
- skills
- technical workflow sections

A scrolling tools rail is allowed when explicitly requested, but it remains contextual rather than evidence of expertise.

---

### Tools Rail

When implementing a continuous tools/workflow rail:

- use CSS animation
- use enough duplicated content for a seamless loop
- never expose a large empty region
- do not use `<marquee>`
- do not add an artificial end arrow
- tool names must remain readable
- do not put each tool inside a pill or card
- do not invent tools merely to fill the rail

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

When reduced motion is enabled, show the tools as static content or manually scrollable content.

---

### Images and Media

Use meaningful media.

Preferred project media includes:

- real application screenshots
- architecture diagrams
- deployment diagrams
- database diagrams
- workflow diagrams
- before/after comparisons
- relevant technical illustrations

Do not create fake product screenshots merely to make a section look complete.

Do not use generic stock images as substitutes for project evidence.

When real media is unavailable, use the established Placehold.net placeholder convention.

Add a small temporary italic helper note explaining:

- what real image should replace it
- preferred composition
- what it should communicate
- that the note must be removed when the real image is added

Use the shared placeholder-note class when available.

---

### Code Visuals

Code may be used visually when it communicates engineering identity or actual technical reasoning.

Prefer:

- real or representative meaningful code
- restrained editor-style presentation
- IBM Plex Mono
- square or very small corner radius
- thin borders
- limited syntax colors

Avoid:

- fake terminal windows
- decorative code with no meaning
- typing animations
- glowing code panels
- large rounded code cards

Do not introduce a syntax-highlighting dependency for a small decorative code example.

---

### Project Case Studies

Projects must not be reduced to:

```text
screenshot
title
tech stack
View Project
```

Deep project pages should demonstrate reasoning.

Where relevant, support:

- context
- problem
- constraints
- role
- responsibilities
- technical decisions
- architecture
- implementation
- infrastructure
- data design
- reliability
- security
- testing
- challenges
- tradeoffs
- outcomes
- retrospective

Do not force every project to use every section.

Different projects may emphasize different technical dimensions.

---

### Evidence Rules

Do not invent:

- metrics
- percentages
- user counts
- revenue
- performance improvements
- team sizes
- customer counts
- uptime
- speed improvements
- testimonials
- client logos
- business outcomes

If a measurable result exists, present it accurately.

If no numeric measurement exists, describe the concrete change instead.

Example:

Prefer:

```text
Automated the previously manual deployment process.
```

over:

```text
Improved deployment efficiency by 80%.
```

when no measurement exists.

---

### Copywriting Rules

Avoid generic AI-generated marketing language.

Do not write phrases such as:

- passionate developer
- crafting digital experiences
- transforming ideas into reality
- unlocking potential
- elevating workflows
- innovative solutions
- cutting-edge technologies
- next-generation solutions
- where creativity meets technology
- scalable solutions for tomorrow

Avoid unnecessary use of:

- seamless
- powerful
- innovative
- revolutionary
- world-class
- cutting-edge

Write concrete statements about:

- what was done
- why it was done
- what constraint existed
- what decision was made
- what changed
- what was learned

The site's voice should remain:

- calm
- professional
- direct
- concise
- analytical
- reflective

---

### Animation and Motion

Motion must have a reason.

Allowed examples:

- subtle link transitions
- theme transitions
- mobile navigation
- continuous tools rail
- restrained hover feedback

Do not introduce:

- animation on every section
- scroll reveal everywhere
- automatic fade-ins everywhere
- hover lift on every card
- glowing hover effects
- animated counters
- typing hero text
- cursor-following lights
- cursor-following blobs
- particles
- parallax
- scroll-jacking
- artificial page loaders
- cinematic page transitions

Do not add an animation library for small interactions.

Prefer CSS.

---

### Hover Behavior

Hover states must communicate interactivity, not act as decoration.

Do not:

- move every component upward on hover
- hide or reveal essential information only on hover
- drastically change layout on hover
- create interactions unavailable to touch devices

Important information must remain visible without hover.

---

### Rounded Corners

Do not use large border radii as the universal design language.

Avoid making everything:

```text
rounded-2xl
rounded-3xl
```

Prefer:

- square edges
- very small radii
- moderate radius only where semantically appropriate

Use the same small set of radius values consistently.

---

### Shadows

Prefer:

```text
spacing
contrast
borders
background differences
```

over shadows.

Do not place shadows beneath every component.

Do not use neon or colored glow shadows.

---

### Icons

Do not place an icon beside every line simply because an icon library is available.

Use icons when they improve:

- recognition
- navigation
- interaction
- scanning

Do not use emojis as generic feature icons.

Use one consistent icon system.

Use at most one identifying icon per section.

Do not reuse the same identifying icon for another section. Functional interface icons such as navigation arrows and controls may repeat when they represent the same action.

Do not introduce multiple overlapping icon libraries.

---

### Navigation

Use normal document navigation.

Prefer:

```html
<a href="...">
```

Do not introduce:

- SPA routing
- AJAX navigation
- page-transition frameworks
- JavaScript route interception

Navigation should remain understandable even when JavaScript fails.

---

### Responsive Design

Do not treat mobile as a compressed desktop design.

Validate layout independently for:

```text
mobile
tablet
desktop
large desktop
```

Avoid:

- horizontal page overflow
- desktop multi-column layouts squeezed onto mobile
- tiny metadata
- unreadable code
- overflowing navigation
- hover-only functionality

When a desktop composition cannot reasonably scale down, restructure it rather than shrinking everything.

---

### Accessibility

Accessibility is part of the design, not a later patch.

Maintain:

- semantic HTML
- logical headings
- keyboard navigation
- visible focus
- sufficient contrast
- meaningful alt text
- reduced-motion support
- accessible interactive labels

Do not remove focus indicators unless replacing them with an equally visible alternative.

Decorative shapes must:

- not intercept pointer events
- be hidden from assistive technology where appropriate

---

### No Patch-on-Patch Styling

Before changing a layout:

1. inspect the existing HTML
2. inspect the relevant CSS
3. identify rules causing the current behavior
4. remove obsolete or conflicting rules
5. implement the intended solution cleanly

Do not continuously append increasingly specific overrides.

If an old layout has been rejected, remove the rule implementing it.

Do not preserve dead styles merely because they were generated in a previous phase.

---

### Do Not Redesign Unrelated Areas

When asked to correct a specific area:

- modify that area
- modify shared behavior only when necessary
- do not redesign unrelated pages
- do not opportunistically replace existing patterns

Avoid scope expansion.

---

### Design-System Consistency

Reuse established:

- semantic colors
- typography
- spacing conventions
- border treatments
- interaction patterns
- icon language
- layout widths
- geometric language

Do not invent slightly different versions on each page.

When creating a new page, identify the closest comparable existing page and reuse its established header, layout, spacing, typography, color, and interaction language.

Do not give a new page a separate visual identity merely because it has a page-specific stylesheet. Page-specific CSS defines local composition only and must continue using the shared design system unless a distinct identity is explicitly requested.

An existing page-specific stylesheet and its established presentation may be preserved when modifying that page. Do not copy its unique treatment into new or unrelated pages unless explicitly requested.

Avoid:

- random new teal values
- random border radii
- arbitrary spacing
- duplicate button styles
- inconsistent metadata treatment

If a new reusable pattern is necessary, define it intentionally.

---

### Final Design Audit

Before completing any significant UI task, check:

1. Does every major element have a purpose?
2. Is any section becoming a generic SaaS component?
3. Are there unnecessary cards?
4. Is the layout mechanically repetitive?
5. Is important content being replaced by decoration?
6. Are technologies being used as proof instead of evidence?
7. Is any content invented?
8. Is motion necessary?
9. Does the mobile layout work independently?
10. Does light mode remain coherent?
11. Are accessibility requirements preserved?
12. Did the implementation introduce unnecessary dependencies?
13. Did the task explicitly request single-column behavior, and if so, was it preserved at all breakpoints?
14. Does the result feel like the same portfolio rather than a newly generated template?

If several elements could be removed without changing the meaning or usability of the page, simplify the design before considering the task complete.

---

### Shared Page Navigation

All website pages use the shared wide-screen section-dot navigator provided by `shared/js/main.js` and `shared/css/global.css`.

When adding or changing pages:

- keep major content regions as semantic `section` elements
- give each section an `aria-labelledby` relationship to a descriptive heading where practical
- preserve the desktop-only section dots, hover labels, active-section state, click navigation, and keyboard Up/Down navigation
- do not display the section-dot navigator at tablet or mobile widths
- preserve smooth scrolling and the reduced-motion fallback
