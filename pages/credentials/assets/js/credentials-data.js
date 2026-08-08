/**
 * Credential Inventory & Repository Data
 * Ian Cedric Ramirez Portfolio - Phase 14.1 Credentials Correction
 * Fetched & Verified Date: 2026-08-08
 */

window.CREDENTIALS_DATA = [
  {
    id: "gcp-ace",
    name: "Google Cloud Associate Cloud Engineer",
    issuer: "Google Cloud",
    category: "CERTIFICATIONS",
    type: "Certification",
    level: "Associate",
    domains: ["Cloud", "DevOps", "Platform"],
    earnedDate: null, // Date unverified
    earnedYear: "Unverified",
    expiresDate: null, // Expiration policy unverified
    status: "Current",
    credentialId: null, // Credential ID unverified / private
    verificationLinks: [], // Official verification URL unverified
    certificateAsset: null, // Certificate asset unverified
    coverageSource: "Google Cloud official certification documentation",
    earnedVersion: "Associate Cloud Engineer Examination Guide",
    currentVersionNote: "Coverage reflects standard Google Cloud ACE exam objectives; updated periodically with new Google Cloud platform services.",
    fetchedDate: "2026-08-08",
    officialCoverage: [
      {
        domain: "Setting up a cloud solution environment (~20%)",
        topics: [
          "Setting up cloud projects, resource hierarchy, IAM, and organization policies.",
          "Managing billing configuration, accounts, budgets, and alerts.",
          "Installing and configuring command-line interface (gcloud CLI)."
        ]
      },
      {
        domain: "Planning and implementing a cloud solution (~30%)",
        topics: [
          "Planning compute resources (Compute Engine, GKE, Cloud Run, Cloud Run functions).",
          "Configuring data storage options and network resources (VPC, subnets, firewall rules)."
        ]
      },
      {
        domain: "Ensuring successful operation of a cloud solution (~25%)",
        topics: [
          "Managing compute resources, scaling, updates, and maintenance.",
          "Managing data storage, relational/NoSQL databases, and cloud monitoring/logging via Google Cloud Observability."
        ]
      },
      {
        domain: "Configuring access and security (~25%)",
        topics: [
          "Managing Identity and Access Management (IAM) roles and service accounts.",
          "Managing permission boundaries and configuring data protection policies."
        ]
      }
    ],
    relatedProjects: [
      {
        name: "GoPick",
        url: "../projects/gopick/",
        description: "Applied cloud infrastructure deployment principles, service security boundaries, and environment configurations."
      },
      {
        name: "Internal Records Storage System",
        url: "../projects/internal-records-storage/",
        description: "Applied secure cloud storage bucket access, backup routines, and service account permission limits."
      }
    ],
    relatedExperience: [
      {
        title: "Full-Stack Developer and DevOps Engineer",
        company: "People Dynamics Inc.",
        url: "../experience/full-stack-developer/",
        description: "Managed production environments, cloud configuration, and deployment pipelines."
      }
    ],
    about: "Validates foundational capability to deploy, monitor, and manage enterprise cloud applications, infrastructure, and access controls using Google Cloud Platform tools and gcloud CLI.",
    todos: [
      "Confirm credential earned/completed date.",
      "Confirm credential ID.",
      "Confirm expiration policy/date.",
      "Add official verification URL.",
      "Add Credly/LinkedIn verification if applicable.",
      "Confirm earned exam/version.",
      "Add certificate asset if available."
    ]
  },
  {
    id: "snowflake-snowpro-associate",
    name: "Snowflake SnowPro Associate",
    issuer: "Snowflake",
    category: "CERTIFICATIONS",
    type: "Certification",
    level: "Associate",
    domains: ["Data", "Cloud", "Platform"],
    earnedDate: null,
    earnedYear: "Unverified",
    expiresDate: null,
    status: "Current",
    credentialId: null,
    verificationLinks: [],
    certificateAsset: null,
    coverageSource: "Snowflake official certification documentation",
    earnedVersion: "SnowPro Associate / Core Certification Guide (SOL-C01)",
    currentVersionNote: "Reflects official SOL-C01 Platform objectives including data loading, security, RBAC, and cloud data architecture.",
    fetchedDate: "2026-08-08",
    officialCoverage: [
      {
        domain: "Data Management and Loading (25%)",
        topics: [
          "Data ingestion workflows, internal and external staging, COPY INTO commands, and file format configurations.",
          "Handling structured and semi-structured data (JSON, Parquet, Avro)."
        ]
      },
      {
        domain: "Snowflake Accounts and Security (20%)",
        topics: [
          "Account configuration, network policies, data encryption standards, and governance."
        ]
      },
      {
        domain: "Snowflake UI & Workspaces (15%)",
        topics: [
          "Snowsight interface operations, worksheet execution, and virtual warehouse resource management."
        ]
      },
      {
        domain: "Data Access and Roles (15%)",
        topics: [
          "Role-Based Access Control (RBAC), privilege inheritance, system-defined roles, and securable objects."
        ]
      },
      {
        domain: "Snowflake Functions & Analytics (15%)",
        topics: [
          "SQL analytical functions, Cortex AI functions, and query performance optimization."
        ]
      },
      {
        domain: "Data Protection and Sharing (10%)",
        topics: [
          "Time Travel data retention, Fail-safe protection, and secure data sharing across accounts."
        ]
      }
    ],
    relatedProjects: [
      {
        name: "GoPick",
        url: "../projects/gopick/",
        description: "Applied structured analytical data query patterns, reporting aggregation, and role-based data access models."
      }
    ],
    relatedExperience: [
      {
        title: "Full-Stack Developer and DevOps Engineer",
        company: "People Dynamics Inc.",
        url: "../experience/full-stack-developer/",
        description: "Designed transactional and analytical database integrations for assessment data reporting."
      }
    ],
    about: "Validates core proficiency in cloud data warehousing, data ingestion pipelines, role-based access control, performance tuning, and secure data sharing within Snowflake Data Cloud.",
    todos: [
      "Confirm credential earned/completed date.",
      "Confirm credential ID.",
      "Confirm expiration policy/date.",
      "Add official verification URL.",
      "Add Credly/LinkedIn verification if applicable.",
      "Confirm earned exam/version.",
      "Add certificate asset if available."
    ]
  },
  {
    id: "github-foundations",
    name: "GitHub Foundations",
    issuer: "GitHub",
    category: "CERTIFICATIONS",
    type: "Certification",
    level: "Foundational",
    domains: ["Git & GitHub", "DevOps", "Software Engineering"],
    earnedDate: null,
    earnedYear: "Unverified",
    expiresDate: null,
    status: "Current",
    credentialId: null,
    verificationLinks: [],
    certificateAsset: null,
    coverageSource: "GitHub official certification documentation",
    earnedVersion: "GitHub Foundations Exam (GH-900)",
    currentVersionNote: "Standard GH-900 objective domains covering Git repository operations, GitHub Flow, Actions, and Security.",
    fetchedDate: "2026-08-08",
    officialCoverage: [
      {
        domain: "Introduction to Git and GitHub",
        topics: [
          "Version control fundamentals, repository hierarchy, GitHub Flow branching strategy, and Markdown documentation."
        ]
      },
      {
        domain: "Working with GitHub Repositories",
        topics: [
          "Repository management, file tracking, commit history, branch rules, and repository insights."
        ]
      },
      {
        domain: "Collaboration Features",
        topics: [
          "Issues, Pull Requests, code review workflows, GitHub Discussions, and release management."
        ]
      },
      {
        domain: "Modern Development Workflows",
        topics: [
          "GitHub Actions basics, CI/CD workflow syntax, secret variables, and GitHub Codespaces."
        ]
      },
      {
        domain: "Project Management",
        topics: [
          "GitHub Projects, task boards, milestones, and organization-level tracking."
        ]
      },
      {
        domain: "Privacy, Security, and Administration",
        topics: [
          "Branch protection rules, Dependabot security alerts, secret scanning, and access permissions."
        ]
      }
    ],
    relatedProjects: [
      {
        name: "GoPick",
        url: "../projects/gopick/",
        description: "Utilized GitHub version control, branch protection strategies, and structured pull request reviews."
      },
      {
        name: "SeLeBox",
        url: "../projects/selebox/",
        description: "Maintained multi-contributor codebase workflows, issue tracking, and release tags."
      }
    ],
    relatedExperience: [
      {
        title: "Full-Stack Developer and DevOps Engineer",
        company: "People Dynamics Inc.",
        url: "../experience/full-stack-developer/",
        description: "Standardized team repository collaboration, code reviews, and CI/CD pipelines."
      },
      {
        title: "Full-Stack Developer",
        company: "YenkoDev — SeLeBox Platform",
        url: "../experience/yenkodev-selebox/",
        description: "Managed version control workflows, pull request reviews, and team feature branches."
      }
    ],
    about: "Validates foundational mastery of Git version control, collaborative GitHub Flow, CI/CD automation, issue tracking, and repository security best practices.",
    todos: [
      "Confirm credential earned/completed date.",
      "Confirm credential ID.",
      "Confirm expiration policy/date.",
      "Add official verification URL.",
      "Add Credly/LinkedIn verification if applicable.",
      "Confirm earned exam/version.",
      "Add certificate asset if available."
    ]
  },
  {
    id: "docker-foundations-prof-cert",
    name: "Docker Foundations Professional Certificate",
    issuer: "Docker",
    category: "CERTIFICATIONS",
    type: "Professional Certificate",
    level: "Professional",
    domains: ["Containers", "DevOps", "Platform"],
    earnedDate: null,
    earnedYear: "Unverified",
    expiresDate: null,
    status: "Current",
    credentialId: null,
    verificationLinks: [],
    certificateAsset: null,
    coverageSource: "Docker official documentation & learning track",
    earnedVersion: "Docker Foundations Curriculum",
    currentVersionNote: "Covers practical application of Docker CLI, multi-stage container builds, networking, and Docker Compose configurations.",
    fetchedDate: "2026-08-08",
    officialCoverage: [
      {
        domain: "Containerization Fundamentals",
        topics: [
          "Process isolation, container versus virtual machine architecture, Docker Engine daemon interaction."
        ]
      },
      {
        domain: "Image Construction & Management",
        topics: [
          "Writing optimized Dockerfiles, multi-stage builds, image layer caching, and image tagging."
        ]
      },
      {
        domain: "Container Networking",
        topics: [
          "Bridge networks, host networking, port mapping, and inter-container DNS resolution."
        ]
      },
      {
        domain: "Storage & Volume Persistence",
        topics: [
          "Bind mounts, named Docker volumes, and handling stateful application data."
        ]
      },
      {
        domain: "Multi-Container Orchestration",
        topics: [
          "Docker Compose syntax, multi-service environments, dependency order, and environment file management."
        ]
      }
    ],
    relatedProjects: [
      {
        name: "GoPick",
        url: "../projects/gopick/",
        description: "Containerized application runtime environment, local dev setup with Docker Compose, and environment isolation."
      },
      {
        name: "SeLeBox",
        url: "../projects/selebox/",
        description: "Configured multi-container development stack with database and web services."
      }
    ],
    relatedExperience: [
      {
        title: "Full-Stack Developer and DevOps Engineer",
        company: "People Dynamics Inc.",
        url: "../experience/full-stack-developer/",
        description: "Maintained Docker container environments and deployment configurations."
      }
    ],
    about: "Validates practical knowledge of containerization concepts, building efficient container images with Dockerfiles, volume persistence, and multi-container orchestration with Docker Compose.",
    todos: [
      "Confirm credential earned/completed date.",
      "Confirm credential ID.",
      "Confirm expiration policy/date.",
      "Add official verification URL.",
      "Add Credly/LinkedIn verification if applicable.",
      "Confirm earned exam/version.",
      "Add certificate asset if available."
    ]
  },
  {
    id: "aws-restart-training",
    name: "AWS re/Start Training Graduate",
    issuer: "Amazon Web Services (AWS)",
    category: "TRAINING & PROGRAMS",
    type: "Training",
    level: "Foundational",
    domains: ["Cloud", "DevOps", "Software Engineering"],
    earnedDate: null,
    earnedYear: "Unverified",
    expiresDate: "None",
    status: "Current",
    credentialId: null,
    verificationLinks: [],
    certificateAsset: null,
    coverageSource: "AWS re/Start official curriculum documentation",
    earnedVersion: "AWS re/Start Intensive Program Syllabus",
    currentVersionNote: "Completed structured hands-on cloud cohort covering Linux administration, Python automation, networking, and core AWS cloud infrastructure services.",
    fetchedDate: "2026-08-08",
    officialCoverage: [
      {
        domain: "Cloud Computing Fundamentals",
        topics: [
          "Core cloud computing concepts, AWS global infrastructure (Regions, Availability Zones), and cloud economics."
        ]
      },
      {
        domain: "Core AWS Infrastructure Services",
        topics: [
          "Hands-on management of Amazon EC2 compute instances, Amazon S3 object storage, Amazon VPC networking, and IAM security policies."
        ]
      },
      {
        domain: "Linux System Administration",
        topics: [
          "Linux command-line navigation, file system permissions, process management, and Shell scripting."
        ]
      },
      {
        domain: "Networking & Security Fundamentals",
        topics: [
          "IP addressing, subnetting, Security Groups, Network ACLs, and cloud security posture."
        ]
      },
      {
        domain: "Python Scripting & Relational Databases",
        topics: [
          "Python programming fundamentals for infrastructure automation and SQL database operations."
        ]
      },
      {
        domain: "Professional Workplace Readiness",
        topics: [
          "Technical problem-solving, collaborative operations, and IT service management readiness."
        ]
      }
    ],
    relatedProjects: [
      {
        name: "GoPick",
        url: "../projects/gopick/",
        description: "Applied core AWS cloud infrastructure principles, EC2 compute concepts, and network security boundaries."
      }
    ],
    relatedExperience: [
      {
        title: "Full-Stack Developer and DevOps Engineer",
        company: "People Dynamics Inc.",
        url: "../experience/full-stack-developer/",
        description: "Leveraged cloud foundation training to manage cloud-hosted application infrastructure."
      },
      {
        title: "Software Engineer Intern",
        company: "Spring Valley Tech",
        url: "../experience/software-engineer-intern/",
        description: "Applied foundational software engineering and cloud concepts during early internship work."
      }
    ],
    about: "Validates comprehensive foundational training in AWS cloud services, Linux command-line administration, networking, Python scripting for automation, and core IT operations.",
    todos: [
      "Confirm credential earned/completed date.",
      "Confirm credential ID.",
      "Confirm expiration policy/date.",
      "Add official verification URL.",
      "Add Credly/LinkedIn verification if applicable.",
      "Confirm earned exam/version.",
      "Add certificate asset if available."
    ]
  }
];
