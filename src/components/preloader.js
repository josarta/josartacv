/**
 * Mission Control Boot Sequence & Interaction Micro-Spinners
 * Real-time telemetry calibration, quantum gyroscope loader, and tactile interaction feedback.
 */

export class SystemPreloader {
  constructor(options = {}) {
    this.container = document.getElementById('system-preloader');
    this.progressBar = document.getElementById('preloader-progress-bar');
    this.progressText = document.getElementById('preloader-progress-text');
    this.statusText = document.getElementById('preloader-status-text');
    this.onComplete = options.onComplete || (() => {});
    
    this.milestones = [
      'INITIALIZING AI_SYSTEMS_CORE v3.0...',
      'CALIBRATING CLOSED-LOOP TELEMETRY (60 FPS)...',
      'VALIDATING DETERMINISTIC GUARDRAILS & RAG PIPELINE...',
      'SYNCHRONIZING PRODUCTION ARCHITECTURES...',
      'SYSTEM READY: ALL SERVICES OPTIMAL.'
    ];

    this.init();
  }

  init() {
    if (!this.container) {
      this.onComplete();
      return;
    }

    let progress = 0;
    let milestoneIndex = 0;
    const startTime = performance.now();
    const duration = 1100; // Fast and snappy (1.1 seconds max)

    const updateFrame = (now) => {
      const elapsed = now - startTime;
      progress = Math.min(100, Math.floor((elapsed / duration) * 100));

      if (this.progressBar) {
        this.progressBar.style.width = `${progress}%`;
      }

      if (this.progressText) {
        this.progressText.textContent = `${progress}%`;
      }

      const targetMilestone = Math.min(
        this.milestones.length - 1,
        Math.floor((progress / 100) * this.milestones.length)
      );

      if (targetMilestone !== milestoneIndex && this.statusText) {
        milestoneIndex = targetMilestone;
        this.statusText.textContent = this.milestones[milestoneIndex];
      }

      if (progress < 100) {
        requestAnimationFrame(updateFrame);
      } else {
        setTimeout(() => this.finishBootSequence(), 120);
      }
    };

    requestAnimationFrame(updateFrame);
  }

  finishBootSequence() {
    if (!this.container) {
      this.onComplete();
      return;
    }

    if (window.gsap) {
      window.gsap.to(this.container, {
        yPercent: -100,
        opacity: 0,
        duration: 0.75,
        ease: 'expo.inOut',
        onComplete: () => {
          this.container.remove();
          this.onComplete();
        }
      });
    } else {
      this.container.style.opacity = '0';
      this.container.style.transform = 'translateY(-100%)';
      setTimeout(() => {
        this.container.remove();
        this.onComplete();
      }, 600);
    }
  }

  /**
   * Utility to attach a micro-spinner to any button/action during transactions
   */
  static triggerTransactionFeedback(buttonEl, loadingText = 'SYNCING...', duration = 400, onDone = () => {}) {
    if (!buttonEl) {
      onDone();
      return;
    }

    const originalContent = buttonEl.innerHTML;
    buttonEl.disabled = true;
    buttonEl.classList.add('opacity-90', 'cursor-wait');

    buttonEl.innerHTML = `
      <span class="inline-micro-spinner mr-1.5"></span>
      <span class="font-mono text-xs text-emerald-300">${loadingText}</span>
    `;

    setTimeout(() => {
      buttonEl.innerHTML = originalContent;
      buttonEl.disabled = false;
      buttonEl.classList.remove('opacity-90', 'cursor-wait');
      onDone();
    }, duration);
  }
}

