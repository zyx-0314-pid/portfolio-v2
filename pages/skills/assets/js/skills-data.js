/**
 * Skills Directory Data
 * Ian Cedric Ramirez Portfolio — Phase 15
 *
 * Controlled taxonomies:
 *   categories: Development · Architecture · DevOps · Infrastructure · Data ·
 *               Quality · Security · Observability · Documentation · Teaching
 *   depth:      CORE · APPLIED · PRACTICED · EXPOSURE
 *   type:       Language · Framework · Library · Database · Cloud ·
 *               Platform · Tool · Runtime · Method · Practice
 *
 * Evidence kinds:
 *   project    → links to /pages/projects/<slug>/
 *   experience → links to /pages/experience/<slug>/
 *   credential → links to /pages/credentials/
 *   training   → links to /pages/credentials/
 */

window.SKILLS_DATA = [

  /* ─────────────────────────────────────────
     JAVASCRIPT
  ───────────────────────────────────────── */
  {
    id: "javascript",
    name: "JavaScript",
    categories: ["Development"],
    type: "Language",
    depth: "CORE",
    lastApplied: 2026,
    summary: "Front-end and back-end scripting across multiple production systems. Primary language across all full-stack roles.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Front-end data handling, async API calls, real-time updates." },
      { kind: "project", label: "SeLeBox", url: "../projects/selebox/", note: "Social platform front-end interactions and media upload flows." },
      { kind: "project", label: "GoPick Manual", url: "../projects/gopick-manual/", note: "Offline-capable documentation interface scripting." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Primary scripting language across all delivered features." },
      { kind: "experience", label: "Full-Stack Developer — YenkoDev / SeLeBox", url: "../experience/yenkodev-selebox/", note: "Front-end application logic and API integration." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Taught JavaScript as a core course subject." }
    ]
  },

  {
    id: "typescript",
    name: "TypeScript",
    categories: ["Development"],
    type: "Language",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Typed application development with strict mode. Used in production back-end services and tooling.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "TypeScript used for type-safe API service and data model layers." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Maintained TypeScript-typed back-end modules and interfaces." }
    ]
  },

  {
    id: "python",
    name: "Python",
    categories: ["Development", "DevOps", "Data"],
    type: "Language",
    depth: "APPLIED",
    lastApplied: 2025,
    summary: "Scripting, automation, and data processing. Applied in cloud automation training and early professional work.",
    evidence: [
      { kind: "training", label: "AWS re/Start Training Graduate", url: "../credentials/", note: "Python scripting for infrastructure automation and relational database operations." },
      { kind: "experience", label: "Software Engineer Intern — Argon Software", url: "../experience/software-engineer-intern/", note: "Used Python in automation and tooling context." }
    ]
  },

  {
    id: "php",
    name: "PHP",
    categories: ["Development"],
    type: "Language",
    depth: "APPLIED",
    lastApplied: 2025,
    summary: "Server-side web application development. Applied across WordPress-based systems and internal web tools.",
    evidence: [
      { kind: "experience", label: "Web Developer & IT Operations — ILTN Holdings", url: "../experience/iltn-holdings/", note: "WordPress and custom PHP configuration for business web systems." }
    ]
  },

  {
    id: "java",
    name: "Java",
    categories: ["Development"],
    type: "Language",
    depth: "APPLIED",
    lastApplied: 2025,
    summary: "Enterprise back-end application development with the Spring ecosystem.",
    evidence: [
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "Java Spring Boot back-end for QR-based storage and records management." },
      { kind: "experience", label: "Java Industry Immersion Trainee — Spring Valley Tech", url: "../experience/java-industry-immersion/", note: "Full-stack Java development using Spring Boot and MVC architecture." }
    ]
  },

  {
    id: "html",
    name: "HTML",
    categories: ["Development"],
    type: "Language",
    depth: "CORE",
    lastApplied: 2026,
    summary: "Semantic markup for web interfaces and documentation. Applied in every web-facing deliverable.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Structured UI views and data interfaces." },
      { kind: "project", label: "SeLeBox", url: "../projects/selebox/", note: "Social platform view templates." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Taught HTML as a core subject." }
    ]
  },

  {
    id: "css",
    name: "CSS",
    categories: ["Development"],
    type: "Language",
    depth: "CORE",
    lastApplied: 2026,
    summary: "Styling systems, responsive design, and component-level presentation.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "UI design system and responsive layout." },
      { kind: "project", label: "SeLeBox", url: "../projects/selebox/", note: "Social platform component styles." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Taught CSS as a core subject." }
    ]
  },

  {
    id: "sql",
    name: "SQL",
    categories: ["Data", "Development"],
    type: "Language",
    depth: "CORE",
    lastApplied: 2026,
    summary: "Relational database design, querying, migrations, and reporting. Applied across PostgreSQL and MySQL in production systems.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Transactional queries, schema design, and assessment data reporting." },
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "Record storage and retrieval queries." },
      { kind: "training", label: "AWS re/Start Training Graduate", url: "../credentials/", note: "SQL operations as part of cloud automation curriculum." }
    ]
  },

  /* ─────────────────────────────────────────
     FRAMEWORKS
  ───────────────────────────────────────── */
  {
    id: "react",
    name: "React",
    categories: ["Development"],
    type: "Framework",
    depth: "CORE",
    lastApplied: 2026,
    summary: "Component-based UI development. Applied extensively across full-stack projects and HR assessment platforms.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Component architecture, state management, data-driven assessment UI." },
      { kind: "project", label: "SeLeBox", url: "../projects/selebox/", note: "Social platform feed, messaging, and media upload flows." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Primary front-end framework for production features." },
      { kind: "experience", label: "Full-Stack Developer — YenkoDev / SeLeBox", url: "../experience/yenkodev-selebox/", note: "Social platform front-end development." }
    ]
  },

  {
    id: "nextjs",
    name: "Next.js",
    categories: ["Development", "Architecture"],
    type: "Framework",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Full-stack React framework with server-side rendering and API routing.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Server-side rendering, API routes, and full-stack integration." },
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Selective rendering strategy for authenticated and data-dependent operational workflows." },
      { kind: "experience", label: "Software Engineer Intern — Argon Software", url: "../experience/software-engineer-intern/", note: "Web application work across React, Next.js, Laravel, and React Native." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Delivered production features within Next.js architecture." }
    ]
  },

  {
    id: "laravel",
    name: "Laravel",
    categories: ["Development", "Architecture"],
    type: "Framework",
    depth: "PRACTICED",
    lastApplied: 2023,
    summary: "PHP application framework used in internship web application work and later instructional context.",
    evidence: [
      { kind: "experience", label: "Software Engineer Intern — Argon Software", url: "../experience/software-engineer-intern/", note: "Built web applications across Laravel, React, Next.js, and React Native." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Included Laravel in full-stack teaching and technology coverage." }
    ]
  },

  {
    id: "codeigniter",
    name: "CodeIgniter 4",
    categories: ["Development", "Teaching"],
    type: "Framework",
    depth: "APPLIED",
    lastApplied: 2025,
    summary: "PHP framework used for standardized instructional templates and Dockerized classroom environments.",
    evidence: [
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Built a Dockerized CodeIgniter 4 template with application, database, and Redis services." }
    ]
  },

  {
    id: "react-native",
    name: "React Native",
    categories: ["Development"],
    type: "Framework",
    depth: "PRACTICED",
    lastApplied: 2023,
    summary: "Mobile application development exposure through internship work across the React ecosystem.",
    evidence: [
      { kind: "experience", label: "Software Engineer Intern — Argon Software", url: "../experience/software-engineer-intern/", note: "Contributed in a stack that included Laravel, React, Next.js, and React Native." }
    ]
  },

  {
    id: "spring-boot",
    name: "Spring Boot",
    categories: ["Development", "Architecture"],
    type: "Framework",
    depth: "APPLIED",
    lastApplied: 2025,
    summary: "Enterprise Java back-end services. Applied in records management and industry immersion systems.",
    evidence: [
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "REST API services, JPA repositories, and layered back-end structure." },
      { kind: "experience", label: "Java Industry Immersion Trainee — Spring Valley Tech", url: "../experience/java-industry-immersion/", note: "Full Spring MVC and Boot pattern application." }
    ]
  },

  {
    id: "nodejs",
    name: "Node.js",
    categories: ["Development", "Architecture"],
    type: "Runtime",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "JavaScript runtime for server-side application logic, API services, and build tooling.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Back-end API runtime and service execution environment." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Maintained Node.js application services." }
    ]
  },

  /* ─────────────────────────────────────────
     DATABASES
  ───────────────────────────────────────── */
  {
    id: "postgresql",
    name: "PostgreSQL",
    categories: ["Data", "Development"],
    type: "Database",
    depth: "CORE",
    lastApplied: 2026,
    summary: "Primary relational database in production systems. Schema design, indexing, query optimization, and migrations.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Core transactional database for assessment and HR data." },
      { kind: "project", label: "SeLeBox", url: "../projects/selebox/", note: "User, content, and relationship data persistence." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Managed production PostgreSQL schema and migrations." }
    ]
  },

  {
    id: "mysql",
    name: "MySQL",
    categories: ["Data", "Development"],
    type: "Database",
    depth: "APPLIED",
    lastApplied: 2025,
    summary: "Relational database used in Java Spring and web projects.",
    evidence: [
      { kind: "project", label: "SIMS — Student Information Management System", url: "../projects/sims/", note: "Relational database for student profiles, achievements, organizations, and role-based department workflows." },
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "Database for storage record tracking and QR lookup." },
      { kind: "experience", label: "Software Engineer Intern — Argon Software", url: "../experience/software-engineer-intern/", note: "Web application database persistence." }
    ]
  },

  {
    id: "redis",
    name: "Redis",
    categories: ["Data", "Infrastructure"],
    type: "Platform",
    depth: "PRACTICED",
    lastApplied: 2025,
    summary: "In-memory service used in Dockerized instructional environments and legacy platform context.",
    evidence: [
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Prepared CodeIgniter 4 classroom environments with application, database, and Redis services." },
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Appears in the verified legacy modernization stack context for HR assessment systems." }
    ]
  },

  {
    id: "neondb",
    name: "NeonDB",
    categories: ["Data", "Infrastructure"],
    type: "Platform",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Managed PostgreSQL platform used for operational application persistence and connection pooling.",
    evidence: [
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Primary persistence layer for resource, reservation, maintenance, and organizational data." },
      { kind: "project", label: "Veyra", url: "../projects/veyra/", note: "Used with Postgres connection pooling in the multi-tenant feedback platform architecture." }
    ]
  },

  {
    id: "snowflake",
    name: "Snowflake",
    categories: ["Data", "Cloud"],
    type: "Platform",
    depth: "PRACTICED",
    lastApplied: 2025,
    summary: "Cloud data warehouse for analytical queries, role-based access, and structured data sharing.",
    evidence: [
      { kind: "credential", label: "Snowflake SnowPro Associate", url: "../credentials/", note: "Validated data loading, RBAC, analytics, and data protection." },
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Analytical data patterns applied from Snowflake training." }
    ]
  },

  /* ─────────────────────────────────────────
     DEVOPS / INFRASTRUCTURE
  ───────────────────────────────────────── */
  {
    id: "docker",
    name: "Docker",
    categories: ["DevOps", "Infrastructure"],
    type: "Platform",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Container image builds, Docker Compose multi-service environments, and environment isolation.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Containerized application runtime and local dev stack." },
      { kind: "project", label: "SeLeBox", url: "../projects/selebox/", note: "Multi-container development environment." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Maintained production Docker container environments." },
      { kind: "credential", label: "Docker Foundations Professional Certificate", url: "../credentials/", note: "Validated containerization, image builds, volumes, and Compose." }
    ]
  },

  {
    id: "gcp",
    name: "Google Cloud Platform",
    categories: ["Infrastructure", "Cloud", "DevOps"],
    type: "Cloud",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Cloud infrastructure management, IAM, compute, storage, and deployment pipelines.",
    evidence: [
      { kind: "credential", label: "Google Cloud Associate Cloud Engineer", url: "../credentials/", note: "Validated cloud solution planning, operation, access, and security." },
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Cloud infrastructure deployment and environment configuration." },
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "Cloud storage bucket access and service account permissions." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Managed production GCP-hosted infrastructure." }
    ]
  },

  {
    id: "aws",
    name: "Amazon Web Services",
    categories: ["Infrastructure", "Cloud"],
    type: "Cloud",
    depth: "PRACTICED",
    lastApplied: 2025,
    summary: "Core cloud services including EC2, S3, VPC, and IAM from structured training.",
    evidence: [
      { kind: "training", label: "AWS re/Start Training Graduate", url: "../credentials/", note: "Completed hands-on cohort covering EC2, S3, VPC, IAM, Linux, Python, and networking." }
    ]
  },

  {
    id: "nginx",
    name: "Nginx",
    categories: ["Infrastructure", "DevOps"],
    type: "Tool",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Reverse proxy configuration and static asset serving in production environments.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Reverse proxy and production request routing." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Nginx configuration for hosted production services." }
    ]
  },

  {
    id: "linux",
    name: "Linux",
    categories: ["Infrastructure", "DevOps"],
    type: "Platform",
    depth: "APPLIED",
    lastApplied: 2025,
    summary: "Command-line administration, shell scripting, permissions, and process management.",
    evidence: [
      { kind: "training", label: "AWS re/Start Training Graduate", url: "../credentials/", note: "Linux system administration as part of cloud readiness curriculum." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Linux server management for production environments." }
    ]
  },

  {
    id: "git",
    name: "Git",
    categories: ["Development", "DevOps"],
    type: "Tool",
    depth: "CORE",
    lastApplied: 2026,
    summary: "Version control across all development work. Branch strategies, code review, and release management.",
    evidence: [
      { kind: "credential", label: "GitHub Foundations", url: "../credentials/", note: "Validated branching, collaboration, Actions, and security." },
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "GitHub Flow, branch protection, and pull request reviews." },
      { kind: "project", label: "SeLeBox", url: "../projects/selebox/", note: "Multi-contributor branch management and issue tracking." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Standardized team repository collaboration and CI/CD pipelines." }
    ]
  },

  {
    id: "cicd",
    name: "CI/CD",
    categories: ["DevOps", "Quality"],
    type: "Practice",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Automated build, test, and deployment pipelines. Applied with GitHub Actions and cloud-hosted environments.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Automated deployment pipelines and environment promotion." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Built and maintained CI/CD workflows for production delivery." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Introduced automated deployment workflows in teaching templates." }
    ]
  },

  {
    id: "github-actions",
    name: "GitHub Actions",
    categories: ["DevOps"],
    type: "Tool",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Workflow automation for CI/CD, scheduled jobs, and deployment pipelines.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "CI/CD pipeline automation." },
      { kind: "credential", label: "GitHub Foundations", url: "../credentials/", note: "Validated Actions workflow syntax, secrets, and CI/CD basics." }
    ]
  },

  {
    id: "vercel",
    name: "Vercel",
    categories: ["DevOps", "Infrastructure"],
    type: "Platform",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Production hosting and deployment platform for Next.js and React applications.",
    evidence: [
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Production hosting target for the operations platform." },
      { kind: "project", label: "Veyra", url: "../projects/veyra/", note: "Deployment platform in the feedback and review-management SaaS stack." },
      { kind: "project", label: "SeLeBox", url: "../projects/selebox/", note: "Deployment platform for the React social platform frontend." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Included Vercel in deployment platform coverage." }
    ]
  },

  {
    id: "appwrite",
    name: "Appwrite",
    categories: ["Development", "Infrastructure", "Data"],
    type: "Platform",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Backend-as-a-service platform for storage, application services, and data-backed product workflows.",
    evidence: [
      { kind: "project", label: "SeLeBox", url: "../projects/selebox/", note: "Integrated Appwrite services and storage during the platform's Firebase-to-Appwrite transition." },
      { kind: "project", label: "Veyra", url: "../projects/veyra/", note: "Application backend platform for multi-tenant feedback, moderation, audit, and QR workflows." }
    ]
  },

  {
    id: "firebase",
    name: "Firebase",
    categories: ["Development", "Infrastructure"],
    type: "Platform",
    depth: "PRACTICED",
    lastApplied: 2024,
    summary: "Backend service platform encountered in existing application maintenance and migration context.",
    evidence: [
      { kind: "project", label: "SeLeBox", url: "../projects/selebox/", note: "Maintained compatibility with legacy Firebase dependencies while adding Appwrite-backed services." }
    ]
  },

  {
    id: "backblaze",
    name: "Backblaze",
    categories: ["Infrastructure", "Data"],
    type: "Platform",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "S3-compatible object storage used for document and asset image storage.",
    evidence: [
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Document and asset image storage for resource operations." },
      { kind: "project", label: "Veyra", url: "../projects/veyra/", note: "Media storage in the SaaS feedback platform architecture." }
    ]
  },

  {
    id: "clerk",
    name: "Clerk",
    categories: ["Security", "Development"],
    type: "Platform",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Authentication platform used with application-layer authorization in operational SaaS systems.",
    evidence: [
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Authentication layer combined with application-specific permission boundaries." },
      { kind: "project", label: "Veyra", url: "../projects/veyra/", note: "Hybrid auth and custom RBAC authorization architecture." }
    ]
  },

  /* ─────────────────────────────────────────
     ARCHITECTURE
  ───────────────────────────────────────── */
  {
    id: "rest-api",
    name: "REST API Design",
    categories: ["Architecture", "Development"],
    type: "Method",
    depth: "CORE",
    lastApplied: 2026,
    summary: "Designing and implementing RESTful service interfaces across multiple full-stack systems.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Assessment and user data REST endpoints." },
      { kind: "project", label: "SeLeBox", url: "../projects/selebox/", note: "Social content, messaging, and media API design." },
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "Storage record CRUD REST interface." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Designed and maintained production REST APIs." }
    ]
  },

  {
    id: "layered-architecture",
    name: "Layered Architecture",
    categories: ["Architecture"],
    type: "Method",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Organizing systems with clear separation of concerns — presentation, application, domain, and data access layers.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Structured layer separation in full-stack assessment platform." },
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "Spring MVC layered structure: controller, service, repository." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Taught layered architecture as a foundational design principle." }
    ]
  },

  {
    id: "modular-design",
    name: "Modular Design",
    categories: ["Architecture"],
    type: "Method",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Decomposing systems into independently responsible modules with clear boundaries.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Feature-module boundaries in full-stack HR platform." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Reusable modular teaching templates for student starter projects." }
    ]
  },

  {
    id: "system-design",
    name: "System Design",
    categories: ["Architecture"],
    type: "Method",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Designing complete systems from data flow through service boundaries and infrastructure considerations.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Full system architecture from requirements through delivery." },
      { kind: "project", label: "SeLeBox", url: "../projects/selebox/", note: "Social platform system modeling." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "System-level decisions across legacy modernization and new feature delivery." }
    ]
  },

  {
    id: "repository-pattern",
    name: "Repository Pattern",
    categories: ["Architecture", "Development"],
    type: "Method",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Abstracting data access logic to decouple domain logic from persistence concerns.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Repository interfaces for clean data layer separation." },
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "JPA repositories in Spring Boot layered structure." }
    ]
  },

  {
    id: "adr",
    name: "Architecture Decision Records",
    categories: ["Architecture", "Documentation"],
    type: "Practice",
    depth: "PRACTICED",
    lastApplied: 2025,
    summary: "Recording significant technical decisions with context, options, and rationale for future reference.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Documented key design decisions during system build." }
    ]
  },

  {
    id: "legacy-modernization",
    name: "Legacy Modernization",
    categories: ["Architecture", "Development"],
    type: "Method",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Incrementally improving older systems — identifying risk, establishing safe boundaries, and introducing modern patterns where they provide clear value.",
    evidence: [
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Modernized legacy HR and assessment system infrastructure and codebase." }
    ]
  },

  /* ─────────────────────────────────────────
     DATA / LIBRARIES
  ───────────────────────────────────────── */
  {
    id: "prisma",
    name: "Prisma ORM",
    categories: ["Development", "Data"],
    type: "Library",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Type-safe database access layer with schema-driven migrations.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Database schema management and typed query client." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Used Prisma for production data model management." }
    ]
  },

  /* ─────────────────────────────────────────
     QUALITY
  ───────────────────────────────────────── */
  {
    id: "playwright",
    name: "Playwright",
    categories: ["Quality", "Development"],
    type: "Tool",
    depth: "PRACTICED",
    lastApplied: 2025,
    summary: "End-to-end browser automation and UI testing.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "E2E test coverage for assessment platform user flows." }
    ]
  },

  {
    id: "unit-testing",
    name: "Unit Testing",
    categories: ["Quality"],
    type: "Practice",
    depth: "APPLIED",
    lastApplied: 2025,
    summary: "Testing individual functions, components, and service methods in isolation.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Component and service unit tests." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Maintained unit test coverage for production services." }
    ]
  },

  {
    id: "jest",
    name: "Jest",
    categories: ["Quality", "Development"],
    type: "Tool",
    depth: "PRACTICED",
    lastApplied: 2026,
    summary: "Unit and service testing tool used in operational application validation.",
    evidence: [
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Unit and service tests in the verified project stack." }
    ]
  },

  {
    id: "postman",
    name: "Postman",
    categories: ["Quality", "Development"],
    type: "Tool",
    depth: "PRACTICED",
    lastApplied: 2025,
    summary: "API request validation and manual service testing.",
    evidence: [
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Used for API testing in instructional validation workflows." },
      { kind: "experience", label: "Software Engineer Intern — Argon Software", url: "../experience/software-engineer-intern/", note: "Used for API endpoint testing during internship work." }
    ]
  },

  {
    id: "swagger-openapi",
    name: "Swagger / OpenAPI",
    categories: ["Documentation", "Quality", "Development"],
    type: "Tool",
    depth: "PRACTICED",
    lastApplied: 2025,
    summary: "API documentation and endpoint validation for service-based systems.",
    evidence: [
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "Swagger/OpenAPI used to document and validate Spring Boot REST endpoints." },
      { kind: "experience", label: "Java Industry Immersion Trainee — Spring Valley Tech", url: "../experience/java-industry-immersion/", note: "Included Swagger documentation in the full-stack Java immersion scope." }
    ]
  },

  /* ─────────────────────────────────────────
     SECURITY
  ───────────────────────────────────────── */
  {
    id: "iam",
    name: "IAM & Access Control",
    categories: ["Security", "Infrastructure"],
    type: "Practice",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Identity and access management for cloud resources, service accounts, and role-based permissions.",
    evidence: [
      { kind: "credential", label: "Google Cloud Associate Cloud Engineer", url: "../credentials/", note: "IAM roles, service accounts, and permission boundaries." },
      { kind: "credential", label: "Snowflake SnowPro Associate", url: "../credentials/", note: "Role-based access control in cloud data platform." },
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "Service account permission limits and secure bucket access." }
    ]
  },

  {
    id: "jwt-auth",
    name: "JWT Authentication",
    categories: ["Security", "Development"],
    type: "Practice",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Token-based authentication and authorization for REST API services.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "JWT-based session management for HR assessment platform." },
      { kind: "project", label: "SeLeBox", url: "../projects/selebox/", note: "Authentication layer for social platform API access." }
    ]
  },

  {
    id: "rbac",
    name: "Role-Based Access Control",
    categories: ["Security", "Architecture"],
    type: "Practice",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Designing permission boundaries around roles, tenant membership, and workflow ownership.",
    evidence: [
      { kind: "project", label: "Veyra", url: "../projects/veyra/", note: "Custom RBAC for owner, organization, member, moderation, and audit workflows." },
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Application-layer permission boundaries around operational resource access." },
      { kind: "project", label: "SIMS — Student Information Management System", url: "../projects/sims/", note: "Role-specific dashboards and menu options through Auth0-backed sessions." }
    ]
  },

  {
    id: "auth0",
    name: "Auth0",
    categories: ["Security", "Development"],
    type: "Platform",
    depth: "PRACTICED",
    lastApplied: 2021,
    summary: "Authentication service used for role-resolved student information system sessions.",
    evidence: [
      { kind: "project", label: "SIMS — Student Information Management System", url: "../projects/sims/", note: "Auth0 login sessions resolved user roles for departmental access." }
    ]
  },

  /* ─────────────────────────────────────────
     OBSERVABILITY
  ───────────────────────────────────────── */
  {
    id: "sentry",
    name: "Sentry",
    categories: ["Observability", "Quality"],
    type: "Platform",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Error tracking and performance monitoring in production web applications.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Production error monitoring and performance tracking." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Integrated Sentry for application health visibility." }
    ]
  },

  {
    id: "structured-logging",
    name: "Structured Logging",
    categories: ["Observability", "DevOps"],
    type: "Practice",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Implementing application-level logging for debugging and production incident investigation.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Structured application and service logs." },
      { kind: "experience", label: "Full-Stack Developer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Maintained logging standards in production services." }
    ]
  },

  {
    id: "posthog",
    name: "PostHog",
    categories: ["Observability", "Data"],
    type: "Platform",
    depth: "PRACTICED",
    lastApplied: 2026,
    summary: "Product analytics and operational event visibility for SaaS application workflows.",
    evidence: [
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Used alongside Sentry and internal dashboards for developer observability." },
      { kind: "project", label: "Veyra", url: "../projects/veyra/", note: "Part of the feedback platform observability architecture." }
    ]
  },

  {
    id: "codescene",
    name: "CodeScene",
    categories: ["Quality", "Observability"],
    type: "Platform",
    depth: "PRACTICED",
    lastApplied: 2026,
    summary: "Code health analysis used to inspect maintainability risks alongside test and coverage signals.",
    evidence: [
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Code health analysis in the verified project stack." }
    ]
  },

  /* ─────────────────────────────────────────
     DOCUMENTATION
  ───────────────────────────────────────── */
  {
    id: "technical-writing",
    name: "Technical Writing",
    categories: ["Documentation"],
    type: "Practice",
    depth: "APPLIED",
    lastApplied: 2025,
    summary: "Writing technical documentation for systems, APIs, and user-facing guides.",
    evidence: [
      { kind: "project", label: "GoPick Manual", url: "../projects/gopick-manual/", note: "Produced offline-accessible user documentation for GoPick." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Course materials, rubrics, and structured technical guides." }
    ]
  },

  {
    id: "tailwind-css",
    name: "Tailwind CSS",
    categories: ["Development"],
    type: "Framework",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Utility-first CSS used for responsive application interfaces and instructional templates.",
    evidence: [
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Responsive UI layer in the verified operations platform stack." },
      { kind: "project", label: "SeLeBox", url: "../projects/selebox/", note: "React frontend styling for social platform workflows." },
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "Responsive React UI and scanner view styling." },
      { kind: "project", label: "SIMS — Student Information Management System", url: "../projects/sims/", note: "Responsive styling for the departmental student-information system." },
      { kind: "experience", label: "Java Industry Immersion Trainee — Spring Valley Tech", url: "../experience/java-industry-immersion/", note: "Built the React/Tailwind frontend for the records tracking application." }
    ]
  },

  /* ─────────────────────────────────────────
     TEACHING
  ───────────────────────────────────────── */
  {
    id: "teaching",
    name: "Software Development Teaching",
    categories: ["Teaching"],
    type: "Practice",
    depth: "CORE",
    lastApplied: 2025,
    summary: "Teaching full-stack development, applied software engineering, and industry best practices in an academic context.",
    evidence: [
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Designed and delivered curriculum for core web development and software engineering subjects." }
    ]
  },

  {
    id: "curriculum-design",
    name: "Curriculum Design",
    categories: ["Teaching", "Documentation"],
    type: "Practice",
    depth: "APPLIED",
    lastApplied: 2025,
    summary: "Designing structured learning paths, course materials, and practical exercises.",
    evidence: [
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Developed reusable course templates, project frameworks, and student assessment rubrics." }
    ]
  },

  /* ─────────────────────────────────────────
     MISC
  ───────────────────────────────────────── */
  {
    id: "networking",
    name: "Network Fundamentals",
    categories: ["Infrastructure"],
    type: "Practice",
    depth: "PRACTICED",
    lastApplied: 2025,
    summary: "IP addressing, subnetting, VPC design, security groups, and firewall rules.",
    evidence: [
      { kind: "training", label: "AWS re/Start Training Graduate", url: "../credentials/", note: "Subnetting, Network ACLs, Security Groups, and cloud networking." },
      { kind: "credential", label: "Google Cloud Associate Cloud Engineer", url: "../credentials/", note: "VPC, subnets, firewall rules, and network resource planning." }
    ]
  },

  {
    id: "data-modeling",
    name: "Relational Data Modeling",
    categories: ["Data", "Architecture"],
    type: "Method",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Modeling structured entities, state, relationships, and historical records in relational systems.",
    evidence: [
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Resource lifecycles, reservations, assignments, maintenance, and organizational capacity limits." },
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "Physical storage hierarchy, record/item states, and append-oriented movement history." },
      { kind: "project", label: "SIMS — Student Information Management System", url: "../projects/sims/", note: "Student profiles, achievements, Hall of Fame recognition, and organization relationships." },
      { kind: "project", label: "WOTS — Water Order Tracking System", url: "../projects/wots/", note: "Customer orders, container borrowing rules, payments, delivery activity, and sales reporting." }
    ]
  },

  {
    id: "computer-vision",
    name: "Computer Vision",
    categories: ["Development", "Architecture"],
    type: "Method",
    depth: "PRACTICED",
    lastApplied: 2022,
    summary: "Camera-based environmental sensing for on-device assistive navigation research.",
    evidence: [
      { kind: "project", label: "PUGS — Path Utility Guide System", url: "../projects/pugs/", note: "Obstacle proximity detection, free path analysis, and multimodal haptic/audio feedback." }
    ]
  },

  {
    id: "android-development",
    name: "Android Development",
    categories: ["Development"],
    type: "Platform",
    depth: "PRACTICED",
    lastApplied: 2022,
    summary: "Android smartphone application work in a research prototype context.",
    evidence: [
      { kind: "project", label: "PUGS — Path Utility Guide System", url: "../projects/pugs/", note: "On-device Android prototype using smartphone camera input for assistive navigation." }
    ]
  },

  {
    id: "local-network-deployment",
    name: "Local Network Deployment",
    categories: ["Infrastructure", "DevOps"],
    type: "Practice",
    depth: "PRACTICED",
    lastApplied: 2021,
    summary: "Deploying web applications on local servers for LAN-accessible operations.",
    evidence: [
      { kind: "project", label: "SIMS — Student Information Management System", url: "../projects/sims/", note: "Local PHP/MySQL server accessed by multiple department computers over LAN." },
      { kind: "project", label: "WOTS — Water Order Tracking System", url: "../projects/wots/", note: "Locally deployed operations system for a refilling station workflow." }
    ]
  },

  {
    id: "wordpress",
    name: "WordPress",
    categories: ["Development"],
    type: "Platform",
    depth: "APPLIED",
    lastApplied: 2025,
    summary: "CMS customization, plugin integration, and business web system management.",
    evidence: [
      { kind: "experience", label: "Web Developer & IT Operations — ILTN Holdings", url: "../experience/iltn-holdings/", note: "WordPress-based business web systems and SaaS service integration." }
    ]
  }

];
