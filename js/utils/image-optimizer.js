/**
 * Image Optimization and Lazy Loading System
 * Handles WebP format with JPEG fallbacks, lazy loading, and responsive sizing
 */

export class ImageOptimizer {
  constructor(options = {}) {
    this.options = {
      // WebP support detection
      webpSupport: null,
      
      // Lazy loading options
      rootMargin: '50px 0px',
      threshold: 0.01,
      
      // Image quality settings
      jpegQuality: 85,
      webpQuality: 80,
      
      // Responsive breakpoints
      breakpoints: {
        xs: 320,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        xxl: 1536
      },
      
      // Placeholder options
      placeholderColor: '#333333',
      placeholderTextColor: '#ffffff',
      
      // Performance options
      preloadCount: 3,
      retryAttempts: 3,
      retryDelay: 1000,
      
      ...options
    };
    
    this.observer = null;
    this.loadedImages = new Set();
    this.failedImages = new Set();
    this.preloadedImages = new Map();
    
    this.init();
  }

  /**
   * Initialize the image optimizer
   */
  async init() {
    // Detect WebP support
    this.options.webpSupport = await this.detectWebPSupport();
    
    // Setup intersection observer for lazy loading
    this.setupIntersectionObserver();
    
    // Setup global error handling
    this.setupErrorHandling();
    
    console.log('Image Optimizer initialized', {
      webpSupport: this.options.webpSupport,
      breakpoints: this.options.breakpoints
    });
  }

