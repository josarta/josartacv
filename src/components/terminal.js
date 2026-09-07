/**
 * Interactive Live Terminal Controller
 * Real-time telemetry diagnostics and interactive command prompt.
 */

export class TerminalController {
  constructor(containerId, i18nManager) {
    this.container = document.getElementById(containerId);
    this.i18n = i18nManager;
    if (!this.container) return;

    this.logsEl = this.container.querySelector('.terminal-logs');
    this.inputEl = this.container.querySelector('.terminal-input');

    this.commands = {
      help: () => 'Available commands: <span class="text-cyan-400">about</span>, <span class="text-cyan-400">skills</span>, <span class="text-cyan-400">projects</span>, <span class="text-cyan-400">experience</span>, <span class="text-cyan-400">architecture</span>, <span class="text-cyan-400">contact</span>, <span class="text-cyan-400">cv</span>, <span class="text-cyan-400">clear</span>',
      about: () => 'José Luis Sarta | AI Systems Engineer & SRE Lead.<br>Concept: <span class="text-emerald-400">"From Reliable Systems to Reliable AI."</span><br>Combining 15+ years of software engineering & financial SRE with frontier AI.',
      status: () => '[OK] Systems Operational | P99 Latency: < 12ms | SRE SLA: 99.99% | Agentic Pipeline: READY',
      skills: () => '<b>AI:</b> Multi-Agent RAG, vLLM, Qdrant, PyTorch, Evaluation & Tracing, PINNs<br><b>SRE/Backend:</b> Java/Spring, Python, C#, Kubernetes, OpenTelemetry, Prometheus, Kafka<br><b>Control:</b> Closed-loop stability, Lyapunov bounds, MPC, Embedded Telemetry',
      projects: () => 'Curated Case Studies:<br>1. <a href="#projects" class="text-emerald-400 hover:underline">Agentic-RAG-Engine</a> (Enterprise Multi-Agent RAG)<br>2. <a href="#projects" class="text-emerald-400 hover:underline">MLOps-Pipeline-Suite</a> (Automated Drift & K8s Canaries)<br>3. <a href="#projects" class="text-emerald-400 hover:underline">Control-AI-Optimizer</a> (PINNs & Dynamic Feedback)<br>4. <a href="#projects" class="text-emerald-400 hover:underline">Local-AI-Agent-Terminal</a> (Offline AST Coding Assistant)',
      experience: () => '<b>BBVA (2024-Pres):</b> Service Reliability Lead (99.99% SLA)<br><b>BBVA IT (2022-2026):</b> Senior Software Expert (Distributed Scientific Engines)<br><b>Mercado Libre (2021-2022):</b> Senior Software Developer (High-Volume E-Commerce)',
      architecture: () => '<b>AI in Production Pipeline:</b> Model → Context (Hybrid RAG) → Orchestration (Agents) → Evaluation (Grounding/Recall) → Observability (OTel) → Infra (K8s) → Reliability (99.99% SLO)',
      cv: () => 'Opening Executive CV modal... <button class="open-recruiter-modal-btn text-cyan-400 underline font-bold">[Click to Launch Dossier]</button>',
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
      <div class="text-[11px] text-zinc-500 mt-1 italic">Type <span class="text-cyan-300">"help"</span> for interactive diagnostics.</div>
    `;
  }

  executeCommand(cmd) {
    if (!cmd) return;

    const inputLine = document.createElement('div');
    inputLine.className = 'text-white font-mono flex items-center gap-1 mt-2 text-xs';
    inputLine.innerHTML = `<span class="text-emerald-400">sarta@core:~$</span> ${this.escapeHtml(cmd)}`;
    this.logsEl.appendChild(inputLine);

    let output = '';
    if (this.commands[cmd]) {
      output = this.commands[cmd]();
    } else {
      output = `<span class="text-rose-400">Command not recognized: "${this.escapeHtml(cmd)}". Type <span class="text-cyan-400">help</span> for commands.</span>`;
    }

    if (output !== null) {
      const responseLine = document.createElement('div');
      responseLine.className = 'text-gray-300 font-mono text-xs pl-2 border-l border-emerald-500/40 my-1 leading-relaxed';
      responseLine.innerHTML = output;
      this.logsEl.appendChild(responseLine);

      // Re-bind modal triggers inside output if any
      responseLine.querySelectorAll('.open-recruiter-modal-btn').forEach(b => {
        b.addEventListener('click', () => {
          const overlay = document.getElementById('recruiter-modal-overlay');
          if (overlay) overlay.classList.remove('hidden');
        });
      });
    }

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
