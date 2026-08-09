(() => {
    const themeKey = 'portfolio-theme';
    const analyticsConsentKey = 'portfolio-analytics-consent';

    const getRootPath = () => {
        const path = window.location.pathname.replace(/\\/g, '/');
        const pagesIndex = path.indexOf('/pages/');

        if (pagesIndex === -1) {
            return './';
        }

        const afterPages = path.slice(pagesIndex + '/pages/'.length);
        const segments = afterPages.split('/').filter(Boolean);
        const pageDepth = Math.max(segments.length + 1, 2);

        return '../'.repeat(pageDepth);
    };

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

        updateThemeImages(normalizedTheme);

        try {
            window.localStorage.setItem(themeKey, normalizedTheme);
        } catch {
            // Ignore storage failures and keep the current session theme.
        }
    };

    const updateThemeImages = (theme) => {
        document.querySelectorAll('img[data-src-light][data-src-dark]').forEach((img) => {
            const targetSrc = theme === 'light' ? img.dataset.srcLight : img.dataset.srcDark;
            if (targetSrc && img.getAttribute('src') !== targetSrc) {
                img.setAttribute('src', targetSrc);
            }
        });
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
        const sectionMatch = currentPath.match(/\/pages\/(projects|experience|about|skills|credentials|contact)\//);
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
        const sections = Array.from(document.querySelectorAll('main > header, main > article > header, main section'));
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
                [/\b(fitness|run|swim|hike|train)\b/, 'fa-person-running'],
                [/travel|exploration/, 'fa-map-location-dot'],
                [/ideas|history|civilization/, 'fa-landmark'],
                [/making|tinkering/, 'fa-hammer'],
                [/games?/, 'fa-gamepad'],
                [/music/, 'fa-music'],
                [/manga|manhwa|manhua|manfra|anime|read?/, 'fa-book-open-reader'],
                [/photography|photo/, 'fa-camera'],
                [/reading|books?/, 'fa-book-open'],
                [/closing|portfolio navigation/, 'fa-arrow-up-right-from-square'],
                [/^skills$/, 'fa-code'],
                [/skills directory|directory|gallery/, 'fa-table-list'],
                [/^projects$/, 'fa-folder-open'],
                [/project catalog filters?/, 'fa-sliders'],
                [/project catalog/, 'fa-grip'],
                [/^credentials|credentials & certifications/, 'fa-award'],
                [/credential filters?/, 'fa-filter'],
                [/certifications?/, 'fa-certificate'],
                [/training|programs?/, 'fa-graduation-cap'],
                [/let'?s talk/, 'fa-comment-dots'],
                [/contact channels?/, 'fa-address-book'],
                [/contact protocol|protocol summary/, 'fa-clipboard-check'],
                [/secondary technical areas?/, 'fa-diagram-project'],
                [/^2025$/, 'fa-calendar-check'],
                [/^2024$/, 'fa-calendar-days'],
                [/^2023$/, 'fa-calendar'],
                [/overview|context|setting|environment|positioning|purpose|audience/, 'fa-circle-info'],
                [/problem|challenge|needed/, 'fa-triangle-exclamation'],
                [/goals?/, 'fa-bullseye'],
                [/constraints?|boundary/, 'fa-border-all'],
                [/responsibilities|contributions?|ownership|leadership|role/, 'fa-user-tie'],
                [/solution|strategy|migration|modernization|refactoring/, 'fa-route'],
                [/architecture|structure|ecosystem|hierarchy|model|n-layer|layer|boundaries/, 'fa-diagram-project'],
                [/data|database|schema|relational|isolation/, 'fa-database'],
                [/infrastructure|deployment|devops|ci\/cd|github actions|dockerized|local network|lan|station setup/, 'fa-server'],
                [/security|access control|rbac|authentication|permission/, 'fa-shield-halved'],
                [/reliability|observability|monitoring|analytics|health|audit logging/, 'fa-chart-line'],
                [/workflow|lifecycle|pipeline|flow|tracking|scan|reservation|payment|delivery|route/, 'fa-arrows-spin'],
                [/testing|verification|validation|quality|functional|api|end-to-end|performance|seo/, 'fa-vial-circle-check'],
                [/features?|modules?|platforms?|subsystem|services|endpoint|application|website|wordpress/, 'fa-puzzle-piece'],
                [/technology|components?|tooling|stack/, 'fa-screwdriver-wrench'],
                [/documentation|manual|knowledge|records|evidence|links|credentials|related/, 'fa-file-lines'],
                [/results?|outcomes?/, 'fa-square-check'],
                [/lessons?|retrospective|takeaway|tradeoffs?/, 'fa-scale-balanced'],
                [/screenshots?|media|uploads|video|photo/, 'fa-image'],
                [/accounts?|profile|student|organization|relationship|follow|messaging|chat|feed|social/, 'fa-network-wired'],
                [/qr|barcode|identification/, 'fa-qrcode'],
                [/storage|container|resource|capacity|maintenance|repair/, 'fa-box-archive'],
                [/automation|integrations?/, 'fa-plug-circle-bolt'],
                [/support|incident|root-cause|error|exception/, 'fa-life-ring'],
                [/teaching|instruction|academic|course|training|tesda|immersion/, 'fa-chalkboard-user'],
                [/research|prototype|accessibility|haptic|audio|spatial|device|hardware/, 'fa-magnifying-glass-chart'],
                [/before-state|standards?|discipline/, 'fa-list-check'],
                [/dashboard|visibility|reporting|sales/, 'fa-chart-simple'],
                [/evolution|breakdown/, 'fa-code-branch'],
                [/hall of fame|recognition|achievement/, 'fa-trophy'],
                [/templates?|web design|implementation|preparation/, 'fa-pen-ruler'],
                [/tool|workflow|technology|stack/, 'fa-screwdriver-wrench'],
                [/capabilit|skill|technical scope/, 'fa-layer-group'],
                [/experience|professional|role|responsibilit/, 'fa-briefcase'],
                [/principle|approach|decision/, 'fa-compass-drafting'],
                [/case stud|project|work|archive/, 'fa-folder-open'],
                [/about|perspective|interest/, 'fa-user'],
                [/contact|email/, 'fa-envelope'],
                [/credential|education|certif/, 'fa-award'],
                [/filter|sort|control/, 'fa-sliders'],
                [/year|timeline|history|period|\d{4}/, 'fa-calendar-days']
            ];

            return iconRules.find(([pattern]) => pattern.test(normalizedLabel))?.[1] || 'fa-code';
        };

        const scrollToSection = (targetSection) => {
            const header = document.querySelector('.site-header');
            const headerHeight = header ? header.getBoundingClientRect().height : 80;
            const extraPadding = 24;
            const targetY = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight - extraPadding;

            window.scrollTo({
                top: Math.max(0, targetY),
                behavior: 'smooth'
            });
        };

        const entries = sections.map((section, index) => {
            if (!section.id) {
                section.id = `page-section-${index + 1}`;
            }

            const sectionLabel = section.getAttribute('aria-label');
            const labelledBy = section.getAttribute('aria-labelledby');
            const labelledHeading = labelledBy ? document.getElementById(labelledBy) : null;
            const visibleLabel = section.querySelector('.section__eyebrow, h1, h2');
            const label = sectionLabel || (labelledHeading || visibleLabel)?.textContent.trim() || `Section ${index + 1}`;

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
                scrollToSection(section);
            });

            button.addEventListener('keydown', (event) => {
                if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
                    return;
                }

                event.preventDefault();
                const direction = event.key === 'ArrowDown' ? 1 : -1;
                const targetIndex = Math.min(Math.max(index + direction, 0), sections.length - 1);
                entries[targetIndex].button.focus();
                scrollToSection(sections[targetIndex]);
            });

            item.append(button);
            list.append(item);
            return { button, section };
        });

        const updateCurrentSection = () => {
            const header = document.querySelector('.site-header');
            const headerHeight = header ? header.getBoundingClientRect().height : 80;
            const viewportReference = headerHeight + 50;
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

    const initializeStickySectionNavigation = () => {
        const main = document.querySelector('main');
        if (!main) {
            return;
        }

        if (main.querySelector(':scope > .experience-page')) {
            return;
        }

        const existingNav = document.querySelector('[data-sticky-nav]');
        const usedIds = new Set(Array.from(document.querySelectorAll('[id]')).map((element) => element.id));
        const toSectionId = (label, index) => {
            const base = label
                .toLowerCase()
                .replace(/&/g, ' and ')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '') || `page-section-${index + 1}`;
            let id = base;
            let count = 2;

            while (usedIds.has(id)) {
                id = `${base}-${count}`;
                count += 1;
            }

            usedIds.add(id);
            return id;
        };

        const getSectionLabel = (section) => {
            const labelledBy = section.getAttribute('aria-labelledby');
            const labelledHeading = labelledBy ? document.getElementById(labelledBy) : null;
            const visibleHeading = section.querySelector('h2, h1, .section__eyebrow');
            return section.getAttribute('aria-label') || (labelledHeading || visibleHeading)?.textContent.trim() || '';
        };

        const sections = Array.from(main.querySelectorAll(':scope > header, :scope > article > header, section')).filter((section, index) => {
            if (section.closest('.cookie-consent')) {
                return false;
            }

            const label = getSectionLabel(section);
            if (!label) {
                return false;
            }

            if (!section.id) {
                section.id = toSectionId(label, index);
            }

            return true;
        });

        if (existingNav) {
            initializeStickyNavState(existingNav);
            return;
        }

        if (sections.length < 2) {
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'sticky-nav-wrapper';

        const shell = document.createElement('div');
        shell.className = 'page-shell';

        const nav = document.createElement('nav');
        nav.className = 'sticky-nav';
        nav.dataset.stickyNav = '';
        nav.setAttribute('aria-label', 'Page section navigator');

        const list = document.createElement('ul');
        list.className = 'sticky-nav__list';

        sections.forEach((section) => {
            const label = getSectionLabel(section);

            if (!label) {
                return;
            }

            const item = document.createElement('li');
            const link = document.createElement('a');
            link.className = 'sticky-nav__link';
            link.href = `#${section.id}`;
            link.textContent = label;
            item.append(link);
            list.append(item);
        });

        if (!list.children.length) {
            return;
        }

        nav.append(list);
        shell.append(nav);
        wrapper.append(shell);

        const firstSection = sections[0];
        const firstSectionIsHero = Boolean(firstSection.querySelector('h1'));
        firstSection.insertAdjacentElement(firstSectionIsHero ? 'afterend' : 'beforebegin', wrapper);
        initializeStickyNavState(nav);
    };

    const initializeStickyNavState = (stickyNav) => {
        const links = Array.from(stickyNav.querySelectorAll('.sticky-nav__link'));
        if (!links.length) {
            return;
        }

        const sections = links
            .map((link) => document.getElementById(link.getAttribute('href')?.replace('#', '') || ''))
            .filter(Boolean);

        if (!sections.length) {
            return;
        }

        const setActiveLink = (id) => {
            links.forEach((link) => {
                const targetId = link.getAttribute('href')?.replace('#', '');
                if (targetId === id) {
                    link.classList.add('is-active');
                    link.setAttribute('aria-current', 'true');
                    link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    return;
                }

                link.classList.remove('is-active');
                link.removeAttribute('aria-current');
            });
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        }, {
            root: null,
            rootMargin: '-20% 0px -55% 0px',
            threshold: 0
        });

        sections.forEach((section) => observer.observe(section));

        if (window.location.hash) {
            const initialId = window.location.hash.slice(1);
            if (document.getElementById(initialId)) {
                window.setTimeout(() => setActiveLink(initialId), 100);
            }
        } else {
            setActiveLink(sections[0].id);
        }
    };

    const initializePrivacyFooterLink = () => {
        const footerLinks = document.querySelector('.site-footer__links');
        if (!footerLinks || footerLinks.querySelector('[data-privacy-link]')) {
            return;
        }

        const rootPath = getRootPath();
        const privacyLink = document.createElement('a');
        privacyLink.href = `${rootPath}pages/privacy/`;
        privacyLink.dataset.privacyLink = 'true';
        privacyLink.textContent = 'Privacy';

        footerLinks.append(privacyLink);
    };

    const loadGoogleAnalytics = (measurementId) => {
        if (!measurementId || window.portfolioAnalyticsLoaded) {
            return;
        }

        window.portfolioAnalyticsLoaded = true;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () {
            window.dataLayer.push(arguments);
        };

        window.gtag('js', new Date());
        window.gtag('config', measurementId, { anonymize_ip: true });

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
        document.head.append(script);
    };

    const initializeCookieConsent = () => {
        const measurementId = document.querySelector('meta[name="google-analytics-id"]')?.content.trim();
        let storedConsent = null;

        try {
            storedConsent = window.localStorage.getItem(analyticsConsentKey);
        } catch {
            storedConsent = null;
        }

        if (storedConsent === 'accepted') {
            loadGoogleAnalytics(measurementId);
            return;
        }

        if (storedConsent === 'declined') {
            return;
        }

        const rootPath = getRootPath();
        const banner = document.createElement('section');
        banner.className = 'cookie-consent';
        banner.setAttribute('aria-label', 'Cookie and analytics preference');
        banner.innerHTML = `
            <div class="cookie-consent__copy">
                <p class="cookie-consent__title">Optional analytics cookies</p>
                <p>This portfolio is prepared for Google Analytics, but analytics only load if you allow them. Essential theme preferences can still be stored locally. <a href="${rootPath}pages/privacy/">Read privacy policy</a></p>
            </div>
            <div class="cookie-consent__actions">
                <button class="cookie-consent__button cookie-consent__button--primary" type="button" data-cookie-accept>Allow analytics</button>
                <button class="cookie-consent__button" type="button" data-cookie-decline>Decline</button>
            </div>
        `;

        const setConsent = (value) => {
            try {
                window.localStorage.setItem(analyticsConsentKey, value);
            } catch {
                // Consent still applies for this page view if storage is unavailable.
            }

            if (value === 'accepted') {
                loadGoogleAnalytics(measurementId);
            }

            banner.remove();
        };

        banner.querySelector('[data-cookie-accept]').addEventListener('click', () => setConsent('accepted'));
        banner.querySelector('[data-cookie-decline]').addEventListener('click', () => setConsent('declined'));
        document.body.append(banner);
    };

    initializeTheme();
    initializeNavigation();
    initializeActiveNavigation();
    initializeStickySectionNavigation();
    initializeSectionNavigator();
    initializePrivacyFooterLink();
    initializeCookieConsent();
})();
