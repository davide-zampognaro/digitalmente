/* ============================================
   DIGITALMENTE — Main JavaScript
   Animations, Interactions & Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Loading Screen (only on homepage) ----
  const loader = document.getElementById('loader');
  const loaderText = document.getElementById('loaderText');

  if (loader && loaderText) {
    const word = 'Digitalmente';
    
    // Animate loader text letter by letter
    word.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.animationDelay = `${i * 0.05}s`;
      loaderText.appendChild(span);
    });

    // Hide loader after animation
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = 'auto';
      // Trigger hero animations after loader
      setTimeout(animateHero, 300);
    }, 2600);
  } else {
    // No loader — ensure body is scrollable and trigger hero if present
    document.body.style.overflow = 'auto';
    animateHero();
  }

  // ---- Hero Title Animation ----
  function animateHero() {
    const lines = document.querySelectorAll('.hero-title .line-inner');
    lines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add('visible');
      }, i * 200);
    });
  }

  // ---- Custom Cursor ----
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');
  
  if (cursorDot && cursorOutline && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    });

    // Smooth follow for outline
    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.12;
      outlineY += (mouseY - outlineY) * 0.12;
      cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('[data-hover], a, button');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovering'));
    });
  }

  // ---- Navigation Scroll Effect ----
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  });

  // ---- Mobile Menu Toggle ----
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }

  // ---- Scroll Reveal ----
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('[data-count]');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-count'));
        animateCounter(entry.target, target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  function animateCounter(element, target) {
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    
    function update() {
      current += step;
      if (current >= target) {
        element.textContent = target + '+';
        return;
      }
      element.textContent = Math.floor(current);
      requestAnimationFrame(update);
    }
    update();
  }

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Parallax on Hero shapes ----
  if (window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      const shapes = document.querySelectorAll('.hero-shape');
      shapes.forEach((shape, i) => {
        const speed = (i + 1) * 0.15;
        shape.style.transform = `translateY(${scrollY * speed}px)`;
      });
    });
  }

  // ---- Portfolio tilt effect ----
  if (window.innerWidth > 768) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        item.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
      });
      item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
        item.style.transition = 'transform 0.5s ease';
      });
      item.addEventListener('mouseenter', () => {
        item.style.transition = 'none';
      });
    });
  }

});
