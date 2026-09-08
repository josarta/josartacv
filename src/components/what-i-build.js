/**
 * Content Sections Controller with Rich High-Tech Vector Icons
 * Renders core pillars, open-to roles, and dynamic hero tech groups & metrics.
 */

export class ContentSectionsController {
  constructor(i18nManager) {
    this.i18n = i18nManager;
    this.pillarsContainer = document.getElementById('pillars-grid');
    this.openToContainer = document.getElementById('opento-grid');
    this.heroTechContainer = document.getElementById('hero-tech-groups');
    this.heroMetricsContainer = document.getElementById('hero-metrics-bar');

    this.init();
  }

  init() {
    this.render();
    window.addEventListener('languageChanged', () => {
      this.render();
    });
  }

  render() {
    this.renderHeroTechGroups();
    this.renderHeroMetrics();
    this.renderPillars();
    this.renderOpenTo();
  }

  getCategoryIcon(category) {
    if (category.includes('AI')) {
      return `
        <svg class="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      `;
    }
    if (category.includes('Eng')) {
      return `
        <svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      `;
    }
    return `
      <svg class="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    `;
  }

  getMetricIcon(val) {
    if (val.includes('15+')) {
      return `
        <svg class="w-4 h-4 text-emerald-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      `;
    }
    if (val.includes('AI')) {
      return `
        <svg class="w-4 h-4 text-cyan-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      `;
    }
    if (val.includes('Production')) {
      return `
        <svg class="w-4 h-4 text-purple-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      `;
    }
    return `
      <svg class="w-4 h-4 text-teal-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    `;
  }

  getPillarIcon(id) {
    switch (id) {
      case 'agents':
        return `
          <svg class="w-5 h-5 text-cyan-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        `;
      case 'platforms':
        return `
          <svg class="w-5 h-5 text-purple-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        `;
      case 'automation':
        return `
          <svg class="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        `;
      case 'sre':
      default:
        return `
          <svg class="w-5 h-5 text-teal-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        `;
    }
  }

  renderHeroTechGroups() {
    if (!this.heroTechContainer) return;
    const groups = this.i18n.t('hero.techGroups');
    if (!Array.isArray(groups)) return;

    this.heroTechContainer.innerHTML = groups.map(g => `
      <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800/80 font-mono text-xs shadow-sm hover:border-emerald-500/40 transition-colors">
        ${this.getCategoryIcon(g.category)}
        <span class="text-emerald-400 font-bold tracking-tight">${g.category}:</span>
        <span class="text-zinc-300">${g.items}</span>
      </div>
    `).join('');
  }

  renderHeroMetrics() {
    if (!this.heroMetricsContainer) return;
    const metrics = this.i18n.t('hero.metrics');
    if (!Array.isArray(metrics)) return;

    this.heroMetricsContainer.innerHTML = metrics.map(m => `
      <div class="flex flex-col p-3 rounded-xl bg-zinc-950/80 border border-white/5 font-mono group hover:border-emerald-500/30 transition-colors">
        ${this.getMetricIcon(m.value)}
        <span class="text-xl sm:text-2xl font-extrabold text-emerald-400 tracking-tight">${m.value}</span>
        <span class="text-[11px] text-zinc-400 uppercase tracking-wider mt-0.5">${m.label}</span>
      </div>
    `).join('');
  }

  renderPillars() {
    if (!this.pillarsContainer) return;
    const pillars = this.i18n.t('whatIBuild.pillars');
    if (!Array.isArray(pillars)) return;

    this.pillarsContainer.innerHTML = pillars.map(p => `
      <div class="spotlight-card glass-panel p-5 sm:p-6 flex flex-col justify-between border border-white/10 group hover:border-emerald-500/30 transition-all" data-reveal-item>
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <div class="flex items-center gap-2">
              ${this.getPillarIcon(p.id)}
              <span class="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ${p.badge}
              </span>
            </div>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-white tracking-tight mb-2 group-hover:text-emerald-300 transition-colors">
            ${p.title}
          </h3>
          <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
            ${p.description}
          </p>
        </div>
        <div class="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
          ${p.pills.map(pill => `
            <span class="px-2 py-0.5 text-[11px] font-mono bg-zinc-900 text-zinc-300 rounded border border-zinc-800">
              ${pill}
            </span>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  renderOpenTo() {
    if (!this.openToContainer) return;
    const roles = this.i18n.t('openTo.roles');
    if (!Array.isArray(roles)) return;

    this.openToContainer.innerHTML = roles.map(role => `
      <span class="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        <span>${role}</span>
      </span>
    `).join('');
  }
}
