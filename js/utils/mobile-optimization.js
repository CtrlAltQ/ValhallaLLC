/**
 * Mobile Optimization Utility
 * Handles touch-friendly interactions, mobile performance, and responsive enhancements
 */

class MobileOptimization {
  constructor() {
    this.isMobile = this.detectMobile();
    this.isTouch = this.detectTouch();
    this.touchStartTime = 0;
    this.touchStartPos = { x: 0, y: 0 };
    this.touchThreshold = 10; // pixels
    this.tapTimeout = 300; // milliseconds
    
    this.init();
  }

  init() {
    if (this.isMobile || this.isTouch) {
      this.optimizeTouchInteractions();
      this.enhanceButtonSizing();
      this.optimizeScrolling();
      this.setupTouchFeedback();
      this.optimizeImageLoading();
      this.setupPullToRefresh();
    }
    
    this.setupResponsiveNavigation();
    this.optimizeFormExperience();
  }

  detectMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           window.innerWidth <= 768;
  }

  detectTouch() {
    return 'ontouchstart' in window || 
           navigator.maxTouchPoints > 0 || 
           navigator.msMaxTouchPoints > 0;
  }

  /**
   * Optimize touch interactions for better mobile experience
   */
  optimizeTouchInteractions() {
    // Remove 300ms click delay on mobile
    document.addEventListener('touchstart', () => {}, { passive: true });
    
    // Add touch-friendly classes
    document.body.classList.add('touch-device');
    if (this.isMobile) {
      document.body.classList.add('mobile-device');
    }

    // Enhance touch targets
    this.enhanceTouchTargets();
    
    // Setup better touch scrolling
    this.setupTouchScrolling();
  }

  /**
   * Enhance touch targets to meet accessibility guidelines (44px minimum)
   */
  enhanceTouchTargets() {
    const touchTargets = document.querySelectorAll('button, a, input, select, textarea, [role="button"]');
    
    touchTargets.forEach(target => {
      const rect = target.getBoundingClientRect();
      const minSize = 44; // WCAG recommended minimum
      
      if (rect.width < minSize || rect.height < minSize) {
        target.classList.add('touch-enhanced');
        
        // Add padding to increase touch area without changing visual appearance
        const currentPadding = parseInt(getComputedStyle(target).padding) || 0;
        const neededPadding = Math.max(0, (minSize - Math.max(rect.width, rect.height)) / 2);
        
        if (neededPadding > currentPadding) {
          target.style.setProperty('--touch-padding', `${neededPadding}px`);
        }
      }
    });
  }

  /**
   * Enhance button sizing for mobile
   */
  enhanceButtonSizing() {
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .btn {
          min-height: 48px;
          padding: 12px 24px;
          font-size: 16px; /* Prevents zoom on iOS */
        }
        
        .btn-sm {
          min-height: 44px;
          padding: 10px 20px;
          font-size: 14px;
        }
        
        .btn-lg {
          min-height: 56px;
          padding: 16px 32px;
          font-size: 18px;
        }
        
        .touch-enhanced {
          padding: calc(var(--touch-padding, 0px) + var(--original-padding, 8px));
        }
        
        /* Improve tap targets for navigation */
        .nav__link,
        .main-nav__link {
          min-height: 48px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
        }
        
        /* Social media links */
        .social-link,
        .footer-social-link {
          min-width: 48px;
          min-height: 48px;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Setup smooth touch scrolling
   */
  setupTouchScrolling() {
    // Enable momentum scrolling on iOS
    document.body.style.webkitOverflowScrolling = 'touch';
    
    // Improve scroll performance
    const scrollElements = document.querySelectorAll('.portfolio-gallery, .lightbox-content, .blog-content');
    scrollElements.forEach(element => {
      element.style.webkitOverflowScrolling = 'touch';
      element.style.overflowScrolling = 'touch';
    });
  }

  /**
   * Optimize scrolling behavior for mobile
   */
  optimizeScrolling() {
    let ticking = false;
    let lastScrollY = window.scrollY;
    
    const optimizedScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      
      // Hide/show navigation based on scroll direction
      const nav = document.querySelector('.main-nav');
      if (nav) {
        if (scrollDirection === 'down' && currentScrollY > 100) {
          nav.classList.add('nav-hidden');
        } else if (scrollDirection === 'up') {
          nav.classList.remove('nav-hidden');
        }
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(optimizedScroll);
        ticking = true;
      }
    }, { passive: true });
  }

  /**
   * Setup touch feedback for better user experience
   */
  setupTouchFeedback() {
    // Add visual feedback for touch interactions
    const style = document.createElement('style');
    style.textContent = `
      .touch-device .btn:active,
      .touch-device .nav__link:active,
      .touch-device .card:active {
        transform: scale(0.98);
        transition: transform 0.1s ease;
      }
      
      .touch-device .gallery-item:active {
        transform: scale(0.95);
        transition: transform 0.1s ease;
      }
      
      /* Haptic feedback simulation */
      @keyframes haptic-feedback {
        0% { transform: scale(1); }
        50% { transform: scale(0.98); }
        100% { transform: scale(1); }
      }
      
      .haptic-feedback {
        animation: haptic-feedback 0.1s ease;
      }
    `;
    document.head.appendChild(style);

    // Add haptic feedback for supported devices
    document.addEventListener('touchstart', (e) => {
      const target = e.target.closest('button, .btn, .card, .gallery-item');
      if (target && 'vibrate' in navigator) {
        navigator.vibrate(10); // Very short vibration
      }
    }, { passive: true });
  }

  /**
   * Optimize image loading for mobile
   */
  optimizeImageLoading() {
    // Reduce image quality on slower connections
    if ('connection' in navigator) {
      const connection = navigator.connection;
      if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
        document.body.classList.add('slow-connection');
        
        // Add CSS for reduced quality images
        const style = document.createElement('style');
        style.textContent = `
          .slow-connection img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
        `;
        document.head.appendChild(style);
      }
    }

    // Prioritize above-the-fold images on mobile
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px', // Load images 50px before they come into view
      threshold: 0.1
    });

    // Observe all lazy-loaded images
    document.querySelectorAll('img[data-src]').forEach(img => {
      observer.observe(img);
    });
  }

  /**
   * Setup responsive navigation for mobile
   */
  setupResponsiveNavigation() {
    const nav = document.querySelector('.main-nav');
    const toggle = document.querySelector('.main-nav__toggle');
    const menu = document.querySelector('.main-nav__menu');
    
    if (!nav || !toggle || !menu) return;

    // Show mobile toggle on small screens
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    
    const handleMobileNav = (e) => {
      if (e.matches) {
        toggle.style.display = 'flex';
        menu.classList.add('mobile-menu');
        this.setupMobileMenu();
      } else {
        toggle.style.display = 'none';
        menu.classList.remove('mobile-menu', 'mobile-menu--open');
        this.cleanupMobileMenu();
      }
    };

    mediaQuery.addListener(handleMobileNav);
    handleMobileNav(mediaQuery);
  }

  /**
   * Setup mobile menu functionality
   */
  setupMobileMenu() {
    const toggle = document.querySelector('.main-nav__toggle');
    const menu = document.querySelector('.main-nav__menu');
    const menuLinks = document.querySelectorAll('.main-nav__link');
    
    if (!toggle || !menu) return;

    // Toggle menu
    const toggleMenu = () => {
      const isOpen = menu.classList.contains('mobile-menu--open');
      
      if (isOpen) {
        this.closeMobileMenu();
      } else {
        this.openMobileMenu();
      }
    };

    toggle.addEventListener('click', toggleMenu);

    // Close menu when clicking links
    menuLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.closeMobileMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && menu.classList.contains('mobile-menu--open')) {
        this.closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('mobile-menu--open')) {
        this.closeMobileMenu();
      }
    });
  }

  openMobileMenu() {
    const toggle = document.querySelector('.main-nav__toggle');
    const menu = document.querySelector('.main-nav__menu');
    
    menu.classList.add('mobile-menu--open');
    toggle.classList.add('main-nav__toggle--active');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mobile-menu-open');
    
    // Focus first menu item
    const firstLink = menu.querySelector('.main-nav__link');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }

  closeMobileMenu() {
    const toggle = document.querySelector('.main-nav__toggle');
    const menu = document.querySelector('.main-nav__menu');
    
    menu.classList.remove('mobile-menu--open');
    toggle.classList.remove('main-nav__toggle--active');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mobile-menu-open');
  }

  cleanupMobileMenu() {
    const toggle = document.querySelector('.main-nav__toggle');
    const menu = document.querySelector('.main-nav__menu');
    
    if (toggle) {
      toggle.removeEventListener('click', this.toggleMenu);
    }
    
    document.body.classList.remove('mobile-menu-open');
  }

  /**
   * Optimize form experience for mobile
   */
  optimizeFormExperience() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      const inputs = form.querySelectorAll('input, textarea, select');
      
      inputs.forEach(input => {
        // Prevent zoom on iOS when focusing inputs
        if (input.type !== 'file') {
          const currentFontSize = getComputedStyle(input).fontSize;
          if (parseInt(currentFontSize) < 16) {
            input.style.fontSize = '16px';
          }
        }
        
        // Add better mobile keyboard types
        if (input.type === 'email') {
          input.setAttribute('inputmode', 'email');
        } else if (input.type === 'tel') {
          input.setAttribute('inputmode', 'tel');
        } else if (input.type === 'number') {
          input.setAttribute('inputmode', 'numeric');
        }
        
        // Improve mobile form validation
        input.addEventListener('blur', () => {
          if (input.validity.valid) {
            input.classList.add('valid');
            input.classList.remove('invalid');
          } else {
            input.classList.add('invalid');
            input.classList.remove('valid');
          }
        });
      });
    });
  }

  /**
   * Setup pull-to-refresh functionality
   */
  setupPullToRefresh() {
    if (!this.isMobile) return;

    let startY = 0;
    let currentY = 0;
    let pullDistance = 0;
    let isPulling = false;
    let refreshThreshold = 80;
    
    const refreshIndicator = this.createRefreshIndicator();
    
    document.addEventListener('touchstart', (e) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
        isPulling = true;
      }
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
      if (!isPulling) return;
      
      currentY = e.touches[0].clientY;
      pullDistance = currentY - startY;
      
      if (pullDistance > 0 && window.scrollY === 0) {
        e.preventDefault();
        
        const progress = Math.min(pullDistance / refreshThreshold, 1);
        this.updateRefreshIndicator(refreshIndicator, progress);
        
        if (pullDistance > refreshThreshold) {
          refreshIndicator.classList.add('ready');
        } else {
          refreshIndicator.classList.remove('ready');
        }
      }
    }, { passive: false });
    
    document.addEventListener('touchend', () => {
      if (isPulling && pullDistance > refreshThreshold) {
        this.triggerRefresh(refreshIndicator);
      } else {
        this.hideRefreshIndicator(refreshIndicator);
      }
      
      isPulling = false;
      pullDistance = 0;
    }, { passive: true });
  }

  createRefreshIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'pull-refresh-indicator';
    indicator.innerHTML = `
      <div class="pull-refresh-spinner">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M23 4v6h-6M1 20v-6h6"/>
          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
        </svg>
      </div>
      <span class="pull-refresh-text">Pull to refresh</span>
    `;
    
    document.body.insertBefore(indicator, document.body.firstChild);
    return indicator;
  }

  updateRefreshIndicator(indicator, progress) {
    indicator.style.transform = `translateY(${progress * 60}px)`;
    indicator.style.opacity = progress;
    
    const spinner = indicator.querySelector('.pull-refresh-spinner');
    spinner.style.transform = `rotate(${progress * 180}deg)`;
    
    if (progress >= 1) {
      indicator.querySelector('.pull-refresh-text').textContent = 'Release to refresh';
    } else {
      indicator.querySelector('.pull-refresh-text').textContent = 'Pull to refresh';
    }
  }

  triggerRefresh(indicator) {
    indicator.classList.add('refreshing');
    indicator.querySelector('.pull-refresh-text').textContent = 'Refreshing...';
    
    // Simulate refresh (in a real app, this would reload content)
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  hideRefreshIndicator(indicator) {
    indicator.style.transform = 'translateY(-100%)';
    indicator.style.opacity = '0';
    indicator.classList.remove('ready', 'refreshing');
    
    setTimeout(() => {
      indicator.style.transform = '';
      indicator.style.opacity = '';
    }, 300);
  }

  /**
   * Get device information for analytics
   */
  getDeviceInfo() {
    return {
      isMobile: this.isMobile,
      isTouch: this.isTouch,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      orientation: screen.orientation ? screen.orientation.angle : 0,
      connection: navigator.connection ? {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt
      } : null
    };
  }
}

// Auto-initialize
const mobileOptimization = new MobileOptimization();

export default mobileOptimization;