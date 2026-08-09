(function () {
    'use strict';

    const STORAGE_KEY = 'portfolio-case-study-mode';
    const DEFAULT_MODE = 'visual';
    const VALID_MODES = new Set(['article', 'visual']);

    function readMode() {
        try {
            const storedMode = localStorage.getItem(STORAGE_KEY);
            return VALID_MODES.has(storedMode) ? storedMode : DEFAULT_MODE;
        } catch {
            return DEFAULT_MODE;
        }
    }

    function storeMode(mode) {
        try {
            localStorage.setItem(STORAGE_KEY, mode);
        } catch {
            // The selected mode still applies for this visit when storage is unavailable.
        }
    }

    function createVisualMedia(shell) {
        if (shell.dataset.visualMediaReady === 'true') {
            return;
        }

        const projectName = shell.querySelector('.project-header__title')?.textContent.trim() || 'Project';
        const sections = Array.from(shell.querySelectorAll('.project-section'))
            .filter((section) => !section.querySelector('img, video, .screenshot-frame'));
        const interval = Math.max(1, Math.ceil(sections.length / 4));
        const selectedSections = sections.filter((section, index) => (index + 1) % interval === 0).slice(0, 4);
        const formats = ['wide', 'inset', 'wide', 'portrait'];

        selectedSections.forEach((section, index) => {
            const heading = section.querySelector('h2');

            if (!heading) {
                return;
            }

            const topic = heading.textContent.trim();
            const narrativeAnchor = heading.nextElementSibling || heading;
            const figure = document.createElement('figure');
            const image = document.createElement('img');
            const note = document.createElement('figcaption');

            figure.className = `visual-placeholder visual-placeholder--${formats[index % formats.length]}`;
            figure.dataset.visualOnly = '';
            image.src = `https://placehold.co/1200x800?text=${encodeURIComponent(`${projectName}: ${topic}`)}`;
            image.alt = `Placeholder for ${projectName} case-study media about ${topic}.`;
            image.width = 1200;
            image.height = 800;
            image.loading = 'lazy';
            image.decoding = 'async';
            note.className = 'placeholder-note';
            note.textContent = `Temporary: replace with approved ${topic.toLowerCase()} evidence using this composition; show the relevant interface, workflow, or technical decision, then remove this note.`;

            figure.append(image, note);
            narrativeAnchor.insertAdjacentElement('afterend', figure);
        });

        shell.dataset.visualMediaReady = 'true';
    }

    function syncVisualMedia(mode, shell) {
        if (mode === 'visual') {
            createVisualMedia(shell);
        }

        shell.querySelectorAll('[data-visual-only]').forEach((element) => {
            element.hidden = mode !== 'visual';
        });
    }

    function applyMode(mode, controls = [], shell = null) {
        document.documentElement.dataset.caseStudyMode = mode;
        document.documentElement.dataset.caseStudyVersion = mode === 'article' ? 'v1' : 'v3';

        controls.forEach((button) => {
            const isActive = button.dataset.caseStudyModeValue === mode;
            button.setAttribute('aria-pressed', String(isActive));
        });

        if (shell) {
            syncVisualMedia(mode, shell);
        }
    }

    const initialMode = readMode();
    document.documentElement.dataset.caseStudyMode = initialMode;
    document.documentElement.dataset.caseStudyVersion = initialMode === 'article' ? 'v1' : 'v3';

    function initializeCaseStudyMode() {
        const shell = document.querySelector('[data-case-study-shell]');

        if (!shell) {
            delete document.documentElement.dataset.caseStudyMode;
            delete document.documentElement.dataset.caseStudyVersion;
            return;
        }

        const controls = Array.from(shell.querySelectorAll('[data-case-study-mode-value]'));
        applyMode(initialMode, controls, shell);

        controls.forEach((button) => {
            button.addEventListener('click', () => {
                const nextMode = button.dataset.caseStudyModeValue;

                if (!VALID_MODES.has(nextMode)) {
                    return;
                }

                applyMode(nextMode, controls, shell);
                storeMode(nextMode);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCaseStudyMode, { once: true });
    } else {
        initializeCaseStudyMode();
    }
})();
