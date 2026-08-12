/**
 * Cover Letter & ATS PDF Builder Logic
 * Uses pdfmake via CDNJS for client-side ATS vector text PDF generation.
 */

(function () {
    'use strict';

    // ── COVER LETTER ROLE PRESETS ───────────────────────────────────────────
    const CL_ROLE_PRESETS = {
        developer: {
            position: "Full-Stack Software Developer",
            paragraph1: "I am writing to express my strong enthusiasm for the Full-Stack Software Developer position at your organization. As a software developer with experience engineering scalable web applications, RESTful APIs, and responsive frontends, I am excited about the opportunity to contribute to your engineering team.",
            paragraph2: "In my current role as a Full-Stack Engineer & DevOps Engineer at People Dynamics Inc., I modernized 4+ HR SaaS assessment platforms (GoPick, JFP-GoPick, AC Local) by implementing N-Layer architecture, decoupling legacy PHP modules, and developing 20+ secure RESTful API endpoints. My technical background includes modern JavaScript, TypeScript, React, Next.js, Node.js, and Java Spring Boot. Additionally, my experience instructing 300+ engineering students at FEU Institute of Technology has sharpened my commitment to code readability, software quality assurance, and structured documentation.",
            paragraph3: "I would welcome the opportunity to discuss how my full-stack background, problem-solving skills, and architectural discipline can add immediate value to your technical projects. Thank you for your time and consideration."
        },
        devops: {
            position: "DevOps & Infrastructure Engineer",
            paragraph1: "I am writing to express my strong interest in the DevOps & Infrastructure Engineer role at your organization. With hands-on experience containerizing services, automating CI/CD pipelines, and maintaining cloud infrastructure, I am eager to help optimize your deployment delivery and system availability.",
            paragraph2: "At People Dynamics Inc., I configured Docker containerization for PHP, Redis, and MySQL environments while automating GitHub Actions CI/CD workflows for deployments to AWS EC2. I managed AWS infrastructure (EC2, RDS, S3, CloudFront), automated local database seeding tools, and enforced static code analysis using PHPStan and Playwright testing workflows to maintain 99.9% application uptime. My background also encompasses managing 25+ domain DNS configurations, SSL certificates, and email systems for SaaS operations.",
            paragraph3: "I am confident in my ability to streamline your delivery pipelines and strengthen server infrastructure. I look forward to the opportunity to connect and discuss how my skills align with your engineering goals."
        },
        solutions_engineer: {
            position: "Solutions Engineer",
            paragraph1: "I am writing to apply for the Solutions Engineer position at your organization. Bringing a unique combination of full-stack engineering capability, system architecture experience, and technical stakeholder alignment, I am passionate about crafting effective technical solutions for complex client needs.",
            paragraph2: "At People Dynamics Inc., I architected solutions for international HR SaaS assessment platforms (GoPick & JFP), serving multi-region client assessment workflows and GDPR benchmarks. I authored the comprehensive GoPick Engineering Manual to centralize developer standards, QA boundaries, and operational guardrails across cross-functional teams. Furthermore, my background leading 20+ technical design reviews for capstone software engineering projects enables me to effectively bridge technical requirements with business strategy.",
            paragraph3: "I am excited about the prospect of bringing my technical expertise and client-focused consultation approach to your team. Thank you for considering my application, and I look forward to discussing next steps."
        }
    };

    // ── STATE ────────────────────────────────────────────────────────────────
    let state = {
        roleKey: 'developer',
        name: 'Ian Cedric Ramirez',
        contact: 'Manila, Philippines | ramirezian037@gmail.com | github.com/nyebe | linkedin.com/in/ian-cedric-ramirez',
        date: getFormattedTodayDate(),
        recipientName: 'Hiring Manager',
        companyName: 'Technology Hiring Team',
        targetPosition: CL_ROLE_PRESETS.developer.position,
        salutation: 'Dear Hiring Manager,',
        paragraph1: CL_ROLE_PRESETS.developer.paragraph1,
        paragraph2: CL_ROLE_PRESETS.developer.paragraph2,
        paragraph3: CL_ROLE_PRESETS.developer.paragraph3,
        signoff: 'Sincerely,'
    };

    // ── INITIALIZATION ───────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        initRoleSelector();
        initFormBindings();
        initExportPdfButton();

        // Initial preview render
        renderPreview();
    });

    // ── ROLE SELECTOR ────────────────────────────────────────────────────────
    function initRoleSelector() {
        const roleRadios = document.querySelectorAll('input[name="cl-role-preset"]');
        roleRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                const roleKey = e.target.value;
                if (CL_ROLE_PRESETS[roleKey]) {
                    state.roleKey = roleKey;
                    state.targetPosition = CL_ROLE_PRESETS[roleKey].position;
                    state.paragraph1 = CL_ROLE_PRESETS[roleKey].paragraph1;
                    state.paragraph2 = CL_ROLE_PRESETS[roleKey].paragraph2;
                    state.paragraph3 = CL_ROLE_PRESETS[roleKey].paragraph3;

                    // Update form values
                    document.getElementById('cl-input-target-position').value = state.targetPosition;
                    document.getElementById('cl-input-paragraph-1').value = state.paragraph1;
                    document.getElementById('cl-input-paragraph-2').value = state.paragraph2;
                    document.getElementById('cl-input-paragraph-3').value = state.paragraph3;

                    renderPreview();
                }
            });
        });

        // Set initial form values
        document.getElementById('cl-input-date').value = state.date;
        document.getElementById('cl-input-target-position').value = state.targetPosition;
        document.getElementById('cl-input-paragraph-1').value = state.paragraph1;
        document.getElementById('cl-input-paragraph-2').value = state.paragraph2;
        document.getElementById('cl-input-paragraph-3').value = state.paragraph3;
    }

    // ── FORM BINDINGS ────────────────────────────────────────────────────────
    function initFormBindings() {
        const bindInput = (id, key) => {
            const el = document.getElementById(id);
            el?.addEventListener('input', (e) => {
                state[key] = e.target.value;
                renderPreview();
            });
        };

        bindInput('cl-input-name', 'name');
        bindInput('cl-input-contact', 'contact');
        bindInput('cl-input-date', 'date');
        bindInput('cl-input-recipient-name', 'recipientName');
        bindInput('cl-input-company-name', 'companyName');
        bindInput('cl-input-target-position', 'targetPosition');
        bindInput('cl-input-salutation', 'salutation');
        bindInput('cl-input-paragraph-1', 'paragraph1');
        bindInput('cl-input-paragraph-2', 'paragraph2');
        bindInput('cl-input-paragraph-3', 'paragraph3');
        bindInput('cl-input-signoff', 'signoff');

        // Refresh / Sync Buttons
        const syncHandler = () => {
            renderPreview();
            const statusText = document.getElementById('cl-budget-text');
            if (statusText) {
                statusText.textContent = '✨ Cover Letter Updated!';
                setTimeout(checkPageBudget, 1200);
            }
        };

        document.getElementById('btn-cl-refresh')?.addEventListener('click', syncHandler);
        document.getElementById('btn-cl-toolbar-sync')?.addEventListener('click', syncHandler);
    }

    // ── LIVE PREVIEW RENDERER ────────────────────────────────────────────────
    function renderPreview() {
        const container = document.getElementById('cl-preview-container');
        if (!container) return;

        container.innerHTML = `
            <div class="cl-header-name">${escapeHtml(state.name)}</div>
            <div class="cl-header-sub">APPLICANT FOR: ${escapeHtml(state.targetPosition).toUpperCase()}</div>
            <div class="cl-header-contact">${escapeHtml(state.contact)}</div>

            <div class="cl-date-line">${escapeHtml(state.date)}</div>

            <div class="cl-recipient-block">
                <div class="cl-recipient-name">${escapeHtml(state.recipientName)}</div>
                <div class="cl-recipient-company">${escapeHtml(state.companyName)}</div>
                <div>Re: Application for ${escapeHtml(state.targetPosition)}</div>
            </div>

            <div class="cl-salutation">${escapeHtml(state.salutation)}</div>

            ${state.paragraph1 ? `<div class="cl-paragraph">${escapeHtml(state.paragraph1)}</div>` : ''}
            ${state.paragraph2 ? `<div class="cl-paragraph">${escapeHtml(state.paragraph2)}</div>` : ''}
            ${state.paragraph3 ? `<div class="cl-paragraph">${escapeHtml(state.paragraph3)}</div>` : ''}

            <div class="cl-signoff-block">
                <div>${escapeHtml(state.signoff)}</div>
                <div class="cl-signature-name">${escapeHtml(state.name)}</div>
            </div>

            <div class="page-break-line">
                <span class="page-break-label">1-Page Target Limit</span>
            </div>
        `;

        setTimeout(checkPageBudget, 50);
    }

    function checkPageBudget() {
        const previewEl = document.getElementById('cl-preview-container');
        const statusDot = document.getElementById('cl-budget-dot');
        const statusText = document.getElementById('cl-budget-text');

        if (!previewEl || !statusDot || !statusText) return;

        const contentHeight = previewEl.scrollHeight;
        const pageLimit = 980;

        if (contentHeight > pageLimit) {
            statusDot.className = 'budget-dot overflow';
            statusText.textContent = `Overflow Warning (${contentHeight}px / ${pageLimit}px)`;
            statusText.style.color = '#f87171';
        } else {
            statusDot.className = 'budget-dot';
            statusText.textContent = `1 Page OK (${contentHeight}px / ${pageLimit}px)`;
            statusText.style.color = '#34d399';
        }
    }

    // ── EXPORT PDF ENGINE (pdfmake) ──────────────────────────────────────────
    function initExportPdfButton() {
        const btn = document.getElementById('btn-cl-export-pdf');
        btn?.addEventListener('click', () => {
            generateCoverLetterPdf();
        });
    }

    function generateCoverLetterPdf() {
        if (typeof pdfMake === 'undefined') {
            alert('PDF Generator engine is loading, please try again in a moment.');
            return;
        }

        const docDefinition = {
            pageSize: 'A4',
            pageMargins: [40, 40, 40, 40],
            defaultStyle: {
                font: 'Roboto',
                fontSize: 10.5,
                color: '#334155',
                lineHeight: 1.3
            },
            styles: {
                nameHeader: {
                    fontSize: 18,
                    bold: true,
                    color: '#0f172a',
                    margin: [0, 0, 0, 2]
                },
                positionSub: {
                    fontSize: 10,
                    bold: true,
                    color: '#1e293b',
                    margin: [0, 0, 0, 4]
                },
                contactLine: {
                    fontSize: 9,
                    color: '#64748b',
                    margin: [0, 0, 0, 10]
                },
                dateText: {
                    fontSize: 10,
                    color: '#475569',
                    margin: [0, 12, 0, 12]
                },
                recipientName: {
                    fontSize: 10.5,
                    bold: true,
                    color: '#0f172a'
                },
                recipientCompany: {
                    fontSize: 10,
                    bold: true,
                    color: '#334155'
                },
                salutationText: {
                    fontSize: 10.5,
                    bold: true,
                    color: '#0f172a',
                    margin: [0, 12, 0, 8]
                },
                bodyParagraph: {
                    fontSize: 10,
                    lineHeight: 1.4,
                    color: '#334155',
                    margin: [0, 0, 0, 10],
                    alignment: 'justify'
                },
                signoffText: {
                    fontSize: 10,
                    color: '#0f172a',
                    margin: [0, 16, 0, 0]
                },
                signatureName: {
                    fontSize: 11,
                    bold: true,
                    color: '#0f172a',
                    margin: [0, 24, 0, 0]
                }
            },
            content: [
                // Header
                { text: state.name.toUpperCase(), style: 'nameHeader' },
                { text: `APPLICANT FOR: ${state.targetPosition.toUpperCase()}`, style: 'positionSub' },
                { text: state.contact, style: 'contactLine' },
                { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1.5, lineColor: '#0f172a' }] },

                // Date
                { text: state.date, style: 'dateText' },

                // Recipient
                { text: state.recipientName, style: 'recipientName' },
                { text: state.companyName, style: 'recipientCompany' },
                { text: `Re: Application for ${state.targetPosition}`, fontSize: 9.5, color: '#64748b', margin: [0, 2, 0, 12] },

                // Salutation
                { text: state.salutation, style: 'salutationText' },

                // Paragraphs
                state.paragraph1 ? { text: state.paragraph1, style: 'bodyParagraph' } : [],
                state.paragraph2 ? { text: state.paragraph2, style: 'bodyParagraph' } : [],
                state.paragraph3 ? { text: state.paragraph3, style: 'bodyParagraph' } : [],

                // Sign-off
                { text: state.signoff, style: 'signoffText' },
                { text: state.name.toUpperCase(), style: 'signatureName' }
            ]
        };

        const filename = `${state.name.replace(/\s+/g, '_')}_${state.roleKey.toUpperCase()}_Cover_Letter.pdf`;
        pdfMake.createPdf(docDefinition).download(filename);
    }

    function getFormattedTodayDate() {
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return today.toLocaleDateString('en-US', options);
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
