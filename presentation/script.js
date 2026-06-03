/* ═══════════════════════════════════════════════
   LETS-PLAY API — ULTRA PREMIUM JS
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PRELOADER ── */
  const preloader = document.getElementById('preloader');
  const preText = document.getElementById('pre-text');
  const messages = ['INITIALISATION...', 'CONNEXION MONGODB...', 'CHARGEMENT JWT...', 'PRÊT.'];
  let mi = 0;
  const msgInterval = setInterval(() => {
    mi++;
    if (mi < messages.length && preText) preText.textContent = messages[mi];
    if (mi >= messages.length) clearInterval(msgInterval);
  }, 300);

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.7s ease';
        setTimeout(() => preloader.remove(), 800);
      }
    }, 1400);
  });


  /* ── PARTICLE CANVAS ── */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });

    const PARTICLE_COUNT = 60;
    const particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.4 + 0.1,
        color: Math.random() > 0.6 ? '#4f8ef7' : Math.random() > 0.5 ? '#7c5cfc' : '#00e87a',
      });
    }

    let mouse = { x: W / 2, y: H / 2 };
    document.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    function drawParticles() {
      ctx.clearRect(0, 0, W, H);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(79,142,247,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles + mouse repulsion
      particles.forEach(p => {
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 100) {
          p.vx += (mdx / mdist) * 0.05;
          p.vy += (mdy / mdist) * 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Speed cap
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 1.5) { p.vx *= 0.95; p.vy *= 0.95; }

        // Damping
        p.vx *= 0.99;
        p.vy *= 0.99;

        // Wrap
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }


  /* ── CUSTOM CURSOR ── */
  const cursor = document.querySelector('.cursor');
  const trail = document.querySelector('.cursor-trail');
  let mx = 0, my = 0, tx = 0, ty = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    if (cursor) {
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    }
  });

  function animTrail() {
    tx += (mx - tx) * 0.1;
    ty += (my - ty) * 0.1;
    if (trail) {
      trail.style.left = tx + 'px';
      trail.style.top = ty + 'px';
    }
    requestAnimationFrame(animTrail);
  }
  animTrail();

  document.querySelectorAll('a, button, .ep-row, .arch-l, .feature-card, .tech-item, .mf-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      if (trail) {
        trail.style.width = '60px';
        trail.style.height = '60px';
        trail.style.borderColor = 'rgba(79,142,247,0.6)';
      }
    });
    el.addEventListener('mouseleave', () => {
      if (cursor) cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      if (trail) {
        trail.style.width = '32px';
        trail.style.height = '32px';
        trail.style.borderColor = 'rgba(79,142,247,0.4)';
      }
    });
  });

  document.addEventListener('mouseleave', () => {
    if (cursor) cursor.style.opacity = '0';
    if (trail) trail.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    if (cursor) cursor.style.opacity = '1';
    if (trail) trail.style.opacity = '1';
  });


  /* ── NAVBAR ── */
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('progress-bar');
  const backTop = document.getElementById('back-top');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / maxScroll) * 100;

    if (navbar) navbar.classList.toggle('scrolled', scrollY > 60);
    if (progressBar) progressBar.style.width = progress + '%';
    if (backTop) backTop.classList.toggle('visible', scrollY > 500);

    // Active nav
    let current = '';
    sections.forEach(section => {
      if (section.getBoundingClientRect().top < window.innerHeight * 0.4) {
        current = section.id;
      }
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });

    // Checklist animation
    animateChecklist();
  }

  window.addEventListener('scroll', updateScroll, { passive: true });


  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close mobile menu
      const mm = document.getElementById('mobile-menu');
      if (mm) mm.classList.remove('open');
    });
  });

  if (backTop) backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));


  /* ── MOBILE MENU ── */
  const burger = document.getElementById('nav-burger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }


  /* ── INTERSECTION OBSERVER: REVEAL ── */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));


  /* ── JWT TOKEN ANIMATION ── */
  const jwtSection = document.querySelector('#jwt');
  if (jwtSection) {
    const jwtObs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('.tv-block').forEach(block => block.classList.add('animated'));
        jwtObs.disconnect();
      }
    }, { threshold: 0.3 });
    jwtObs.observe(jwtSection);
  }


  /* ── CHECKLIST BAR ANIMATION ── */
  function animateChecklist() {
    const resultSection = document.querySelector('#resultats');
    if (!resultSection) return;
    const rect = resultSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.7) {
      document.querySelectorAll('.cl-item').forEach((item, i) => {
        if (!item.classList.contains('animated')) {
          setTimeout(() => item.classList.add('animated'), i * 100);
        }
      });
    }
  }


  /* ── TECH STRIP — PAUSE ON HOVER ── */
  const techStrip = document.querySelector('.tech-strip');
  const techWrap = document.querySelector('.tech-marquee-wrap');
  if (techStrip && techWrap) {
    // Duplicate for seamless loop
    const clone = techStrip.cloneNode(true);
    techWrap.appendChild(clone);

    techWrap.addEventListener('mouseenter', () => {
      techStrip.style.animationPlayState = 'paused';
      clone.style.animationPlayState = 'paused';
    });
    techWrap.addEventListener('mouseleave', () => {
      techStrip.style.animationPlayState = 'running';
      clone.style.animationPlayState = 'running';
    });
  }


  /* ── ENDPOINT ROW CLICK ── */
  document.querySelectorAll('.ep-row[data-url]').forEach(row => {
    row.addEventListener('click', () => {
      window.open(row.dataset.url, '_blank');
    });
  });


  /* ── ARCHITECTURE LAYER GLOW ON HOVER ── */
  document.querySelectorAll('.arch-l').forEach(layer => {
    const color = layer.dataset.color || 'var(--blue)';
    layer.addEventListener('mouseenter', () => {
      layer.style.borderColor = color + '60';
      layer.style.boxShadow = `0 0 20px ${color}25`;
    });
    layer.addEventListener('mouseleave', () => {
      layer.style.borderColor = '';
      layer.style.boxShadow = '';
    });
  });


  /* ── LAUNCH BUTTON RIPPLE ── */
  const btnStart = document.querySelector('.btn-start');
  if (btnStart) {
    btnStart.addEventListener('click', e => {
      const ripple = document.createElement('span');
      const rect = btnStart.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      ripple.style.cssText = `
        position:absolute; left:${x}px; top:${y}px;
        width:10px; height:10px;
        background:rgba(255,255,255,0.4);
        border-radius:50%;
        transform:translate(-50%,-50%) scale(0);
        animation:ripple-spread 0.6s ease forwards;
        pointer-events:none;
      `;
      btnStart.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });

    // CSS for ripple
    const style = document.createElement('style');
    style.textContent = `@keyframes ripple-spread { to { transform: translate(-50%,-50%) scale(30); opacity: 0; } }`;
    document.head.appendChild(style);
  }


  /* ── PARALLAX HERO ORBS ── */
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');
  const orb3 = document.querySelector('.orb-3');

  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (orb1) orb1.style.transform = `translateY(${sy * 0.12}px)`;
    if (orb2) orb2.style.transform = `translateY(${sy * -0.08}px)`;
    if (orb3) orb3.style.transform = `translateY(${sy * 0.05}px)`;
  }, { passive: true });


  /* ── KEYBOARD NAVIGATION ── */
  const sectionIds = ['hero', 'objectif', 'technologies', 'architecture', 'jwt', 'mongodb', 'demo', 'resultats', 'auteurs', 'launch'];
  document.addEventListener('keydown', e => {
    const current = sectionIds.findIndex(id => {
      const el = document.getElementById(id);
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top >= -100 && rect.top < window.innerHeight * 0.5;
    });
    if (e.key === 'ArrowDown' && current < sectionIds.length - 1) {
      document.getElementById(sectionIds[current + 1])?.scrollIntoView({ behavior: 'smooth' });
    }
    if (e.key === 'ArrowUp' && current > 0) {
      document.getElementById(sectionIds[current - 1])?.scrollIntoView({ behavior: 'smooth' });
    }
  });


  /* ── FEATURE CARD MOUSE GLOW ── */
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });


  console.log('%c 🚀 lets-play API — Soutenance', `
    background: linear-gradient(135deg, #050508, #0e1422);
    color: #4f8ef7;
    font-size: 16px;
    font-weight: bold;
    padding: 14px 28px;
    border-left: 3px solid #7c5cfc;
    border-radius: 2px;
  `);

});


