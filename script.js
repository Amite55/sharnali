/* ============================================
   JAVASCRIPT — Sharnali Chowdhury Puja Portfolio
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // 1. PARTICLE SYSTEM
  // =============================================
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      const colors = ['#f48fb1', '#ce93d8', '#e91e8c', '#ffd700', '#fff'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.life = Math.random() * 200 + 100;
      this.maxLife = this.life;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life--;
      if (this.life <= 0 ||
          this.x < 0 || this.x > canvas.width ||
          this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      const fade = this.life / this.maxLife;
      ctx.save();
      ctx.globalAlpha = this.opacity * fade;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const particles = Array.from({ length: 80 }, () => new Particle());

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // =============================================
  // 2. NAVBAR — Scroll + Active State
  // =============================================
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Scrolled style
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.dataset.section === current) {
        link.classList.add('active');
      }
    });
  });

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-links');
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    navList.classList.contains('open')
      ? (spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)',
         spans[1].style.opacity = '0',
         spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)')
      : (spans[0].style.transform = '', spans[1].style.opacity = '',
         spans[2].style.transform = '');
  });

  // Close mobile nav on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // =============================================
  // 3. HERO ANIMATION
  // =============================================
  const heroContent = document.querySelector('.hero-content');
  setTimeout(() => heroContent.classList.add('visible'), 200);

  // =============================================
  // 4. ANIMATE ON SCROLL (AOS — Custom)
  // =============================================
  const aosElements = document.querySelectorAll('[data-aos]');

  const aosObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.aosDelay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animated');
        }, parseInt(delay));
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

  aosElements.forEach(el => aosObserver.observe(el));

  // =============================================
  // 5. COUNTER ANIMATION
  // =============================================
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  // =============================================
  // 6. SKILL BAR ANIMATION
  // =============================================
  const skillFills = document.querySelectorAll('.skill-fill');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const width = el.dataset.width;
        setTimeout(() => { el.style.width = width + '%'; }, 200);
        skillObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  skillFills.forEach(el => skillObserver.observe(el));

  // =============================================
  // 7. SMOOTH SCROLLING for nav links
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        const top = target.offsetTop - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // =============================================
  // 8. CONTACT FORM (Demo Handler)
  // =============================================
  const contactForm = document.getElementById('contact-form');
  const sendBtn = document.getElementById('send-btn');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btnText = sendBtn.querySelector('.btn-text');
      const btnLoader = sendBtn.querySelector('.btn-loader');

      btnText.classList.add('hidden');
      btnLoader.classList.remove('hidden');
      sendBtn.disabled = true;

      setTimeout(() => {
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
        sendBtn.disabled = false;
        formSuccess.classList.remove('hidden');
        contactForm.reset();
        setTimeout(() => formSuccess.classList.add('hidden'), 5000);
      }, 2000);
    });
  }

  // =============================================
  // 9. CURSOR SPARKLE EFFECT
  // =============================================
  const sparkleColors = ['#f48fb1', '#ce93d8', '#e91e8c', '#ffd700', '#fff', '#c2185b'];

  document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.25) {
      createSparkle(e.clientX, e.clientY);
    }
  });

  function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    Object.assign(sparkle.style, {
      position: 'fixed',
      left: x + 'px',
      top: y + 'px',
      width: Math.random() * 6 + 3 + 'px',
      height: sparkle.style.width,
      background: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: '9999',
      transform: 'translate(-50%, -50%)',
      boxShadow: `0 0 6px ${sparkleColors[0]}`,
      animation: 'sparkle-fade 0.7s forwards',
    });
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 700);
  }

  // Inject sparkle CSS
  const sparkleCSS = document.createElement('style');
  sparkleCSS.textContent = `
    @keyframes sparkle-fade {
      0%   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      100% { opacity: 0; transform: translate(-50%, -150%) scale(0.3); }
    }
  `;
  document.head.appendChild(sparkleCSS);

  // =============================================
  // 10. TYPING EFFECT for hero tagline
  // =============================================
  const taglineEl = document.querySelector('.hero-tagline');
  if (taglineEl) {
    const text = taglineEl.textContent;
    taglineEl.textContent = '';
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        taglineEl.textContent += text[i];
        i++;
        setTimeout(typeChar, 60);
      }
    }
    setTimeout(typeChar, 1200);
  }

  // =============================================
  // 11. CARD TILT EFFECT
  // =============================================
  const cards = document.querySelectorAll('.art-card, .timeline-card, .stat-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // =============================================
  // 12. PAGE LOAD REVEAL
  // =============================================
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  window.addEventListener('load', () => {
    document.body.style.opacity = '1';
  });

});
