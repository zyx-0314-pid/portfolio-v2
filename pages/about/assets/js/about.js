/* ==========================================================================
   ABOUT PAGE BEHAVIOR — Phase 13.1 About Visual Redesign
   Carousel Interactivity, Sticky Rail Observer & Scroll-Entry Motion
   ========================================================================== */

(() => {
    'use strict';

    // ── Carousel Interactivity ────────────────────────────────────────────────
    const initializeCarousel = () => {
        const carousel = document.querySelector('[data-identity-carousel]');
        if (!carousel) return;

        const track = carousel.querySelector('[data-carousel-track]');
        const prevBtn = carousel.querySelector('[data-carousel-prev]');
        const nextBtn = carousel.querySelector('[data-carousel-next]');
        const metaCounter = carousel.querySelector('[data-carousel-counter]');

        if (!track) return;

        const cards = Array.from(track.querySelectorAll('.identity-card'));
        if (!cards.length) return;

        const getScrollStep = () => {
            const cardWidth = cards[0].offsetWidth;
            const gap = 24; // 1.5rem gap
            return cardWidth + gap;
        };

        const updateScrollControls = () => {
            const maxScroll = track.scrollWidth - track.clientWidth;
            const currentScroll = track.scrollLeft;

            if (prevBtn) prevBtn.disabled = currentScroll <= 5;
            if (nextBtn) nextBtn.disabled = currentScroll >= maxScroll - 5;

            if (metaCounter) {
                const cardWidth = cards[0].offsetWidth;
                const activeIndex = Math.min(
                    cards.length,
                    Math.max(1, Math.round(currentScroll / cardWidth) + 1)
                );
                metaCounter.textContent = `${String(activeIndex).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
            }
        };

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
            });
        }

        // Track scroll events to update controls
        let scrollTimeout;
        track.addEventListener('scroll', () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(updateScrollControls, 40);
        }, { passive: true });

        // Pointer dragging (Grab to scroll)
        let isDragging = false;
        let startX = 0;
        let startScrollLeft = 0;

        track.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.pageX - track.offsetLeft;
            startScrollLeft = track.scrollLeft;
        });

        track.addEventListener('mouseleave', () => {
            isDragging = false;
        });

        track.addEventListener('mouseup', () => {
            isDragging = false;
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 1.5;
            track.scrollLeft = startScrollLeft - walk;
        });

        // Keyboard navigation within carousel track
        track.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
            }
        });

        updateScrollControls();
    };

    // ── Sticky Navigation & Hash Observer ───────────────────────────────────
    const initializeStickyNav = () => {
        const stickyNav = document.querySelector('[data-sticky-nav]');
        if (!stickyNav) return;

        const navLinks = Array.from(stickyNav.querySelectorAll('.sticky-nav__link'));
        const sections = navLinks
            .map(link => {
                const targetId = link.getAttribute('href')?.replace('#', '');
                return targetId ? document.getElementById(targetId) : null;
            })
            .filter(Boolean);

        if (!sections.length) return;

        const setActiveLink = (targetId) => {
            navLinks.forEach(link => {
                const linkTarget = link.getAttribute('href')?.replace('#', '');
                if (linkTarget === targetId) {
                    link.setAttribute('aria-current', 'true');
                    link.classList.add('is-active');
                    link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                } else {
                    link.removeAttribute('aria-current');
                    link.classList.remove('is-active');
                }
            });
        };

        // Smooth scroll on sticky nav link click
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const targetEl = document.getElementById(href.slice(1));
                    if (targetEl) {
                        e.preventDefault();
                        const headerOffset = 130;
                        const elementPosition = targetEl.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });

                        setActiveLink(href.slice(1));
                        if (history.pushState) {
                            history.pushState(null, null, href);
                        }
                    }
                }
            });
        });

        // IntersectionObserver to highlight active section on scroll
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -55% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.id;
                    setActiveLink(activeId);
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));

        // Sync initial hash if present
        if (window.location.hash) {
            const initialId = window.location.hash.slice(1);
            const targetEl = document.getElementById(initialId);
            if (targetEl) {
                setTimeout(() => {
                    setActiveLink(initialId);
                }, 100);
            }
        }
    };

    // ── Restrained Scroll-Entry Motion ───────────────────────────────────────
    const initializeScrollMotion = () => {
        // Check reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const revealElements = document.querySelectorAll('.scroll-reveal');

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            revealElements.forEach(el => el.classList.add('is-visible'));
            return;
        }

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        });

        revealElements.forEach(el => revealObserver.observe(el));
    };

    document.addEventListener('DOMContentLoaded', () => {
        initializeCarousel();
        initializeStickyNav();
        initializeScrollMotion();
    });
})();