/* ══════════════════════════════════════════════════
   BOOST ANIMATIONS — TILT, MAGNETIC, RIPPLE, TOUCH
   ══════════════════════════════════════════════════ */

/* ── Détection touch / hover ── */
const isTouchDevice = () => window.matchMedia('(hover: none)').matches;

/* ── Tilt 3D générique ── */
function initTilt(selector, intensity = 12) {
  if (isTouchDevice()) return;
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      el.style.setProperty('--rx', `${-dy * intensity}deg`);
      el.style.setProperty('--ry', `${dx * intensity}deg`);
      /* Spotlight on feature-card */
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--mx', x + '%');
      el.style.setProperty('--my', y + '%');
    });
    el.addEventListener('mouseleave', () => {
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--mx', '50%');
      el.style.setProperty('--my', '50%');
      el.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.3s';
      setTimeout(() => el.style.transition = '', 600);
    });
    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform 0.1s ease, border-color 0.3s, box-shadow 0.3s';
    });
  });
}

/* ── Effet magnétique sur les boutons ── */
function initMagnetic(selector, strength = 0.35) {
  if (isTouchDevice()) return;
  document.querySelectorAll(selector).forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      btn.style.transform = `translate(${dx * strength}px, ${dy * strength}px) scale(1.04)`;
      btn.style.transition = 'transform 0.1s ease';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s';
    });
  });
}

