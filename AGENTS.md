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

Use semantic HTML5.

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

Prefer the simplest appropriate styling approach.

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

Use vanilla JavaScript unless another technology is explicitly requested.

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
