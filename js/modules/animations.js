/**
 * Animation System Module
 * Handles scroll-triggered animations, micro-interactions, and GSAP integration
 */

import { gsapLoader } from '../utils/gsap-loader.js';

export class AnimationSystem {
  constructor() {
    this.scrollTriggers = [];
    this.microInteractions = [];
    this.gsap = null;
    this.ScrollTrigger = null;
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;
    
    try {
      const gsapModules = await gsapLoader.loadGSAP();
      this.gsap = gsapModules.gsap;
      this.ScrollTrigger = gsapModules.ScrollTrigger;
      // Register ScrollTrigger plugin from the user's snippet
      this.gsap.registerPlugin(this.ScrollTrigger);
      
      this.setupScrollTriggers();
      this.setupMicroInteractions();
      this.setupParallaxEffects();
      this.setupLoadingAnimations();
      
      this.initialized = true;
      console.log('Animation system initialized with GSAP');
    } catch (error) {
      console.warn('GSAP failed to load, falling back to CSS animations:', error);
      this.setupFallbackAnimations();
      this.initialized = true;
    }
  }

  setupLoadingAnimations() {
    if (!this.gsap) return;

    // Animate loading screen elements
    const loadingLogo = document.querySelector('.loading-screen__logo');
    const loadingTitle = document.querySelector('.loading-screen__title');
    const loadingSubtitle = document.querySelector('.loading-screen__subtitle');
    const loadingProgress = document.querySelector('.loading-screen__progress');

    if (loadingLogo) {
      this.gsap.fromTo(loadingLogo, 
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)" }
      );
    }

    if (loadingTitle) {
      this.gsap.fromTo(loadingTitle,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
      );
    }

