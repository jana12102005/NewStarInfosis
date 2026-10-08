/**
 * NEW STAR INFOSIS — PROJECTS ENGINE (projects.js)
 * Bytewax-styled project cards, dynamic category filtering, and case study modal.
 */

const PROJECTS_DATA = [
  {
    id: 'deep-genomics',
    title: 'GenomiX: Deep Learning Variant Predictor',
    category: 'bioinformatics',
    categoryName: 'Bioinformatics',
    thumbnail: 'assets/images/bioinformatics.jpg',
    description: 'High-throughput computational pipeline analyzing non-coding genomic variants and protein structure mutations using deep transformer models.',
    fullOverview: 'GenomiX utilizes multi-task attention networks to evaluate the downstream functional consequences of non-coding genetic polymorphisms. Integrated with ClinVar and dbSNP benchmarks, it delivers clinically actionable pathogenicity predictions with 98.4% ROC-AUC accuracy.',
    technologies: ['Python', 'PyTorch', 'AlphaFold', 'Nextflow', 'Docker', 'FastAPI'],
    metrics: 'Processed 1.2M+ variant loci in benchmark evaluations',
    liveUrl: '#'
  },
  {
    id: 'hyperion-ai',
    title: 'Hyperion: Enterprise Agentic Neural Core',
    category: 'ai-ml',
    categoryName: 'AI & Machine Learning',
    thumbnail: 'assets/images/ai-ml.jpg',
    description: 'Autonomous multi-agent orchestration framework equipped with vector memory retrieval, real-time reasoning loops, and multimodal analysis.',
    fullOverview: 'Hyperion allows enterprise teams to construct and deploy self-evaluating autonomous agents. Featuring custom token routing, semantic cache layers, and sub-second tool execution, Hyperion accelerates enterprise decision automation across supply chain and fintech data.',
    technologies: ['Python', 'LangChain', 'TensorFlow', 'PostgreSQL pgvector', 'Redis', 'Kubernetes'],
    metrics: '99.8% precision on structured API tool calling',
    liveUrl: '#'
  },
  {
    id: 'cyber-mesh-iot',
    title: 'OmniGrid: Industrial IoT Telemetry System',
    category: 'iot',
    categoryName: 'IoT Solutions',
    thumbnail: 'assets/images/iot-cloud.jpg',
    description: 'Real-time telemetry and edge analytics grid for smart industrial facilities, processing millions of sensor events per second.',
    fullOverview: 'OmniGrid bridges edge gateways running embedded FreeRTOS with scalable cloud time-series databases. Includes automated anomaly detection, predictive vibration diagnostics, and end-to-end TLS 1.3 cryptographic device identity verification.',
    technologies: ['C/C++', 'MQTT', 'Go', 'TimescaleDB', 'Grafana', 'ESP32', 'AWS IoT Core'],
    metrics: 'Sub-15ms message ingestion latency at 500k ops/sec',
    liveUrl: '#'
  },
  {
    id: 'nexus-portal',
    title: 'Nexus: Distributed Financial Cloud Suite',
    category: 'web-mobile',
    categoryName: 'Web & Mobile',
    thumbnail: 'assets/images/web-mobile.jpg',
    description: 'Ultra-responsive, banking-grade web and mobile client with biometric security, sub-millisecond chart rendering, and offline syncing.',
    fullOverview: 'A cross-platform financial analytics portal engineered for zero downtime and microsecond data streaming. Built with modern web workers, canvas-accelerated charts, and native iOS/Android shell integrations.',
    technologies: ['JavaScript', 'WebSockets', 'Chart.js', 'Service Workers', 'IndexedDB'],
    metrics: '100/100 Lighthouse performance and PWA score',
    liveUrl: '#'
  },
  {
    id: 'tensor-solver',
    title: 'QuantumMatrix: Algorithmic PDE Solver',
    category: 'computational',
    categoryName: 'Computational Tools',
    thumbnail: 'assets/images/computational-tools.jpg',
    description: 'GPU-accelerated tensor computation library for solving complex partial differential equations and fluid dynamics simulations.',
    fullOverview: 'QuantumMatrix provides high-performance mathematical primitives for scientific simulations. By leveraging CUDA kernels and memory-pinned sparse matrix operations, researchers achieve 40x speedups over conventional CPU solvers.',
    technologies: ['C++', 'CUDA', 'Python Cython', 'OpenMP', 'NumPy', 'BLAS/LAPACK'],
    metrics: '40x computational acceleration in finite-element models',
    liveUrl: '#'
  },
  {
    id: 'proteus-dock',
    title: 'ProteusDock: High-Affinity Molecular Screener',
    category: 'bioinformatics',
    categoryName: 'Bioinformatics',
    thumbnail: 'assets/images/hero-tech.jpg',
    description: 'Automated small-molecule drug candidate screening engine with 3D conformation modeling and binding affinity scoring.',
    fullOverview: 'ProteusDock automates virtual screening against druggable protein targets. Combining empirical force fields with neural scoring functions, it flags promising candidates with high pharmacological potential.',
    technologies: ['AutoDock Vina', 'RDKit', 'Python', 'PyMOL API', 'Flask', 'Celery'],
    metrics: 'Over 5 million compound structures screened in 48 hours',
    liveUrl: '#'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initProjectGallery();
  initProjectModal();
});

