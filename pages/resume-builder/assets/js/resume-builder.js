/**
 * ATS Resume & PDF Export Builder Logic
 * Uses pdfmake via CDNJS for client-side ATS vector text PDF generation.
 */

(function () {
    'use strict';

    // ── CANONICAL EDUCATION DATA ─────────────────────────────────────────────
    const EDUCATION_DATA = [
        {
            degree: "Master in Information Technology",
            institution: "Polytechnic University of the Philippines",
            period: "Mar 2024 – Current"
        },
        {
            degree: "Java Developer - Training NCIII",
            institution: "Philippine Technical Education and Skills Development Authority (TESDA)",
            period: "Apr 2025 – May 2025"
        },
        {
            degree: "Training, Cloud Practitioner",
            institution: "Edukasyon.ph",
            period: "Sep 2023 – Nov 2023"
        },
        {
            degree: "Bachelor's degree in Computer Science",
            institution: "Isabela State University",
            period: "Aug 2019 – Sep 2023"
        }
    ];

    // ── ROLE PRESET DEFINITIONS ──────────────────────────────────────────────
    const ROLE_PRESETS = {
        developer: {
            title: "Full-Stack Software Developer",
            summary: "Versatile Full-Stack Software Developer with expertise in building maintainable web applications, scalable REST APIs, and responsive frontends. Skilled in modern JavaScript/TypeScript, React, Node.js, Java Spring Boot, and database management.",
            skills: "JavaScript, TypeScript, React, Next.js, Node.js, Spring Boot, Java, PHP, PostgreSQL, MongoDB, REST APIs, Git, Tailwind CSS",
            experiences: [
                {
                    id: "exp-pd",
                    company: "People Dynamics Inc.",
                    role: "Full-Stack Engineer & DevOps Engineer",
                    period: "Nov 2025 - Present",
                    bullets: [
                        "Modernized 4+ HR SaaS assessment platforms (GoPick, JFP-GoPick, AC Local) by implementing N-Layer architecture and decoupling legacy PHP modules.",
                        "Engineered 20+ secure RESTful API endpoints and database queries for report generation and assessment metering, reducing API response latency by 35%.",
                        "Introduced environment-based feature flags, structured error handling, and GDPR compliance controls across 100% of new feature releases."
                    ]
                },
                {
                    id: "exp-svt",
                    company: "Spring Valley Tech",
                    role: "Java Industry Immersion Trainee",
                    period: "Jun 2025",
                    bullets: [
                        "Engineered 12+ Java Spring Boot micro-components for physical record tracking and barcode/QR verification.",
                        "Constructed transactional database schemas with 100% validation coverage and automated error handling."
                    ]
                },
                {
                    id: "exp-yd",
                    company: "YenkoDev - SeLeBox Platform",
                    role: "Full-Stack Engineer",
                    period: "May 2024 - Aug 2024",
                    bullets: [
                        "Developed real-time social platform features serving 5,000+ active sessions, including media feed streaming and instant messaging.",
                        "Optimized frontend bundle size by 40% for smooth high-definition video playback and offline capability."
                    ]
                },
                {
                    id: "exp-feu",
                    company: "FEU Institute of Technology",
                    role: "Full-Time Instructor (Software Dev & QA)",
                    period: "Oct 2023 - Nov 2025",
                    bullets: [
                        "Instructed 300+ engineering students in full-stack web development, software quality assurance, and object-oriented design.",
                        "Created 8 standardized project starter boilerplate templates to streamline containerized development."
                    ]
                }
            ]
        },
        devops: {
            title: "DevOps & Infrastructure Engineer",
            summary: "DevOps & Infrastructure Engineer specializing in automated deployment pipelines, Docker container orchestration, server operations, web service performance tuning, and DNS/domain infrastructure security.",
            skills: "Docker, CI/CD Pipelines, Linux/Bash, Nginx, IT Operations, Cloudflare, Automated Backups, DNS Management, Git, Node.js",
            experiences: [
                {
                    id: "exp-pd",
                    company: "People Dynamics Inc.",
                    role: "Full-Stack Engineer & DevOps Engineer",
                    period: "Nov 2025 - Present",
                    bullets: [
                        "Configured Docker containerization (PHP, Redis, MySQL) and automated GitHub Actions CI/CD pipelines deploying to AWS EC2 instances.",
                        "Managed AWS infrastructure (EC2, RDS, S3, CloudFront) and automated local database seeding scripts, achieving 99.9% environment availability.",
                        "Enforced static analysis quality gates using PHPStan and Playwright automated testing workflows across 100% of pull requests."
                    ]
                },
                {
                    id: "exp-iltn",
                    company: "ILTN Holdings LLC",
                    role: "Web Developer & IT Operations",
                    period: "May 2025 - Sep 2025",
                    bullets: [
                        "Managed 25+ domain DNS configurations, SSL certificates, email infrastructure, and web service security operations.",
                        "Automated routine server maintenance tasks via custom Bash and Python scripts, reducing manual overhead by 60%."
                    ]
                },
                {
                    id: "exp-feu",
                    company: "FEU Institute of Technology",
                    role: "Full-Time Instructor (DevOps & Systems)",
                    period: "Oct 2023 - Nov 2025",
                    bullets: [
                        "Designed 6 hands-on lab curricula covering Docker containerization, CI/CD automated testing, and cloud deployment.",
                        "Mentored 300+ students across 10+ project teams on infrastructure-as-code and deployment troubleshooting."
                    ]
                }
            ]
        },
        solutions_engineer: {
            title: "Solutions Engineer",
            summary: "Results-driven Solutions Engineer and Technical Consultant skilled at bridging business requirements with scalable technical architecture, custom software integration, system design, and client-facing technical solutions.",
            skills: "System Architecture, Client Technical Solutions, Technical Consultation, API Integration, Full-Stack Dev, Software Education, Quality Assurance",
            experiences: [
                {
                    id: "exp-pd",
                    company: "People Dynamics Inc.",
                    role: "Full-Stack Engineer & Solutions Architect",
                    period: "Nov 2025 - Present",
                    bullets: [
                        "Architected solutions for international HR SaaS assessment platforms (GoPick & JFP), serving multi-region client assessment workflows and GDPR benchmarks.",
                        "Authored the comprehensive GoPick Engineering Manual, centralizing developer standards, QA testing boundaries, and operational guardrails.",
                        "Collaborated with 15+ cross-functional technical stakeholders to translate complex client requirements into scalable N-Layer technical specifications."
                    ]
                },
                {
                    id: "exp-feu",
                    company: "FEU Institute of Technology",
                    role: "Full-Time Instructor & Technical Lead",
                    period: "Oct 2023 - Nov 2025",
                    bullets: [
                        "Led 20+ technical design reviews and capstone software architecture evaluations for senior engineering projects.",
                        "Evaluated 50+ student software architectures against industry-standard reliability, security, and performance benchmarks."
                    ]
                },
                {
                    id: "exp-yd",
                    company: "YenkoDev - SeLeBox Platform",
                    role: "Solutions Developer",
                    period: "May 2024 - Aug 2024",
                    bullets: [
                        "Engineered 8 custom platform solution modules for offline media delivery and third-party API integration.",
                        "Analyzed performance telemetry from 5,000+ active user sessions to refine integration API endpoints."
                    ]
                }
            ]
        }
    };

    // ── STATE ────────────────────────────────────────────────────────────────
    let state = {
        roleKey: 'developer',
        name: 'Ian Cedric Ramirez',
        contact: 'Manila, Philippines | ramirezian037@gmail.com | github.com/nyebe | linkedin.com/in/ian-cedric-ramirez',
        title: ROLE_PRESETS.developer.title,
        summary: ROLE_PRESETS.developer.summary,
        skills: ROLE_PRESETS.developer.skills,
        experiences: JSON.parse(JSON.stringify(ROLE_PRESETS.developer.experiences)),
        selectedCredIds: new Set([
            'testmu-ai-software-testing-professional-certificate',
            'docker-docker-foundations-professional-certificate',
            'github-career-essentials-professional-certificate',
            'responsible-ai-foundations-professional-certificate'
        ]),
        density: 'compact',
        selectedExpIndices: new Set([0, 1, 2, 3]),
        selectedEduIndices: new Set([0, 1, 2, 3])
    };

    // ── INITIALIZATION ───────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        initRoleSelector();
        initCredentialsList();
        initEducationList();
        initFormBindings();
        initDensityControl();
        initExportPdfButton();

        // Initial DOM Preview render
        renderPreview();
    });

    // ── ROLE SELECTOR ────────────────────────────────────────────────────────
    function initRoleSelector() {
        const roleRadios = document.querySelectorAll('input[name="role-preset"]');
        roleRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const roleKey = e.target.value;
                if (ROLE_PRESETS[roleKey]) {
                    state.roleKey = roleKey;
                    state.title = ROLE_PRESETS[roleKey].title;
                    state.summary = ROLE_PRESETS[roleKey].summary;
                    state.skills = ROLE_PRESETS[roleKey].skills;
                    state.experiences = JSON.parse(JSON.stringify(ROLE_PRESETS[roleKey].experiences));
                    state.selectedExpIndices = new Set(state.experiences.map((_, i) => i));

                    // Update form fields
                    document.getElementById('input-title').value = state.title;
                    document.getElementById('input-summary').value = state.summary;
                    document.getElementById('input-skills').value = state.skills;

                    renderExperienceEditors();
                    renderCredentialsList();
                    renderPreview();
                }
            });
        });

        renderExperienceEditors();
    }

    // ── ROLE-BASED CREDENTIAL STAR RATING CALCULATOR ─────────────────────────
    function calculateCredentialStars(cred, roleKey) {
        const textToSearch = [
            cred.title,
            cred.name,
            cred.provider,
            cred.issuer,
            ...(cred.domains || []),
            ...(cred.skills || [])
        ].filter(Boolean).join(' ').toLowerCase();

        if (roleKey === 'developer') {
            const highKey = ['node', 'javascript', 'js', 'react', 'java', 'spring', 'python', 'full-stack', 'full stack', 'web', 'frontend', 'backend', 'php', 'sql', 'mozilla', 'hackerrank'];
            const medKey = ['git', 'github', 'testing', 'qa', 'cloud', 'agile'];
            
            if (highKey.some(k => textToSearch.includes(k))) return 3;
            if (medKey.some(k => textToSearch.includes(k))) return 2;
            return 1;
        } else if (roleKey === 'devops') {
            const highKey = ['docker', 'devops', 'cloud', 'kubernetes', 'linux', 'infrastructure', 'nginx', 'kong', 'sysadmin', 'ci/cd', 'snowflake', 'aws', 'azure'];
            const medKey = ['git', 'github', 'node', 'python', 'testing', 'qa', 'java', 'architecture'];
            
            if (highKey.some(k => textToSearch.includes(k))) return 3;
            if (medKey.some(k => textToSearch.includes(k))) return 2;
            return 1;
        } else if (roleKey === 'solutions_engineer') {
            const highKey = ['architecture', 'microservices', 'cloud', 'ai', 'responsible ai', 'solutions', 'system design', 'enterprise', 'security', 'foundations', 'kong', 'snowflake'];
            const medKey = ['docker', 'software engineering', 'testing', 'devops', 'java', 'node', 'github'];
            
            if (highKey.some(k => textToSearch.includes(k))) return 3;
            if (medKey.some(k => textToSearch.includes(k))) return 2;
            return 1;
        }

        return cred.starRank || 1;
    }

    function getStarHTML(starCount) {
        if (starCount >= 3) return '<span style="color:#f59e0b; font-size:0.75rem; white-space:nowrap;" title="3 Stars: High relevance to selected role">⭐⭐⭐</span>';
        if (starCount === 2) return '<span style="color:#f59e0b; font-size:0.75rem; white-space:nowrap;" title="2 Stars: Medium relevance to selected role">⭐⭐</span>';
        return '<span style="color:#f59e0b; font-size:0.75rem; white-space:nowrap;" title="1 Star: Related context">⭐</span>';
    }

    // ── CREDENTIALS CHECKBOX LIST ────────────────────────────────────────────
    function initCredentialsList() {
        renderCredentialsList();

        // Quick select key certs for current role
        document.getElementById('btn-cred-select-top')?.addEventListener('click', () => {
            let creds = window.CREDENTIALS_DATA || [];
            const highRankIds = creds
                .filter(c => calculateCredentialStars(c, state.roleKey) === 3)
                .map(c => c.id);

            state.selectedCredIds = new Set(highRankIds);
            updateCredCheckboxes();
            renderPreview();
        });

        document.getElementById('btn-cred-clear')?.addEventListener('click', () => {
            state.selectedCredIds.clear();
            updateCredCheckboxes();
            renderPreview();
        });
    }

    function renderCredentialsList() {
        const container = document.getElementById('cred-checkbox-container');
        if (!container) return;

        let creds = window.CREDENTIALS_DATA || [];
        if (creds.length === 0) {
            container.innerHTML = '<p class="text-muted" style="font-size:0.75rem;">No credentials loaded.</p>';
            return;
        }

        // Attach star rating for current role & sort descending by stars
        const scoredCreds = creds.map(c => ({
            ...c,
            calculatedStars: calculateCredentialStars(c, state.roleKey)
        })).sort((a, b) => b.calculatedStars - a.calculatedStars);

        container.innerHTML = scoredCreds.map(c => {
            const isChecked = state.selectedCredIds.has(c.id) ? 'checked' : '';
            return `
                <label class="cred-item-label">
                    <input type="checkbox" value="${c.id}" ${isChecked} class="cred-checkbox">
                    <div style="flex:1;">
                        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.4rem;">
                            <span class="cred-item-title">${escapeHtml(c.title || c.name)}</span>
                            ${getStarHTML(c.calculatedStars)}
                        </div>
                        <div class="cred-item-issuer">${escapeHtml(c.provider || c.issuer || 'Certification')}</div>
                    </div>
                </label>
            `;
        }).join('');

        // Event listener for checkboxes
        container.querySelectorAll('.cred-checkbox').forEach(cb => {
            cb.addEventListener('change', (e) => {
                if (e.target.checked) {
                    state.selectedCredIds.add(e.target.value);
                } else {
                    state.selectedCredIds.delete(e.target.value);
                }
                renderPreview();
            });
        });
    }

    function updateCredCheckboxes() {
        document.querySelectorAll('.cred-checkbox').forEach(cb => {
            cb.checked = state.selectedCredIds.has(cb.value);
        });
    }

    // ── FORM BINDINGS ────────────────────────────────────────────────────────
    function initFormBindings() {
        const nameInput = document.getElementById('input-name');
        const contactInput = document.getElementById('input-contact');
        const titleInput = document.getElementById('input-title');
        const summaryInput = document.getElementById('input-summary');
        const skillsInput = document.getElementById('input-skills');

        nameInput?.addEventListener('input', (e) => { state.name = e.target.value; renderPreview(); });
        contactInput?.addEventListener('input', (e) => { state.contact = e.target.value; renderPreview(); });
        titleInput?.addEventListener('input', (e) => { state.title = e.target.value; renderPreview(); });
        summaryInput?.addEventListener('input', (e) => { state.summary = e.target.value; renderPreview(); });
        skillsInput?.addEventListener('input', (e) => { state.skills = e.target.value; renderPreview(); });

        // Apply & Sync Preview Manual Buttons
        const refreshHandler = () => {
            renderPreview();
            const statusText = document.getElementById('budget-status-text');
            if (statusText) {
                const prev = statusText.textContent;
                statusText.textContent = '✨ Preview Updated!';
                setTimeout(checkPageBudget, 1200);
            }
        };

        document.getElementById('btn-refresh-preview')?.addEventListener('click', refreshHandler);
        document.getElementById('btn-toolbar-refresh')?.addEventListener('click', refreshHandler);
    }

    // ── EDUCATION CHECKBOX LIST ──────────────────────────────────────────────
    function initEducationList() {
        const container = document.getElementById('edu-checkbox-container');
        if (!container) return;

        container.innerHTML = EDUCATION_DATA.map((edu, idx) => {
            const isChecked = state.selectedEduIndices.has(idx) ? 'checked' : '';
            return `
                <label class="cred-item-label">
                    <input type="checkbox" value="${idx}" ${isChecked} class="edu-checkbox">
                    <div style="flex:1;">
                        <div class="cred-item-title">${escapeHtml(edu.degree)}</div>
                        <div class="cred-item-issuer">${escapeHtml(edu.institution)} · ${escapeHtml(edu.period)}</div>
                    </div>
                </label>
            `;
        }).join('');

        container.querySelectorAll('.edu-checkbox').forEach(cb => {
            cb.addEventListener('change', (e) => {
                const idx = parseInt(e.target.value, 10);
                if (e.target.checked) {
                    state.selectedEduIndices.add(idx);
                } else {
                    state.selectedEduIndices.delete(idx);
                }
                renderPreview();
            });
        });
    }

    // ── EXPERIENCE EDITORS RENDER ────────────────────────────────────────────
    function renderExperienceEditors() {
        const container = document.getElementById('exp-editors-container');
        if (!container) return;

        container.innerHTML = state.experiences.map((exp, expIdx) => `
            <div class="exp-edit-card" data-exp-idx="${expIdx}">
                <div class="exp-edit-header">
                    <label style="display:flex; align-items:center; gap:0.4rem; cursor:pointer;">
                        <input type="checkbox" class="cb-toggle-exp-item" data-exp-idx="${expIdx}" ${state.selectedExpIndices.has(expIdx) ? 'checked' : ''}>
                        <span class="exp-edit-title">${escapeHtml(exp.company)}</span>
                    </label>
                    <span style="font-size:0.7rem; color:var(--text-muted);">${escapeHtml(exp.period)}</span>
                </div>
                <div class="bullets-list">
                    ${exp.bullets.map((b, bIdx) => `
                        <div class="bullet-row">
                            <input type="text" class="form-input bullet-input" value="${escapeHtml(b)}" data-exp-idx="${expIdx}" data-b-idx="${bIdx}">
                            <button type="button" class="btn-remove-bullet" data-exp-idx="${expIdx}" data-b-idx="${bIdx}" title="Remove bullet">✕</button>
                        </div>
                    `).join('')}
                    <button type="button" class="btn-xs btn-add-bullet" data-exp-idx="${expIdx}" style="margin-top:0.3rem;">+ Add Bullet</button>
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.cb-toggle-exp-item').forEach(cb => {
            cb.addEventListener('change', (e) => {
                const expIdx = parseInt(e.target.dataset.expIdx, 10);
                if (e.target.checked) {
                    state.selectedExpIndices.add(expIdx);
                } else {
                    state.selectedExpIndices.delete(expIdx);
                }
                renderPreview();
            });
        });

        // Attach listeners for bullet editing
        container.querySelectorAll('.bullet-input').forEach(input => {
            input.addEventListener('input', (e) => {
                const expIdx = parseInt(e.target.dataset.expIdx, 10);
                const bIdx = parseInt(e.target.dataset.bIdx, 10);
                state.experiences[expIdx].bullets[bIdx] = e.target.value;
                renderPreview();
            });
        });

        container.querySelectorAll('.btn-remove-bullet').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const expIdx = parseInt(e.target.dataset.expIdx, 10);
                const bIdx = parseInt(e.target.dataset.bIdx, 10);
                state.experiences[expIdx].bullets.splice(bIdx, 1);
                renderExperienceEditors();
                renderPreview();
            });
        });

        container.querySelectorAll('.btn-add-bullet').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const expIdx = parseInt(e.target.dataset.expIdx, 10);
                state.experiences[expIdx].bullets.push("New tailored achievement bullet point.");
                renderExperienceEditors();
                renderPreview();
            });
        });
    }

    // ── DENSITY CONTROLS ─────────────────────────────────────────────────────
    function initDensityControl() {
        const radios = document.querySelectorAll('input[name="density-preset"]');
        radios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                state.density = e.target.value;
                renderPreview();
            });
        });
    }

    // ── LIVE DOM PREVIEW RENDERER ────────────────────────────────────────────
    function renderPreview() {
        const previewEl = document.getElementById('resume-preview-container');
        if (!previewEl) return;

        // Apply density class
        previewEl.className = `preview-page-container density-${state.density}`;

        // Get selected credentials
        const credsData = window.CREDENTIALS_DATA || [];
        const selectedCreds = credsData.filter(c => state.selectedCredIds.has(c.id));

        previewEl.innerHTML = `
            <div class="pv-header">
                <h1 class="pv-name">${escapeHtml(state.name)}</h1>
                <div style="font-weight:600; color:#0f172a; font-size:11px; margin-bottom:2px;">${escapeHtml(state.title)}</div>
                <div class="pv-contact">${escapeHtml(state.contact)}</div>
            </div>

            ${state.summary ? `
            <div class="pv-section">
                <div class="pv-section-title">Professional Summary</div>
                <div class="pv-summary">${escapeHtml(state.summary)}</div>
            </div>
            ` : ''}

            ${state.skills ? `
            <div class="pv-section">
                <div class="pv-section-title">Core Technical Skills</div>
                <div>${state.skills.split(',').map(s => `<span class="pv-skill-tag">${escapeHtml(s.trim())}</span>`).join('')}</div>
            </div>
            ` : ''}

            ${state.experiences.some((_, idx) => state.selectedExpIndices.has(idx)) ? `
            <div class="pv-section">
                <div class="pv-section-title">Professional Experience</div>
                ${state.experiences.map((exp, expIdx) => {
                    if (!state.selectedExpIndices.has(expIdx)) return '';
                    return `
                    <div class="pv-item">
                        <div class="pv-item-header">
                            <div><span class="pv-item-title">${escapeHtml(exp.role)}</span> <span class="pv-item-company">· ${escapeHtml(exp.company)}</span></div>
                            <span class="pv-item-date">${escapeHtml(exp.period)}</span>
                        </div>
                        <ul class="pv-bullet-list">
                            ${exp.bullets.filter(b => b.trim()).map(b => `<li>${escapeHtml(b)}</li>`).join('')}
                        </ul>
                    </div>
                    `;
                }).join('')}
            </div>
            ` : ''}

            ${selectedCreds.length > 0 ? `
            <div class="pv-section">
                <div class="pv-section-title">Featured Certifications & Credentials</div>
                <div class="pv-grid-2">
                    ${selectedCreds.map(c => `
                        <div style="margin-bottom:0.25rem;">
                            <strong style="color:#0f172a;">${escapeHtml(c.title || c.name)}</strong>
                            <div style="font-size:9.5px; color:#64748b;">${escapeHtml(c.provider || c.issuer || 'Certification')} ${c.earnedYear ? '· ' + c.earnedYear : ''}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ''}

            ${EDUCATION_DATA.some((_, idx) => state.selectedEduIndices.has(idx)) ? `
            <div class="pv-section">
                <div class="pv-section-title">Education &amp; Technical Training</div>
                ${EDUCATION_DATA.map((edu, eduIdx) => {
                    if (!state.selectedEduIndices.has(eduIdx)) return '';
                    return `
                    <div class="pv-item" style="margin-bottom:0.3rem;">
                        <div class="pv-item-header">
                            <div><span class="pv-item-title">${escapeHtml(edu.degree)}</span> <span class="pv-item-company">· ${escapeHtml(edu.institution)}</span></div>
                            <span class="pv-item-date">${escapeHtml(edu.period)}</span>
                        </div>
                    </div>
                    `;
                }).join('')}
            </div>
            ` : ''}

            <div class="page-break-line">
                <span class="page-break-label">1-Page Target Limit</span>
            </div>
        `;

        // Check overflow status
        setTimeout(checkPageBudget, 50);
    }

    function checkPageBudget() {
        const previewEl = document.getElementById('resume-preview-container');
        const statusDot = document.getElementById('budget-status-dot');
        const statusText = document.getElementById('budget-status-text');

        if (!previewEl || !statusDot || !statusText) return;

        // Content height vs 1-page bounds (~980px)
        const contentHeight = previewEl.scrollHeight;
        const pageLimit = 980;

        if (contentHeight > pageLimit) {
            statusDot.className = 'budget-dot overflow';
            statusText.textContent = `Overflow Warning (${contentHeight}px / ${pageLimit}px) - Switch to Compact/Micro`;
            statusText.style.color = '#f87171';
        } else {
            statusDot.className = 'budget-dot';
            statusText.textContent = `1 Page OK (${contentHeight}px / ${pageLimit}px)`;
            statusText.style.color = '#34d399';
        }
    }

    // ── ATS PDF GENERATION (pdfmake) ────────────────────────────────────────
    function initExportPdfButton() {
        const btn = document.getElementById('btn-export-pdf');
        btn?.addEventListener('click', generateAtsPdf);
    }

    function generateAtsPdf() {
        if (!window.pdfMake) {
            alert('PDF Generator library is loading. Please try again in a moment.');
            return;
        }

        const credsData = window.CREDENTIALS_DATA || [];
        const selectedCreds = credsData.filter(c => state.selectedCredIds.has(c.id));

        // Density configuration parameters for PDF
        let margins = [36, 36, 36, 36];
        let bodyFontSize = 10;
        let lineSpacing = 1.25;

        if (state.density === 'compact') {
            margins = [28, 28, 28, 28];
            bodyFontSize = 9.5;
            lineSpacing = 1.2;
        } else if (state.density === 'micro') {
            margins = [22, 22, 22, 22];
            bodyFontSize = 9;
            lineSpacing = 1.15;
        }

        // Pure ATS Text Structure Definition
        const docDefinition = {
            info: {
                title: `${state.name} - ${state.title} Resume`,
                author: state.name,
                subject: 'ATS-Ready Professional Resume',
                keywords: 'Resume, ATS, Software Developer, DevOps, Solutions Engineer'
            },
            pageSize: 'A4',
            pageMargins: margins,
            defaultStyle: {
                font: 'Roboto',
                fontSize: bodyFontSize,
                lineHeight: lineSpacing,
                color: '#1e293b'
            },
            styles: {
                headerName: {
                    fontSize: 18,
                    bold: true,
                    color: '#0f172a'
                },
                headerTitle: {
                    fontSize: 11,
                    bold: true,
                    color: '#0d9488',
                    margin: [0, 2, 0, 2]
                },
                headerContact: {
                    fontSize: 9,
                    color: '#475569',
                    margin: [0, 0, 0, 8]
                },
                sectionHeading: {
                    fontSize: 11,
                    bold: true,
                    color: '#0f172a',
                    margin: [0, 8, 0, 4]
                },
                itemRole: {
                    fontSize: 10,
                    bold: true,
                    color: '#0f172a'
                },
                itemCompany: {
                    fontSize: 9.5,
                    bold: true,
                    color: '#334155'
                },
                itemDate: {
                    fontSize: 9,
                    color: '#64748b',
                    alignment: 'right'
                },
                bulletItem: {
                    margin: [0, 1, 0, 1]
                }
            },
            content: [
                // Header
                { text: state.name.toUpperCase(), style: 'headerName' },
                { text: state.title, style: 'headerTitle' },
                { text: state.contact, style: 'headerContact' },
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 523, y2: 0, lineWidth: 1.5, lineColor: '#0f172a' }] },

                // Summary
                state.summary ? [
                    { text: 'PROFESSIONAL SUMMARY', style: 'sectionHeading' },
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 523, y2: 0, lineWidth: 0.5, lineColor: '#cbd5e1' }] },
                    { text: state.summary, margin: [0, 4, 0, 6] }
                ] : [],

                // Skills
                state.skills ? [
                    { text: 'CORE TECHNICAL SKILLS', style: 'sectionHeading' },
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 523, y2: 0, lineWidth: 0.5, lineColor: '#cbd5e1' }] },
                    { text: state.skills, margin: [0, 4, 0, 6] }
                ] : [],

                // Experience
                state.experiences.some((_, idx) => state.selectedExpIndices.has(idx)) ? [
                    { text: 'PROFESSIONAL EXPERIENCE', style: 'sectionHeading' },
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 523, y2: 0, lineWidth: 0.5, lineColor: '#cbd5e1' }] },
                    ...state.experiences.filter((_, idx) => state.selectedExpIndices.has(idx)).map(exp => {
                        const validBullets = exp.bullets.filter(b => b.trim());
                        return [
                            {
                                columns: [
                                    {
                                        text: [
                                            { text: exp.role, style: 'itemRole' },
                                            { text: ` · ${exp.company}`, style: 'itemCompany' }
                                        ]
                                    },
                                    { text: exp.period, style: 'itemDate' }
                                ],
                                margin: [0, 4, 0, 2]
                            },
                            validBullets.length > 0 ? {
                                ul: validBullets.map(b => ({ text: b, style: 'bulletItem' })),
                                margin: [0, 0, 0, 4]
                            } : []
                        ];
                    })
                ] : [],

                // Selected Certifications
                selectedCreds.length > 0 ? [
                    { text: 'FEATURED CERTIFICATIONS & CREDENTIALS', style: 'sectionHeading' },
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 523, y2: 0, lineWidth: 0.5, lineColor: '#cbd5e1' }] },
                    {
                        columns: [
                            {
                                ul: selectedCreds.slice(0, Math.ceil(selectedCreds.length / 2)).map(c => `${c.title || c.name} (${c.provider || c.issuer})`),
                                margin: [0, 4, 0, 6]
                            },
                            {
                                ul: selectedCreds.slice(Math.ceil(selectedCreds.length / 2)).map(c => `${c.title || c.name} (${c.provider || c.issuer})`),
                                margin: [0, 4, 0, 6]
                            }
                        ]
                    }
                ] : [],

                // Education & Technical Training
                EDUCATION_DATA.some((_, idx) => state.selectedEduIndices.has(idx)) ? [
                    { text: 'EDUCATION & TECHNICAL TRAINING', style: 'sectionHeading' },
                    { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 523, y2: 0, lineWidth: 0.5, lineColor: '#cbd5e1' }] },
                    ...EDUCATION_DATA.filter((_, idx) => state.selectedEduIndices.has(idx)).map(edu => ({
                        columns: [
                            {
                                text: [
                                    { text: edu.degree, style: 'itemRole' },
                                    { text: ` · ${edu.institution}`, style: 'itemCompany' }
                                ]
                            },
                            { text: edu.period, style: 'itemDate' }
                        ],
                        margin: [0, 2, 0, 2]
                    }))
                ] : []
            ]
        };

        // Generate and download
        const filename = `${state.name.replace(/\s+/g, '_')}_${state.roleKey.toUpperCase()}_Resume.pdf`;
        pdfMake.createPdf(docDefinition).download(filename);
    }

    function escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
})();
