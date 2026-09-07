# Featured Engineering & AI Projects

## 1. Agentic-RAG-Engine
- **Subtitle**: Enterprise Retrieval-Augmented Generation Platform
- **Tagline**: Multi-agent collaborative architecture with semantic-hybrid routing and precision reranking for production workloads.
- **Problem Solved**: Standard RAG pipelines suffer from context dilution, hallucination in complex enterprise domains, and poor cross-document synthesis.
- **Key Technical Highlights**:
  - Multi-agent orchestration layer that decomposes complex enterprise queries into targeted search subtasks.
  - Hybrid retrieval combining dense vector similarity with sparse BM25 indexing.
  - Integration with low-latency local and remote LLM backends via vLLM / OpenAI API.
- **Tech Stack**: `Python` | `LangChain` | `Qdrant` | `FastAPI` | `Docker`
- **GitHub / Artifact**: [github.com/josarta](https://github.com/josarta)

---

## 2. MLOps-Pipeline-Suite
- **Subtitle**: End-to-End Automated Machine Learning Lifecycle & Monitoring
- **Tagline**: Continuous training, automated drift detection, and canary deployment infrastructure for mission-critical ML models.
- **Problem Solved**: Automates the transition from experimental notebooks to resilient, monitored production microservices with zero-downtime rollouts.
- **Key Technical Highlights**:
  - Automated data validation and data drift tracking using statistical drift metrics.
  - Artifact versioning, model registry integration, and reproducible training pipelines using MLflow and DVC.
  - Containerized deployment with automated health probes and Prometheus metric exporters.
- **Tech Stack**: `Python` | `PyTorch` | `MLflow` | `DVC` | `Kubernetes` | `FastAPI`
- **GitHub / Artifact**: [github.com/josarta](https://github.com/josarta)

---

## 3. Control-AI-Optimizer
- **Subtitle**: Hybrid Neural Network & Dynamic Control Loop Optimizer
- **Tagline**: Bridging classical control theory with deep learning for nonlinear system optimization and real-time state adaptation.
- **Problem Solved**: Traditional PID/MPC controllers degrade when dealing with highly nonlinear perturbations; standard deep learning models lack deterministic safety guarantees.
- **Key Technical Highlights**:
  - Physics-informed neural network (PINN) architecture providing residual error correction to classical control algorithms.
  - Real-time parameter estimation and adaptive loop gain optimization.
  - High-throughput evaluation engine with C# / Python interop and minimal execution overhead.
- **Tech Stack**: `Python` | `PyTorch` | `C#` | `Control Theory` | `Docker`
- **GitHub / Artifact**: [github.com/josarta](https://github.com/josarta)

---

## 4. Local-AI-Agent-Terminal
- **Subtitle**: Privacy-Preserving Agentic Developer Workspace
- **Tagline**: Local terminal execution harness for autonomous coding, self-debugging, and contextual repository search.
- **Problem Solved**: High enterprise API latency, data sovereignty concerns, and the need for offline-first agentic execution against large proprietary codebases.
- **Key Technical Highlights**:
  - Multi-model fallback architecture orchestrated locally using Ollama and Claude Code / local endpoints.
  - Local repository AST parsing, function-level indexing, and agent tool-calling loop.
  - Custom memory scratchpad for long-horizon task execution.
- **Tech Stack**: `Python` | `Ollama` | `Tree-sitter` | `FastAPI` | `Rich CLI`
- **GitHub / Artifact**: [github.com/josarta](https://github.com/josarta)