/**
 * Ultra-Lightweight Telemetry Canvas
 * Highly optimized for 60-120 FPS with near-zero CPU footprint.
 */

export class TelemetryCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d', { alpha: true });
    this.nodes = [];
    this.mouse = { x: null, y: null, radius: 120 };
    this.animationFrameId = null;
    this.isRunning = false;
    this.isMobile = window.innerWidth < 768;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
      this.resize();
    }, { passive: true });
    
    // Only bind mouse listener on non-touch devices
    if (!this.isMobile) {
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
      }, { passive: true });

      window.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
      }, { passive: true });
    }

    // Auto pause when out of viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!this.isRunning) {
            this.isRunning = true;
            this.animate();
          }
        } else {
          this.isRunning = false;
          if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
          }
        }
      });
    }, { threshold: 0.05 });

    observer.observe(this.canvas);
    this.createNodes();
    this.isRunning = true;
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    this.createNodes();
  }

  createNodes() {
    this.nodes = [];
    const count = this.isMobile ? 18 : 32;

    for (let i = 0; i < count; i++) {
      this.nodes.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.2 + 0.8,
        color: Math.random() > 0.4 ? 'rgba(0, 245, 160, 0.4)' : 'rgba(0, 217, 245, 0.35)'
      });
    }
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    const maxDist = this.isMobile ? 90 : 120;
    const len = this.nodes.length;

    for (let i = 0; i < len; i++) {
      const n = this.nodes[i];
      n.x += n.vx;
      n.y += n.vy;

      if (n.x < 0 || n.x > this.width) n.vx *= -1;
      if (n.y < 0 || n.y > this.height) n.vy *= -1;

      // Subtle mouse repulsion on desktop
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - n.x;
        const dy = this.mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          n.x -= (dx / dist) * force * 1.2;
          n.y -= (dy / dist) * force * 1.2;
        }
      }

      // Draw node
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = n.color;
      this.ctx.fill();

      // Connect neighbor nodes
      for (let j = i + 1; j < len; j++) {
        const n2 = this.nodes[j];
        const dx = n.x - n2.x;
        const dy = n.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(n.x, n.y);
          this.ctx.lineTo(n2.x, n2.y);
          this.ctx.strokeStyle = `rgba(0, 245, 160, ${alpha})`;
          this.ctx.lineWidth = 0.6;
          this.ctx.stroke();
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}
