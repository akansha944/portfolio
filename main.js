(function () {
  document.documentElement.classList.add("js");

  const fromWindow = (key) => window[key];
  const PROFILE = fromWindow("PROFILE");
  const RESUME = fromWindow("RESUME");
  const FACTS = fromWindow("FACTS");
  const STATS = fromWindow("STATS");
  const EXPERIENCE = fromWindow("EXPERIENCE");
  const EDUCATION = fromWindow("EDUCATION");
  const LEADERSHIP = fromWindow("LEADERSHIP");
  const SKILLS = fromWindow("SKILLS");
  const PROJECTS = fromWindow("PROJECTS");
  const SOCIAL = fromWindow("SOCIAL");

  if (!PROFILE || !SKILLS || !PROJECTS) {
    console.error(
      "Portfolio data not loaded. Check that data.js loads before main.js."
    );
    return;
  }

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const profileMap = {
    name: PROFILE.name,
    initials: PROFILE.initials,
    "role-short": PROFILE.roleShort,
    tagline: PROFILE.tagline,
    headline: PROFILE.headline,
    availability: PROFILE.availability,
    email: PROFILE.email,
    "name-footer": PROFILE.name,
    year: String(PROFILE.year),
    "about-1": PROFILE.about1,
    "about-2": PROFILE.about2,
  };


  function getResumePdfUrl() {
    return typeof RESUME !== "undefined" && RESUME.pdf ? RESUME.pdf : "resume.pdf";
  }

  function applyResumeLinks() {
    const pdf = getResumePdfUrl();
    const name =
      typeof RESUME !== "undefined" && RESUME.downloadName
        ? RESUME.downloadName
        : "resume.pdf";

    $$("[data-resume]").forEach((el) => {
      const key = el.getAttribute("data-resume");
      if (key === "summary") {
        el.textContent =
          typeof RESUME !== "undefined" && RESUME.summary ? RESUME.summary : "";
        if (!el.textContent) el.style.display = "none";
        return;
      }
      if (key === "updated") {
        el.textContent =
          typeof RESUME !== "undefined" && RESUME.lastUpdated
            ? RESUME.lastUpdated
            : "";
        return;
      }
      if (key === "pdf-link" || key === "view-link" || key === "hero-download") {
        el.href = pdf;
        if (key === "pdf-link" || key === "hero-download") {
          el.setAttribute("download", name);
        } else {
          el.removeAttribute("download");
        }
      }
    });
    checkResumePdf(pdf);
  }

  function checkResumePdf(pdf) {
    const missing = $("[data-resume=missing]");
    if (!missing) return;
    fetch(pdf, { method: "HEAD" })
      .then((r) => {
        const ok = r.ok;
        missing.classList.toggle("hidden", ok);
      })
      .catch(() => missing.classList.remove("hidden"));
  }

  function renderExperience() {
    const ol = $("[data-experience]");
    if (!ol || typeof EXPERIENCE === "undefined") return;
    ol.innerHTML = EXPERIENCE.map(
      (job) => `
      <li class="timeline-item reveal" id="${escapeAttr(job.id)}">
        <div class="timeline-marker" aria-hidden="true"></div>
        <div class="timeline-body">
          <header class="timeline-header">
            <h4 class="timeline-role">${escapeHtml(job.role)}</h4>
            <p class="timeline-meta">
              <span>${escapeHtml(job.company)}</span>
              ${job.location ? `<span> · ${escapeHtml(job.location)}</span>` : ""}
            </p>
            <p class="timeline-period">${escapeHtml(job.period)}</p>
          </header>
          <ul class="timeline-bullets">
            ${job.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}
          </ul>
        </div>
      </li>`
    ).join("");
  }

  function renderEducation() {
    const ul = $("[data-education]");
    if (!ul || typeof EDUCATION === "undefined") return;
    ul.innerHTML = EDUCATION.map(
      (ed) => `
      <li class="education-item reveal">
        <h4 class="education-degree">${escapeHtml(ed.degree)}</h4>
        <p class="education-school">${escapeHtml(ed.school)}</p>
        <p class="education-period">${escapeHtml(ed.period)}</p>
        ${ed.details ? `<p class="education-details">${escapeHtml(ed.details)}</p>` : ""}
      </li>`
    ).join("");
  }

  function renderLeadership() {
    const ul = $("[data-leadership]");
    if (!ul || typeof LEADERSHIP === "undefined") return;
    ul.innerHTML = LEADERSHIP.map(
      (item) => `
      <li class="education-item reveal">
        <h4 class="education-degree">${escapeHtml(item.role)}</h4>
        <p class="education-school">${escapeHtml(item.org)}</p>
        <p class="education-period">${escapeHtml(item.period)}</p>
        <p class="education-details">${escapeHtml(item.detail)}</p>
      </li>`
    ).join("");
  }

  function applyProfile() {
    $$("[data-profile]").forEach((el) => {
      const key = el.getAttribute("data-profile");

      if (key === "email") {
        el.href = `mailto:${PROFILE.email}`;
        el.textContent = PROFILE.email;
        return;
      }
      const val = profileMap[key];
      if (val != null) el.textContent = val;
    });
    document.title = `${PROFILE.name} - Portfolio`;
    const ogTitle = $('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = `${PROFILE.name}  Portfolio`;
  }

  function renderStats() {
    const dl = $(".hero-stats");
    if (!dl) return;
    dl.innerHTML = STATS.map(
      (s) =>
        `<div><dt>${escapeHtml(s.value)}</dt><dd>${escapeHtml(s.label)}</dd></div>`
    ).join("");
  }

  function renderFacts() {
    const ul = $("[data-facts]");
    if (!ul) return;
    ul.innerHTML = FACTS.map(
      (f) =>
        `<li><span>${escapeHtml(f.label)}</span><span>${escapeHtml(f.value)}</span></li>`
    ).join("");
  }

  function renderSkills() {
    const cloud = $("[data-skills]");
    const placeholder = $(".skill-detail-placeholder");
    const content = $(".skill-detail-content");
    const titleEl = $(".skill-detail-title");
    const textEl = $(".skill-detail-text");
    if (!cloud) return;

    cloud.innerHTML = SKILLS.map(
      (s) =>
        `<button type="button" class="skill-chip" role="listitem" data-skill="${s.id}" data-level="${s.level}" aria-pressed="false">${escapeHtml(s.name)}</button>`
    ).join("");

    function selectSkill(skill) {
      $$(".skill-chip").forEach((c) => {
        const on = c.dataset.skill === skill.id;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", on ? "true" : "false");
      });
      placeholder.classList.add("hidden");
      content.classList.remove("hidden");
      titleEl.textContent = skill.name;
      textEl.textContent = skill.proof;
    }

    $$(".skill-chip", cloud).forEach((chip) => {
      chip.addEventListener("click", () => {
        const skill = SKILLS.find((s) => s.id === chip.dataset.skill);
        if (skill) selectSkill(skill);
      });
    });

    if (SKILLS[0]) selectSkill(SKILLS[0]);
  }

  function renderProjects() {
    const bento = $("[data-projects]");
    if (!bento) return;

    bento.innerHTML = PROJECTS.map((p) => {
      const sizeClass =
        p.size === "large"
          ? "project-card--large"
          : p.size === "small"
            ? "project-card--small"
            : "project-card--medium";
      const links = [];
      if (p.links?.live)
        links.push(
          `<a href="${escapeAttr(p.links.live)}" target="_blank" rel="noopener">Live demo</a>`
        );
      if (p.links?.code)
        links.push(
          `<a href="${escapeAttr(p.links.code)}" target="_blank" rel="noopener">Source</a>`
        );

      return `
        <article class="project-card reveal ${sizeClass}" id="${escapeAttr(p.id)}" data-accent="${escapeAttr(p.accent)}">
          <span class="project-tag">${escapeHtml(p.tag)}</span>
          <h3>${escapeHtml(p.title)}</h3>
          <p class="project-meta"><strong>Problem:</strong> ${escapeHtml(p.problem)}</p>
          <p class="project-meta">${escapeHtml(p.role)}</p>
          <p class="project-impact"><strong>Impact:</strong> ${escapeHtml(p.impact)}</p>
          <ul class="project-stack">${p.stack.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>
          ${links.length ? `<div class="project-links">${links.join("")}</div>` : ""}
        </article>
      `;
    }).join("");
  }

  function renderSocial() {
    const ul = $("[data-social]");
    if (!ul) return;
    ul.innerHTML = SOCIAL.map(
      (s) =>
        `<li><a href="${escapeAttr(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.label)}</a></li>`
    ).join("");
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/'/g, "&#39;");
  }

  const THEME_KEY = "portfolio-theme";

  function getPreferredTheme() {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }

  $(".theme-toggle")?.addEventListener("click", () => {
    const next =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "light"
        : "dark";
    setTheme(next);
  });

  setTheme(getPreferredTheme());

  const sectionIds = ["hero", "about", "skills", "projects", "contact"];

  function scrollToSection(id) {
    const el = id === "hero" ? $("#hero") : document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  $$("[data-nav]").forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("data-nav");
      if (!id) return;
      e.preventDefault();
      scrollToSection(id);
    });
  });

  const navLinks = $$(".nav-desktop a");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((a) => {
          a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  function observeReveals() {
    $$(".reveal, .section-header, .about-grid, .skills-layout, .contact-card").forEach(
      (el) => {
        el.classList.add("reveal");
        revealObserver.observe(el);
      }
    );
  }

  const dialog = $(".cmd-palette");
  const cmdInput = $(".cmd-input");
  const cmdResults = $(".cmd-results");
  let cmdItems = [];
  let selectedIndex = 0;

  function buildCmdItems() {
    const sections = [
      { label: "Home", type: "Section", action: () => scrollToSection("hero") },
      { label: "About", type: "Section", action: () => scrollToSection("about") },
      { label: "Skills", type: "Section", action: () => scrollToSection("skills") },
      { label: "Projects", type: "Section", action: () => scrollToSection("projects") },
      { label: "Contact", type: "Section", action: () => scrollToSection("contact") },
      {
        label: "Email me",
        type: "Action",
        action: () => {
          window.location.href = `mailto:${PROFILE.email}`;
        },
      },
      {
        label: "Toggle theme",
        type: "Action",
        action: () => {
          const t =
            document.documentElement.getAttribute("data-theme") === "dark"
              ? "light"
              : "dark";
          setTheme(t);
        },
      },
    ];
    const projects = PROJECTS.map((p) => ({
      label: p.title,
      type: "Project",
      action: () => {
        scrollToSection("projects");
        requestAnimationFrame(() => {
          document.getElementById(p.id)?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        });
      },
    }));
    cmdItems = [...sections, ...projects];
  }

  function openCmd() {
    if (!dialog) return;
    dialog.showModal();
    cmdInput.value = "";
    selectedIndex = 0;
    renderCmdResults("");
    cmdInput.focus();
  }

  function closeCmd() {
    dialog?.close();
  }

  function renderCmdResults(query) {
    const q = query.trim().toLowerCase();
    const filtered = cmdItems.filter((item) =>
      item.label.toLowerCase().includes(q)
    );
    selectedIndex = Math.min(selectedIndex, Math.max(0, filtered.length - 1));

    cmdResults.innerHTML = filtered
      .map((item, i) => {
        const sel = i === selectedIndex ? " is-selected" : "";
        return `<li><button type="button" class="${sel.trim()}" data-cmd-index="${i}">${escapeHtml(item.label)}<span class="cmd-type">${escapeHtml(item.type)}</span></button></li>`;
      })
      .join("");

    cmdResults._filtered = filtered;
  }

  function runCmd(index) {
    const filtered = cmdResults._filtered || cmdItems;
    const item = filtered[index];
    if (item) {
      closeCmd();
      item.action();
    }
  }

  $$(".cmd-trigger").forEach((btn) =>
    btn.addEventListener("click", openCmd)
  );

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      openCmd();
    }
    if (!dialog?.open) return;
    if (e.key === "Escape") {
      closeCmd();
      return;
    }
    const filtered = cmdResults._filtered || [];
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, filtered.length - 1);
      renderCmdResults(cmdInput.value);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, 0);
      renderCmdResults(cmdInput.value);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      runCmd(selectedIndex);
    }
  });

  cmdInput?.addEventListener("input", () => {
    selectedIndex = 0;
    renderCmdResults(cmdInput.value);
  });

  cmdResults?.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-cmd-index]");
    if (btn) runCmd(Number(btn.dataset.cmdIndex));
  });

  dialog?.addEventListener("click", (e) => {
    if (e.target === dialog) closeCmd();
  });

  applyProfile();
  applyResumeLinks();
  renderExperience();
  renderEducation();
  renderLeadership();
  renderStats();
  renderFacts();
  renderSkills();
  renderProjects();
  renderSocial();
  buildCmdItems();
  observeReveals();
})();
