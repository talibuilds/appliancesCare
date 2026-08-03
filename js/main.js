document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll header effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Intersection Observer for Reveals
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 3. Testimonial Carousel Logic
  let slideIndex = 0;
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  let carouselTimer;

  function showSlides(n) {
    if (slides.length === 0) return;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slideIndex = n;
    if (slideIndex >= slides.length) slideIndex = 0;
    if (slideIndex < 0) slideIndex = slides.length - 1;

    slides[slideIndex].classList.add('active');
    dots[slideIndex].classList.add('active');
  }

  function nextSlide() {
    showSlides(slideIndex + 1);
  }

  function startCarousel() {
    carouselTimer = setInterval(nextSlide, 5000);
  }

  function resetCarousel() {
    clearInterval(carouselTimer);
    startCarousel();
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlides(index);
      resetCarousel();
    });
  });

  // Initialize carousel
  showSlides(0);
  startCarousel();

  // 4. Booking Form Simulation
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = bookingForm.querySelector('button[type="submit"]');
      const originalText = btn.innerText;
      
      btn.innerHTML = 'Processing...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = 'Booking Confirmed ✓';
        btn.style.backgroundColor = '#4CAF50';
        btn.style.color = '#fff';
        bookingForm.reset();
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.backgroundColor = '';
          btn.style.color = '';
          btn.style.opacity = '1';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // 5. Add subtle cooling particles to Hero
  const heroOverlay = document.querySelector('.hero-overlay');
  if (heroOverlay) {
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.classList.add('cooling-particle');
      
      const size = Math.random() * 80 + 20;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
      
      heroOverlay.appendChild(particle);
    }
  }
});
