/**
 * NEW STAR INFOSIS — OPENING 100% ANIMATED PRELOADER (preloader.js)
 * Smooth 0% to 100% animated progress counter, realistic system logs,
 * high-voltage glow effects, and cinematic split curtain transition.
 */

(function () {
  'use strict';

  // Ensure body has preloader-active class immediately
  if (document.body) {
    document.body.classList.add('preloader-active');
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.add('preloader-active');
    });
  }

  const statusLogs = [
    { threshold: 0, text: 'INITIALIZING NSI CLOUD CORE...' },
    { threshold: 16, text: 'ESTABLISHING SECURE TLS HANDSHAKE...' },
    { threshold: 34, text: 'LOADING ENTERPRISE AI & BIO ENGINES...' },
    { threshold: 52, text: 'COMPILING DISTRIBUTED RUNTIME GRAPH...' },
    { threshold: 72, text: 'SYNCHRONIZING DATA PIPELINES...' },
    { threshold: 88, text: 'FINALIZING INTERACTION BUFFERS...' },
    { threshold: 98, text: 'SYSTEM VERIFIED // 100% CALIBRATED' },
    { threshold: 100, text: 'WELCOME TO NEW STAR INFOSIS' }
  ];

  let currentPercent = 0;
  let targetPercent = 0;
  let isComplete = false;
  let isExiting = false;
  let animationFrameId = null;

  function initPreloader() {
    const preloader = document.getElementById('site-preloader');
    if (!preloader) return;

    const numberEl = document.getElementById('preloader-number');
    const fillEl = document.getElementById('preloader-fill');
    const statusTextEl = document.getElementById('preloader-status-text');
    const pingEl = document.getElementById('preloader-ping');
    const skipBtn = document.getElementById('preloader-skip-btn');

    // Simulate subtle dynamic network ping
    if (pingEl) {
      const ping = Math.floor(Math.random() * 8) + 12; // 12ms - 19ms
      pingEl.textContent = `${ping}ms`;
    }

    // Interactive Skip Actions
    function skipPreloader() {
      if (isExiting) return;
      targetPercent = 100;
      currentPercent = 100;
      updateUI(100);
      finishPreloader();
    }

    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        skipPreloader();
      });
    }

    // Keyboard ESC to skip
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !isExiting) {
        skipPreloader();
      }
    });

    // Update Visual UI
    function updateUI(percent) {
      const rounded = Math.min(100, Math.floor(percent));
      if (numberEl) numberEl.textContent = rounded;
      if (fillEl) fillEl.style.width = `${rounded}%`;
      if (preloader) preloader.setAttribute('aria-valuenow', rounded);

      // Find matching status message
      if (statusTextEl) {
        let msg = statusLogs[0].text;
        for (let i = 0; i < statusLogs.length; i++) {
          if (rounded >= statusLogs[i].threshold) {
            msg = statusLogs[i].text;
          }
        }
        if (statusTextEl.textContent !== msg) {
          statusTextEl.textContent = msg;
        }
      }
    }

    // Natural Progress Engine
    const startTime = performance.now();
    const minDuration = 1800; // ~1.8 seconds optimal duration for smooth viewing

    function tick(now) {
      if (isExiting) return;

      const elapsed = now - startTime;
      const timeRatio = Math.min(1, elapsed / minDuration);

      // Easing curve: quick start, steady progress, accelerated finish
      const easedTime = timeRatio < 0.5 
        ? 2 * timeRatio * timeRatio 
        : 1 - Math.pow(-2 * timeRatio + 2, 2) / 2;

      // Base progress based on time
      const timeBasedPercent = easedTime * 100;

      // Target accounts for window load state
      if (isComplete) {
        targetPercent = 100;
      } else {
        // Natural micro-variations
        targetPercent = Math.max(targetPercent, Math.min(94, timeBasedPercent));
      }

      // Smooth lerp towards target
      const step = isComplete ? 3.5 : 1.8;
      if (currentPercent < targetPercent) {
        currentPercent = Math.min(targetPercent, currentPercent + step);
        updateUI(currentPercent);
      }

      if (currentPercent >= 100) {
        updateUI(100);
        finishPreloader();
        return;
      }

      animationFrameId = requestAnimationFrame(tick);
    }

    // Launch ticker
    animationFrameId = requestAnimationFrame(tick);

    // Window Load event listener
    if (document.readyState === 'complete') {
      onPageFullyLoaded();
    } else {
      window.addEventListener('load', onPageFullyLoaded);
    }

    function onPageFullyLoaded() {
      isComplete = true;
      // Ensure target accelerates to 100
      targetPercent = 100;
    }

    // Finish and execute cinematic split curtain exit
    function finishPreloader() {
      if (isExiting) return;
      isExiting = true;
      if (animationFrameId) cancelAnimationFrame(animationFrameId);

      preloader.classList.add('finishing');

      // Brief 250ms pause at 100% to let user absorb completion
      setTimeout(() => {
        preloader.classList.add('exit');

        // Restore body scroll and interaction
        document.body.classList.remove('preloader-active');

        // Dispatch custom event for hero/page entrance animations
        window.dispatchEvent(new CustomEvent('nsiSiteLoaded', { detail: { timestamp: Date.now() } }));

        // Remove from DOM tree after curtain animation finishes
        setTimeout(() => {
          preloader.classList.add('dismissed');
          preloader.remove();
        }, 750);
      }, 260);
    }

    // Safety Fallback: Never leave user stuck longer than 4.5 seconds
    setTimeout(() => {
      if (!isExiting) {
        skipPreloader();
      }
    }, 4500);
  }

  // Self-initialize on DOMContentLoaded or immediately if already loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreloader);
  } else {
    initPreloader();
  }
})();
