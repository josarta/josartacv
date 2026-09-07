/**
 * What I Build & Principles Controller
 * Renders core pillars, production lifecycle pipeline, and engineering principles.
 */

export class ContentSectionsController {
  constructor(i18nManager) {
    this.i18n = i18nManager;
    this.pillarsContainer = document.getElementById('pillars-grid');
    this.principlesContainer = document.getElementById('principles-grid');
    this.pipelineContainer = document.getElementById('pipeline-grid');
    this.openToContainer = document.getElementById('opento-grid');

    this.init();
  }

  init() {
    this.render();
    window.addEventListener('languageChanged', () => {
      this.render();
    });
  }

  render() {
    this.renderPillars();
    this.renderPipeline();
    this.renderPrinciples();
    this.renderOpenTo();
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

  renderPipeline() {
    if (!this.pipelineContainer) return;
    const steps = this.i18n.t('pipeline.steps');
    if (!Array.isArray(steps)) return;

    this.pipelineContainer.innerHTML = steps.map((s, idx) => `
      <div class="relative flex flex-col items-center text-center p-3.5 sm:p-4 rounded-xl bg-zinc-950/70 border border-white/5 group hover:border-emerald-500/40 transition-all">
        <div class="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center mb-2">
          ${s.step}
        </div>
        <div class="text-xs font-bold text-white font-mono tracking-tight mb-1">${s.title}</div>
        <div class="text-[11px] text-zinc-400 leading-snug">${s.desc}</div>
      </div>
    `).join('');
  }

  renderPrinciples() {
    if (!this.principlesContainer) return;
    const items = this.i18n.t('principles.items');
    if (!Array.isArray(items)) return;

    this.principlesContainer.innerHTML = items.map(item => `
      <div class="spotlight-card glass-panel p-5 sm:p-6 border border-white/10 flex flex-col justify-between" data-reveal-item>
        <div class="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold mb-2">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>PRINCIPLE ${item.num}</span>
        </div>
        <h3 class="text-base sm:text-lg font-bold text-white mb-2">
          ${item.title}
        </h3>
        <p class="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          ${item.text}
        </p>
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

