/**
 * Progressive Enhancement Utilities
 * Handles feature detection and graceful degradation
 */

export class ProgressiveEnhancement {
  constructor() {
    this.features = {
      webp: null,
      intersectionObserver: null,
      lazyLoading: null,
      serviceWorker: null,
      webGL: null,
      touchEvents: null
    };
    
    this.init();
  }

  /**
   * Initialize feature detection
   */
  async init() {
    await this.detectFeatures();
    this.applyFeatureClasses();
    this.setupFallbacks();
  }

  /**
   * Detect browser features
   */
  async detectFeatures() {
    // WebP support
    this.features.webp = await this.detectWebP();
    
    // Intersection Observer
    this.features.intersectionObserver = 'IntersectionObserver' in window;
    
    // Native lazy loading
    this.features.lazyLoading = 'loading' in HTMLImageElement.prototype;
    
    // Service Worker
    this.features.serviceWorker = 'serviceWorker' in navigator;
    
    // WebGL
    this.features.webGL = this.detectWebGL();
    
    // Touch events
    this.features.touchEvents = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    console.log('Feature detection complete:', this.features);
  }

  /**
   * Detect WebP support
   * @returns {Promise<boolean>}
   */
  detectWebP() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  /**
   * Detect WebGL support
   * @returns {boolean}
   */
  detectWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && canvas.getContext('webgl'));
    } catch (e) {
      return false;
    }
  }

  /**
   * Apply feature classes to document
   */
  applyFeatureClasses() {
    const html = document.documentElement;
    
    // WebP support
    html.classList.add(this.features.webp ? 'webp' : 'no-webp');
    
    // Intersection Observer
    html.classList.add(this.features.intersectionObserver ? 'intersection-observer' : 'no-intersection-observer');
    
    // Native lazy loading
    html.classList.add(this.features.lazyLoading ? 'native-lazy-loading' : 'no-native-lazy-loading');
    
    // Service Worker
    html.classList.add(this.features.serviceWorker ? 'service-worker' : 'no-service-worker');
    
    // WebGL
    html.classList.add(this.features.webGL ? 'webgl' : 'no-webgl');
    
    // Touch events
    html.classList.add(this.features.touchEvents ? 'touch' : 'no-touch');
    
    // Reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      html.classList.add('reduced-motion');
    }
    
    // High contrast preference
    if (window.matchMedia('(prefers-contrast: high)').matches) {
      html.classList.add('high-contrast');
    }
    
    // Dark mode preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      html.classList.add('dark-mode');
    }
  }

  /**
   * Setup fallbacks for unsupported features
   */
  setupFallbacks() {
    // Intersection Observer fallback
    if (!this.features.intersectionObserver) {
      this.setupScrollBasedLazyLoading();
    }
    
    // Service Worker fallback
    if (!this.features.serviceWorker) {
      console.warn('Service Worker not supported, offline functionality disabled');
    }
    
    // WebP fallback is handled by the image optimizer
    
    // Touch event fallbacks
    if (!this.features.touchEvents) {
      this.setupMouseEventFallbacks();
    }
  }

  /**
   * Setup scroll-based lazy loading for browsers without Intersection Observer
   */
  setupScrollBasedLazyLoading() {
    let ticking = false;
    
    const checkImages = () => {
      const lazyImages = document.querySelectorAll('img[data-src]');
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;
      
      lazyImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        const imgTop = rect.top + scrollTop;
        
        if (imgTop < scrollTop + windowHeight + 100) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.remove('lazy');
          img.classList.add('loaded');
        }
      });
      
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(checkImages);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick);
    window.addEventListener('resize', requestTick);
    
    // Initial check
    checkImages();
  }

  /**
   * Setup mouse event fallbacks for touch interactions
   */
  setupMouseEventFallbacks() {
    // Convert touch events to mouse events for better compatibility
    document.addEventListener('mouseenter', (e) => {
      if (e.target.matches('.touch-hover')) {
        e.target.classList.add('hover');
      }
    });
    
    document.addEventListener('mouseleave', (e) => {
      if (e.target.matches('.touch-hover')) {
        e.target.classList.remove('hover');
      }
    });
  }

  /**
   * Check if a feature is supported
   * @param {string} feature - Feature name
   * @returns {boolean}
   */
  isSupported(feature) {
    return this.features[feature] === true;
  }

  /**
   * Get all feature support status
   * @returns {Object}
   */
  getFeatures() {
    return { ...this.features };
  }

  /**
   * Setup responsive image loading based on connection speed
   */
  setupAdaptiveLoading() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      const effectiveType = connection.effectiveType;
      
      // Adjust image quality based on connection speed
      let quality = 85; // Default quality
      
      switch (effectiveType) {
        case 'slow-2g':
        case '2g':
          quality = 60;
          break;
        case '3g':
          quality = 75;
          break;
        case '4g':
          quality = 90;
          break;
      }
      
      // Store quality preference
      document.documentElement.style.setProperty('--image-quality', quality);
      
      // Add connection class
      document.documentElement.classList.add(`connection-${effectiveType}`);
      
      console.log(`Adaptive loading: ${effectiveType} connection, quality: ${quality}`);
    }
  }

  /**
   * Setup performance monitoring
   */
  setupPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
      // Monitor Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      
      // Monitor First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });
      
      // Monitor Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        const entries = list.getEntries();
        
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        
        console.log('CLS:', clsValue);
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    }
  }

  /**
   * Setup memory management for images
   */
  setupMemoryManagement() {
    // Clean up images that are far from viewport
    const cleanupImages = () => {
      const images = document.querySelectorAll('img.loaded');
      const viewportHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;
      
      images.forEach(img => {
        const rect = img.getBoundingClientRect();
        const distance = Math.abs(rect.top + scrollTop - scrollTop - viewportHeight / 2);
        
        // If image is more than 3 viewport heights away, unload it
        if (distance > viewportHeight * 3) {
          const placeholder = img.dataset.placeholder;
          if (placeholder) {
            img.src = placeholder;
            img.classList.remove('loaded');
            img.classList.add('lazy');
            img.dataset.src = img.dataset.originalSrc || img.src;
          }
        }
      });
    };
    
    // Run cleanup periodically
    setInterval(cleanupImages, 30000); // Every 30 seconds
  }
}

// Create global instance
export const progressiveEnhancement = new ProgressiveEnhancement();

export default ProgressiveEnhancement;