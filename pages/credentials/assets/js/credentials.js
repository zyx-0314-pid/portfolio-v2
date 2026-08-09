/**
 * Credentials Gallery - Interactive Logic
 * Ian Cedric Ramirez Portfolio - Phase 15 (Modal → Detail Pages)
 *
 * Modal dependency fully removed.
 * Cards are now <a> links navigating to dedicated detail pages.
 * Type and Domain filters support multi-select (OR within group, AND across groups).
 */

(() => {
  const data = window.CREDENTIALS_DATA || [];

  // Active filter state - arrays for multi-select
  const state = {
    search: '',
    types: [],    // empty = "All"
    ranks: [],    // empty = "All"
    domains: [],  // empty = "All"
    sort: 'rank-desc',
  };

  // DOM Elements
  const searchInput = document.getElementById('cred-search');
  const resultCount = document.getElementById('result-count');
  const clearFiltersBtn = document.getElementById('clear-filters');
  const sortSelect = document.getElementById('cred-sort');

  // Group Containers
  const certsSection = document.getElementById('group-certifications');
  const certsGrid = document.getElementById('grid-certifications');
  const trainingSection = document.getElementById('group-training');
  const trainingGrid = document.getElementById('grid-training');
  const emptyState = document.getElementById('cred-empty-state');

  // Type tooltip
  const typeInfoBtn = document.getElementById('type-info-btn');
  const typeTooltip = document.getElementById('type-tooltip');
  const domainFilters = document.getElementById('domain-filters');

  // Initialize
  const init = () => {
    renderDomainFilters();
    readUrlState();
    setupEventListeners();
    renderGallery();
  };

  // ── URL State ──────────────────────────────────────────────────────────────

  const readUrlState = () => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('q')) state.search = params.get('q') || '';
    if (params.has('type')) {
      state.types = params.get('type').split(',').filter(Boolean);
    }
    if (params.has('rank')) {
      state.ranks = params.get('rank').split(',').filter(Boolean);
    }
    if (params.has('domain')) {
      state.domains = params.get('domain').split(',').filter(Boolean);
    }
    if (params.has('sort')) {
      state.sort = params.get('sort') || 'rank-desc';
    }
    if (searchInput) searchInput.value = state.search;
    if (sortSelect) sortSelect.value = state.sort;
    syncFilterButtonsUI();
  };

  const updateUrlState = () => {
    const params = new URLSearchParams();
    if (state.search) params.set('q', state.search);
    if (state.types.length) params.set('type', state.types.join(','));
    if (state.ranks.length) params.set('rank', state.ranks.join(','));
    if (state.domains.length) params.set('domain', state.domains.join(','));
    if (state.sort !== 'rank-desc') params.set('sort', state.sort);
    const qs = params.toString();
    window.history.replaceState(null, '', window.location.pathname + (qs ? '?' + qs : ''));
  };

  // ── Filter Button UI ───────────────────────────────────────────────────────

  const syncFilterButtonsUI = () => {
    document.querySelectorAll('[data-filter-group="type"]').forEach(btn => {
      const val = btn.dataset.value;
      if (val === 'all') {
        btn.setAttribute('aria-pressed', state.types.length === 0 ? 'true' : 'false');
      } else {
        btn.setAttribute('aria-pressed', state.types.includes(val) ? 'true' : 'false');
      }
    });

    document.querySelectorAll('[data-filter-group="domain"]').forEach(btn => {
      const val = btn.dataset.value;
      if (val === 'all') {
        btn.setAttribute('aria-pressed', state.domains.length === 0 ? 'true' : 'false');
      } else {
        btn.setAttribute('aria-pressed', state.domains.includes(val) ? 'true' : 'false');
      }
    });

    document.querySelectorAll('[data-filter-group="rank"]').forEach(btn => {
      const val = btn.dataset.value;
      if (val === 'all') {
        btn.setAttribute('aria-pressed', state.ranks.length === 0 ? 'true' : 'false');
      } else {
        btn.setAttribute('aria-pressed', state.ranks.includes(val) ? 'true' : 'false');
      }
    });
  };

  const normalizeFilterValue = (value) =>
    String(value || '').toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');

  const renderDomainFilters = () => {
    if (!domainFilters) return;
    const domains = [...new Set(data.flatMap(item => item.domains || []))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));

    domainFilters.innerHTML = `
      <span class="filter-group__title">DOMAIN</span>
      <button type="button" class="filter-btn" data-filter-group="domain" data-value="all" aria-pressed="true">Any</button>
      ${domains.map(domain => `
        <button type="button" class="filter-btn" data-filter-group="domain" data-value="${escapeHtml(normalizeFilterValue(domain))}" aria-pressed="false">${escapeHtml(domain)}</button>
      `).join('')}
    `;
  };

  // ── Filter Logic ───────────────────────────────────────────────────────────

  const matchesFilter = (item) => {
    // Search
    if (state.search.trim()) {
      const q = state.search.toLowerCase().trim();
      const relatedNames = [
        ...(item.relatedCredentials || []),
        ...(item.relatedTraining || []),
        item.parentProgram || '',
        ...(item.relatedExperience || [])
      ].map(resolveName);
      const searchable = [
        item.name,
        item.title,
        item.issuer,
        item.provider,
        item.type,
        item.group,
        item.starRank,
        item.starLabel,
        item.rankingNote,
        item.about || '',
        item.description || '',
        ...(item.domains || []),
        ...(item.skills || []),
        ...relatedNames,
        ...(item.officialCoverage || []).flatMap(c => [c.domain, ...c.topics])
      ].join(' ').toLowerCase();
      if (!searchable.includes(q)) return false;
    }

    // Type (OR logic within group)
    if (state.types.length > 0) {
      const itemType = item.type.toLowerCase().trim();
      const match = state.types.some(t => itemType === t.toLowerCase().trim());
      if (!match) return false;
    }

    // Domain (OR logic within group)
    if (state.domains.length > 0) {
      const itemDomains = (item.domains || []).map(d =>
        normalizeFilterValue(d)
      );
      const match = state.domains.some(d => {
        const norm = normalizeFilterValue(d);
        return itemDomains.includes(norm);
      });
      if (!match) return false;
    }

    // Star rank (OR logic within group)
    if (state.ranks.length > 0) {
      if (!state.ranks.includes(String(item.starRank ?? 0))) return false;
    }

    return true;
  };

  // ── Sort ───────────────────────────────────────────────────────────────────

  const sortCredentials = (items) =>
    [...items].sort((a, b) => {
      if (state.sort === 'rank-desc' || state.sort === 'rank-asc') {
        const rankDelta = (a.starRank ?? 0) - (b.starRank ?? 0);
        if (rankDelta !== 0) return state.sort === 'rank-desc' ? -rankDelta : rankDelta;
      }
      if (state.sort === 'title-asc') return a.name.localeCompare(b.name);
      if (state.sort === 'title-desc') return b.name.localeCompare(a.name);
      if (state.sort === 'provider-asc') return (a.provider || a.issuer || '').localeCompare(b.provider || b.issuer || '') || a.name.localeCompare(b.name);
      if (state.sort === 'provider-desc') return (b.provider || b.issuer || '').localeCompare(a.provider || a.issuer || '') || a.name.localeCompare(b.name);
      if (state.sort === 'type-asc') return a.type.localeCompare(b.type) || a.name.localeCompare(b.name);
      if ((a.parentProgram || '') !== (b.parentProgram || '')) return (a.parentProgram || '').localeCompare(b.parentProgram || '');
      return a.name.localeCompare(b.name);
    });

  // ── Card Rendering ─────────────────────────────────────────────────────────

  const createCardElement = (item) => {
    // Outer link - the card IS the link
    const link = document.createElement('a');
    link.className = `cred-card-link ${item.status?.toLowerCase() === 'expired' ? 'cred-card-link--expired' : ''}`;
    link.href = item.detailUrl || '#';
    link.setAttribute('data-cred-id', item.id);

    const visibleTags = (item.domains || []).slice(0, 3);
    const issuerBadgeSvg = getIssuerBadgeSvg(item.issuer);
    const typeLevelText = item.level ? `${item.type} · ${item.level}` : item.type;
    const rankBadge = (item.starRank || 0) > 0
      ? `<span class="cred-badge cred-badge--rank cred-badge--rank-${item.starRank}" title="${escapeHtml(item.starLabel || '')}">${escapeHtml('★'.repeat(item.starRank))}</span>`
      : '';

    link.innerHTML = `
      <article class="cred-card" role="listitem">
        <div class="cred-card__header">
          <div class="cred-card__issuer-badge" aria-hidden="true">
            ${issuerBadgeSvg}
          </div>
          <div class="cred-card__badges">
            ${rankBadge}
            <span class="cred-badge cred-badge--${item.status?.toLowerCase() || 'current'}">${item.status || 'Current'}</span>
          </div>
        </div>

        <div class="cred-card__body">
          <p class="cred-card__issuer">${escapeHtml(item.issuer)}</p>
          <h3 class="cred-card__title">${escapeHtml(item.name)}</h3>
          <p class="cred-card__meta-line">${escapeHtml(typeLevelText)}</p>
        </div>

        <div class="cred-card__footer">
          <div class="cred-card__tags">
            ${visibleTags.map(tag => `<span class="cred-card__tag">${escapeHtml(tag)}</span>`).join('')}
          </div>
          <div class="cred-card__action-row">
            <span class="cred-card__year">${escapeHtml(item.earnedYear || '')}</span>
            <span class="cred-card__action">View →</span>
          </div>
        </div>
      </article>
    `;

    return link;
  };

  // ── Issuer SVG Icons ───────────────────────────────────────────────────────

  const getIssuerBadgeSvg = (issuer) => {
    const norm = (issuer || '').toLowerCase();
    if (norm.includes('google')) {
      return `<svg class="cred-issuer-icon" viewBox="0 0 24 24" aria-hidden="true" width="28" height="28">
        <path fill="#4285F4" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
      </svg>`;
    }
    if (norm.includes('snowflake')) {
      return `<svg class="cred-issuer-icon" viewBox="0 0 24 24" aria-hidden="true" width="28" height="28">
        <path fill="none" stroke="#29B5E8" stroke-width="2.5" stroke-linecap="round" d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07"/>
      </svg>`;
    }
    if (norm.includes('github')) {
      return `<svg class="cred-issuer-icon" viewBox="0 0 24 24" aria-hidden="true" width="28" height="28">
        <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>`;
    }
    if (norm.includes('docker')) {
      return `<svg class="cred-issuer-icon" viewBox="0 0 24 24" aria-hidden="true" width="28" height="28">
        <path fill="#2496ED" d="M13.98 11.08h2.12v2.12h-2.12zm-3.18 0h2.12v2.12h-2.12zm-3.18 0h2.12v2.12H7.62zm-3.18 0h2.12v2.12H4.44zm6.36-3.18h2.12v2.12h-2.12zm-3.18 0h2.12v2.12H7.62zm6.36 0h2.12v2.12h-2.12zm0-3.18h2.12v2.12h-2.12zM.5 14.5s.8 5 7.5 5 11-2 13-6c0 0 2-1 2.5-3.5-1 0-2.5.5-3.5 1 0 0-1-3-4-4.5-3.5 0-4 3-4 3s-1.5-1-4-1C4 9 2.5 12 .5 14.5z"/>
      </svg>`;
    }
    if (norm.includes('aws') || norm.includes('amazon')) {
      return `<svg class="cred-issuer-icon" viewBox="0 0 24 24" aria-hidden="true" width="28" height="28">
        <path fill="#FF9900" d="M18.75 14.25c-2.3 1.7-5.55 2.6-8.75 2.6-4.48 0-8.5-1.7-11.5-4.55-.23-.2-.03-.5.25-.33 3.25 1.95 7.2 3.13 11.25 3.13 2.85 0 5.85-.68 8.5-2.03.38-.19.7.23.25.18z"/>
        <path fill="#FF9900" d="M19.75 12.95c-.3-.38-1.95-.18-2.65-.1-.23.03-.28-.18-.08-.33 1.3-.98 3.43-.7 3.73-.33.3.38-.1 2.55-1.33 3.65-.18.15-.35.08-.28-.13.23-.73.9-2.38.6-2.76z"/>
      </svg>`;
    }
    if (norm.includes('cisco')) {
      return `<svg class="cred-issuer-icon" viewBox="0 0 24 24" aria-hidden="true" width="28" height="28">
        <rect x="2" y="10" width="3" height="4" rx="1" fill="#1BA0D7"/>
        <rect x="7" y="7" width="3" height="10" rx="1" fill="#1BA0D7"/>
        <rect x="12" y="4" width="3" height="16" rx="1" fill="#1BA0D7"/>
        <rect x="17" y="7" width="3" height="10" rx="1" fill="#1BA0D7"/>
        <rect x="22" y="10" width="3" height="4" rx="1" fill="#1BA0D7"/>
      </svg>`;
    }
    if (norm.includes('snowflake') || norm.includes('snowpro')) {
      return `<svg class="cred-issuer-icon" viewBox="0 0 24 24" aria-hidden="true" width="28" height="28">
        <path fill="none" stroke="#29B5E8" stroke-width="2" stroke-linecap="round" d="M12 2v20M2 12h20M5.64 5.64l12.72 12.72M18.36 5.64L5.64 18.36"/>
      </svg>`;
    }
    if (norm.includes('tesda')) {
      return `<svg class="cred-issuer-icon" viewBox="0 0 24 24" aria-hidden="true" width="28" height="28">
        <circle cx="12" cy="12" r="10" fill="none" stroke="var(--color-accent)" stroke-width="1.5"/>
        <path fill="var(--color-accent)" d="M8 9h8v1.5H8zm2 3h4v1.5h-4zm-1 3h6v1.5H9z"/>
      </svg>`;
    }
    if (norm.includes('hackerrank')) {
      return `<svg class="cred-issuer-icon" viewBox="0 0 24 24" aria-hidden="true" width="28" height="28">
        <path fill="#2EC866" d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm-.84 17.4l-1.392-1.392 2.772-2.772-2.772-2.772 1.392-1.392L14.34 12l-3.18 5.4zm5.64 0l-1.392-1.392L18.18 12l-2.772-2.772L16.8 7.836l3.18 4.164-3.18 5.4z"/>
      </svg>`;
    }
    if (norm.includes('certiport')) {
      return `<svg class="cred-issuer-icon" viewBox="0 0 24 24" aria-hidden="true" width="28" height="28">
        <path fill="var(--color-accent)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>`;
    }
    if (norm.includes('datacamp')) {
      return `<svg class="cred-issuer-icon" viewBox="0 0 24 24" aria-hidden="true" width="28" height="28">
        <path fill="#03EF62" d="M12.946 15.3l2.054 1.185L9.538 19.7V17.16L12.946 15.3zM9.538 4.3v13.954l2.054-1.185V6.535L18.923 10.7 21 9.515 9.538 4.3zM3 13.885l2.077 1.185V9.515L3 8.33v5.555z"/>
      </svg>`;
    }
    // Generic fallback
    return `<svg class="cred-issuer-icon" viewBox="0 0 24 24" aria-hidden="true" width="28" height="28">
      <path fill="var(--color-accent)" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>`;
  };

  // ── Gallery Rendering ──────────────────────────────────────────────────────

  const renderGallery = () => {
    const filtered = data.filter(matchesFilter);

    if (resultCount) {
      const total = data.length;
      resultCount.textContent = filtered.length === total
        ? `${total} ACHIEVEMENTS`
        : `${filtered.length} OF ${total} ACHIEVEMENTS`;
    }

    const isFiltered = state.search !== '' || state.types.length > 0 || state.domains.length > 0;
    if (clearFiltersBtn) clearFiltersBtn.hidden = !isFiltered;

    const certItems = sortCredentials(filtered.filter(i => i.group === 'CERTIFICATIONS'));
    const trainingItems = sortCredentials(filtered.filter(i => i.group === 'TRAINING & PROGRAMS'));

    certsGrid.innerHTML = '';
    trainingGrid.innerHTML = '';

    if (certItems.length > 0) {
      certsSection.hidden = false;
      certItems.forEach(item => certsGrid.appendChild(createCardElement(item)));
    } else {
      certsSection.hidden = true;
    }

    if (trainingItems.length > 0) {
      trainingSection.hidden = false;
      trainingItems.forEach(item => trainingGrid.appendChild(createCardElement(item)));
    } else {
      trainingSection.hidden = true;
    }

    if (emptyState) emptyState.hidden = filtered.length > 0;
  };

  // ── Event Listeners ────────────────────────────────────────────────────────

  const setupEventListeners = () => {
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.search = e.target.value;
        updateUrlState();
        renderGallery();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sort = e.target.value || 'rank-desc';
        updateUrlState();
        renderGallery();
      });
    }

    // Type filter buttons (multi-select)
    document.querySelectorAll('[data-filter-group="type"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.value;
        if (val === 'all') {
          state.types = [];
        } else {
          const idx = state.types.indexOf(val);
          if (idx >= 0) {
            state.types.splice(idx, 1);
          } else {
            state.types.push(val);
          }
        }
        syncFilterButtonsUI();
        updateUrlState();
        renderGallery();
      });
    });

    // Domain filter buttons (multi-select)
    document.querySelectorAll('[data-filter-group="domain"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.value;
        if (val === 'all') {
          state.domains = [];
        } else {
          const idx = state.domains.indexOf(val);
          if (idx >= 0) {
            state.domains.splice(idx, 1);
          } else {
            state.domains.push(val);
          }
        }
        syncFilterButtonsUI();
        updateUrlState();
        renderGallery();
      });
    });

    document.querySelectorAll('[data-filter-group="rank"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.dataset.value;
        if (val === 'all') {
          state.ranks = [];
        } else {
          const idx = state.ranks.indexOf(val);
          if (idx >= 0) {
            state.ranks.splice(idx, 1);
          } else {
            state.ranks.push(val);
          }
        }
        syncFilterButtonsUI();
        updateUrlState();
        renderGallery();
      });
    });

    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => {
        state.search = '';
        state.types = [];
        state.ranks = [];
        state.domains = [];
        if (searchInput) searchInput.value = '';
        syncFilterButtonsUI();
        updateUrlState();
        renderGallery();
      });
    }

    // Type tooltip toggle
    if (typeInfoBtn && typeTooltip) {
      typeInfoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = typeInfoBtn.getAttribute('aria-expanded') === 'true';
        typeInfoBtn.setAttribute('aria-expanded', !isExpanded);
        typeTooltip.hidden = isExpanded;
      });

      document.addEventListener('click', () => {
        if (typeTooltip && !typeTooltip.hidden) {
          typeTooltip.hidden = true;
          typeInfoBtn.setAttribute('aria-expanded', 'false');
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !typeTooltip.hidden) {
          typeTooltip.hidden = true;
          typeInfoBtn.setAttribute('aria-expanded', 'false');
          typeInfoBtn.focus();
        }
      });
    }

    // Handle Back/Forward
    window.addEventListener('popstate', () => {
      readUrlState();
      renderGallery();
    });
  };

  // ── Utility ────────────────────────────────────────────────────────────────

  const escapeHtml = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const resolveName = (idOrSlug) => {
    const match = data.find(item => item.id === idOrSlug || item.slug === idOrSlug);
    return match ? `${match.name} ${match.provider || match.issuer}` : idOrSlug;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
