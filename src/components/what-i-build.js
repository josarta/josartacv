/**
 * Content Sections Controller
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

  renderHeroTechGroups() {
    if (!this.heroTechContainer) return;
    const groups = this.i18n.t('hero.techGroups');
    if (!Array.isArray(groups)) return;

    this.heroTechContainer.innerHTML = groups.map(g => `
      <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800/80 font-mono text-xs shadow-sm">
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
      <div class="flex flex-col p-3 rounded-xl bg-zinc-950/80 border border-white/5 font-mono">
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
      <div class="spotlight-card glass-panel p-5 sm:p-6 flex flex-col justify-between border border-white/10" data-reveal-item>
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              ${p.badge}
            </span>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
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
      <span class="px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
        ${role}
      </span>
    `).join('');
  }
}
