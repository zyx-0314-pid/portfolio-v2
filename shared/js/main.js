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
            menu.hidden = true;
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

    initializeTheme();
    initializeNavigation();
    initializeActiveNavigation();
})();