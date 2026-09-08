/**
 * Architecture Case Studies Component
 * Renders high-depth case studies with evaluation metrics, security guardrails, and clone utilities.
 */

export class ProjectsController {
  constructor(containerId = 'projects', i18nManager) {
    this.container = document.getElementById(containerId) || document.getElementById('projects') || document.body;
    this.i18n = i18nManager;
    this.currentFilter = 'all';

    this.cardsContainer = this.container.querySelector('#projects-grid') || document.getElementById('projects-grid');
    this.filterContainer = this.container.querySelector('#projects-filter') || document.getElementById('projects-filter');

    this.init();
  }

  init() {
    this.setupFilters();
    this.render();

    window.addEventListener('languageChanged', () => {
      this.render();
      this.updateFilterButtonsUI();
    });
  }

  setupFilters() {
    const buttons = document.querySelectorAll('#projects-filter .filter-pill, .filter-pill');
    buttons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const filter = btn.getAttribute('data-filter') || 'all';
        if (this.currentFilter === filter) return;

        this.currentFilter = filter;
        this.updateFilterButtonsUI();

        // Brief tactical micro-loader transition
        if (this.cardsContainer) {
          this.cardsContainer.style.opacity = '0.4';
          this.cardsContainer.style.transform = 'scale(0.99)';
          this.cardsContainer.style.transition = 'all 0.18s ease';
        }

        setTimeout(() => {
          this.render();
          if (this.cardsContainer) {
            this.cardsContainer.style.opacity = '1';
            this.cardsContainer.style.transform = 'scale(1)';
          }
        }, 120);
      });
    });
  }

  updateFilterButtonsUI() {
    const buttons = document.querySelectorAll('#projects-filter .filter-pill, .filter-pill');
    buttons.forEach(btn => {
      const filter = btn.getAttribute('data-filter') || 'all';
      if (filter === this.currentFilter) {
        btn.classList.remove('bg-zinc-900/80', 'text-zinc-400', 'border-zinc-800');
        btn.classList.add('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/50');
      } else {
        btn.classList.remove('bg-emerald-500/20', 'text-emerald-400', 'border-emerald-500/50');
        btn.classList.add('bg-zinc-900/80', 'text-zinc-400', 'border-zinc-800');
      }
    });
  }

  render() {
    if (!this.cardsContainer) {
      this.cardsContainer = document.getElementById('projects-grid');
    }
    if (!this.cardsContainer) return;

    const items = this.i18n.t('projects.items');
    if (!Array.isArray(items)) return;

    const filtered = this.currentFilter === 'all' 
      ? items 
      : items.filter(p => p.category === this.currentFilter);

    const clonePromptText = this.i18n.t('projects.clonePrompt') || 'Copy Git Clone';
    const copiedText = this.i18n.t('projects.copied') || 'Copied!';
    const inspectText = this.i18n.t('projects.inspect') || 'Inspect Architecture';

    this.cardsContainer.innerHTML = filtered.map(item => `
      <div class="spotlight-card glass-panel p-5 sm:p-7 flex flex-col justify-between relative group border border-white/10 rounded-2xl transition-all" data-reveal-item>
        <div>
          <!-- Header & Badge -->
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="px-2.5 py-0.5 text-xs font-mono font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              #${(item.category || 'SYSTEM').toUpperCase()}
            </span>
            <a href="${item.repoUrl}" target="_blank" rel="noopener noreferrer" 
               class="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 transition-colors">
              <span>GitHub Source</span>
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <!-- Title & Subtitle -->
          <h3 class="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
            ${item.title}
          </h3>
          <p class="text-xs sm:text-sm font-medium text-cyan-400 mt-1 mb-3">
            ${item.subtitle}
          </p>

          <!-- 01: Engineering Challenge -->
          <div class="mb-3 bg-zinc-950/70 rounded-lg p-3 border border-white/5">
            <div class="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-semibold mb-1 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Problem & Context
            </div>
            <p class="text-xs text-zinc-300 leading-relaxed">
              ${item.challenge}
            </p>
          </div>

          <!-- 02: Architectural Solution & Flow -->
          <div class="mb-3 bg-zinc-950/70 rounded-lg p-3 border border-white/5">
            <div class="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Architecture & Pipeline
            </div>
            <p class="text-xs text-zinc-300 leading-relaxed mb-2.5">
              ${item.solution}
            </p>
            
            <div class="text-[9px] font-mono uppercase text-zinc-500 mb-1">System Pipeline Flow:</div>
            <div class="ascii-flow text-[10px] sm:text-[11px] p-2 overflow-x-auto rounded border border-zinc-800/80 text-sky-300 leading-normal font-mono">
              ${item.architectureFlow}
            </div>
          </div>

          <!-- 03: Evaluation & Security Specs -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            <div class="bg-zinc-950/50 rounded-lg p-2.5 border border-white/5">
              <div class="text-[9px] font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-0.5">Evaluation & Metrics:</div>
              <div class="text-[11px] text-zinc-300 font-mono">${item.evaluation || 'Grounding: 96%+ | Latency: P99 < 500ms'}</div>
            </div>
            <div class="bg-zinc-950/50 rounded-lg p-2.5 border border-white/5">
              <div class="text-[9px] font-mono uppercase tracking-wider text-purple-400 font-semibold mb-0.5">Security & Guardrails:</div>
              <div class="text-[11px] text-zinc-300 font-mono">${item.security || 'Data Isolation & Tool Authorization'}</div>
            </div>
          </div>

          <!-- Tech Stack Pills -->
          <div class="flex flex-wrap gap-1.5 mb-5">
            ${item.stack.map(tech => `
              <span class="px-2 py-0.5 text-[11px] font-mono bg-zinc-900 text-zinc-300 rounded border border-zinc-800">
                ${tech}
              </span>
            `).join('')}
          </div>
        </div>

        <!-- Action Footer -->
        <div class="pt-3.5 border-t border-white/5 flex flex-wrap items-center justify-between gap-2.5">
          <button class="copy-clone-btn text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60 flex items-center gap-1.5 transition-all cursor-pointer"
                  data-cmd="${item.cloneCmd}">
            <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            <span class="btn-text text-[11px] sm:text-xs">${clonePromptText}</span>
          </button>

          <a href="${item.repoUrl}" target="_blank" rel="noopener noreferrer"
             class="text-xs font-semibold px-3.5 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 transition-all">
            <span>${inspectText}</span>
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    `).join('');

    // Attach copy button events with tactile micro-spinner feedback
    this.cardsContainer.querySelectorAll('.copy-clone-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const cmd = btn.getAttribute('data-cmd');
        const textSpan = btn.querySelector('.btn-text');
        
        // 1. Show micro-spinner during transaction
        const origHtml = btn.innerHTML;
        btn.innerHTML = `
          <span class="inline-micro-spinner mr-1"></span>
          <span class="text-[11px] font-mono text-cyan-300">SYNCING...</span>
        `;
        btn.disabled = true;

        try {
          await navigator.clipboard.writeText(cmd);
          
          // 2. Show verified state
          setTimeout(() => {
            btn.innerHTML = `
              <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-[11px] font-mono text-emerald-400 font-bold">${copiedText}</span>
            `;
            btn.classList.add('border-emerald-500/80', 'bg-emerald-500/10');
            
            setTimeout(() => {
              btn.innerHTML = origHtml;
              btn.disabled = false;
              btn.classList.remove('border-emerald-500/80', 'bg-emerald-500/10');
            }, 2000);
          }, 220);
        } catch (err) {
          console.error('Clipboard copy failed:', err);
          btn.innerHTML = origHtml;
          btn.disabled = false;
        }
      });
    });
  }
}
