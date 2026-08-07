(() => {
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
})();