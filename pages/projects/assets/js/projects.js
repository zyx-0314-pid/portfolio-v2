/**
 * Projects Gallery Controller
 * Provides real-time search, multi-select Domain & Engineering Focus filtering,
 * manual relevance sorting, URL state synchronization, and card interactions.
 */
document.addEventListener('DOMContentLoaded', function () {
    var searchInput = document.getElementById('project-search');
    var sortSelect = document.getElementById('sort-select');
    var resultCountEl = document.getElementById('result-count');
    var clearFiltersBtn = document.getElementById('clear-filters');
    var galleryContainer = document.getElementById('project-gallery');
    var emptyStateEl = document.getElementById('empty-results');

    var domainFilterButtons = document.querySelectorAll('[data-filter-group="domain"]');
    var focusFilterButtons = document.querySelectorAll('[data-filter-group="focus"]');
    var projectCards = Array.from(document.querySelectorAll('.project-card'));

    var selectedDomains = new Set();
    var selectedFocuses = new Set();
    var searchQuery = '';
    var sortOption = 'relevant';

    function initFromUrl() {
        var params = new URLSearchParams(window.location.search);
        
        if (params.has('q')) {
            searchQuery = params.get('q').trim();
            if (searchInput) searchInput.value = searchQuery;
        }
        if (params.has('domain')) {
            var domains = params.get('domain').split(',');
            domains.forEach(function (d) {
                if (d.trim()) selectedDomains.add(d.trim().toLowerCase());
            });
        }
        if (params.has('focus')) {
            var focuses = params.get('focus').split(',');
            focuses.forEach(function (f) {
                if (f.trim()) selectedFocuses.add(f.trim().toLowerCase());
            });
        }
        if (params.has('sort')) {
            sortOption = params.get('sort').trim().toLowerCase();
            if (sortSelect) sortSelect.value = sortOption;
        }

        updateFilterButtonsUI();
        applyFiltersAndSort();
    }

    function syncUrlState() {
        var params = new URLSearchParams();

        if (searchQuery) {
            params.set('q', searchQuery);
        }
        if (selectedDomains.size > 0) {
            params.set('domain', Array.from(selectedDomains).join(','));
        }
        if (selectedFocuses.size > 0) {
            params.set('focus', Array.from(selectedFocuses).join(','));
        }
        if (sortOption !== 'relevant') {
            params.set('sort', sortOption);
        }

        var newUrl = params.toString() ? window.location.pathname + '?' + params.toString() : window.location.pathname;
        window.history.replaceState(null, '', newUrl);
    }

    function updateFilterButtonsUI() {
        domainFilterButtons.forEach(function (btn) {
            var val = (btn.getAttribute('data-value') || '').toLowerCase();
            if (val === 'all') {
                btn.setAttribute('aria-pressed', selectedDomains.size === 0 ? 'true' : 'false');
            } else {
                btn.setAttribute('aria-pressed', selectedDomains.has(val) ? 'true' : 'false');
            }
        });

        focusFilterButtons.forEach(function (btn) {
            var val = (btn.getAttribute('data-value') || '').toLowerCase();
            if (val === 'all') {
                btn.setAttribute('aria-pressed', selectedFocuses.size === 0 ? 'true' : 'false');
            } else {
                btn.setAttribute('aria-pressed', selectedFocuses.has(val) ? 'true' : 'false');
            }
        });

        var hasActiveFilters = searchQuery !== '' || selectedDomains.size > 0 || selectedFocuses.size > 0 || sortOption !== 'relevant';
        if (clearFiltersBtn) {
            clearFiltersBtn.hidden = !hasActiveFilters;
        }
    }

    function applyFiltersAndSort() {
        var queryLower = searchQuery.toLowerCase();
        var visibleCount = 0;
        var totalCount = projectCards.length;

        var matchingCards = projectCards.filter(function (card) {
            var domainVal = (card.getAttribute('data-domain') || '').toLowerCase();
            var focusVals = (card.getAttribute('data-focus') || '').toLowerCase().split(',').map(function (s) { return s.trim(); });
            var cardTitle = (card.querySelector('.project-card__title') ? card.querySelector('.project-card__title').textContent : '').toLowerCase();
            var cardSummary = (card.querySelector('.project-card__summary') ? card.querySelector('.project-card__summary').textContent : '').toLowerCase();
            var searchKeywords = (card.getAttribute('data-search-keywords') || '').toLowerCase();

            // Search filter
            var matchesSearch = !queryLower || cardTitle.indexOf(queryLower) !== -1 || cardSummary.indexOf(queryLower) !== -1 || domainVal.indexOf(queryLower) !== -1 || searchKeywords.indexOf(queryLower) !== -1 || focusVals.some(function (f) { return f.indexOf(queryLower) !== -1; });

            // Domain filter (OR logic within group)
            var matchesDomain = selectedDomains.size === 0 || selectedDomains.has(domainVal);

            // Focus filter (OR logic within group)
            var matchesFocus = selectedFocuses.size === 0 || focusVals.some(function (f) { return selectedFocuses.has(f); });

            return matchesSearch && matchesDomain && matchesFocus;
        });

        // Sorting
        matchingCards.sort(function (a, b) {
            if (sortOption === 'a-z') {
                var titleA = (a.querySelector('.project-card__title') ? a.querySelector('.project-card__title').textContent : '').toLowerCase();
                var titleB = (b.querySelector('.project-card__title') ? b.querySelector('.project-card__title').textContent : '').toLowerCase();
                return titleA.localeCompare(titleB);
            } else if (sortOption === 'newest') {
                var dateA = parseInt(a.getAttribute('data-date') || '0', 10);
                var dateB = parseInt(b.getAttribute('data-date') || '0', 10);
                return dateB - dateA;
            } else if (sortOption === 'oldest') {
                var dateA = parseInt(a.getAttribute('data-date') || '0', 10);
                var dateB = parseInt(b.getAttribute('data-date') || '0', 10);
                return dateA - dateB;
            } else {
                // Relevant (Manual Curation Rank)
                var rankA = parseInt(a.getAttribute('data-relevance') || '999', 10);
                var rankB = parseInt(b.getAttribute('data-relevance') || '999', 10);
                return rankA - rankB;
            }
        });

        // DOM update
        projectCards.forEach(function (card) {
            card.style.display = 'none';
        });

        matchingCards.forEach(function (card) {
            card.style.display = '';
            galleryContainer.appendChild(card); // Maintains sorted order
        });

        visibleCount = matchingCards.length;

        // Update count badge
        if (resultCountEl) {
            if (visibleCount === totalCount) {
                resultCountEl.textContent = totalCount + ' PROJECTS';
            } else {
                resultCountEl.textContent = visibleCount + ' OF ' + totalCount + ' PROJECTS';
            }
        }

        // Empty state toggle
        if (emptyStateEl) {
            emptyStateEl.hidden = visibleCount > 0;
        }

        updateFilterButtonsUI();
        syncUrlState();
    }

    // Event listeners
    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            searchQuery = e.target.value.trim();
            applyFiltersAndSort();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', function (e) {
            sortOption = e.target.value;
            applyFiltersAndSort();
        });
    }

    domainFilterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var val = (btn.getAttribute('data-value') || '').toLowerCase();
            if (val === 'all') {
                selectedDomains.clear();
            } else {
                if (selectedDomains.has(val)) {
                    selectedDomains.delete(val);
                } else {
                    selectedDomains.add(val);
                }
            }
            applyFiltersAndSort();
        });
    });

    focusFilterButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var val = (btn.getAttribute('data-value') || '').toLowerCase();
            if (val === 'all') {
                selectedFocuses.clear();
            } else {
                if (selectedFocuses.has(val)) {
                    selectedFocuses.delete(val);
                } else {
                    selectedFocuses.add(val);
                }
            }
            applyFiltersAndSort();
        });
    });

    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function () {
            selectedDomains.clear();
            selectedFocuses.clear();
            searchQuery = '';
            sortOption = 'relevant';
            if (searchInput) searchInput.value = '';
            if (sortSelect) sortSelect.value = 'relevant';
            applyFiltersAndSort();
        });
    }

    // Card click delegation: clicking card background triggers main action link
    galleryContainer.addEventListener('click', function (e) {
        // Ignore if clicking a nested external anchor or button
        if (e.target.closest('a[target="_blank"]') || e.target.closest('button')) {
            return;
        }

        var card = e.target.closest('.project-card');
        if (!card) return;

        var mainLink = card.querySelector('.project-card__action-link');
        if (mainLink && mainLink !== e.target && !mainLink.contains(e.target)) {
            var href = mainLink.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        }
    });

    // Handle browser navigation back/forward
    window.addEventListener('popstate', function () {
        selectedDomains.clear();
        selectedFocuses.clear();
        searchQuery = '';
        sortOption = 'relevant';
        if (searchInput) searchInput.value = '';
        if (sortSelect) sortSelect.value = 'relevant';
        initFromUrl();
    });

    // Initialize state
    initFromUrl();
});
