/**
 * Recruiter Fast-Track Modal Controller
 * Executive summary, printable CV mode, and one-click recruiter actions.
 */

export class RecruiterModalController {
  constructor(i18nManager) {
    this.i18n = i18nManager;
    this.overlay = document.getElementById('recruiter-modal-overlay');
    this.modal = document.getElementById('recruiter-modal');
    this.openBtns = document.querySelectorAll('.open-recruiter-modal-btn');
    this.closeBtn = document.getElementById('close-recruiter-modal-btn');
    this.printBtn = document.getElementById('print-cv-btn');
    this.copyEmailBtn = document.getElementById('copy-email-btn');

    this.init();
  }

  init() {
    this.openBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.open();
      });
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    if (this.overlay) {
      this.overlay.addEventListener('click', (e) => {
        if (e.target === this.overlay) {
          this.close();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.overlay.classList.contains('hidden')) {
        this.close();
      }
    });

    if (this.printBtn) {
      this.printBtn.addEventListener('click', () => {
        window.print();
      });
    }

    if (this.copyEmailBtn) {
      this.copyEmailBtn.addEventListener('click', async () => {
        const email = 'josarta@gmail.com';
        const orig = this.copyEmailBtn.innerHTML;
        this.copyEmailBtn.innerHTML = `
          <span class="inline-micro-spinner mr-1"></span>
          <span class="font-mono text-cyan-300">COPYING...</span>
        `;
        this.copyEmailBtn.disabled = true;

        try {
          await navigator.clipboard.writeText(email);
          setTimeout(() => {
            this.copyEmailBtn.innerHTML = `
              <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span class="text-emerald-400 font-bold">Copied josarta@gmail.com!</span>
            `;
            setTimeout(() => {
              this.copyEmailBtn.innerHTML = orig;
              this.copyEmailBtn.disabled = false;
            }, 2500);
          }, 200);
        } catch (err) {
          console.error(err);
          this.copyEmailBtn.innerHTML = orig;
          this.copyEmailBtn.disabled = false;
        }
      });
    }

    window.addEventListener('languageChanged', () => {
      if (!this.overlay.classList.contains('hidden')) {
        this.renderModalContent();
      }
    });
  }

  open() {
    if (!this.overlay) return;
    this.renderModalContent();
    this.overlay.classList.remove('hidden');
    this.overlay.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  close() {
    if (!this.overlay) return;
    this.overlay.classList.add('hidden');
    this.overlay.classList.remove('flex');
    document.body.style.overflow = '';
  }

  renderModalContent() {
    const data = this.i18n.t('recruiter.modal');
    if (!data) return;

    const modalBody = document.getElementById('recruiter-modal-content');
    if (!modalBody) return;

    modalBody.innerHTML = `
      <!-- Header -->
      <div class="border-b border-white/10 pb-5 mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <img src="assets/profile.jpg" alt="José Luis Sarta" class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-emerald-500/40 shadow-lg shrink-0" />
        <div>
          <div class="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
            <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            CONFIDENTIAL EXECUTIVE TECHNICAL PROFILE
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-white tracking-tight">${data.title}</h2>
          <p class="text-xs sm:text-sm font-medium text-cyan-400 mt-0.5">${data.subtitle}</p>
          <p class="text-xs text-zinc-300 mt-2 leading-relaxed">${data.summary}</p>
        </div>
      </div>

      <!-- Key Metrics Strip -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        ${data.metrics.map(m => `
          <div class="bg-zinc-900/80 rounded-xl p-3 border border-white/5 text-center">
            <div class="text-xl font-extrabold text-emerald-400 font-mono">${m.value}</div>
            <div class="text-[11px] text-zinc-400 uppercase tracking-tight mt-0.5">${m.label}</div>
          </div>
        `).join('')}
      </div>

      <!-- Skills Matrix -->
      <div class="mb-6 bg-zinc-950/70 rounded-xl p-4 border border-white/5">
        <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3">Core Competency Matrix</h4>
        <div class="space-y-2.5 text-xs">
          <div>
            <span class="text-cyan-400 font-semibold font-mono">Artificial Intelligence:</span>
            <span class="text-zinc-300 ml-1.5">${data.skillsMatrix.ai}</span>
          </div>
          <div>
            <span class="text-emerald-400 font-semibold font-mono">Systems Reliability & Backend:</span>
            <span class="text-zinc-300 ml-1.5">${data.skillsMatrix.systems}</span>
          </div>
          <div>
            <span class="text-purple-400 font-semibold font-mono">Control Engineering & Dynamics:</span>
            <span class="text-zinc-300 ml-1.5">${data.skillsMatrix.control}</span>
          </div>
        </div>
      </div>

      <!-- Academic Pedigree -->
      <div class="mb-6">
        <h4 class="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-3">Academic Degrees & Specializations</h4>
        <div class="space-y-3">
          ${data.education.map(edu => `
            <div class="bg-zinc-900/50 rounded-xl p-3.5 border border-white/5">
              <div class="flex items-center justify-between gap-2">
                <span class="text-sm font-bold text-white">${edu.degree}</span>
                <span class="text-xs font-mono text-emerald-400">${edu.period}</span>
              </div>
              <div class="text-xs text-cyan-400 font-medium">${edu.institution}</div>
              <div class="text-[11px] text-zinc-400 mt-1">${edu.focus}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Direct Contact Bar -->
      <div class="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div class="text-xs font-mono text-emerald-400 font-semibold">Direct Communication Channel:</div>
          <div class="text-xs text-zinc-300 mt-0.5">
            Email: <span class="text-white font-mono font-medium">${data.directContact.email}</span> | Phone: <span class="text-white font-mono">${data.directContact.phone}</span>
          </div>
          <div class="text-[11px] text-zinc-400 mt-0.5">${data.directContact.location}</div>
        </div>
        <div class="flex items-center gap-2">
          <a href="mailto:${data.directContact.email}" class="px-3 py-1.5 rounded-lg bg-emerald-500 text-zinc-950 font-semibold text-xs hover:bg-emerald-400 transition-colors">
            Send Email
          </a>
          <a href="https://${data.directContact.linkedin}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 font-semibold text-xs hover:bg-zinc-700 transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    `;
  }
}

