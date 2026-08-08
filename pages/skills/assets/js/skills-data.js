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
    summary: "Front-end scripting, application behavior, and instructional JavaScript work across web projects and coursework.",
    evidence: [
      { kind: "experience", label: "Software Engineer Intern — Argon Software", url: "../experience/software-engineer-intern/", note: "Listed in the internship skill evidence alongside Laravel, React, Next.js, React Native, TypeScript, Docker, Postman, and Figma." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Taught JavaScript as a core course subject." },
      { kind: "credential", label: "Mozilla JavaScript Foundations Professional Certificate", url: "../credentials/certifications/mozilla-javascript-foundations-professional-certificate/", note: "Validated JavaScript language foundations." },
      { kind: "training", label: "JavaScript Essentials 1", url: "../credentials/training/cisco-javascript-essentials-1/", note: "Structured JavaScript fundamentals training." },
      { kind: "training", label: "JavaScript Essentials 2", url: "../credentials/training/cisco-javascript-essentials-2/", note: "Structured intermediate JavaScript training." },
      { kind: "credential", label: "JavaScript (Basic) Certificate", url: "../credentials/certifications/hackerrank-javascript-basic-certificate/", note: "Validated basic JavaScript problem solving." }
    ]
  },

  {
    id: "typescript",
    name: "TypeScript",
    categories: ["Development"],
    type: "Language",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Typed JavaScript application development exposure from internship work.",
    evidence: [
      { kind: "experience", label: "Software Engineer Intern — Argon Software", url: "../experience/software-engineer-intern/", note: "Listed in the internship skill evidence alongside Laravel, React, Next.js, React Native, PHP, JavaScript, Docker, Postman, and Figma." }
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
      { kind: "training", label: "AWS re/Start Training Graduate", url: "../credentials/training/aws-restart-training-graduate/", note: "Python scripting appears in the AWS re/Start training context." }
    ]
  },

  {
    id: "php",
    name: "PHP",
    categories: ["Development"],
    type: "Language",
    depth: "APPLIED",
    lastApplied: 2025,
    summary: "Server-side web application development across Yii2, WordPress, Laravel, and PHP/MySQL systems.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Verified core stack: Yii2 (PHP), MySQL, Redis, AWS." },
      { kind: "project", label: "SIMS — Student Information Management System", url: "../projects/sims/", note: "Verified stack includes PHP and MySQL." },
      { kind: "experience", label: "Web Developer & IT Operations — ILTN Holdings", url: "../experience/iltn-holdings/", note: "WordPress website development, theme/CSS customization, plugin configuration, integrations, and troubleshooting." },
      { kind: "experience", label: "Software Engineer Intern — Argon Software", url: "../experience/software-engineer-intern/", note: "Listed in the internship skill evidence." }
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
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Taught HTML as a core subject." },
      { kind: "credential", label: "IT Specialist - HTML and CSS", url: "../credentials/certifications/it-specialist-html-and-css/", note: "Validated HTML and CSS web markup fundamentals." }
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
      { kind: "experience", label: "Web Developer & IT Operations — ILTN Holdings", url: "../experience/iltn-holdings/", note: "WordPress theme/CSS customization and page implementation." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Taught CSS as a core subject." },
      { kind: "credential", label: "CSS (Basic) Certificate", url: "../credentials/certifications/hackerrank-css-basic-certificate/", note: "Validated CSS fundamentals." },
      { kind: "credential", label: "IT Specialist - HTML and CSS", url: "../credentials/certifications/it-specialist-html-and-css/", note: "Validated HTML and CSS web styling fundamentals." }
    ]
  },

  {
    id: "sql",
    name: "SQL",
    categories: ["Data", "Development"],
    type: "Language",
    depth: "CORE",
    lastApplied: 2026,
    summary: "Relational database querying and modeling across MySQL, PostgreSQL, and training contexts.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Verified stack includes MySQL." },
      { kind: "project", label: "SIMS — Student Information Management System", url: "../projects/sims/", note: "Verified stack includes MySQL and relational data modeling." },
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "Verified stack includes PostgreSQL." },
      { kind: "training", label: "AWS re/Start Training Graduate", url: "../credentials/training/aws-restart-training-graduate/", note: "SQL operations as part of cloud automation curriculum." }
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
    summary: "Component-based UI development in React-based projects and instructional work.",
    evidence: [
      { kind: "project", label: "SeLeBox", url: "../projects/selebox/", note: "Verified core stack includes React.js." },
      { kind: "project", label: "Veyra", url: "../projects/veyra/", note: "Verified core stack includes React.js." },
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "Verified stack includes React." },
      { kind: "experience", label: "Software Engineer Intern — Argon Software", url: "../experience/software-engineer-intern/", note: "Built web applications using React, Next.js, Laravel, and React Native." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "React appears in the covered technology list." }
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
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Selective rendering strategy for authenticated and data-dependent operational workflows." },
      { kind: "experience", label: "Software Engineer Intern — Argon Software", url: "../experience/software-engineer-intern/", note: "Built web applications using Laravel, React, Next.js, and React Native." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Next.js appears in the covered technology list." }
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
      { kind: "project", label: "Veyra", url: "../projects/veyra/", note: "Verified core stack includes Node.js." }
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
    summary: "Relational database used in PostgreSQL-backed projects and application environments.",
    evidence: [
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "Verified stack includes PostgreSQL." },
      { kind: "experience", label: "Java Industry Immersion Trainee — Spring Valley Tech", url: "../experience/java-industry-immersion/", note: "Designed PostgreSQL schema modeling for the records tracking system." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "PostgreSQL appears in the covered database technology list." }
    ]
  },

  {
    id: "mysql",
    name: "MySQL",
    categories: ["Data", "Development"],
    type: "Database",
    depth: "APPLIED",
    lastApplied: 2025,
    summary: "Relational database used in PHP/MySQL systems and instructional/database contexts.",
    evidence: [
      { kind: "project", label: "SIMS — Student Information Management System", url: "../projects/sims/", note: "Relational database for student profiles, achievements, organizations, and role-based department workflows." },
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Verified core stack includes MySQL." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "MySQL appears in the covered database technology list." }
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
      { kind: "credential", label: "Snowflake SnowPro Associate", url: "../credentials/certifications/snowpro-associate-platform/", note: "Validated data loading, RBAC, analytics, and data protection." }
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
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Docker used for the standardized local PHP, database, and Redis development environment." },
      { kind: "project", label: "Veyra", url: "../projects/veyra/", note: "Verified stack includes Docker." },
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Verified stack includes Docker local runtime." },
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "Verified stack includes Docker container runtime." },
      { kind: "experience", label: "Full-Stack Engineer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Standardized local PHP, database, and Redis development environments through Docker." },
      { kind: "credential", label: "Docker Foundations Professional Certificate", url: "../credentials/certifications/docker-docker-foundations-professional-certificate/", note: "Validated containerization, image builds, volumes, and Compose." }
    ]
  },

  {
    id: "gcp",
    name: "Google Cloud Platform",
    categories: ["Infrastructure", "Cloud", "DevOps"],
    type: "Cloud",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Cloud platform knowledge from certification and instructional technology coverage.",
    evidence: [
      { kind: "credential", label: "Google Cloud Associate Cloud Engineer", url: "../credentials/certifications/google-associate-cloud-engineer/", note: "Validated cloud solution planning, operation, access, and security." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Google Cloud appears in the covered deployment platform list." }
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
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Verified stack includes AWS-hosted application/server environment, object storage, and CloudFront." },
      { kind: "experience", label: "Full-Stack Engineer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Maintained and researched AWS services including EC2, RDS, S3, and CloudFront within assigned scope." },
      { kind: "training", label: "AWS re/Start Training Graduate", url: "../credentials/training/aws-restart-training-graduate/", note: "Completed hands-on cohort covering EC2, S3, VPC, IAM, Linux, Python, and networking." }
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
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Linux-related deployment target preparation appears in the teaching context through AWS/server preparation." }
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
      { kind: "experience", label: "Full-Stack Engineer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Standardized team repository collaboration and CI/CD pipelines." }
    ]
  },

  {
    id: "cicd",
    name: "CI/CD",
    categories: ["DevOps", "Quality"],
    type: "Practice",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Automated build, validation, and deployment workflows where explicitly documented.",
    evidence: [
      { kind: "project", label: "Veyra", url: "../projects/veyra/", note: "Automated delivery pipeline built on GitHub Actions, Docker containers, Appwrite schema migrations, and Vercel hosting." },
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Verified stack includes GitHub Actions CI pipeline." },
      { kind: "experience", label: "Full-Stack Engineer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Implemented GitHub Actions deployment workflows for GoPick/PDI work, connecting by SSH to update the AWS EC2 application environment." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Implemented GitHub Actions deployment workflows to GitHub Pages for student static-web projects." }
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
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "GitHub Actions CI pipeline in the verified project stack." },
      { kind: "project", label: "Veyra", url: "../projects/veyra/", note: "Automated CI/CD deployment operations." },
      { kind: "experience", label: "Full-Stack Engineer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "GitHub Actions deployment workflows triggered by main-branch merges for the AWS EC2 application environment." },
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
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Document and asset image storage for resource operations." }
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
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Authentication layer combined with application-specific permission boundaries." }
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
      { kind: "project", label: "Internal Records Storage System", url: "../projects/internal-records-storage/", note: "Storage record CRUD REST interface." },
      { kind: "experience", label: "Full-Stack Engineer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Designed and maintained production REST APIs." }
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
      { kind: "project", label: "Veyra", url: "../projects/veyra/", note: "Layered boundaries across UI, application services, authorization, persistence, and audit workflows." },
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Layered structure across UI, application logic, repository access, and operational workflows." },
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
      { kind: "project", label: "Veyra", url: "../projects/veyra/", note: "System architect and lead developer for multi-tenant feedback, RBAC, audit, and deployment architecture." },
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "System architect and lead developer for resource operations, reservations, maintenance, observability, and capacity limits." },
      { kind: "experience", label: "Full-Stack Engineer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "System-level decisions across legacy modernization and new feature delivery." }
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
    id: "legacy-modernization",
    name: "Legacy Modernization",
    categories: ["Architecture", "Development"],
    type: "Method",
    depth: "APPLIED",
    lastApplied: 2026,
    summary: "Incrementally improving older systems — identifying risk, establishing safe boundaries, and introducing modern patterns where they provide clear value.",
    evidence: [
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Legacy HR assessment platform modernization through safer architectural boundaries and incremental changes." },
      { kind: "experience", label: "Full-Stack Engineer & DevOps Engineer — People Dynamics", url: "../experience/full-stack-developer/", note: "Modernized legacy HR and assessment system infrastructure and codebase." }
    ]
  },

  /* ─────────────────────────────────────────
     DATA / LIBRARIES
  ───────────────────────────────────────── */
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
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "Playwright scripts for local end-to-end verification of complex UI flows." },
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Verified stack includes Playwright end-to-end tests." },
      { kind: "experience", label: "Full-Time Instructor — FEU Institute of Technology", url: "../experience/full-time-instructor/", note: "Performed browser-level validation through Playwright." }
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
      { kind: "project", label: "GoPick", url: "../projects/gopick/", note: "PHPUnit unit and component tests for isolated service/repository logic." },
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Verified stack includes Jest unit/service tests." }
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
      { kind: "credential", label: "Snowflake SnowPro Associate", url: "../credentials/", note: "Role-based access control in cloud data platform." }
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
      { kind: "project", label: "Talara", url: "../projects/talara/", note: "Verified observability stack includes Sentry error monitoring." },
      { kind: "project", label: "Veyra", url: "../projects/veyra/", note: "Project highlight and case study identify Sentry as part of observability." }
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
