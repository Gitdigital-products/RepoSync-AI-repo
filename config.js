/**
 * GitDigital Products – Global Front-End Config
 * Reusable across all GDP apps (RepoSync AI, Config Hub, Org Observer, etc.)
 *
 * This file centralizes:
 * - Org metadata
 * - App metadata
 * - Project registry
 * - Feature flags
 * - API endpoints (future GitHub integration)
 * - Shared tokens for UI + JS
 */

window.GDP_CONFIG = {
  organization: {
    name: "GitDigital Products",
    githubOrg: "Gitdigital-products",
    website: "https://github.com/Gitdigital-products",
  },

  app: {
    id: "reposync-ai",
    name: "RepoSync AI",
    version: "0.1.0",
    docsPath: "/docs/",
    repoUrl: "https://github.com/Gitdigital-products/reposync-ai",
  },

  ui: {
    theme: {
      default: "gdp-theme-dark",
      allowToggle: true,
    },
    layout: {
      maxWidth: 1080,
      enableAnimations: true,
    },
  },

  features: {
    projectCards: true,
    githubApiIntegration: false, // set to true when you add API tokens
    telemetry: false,
    experimental: {
      dynamicDocsNav: false,
      liveOrgStatus: false,
    },
  },

  /**
   * Project registry for auto-generated cards
   * This is consumed by reposync-ai.js
   */
  projects: [
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
  ],

  /**
   * Future GitHub API integration
   * (RepoSync AI can fetch stars, last updated, languages, etc.)
   */
  githubApi: {
    enabled: false,
    baseUrl: "https://api.github.com",
    endpoints: {
      repo: (org, repo) => `https://api.github.com/repos/${org}/${repo}`,
      orgRepos: (org) => `https://api.github.com/orgs/${org}/repos`,
    },
    auth: {
      useToken: false,
      token: null, // you will inject this securely later
    },
  },

  /**
   * Utility: global logging toggle
   */
  debug: {
    enabled: true,
    log: (...args) => {
      if (window.GDP_CONFIG.debug.enabled) {
        console.log("[GDP]", ...args);
      }
    },
  },
};