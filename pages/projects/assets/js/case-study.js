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

    // Global Image Lightbox Modal system for project case studies
    function initImageZoom() {
        let modal = document.getElementById('image-lightbox-modal');
        let activeTrigger = null;

        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'image-lightbox-modal';
            modal.className = 'image-lightbox-modal';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-label', 'Expanded Image View');
            modal.setAttribute('aria-hidden', 'true');
            modal.innerHTML = `
                <div class="image-lightbox-modal__backdrop" data-close-modal></div>
                <button class="image-lightbox-modal__close" type="button" aria-label="Close expanded view" data-close-modal>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <div class="image-lightbox-modal__content">
                    <img class="image-lightbox-modal__img" src="" alt="">
                    <figcaption class="image-lightbox-modal__caption"></figcaption>
                </div>
            `;
            document.body.appendChild(modal);

            const closeModal = () => {
                modal.classList.remove('image-lightbox-modal--open');
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
                if (activeTrigger) {
                    activeTrigger.focus();
                    activeTrigger = null;
                }
            };

            modal.querySelectorAll('[data-close-modal]').forEach((el) => {
                el.addEventListener('click', closeModal);
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('image-lightbox-modal--open')) {
                    closeModal();
                }
            });
        }

        const modalImg = modal.querySelector('.image-lightbox-modal__img');
        const modalCaption = modal.querySelector('.image-lightbox-modal__caption');

        const openModalForElement = (container, triggerBtn) => {
            activeTrigger = triggerBtn || container;

            // Find currently visible image inside container
            const images = Array.from(container.querySelectorAll('img'));
            if (images.length === 0) return;

            let visibleImg = images.find((img) => {
                const style = window.getComputedStyle(img);
                return style.display !== 'none' && style.visibility !== 'hidden';
            }) || images[0];

            if (!visibleImg) return;

            const captionEl = container.querySelector('figcaption, .screenshot-caption, .placeholder-note');
            const captionText = captionEl ? captionEl.textContent.trim() : (visibleImg.alt || '');

            modalImg.src = visibleImg.currentSrc || visibleImg.src;
            modalImg.alt = visibleImg.alt || 'Expanded project image view';
            modalCaption.textContent = captionText;

            modal.classList.add('image-lightbox-modal--open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            const closeBtn = modal.querySelector('.image-lightbox-modal__close');
            if (closeBtn) closeBtn.focus();
        };

        // Attach zoom triggers to project images and containers
        const containers = document.querySelectorAll(
            '.project-diagram, .project-header__hero-container, .screenshot-frame, .visual-placeholder, figure'
        );

        containers.forEach((container) => {
            if (container.dataset.zoomInitialized === 'true') return;
            const images = container.querySelectorAll('img');
            if (images.length === 0) return;

            container.dataset.zoomInitialized = 'true';
            container.classList.add('zoomable-image-container');

            // Inject zoom button if not present
            if (!container.querySelector('.zoom-trigger-btn')) {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'zoom-trigger-btn';
                btn.setAttribute('aria-label', 'Zoom image in full screen');
                btn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                    <span>Zoom</span>
                `;

                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openModalForElement(container, btn);
                });

                container.appendChild(btn);
            }

            images.forEach((img) => {
                img.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openModalForElement(container, img);
                });
            });
        });
    }

    const initialMode = readMode();
    document.documentElement.dataset.caseStudyMode = initialMode;
    document.documentElement.dataset.caseStudyVersion = initialMode === 'article' ? 'v1' : 'v3';

    function initializeCaseStudyMode() {
        const shell = document.querySelector('[data-case-study-shell]');

        if (!shell) {
            delete document.documentElement.dataset.caseStudyMode;
            delete document.documentElement.dataset.caseStudyVersion;
            initImageZoom();
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

        initImageZoom();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeCaseStudyMode, { once: true });
    } else {
        initializeCaseStudyMode();
    }
})();
