/* ==========================================================================
   ABOUT PAGE BEHAVIOR - Phase 13.1 About Visual Redesign
   Continuous Auto-Moving Infinite Carousel
   ========================================================================== */

(() => {
    'use strict';

    // ── Continuous Auto-Moving Infinite Carousel ──────────────────────────────
    const initializeCarousel = () => {
        const carousel = document.querySelector('[data-identity-carousel]');
        if (!carousel) return;

        const track = carousel.querySelector('[data-carousel-track]');
        const prevBtn = carousel.querySelector('[data-carousel-prev]');
        const nextBtn = carousel.querySelector('[data-carousel-next]');
        const metaCounter = carousel.querySelector('[data-carousel-counter]');

        if (!track) return;

        const originalCards = Array.from(track.querySelectorAll('.identity-card'));
        const originalCount = originalCards.length;
        if (!originalCount) return;

        // Clone cards to create a seamless infinite loop
        originalCards.forEach(card => {
            const clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.appendChild(clone);
        });

        const allCards = Array.from(track.querySelectorAll('.identity-card'));

        // Measure single set width (including gaps)
        const calculateSetWidth = () => {
            if (originalCount < 2) return 0;
            const firstCardLeft = originalCards[0].offsetLeft;
            const lastCardRight = originalCards[originalCount - 1].offsetLeft + originalCards[originalCount - 1].offsetWidth;
            const gap = originalCards[1].offsetLeft - (originalCards[0].offsetLeft + originalCards[0].offsetWidth);
            return (lastCardRight - firstCardLeft) + gap;
        };

        let singleSetWidth = calculateSetWidth();

        window.addEventListener('resize', () => {
            singleSetWidth = calculateSetWidth();
        }, { passive: true });

        // Step size for manual next/prev navigation buttons
        const getScrollStep = () => {
            const cardWidth = originalCards[0].offsetWidth;
            const gap = 24;
            return cardWidth + gap;
        };

        // Update Counter Display
        const updateCounter = () => {
            if (!metaCounter) return;
            const cardWidth = originalCards[0].offsetWidth + 24;
            const currentScroll = track.scrollLeft % Math.max(1, singleSetWidth);
            const activeIndex = (Math.round(currentScroll / cardWidth) % originalCount) + 1;
            metaCounter.textContent = `${String(activeIndex).padStart(2, '0')} / ${String(originalCount).padStart(2, '0')}`;
        };

        // Check reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        let isPaused = false;
        let animationFrameId = null;
        const autoScrollSpeed = 0.8; // pixels per frame

        // Infinite Auto-Scroll Animation Loop
        const autoScrollLoop = () => {
            if (!prefersReducedMotion && !isPaused) {
                track.scrollLeft += autoScrollSpeed;

                // Infinite seamless loop boundary check
                if (singleSetWidth > 0 && track.scrollLeft >= singleSetWidth) {
                    track.scrollLeft -= singleSetWidth;
                }

                updateCounter();
            }
            animationFrameId = requestAnimationFrame(autoScrollLoop);
        };

        if (!prefersReducedMotion) {
            animationFrameId = requestAnimationFrame(autoScrollLoop);
        }

        // Pause auto-scroll on hover, focus, touch, or drag
        const pause = () => { isPaused = true; };
        const resume = () => { isPaused = false; };

        carousel.addEventListener('mouseenter', pause);
        carousel.addEventListener('mouseleave', resume);
        track.addEventListener('focusin', pause);
        track.addEventListener('focusout', resume);
        track.addEventListener('touchstart', pause, { passive: true });
        track.addEventListener('touchend', resume, { passive: true });

        // Manual Prev / Next Button Controls
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                pause();
                const step = getScrollStep();
                track.scrollBy({ left: -step, behavior: 'smooth' });
                setTimeout(updateCounter, 300);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                pause();
                const step = getScrollStep();
                track.scrollBy({ left: step, behavior: 'smooth' });
                setTimeout(updateCounter, 300);
            });
        }

        // Track scroll event to keep loop bound clean if user manually scrolls
        track.addEventListener('scroll', () => {
            if (singleSetWidth > 0 && track.scrollLeft >= singleSetWidth * 1.9) {
                track.scrollLeft -= singleSetWidth;
            } else if (singleSetWidth > 0 && track.scrollLeft <= 0 && isPaused) {
                track.scrollLeft += singleSetWidth;
            }
            updateCounter();
        }, { passive: true });

        // Pointer Dragging (Grab to Scroll)
        let isDragging = false;
        let startX = 0;
        let startScrollLeft = 0;

        track.addEventListener('mousedown', (e) => {
            isDragging = true;
            isPaused = true;
            startX = e.pageX - track.offsetLeft;
            startScrollLeft = track.scrollLeft;
        });

        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                isPaused = false;
            }
        });

        track.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - track.offsetLeft;
            const walk = (x - startX) * 1.5;
            track.scrollLeft = startScrollLeft - walk;
            updateCounter();
        });

        // Keyboard Navigation (Arrow Keys)
        track.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                pause();
                track.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                pause();
                track.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
            }
        });
    };

    document.addEventListener('DOMContentLoaded', () => {
        initializeCarousel();
    });
})();
