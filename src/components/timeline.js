/**
 * Systems Timeline Controller
 * Dynamic rendering of career progression and reliability leadership.
 */

export class TimelineController {
  constructor(containerId, i18nManager) {
    this.container = document.getElementById(containerId);
    this.i18n = i18nManager;
    if (!this.container) return;

    this.init();
  }

  init() {
    this.render();
    window.addEventListener('languageChanged', () => {
      this.render();
    });
  }

  render() {
    const roles = this.i18n.t('timeline.roles');
    if (!Array.isArray(roles) || !this.container) return;

    this.container.innerHTML = roles.map((r, index) => `
      <div class="relative pl-8 sm:pl-10 pb-10 border-l border-zinc-800 last:border-0 last:pb-0 group">
        <!-- Telemetry Node Dot -->
        <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-emerald-400 flex items-center justify-center group-hover:scale-125 group-hover:border-cyan-400 transition-all duration-300">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 group-hover:bg-cyan-400"></span>
        </div>

        <!-- Content Card -->
        <div class="glass-panel p-5 sm:p-6 rounded-2xl border border-white/5 group-hover:border-white/15 transition-all">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span class="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              ${r.period}
            </span>
            <span class="text-xs font-mono text-zinc-500 flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              ${r.location}
            </span>
          </div>

          <h4 class="text-lg sm:text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
            ${r.role}
          </h4>
          <div class="text-sm font-semibold text-cyan-400 mb-1">
            ${r.company} <span class="text-zinc-500 font-normal">| ${r.domain}</span>
          </div>

          <ul class="mt-3 space-y-2 text-xs sm:text-sm text-zinc-300">
            ${r.highlights.map(h => `
              <li class="flex items-start gap-2">
                <span class="text-emerald-400 mt-1 font-bold">›</span>
                <span class="leading-relaxed">${h}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    `).join('');
  }
}

