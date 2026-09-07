/**
 * High-Performance Motion System
 * Butter-smooth reveals, zero scroll lag, hardware-accelerated transforms.
 */

export class CinematicMotionSystem {
  constructor() {
    this.gsap = window.gsap;
    this.ScrollTrigger = window.ScrollTrigger;
    this.isMobile = window.innerWidth < 768;
  }

  init() {
    if (!this.gsap) {
      console.warn('[Motion] GSAP not available, using native CSS transitions.');
      return;
    }

    if (this.ScrollTrigger) {
      this.gsap.registerPlugin(this.ScrollTrigger);
    }

    this.gsap.defaults({ ease: 'power2.out', duration: 0.6 });

    this.initScrollReveals();
    this.initSpotlightTracking();

    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    }, { passive: true });

    window.addEventListener('languageChanged', () => {
      if (this.ScrollTrigger) {
        setTimeout(() => this.ScrollTrigger.refresh(), 50);
      }
    });
  }

  initScrollReveals() {
    if (!this.gsap || !this.ScrollTrigger) return;

    // Reveal groups with stagger
    document.querySelectorAll('[data-reveal-group]').forEach((group) => {
      const items = group.querySelectorAll('[data-reveal-item]');
      if (!items.length) return;

      this.gsap.fromTo(
        items,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: group,
            start: 'top 88%',
            once: true
          }
        }
      );
    });

    // Standalone reveal items
    document.querySelectorAll('[data-reveal]:not([data-reveal-item])').forEach((el) => {
      this.gsap.fromTo(
        el,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true
          }
        }
      );
    });
  }

  initSpotlightTracking() {
    if (this.isMobile) return;

    let ticking = false;
    document.addEventListener('mousemove', (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const cards = document.querySelectorAll('.spotlight-card');
          cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }
}