/**
 * Project Gallery Filtering & Rendering (Bytewax Flat Style)
 */
function initProjectGallery() {
  const container = document.getElementById('projects-grid');
  const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
  if (!container) return;

  function renderCards(filter = 'all') {
    container.innerHTML = '';

    const filtered = filter === 'all' 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === filter);

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px;">
          <p style="font-size: 1.1rem; color: var(--color-muted);">No projects found in this category.</p>
        </div>
      `;
      return;
    }

    filtered.forEach((proj, index) => {
      const card = document.createElement('div');
      card.className = 'project-card reveal active';
      card.innerHTML = `
        <div class="project-thumbnail">
          <img src="${proj.thumbnail}" alt="${proj.title}" loading="lazy" />
          <span class="project-category-tag">${proj.categoryName}</span>
        </div>
        <div class="project-body">
          <h3 class="card-title">${proj.title}</h3>
          <p class="card-description">${proj.description}</p>
          <div class="badge-group">
            ${proj.technologies.slice(0, 4).map(t => `<span class="tech-badge">${t}</span>`).join('')}
          </div>
          <div class="project-footer">
            <button class="feature-card-link open-modal-btn" data-id="${proj.id}">
              READ CASE STUDY <i data-lucide="arrow-right"></i>
            </button>
            <div style="display: flex; gap: 8px;">
              <a href="${proj.liveUrl}" class="social-icon-btn" title="Demo Sandbox" onclick="event.preventDefault(); showToast('Demo sandbox launched in isolated environment', 'info');">
                <i data-lucide="external-link"></i>
              </a>
            </div>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  renderCards('all');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderCards(filter);
    });
  });
}

/**
 * Case Study Modal
 */
function initProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  if (!modalOverlay) return;

  const modalBody = modalOverlay.querySelector('.modal-dynamic-content');
  const closeBtn = modalOverlay.querySelector('.modal-close-btn');

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.open-modal-btn');
    if (!btn) return;

    const projId = btn.getAttribute('data-id');
    const proj = PROJECTS_DATA.find(p => p.id === projId);
    if (!proj) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 16px;">
        <span class="section-tag tag-accent">${proj.categoryName}</span>
        <h2 style="font-size: 1.6rem; margin-top: 8px; margin-bottom: 8px;">${proj.title}</h2>
        <p class="lead" style="font-size: 16px;">${proj.description}</p>
      </div>

      <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 20px; border: 1px solid var(--color-surface);">
        <img src="${proj.thumbnail}" alt="${proj.title}" style="width: 100%; height: 240px; object-fit: cover;" />
      </div>

      <h4 style="margin-bottom: 6px;">Technical Architecture</h4>
      <p style="font-size: 15px;">${proj.fullOverview}</p>

      <div style="background: var(--color-canvas-alt); padding: 14px 16px; border-radius: var(--radius-sm); border: 1px solid var(--color-surface); margin-bottom: 20px;">
        <h4 style="font-size: 14px; margin-bottom: 4px; color: var(--color-ink-strong);">Verified Benchmark Metric</h4>
        <p style="margin-bottom: 0; font-family: var(--font-mono); font-size: 13px; color: var(--color-ink-strong); font-weight: 600;">${proj.metrics}</p>
      </div>

      <h4 style="margin-bottom: 6px;">Tech Stack</h4>
      <div class="badge-group" style="margin-bottom: 24px;">
        ${proj.technologies.map(t => `<span class="tech-badge badge-accent">${t}</span>`).join('')}
      </div>

      <div class="btn-group">
        <a href="contact.html?inquiry=${encodeURIComponent(proj.title)}" class="btn btn-accent">
          <span>Inquire About This Solution</span>
          <i data-lucide="arrow-right"></i>
        </a>
        <a href="contact.html" class="btn btn-dark">
          <i data-lucide="calendar"></i>
          <span>Schedule Technical Briefing</span>
        </a>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });
}