  /**
   * Detect WebP support
   * @returns {Promise<boolean>}
   */
  detectWebPSupport() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  /**
   * Setup intersection observer for lazy loading
   */
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) {
      console.warn('IntersectionObserver not supported, falling back to immediate loading');
      return;
    }

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: this.options.rootMargin,
      threshold: this.options.threshold
    });
  }

  /**
   * Setup global error handling for images
   */
  setupErrorHandling() {
    // Handle global image errors
    document.addEventListener('error', (event) => {
      if (event.target.tagName === 'IMG') {
        this.handleImageError(event.target);
      }
    }, true);
  }

  /**
   * Generate optimized image URL with format and size options
   * @param {string} originalUrl - Original image URL
   * @param {Object} options - Optimization options
   * @returns {string} Optimized image URL
   */
  generateOptimizedUrl(originalUrl, options = {}) {
    const {
      width,
      height,
      quality,
      format = 'auto'
    } = options;

    // For now, return original URL with query parameters
    // In production, this would integrate with image CDN or processing service
    const url = new URL(originalUrl, window.location.origin);
    
    if (width) url.searchParams.set('w', width);
    if (height) url.searchParams.set('h', height);
    if (quality) url.searchParams.set('q', quality);
    
    // Determine format based on support and preference
    let targetFormat = format;
    if (format === 'auto') {
      targetFormat = this.options.webpSupport ? 'webp' : 'jpeg';
    }
    
    if (targetFormat !== 'original') {
      url.searchParams.set('f', targetFormat);
    }
    
    return url.toString();
  }

  /**
   * Generate WebP URL with JPEG fallback
   * @param {string} originalUrl - Original image URL
   * @param {Object} options - Size and quality options
   * @returns {Object} URLs for WebP and JPEG
   */
  generateResponsiveUrls(originalUrl, options = {}) {
    const baseOptions = {
      quality: this.options.webpSupport ? this.options.webpQuality : this.options.jpegQuality,
      ...options
    };

    // Generate WebP version
    const webpUrl = this.generateOptimizedUrl(originalUrl, {
      ...baseOptions,
      format: 'webp'
    });

    // Generate JPEG fallback
    const jpegUrl = this.generateOptimizedUrl(originalUrl, {
      ...baseOptions,
      format: 'jpeg'
    });

    return {
      webp: webpUrl,
      jpeg: jpegUrl,
      original: originalUrl
    };
  }

  /**
   * Generate responsive srcset for different screen sizes
   * @param {string} originalUrl - Original image URL
   * @param {Object} options - Configuration options
   * @returns {Object} Srcset strings for WebP and JPEG
   */
  generateSrcSet(originalUrl, options = {}) {
    const {
      sizes = [320, 640, 768, 1024, 1280, 1536],
      quality
    } = options;

    const webpSrcSet = sizes.map(width => {
      const url = this.generateOptimizedUrl(originalUrl, {
        width,
        quality: quality || this.options.webpQuality,
        format: 'webp'
      });
      return `${url} ${width}w`;
    }).join(', ');

    const jpegSrcSet = sizes.map(width => {
      const url = this.generateOptimizedUrl(originalUrl, {
        width,
        quality: quality || this.options.jpegQuality,
        format: 'jpeg'
      });
      return `${url} ${width}w`;
    }).join(', ');

    return {
      webp: webpSrcSet,
      jpeg: jpegSrcSet
    };
  }

  /**
   * Generate placeholder image
   * @param {number} width - Placeholder width
   * @param {number} height - Placeholder height
   * @param {string} text - Placeholder text
   * @returns {string} Data URL for placeholder
   */
  generatePlaceholder(width = 400, height = 300, text = 'Loading...') {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
        <rect width="${width}" height="${height}" fill="${this.options.placeholderColor}"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" 
              fill="${this.options.placeholderTextColor}" 
              font-family="Arial, sans-serif" 
              font-size="16">${text}</text>
      </svg>
    `;
    
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  /**
   * Generate low-quality image placeholder (LQIP)
   * @param {string} originalUrl - Original image URL
   * @returns {string} LQIP data URL
   */
  generateLQIP(originalUrl) {
    // Generate a very small, low-quality version for blur effect
    return this.generateOptimizedUrl(originalUrl, {
      width: 20,
      height: 20,
      quality: 20,
      format: 'jpeg'
    });
  }

  /**
   * Create optimized image element with lazy loading
   * @param {Object} config - Image configuration
   * @returns {HTMLElement} Optimized image element
   */
  createOptimizedImage(config) {
    const {
      src,
      alt = '',
      width,
      height,
      className = '',
      lazy = true,
      responsive = true,
      placeholder = 'blur', // 'blur', 'color', 'none'
      sizes = '100vw',
      priority = false
    } = config;

    // Create picture element for WebP support
    const picture = document.createElement('picture');
    picture.className = `optimized-image ${className}`;

    // Generate responsive URLs
    const urls = this.generateResponsiveUrls(src, { width, height });
    
    if (responsive) {
      const srcSets = this.generateSrcSet(src, { width, height });
      
      // WebP source
      if (this.options.webpSupport) {
        const webpSource = document.createElement('source');
        webpSource.type = 'image/webp';
        webpSource.srcset = lazy && !priority ? '' : srcSets.webp;
        webpSource.sizes = sizes;
        if (lazy && !priority) {
          webpSource.dataset.srcset = srcSets.webp;
        }
        picture.appendChild(webpSource);
      }
      
      // JPEG source
      const jpegSource = document.createElement('source');
      jpegSource.type = 'image/jpeg';
      jpegSource.srcset = lazy && !priority ? '' : srcSets.jpeg;
      jpegSource.sizes = sizes;
      if (lazy && !priority) {
        jpegSource.dataset.srcset = srcSets.jpeg;
      }
      picture.appendChild(jpegSource);
    }

    // Create img element
    const img = document.createElement('img');
    img.alt = alt;
    img.className = 'optimized-image__img';
    
    if (width) img.width = width;
    if (height) img.height = height;

    // Set up lazy loading
    if (lazy && !priority) {
      img.classList.add('lazy');
      img.dataset.src = responsive ? urls.jpeg : src;
      
      // Set placeholder
      switch (placeholder) {
        case 'blur':
          img.src = this.generateLQIP(src);
          img.classList.add('blur-placeholder');
          break;
        case 'color':
          img.src = this.generatePlaceholder(width || 400, height || 300);
          break;
        default:
          img.src = this.generatePlaceholder(width || 400, height || 300, '');
      }
      
      // Observe for lazy loading
      if (this.observer) {
        this.observer.observe(img);
      } else {
        // Fallback: load immediately if no observer
        this.loadImage(img);
      }
    } else {
      // Load immediately for priority images
      img.src = responsive ? urls.jpeg : src;
      img.loading = 'eager';
    }

    // Add loading attribute for native lazy loading support
    if (lazy && !priority && 'loading' in HTMLImageElement.prototype) {
      img.loading = 'lazy';
    }

    picture.appendChild(img);
    return picture;
  }

  /**
   * Load image with retry logic
   * @param {HTMLImageElement} img - Image element to load
   * @param {number} attempt - Current attempt number
   */
  async loadImage(img, attempt = 1) {
    if (this.loadedImages.has(img)) return;

    const src = img.dataset.src || img.src;
    
    try {
      // Preload the image
      await this.preloadImage(src);
      
      // Update img src
      img.src = src;
      
      // Update srcset for picture sources
      const picture = img.closest('picture');
      if (picture) {
        const sources = picture.querySelectorAll('source[data-srcset]');
        sources.forEach(source => {
          source.srcset = source.dataset.srcset;
          delete source.dataset.srcset;
        });
      }
      
      // Remove lazy class and add loaded class
      img.classList.remove('lazy', 'blur-placeholder');
      img.classList.add('loaded');
      
      // Mark as loaded
      this.loadedImages.add(img);
      
      // Dispatch load event
      img.dispatchEvent(new CustomEvent('optimized-load', {
        detail: { src, attempt }
      }));
      
    } catch (error) {
      console.warn(`Failed to load image: ${src} (attempt ${attempt})`, error);
      
      if (attempt < this.options.retryAttempts) {
        // Retry after delay
        setTimeout(() => {
          this.loadImage(img, attempt + 1);
        }, this.options.retryDelay * attempt);
      } else {
        // Final failure - show error placeholder
        this.handleImageError(img);
      }
    }
  }

  /**
   * Preload image
   * @param {string} src - Image source URL
   * @returns {Promise<string>}
   */
  preloadImage(src) {
    if (this.preloadedImages.has(src)) {
      return this.preloadedImages.get(src);
    }

    const promise = new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        resolve(src);
      };
      
      img.onerror = () => {
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    });

    this.preloadedImages.set(src, promise);
    return promise;
  }

  /**
   * Handle image loading errors
   * @param {HTMLImageElement} img - Failed image element
   */
  handleImageError(img) {
    if (this.failedImages.has(img)) return;
    
    this.failedImages.add(img);
    
    // Try fallback URL if available
    const fallbackSrc = img.dataset.fallback;
    if (fallbackSrc && img.src !== fallbackSrc) {
      img.src = fallbackSrc;
      return;
    }
    
    // Show error placeholder
    const width = img.width || 400;
    const height = img.height || 300;
    img.src = this.generatePlaceholder(width, height, 'Failed to load');
    img.classList.add('image-error');
    
    // Dispatch error event
    img.dispatchEvent(new CustomEvent('optimized-error', {
      detail: { originalSrc: img.dataset.src || img.src }
    }));
  }

  /**
   * Optimize existing images on the page
   * @param {string} selector - CSS selector for images to optimize
   */
  optimizeExistingImages(selector = 'img[data-optimize]') {
    const images = document.querySelectorAll(selector);
    
    images.forEach(img => {
      const config = {
        src: img.src || img.dataset.src,
        alt: img.alt,
        width: img.width,
        height: img.height,
        className: img.className,
        lazy: img.dataset.lazy !== 'false',
        responsive: img.dataset.responsive !== 'false',
        placeholder: img.dataset.placeholder || 'blur',
        sizes: img.dataset.sizes || '100vw',
        priority: img.dataset.priority === 'true'
      };
      
      const optimizedImage = this.createOptimizedImage(config);
      img.parentNode.replaceChild(optimizedImage, img);
    });
  }

  /**
   * Preload critical images
   * @param {Array<string>} urls - Array of image URLs to preload
   */
  async preloadCriticalImages(urls) {
    const preloadPromises = urls.slice(0, this.options.preloadCount).map(url => {
      return this.preloadImage(url).catch(error => {
        console.warn(`Failed to preload critical image: ${url}`, error);
      });
    });
    
    await Promise.allSettled(preloadPromises);
  }

  /**
   * Get image loading statistics
   * @returns {Object} Loading statistics
   */
  getStats() {
    return {
      loaded: this.loadedImages.size,
      failed: this.failedImages.size,
      preloaded: this.preloadedImages.size,
      webpSupport: this.options.webpSupport
    };
  }

  /**
   * Clean up resources
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    this.loadedImages.clear();
    this.failedImages.clear();
    this.preloadedImages.clear();
  }
}

// Create global instance
export const imageOptimizer = new ImageOptimizer();

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    imageOptimizer.optimizeExistingImages();
  });
} else {
  imageOptimizer.optimizeExistingImages();
}

export default ImageOptimizer;