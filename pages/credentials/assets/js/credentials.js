/**
 * Credentials Gallery & Modal Interactive Logic
 * Ian Cedric Ramirez Portfolio - Phase 14.1 Credentials Correction
 */

(() => {
  const data = window.CREDENTIALS_DATA || [];

  // Active filter state
  const state = {
    search: '',
    type: 'all',
    domain: 'all',
    status: 'all',
    activeModalId: null
  };

  // DOM Elements
  const searchInput = document.getElementById('cred-search');
  const typeFiltersContainer = document.getElementById('type-filters');
  const domainFiltersContainer = document.getElementById('domain-filters');
  const statusFiltersContainer = document.getElementById('status-filters');
  const resultCount = document.getElementById('result-count');
  const clearFiltersBtn = document.getElementById('clear-filters');

  // Group Containers
  const certsSection = document.getElementById('group-certifications');
  const certsGrid = document.getElementById('grid-certifications');
  
  const trainingSection = document.getElementById('group-training');
  const trainingGrid = document.getElementById('grid-training');

  const emptyState = document.getElementById('cred-empty-state');

  // Modal Elements
  const modal = document.getElementById('cred-modal');
  const modalBackdrop = document.getElementById('cred-modal-backdrop');
  const modalCloseBtn = document.getElementById('cred-modal-close');
  const modalBody = document.getElementById('cred-modal-body');

  let previousActiveElement = null;

  // Initialize
  const init = () => {
    readUrlState();
    setupEventListeners();
    renderGallery();
    checkUrlForModal();
  };

  // Read State from URL Query Parameters
  const readUrlState = () => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('q')) state.search = params.get('q') || '';
    if (params.has('type')) state.type = params.get('type') || 'all';
    if (params.has('domain')) state.domain = params.get('domain') || 'all';
    if (params.has('status')) state.status = params.get('status') || 'all';
    if (params.has('cred')) state.activeModalId = params.get('cred');

    if (searchInput) searchInput.value = state.search;
    syncFilterButtonsUI();
  };

  // Update URL Query Parameters
  const updateUrlState = () => {
    const params = new URLSearchParams();
    if (state.search) params.set('q', state.search);
    if (state.type !== 'all') params.set('type', state.type);
    if (state.domain !== 'all') params.set('domain', state.domain);
    if (state.status !== 'all') params.set('status', state.status);
    if (state.activeModalId) params.set('cred', state.activeModalId);

    const newRelativePathQuery = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState(null, '', newRelativePathQuery);
  };

  // Sync active states on filter buttons
  const syncFilterButtonsUI = () => {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      const group = btn.dataset.filterGroup;
      const val = btn.dataset.value;
      if (group && val) {
        const isSelected = state[group] === val;
        btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      }
    });
  };

  // Helper: Filter matches credential item
  const matchesFilter = (item) => {
    // Search query match
    if (state.search.trim()) {
      const q = state.search.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchIssuer = item.issuer.toLowerCase().includes(q);
      const matchDomains = item.domains.some(d => d.toLowerCase().includes(q));
      const matchAbout = item.about.toLowerCase().includes(q);
      const matchCoverage = item.officialCoverage.some(c => 
        c.domain.toLowerCase().includes(q) || c.topics.some(t => t.toLowerCase().includes(q))
      );
      if (!matchName && !matchIssuer && !matchDomains && !matchAbout && !matchCoverage) {
        return false;
      }
    }

    // Type filter
    if (state.type !== 'all') {
      const normalizedType = item.type.toLowerCase().trim();
      const targetType = state.type.toLowerCase().trim();
      if (normalizedType !== targetType) return false;
    }

    // Domain filter
    if (state.domain !== 'all') {
      const targetDomain = state.domain.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');
      const hasDomain = item.domains.some(d => {
        const norm = d.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');
        return norm === targetDomain;
      });
      if (!hasDomain) return false;
    }

    // Status filter
    if (state.status !== 'all') {
      if (item.status.toLowerCase() !== state.status.toLowerCase()) return false;
    }

    return true;
  };

  // Default Sort Order: Current first, then alphabetical/date
  const sortCredentials = (items) => {
    return [...items].sort((a, b) => {
      if (a.status === 'Current' && b.status !== 'Current') return -1;
      if (a.status !== 'Current' && b.status === 'Current') return 1;
      return a.name.localeCompare(b.name);
    });
  };

  // Render Card HTML (Minimal Glance Summary)
  const createCardElement = (item) => {
    const card = document.createElement('article');
    card.className = `cred-card ${item.status.toLowerCase() === 'expired' ? 'cred-card--expired' : ''}`;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-haspopup', 'dialog');
    card.setAttribute('data-cred-id', item.id);

    // Limit visible tags to 2-3
    const visibleTags = item.domains.slice(0, 3);

    // Issuer Icon SVG / Visual Badge
    const issuerBadgeSvg = getIssuerBadgeSvg(item.issuer);

    // Type & Level line
    const typeLevelText = item.level ? `${item.type} · ${item.level}` : item.type;

    card.innerHTML = `
      <!-- TODO: Confirm credential earned/completed date. -->
      <!-- TODO: Confirm credential ID. -->
      <!-- TODO: Confirm expiration policy/date. -->
      <!-- TODO: Add official verification URL. -->
      <!-- TODO: Add Credly/LinkedIn verification if applicable. -->
      <!-- TODO: Confirm earned exam/version. -->
      <!-- TODO: Add certificate asset if available. -->
      
      <div class="cred-card__header">
        <div class="cred-card__issuer-badge">
          ${issuerBadgeSvg}
        </div>
        <div class="cred-card__badges">
          ${item.highValue ? `<span class="cred-badge cred-badge--high-value">HIGH VALUE</span>` : ''}
          <span class="cred-badge cred-badge--${item.status.toLowerCase()}">${item.status}</span>
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
          <span class="cred-card__year">${escapeHtml(item.earnedYear)}</span>
          <span class="cred-card__action">View Credential →</span>
        </div>
      </div>
    `;

    // Click & Keypress handlers
    const openHandler = () => openModal(item.id, card);
    card.addEventListener('click', openHandler);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openHandler();
      }
    });

    return card;
  };

  // Issuer SVG Icons
  const getIssuerBadgeSvg = (issuer) => {
    const norm = issuer.toLowerCase();
    if (norm.includes('google')) {
      return `<svg class="cred-issuer-icon" viewBox="0 0 24 24" aria-hidden="true" width="28" height="28">
        <path fill="#4285F4" d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
      </svg>`;
    }
    if (norm.includes('snowflake')) {
      return `<svg class="cred-issuer-icon" viewBox="0 0 24 24" aria-hidden="true" width="28" height="28">
        <path fill="#29B5E8" d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" stroke="#29B5E8" stroke-width="2.5" stroke-linecap="round"/>
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
    return `<i class="fa-solid fa-award cred-issuer-icon" aria-hidden="true"></i>`;
  };

  // Render Gallery Groups
  const renderGallery = () => {
    const filtered = data.filter(matchesFilter);

    // Update Result Count
    if (resultCount) {
      resultCount.textContent = `${filtered.length} ${filtered.length === 1 ? 'CREDENTIAL' : 'CREDENTIALS'}`;
    }

    // Toggle Clear Filters Button
    const isFiltered = state.search !== '' || state.type !== 'all' || state.domain !== 'all' || state.status !== 'all';
    if (clearFiltersBtn) {
      clearFiltersBtn.hidden = !isFiltered;
    }

    // Categorize filtered credentials strictly by category
    const certItems = sortCredentials(filtered.filter(item => item.category === 'CERTIFICATIONS'));
    const trainingItems = sortCredentials(filtered.filter(item => item.category === 'TRAINING & PROGRAMS'));

    // Clear grids
    certsGrid.innerHTML = '';
    trainingGrid.innerHTML = '';

    // Render Certifications Group
    if (certItems.length > 0) {
      certsSection.hidden = false;
      certItems.forEach(item => certsGrid.appendChild(createCardElement(item)));
    } else {
      certsSection.hidden = true;
    }

    // Render Training & Programs Group
    if (trainingItems.length > 0) {
      trainingSection.hidden = false;
      trainingItems.forEach(item => trainingGrid.appendChild(createCardElement(item)));
    } else {
      trainingSection.hidden = true;
    }

    // Show empty state if nothing matches
    if (emptyState) {
      emptyState.hidden = filtered.length > 0;
    }
  };

  // Event Listeners for Filters & Controls
  const setupEventListeners = () => {
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.search = e.target.value;
        updateUrlState();
        renderGallery();
      });
    }

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.dataset.filterGroup;
        const val = btn.dataset.value;

        if (group && val) {
          state[group] = val;
          syncFilterButtonsUI();
          updateUrlState();
          renderGallery();
        }
      });
    });

    if (clearFiltersBtn) {
      clearFiltersBtn.addEventListener('click', () => {
        state.search = '';
        state.type = 'all';
        state.domain = 'all';
        state.status = 'all';

        if (searchInput) searchInput.value = '';
        syncFilterButtonsUI();
        updateUrlState();
        renderGallery();
      });
    }

    // Close Modal Events
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && !modal.hidden) {
        closeModal();
      }
    });

    // Handle Browser Popstate (Back/Forward)
    window.addEventListener('popstate', () => {
      readUrlState();
      renderGallery();
      if (state.activeModalId) {
        openModal(state.activeModalId, null, false);
      } else {
        closeModal(false);
      }
    });
  };

  // Open Credential Modal
  const openModal = (credId, triggerEl = null, updateUrl = true) => {
    const item = data.find(d => d.id === credId);
    if (!item) return;

    previousActiveElement = triggerEl || document.activeElement;
    state.activeModalId = credId;

    if (updateUrl) updateUrlState();

    // Populate Modal Content
    modalBody.innerHTML = generateModalMarkup(item);

    // Show modal & disable body scroll
    modal.hidden = false;
    modal.removeAttribute('hidden');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Focus close button or first focusable element inside modal
    if (modalCloseBtn) modalCloseBtn.focus();

    // Setup focus trap inside modal
    setupFocusTrap();
  };

  // Close Credential Modal
  const closeModal = (updateUrl = true) => {
    if (!modal) return;

    modal.hidden = true;
    modal.setAttribute('hidden', '');
    modal.style.display = 'none';
    document.body.style.overflow = '';
    state.activeModalId = null;

    if (updateUrl) updateUrlState();

    // Return focus to triggering card
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus();
    }
  };

  // Focus Trap inside Modal
  const setupFocusTrap = () => {
    const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const handleTrap = (e) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTrap, { once: true });
  };

  // Check URL on Load for open modal
  const checkUrlForModal = () => {
    if (state.activeModalId) {
      openModal(state.activeModalId, null, false);
    }
  };

  // Generate Rich Modal HTML Markup
  const generateModalMarkup = (item) => {
    const issuerBadgeSvg = getIssuerBadgeSvg(item.issuer);

    return `
      <!-- TODO: Confirm credential earned/completed date. -->
      <!-- TODO: Confirm credential ID. -->
      <!-- TODO: Confirm expiration policy/date. -->
      <!-- TODO: Add official verification URL. -->
      <!-- TODO: Add Credly/LinkedIn verification if applicable. -->
      <!-- TODO: Confirm earned exam/version. -->
      <!-- TODO: Add certificate asset if available. -->

      <header class="cred-modal__header">
        <div class="cred-modal__brand">
          <div class="cred-modal__issuer-badge">${issuerBadgeSvg}</div>
          <div>
            <p class="cred-modal__issuer-name">${escapeHtml(item.issuer)}</p>
            <h2 class="cred-modal__title" id="cred-modal-title">${escapeHtml(item.name)}</h2>
          </div>
        </div>

        <div class="cred-modal__badges">
          ${item.highValue ? `<span class="cred-badge cred-badge--high-value">HIGH VALUE</span>` : ''}
          <span class="cred-badge cred-badge--${item.status.toLowerCase()}">${item.status}</span>
        </div>
      </header>

      <!-- Factual Summary / About -->
      <section class="cred-modal__section">
        <h3 class="cred-modal__section-heading">About Credential</h3>
        <p class="cred-modal__about">${escapeHtml(item.about)}</p>
      </section>

      <!-- Key Metadata Grid -->
      <section class="cred-modal__section">
        <h3 class="cred-modal__section-heading">Credential Metadata</h3>
        <dl class="cred-modal__meta-grid">
          <div class="cred-modal__meta-item">
            <dt>Issuer</dt>
            <dd>${escapeHtml(item.issuer)}</dd>
          </div>
          <div class="cred-modal__meta-item">
            <dt>Credential Type</dt>
            <dd>${escapeHtml(item.type)}</dd>
          </div>
          <div class="cred-modal__meta-item">
            <dt>Level</dt>
            <dd>${escapeHtml(item.level || 'Standard')}</dd>
          </div>
          <div class="cred-modal__meta-item">
            <dt>Status</dt>
            <dd><span class="cred-status-indicator cred-status-indicator--${item.status.toLowerCase()}"></span> ${item.status}</dd>
          </div>
          <div class="cred-modal__meta-item">
            <dt>Earned Date</dt>
            <dd>${item.earnedDate ? escapeHtml(item.earnedDate) : 'Unverified (Pending evidence confirmation)'}</dd>
          </div>
          <div class="cred-modal__meta-item">
            <dt>Expiration</dt>
            <dd>${item.expiresDate ? escapeHtml(item.expiresDate) : 'Unverified / Policy pending'}</dd>
          </div>
          <div class="cred-modal__meta-item">
            <dt>Credential ID</dt>
            <dd>${item.credentialId ? `<code>${escapeHtml(item.credentialId)}</code>` : 'Unverified / Private'}</dd>
          </div>
          <div class="cred-modal__meta-item">
            <dt>Domains</dt>
            <dd>${item.domains.map(d => `<span class="cred-card__tag">${escapeHtml(d)}</span>`).join(' ')}</dd>
          </div>
        </dl>
      </section>

      <!-- Verification Section -->
      <section class="cred-modal__section">
        <h3 class="cred-modal__section-heading">Verification & Evidence Assets</h3>
        ${generateVerificationMarkup(item)}
      </section>

      <!-- Official Coverage & Provenance -->
      <section class="cred-modal__section">
        <h3 class="cred-modal__section-heading">Official Coverage & Provenance</h3>
        <div class="cred-modal__provenance-box">
          <p class="cred-modal__prov-line"><strong>Source:</strong> ${escapeHtml(item.coverageSource)}</p>
          <p class="cred-modal__prov-line"><strong>Earned Version:</strong> ${escapeHtml(item.earnedVersion)}</p>
          ${item.currentVersionNote ? `<p class="cred-modal__prov-line"><strong>Current Version Note:</strong> ${escapeHtml(item.currentVersionNote)}</p>` : ''}
          <p class="cred-modal__prov-line cred-modal__prov-date"><strong>Fetched Date:</strong> ${escapeHtml(item.fetchedDate)}</p>
        </div>

        <div class="cred-modal__coverage-list">
          ${item.officialCoverage.map(cov => `
            <div class="cred-modal__coverage-group">
              <h4 class="cred-modal__coverage-domain">${escapeHtml(cov.domain)}</h4>
              <ul class="cred-modal__coverage-topics">
                ${cov.topics.map(t => `<li>${escapeHtml(t)}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Applied Evidence Section -->
      <section class="cred-modal__section">
        <h3 class="cred-modal__section-heading">Applied Evidence in Portfolio</h3>
        <div class="cred-modal__evidence-grid">
          ${generateEvidenceMarkup(item)}
        </div>
      </section>
    `;
  };

  // Generate Verification Markup
  const generateVerificationMarkup = (item) => {
    const links = item.verificationLinks || [];
    const hasCertAsset = Boolean(item.certificateAsset);

    if (!links.length && !hasCertAsset) {
      return `
        <!-- TODO: Add official verification URL. -->
        <!-- TODO: Add Credly/LinkedIn verification if applicable. -->
        <!-- TODO: Add certificate asset if available. -->
        <div class="cred-modal__notice">
          <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
          <span>Official verification links and certificate asset are currently unverified. No unverified links or fake IDs are published.</span>
        </div>
      `;
    }

    let html = '<div class="cred-modal__verification-links">';
    if (hasCertAsset) {
      html += `<a href="${item.certificateAsset}" target="_blank" rel="noopener noreferrer" class="cred-btn cred-btn--primary"><i class="fa-solid fa-file-pdf" aria-hidden="true"></i> View Certificate</a>`;
    }
    links.forEach(l => {
      html += `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="cred-btn cred-btn--secondary"><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i> ${escapeHtml(l.label)}</a>`;
    });
    html += '</div>';
    return html;
  };

  // Generate Applied Evidence Markup
  const generateEvidenceMarkup = (item) => {
    let html = '';

    if (item.relatedProjects && item.relatedProjects.length > 0) {
      html += `<div class="cred-modal__evidence-column">
        <h4 class="cred-modal__evidence-title"><i class="fa-solid fa-folder-open" aria-hidden="true"></i> Related Projects</h4>
        <ul class="cred-modal__evidence-list">
          ${item.relatedProjects.map(p => `
            <li>
              <a href="${p.url}" class="cred-modal__evidence-link">${escapeHtml(p.name)} →</a>
              <p class="cred-modal__evidence-desc">${escapeHtml(p.description)}</p>
            </li>
          `).join('')}
        </ul>
      </div>`;
    }

    if (item.relatedExperience && item.relatedExperience.length > 0) {
      html += `<div class="cred-modal__evidence-column">
        <h4 class="cred-modal__evidence-title"><i class="fa-solid fa-briefcase" aria-hidden="true"></i> Related Experience</h4>
        <ul class="cred-modal__evidence-list">
          ${item.relatedExperience.map(e => `
            <li>
              <a href="${e.url}" class="cred-modal__evidence-link">${escapeHtml(e.title)} (${escapeHtml(e.company)}) →</a>
              <p class="cred-modal__evidence-desc">${escapeHtml(e.description)}</p>
            </li>
          `).join('')}
        </ul>
      </div>`;
    }

    if (!html) {
      html = `<p class="cred-modal__evidence-none">No direct project or experience links assigned.</p>`;
    }

    return html;
  };

  // Utility: Escape HTML
  const escapeHtml = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Run on DOM Content Loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
