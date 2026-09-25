/* =========================================================
   PortfolioX v2 — script.js
   Handles: mobile nav, dark mode, scroll progress, active-
   section highlighting, animated stats, skill bar reveal,
   project filtering, back-to-top, and form validation.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  initMobileNav();
  initThemeToggle();
  initScrollProgress();
  initActiveNavHighlight();
  initStatsCounter();
  initSkillBars();
  initProjectFilters();
  initBackToTop();
  initContactForm();
});

/* ---------- Footer year ---------- */
function setYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ---------- Mobile nav toggle ---------- */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('primaryNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Dark mode toggle (persisted in localStorage) ---------- */
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const label = document.getElementById('themeLabel');
  if (!toggle) return;

  const stored = localStorage.getItem('portfoliox-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initial = stored || (prefersDark ? 'dark' : 'light');
  applyTheme(initial);

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('portfoliox-theme', next);
  });

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (label) label.textContent = 'Dark mode';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (label) label.textContent = 'Light mode';
    }
  }
}

/* ---------- Scroll progress bar ---------- */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${percent}%`;
  }, { passive: true });
}

/* ---------- Highlight the nav link for the section in view ---------- */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('.section[id]');
  const links = document.querySelectorAll('.nav-link');
  if (!sections.length || !links.length) return;

  const linkFor = id => document.querySelector(`.nav-link[href="#${id}"]`);

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => link.classList.remove('is-active'));
          const active = linkFor(entry.target.id);
          if (active) active.classList.add('is-active');
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
  );

  sections.forEach(section => observer.observe(section));
}

/* ---------- Animated stat counters ---------- */
function initStatsCounter() {
  const stats = document.querySelectorAll('#statsRow dt[data-count]');
  if (!stats.length) return;

  const animate = el => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(el => observer.observe(el));
}

/* ---------- Reveal skill bars when scrolled into view ---------- */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  bars.forEach(bar => observer.observe(bar));
}

/* ---------- Project category filters ---------- */
function initProjectFilters() {
  const filterBar = document.getElementById('projectFilters');
  const projects = document.querySelectorAll('.project');
  if (!filterBar || !projects.length) return;

  filterBar.addEventListener('click', event => {
    const btn = event.target.closest('.filter-btn');
    if (!btn) return;

    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filter = btn.dataset.filter;
    projects.forEach(project => {
      const matches = filter === 'all' || project.dataset.category === filter;
      project.classList.toggle('is-hidden', !matches);
    });
  });
}

/* ---------- Back-to-top button ---------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Contact form validation ---------- */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.getElementById('formStatus');

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError'),
      validate: value => {
        if (!value.trim()) return 'Enter your name.';
        if (value.trim().length < 2) return 'Name must be at least 2 characters.';
        return '';
      }
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: value => {
        if (!value.trim()) return 'Enter your email address.';
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!pattern.test(value.trim())) return 'Enter a valid email address.';
        return '';
      }
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
      validate: value => {
        if (!value.trim()) return 'Enter a message.';
        if (value.trim().length < 10) return 'Message must be at least 10 characters.';
        return '';
      }
    }
  };

  Object.values(fields).forEach(field => {
    field.input.addEventListener('blur', () => validateField(field));
    field.input.addEventListener('input', () => {
      if (field.input.closest('.field').classList.contains('has-error')) {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    status.textContent = '';

    let isValid = true;
    Object.values(fields).forEach(field => {
      if (!validateField(field)) isValid = false;
    });

    if (!isValid) {
      status.style.color = 'var(--danger)';
      status.textContent = 'Please fix the highlighted fields.';
      return;
    }

    // No backend is wired up yet — replace this block with a real
    // fetch() call to your form endpoint or email service.
    status.style.color = '';
    status.textContent = `Thanks, ${fields.name.input.value.trim()}! Your message is ready to send — connect a backend or service (e.g. Formspree) to deliver it.`;
    form.reset();
    Object.values(fields).forEach(field =>
      field.input.closest('.field').classList.remove('has-error')
    );
  });

  function validateField(field) {
    const message = field.validate(field.input.value);
    const wrapper = field.input.closest('.field');
    field.error.textContent = message;
    wrapper.classList.toggle('has-error', Boolean(message));
    field.input.setAttribute('aria-invalid', Boolean(message));
    return !message;
  }
}
