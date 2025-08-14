/**
 * Homepage Interactive Module
 * Handles hero section animations, artist grid interactions, and smooth scrolling
 */

export class Homepage {
  constructor() {
    this.loadingScreen = null;
    this.navigation = null;
    this.heroSection = null;
    this.artistGrid = null;
    this.scrollElements = [];
    this.initialized = false;
    this.isScrolling = false;
  }

  init() {
    if (this.initialized) return;
    
    this.loadingScreen = document.getElementById('loadingScreen');
    this.navigation = document.getElementById('mainNav');
    this.heroSection = document.querySelector('.hero');
    this.artistGrid = document.querySelector('.artist-grid');
    
    this.setupLoadingSequence();
    this.setupNavigation();
    this.setupHeroAnimations();
    this.setupArtistGridInteractions();
    this.setupSmoothScrolling();
    this.setupScrollEffects();
    
    this.initialized = true;
  }

  setupLoadingSequence() {
    // Show loading screen initially
    if (this.loadingScreen) {
      // Shorter loading time and add fallback
      setTimeout(() => {
        this.hideLoadingScreen();
      }, 2000);
      
      // Emergency fallback in case something goes wrong
      setTimeout(() => {
        if (this.loadingScreen && !this.loadingScreen.classList.contains('loading-screen--hidden')) {
          console.warn('Loading screen timeout - forcing hide');
          this.forceHideLoadingScreen();
        }
      }, 5000);
    }
  }

  forceHideLoadingScreen() {
    if (this.loadingScreen) {
      this.loadingScreen.style.display = 'none';
      if (this.navigation) {
        this.navigation.classList.add('main-nav--visible');
      }
    }
  }

  hideLoadingScreen() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add('loading-screen--hidden');
      
      // Show navigation after loading
      setTimeout(() => {
        if (this.navigation) {
          this.navigation.classList.add('main-nav--visible');
        }
      }, 500);
      
      // Remove loading screen from DOM after animation
      setTimeout(() => {
        this.loadingScreen.remove();
      }, 1000);
    }
  }

  setupNavigation() {
    if (!this.navigation) return;

    const navToggle = document.getElementById('navToggle');
    const navMenu = this.navigation.querySelector('.main-nav__menu');
    const navLinks = this.navigation.querySelectorAll('.main-nav__link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('main-nav__toggle--active');
        navMenu.classList.toggle('main-nav__menu--open');
      });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navToggle && navMenu) {
          navToggle.classList.remove('main-nav__toggle--active');
          navMenu.classList.remove('main-nav__menu--open');
        }
      });
    });

    // Navigation scroll effects
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // Add scrolled class when scrolling down
      if (currentScrollY > 50) {
        this.navigation.classList.add('main-nav--scrolled');
      } else {
        this.navigation.classList.remove('main-nav--scrolled');
      }
      
      lastScrollY = currentScrollY;
    });

    // Update active navigation link based on scroll position
    this.updateActiveNavLink();
  }

  setupHeroAnimations() {
    if (!this.heroSection) return;

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
      if (this.isScrolling) return;
      
      this.isScrolling = true;
      requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const heroVideo = this.heroSection.querySelector('.hero__video');
        const heroImg = this.heroSection.querySelector('.hero__background-img');
        
        if (heroVideo) {
          heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        if (heroImg) {
          heroImg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        this.isScrolling = false;
      });
    });

    // Hero scroll indicator click
    const scrollIndicator = this.heroSection.querySelector('.hero__scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        this.smoothScrollTo(this.artistGrid);
      });
    }
  }

  setupArtistGridInteractions() {
    if (!this.artistGrid) return;

    const artistCards = this.artistGrid.querySelectorAll('.artist-card');
    
    artistCards.forEach(card => {
      // Enhanced hover effects
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-12px) scale(1.03)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });

      // Click to view portfolio
      card.addEventListener('click', (e) => {
        if (e.target.closest('.artist-card__actions')) return;
        
        const artistName = card.dataset.artist;
        if (artistName) {
          window.location.href = `portfolio/${artistName}.html`;
        }
      });

      // Handle booking buttons
      const bookingButtons = card.querySelectorAll('[data-artist]');
      bookingButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          const artistName = button.dataset.artist;
          this.preSelectArtist(artistName);
        });
      });
    });

    // Intersection Observer for scroll animations
    this.setupScrollReveal();
  }

  setupSmoothScrolling() {
    // Handle all scroll-to links
    const scrollLinks = document.querySelectorAll('[data-scroll-to]');
    
    scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.dataset.scrollTo;
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          this.smoothScrollTo(targetElement);
        }
      });
    });
  }

  setupScrollEffects() {
    // Throttled scroll handler for performance
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateActiveNavLink();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  setupScrollReveal() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          
          // Add stagger effect for artist cards
          if (entry.target.classList.contains('artist-grid__container')) {
            const cards = entry.target.querySelectorAll('.artist-card');
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, index * 150);
            });
          }
        }
      });
    }, observerOptions);

    // Observe elements for scroll reveal
    const revealElements = document.querySelectorAll('.section-header, .artist-grid__container');
    revealElements.forEach(el => {
      el.classList.add('scroll-reveal');
      observer.observe(el);
    });

    // Initially hide artist cards for stagger effect
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(40px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
  }

  smoothScrollTo(element, offset = 80) {
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav__link');
    
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionHeight = section.offsetHeight;
      
      if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
        currentSection = section.id;
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('main-nav__link--active');
      if (link.dataset.scrollTo === currentSection) {
        link.classList.add('main-nav__link--active');
      }
    });
  }

  preSelectArtist(artistName) {
    // Store artist selection for contact form
    sessionStorage.setItem('selectedArtist', artistName);
    
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      this.smoothScrollTo(contactSection);
    }
  }

  // Public method to trigger animations
  triggerHeroAnimations() {
    const heroTitle = this.heroSection?.querySelector('.hero__title');
    const heroSubtitle = this.heroSection?.querySelector('.hero__subtitle');
    const heroCta = this.heroSection?.querySelector('.hero__cta');
    
    if (heroTitle) {
      heroTitle.classList.add('animate-fade-in-up');
    }
    if (heroSubtitle) {
      heroSubtitle.classList.add('animate-fade-in-up');
    }
    if (heroCta) {
      heroCta.classList.add('animate-fade-in-up');
    }
  }
}