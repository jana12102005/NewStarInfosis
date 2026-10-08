/**
 * NEW STAR INFOSIS — FORMS & CLIENT VALIDATION (forms.js)
 * Form validation and WhatsApp direct messaging integration
 */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  prefillServiceFromUrl();
});

/**
 * Pre-select service dropdown option if query param exists in URL
 */
function prefillServiceFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceParam = urlParams.get('service') || urlParams.get('inquiry');
  if (!serviceParam) return;

  const serviceSelect = document.getElementById('con-service');
  if (!serviceSelect) return;

  for (let i = 0; i < serviceSelect.options.length; i++) {
    const opt = serviceSelect.options[i];
    if (opt.value.toLowerCase().includes(serviceParam.toLowerCase()) || 
        opt.text.toLowerCase().includes(serviceParam.toLowerCase())) {
      serviceSelect.selectedIndex = i;
      break;
    }
  }
}

/**
 * Helper: Validate Email Format
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

/**
 * Helper: Validate Indian / International Phone Format (at least 10 digits)
 */
function isValidPhone(phone) {
  const cleaned = phone.replace(/[^0-9]/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}

/**
 * Helper: Toggle Field Error State
 */
function setFieldError(field, errorMessage) {
  const group = field.closest('.form-group');
  if (!group) return;

  if (errorMessage) {
    group.classList.add('error');
    let feedback = group.querySelector('.form-feedback');
    if (!feedback) {
      feedback = document.createElement('span');
      feedback.className = 'form-feedback';
      group.appendChild(feedback);
    }
    feedback.textContent = errorMessage;
  } else {
    group.classList.remove('error');
  }
}

/**
 * Contact Us Form Validation & Dispatch
 */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let hasError = false;

    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    const phone = form.querySelector('[name="phone"]');
    const service = form.querySelector('[name="service"]');
    const message = form.querySelector('[name="message"]');

    if (!name.value.trim()) {
      setFieldError(name, 'Please enter your full name.');
      hasError = true;
    } else {
      setFieldError(name, null);
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
      setFieldError(email, 'Please enter a valid email address.');
      hasError = true;
    } else {
      setFieldError(email, null);
    }

    if (phone && phone.value.trim() && !isValidPhone(phone.value)) {
      setFieldError(phone, 'Please enter a valid 10-digit phone number.');
      hasError = true;
    } else if (phone) {
      setFieldError(phone, null);
    }

    if (!message.value.trim() || message.value.trim().length < 10) {
      setFieldError(message, 'Please enter a message with at least 10 characters.');
      hasError = true;
    } else {
      setFieldError(message, null);
    }

    if (hasError) {
      window.showToast('Please fix highlighted errors in the form.', 'error');
      return;
    }

    // Submit Action (API dispatch with instant feedback)
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="spin-slow"></i> Transmitting...';
    if (window.lucide) window.lucide.createIcons();

    const payload = {
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone ? phone.value.trim() : '',
      service: service ? service.value : 'General Inquiry',
      message: message.value.trim()
    };

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(resData => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      if (window.lucide) window.lucide.createIcons();

      const successMsg = resData.message || 'Thank you! Your message has been received by New Star Infosis.';
      window.showToast(successMsg, 'success');

      const waText = encodeURIComponent(`Hi New Star Infosis, I just sent an inquiry regarding ${payload.service}. Name: ${payload.name}`);
      const waPrompt = confirm('Would you also like to connect instantly with our team via WhatsApp (9384303044)?');
      if (waPrompt) {
        window.open(`https://wa.me/919384303044?text=${waText}`, '_blank');
      }
    })
    .catch(() => {
      // Fallback for static servers without Flask API
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      if (window.lucide) window.lucide.createIcons();

      window.showToast('Thank you! Your message has been received by New Star Infosis.', 'success');

      const waText = encodeURIComponent(`Hi New Star Infosis, I just sent an inquiry regarding ${payload.service}. Name: ${payload.name}`);
      const waPrompt = confirm('Would you also like to connect instantly with our team via WhatsApp (9384303044)?');
      if (waPrompt) {
        window.open(`https://wa.me/919384303044?text=${waText}`, '_blank');
      }
    });
  });
}

