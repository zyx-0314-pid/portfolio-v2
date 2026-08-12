/**
 * credential-detail.js
 * Shared interactive logic for all credential and training detail pages.
 *
 * Responsibilities:
 *  - Resolve the current page's credential record from CREDENTIALS_DATA using the slug
 *    declared in the page's <meta name="credential-slug"> tag.
 *  - Render Previous / Next navigation between records in the same group.
 *  - Provide the escapeHtml utility for inline page scripts that need it.
 */

(() => {
  const data = window.CREDENTIALS_DATA || [];

  // ── Utilities ──────────────────────────────────────────────────────────────

  window.escapeHtml = (str) => {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  // Resolve a credential by id or slug
  window.resolveCredential = (idOrSlug) =>
    data.find(d => d.id === idOrSlug || d.slug === idOrSlug) || null;

  const currentRecord = () => {
    const slugMeta = document.querySelector('meta[name="credential-slug"]');
    if (!slugMeta) return null;
    return window.resolveCredential(slugMeta.getAttribute('content'));
  };

  const rootFromDetailUrl = (record) => {
    const segments = (record.detailUrl || '').replace(/\/$/, '').split('/').length;
    return '../'.repeat(segments + 2);
  };

  const fromCurrentToTarget = (current, target) => {
    const backToListing = '../'.repeat((current.detailUrl || '').replace(/\/$/, '').split('/').length);
    return backToListing + (target.detailUrl || '#');
  };

  const renderActions = (record) => {
    const actions = [];
    const root = rootFromDetailUrl(record);
    (record.verificationLinks || []).forEach(link => {
      const href = typeof link === 'string' ? link : link.url;
      const label = typeof link === 'string' ? 'Verify Credential' : (link.label || 'Verify Credential');
      if (href) actions.push(`<a class="cred-btn cred-btn--primary" href="${window.escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${window.escapeHtml(label)}</a>`);
    });
    if (record.certificateAsset && isImageAsset(record.certificateAsset)) {
      actions.push(`<button class="cred-btn cred-btn--secondary" type="button" data-certificate-modal-trigger data-certificate-src="${window.escapeHtml(root + record.certificateAsset)}" data-certificate-title="${window.escapeHtml(record.name)}">View Certificate</button>`);
    } else if (record.certificateAsset) {
      actions.push(`<a class="cred-btn cred-btn--secondary" href="${window.escapeHtml(root + record.certificateAsset)}">View Certificate</a>`);
    }
    if (record.issuerUrl) actions.push(`<a class="cred-btn cred-btn--secondary" href="${window.escapeHtml(record.issuerUrl)}" target="_blank" rel="noopener noreferrer">Visit Issuer</a>`);
    if (record.repositoryUrl) actions.push(`<a class="cred-btn cred-btn--secondary" href="${window.escapeHtml(record.repositoryUrl)}" target="_blank" rel="noopener noreferrer">Repository</a>`);
    if (record.projectUrl) actions.push(`<a class="cred-btn cred-btn--secondary" href="${window.escapeHtml(record.projectUrl)}" target="_blank" rel="noopener noreferrer">Related Project</a>`);
    return actions.length ? `<div class="cred-detail-actions">${actions.join('')}</div>` : '';
  };

  const isImageAsset = (path) => /\.(png|jpe?g|webp|gif|svg)$/i.test(path || '');

  const issuerLogoPath = (issuer) => {
    const norm = (issuer || '').toLowerCase();
    if (norm.includes('all tech is human')) return 'pages/credentials/assets/img/all_tech_is_human.jpg';
    if (norm.includes('certiport')) return 'pages/credentials/assets/img/certiport.jpg';
    if (norm.includes('cisco')) return 'pages/credentials/assets/img/cisco.jpg';
    if (norm.includes('cybrary')) return 'pages/credentials/assets/img/cybrary.jpg';
    if (norm.includes('datacamp')) return 'pages/credentials/assets/img/datacamp.jpg';
    if (norm.includes('github')) return 'pages/credentials/assets/img/github.jpg';
    if (norm.includes('google')) return 'pages/credentials/assets/img/google.jpg';
    if (norm.includes('hackerrank')) return 'pages/credentials/assets/img/hakerrank.jpg';
    if (norm.includes('kong')) return 'pages/credentials/assets/img/kong.jpg';
    if (norm.includes('linkedin')) return 'pages/credentials/assets/img/linkedin.jpg';
    if (norm.includes('microsoft')) return 'pages/credentials/assets/img/microsoft.jpg';
    if (norm.includes('mozilla')) return 'pages/credentials/assets/img/mozilla.jpg';
    if (norm.includes('pagerduty')) return 'pages/credentials/assets/img/pagerduty.jpg';
    if (norm.includes('snowflake') || norm.includes('snowpro')) return 'pages/credentials/assets/img/snowflakes.jpg';
    if (norm.includes('testmu')) return 'pages/credentials/assets/img/testmu.jpg';
    if (norm.includes('udemy')) return 'pages/credentials/assets/img/udemy.jpg';
    return null;
  };

  const renderRelationshipList = (current, ids) => {
    const items = (ids || []).map(id => {
      const record = window.resolveCredential(id);
      if (!record) return null;
      return `<li><a class="cred-detail-related-link" href="${window.escapeHtml(fromCurrentToTarget(current, record))}">${window.escapeHtml(record.name)}</a><p class="cred-detail-related-desc">${window.escapeHtml(record.provider || record.issuer)} · ${window.escapeHtml(record.type)}</p></li>`;
    }).filter(Boolean);
    return items.length ? `<ul class="cred-detail-related-list">${items.join('')}</ul>` : '';
  };

  const renderExperienceList = (record) => {
    const root = rootFromDetailUrl(record);
    return (record.relatedExperience || []).map(id => {
      if (id === 'java-industry-immersion-trainee') {
        return `<li><a class="cred-detail-related-link" href="${root}pages/experience/java-industry-immersion/">Java Industry Immersion Trainee</a><p class="cred-detail-related-desc">Related experience record connected to this training.</p></li>`;
      }
      return `<li><span class="cred-detail-related-link">${window.escapeHtml(id)}</span></li>`;
    }).join('');
  };

  const renderDetail = () => {
    const record = currentRecord();
    const container = document.querySelector('[data-credential-detail]');
    if (!record || !container) return;

    const root = rootFromDetailUrl(record);
    const listingLabel = record.group === 'CERTIFICATIONS' ? 'Certifications' : 'Training & Programs';
    const parent = record.parentProgram ? window.resolveCredential(record.parentProgram) : null;
    const included = renderRelationshipList(record, record.includedCredentials);
    const relatedCredentials = renderRelationshipList(record, record.relatedCredentials);
    const relatedTraining = renderRelationshipList(record, record.relatedTraining);
    const relatedExperience = renderExperienceList(record);
    const logoPath = issuerLogoPath(record.provider || record.issuer);
    const issuerBadge = logoPath
      ? `<img class="cred-detail-issuer-logo" src="${window.escapeHtml(root + logoPath)}" alt="" loading="lazy" decoding="async">`
      : window.escapeHtml((record.provider || record.issuer || '?').slice(0, 2)).toUpperCase();
    const displayDate = record.earnedDate || record.completionDate || ((record.verificationLinks || []).length ? 'Date pending' : 'Unverified');
    const rankBadge = (record.starRank || 0) > 0
      ? `<span class="cred-badge cred-badge--rank cred-badge--rank-${record.starRank}">${window.escapeHtml('★'.repeat(record.starRank))} ${window.escapeHtml(record.starLabel || '')}</span>`
      : '';

    container.innerHTML = `
      <div class="cred-detail-shell">
        <nav class="cred-breadcrumb" aria-label="Breadcrumb">
          <a href="${root}">Home</a> / <a href="${root}pages/credentials/">${listingLabel}</a> / <span class="cred-breadcrumb__current" aria-current="page">${window.escapeHtml(record.name)}</span>
        </nav>

        <header class="cred-detail-header">
          <div class="cred-detail-header__top">
            <div class="cred-detail-issuer-badge" aria-hidden="true">${issuerBadge}</div>
            <div class="cred-detail-header__identity">
              <p class="cred-detail-provider">${window.escapeHtml(record.provider || record.issuer)}</p>
              <h1 class="cred-detail-title">${window.escapeHtml(record.name)}</h1>
              <div class="cred-detail-badges">
                <span class="cred-badge cred-badge--type">${window.escapeHtml(record.type)}</span>
                <span class="cred-badge cred-badge--type">${window.escapeHtml(record.group)}</span>
                ${rankBadge}
                ${record.credentialKind ? `<span class="cred-badge cred-badge--parent">${window.escapeHtml(record.credentialKind)}</span>` : ''}
              </div>
              <div class="cred-detail-domains">${(record.domains || []).map(domain => `<span class="cred-detail-domain-tag">${window.escapeHtml(domain)}</span>`).join('')}</div>
            </div>
          </div>

          <dl class="cred-detail-meta-strip">
            <div class="cred-detail-meta-item"><dt>Provider</dt><dd>${window.escapeHtml(record.provider || record.issuer)}</dd></div>
            <div class="cred-detail-meta-item"><dt>Status</dt><dd>${window.escapeHtml(record.status || 'Current')}</dd></div>
            <div class="cred-detail-meta-item"><dt>${record.group === 'CERTIFICATIONS' ? 'Issue Date' : 'Completion Date'}</dt><dd>${window.escapeHtml(displayDate)}</dd></div>
            ${record.expirationDate || record.expiresDate ? `<div class="cred-detail-meta-item"><dt>Expiration</dt><dd>${window.escapeHtml(record.expirationDate || record.expiresDate)}</dd></div>` : ''}
            ${record.credentialId ? `<div class="cred-detail-meta-item"><dt>Credential ID</dt><dd>${window.escapeHtml(record.credentialId)}</dd></div>` : '<!-- TODO: Confirm credential ID. -->'}
          </dl>
        </header>

        ${renderActions(record)}

        <section class="cred-detail-section" aria-labelledby="details-heading">
          <h2 class="cred-detail-section-heading" id="details-heading">Details</h2>
          <p class="cred-detail-about">${window.escapeHtml(record.about || record.description)}</p>
          ${record.rankingNote ? `<p class="cred-detail-notice">${window.escapeHtml(record.rankingNote)}</p>` : ''}
        </section>

        ${(record.learningNotes || []).length ? `
          <section class="cred-detail-section" aria-labelledby="learning-heading">
            <h2 class="cred-detail-section-heading" id="learning-heading">What I Learned</h2>
            <ul class="cred-detail-coverage-topics">${record.learningNotes.map(note => `<li>${window.escapeHtml(note)}</li>`).join('')}</ul>
          </section>
        ` : `<!-- TODO: Add "What I Learned" notes for ${window.escapeHtml(record.name)}. -->`}
        ${(record.learningTodos || []).length ? `<!-- TODO: ${record.learningTodos.map(todo => window.escapeHtml(todo)).join(' | ')} -->` : ''}

        ${(record.skills || []).length || (record.officialCoverage || []).length ? `
          <section class="cred-detail-section" aria-labelledby="coverage-heading">
            <h2 class="cred-detail-section-heading" id="coverage-heading">Skills & Coverage</h2>
            <div class="cred-detail-coverage-list">
              ${(record.officialCoverage || [{ domain: 'Covered Skills', topics: record.skills || [] }]).map(group => `
                <div class="cred-detail-coverage-group">
                  <h3 class="cred-detail-coverage-domain">${window.escapeHtml(group.domain)}</h3>
                  <ul class="cred-detail-coverage-topics">${(group.topics || []).map(topic => `<li>${window.escapeHtml(topic)}</li>`).join('')}</ul>
                </div>
              `).join('')}
            </div>
          </section>
        ` : ''}

        ${parent ? `
          <section class="cred-detail-section" aria-labelledby="parent-heading">
            <h2 class="cred-detail-section-heading" id="parent-heading">Parent Program</h2>
            ${renderRelationshipList(record, [parent.slug])}
          </section>
        ` : ''}

        ${included ? `
          <section class="cred-detail-section" aria-labelledby="included-heading">
            <h2 class="cred-detail-section-heading" id="included-heading">${record.credentialKind === 'Career Path' ? 'Included Training' : 'Program Courses'}</h2>
            ${included}
          </section>
        ` : ''}

        ${relatedCredentials || relatedTraining || relatedExperience ? `
          <section class="cred-detail-section" aria-labelledby="related-heading">
            <h2 class="cred-detail-section-heading" id="related-heading">Relationships</h2>
            <div class="cred-detail-related-grid">
              ${relatedCredentials ? `<div class="cred-detail-related-column"><h3 class="cred-detail-related-title">Related Credentials</h3>${relatedCredentials}</div>` : ''}
              ${relatedTraining ? `<div class="cred-detail-related-column"><h3 class="cred-detail-related-title">Related Training</h3>${relatedTraining}</div>` : ''}
              ${relatedExperience ? `<div class="cred-detail-related-column"><h3 class="cred-detail-related-title">Related Experience</h3><ul class="cred-detail-related-list">${relatedExperience}</ul></div>` : ''}
            </div>
          </section>
        ` : ''}

        ${record.projectStatus ? `<section class="cred-detail-section"><div class="cred-detail-project-status"><span class="cred-detail-project-status__dot"></span>Project status: ${window.escapeHtml(record.projectStatus)}</div></section>` : ''}
        ${!record.certificateAsset ? '<!-- TODO: Add certificate asset. -->' : ''}
        ${(record.verificationLinks || []).length === 0 ? '<!-- TODO: Add verification link. -->' : ''}
      </div>
    `;
  };

  const initCertificateModal = () => {
    const triggers = document.querySelectorAll('[data-certificate-modal-trigger]');
    if (!triggers.length) return;

    let modal = document.querySelector('[data-certificate-modal]');
    if (!modal) {
      modal = document.createElement('div');
      modal.className = 'cred-certificate-modal';
      modal.setAttribute('data-certificate-modal', '');
      modal.setAttribute('hidden', '');
      modal.innerHTML = `
        <div class="cred-certificate-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="certificate-modal-title">
          <button class="cred-certificate-modal__close" type="button" data-certificate-modal-close aria-label="Close certificate preview">×</button>
          <h2 class="cred-certificate-modal__title" id="certificate-modal-title"></h2>
          <img class="cred-certificate-modal__image" alt="">
        </div>
      `;
      document.body.appendChild(modal);
    }

    const dialog = modal.querySelector('.cred-certificate-modal__dialog');
    const closeButton = modal.querySelector('[data-certificate-modal-close]');
    const title = modal.querySelector('.cred-certificate-modal__title');
    const image = modal.querySelector('.cred-certificate-modal__image');
    let activeTrigger = null;

    const closeModal = () => {
      modal.setAttribute('hidden', '');
      document.body.classList.remove('has-credential-modal');
      if (image) {
        image.removeAttribute('src');
        image.removeAttribute('alt');
      }
      if (activeTrigger) activeTrigger.focus();
      activeTrigger = null;
    };

    const openModal = (trigger) => {
      activeTrigger = trigger;
      if (title) title.textContent = trigger.getAttribute('data-certificate-title') || 'Certificate';
      if (image) {
        image.src = trigger.getAttribute('data-certificate-src') || '';
        image.alt = `${trigger.getAttribute('data-certificate-title') || 'Certificate'} preview`;
      }
      modal.removeAttribute('hidden');
      document.body.classList.add('has-credential-modal');
      if (closeButton) closeButton.focus();
    };

    triggers.forEach(trigger => {
      trigger.addEventListener('click', () => openModal(trigger));
    });

    closeButton?.addEventListener('click', closeModal);
    modal.addEventListener('click', (event) => {
      if (!dialog?.contains(event.target)) closeModal();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
    });
  };

  // ── Previous / Next Navigation ─────────────────────────────────────────────

  const renderPrevNext = () => {
    const container = document.getElementById('cred-prevnext');
    if (!container) return;
    const current = currentRecord();
    if (!current) return;

    // Siblings = same group, no parentProgram (top-level items only)
    // For child courses of the same parent, use the same parentProgram
    let siblings;
    if (current.parentProgram) {
      siblings = data.filter(d => d.parentProgram === current.parentProgram);
    } else {
      siblings = data.filter(d => d.group === current.group && !d.parentProgram);
    }

    const idx = siblings.findIndex(d => d.slug === current.slug);
    if (idx < 0) return;

    const prev = idx > 0 ? siblings[idx - 1] : null;
    const next = idx < siblings.length - 1 ? siblings[idx + 1] : null;

    let html = '<nav class="cred-detail-prevnext" aria-label="Between credentials">';

    if (prev) {
      html += `<a class="cred-detail-prev" href="${window.escapeHtml(buildRelativeUrl(current, prev))}">
        <span class="cred-detail-prevnext__label">← Previous</span>
        <span class="cred-detail-prevnext__name">${window.escapeHtml(prev.name)}</span>
      </a>`;
    } else {
      html += `<span></span>`;
    }

    if (next) {
      html += `<a class="cred-detail-next" href="${window.escapeHtml(buildRelativeUrl(current, next))}">
        <span class="cred-detail-prevnext__label">Next →</span>
        <span class="cred-detail-prevnext__name">${window.escapeHtml(next.name)}</span>
      </a>`;
    } else {
      html += `<span></span>`;
    }

    html += '</nav>';
    container.innerHTML = html;
  };

  // Build a relative URL from current page to the target credential's detailUrl.
  // Both detailUrls are relative to the credentials listing page.
  // Detail pages are 2–3 levels deep relative to listing; we build from current page's
  // depth back to the listing, then forward to the target.
  const buildRelativeUrl = (current, target) => {
    // Count how many levels deep current's detailUrl is (number of slashes - 1).
    // e.g., "certifications/github-foundations/" → 2 segments → needs "../../" to get to listing
    return fromCurrentToTarget(current, target);
  };

  // ── Init ───────────────────────────────────────────────────────────────────

  const init = () => {
    renderDetail();
    initCertificateModal();
    renderPrevNext();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
