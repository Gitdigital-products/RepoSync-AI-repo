// RepoSync AI front-end logic
// 1. Config-based project cards
// 2. Potential hook for GitHub API integration later

(function () {
  const projectCardGrid = document.getElementById("projectCardGrid");

  /** Simple config object you can reuse or externalize */
  const projects = [
    {
      id: "reposync-ai-core",
      name: "RepoSync AI Core",
      description:
        "The core synchronization engine that manages file templates, repo targeting, and execution safety.",
      repoUrl: "https://github.com/Gitdigital-products/reposync-ai",
      status: "active",
      tags: ["engine", "sync", "governance"],
    },
    {
      id: "config-hub",
      name: "Config Hub Integration",
      description:
        "Central config definitions for governance, CI/CD workflows, and documentation baselines used by RepoSync AI.",
      repoUrl: "https://github.com/Gitdigital-products/config-hub",
      status: "experimental",
      tags: ["config", "templates", "org-wide"],
    },
    {
      id: "org-observer",
      name: "Org Observer",
      description:
        "Read-only scanner for your GitDigital Products org that detects drift from defined baselines.",
      repoUrl: "https://github.com/Gitdigital-products/org-observer",
      status: "planned",
      tags: ["observability", "drift", "reports"],
    },
  ];

  function statusToPill(status) {
    const lower = (status || "").toLowerCase();
    let label;
    let modifierClass = "";
    switch (lower) {
      case "active":
        label = "Active";
        modifierClass = "";
        break;
      case "experimental":
        label = "Experimental";
        modifierClass = "rsa-status-dot--experimental";
        break;
      case "blocked":
        label = "Blocked";
        modifierClass = "rsa-status-dot--blocked";
        break;
      case "planned":
        label = "Planned";
        modifierClass = "rsa-status-dot--experimental";
        break;
      default:
        label = status || "Unknown";
    }
    return { label, modifierClass };
  }

  function createProjectCard(project) {
    const card = document.createElement("article");
    card.className = "gdp-card";

    const titleRow = document.createElement("div");
    titleRow.style.display = "flex";
    titleRow.style.justifyContent = "space-between";
    titleRow.style.alignItems = "center";
    titleRow.style.gap = "0.5rem";

    const titleEl = document.createElement("h3");
    titleEl.className = "gdp-card-title";
    titleEl.textContent = project.name;

    const status = statusToPill(project.status);
    const statusPill = document.createElement("span");
    statusPill.className = "rsa-status-pill";
    statusPill.innerHTML = `
      <span class="rsa-status-dot ${status.modifierClass}"></span>
      <span>${status.label}</span>
    `;

    titleRow.appendChild(titleEl);
    titleRow.appendChild(statusPill);

    const body = document.createElement("p");
    body.className = "gdp-card-body";
    body.textContent = project.description;

    const tagRow = document.createElement("div");
    tagRow.className = "rsa-tag-row";

    (project.tags || []).forEach((tag, index) => {
      const span = document.createElement("span");
      span.className = "rsa-tag" + (index === 0 ? " rsa-tag-primary" : "");
      span.textContent = tag;
      tagRow.appendChild(span);
    });

    const linkRow = document.createElement("div");
    linkRow.style.marginTop = "0.75rem";

    if (project.repoUrl) {
      const link = document.createElement("a");
      link.href = project.repoUrl;
      link.target = "_blank";
      link.className = "gdp-button gdp-button-secondary";
      link.textContent = "Open repo";
      linkRow.appendChild(link);
    }

    card.appendChild(titleRow);
    card.appendChild(body);
    if (project.tags && project.tags.length) {
      card.appendChild(tagRow);
    }
    card.appendChild(linkRow);

    return card;
  }

  function renderProjectCards() {
    if (!projectCardGrid) return;
    projectCardGrid.innerHTML = "";
    projects.forEach((project) => {
      const card = createProjectCard(project);
      projectCardGrid.appendChild(card);
    });
  }

  renderProjectCards();

  // Expose a tiny hook for future dynamic updates
  window.RepoSyncAI = window.RepoSyncAI || {};
  window.RepoSyncAI.renderProjectCards = renderProjectCards;
  window.RepoSyncAI.projects = projects;
})();