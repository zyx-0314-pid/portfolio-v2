(() => {
    'use strict';

    // ----------------------------------------------------------------
    // State
    // ----------------------------------------------------------------

    const VALID_FILTERS   = ['full-stack', 'devops', 'teaching', 'leadership'];
    const VALID_MATCH     = ['all', 'any'];
    const VALID_SORT      = ['newest', 'oldest'];

    let activeFilters = new Set(); // empty = "All"
    let matchMode     = 'all';     // 'all' | 'any'
    let sortMode      = 'newest';  // 'newest' | 'oldest'

    // ----------------------------------------------------------------
    // DOM references - gathered once after DOMContentLoaded
    // ----------------------------------------------------------------

    let allFilterBtns     = [];
    let matchBtns         = [];
    let sortBtns          = [];
    let experienceCards   = [];   // <article class="exp-card">
    let yearGroups        = [];   // <div class="exp-year-group">
    let timelineEl        = null;
    let emptyStateEl      = null;
    let mobileTrigger     = null;
    let mobilePanel       = null;
    let mobileCheckboxes  = [];
    let mobileClearBtn    = null;

    // Quick View
    let qvBackdrop = null;
    let qvDialog   = null;
    let qvTrigger  = null; // element that opened the modal - for focus restoration

    // ----------------------------------------------------------------
    // URL state helpers
    // ----------------------------------------------------------------

    const buildSearchParams = () => {
        const params = new URLSearchParams();

        if (activeFilters.size > 0) {
            params.set('filter', [...activeFilters].join(','));
        }
        if (matchMode !== 'all') {
            params.set('match', matchMode);
        }
        if (sortMode !== 'newest') {
            params.set('sort', sortMode);
        }
        return params;
    };

    const pushURL = () => {
        const params = buildSearchParams();
        const url    = params.toString()
            ? `${window.location.pathname}?${params.toString()}`
            : window.location.pathname;
        history.pushState({ filter: [...activeFilters], match: matchMode, sort: sortMode }, '', url);
    };

    const readURL = () => {
        const params = new URLSearchParams(window.location.search);

        // Filters
        activeFilters = new Set();
        const rawFilter = params.get('filter');
        if (rawFilter) {
            rawFilter.split(',').forEach((f) => {
                const normalized = f.trim().toLowerCase();
                if (VALID_FILTERS.includes(normalized)) {
                    activeFilters.add(normalized);
                }
            });
        }

        // Match
        const rawMatch = params.get('match');
        matchMode = VALID_MATCH.includes(rawMatch) ? rawMatch : 'all';

        // Sort
        const rawSort = params.get('sort');
        sortMode = VALID_SORT.includes(rawSort) ? rawSort : 'newest';
    };

    // ----------------------------------------------------------------
    // Filter / sort logic
    // ----------------------------------------------------------------

    /**
     * Returns true if a card should be visible given the current state.
     */
    const cardMatchesFilter = (card) => {
        if (activeFilters.size === 0) return true;

        const cardTags = (card.dataset.tags || '').split(' ').filter(Boolean);

        if (matchMode === 'all') {
            return [...activeFilters].every((f) => cardTags.includes(f));
        } else {
            return [...activeFilters].some((f) => cardTags.includes(f));
        }
    };

    /**
     * Apply current filters + sort to the DOM.
     */
    const applyFilters = () => {
        let anyVisible = false;

        // Sort the year groups themselves
        yearGroups.sort((a, b) => {
            const aYear = parseInt(a.dataset.year || '0', 10);
            const bYear = parseInt(b.dataset.year || '0', 10);
            return sortMode === 'newest' ? bYear - aYear : aYear - bYear;
        });

        // Re-append year groups to timeline container in sorted order
        if (timelineEl) {
            yearGroups.forEach((group) => timelineEl.append(group));
        }

        // Sort cards within each year group
        yearGroups.forEach((group) => {
            const cards = Array.from(group.querySelectorAll('.exp-card'));

            cards.sort((a, b) => {
                const aStart = a.dataset.start || '0000-00';
                const bStart = b.dataset.start || '0000-00';
                return sortMode === 'newest'
                    ? bStart.localeCompare(aStart)
                    : aStart.localeCompare(bStart);
            });

            const cardsContainer = group.querySelector('.exp-year-cards');
            if (cardsContainer) {
                cards.forEach((card) => cardsContainer.append(card));
            }
        });

        // Show / hide cards
        let visibleCount = 0;
        experienceCards.forEach((card) => {
            const visible = cardMatchesFilter(card);
            card.dataset.hidden = visible ? 'false' : 'true';
            if (visible) {
                anyVisible = true;
                visibleCount++;
            }
        });

        // Show / hide year groups if all their cards are hidden
        yearGroups.forEach((group) => {
            const cards = Array.from(group.querySelectorAll('.exp-card'));
            const allHidden = cards.every((c) => c.dataset.hidden === 'true');
            group.dataset.hidden = allHidden ? 'true' : 'false';
        });

        // Status bar count & clear button update
        const resultCountEl = document.getElementById('exp-result-count');
        const totalCount = experienceCards.length;
        if (resultCountEl) {
            if (visibleCount === totalCount) {
                resultCountEl.textContent = totalCount + ' ROLES';
            } else {
                resultCountEl.textContent = visibleCount + ' OF ' + totalCount + ' ROLES';
            }
        }

        const clearFiltersBtn = document.getElementById('exp-clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.hidden = (activeFilters.size === 0 && matchMode === 'all' && sortMode === 'newest');
        }

        // Empty state
        if (emptyStateEl) {
            emptyStateEl.hidden = anyVisible;
        }
    };

    // ----------------------------------------------------------------
    // UI sync - update button aria-pressed + mobile checkboxes
    // ----------------------------------------------------------------

    const syncFilterUI = () => {
        allFilterBtns.forEach((btn) => {
            const filter = btn.dataset.filter;
            if (filter === 'all') {
                btn.setAttribute('aria-pressed', activeFilters.size === 0 ? 'true' : 'false');
            } else {
                btn.setAttribute('aria-pressed', activeFilters.has(filter) ? 'true' : 'false');
            }
        });

        // Mobile checkboxes
        mobileCheckboxes.forEach((cb) => {
            cb.checked = activeFilters.has(cb.value);
        });
    };

    const syncMatchUI = () => {
        matchBtns.forEach((btn) => {
            btn.setAttribute('aria-pressed', btn.dataset.match === matchMode ? 'true' : 'false');
        });
    };

    const syncSortUI = () => {
        sortBtns.forEach((btn) => {
            btn.setAttribute('aria-pressed', btn.dataset.sort === sortMode ? 'true' : 'false');
        });
    };

    const syncAllUI = () => {
        syncFilterUI();
        syncMatchUI();
        syncSortUI();
    };

    // ----------------------------------------------------------------
    // Filter button handlers
    // ----------------------------------------------------------------

    const handleFilterBtnClick = (btn) => {
        const filter = btn.dataset.filter;

        if (filter === 'all') {
            activeFilters.clear();
        } else {
            if (activeFilters.has(filter)) {
                activeFilters.delete(filter);
            } else {
                activeFilters.add(filter);
            }
        }

        syncFilterUI();
        applyFilters();
        pushURL();
    };

    // ----------------------------------------------------------------
    // Mobile filter panel
    // ----------------------------------------------------------------

    const openMobilePanel = () => {
        if (!mobilePanel || !mobileTrigger) return;
        mobilePanel.setAttribute('aria-hidden', 'false');
        mobileTrigger.setAttribute('aria-expanded', 'true');
    };

    const closeMobilePanel = () => {
        if (!mobilePanel || !mobileTrigger) return;
        mobilePanel.setAttribute('aria-hidden', 'true');
        mobileTrigger.setAttribute('aria-expanded', 'false');
    };

    const initMobileFilter = () => {
        mobileTrigger = document.querySelector('.exp-mobile-trigger');
        mobilePanel   = document.querySelector('.exp-mobile-panel');
        mobileClearBtn = document.querySelector('.exp-mobile-clear');
        mobileCheckboxes = Array.from(document.querySelectorAll('.exp-mobile-checkboxes input[type="checkbox"]'));

        if (!mobileTrigger || !mobilePanel) return;

        mobileTrigger.addEventListener('click', () => {
            const isOpen = mobileTrigger.getAttribute('aria-expanded') === 'true';
            isOpen ? closeMobilePanel() : openMobilePanel();
        });

        // Close when clicking outside
        document.addEventListener('click', (event) => {
            if (!mobilePanel || mobilePanel.getAttribute('aria-hidden') !== 'false') return;
            if (!mobileTrigger.contains(event.target) && !mobilePanel.contains(event.target)) {
                closeMobilePanel();
            }
        });

        // Escape closes panel
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && mobilePanel.getAttribute('aria-hidden') === 'false') {
                closeMobilePanel();
                mobileTrigger.focus();
            }
        });

        // Checkbox changes
        mobileCheckboxes.forEach((cb) => {
            cb.addEventListener('change', () => {
                if (cb.checked) {
                    activeFilters.add(cb.value);
                } else {
                    activeFilters.delete(cb.value);
                }
                syncFilterUI();
                applyFilters();
                pushURL();
            });
        });

        // Clear button
        if (mobileClearBtn) {
            mobileClearBtn.addEventListener('click', () => {
                activeFilters.clear();
                syncFilterUI();
                applyFilters();
                pushURL();
            });
        }
    };

    // ----------------------------------------------------------------
    // Quick View modal
    // ----------------------------------------------------------------

    const lockScroll = () => {
        document.body.style.overflow = 'hidden';
    };

    const unlockScroll = () => {
        document.body.style.overflow = '';
    };

    /**
     * Opens the quick view modal for a given experience card.
     * The modal content is pre-rendered in the HTML.
     */
    const openQuickView = (trigger, dialogId) => {
        const dialog = document.getElementById(dialogId);
        if (!dialog) return;

        qvDialog  = dialog;
        qvTrigger = trigger;

        lockScroll();

        // Show custom backdrop
        if (qvBackdrop) {
            qvBackdrop.dataset.visible = 'true';
        }

        // Show native dialog
        dialog.showModal();
    };

    const closeQuickView = () => {
        if (!qvDialog) return;

        qvDialog.close();

        if (qvBackdrop) {
            qvBackdrop.dataset.visible = 'false';
        }

        unlockScroll();

        // Restore focus to the trigger
        if (qvTrigger) {
            qvTrigger.focus();
            qvTrigger = null;
        }

        qvDialog = null;
    };

    const initQuickView = () => {
        qvBackdrop = document.querySelector('.exp-qv-backdrop');

        // Backdrop click closes
        if (qvBackdrop) {
            qvBackdrop.addEventListener('click', closeQuickView);
        }

        // Quick View open buttons
        document.querySelectorAll('.exp-quickview-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const dialogId = btn.dataset.dialogTarget;
                if (dialogId) openQuickView(btn, dialogId);
            });
        });

        // Close buttons inside dialogs
        document.querySelectorAll('.exp-qv-close').forEach((closeBtn) => {
            closeBtn.addEventListener('click', closeQuickView);
        });

        // Native dialog close event (Escape key fires this)
        document.querySelectorAll('.exp-qv-dialog').forEach((dialog) => {
            dialog.addEventListener('close', () => {
                unlockScroll();
                if (qvBackdrop) {
                    qvBackdrop.dataset.visible = 'false';
                }
                // Restore focus
                if (qvTrigger) {
                    qvTrigger.focus();
                    qvTrigger = null;
                }
                qvDialog = null;
            });

            // Backdrop area click (clicking outside dialog content closes modal)
            dialog.addEventListener('click', (event) => {
                const rect = dialog.getBoundingClientRect();
                const isInside = (
                    event.clientX >= rect.left &&
                    event.clientX <= rect.right &&
                    event.clientY >= rect.top &&
                    event.clientY <= rect.bottom
                );
                if (!isInside) {
                    closeQuickView();
                }
            });
        });
    };

    // ----------------------------------------------------------------
    // Popstate - Back/Forward support
    // ----------------------------------------------------------------

    const handlePopstate = (event) => {
        readURL();
        syncAllUI();
        applyFilters();
    };

    // ----------------------------------------------------------------
    // Initialization
    // ----------------------------------------------------------------

    const init = () => {
        // Gather DOM refs
        allFilterBtns   = Array.from(document.querySelectorAll('.exp-filter-btn'));
        matchBtns       = Array.from(document.querySelectorAll('.exp-match-btn'));
        sortBtns        = Array.from(document.querySelectorAll('.exp-sort-btn'));
        experienceCards = Array.from(document.querySelectorAll('.exp-card'));
        yearGroups      = Array.from(document.querySelectorAll('.exp-year-group'));
        timelineEl      = document.querySelector('.exp-timeline');
        emptyStateEl    = document.querySelector('.exp-empty');

        // Restore state from URL
        readURL();

        // Filter button handlers
        allFilterBtns.forEach((btn) => {
            btn.addEventListener('click', () => handleFilterBtnClick(btn));
        });

        // Match buttons
        matchBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                matchMode = btn.dataset.match;
                syncMatchUI();
                applyFilters();
                pushURL();
            });
        });

        // Clear filters button
        const clearFiltersBtn = document.getElementById('exp-clear-filters');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                activeFilters.clear();
                matchMode = 'all';
                sortMode = 'newest';
                syncAllUI();
                applyFilters();
                pushURL();
            });
        }

        // Sort buttons
        sortBtns.forEach((btn) => {
            btn.addEventListener('click', () => {
                sortMode = btn.dataset.sort;
                syncSortUI();
                applyFilters();
                pushURL();
            });
        });

        // Mobile filter
        initMobileFilter();

        // Quick View
        initQuickView();

        // Back/Forward
        window.addEventListener('popstate', handlePopstate);

        // Apply initial state from URL
        syncAllUI();
        applyFilters();
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
