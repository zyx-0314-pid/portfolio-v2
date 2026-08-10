/**
 * Published Research Page Controller
 * Handles mobile top navigation synchronization, active section observing,
 * and smooth internal link navigation without duplicating desktop section dots.
 */
document.addEventListener('DOMContentLoaded', function () {
    var topNavLinks = document.querySelectorAll('.research-top-nav__link');
    var sections = Array.from(document.querySelectorAll('.research-article section[id]'));
    var topNavScrollContainer = document.querySelector('.research-top-nav__scroll');

    if (!sections.length) return;

    // Smooth scroll for top nav links
    topNavLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                var targetSection = document.querySelector(targetId);
                if (targetSection) {
                    e.preventDefault();
                    var headerHeight = document.querySelector('.site-header')?.getBoundingClientRect().height || 70;
                    var topNavHeight = document.querySelector('.research-top-nav')?.getBoundingClientRect().height || 45;
                    var targetY = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight - topNavHeight - 16;
                    
                    window.scrollTo({
                        top: Math.max(0, targetY),
                        behavior: 'smooth'
                    });
                    
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        location.hash = targetId;
                    }
                }
            }
        });
    });

    // Observer for active section tracking
    var observerOptions = {
        root: null,
        rootMargin: '-15% 0px -65% 0px',
        threshold: 0
    };

    var activeSectionId = '';

    function setActiveSection(id) {
        if (!id || activeSectionId === id) return;
        activeSectionId = id;

        topNavLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            if (href === '#' + id) {
                link.classList.add('is-active');
                link.setAttribute('aria-current', 'true');

                // Scroll link into view horizontally in mobile nav
                if (topNavScrollContainer) {
                    var containerRect = topNavScrollContainer.getBoundingClientRect();
                    var linkRect = link.getBoundingClientRect();
                    if (linkRect.left < containerRect.left || linkRect.right > containerRect.right) {
                        link.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                    }
                }
            } else {
                link.classList.remove('is-active');
                link.removeAttribute('aria-current');
            }
        });
    }

    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach(function (section) {
            observer.observe(section);
        });
    } else {
        // Fallback scroll listener
        window.addEventListener('scroll', function () {
            var scrollPosition = window.scrollY + 200;
            for (var i = sections.length - 1; i >= 0; i--) {
                if (sections[i].offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        });
    }
});
