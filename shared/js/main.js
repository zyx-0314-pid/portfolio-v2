(() => {
    const themeKey = 'portfolio-theme';

    const getStoredTheme = () => {
        try {
            const storedTheme = window.localStorage.getItem(themeKey);
            return storedTheme === 'light' ? 'light' : 'dark';
        } catch {
            return 'dark';
        }
    };

    const setTheme = (theme) => {
        const normalizedTheme = theme === 'light' ? 'light' : 'dark';
        document.documentElement.dataset.theme = normalizedTheme;

        const toggle = document.querySelector('[data-theme-toggle]');
        if (toggle) {
            const nextTheme = normalizedTheme === 'dark' ? 'light' : 'dark';
            const label = toggle.querySelector('[data-theme-toggle-label]');
            if (label) {
                label.textContent = nextTheme === 'dark' ? 'Dark' : 'Light';
            }
            toggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
            toggle.setAttribute('title', `Switch to ${nextTheme} theme`);
            toggle.dataset.theme = normalizedTheme;
        }

        try {
            window.localStorage.setItem(themeKey, normalizedTheme);
        } catch {
            // Ignore storage failures and keep the current session theme.
        }
    };

    const initializeTheme = () => {
        setTheme(getStoredTheme());

        document.querySelectorAll('[data-theme-toggle]').forEach((toggle) => {
            toggle.addEventListener('click', () => {
                const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
                setTheme(nextTheme);
            });
        });
    };

    const initializeNavigation = () => {
        const nav = document.querySelector('[data-site-nav]');
        if (!nav) {
            return;
        }

        const toggle = nav.querySelector('[data-nav-toggle]');
        const menu = nav.querySelector('[data-nav-menu]');

        if (!toggle || !menu) {
            return;
        }

        const closeMenu = () => {
            nav.dataset.open = 'false';
            toggle.setAttribute('aria-expanded', 'false');
        };

        const openMenu = () => {
            nav.dataset.open = 'true';
            toggle.setAttribute('aria-expanded', 'true');
            menu.hidden = false;
        };

        toggle.addEventListener('click', () => {
            if (nav.dataset.open === 'true') {
                closeMenu();
                return;
            }

            openMenu();
        });

        menu.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && nav.dataset.open === 'true') {
                closeMenu();
                toggle.focus();
            }
        });

        document.addEventListener('click', (event) => {
            if (nav.dataset.open !== 'true') {
                return;
            }

            if (!nav.contains(event.target)) {
                closeMenu();
            }
        });

        const desktopQuery = window.matchMedia('(min-width: 761px)');
        const syncMenuState = () => {
            if (desktopQuery.matches) {
                nav.dataset.open = 'false';
                toggle.setAttribute('aria-expanded', 'false');
                menu.hidden = false;
            } else {
                menu.hidden = false;
                closeMenu();
            }
        };

        desktopQuery.addEventListener('change', syncMenuState);
        syncMenuState();
    };

    const initializeActiveNavigation = () => {
        const currentPath = window.location.pathname.replace(/\\/g, '/').toLowerCase();
        const sectionMatch = currentPath.match(/\/pages\/(projects|experience|about|skills|credentials|resume|contact)\//);
        const activeSection = sectionMatch ? sectionMatch[1] : null;

        document.querySelectorAll('.site-nav__menu a').forEach((link) => {
            const linkSection = link.textContent.trim().toLowerCase();

            if (activeSection && linkSection === activeSection) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const initializeSectionNavigator = () => {
        const sections = Array.from(document.querySelectorAll('main section'));
        if (!sections.length) {
            return;
        }

        const navigator = document.createElement('nav');
        navigator.className = 'section-navigator';
        navigator.setAttribute('aria-label', 'Page sections');

        const list = document.createElement('ol');
        list.className = 'section-navigator__list';

        const getSectionIcon = (label) => {
            const normalizedLabel = label.toLowerCase();
            const iconRules = [
                [/home|full-stack engineering|introduction/, 'fa-house'],
                [/tool|workflow|technology|stack/, 'fa-screwdriver-wrench'],
                [/capabilit|skill|technical scope/, 'fa-layer-group'],
                [/experience|professional|role|responsibilit/, 'fa-briefcase'],
                [/principle|approach|decision/, 'fa-compass-drafting'],
                [/case stud|project|work|archive/, 'fa-folder-open'],
                [/about|perspective|interest/, 'fa-user'],
                [/contact|email/, 'fa-envelope'],
                [/credential|education|certif/, 'fa-award'],
                [/resume/, 'fa-file-lines']
            ];

            return iconRules.find(([pattern]) => pattern.test(normalizedLabel))?.[1] || 'fa-code';
        };

        const entries = sections.map((section, index) => {
            if (!section.id) {
                section.id = `page-section-${index + 1}`;
            }

            const labelledBy = section.getAttribute('aria-labelledby');
            const labelledHeading = labelledBy ? document.getElementById(labelledBy) : null;
            const visibleLabel = section.querySelector('.section__eyebrow, h1, h2');
            const label = (labelledHeading || visibleLabel)?.textContent.trim() || `Section ${index + 1}`;

            const item = document.createElement('li');
            const button = document.createElement('button');
            button.className = 'section-navigator__button';
            button.type = 'button';
            button.setAttribute('aria-label', `Go to ${label}`);
            const icon = document.createElement('i');
            icon.className = `section-navigator__icon fa-solid ${getSectionIcon(label)}`;
            icon.setAttribute('aria-hidden', 'true');
            button.append(icon);

            const labelElement = document.createElement('span');
            labelElement.className = 'section-navigator__label';
            labelElement.textContent = label;
            button.append(labelElement);

            button.addEventListener('click', () => {
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });

            button.addEventListener('keydown', (event) => {
                if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
                    return;
                }

                event.preventDefault();
                const direction = event.key === 'ArrowDown' ? 1 : -1;
                const targetIndex = Math.min(Math.max(index + direction, 0), sections.length - 1);
                entries[targetIndex].button.focus();
                sections[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
            });

            item.append(button);
            list.append(item);
            return { button, section };
        });

        const updateCurrentSection = () => {
            const viewportReference = window.innerHeight * 0.42;
            let currentIndex = 0;
            let closestDistance = Number.POSITIVE_INFINITY;

            entries.forEach((entry, index) => {
                const distance = Math.abs(entry.section.getBoundingClientRect().top - viewportReference);
                if (distance < closestDistance) {
                    closestDistance = distance;
                    currentIndex = index;
                }
            });

            entries.forEach((entry, index) => {
                if (index === currentIndex) {
                    entry.button.setAttribute('aria-current', 'true');
                } else {
                    entry.button.removeAttribute('aria-current');
                }
            });
        };

        let updateQueued = false;
        const requestCurrentSectionUpdate = () => {
            if (updateQueued) {
                return;
            }

            updateQueued = true;
            window.requestAnimationFrame(() => {
                updateCurrentSection();
                updateQueued = false;
            });
        };

        navigator.append(list);
        document.body.append(navigator);
        window.addEventListener('scroll', requestCurrentSectionUpdate, { passive: true });
        window.addEventListener('resize', requestCurrentSectionUpdate);
        updateCurrentSection();
    };

    initializeTheme();
    initializeNavigation();
    initializeActiveNavigation();
    initializeSectionNavigator();
})();
