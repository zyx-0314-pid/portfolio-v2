/**
 * Skills Gallery & Modal Controller
 * Ian Cedric Ramirez Portfolio — Phase 15 (Card Gallery + Modal)
 *
 * Filter logic:
 *   OR within each filter group, AND across groups.
 *   Multi-select: Category (multi), Depth (single), Type (single)
 *   Search: name + summary + type + categories
 *
 * URL state: ?q=&category=&depth=&type=&skill=<id>
 */

(() => {
  /* ── Constants ─────────────────────────────────────────────────────── */
  const DEPTH_ORDER = { CORE: 0, APPLIED: 1, PRACTICED: 2, EXPOSURE: 3 };

  const DEPTH_DESCRIPTIONS = {
    CORE:     "Repeatedly applied or owned across substantial real systems.",
    APPLIED:  "Meaningfully implemented in a real project or system.",
    PRACTICED:"Hands-on through personal projects, labs, or structured training.",
    EXPOSURE: "Limited practical familiarity or introductory use."
  };

  const EVIDENCE_KIND_LABELS = {
    project:    "Real System",
    experience: "Real System",
    credential: "Validated",
    training:   "Training"
  };

  /* ── State ─────────────────────────────────────────────────────────── */
  const state = {
    query: "",
    categories: new Set(),  // multi-select
    depth: "all",           // single
    type: "all",            // single
    activeSkillId: null
  };

  let previousActiveElement = null;

  /* ── DOM refs ──────────────────────────────────────────────────────── */
  const searchInput     = document.getElementById("skill-search");
  const resultCount     = document.getElementById("skill-result-count");
  const clearFiltersBtn = document.getElementById("skill-clear-filters");
  const galleryEl       = document.getElementById("skill-gallery");
  const emptyState      = document.getElementById("skills-empty-state");
  const modal           = document.getElementById("skill-modal");
  const modalBackdrop   = document.getElementById("skill-modal-backdrop");
  const modalCloseBtn   = document.getElementById("skill-modal-close");
  const modalBody       = document.getElementById("skill-modal-body");

  /* ── URL state ─────────────────────────────────────────────────────── */
  const readURLState = () => {
    const p = new URLSearchParams(window.location.search);
    state.query      = p.get("q") || "";
    state.categories = new Set((p.get("category") || "").split(",").filter(Boolean));
    state.depth      = p.get("depth") || "all";
    state.type       = p.get("type")  || "all";
    state.activeSkillId = p.get("skill") || null;
    if (searchInput) searchInput.value = state.query;
    syncFilterUI();
  };

  const writeURLState = () => {
    const p = new URLSearchParams();
    if (state.query)            p.set("q",        state.query);
    if (state.categories.size)  p.set("category", [...state.categories].join(","));
    if (state.depth !== "all")  p.set("depth",    state.depth);
    if (state.type  !== "all")  p.set("type",     state.type);
    if (state.activeSkillId)    p.set("skill",    state.activeSkillId);
    const url = p.size ? `?${p}` : window.location.pathname;
    history.replaceState(null, "", url);
  };

  /* ── Sync button aria-pressed ──────────────────────────────────────── */
  const syncFilterUI = () => {
    document.querySelectorAll("[data-skill-filter-group]").forEach(btn => {
      const group = btn.dataset.skillFilterGroup;
      const value = btn.dataset.value;

      let active = false;
      if (group === "category") {
        active = value === "all" ? state.categories.size === 0 : state.categories.has(value);
      } else if (group === "depth") {
        active = value === state.depth;
      } else if (group === "type") {
        active = value === state.type;
      }
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
  };

  /* ── Filter logic ──────────────────────────────────────────────────── */
  const matchesState = (skill) => {
    if (state.query) {
      const q = state.query.toLowerCase();
      const blob = [skill.name, skill.summary, skill.type, ...skill.categories].join(" ").toLowerCase();
      if (!blob.includes(q)) return false;
    }
    if (state.categories.size > 0) {
      if (!skill.categories.some(c => state.categories.has(c))) return false;
    }
    if (state.depth !== "all" && skill.depth !== state.depth) return false;
    if (state.type  !== "all" && skill.type  !== state.type)  return false;
    return true;
  };

  /* ── Build skill card element ──────────────────────────────────────── */
  const createCardElement = (skill) => {
    const card = document.createElement("article");
    card.className = "skill-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-haspopup", "dialog");
    card.setAttribute("data-skill-id", skill.id);

    const visibleCats = skill.categories.slice(0, 3);

    card.innerHTML = `
      <div class="skill-card__header">
        <span class="skill-card__depth skill-card__depth--${skill.depth.toLowerCase()}">${skill.depth}</span>
      </div>
      <div class="skill-card__body">
        <p class="skill-card__type">${escapeHtml(skill.type)}</p>
        <h3 class="skill-card__name">${escapeHtml(skill.name)}</h3>
        <p class="skill-card__summary">${escapeHtml(skill.summary)}</p>
      </div>
      <div class="skill-card__footer">
        <div class="skill-card__cats">
          ${visibleCats.map(c => `<span class="skill-card__cat">${escapeHtml(c)}</span>`).join("")}
        </div>
        <div class="skill-card__action-row">
          <span class="skill-card__year">${skill.evidence.length} records · ${skill.lastApplied}</span>
          <span class="skill-card__action">View Evidence →</span>
        </div>
      </div>
    `;

    const open = () => openModal(skill.id, card);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });

    return card;
  };

  /* ── Render gallery ────────────────────────────────────────────────── */
  const renderGallery = () => {
    if (!window.SKILLS_DATA || !galleryEl) return;

    const filtered = window.SKILLS_DATA
      .filter(matchesState)
      .sort((a, b) => {
        const da = DEPTH_ORDER[a.depth] ?? 99;
        const db = DEPTH_ORDER[b.depth] ?? 99;
        if (da !== db) return da - db;
        return a.name.localeCompare(b.name);
      });

    galleryEl.innerHTML = "";

    if (resultCount) {
      resultCount.textContent = `${filtered.length} SKILL${filtered.length !== 1 ? "S" : ""}`;
    }

    const isFiltered = state.query || state.categories.size || state.depth !== "all" || state.type !== "all";
    if (clearFiltersBtn) clearFiltersBtn.hidden = !isFiltered;

    if (filtered.length === 0) {
      if (emptyState) emptyState.hidden = false;
    } else {
      if (emptyState) emptyState.hidden = true;
      filtered.forEach(skill => galleryEl.appendChild(createCardElement(skill)));
    }

    syncFilterUI();
    writeURLState();
  };

  /* ── Filter button handlers ────────────────────────────────────────── */
  document.querySelectorAll("[data-skill-filter-group]").forEach(btn => {
    btn.addEventListener("click", () => {
      const group = btn.dataset.skillFilterGroup;
      const value = btn.dataset.value;

      if (group === "category") {
        if (value === "all") {
          state.categories.clear();
        } else {
          // multi-select toggle
          if (state.categories.has(value)) {
            state.categories.delete(value);
          } else {
            state.categories.add(value);
          }
        }
      } else if (group === "depth") {
        state.depth = value;
      } else if (group === "type") {
        state.type = value;
      }

      renderGallery();
    });
  });

  /* ── Search ────────────────────────────────────────────────────────── */
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      state.query = searchInput.value.trim();
      renderGallery();
    });
  }

  /* ── Clear filters ─────────────────────────────────────────────────── */
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      state.query = "";
      state.categories.clear();
      state.depth = "all";
      state.type  = "all";
      if (searchInput) searchInput.value = "";
      renderGallery();
    });
  }

  /* ── Capability overview anchor links ──────────────────────────────── */
  document.querySelectorAll("[data-skill-category-anchor]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const cat = link.dataset.skillCategoryAnchor;
      state.categories.clear();
      state.depth = "all";
      state.type  = "all";
      state.query = "";
      if (cat !== "all") state.categories.add(cat);
      if (searchInput) searchInput.value = "";
      renderGallery();

      const dir = document.getElementById("skill-directory-section");
      if (dir) {
        const header = document.querySelector(".site-header");
        const hh = header ? header.getBoundingClientRect().height : 80;
        const y = dir.getBoundingClientRect().top + window.scrollY - hh - 24;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }
    });
  });

  /* ── Modal open ────────────────────────────────────────────────────── */
  const openModal = (skillId, triggerEl = null, updateUrl = true) => {
    const skill = (window.SKILLS_DATA || []).find(s => s.id === skillId);
    if (!skill) return;

    previousActiveElement = triggerEl || document.activeElement;
    state.activeSkillId = skillId;
    if (updateUrl) writeURLState();

    modalBody.innerHTML = generateModalMarkup(skill);
    modal.hidden = false;
    modal.removeAttribute("hidden");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    if (modalCloseBtn) modalCloseBtn.focus();
    setupFocusTrap();
  };

  /* ── Modal close ───────────────────────────────────────────────────── */
  const closeModal = (updateUrl = true) => {
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute("hidden", "");
    modal.style.display = "none";
    document.body.style.overflow = "";
    state.activeSkillId = null;
    if (updateUrl) writeURLState();
    if (previousActiveElement?.focus) previousActiveElement.focus();
  };

  /* ── Focus trap ────────────────────────────────────────────────────── */
  const setupFocusTrap = () => {
    const focusables = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last  = focusables[focusables.length - 1];
    const handler = e => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
    };
    modal.addEventListener("keydown", handler, { once: true });
  };

  /* ── Modal event listeners ─────────────────────────────────────────── */
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
  if (modalBackdrop) modalBackdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal && !modal.hidden) closeModal();
  });

  window.addEventListener("popstate", () => {
    readURLState();
    renderGallery();
    if (state.activeSkillId) openModal(state.activeSkillId, null, false);
    else closeModal(false);
  });

  /* ── Modal markup ──────────────────────────────────────────────────── */
  const generateModalMarkup = (skill) => {
    const depthDesc = DEPTH_DESCRIPTIONS[skill.depth] || "";
    const catTags = skill.categories
      .map(c => `<span class="skill-modal__cat-tag">${escapeHtml(c)}</span>`)
      .join("");

    const evidenceRows = skill.evidence.map(ev => {
      const kindLabel = EVIDENCE_KIND_LABELS[ev.kind] || ev.kind;
      return `
        <li class="skill-modal__evidence-item skill-modal__evidence-item--${ev.kind}">
          <span class="skill-modal__evidence-kind">${escapeHtml(kindLabel)}</span>
          <div class="skill-modal__evidence-body">
            <a class="skill-modal__evidence-link" href="${ev.url}">${escapeHtml(ev.label)} →</a>
            <p class="skill-modal__evidence-note">${escapeHtml(ev.note)}</p>
          </div>
        </li>
      `;
    }).join("");

    return `
      <header class="skill-modal__header">
        <div class="skill-modal__identity">
          <p class="skill-modal__meta-line">${escapeHtml(skill.type)}</p>
          <h2 class="skill-modal__name" id="skill-modal-title">${escapeHtml(skill.name)}</h2>
        </div>
        <div class="skill-modal__badges">
          <span class="skill-badge skill-badge--${skill.depth.toLowerCase()}">${skill.depth}</span>
        </div>
      </header>

      <section class="skill-modal__section">
        <h3 class="skill-modal__section-heading">Summary</h3>
        <p class="skill-modal__summary">${escapeHtml(skill.summary)}</p>
      </section>

      <section class="skill-modal__section">
        <h3 class="skill-modal__section-heading">Details</h3>
        <dl class="skill-modal__meta-grid">
          <div class="skill-modal__meta-item">
            <dt>Type</dt>
            <dd>${escapeHtml(skill.type)}</dd>
          </div>
          <div class="skill-modal__meta-item">
            <dt>Last Applied</dt>
            <dd>${skill.lastApplied}</dd>
          </div>
          <div class="skill-modal__meta-item">
            <dt>Evidence Records</dt>
            <dd>${skill.evidence.length}</dd>
          </div>
          <div class="skill-modal__meta-item">
            <dt>Categories</dt>
            <dd><div class="skill-modal__cat-list">${catTags}</div></dd>
          </div>
        </dl>
      </section>

      <section class="skill-modal__section">
        <h3 class="skill-modal__section-heading">Depth — ${skill.depth}</h3>
        <p class="skill-modal__depth-box">${escapeHtml(depthDesc)}</p>
      </section>

      <section class="skill-modal__section">
        <h3 class="skill-modal__section-heading">Evidence</h3>
        <ul class="skill-modal__evidence-list">
          ${evidenceRows}
        </ul>
      </section>
    `;
  };

  /* ── Utility ───────────────────────────────────────────────────────── */
  const escapeHtml = (str) =>
    String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  /* ── Init ──────────────────────────────────────────────────────────── */
  const init = () => {
    readURLState();
    renderGallery();
    if (state.activeSkillId) openModal(state.activeSkillId, null, false);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
