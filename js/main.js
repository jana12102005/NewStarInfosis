/**
 * NEW STAR INFOSIS — CORE ENGINE (main.js)
 * Bytewax Theme: Install pill copy, theme toggle, stats counter, scroll progress & toasts.
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initScrollProgress();
  initBackToTop();
  initStatsCounter();
  initInstallPillCopy();
  initLucideIcons();
});

/**
 * Initialize Lucide Icons
 */
function initLucideIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

/**
 * Bytewax Install Pill Copy to Clipboard
 */
function initInstallPillCopy() {
  const copyBtns = document.querySelectorAll('.install-pill-copy');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const pill = btn.closest('.install-pill');
      const code = pill.querySelector('code');
      if (!code) return;

      const text = code.innerText.replace(/^\$\s*/, '').trim();
      navigator.clipboard.writeText(text).then(() => {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="check"></i> Copied';
        initLucideIcons();
        showToast(`Copied to clipboard: ${text}`, 'success');

        setTimeout(() => {
          btn.innerHTML = originalText;
          initLucideIcons();
        }, 2000);
      }).catch(() => {
        showToast('Failed to copy to clipboard', 'error');
      });
    });
  });
}

/**
 * Theme Toggler (Bytewax Light Canvas vs Dark Mode)
 */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('nsi-bytewax-theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon(true);
  }

  toggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('nsi-bytewax-theme', 'light');
      updateThemeIcon(false);
      showToast('Switched to Bytewax Light Canvas', 'success');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('nsi-bytewax-theme', 'dark');
      updateThemeIcon(true);
      showToast('Switched to Developer Dark Mode', 'success');
    }
    initLucideIcons();
  });
}

function updateThemeIcon(isDark) {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  toggleBtn.innerHTML = isDark 
    ? '<i data-lucide="sun"></i>' 
    : '<i data-lucide="moon"></i>';
}

/**
 * Scroll Progress Indicator
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = window.scrollY / totalHeight;
      progressBar.style.transform = `scaleX(${progress})`;
    }
  }, { passive: true });
}

/**
 * Back to Top Floating Button
 */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Animated Numbers Counter
 */
function initStatsCounter() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-count'), 10);
        const duration = 1800;
        const stepTime = 30;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.querySelector('.counter-val').textContent = target;
            clearInterval(timer);
          } else {
            counter.querySelector('.counter-val').textContent = Math.floor(current);
          }
        }, stepTime);

        obs.unobserve(counter);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(counter => observer.observe(counter));
}

/**
 * Global Toast Notification System
 */
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? 'check' : (type === 'error' ? 'alert-circle' : 'info');
  toast.innerHTML = `<i data-lucide="${icon}"></i> <span>${message}</span>`;

  container.appendChild(toast);
  initLucideIcons();

  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 250);
  }, 3200);
}

window.showToast = showToast;
