/* RepoSync AI specific styling on top of the GitDigital Products design system */

.gdp-section-hero {
  position: relative;
}

.gdp-section-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 0% 0%, rgba(88, 166, 255, 0.14), transparent 55%),
              radial-gradient(circle at 100% 0%, rgba(168, 85, 247, 0.12), transparent 55%);
  opacity: 0.9;
  pointer-events: none;
}

.gdp-main {
  position: relative;
  z-index: 1;
}

/* Project card tags */

.rsa-tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  margin-top: 0.5rem;
}

.rsa-tag {
  font-size: 0.7rem;
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
  border: 1px solid var(--gdp-color-border);
  color: var(--gdp-color-text-muted);
}

.rsa-tag-primary {
  border-color: rgba(88, 166, 255, 0.6);
  color: var(--gdp-color-accent);
}

/* Status pill */

.rsa-status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: var(--gdp-color-text-muted);
}

.rsa-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #22c55e;
}

.rsa-status-dot--experimental {
  background: #eab308;
}

.rsa-status-dot--blocked {
  background: #f97373;
}