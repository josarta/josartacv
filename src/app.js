/**
 * Main Application Orchestrator
 * Connects i18n, cinematic motion system (Lenis + GSAP), telemetry canvas, terminal, spotlight projects, and recruiter modal.
 */

import { i18n } from './i18n.js';
import { CinematicMotionSystem } from './components/cinematic-motion.js';
import { TelemetryCanvas } from './components/telemetry-canvas.js';
import { TerminalController } from './components/terminal.js';
import { ProjectsController } from './components/projects.js';
import { TimelineController } from './components/timeline.js';
import { RecruiterModalController } from './components/recruiter-modal.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Initialize i18n first for instantaneous zero-flicker dictionary binding
  await i18n.init();

  // 2. Initialize Cinematic Motion System (Lenis Smooth Scroll + GSAP ScrollTrigger + Magnetic Hover)
  const motionSystem = new CinematicMotionSystem();
  motionSystem.init();

  // 3. Initialize Ambient Telemetry Canvas (Dynamic Phase-Space & Neural Vectors)
  new TelemetryCanvas('telemetry-canvas');

  // 4. Initialize Interactive Live Terminal
  new TerminalController('hero-terminal', i18n);

  // 5. Initialize Featured Projects Engine
  new ProjectsController('projects-section', i18n);

  // 6. Initialize Systems Reliability Timeline
  new TimelineController('timeline-container', i18n);

  // 7. Initialize Recruiter Fast-Track Modal
  new RecruiterModalController(i18n);

  // 8. Mobile Navigation Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileMenu.querySelectorAll('a, button').forEach(item => {
      item.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 9. Active Navigation Link Tracker
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 140;
      if (window.pageYOffset >= sectionTop) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-emerald-400', 'font-semibold');
      link.classList.add('text-zinc-400');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.remove('text-zinc-400');
        link.classList.add('text-emerald-400', 'font-semibold');
      }
    });
  });

  console.log('[System Core] Sarta AI Cinematic Motion & Telemetry online.');
});