    if (loadingSubtitle) {
      this.gsap.fromTo(loadingSubtitle,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: "power2.out" }
      );
    }

    if (loadingProgress) {
      this.gsap.fromTo(loadingProgress,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.5, delay: 0.7, ease: "power2.out" }
      );
    }
  }

  // Respect reduced motion
  prefersReduced() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  // Simple text splitter (no paid plugin)
  splitLine(el) {
    const text = el.textContent;
    el.textContent = "";
    const frag = document.createDocumentFragment();
    for (const ch of text) {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = ch;
      frag.appendChild(span);
    }
    el.appendChild(frag);
    return el.querySelectorAll(".char");
  }

  heroIntro() {
    if (this.prefersReduced()) return;
    const lines = document.querySelectorAll(".hero__title-line");
    lines.forEach(el => this.splitLine(el));

    const tl = this.gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(".main-nav", { y: -20, autoAlpha: 0, duration: 0.4 })
      .from(".hero__title-line .char", { yPercent: 100, duration: 0.5, stagger: 0.015 }, "<")
      .from(".hero__subtitle", { autoAlpha: 0, y: 10, duration: 0.4 }, "-=0.2")
      .from(".hero__cta a", { autoAlpha: 0, y: 12, stagger: 0.08, duration: 0.4 }, "-=0.1");
  }

  cardsReveal() {
    const cards = this.gsap.utils.toArray(".artist-card");
    cards.forEach(card => {
      this.gsap.from(card, {
        autoAlpha: 0,
        y: 20,
        duration: this.prefersReduced() ? 0.001 : 0.5,
        scrollTrigger: { trigger: card, start: "top 80%" }
      });
    });
  }

  setupScrollTriggers() {
    if (!this.gsap || !this.ScrollTrigger) return;

    // Create scroll progress indicator
    this.createScrollProgressIndicator();

    // Call the user's custom animations
    this.heroIntro();
    this.cardsReveal();

    // Keep the other animations from the original file that don't conflict.
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
      const title = header.querySelector('.section-title');
      const subtitle = header.querySelector('.section-subtitle');
      
      const sectionTimeline = this.gsap.timeline({
        scrollTrigger: {
          trigger: header,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        }
      });

      if (title) {
        sectionTimeline.fromTo(title,
          { opacity: 0, y: 50, scale: 0.8, rotationY: 15 },
          { opacity: 1, y: 0, scale: 1, rotationY: 0, duration: 1, ease: "power3.out" }
        );
      }

      if (subtitle) {
        sectionTimeline.fromTo(subtitle,
          { opacity: 0, y: 30, x: -20 },
          { opacity: 1, y: 0, x: 0, duration: 0.8, ease: "power2.out" },
          "-=0.5"
        );
      }
    });

    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (portfolioItems.length > 0) {
      this.gsap.fromTo(portfolioItems,
        { opacity: 0, y: 60, scale: 0.8, rotationX: 45 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: {
            amount: 0.6,
            grid: "auto",
            from: "center",
            ease: "power2.out"
          },
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".portfolio-grid",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const finalValue = stat.textContent;
      const numericValue = parseInt(finalValue.replace(/\D/g, ''));
      
      if (numericValue) {
        this.gsap.fromTo(stat, 
          { textContent: 0 },
          {
            textContent: numericValue,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
              toggleActions: "play none none none"
            },
            onUpdate: function() {
              const current = Math.ceil(this.targets()[0].textContent);
              if (finalValue.includes('+')) {
                this.targets()[0].textContent = current + '+';
              } else if (finalValue.includes('%')) {
                this.targets()[0].textContent = current + '%';
              } else {
                this.targets()[0].textContent = current;
              }
            }
          }
        );
      }
    });

    this.setupSmoothScrollBehavior();
  }

  // NOTE: The rest of the original methods from the file are assumed to be here,
  // as they are not being changed. This includes:
  // setupMicroInteractions, setupParallaxEffects, setupFallbackAnimations, etc.
  // I will copy them from my previous read_file output.

  setupMicroInteractions() {
    if (!this.gsap) return;

    // Enhanced button hover animations with ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      // Create ripple container
      const rippleContainer = document.createElement('div');
      rippleContainer.className = 'btn-ripple-container';
      button.appendChild(rippleContainer);

      // Hover animations
      button.addEventListener('mouseenter', () => {
        this.gsap.to(button, {
          scale: 1.05,
          y: -2,
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          duration: 0.3,
          ease: "power2.out"
        });

        // Glow effect for primary buttons
        if (button.classList.contains('btn-primary')) {
          this.gsap.to(button, {
            boxShadow: "0 8px 25px rgba(var(--color-accent-rgb), 0.4), 0 0 20px rgba(var(--color-accent-rgb), 0.2)",
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });

      button.addEventListener('mouseleave', () => {
        this.gsap.to(button, {
          scale: 1,
          y: 0,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          duration: 0.3,
          ease: "power2.out"
        });
      });

      // Click ripple effect
      button.addEventListener('click', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.className = 'btn-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        rippleContainer.appendChild(ripple);

        this.gsap.fromTo(ripple,
          { scale: 0, opacity: 0.6 },
          { 
            scale: 4, 
            opacity: 0, 
            duration: 0.6, 
            ease: "power2.out",
            onComplete: () => ripple.remove()
          }
        );

        // Button press animation
        this.gsap.to(button, {
          scale: 0.95,
          duration: 0.1,
          ease: "power2.out",
          yoyo: true,
          repeat: 1
        });
      });
    });

    // Enhanced artist card hover effects with 3D transforms
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach(card => {
      const overlay = card.querySelector('.artist-card__overlay');
      const content = card.querySelector('.artist-card__content');
      const image = card.querySelector('.artist-card__img');
      const name = card.querySelector('.artist-card__name');
      const specialty = card.querySelector('.artist-card__specialty');
      const actions = card.querySelector('.artist-card__actions');

      // Set initial 3D perspective
      this.gsap.set(card, { transformPerspective: 1000 });

      card.addEventListener('mouseenter', () => {
        const tl = this.gsap.timeline();
        
        tl.to(card, {
          y: -15,
          scale: 1.03,
          rotationX: 5,
          rotationY: 2,
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
          duration: 0.4,
          ease: "power2.out"
        })
        .to(overlay, {
          opacity: 1,
          backdropFilter: "blur(10px)",
          duration: 0.3,
          ease: "power2.out"
        }, "-=0.2")
        .fromTo(content, 
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
          "-=0.1"
        );

        if (image) {
          tl.to(image, {
            scale: 1.1,
            filter: "brightness(1.1) contrast(1.1)",
            duration: 0.6,
            ease: "power2.out"
          }, 0);
        }

        // Stagger content animations
        if (name) {
          tl.fromTo(name, 
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
            "-=0.2"
          );
        }

        if (specialty) {
          tl.fromTo(specialty, 
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
            "-=0.1"
          );
        }

        if (actions) {
          tl.fromTo(actions, 
            { y: 10, opacity: 0, scale: 0.8 },
            { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" },
            "-=0.1"
          );
        }
      });

      card.addEventListener('mouseleave', () => {
        this.gsap.to(card, {
          y: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          duration: 0.4,
          ease: "power2.out"
        });

        this.gsap.to(overlay, {
          opacity: 0,
          backdropFilter: "blur(0px)",
          duration: 0.3,
          ease: "power2.out"
        });

        if (image) {
          this.gsap.to(image, {
            scale: 1,
            filter: "brightness(1) contrast(1)",
            duration: 0.6,
            ease: "power2.out"
          });
        }
      });

      // Mouse move parallax effect
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        this.gsap.to(card, {
          rotationY: x * 10,
          rotationX: -y * 10,
          duration: 0.3,
          ease: "power2.out"
        });

        if (image) {
          this.gsap.to(image, {
            x: x * 15,
            y: y * 15,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    });

    // Enhanced navigation link hover effects
    const navLinks = document.querySelectorAll('.main-nav__link');
    navLinks.forEach(link => {
      // Create underline element
      const underline = document.createElement('div');
      underline.className = 'nav-link-underline';
      link.appendChild(underline);

      link.addEventListener('mouseenter', () => {
        this.gsap.to(link, {
          color: 'var(--color-accent)',
          y: -2,
          duration: 0.3,
          ease: "power2.out"
        });

        this.gsap.to(underline, {
          scaleX: 1,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      link.addEventListener('mouseleave', () => {
        if (!link.classList.contains('main-nav__link--active')) {
          this.gsap.to(link, {
            color: 'var(--color-text-secondary)',
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });

          this.gsap.to(underline, {
            scaleX: 0,
            opacity: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    });

    // Portfolio item hover effects
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
      const overlay = item.querySelector('.portfolio-overlay');
      const info = item.querySelector('.portfolio-info');
      const img = item.querySelector('.portfolio-img');

      item.addEventListener('mouseenter', () => {
        const tl = this.gsap.timeline();
        
        tl.to(item, {
          scale: 1.05,
          y: -5,
          boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
          duration: 0.3,
          ease: "power2.out"
        })
        .to(overlay, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        }, 0)
        .fromTo(info,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" },
          "-=0.1"
        );

        if (img) {
          tl.to(img, {
            scale: 1.1,
            filter: "brightness(1.1)",
            duration: 0.4,
            ease: "power2.out"
          }, 0);
        }
      });

      item.addEventListener('mouseleave', () => {
        this.gsap.to(item, {
          scale: 1,
          y: 0,
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          duration: 0.3,
          ease: "power2.out"
        });

        this.gsap.to(overlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        });

        if (img) {
          this.gsap.to(img, {
            scale: 1,
            filter: "brightness(1)",
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });
    });

    // Form input focus animations
    this.setupFormMicroInteractions();

    // Social link hover effects
    this.setupSocialLinkAnimations();

    // Logo hover animation
    this.setupLogoAnimation();
  }

  setupParallaxEffects() {
    if (!this.gsap || !this.ScrollTrigger) return;

    // Enhanced hero background parallax with multiple layers
    const heroVideo = document.querySelector('.hero__video');
    const heroImg = document.querySelector('.hero__background-img');
    const heroOverlay = document.querySelector('.hero__overlay');

    if (heroVideo) {
      this.gsap.to(heroVideo, {
        yPercent: -30,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }

    if (heroImg) {
      this.gsap.to(heroImg, {
        yPercent: -30,
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }

    if (heroOverlay) {
      this.gsap.to(heroOverlay, {
        opacity: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Enhanced scroll indicator with bounce animation
    const scrollIndicator = document.querySelector('.hero__scroll-indicator');
    if (scrollIndicator) {
      // Continuous bounce animation
      this.gsap.to(scrollIndicator, {
        y: 10,
        duration: 1.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Fade out on scroll
      this.gsap.to(scrollIndicator, {
        opacity: 0,
        y: -30,
        scale: 0.8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "50% top",
          scrub: true
        }
      });
    }

    // Parallax effect for section backgrounds
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      this.gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Artist card images parallax on hover
    const artistCardImages = document.querySelectorAll('.artist-card__img');
    artistCardImages.forEach(img => {
      const card = img.closest('.artist-card');
      if (card) {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;
          
          this.gsap.to(img, {
            x: x * 20,
            y: y * 20,
            rotationY: x * 10,
            rotationX: -y * 10,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        card.addEventListener('mouseleave', () => {
          this.gsap.to(img, {
            x: 0,
            y: 0,
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "power2.out"
          });
        });
      }
    });
  }

  setupFallbackAnimations() {
    // Fallback to CSS animations when GSAP is not available
    console.log('Using CSS fallback animations');
    
    // Add CSS animation classes to elements
    const heroTitleLines = document.querySelectorAll('.hero__title-line');
    heroTitleLines.forEach((line, index) => {
      setTimeout(() => {
        line.classList.add('animate-fade-in-up');
      }, 1000 + (index * 200));
    });

    const heroSubtitle = document.querySelector('.hero__subtitle');
    if (heroSubtitle) {
      setTimeout(() => {
        heroSubtitle.classList.add('animate-fade-in-up');
      }, 1800);
    }

    const heroCta = document.querySelector('.hero__cta');
    if (heroCta) {
      setTimeout(() => {
        heroCta.classList.add('animate-fade-in-up');
      }, 2200);
    }

    // Setup intersection observer for scroll animations
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section-title, .section-subtitle, .artist-card');
    animateElements.forEach(el => observer.observe(el));
  }

  // Public methods for triggering animations
  animateElement(element, animation = 'fadeInUp', duration = 0.8, delay = 0) {
    if (!this.gsap || !element) return;

    const animations = {
      fadeInUp: { opacity: 0, y: 30 },
      fadeInLeft: { opacity: 0, x: -30 },
      fadeInRight: { opacity: 0, x: 30 },
      scaleIn: { opacity: 0, scale: 0.8 },
      slideInUp: { opacity: 0, y: 100 }
    };

    const fromVars = animations[animation] || animations.fadeInUp;
    const toVars = { opacity: 1, x: 0, y: 0, scale: 1, duration, delay, ease: "power2.out" };

    this.gsap.fromTo(element, fromVars, toVars);
  }

  createTimeline() {
    return this.gsap ? this.gsap.timeline() : null;
  }

  isGSAPLoaded() {
    return !!this.gsap;
  }

  // Enhanced scroll-triggered animation methods
  createScrollProgressIndicator() {
    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress__bar"></div>';
    document.body.appendChild(progressBar);

    // Animate progress bar based on scroll
    this.gsap.to('.scroll-progress__bar', {
      scaleX: 1,
      transformOrigin: "left center",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    // Show/hide progress bar
    this.ScrollTrigger.create({
      start: "top -80",
      end: "max",
      onUpdate: (self) => {
        if (self.progress > 0.05) {
          progressBar.classList.add('scroll-progress--visible');
        } else {
          progressBar.classList.remove('scroll-progress--visible');
        }
      }
    });
  }

  setupSmoothScrollBehavior() {
    // Enhanced smooth scrolling with momentum
    const scrollLinks = document.querySelectorAll('[data-scroll-to]');
    scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.dataset.scrollTo;
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          this.gsap.to(window, {
            duration: 1.5,
            scrollTo: {
              y: targetElement,
              offsetY: 80,
              autoKill: false
            },
            ease: "power3.inOut"
          });
        }
      });
    });
  }

  triggerArtistCardsAnimation() {
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animate-in');
      }, index * 100);
    });
  }

  resetArtistCardsAnimation() {
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach(card => {
      card.classList.remove('animate-in');
    });
  }

  // Advanced intersection observer for complex animations
  setupAdvancedIntersectionObserver() {
    const observerOptions = {
      threshold: [0, 0.25, 0.5, 0.75, 1],
      rootMargin: '-10% 0px -10% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        const ratio = entry.intersectionRatio;
        
        // Progressive animation based on intersection ratio
        if (this.gsap) {
          this.gsap.to(element, {
            opacity: ratio,
            scale: 0.8 + (ratio * 0.2),
            y: (1 - ratio) * 50,
            duration: 0.3,
            ease: "power2.out"
          });
        }

        // Add/remove classes based on visibility
        if (ratio > 0.5) {
          element.classList.add('in-view');
        } else {
          element.classList.remove('in-view');
        }
      });
    }, observerOptions);

    // Observe elements with advanced animation
    const advancedElements = document.querySelectorAll('[data-advanced-scroll]');
    advancedElements.forEach(el => observer.observe(el));
  }

  // Scroll-triggered timeline coordination
  createScrollTimeline(trigger, animations) {
    if (!this.gsap || !this.ScrollTrigger) return null;

    const timeline = this.gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
        ...animations.scrollTrigger
      }
    });

    animations.steps.forEach((step, index) => {
      timeline.to(step.target, {
        ...step.properties,
        duration: step.duration || 0.8,
        ease: step.ease || "power2.out"
      }, step.position || index * 0.2);
    });

    return timeline;
  }

  // Form micro-interactions
  setupFormMicroInteractions() {
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
      const container = input.closest('.form-group') || input.parentElement;
      
      // Focus animations
      input.addEventListener('focus', () => {
        if (this.gsap) {
          this.gsap.to(container, {
            scale: 1.02,
            boxShadow: "0 0 20px rgba(var(--color-accent-rgb), 0.2)",
            duration: 0.3,
            ease: "power2.out"
          });

          this.gsap.to(input, {
            borderColor: 'var(--color-accent)',
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });

      // Blur animations
      input.addEventListener('blur', () => {
        if (this.gsap) {
          this.gsap.to(container, {
            scale: 1,
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            duration: 0.3,
            ease: "power2.out"
          });

          this.gsap.to(input, {
            borderColor: 'var(--color-border)',
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });

      // Typing animation
      input.addEventListener('input', ().
        if (this.gsap && input.value) {
          this.gsap.fromTo(input, 
            { scale: 1.01 },
            { scale: 1, duration: 0.1, ease: "power2.out" }
          );
        }
      });
    });

    // Form validation feedback animations
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        const invalidInputs = form.querySelectorAll(':invalid');
        invalidInputs.forEach(input => {
          if (this.gsap) {
            this.gsap.fromTo(input,
              { x: -5 },
              { 
                x: 5, 
                duration: 0.1, 
                ease: "power2.inOut",
                yoyo: true,
                repeat: 3,
                onComplete: () => {
                  this.gsap.set(input, { x: 0 });
                }
              }
            );
          }
        });
      });
    });
  }

  // Social link animations
  setupSocialLinkAnimations() {
    const socialLinks = document.querySelectorAll('.social-link, .footer-social-link');
    socialLinks.forEach(link => {
      const icon = link.querySelector('svg');
      
      link.addEventListener('mouseenter', () => {
        if (this.gsap) {
          this.gsap.to(link, {
            scale: 1.2,
            y: -3,
            rotation: 5,
            duration: 0.3,
            ease: "back.out(1.7)"
          });

          if (icon) {
            this.gsap.to(icon, {
              fill: 'var(--color-accent)',
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });

      link.addEventListener('mouseleave', () => {
        if (this.gsap) {
          this.gsap.to(link, {
            scale: 1,
            y: 0,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out"
          });

          if (icon) {
            this.gsap.to(icon, {
              fill: 'currentColor',
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });

      // Click animation
      link.addEventListener('click', () => {
        if (this.gsap) {
          this.gsap.fromTo(link,
            { scale: 1.2 },
            { 
              scale: 1.1, 
              duration: 0.1, 
              ease: "power2.out",
              yoyo: true,
              repeat: 1
            }
          );
        }
      });
    });
  }

  // Logo animation
  setupLogoAnimation() {
    const logoLinks = document.querySelectorAll('.main-nav__logo a, .footer-logo');
    logoLinks.forEach(logo => {
      const img = logo.querySelector('img');
      const text = logo.querySelector('.main-nav__logo-text, .footer-logo-text');
      
      logo.addEventListener('mouseenter', () => {
        if (this.gsap) {
          this.gsap.to(logo, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });

          if (img) {
            this.gsap.to(img, {
              rotation: 5,
              duration: 0.3,
              ease: "power2.out"
            });
          }

          if (text) {
            this.gsap.to(text, {
              color: 'var(--color-accent)',
              letterSpacing: '0.1em',
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });

      logo.addEventListener('mouseleave', () => {
        if (this.gsap) {
          this.gsap.to(logo, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });

          if (img) {
            this.gsap.to(img, {
              rotation: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          }

          if (text) {
            this.gsap.to(text, {
              color: 'currentColor',
              letterSpacing: '0',
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });
    });
  }

  // Advanced click feedback system
  createClickFeedback(element, options = {}) {
    if (!this.gsap) return;

    const defaults = {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
      ripple: true,
      glow: false
    };

    const settings = { ...defaults, ...options };

    element.addEventListener('click', (e) => {
      // Scale animation
      this.gsap.fromTo(element,
        { scale: 1 },
        { 
          scale: settings.scale,
          duration: settings.duration,
          ease: settings.ease,
          yoyo: true,
          repeat: 1
        }
      );

      // Ripple effect
      if (settings.ripple) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        element.appendChild(ripple);

        this.gsap.fromTo(ripple,
          { scale: 0, opacity: 0.6 },
          { 
            scale: 3, 
            opacity: 0, 
            duration: 0.6, 
            ease: "power2.out",
            onComplete: () => ripple.remove()
          }
        );
      }

      // Glow effect
      if (settings.glow) {
        this.gsap.fromTo(element,
          { boxShadow: "0 0 0px rgba(var(--color-accent-rgb), 0)" },
          { 
            boxShadow: "0 0 20px rgba(var(--color-accent-rgb), 0.6)",
            duration: 0.3,
            ease: "power2.out",
            yoyo: true,
            repeat: 1
          }
        );
      }
    });
  }
}