/* ── Ripple universel sur click ── */
function initRipple(selector, color = 'rgba(255,255,255,0.25)') {
  document.querySelectorAll(selector).forEach(el => {
    el.style.position = el.style.position || 'relative';
    el.style.overflow = 'hidden';
    el.addEventListener('click', e => {
      const rect = el.getBoundingClientRect();
      const r = Math.hypot(rect.width, rect.height);
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute;
        left:${e.clientX - rect.left}px;
        top:${e.clientY - rect.top}px;
        width:${r * 2}px; height:${r * 2}px;
        background:${color};
        border-radius:50%;
        transform:translate(-50%,-50%) scale(0);
        animation:ripple-boost 0.65s ease forwards;
        pointer-events:none;
        z-index:20;
      `;
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
}

/* Injecter keyframe ripple boost si pas déjà là */
if (!document.querySelector('#ripple-boost-style')) {
  const s = document.createElement('style');
  s.id = 'ripple-boost-style';
  s.textContent = `@keyframes ripple-boost { to { transform: translate(-50%,-50%) scale(1); opacity: 0; } }`;
  document.head.appendChild(s);
}

/* ── Compteur animé pour les stats hero ── */
function animateCounter(el, target, duration = 1200) {
  const isPercent = String(target).includes('%');
  const num = parseFloat(target);
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(ease * num);
    el.textContent = isPercent ? current + '%' : current;
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;
  const nums = statsSection.querySelectorAll('.stat-num');
  let done = false;
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !done) {
      done = true;
      nums.forEach((el, i) => {
        const original = el.textContent.trim();
        setTimeout(() => animateCounter(el, original, 1000 + i * 150), i * 100);
      });
      obs.disconnect();
    }
  }, { threshold: 0.5 });
  obs.observe(statsSection);
}

/* ── Typing effect sur le preloader ── */
function typeEffect(el, text, speed = 60) {
  el.textContent = '';
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

/* ── Hover shimmer sur les ep-row ── */
function initEpRowShimmer() {
  document.querySelectorAll('.ep-row').forEach(row => {
    row.addEventListener('mouseenter', () => {
      row.style.backgroundImage = 'linear-gradient(90deg, rgba(79,142,247,0.04), rgba(124,92,252,0.04))';
    });
    row.addEventListener('mouseleave', () => {
      row.style.backgroundImage = '';
    });
  });
}

/* ── Stagger children reveal ── */
function initStaggerReveal() {
  // Tech detail items avec stagger
  document.querySelectorAll('.tech-detail-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.05}s`;
  });
  // Checklist items stagger déjà géré, mais boost
  document.querySelectorAll('.mf-item').forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.04}s`;
  });
}

/* ── Scroll-triggered section number color ── */
function initSectionNumColor() {
  const colors = ['#4f8ef7', '#7c5cfc', '#00e87a', '#f59e0b', '#a78bfa', '#f97316', '#00d97e', '#facc15', '#ef4444'];
  document.querySelectorAll('.section-num').forEach((num, i) => {
    const color = colors[i % colors.length];
    num.style.setProperty('-webkit-text-stroke-color', `${color}25`);
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        num.style.setProperty('-webkit-text-stroke-color', `${color}40`);
        num.style.transition = '-webkit-text-stroke-color 0.6s ease';
      } else {
        num.style.setProperty('-webkit-text-stroke-color', `${color}15`);
      }
    }, { threshold: 0.3 });
    obs.observe(num);
  });
}

/* ── JWT token blocks : re-trigger si re-visible ── */
function initJwtPulse() {
  document.querySelectorAll('.tv-block').forEach(block => {
    block.addEventListener('mouseenter', () => {
      block.style.transform = 'translateX(4px)';
      block.style.transition = 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)';
    });
    block.addEventListener('mouseleave', () => {
      block.style.transform = '';
    });
  });
}

/* ── Initialisation ── */
document.addEventListener('DOMContentLoaded', () => {
  /* Tilt 3D */
  initTilt('.feature-card', 8);
  initTilt('.auteur-card', 6);

  /* Magnétique */
  initMagnetic('.btn-launch', 0.3);
  initMagnetic('.btn-outline', 0.25);
  initMagnetic('.btn-start', 0.2);
  initMagnetic('#back-top', 0.4);

  /* Ripple */
  initRipple('.feature-card', 'rgba(79,142,247,0.08)');
  initRipple('.auteur-card', 'rgba(124,92,252,0.06)');
  initRipple('.ds-step', 'rgba(79,142,247,0.06)');
  initRipple('.cl-item', 'rgba(0,232,122,0.06)');
  initRipple('.mf-item', 'rgba(79,142,247,0.06)');
  initRipple('.jf-step', 'rgba(79,142,247,0.06)');

  /* Compteurs */
  initCounters();

  /* Shimmer ep-rows */
  initEpRowShimmer();

  /* Stagger */
  initStaggerReveal();

  /* Section num color */
  initSectionNumColor();

  /* JWT pulse */
  initJwtPulse();

  /* ── Touch : scroll snap-like feedback ── */
  if (isTouchDevice()) {
    document.querySelectorAll('.feature-card, .auteur-card, .mf-item, .ds-step, .cl-item').forEach(el => {
      el.addEventListener('touchstart', () => {
        el.style.opacity = '0.85';
        el.style.transform = 'scale(0.98)';
        el.style.transition = 'all 0.15s ease';
      }, { passive: true });
      el.addEventListener('touchend', () => {
        el.style.opacity = '';
        el.style.transform = '';
        el.style.transition = 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)';
      }, { passive: true });
    });
  }
});