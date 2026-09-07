/**
 * Interactive Live Terminal
 * Simulates real-time telemetry diagnostics and accepts user commands.
 */

export class TerminalController {
  constructor(containerId, i18nManager) {
    this.container = document.getElementById(containerId);
    this.i18n = i18nManager;
    if (!this.container) return;

    this.logsEl = this.container.querySelector('.terminal-logs');
    this.inputEl = this.container.querySelector('.terminal-input');
    this.statusDot = this.container.querySelector('.terminal-status-dot');

    this.commands = {
      help: () => 'Available commands: <span class="text-cyan-400">status</span>, <span class="text-cyan-400">projects</span>, <span class="text-cyan-400">skills</span>, <span class="text-cyan-400">metrics</span>, <span class="text-cyan-400">contact</span>, <span class="text-cyan-400">clear</span>',
      status: () => '[OK] Systems Operational | Latency: 8.4ms | SRE SLA: 99.99% | Agentic Pipeline: READY',
      projects: () => 'Core Architectures: <br>1. <a href="#projects" class="text-emerald-400 hover:underline">Agentic-RAG-Engine</a> (Multi-Agent RAG)<br>2. <a href="#projects" class="text-emerald-400 hover:underline">MLOps-Pipeline-Suite</a> (Automated CI/CD & Drift)<br>3. <a href="#projects" class="text-emerald-400 hover:underline">Control-AI-Optimizer</a> (PINN & Feedback Loops)<br>4. <a href="#projects" class="text-emerald-400 hover:underline">Local-AI-Agent-Terminal</a> (Offline AST Agent)',
      skills: () => 'AI: PyTorch, Agentic RAG, vLLM, Qdrant, PINNs<br>SRE/Backend: Java/Spring, Python, C#, Kubernetes, OTel, Kafka<br>Control: PID/MPC, Lyapunov Stability, Kinematics, MicroPython',
      metrics: () => 'Production SLA: 99.99% | Repos: 8+ Architectural | Experience: 15+ Yrs | Education: MSc AI (UniAndes) + Electronic Control Eng.',
      contact: () => 'Email: <a href="mailto:josarta@gmail.com" class="text-emerald-400">josarta@gmail.com</a> | LinkedIn: <a href="https://linkedin.com/in/josarta" target="_blank" class="text-cyan-400">linkedin.com/in/josarta</a> | GitHub: <a href="https://github.com/josarta" target="_blank" class="text-cyan-400">github.com/josarta</a>',
      clear: () => {
        if (this.logsEl) this.logsEl.innerHTML = '';
        return null;
      }
    };

    this.init();
  }

  init() {
    if (this.inputEl) {
      this.inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          const cmd = this.inputEl.value.trim().toLowerCase();
          this.executeCommand(cmd);
          this.inputEl.value = '';
        }
      });
    }

    // Refresh default log lines upon language change
    window.addEventListener('languageChanged', () => {
      this.renderInitialLogs();
    });

    this.renderInitialLogs();
  }

  renderInitialLogs() {
    if (!this.logsEl) return;
    const l1 = this.i18n.t('hero.terminal.line1');
    const l2 = this.i18n.t('hero.terminal.line2');
    const l3 = this.i18n.t('hero.terminal.line3');
    const l4 = this.i18n.t('hero.terminal.line4');

    this.logsEl.innerHTML = `
      <div class="text-gray-400">&gt; ${l1}</div>
      <div class="text-gray-400">&gt; ${l2}</div>
      <div class="text-cyan-400">&gt; ${l3}</div>
      <div class="text-emerald-400 font-medium">&gt; ${l4}</div>
      <div class="text-xs text-gray-500 mt-1 italic">Type <span class="text-cyan-300">"help"</span> for interactive diagnostics.</div>
    `;
  }

  executeCommand(cmd) {
    if (!cmd) return;

    // Log the input
    const inputLine = document.createElement('div');
    inputLine.className = 'text-white font-mono flex items-center gap-1 mt-2';
    inputLine.innerHTML = `<span class="text-emerald-400">sarta@core:~$</span> ${this.escapeHtml(cmd)}`;
    this.logsEl.appendChild(inputLine);

    let output = '';
    if (this.commands[cmd]) {
      output = this.commands[cmd]();
    } else {
      output = `<span class="text-red-400">Command not recognized: "${this.escapeHtml(cmd)}". Type <span class="text-cyan-400">help</span> for commands.</span>`;
    }

    if (output !== null) {
      const responseLine = document.createElement('div');
      responseLine.className = 'text-gray-300 font-mono text-xs pl-2 border-l border-emerald-500/40 my-1 leading-relaxed';
      responseLine.innerHTML = output;
      this.logsEl.appendChild(responseLine);
    }

    // Scroll down
    this.logsEl.scrollTop = this.logsEl.scrollHeight;
  }

  escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }
}

