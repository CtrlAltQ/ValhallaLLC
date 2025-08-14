/**
 * Browser Compatibility Utilities
 * Handles cross-browser compatibility and feature detection
 */

class BrowserCompatibility {
  constructor() {
    this.userAgent = navigator.userAgent;
    this.browser = this.detectBrowser();
    this.features = this.detectFeatures();
    this.init();
  }

  init() {
    this.addBrowserClasses();
    this.setupPolyfills();
    this.handleBrowserSpecificIssues();
  }

  detectBrowser() {
    const ua = this.userAgent;
    
    if (ua.includes('Chrome') && !ua.includes('Edg')) {
      return { name: 'chrome', version: this.extractVersion(ua, 'Chrome/') };
    } else if (ua.includes('Firefox')) {
      return { name: 'firefox', version: this.extractVersion(ua, 'Firefox/') };
    } else if (ua.includes('Safari') && !ua.includes('Chrome')) {
      return { name: 'safari', version: this.extractVersion(ua, 'Version/') };
    } else if (ua.includes('Edg')) {
      return { name: 'edge', version: this.extractVersion(ua, 'Edg/') };
    }
    
    return { name: 'unknown', version: '0' };
  }

  extractVersion(ua, pattern) {
    const match = ua.match(new RegExp(pattern + '([\\d\\.]+)'));
    return match ? match[1] : '0';
  }

  detectFeatures() {
    return {
      webp: this.supportsWebP(),
      intersectionObserver: 'IntersectionObserver' in window,
      customProperties: this.supportsCSSCustomProperties(),
      grid: this.supportsCSSGrid(),
      flexbox: this.supportsFlexbox(),
      serviceWorker: 'serviceWorker' in navigator,
      touchEvents: 'ontouchstart' in window,
      fetch: 'fetch' in window,
      promises: 'Promise' in window
    };
  }

  addBrowserClasses() {
    const classes = [
      `browser-${this.browser.name}`,
      `browser-${this.browser.name}-${Math.floor(this.browser.version)}`
    ];
    
    Object.entries(this.features).forEach(([feature, supported]) => {
      classes.push(supported ? `supports-${feature}` : `no-${feature}`);
    });
    
    document.documentElement.classList.add(...classes);
  }

  setupPolyfills() {
    // IntersectionObserver polyfill for older browsers
    if (!this.features.intersectionObserver) {
      this.loadPolyfill('https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver');
    }

    // Fetch polyfill for older browsers
    if (!this.features.fetch) {
      this.loadPolyfill('https://polyfill.io/v3/polyfill.min.js?features=fetch');
    }

    // Promise polyfill for older browsers
    if (!this.features.promises) {
      this.loadPolyfill('https://polyfill.io/v3/polyfill.min.js?features=Promise');
    }
  }

  loadPolyfill(url) {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    document.head.appendChild(script);
  }

  handleBrowserSpecificIssues() {
    // Safari-specific fixes
    if (this.browser.name === 'safari') {
      this.fixSafariIssues();
    }

    // Firefox-specific fixes
    if (this.browser.name === 'firefox') {
      this.fixFirefoxIssues();
    }

    // Edge-specific fixes
    if (this.browser.name === 'edge') {
      this.fixEdgeIssues();
    }
  }

  fixSafariIssues() {
    // Fix Safari backdrop-filter issues
    document.documentElement.style.setProperty('--safari-backdrop-filter', 'blur(10px)');
    
    // Fix Safari smooth scrolling
    if (parseFloat(this.browser.version) < 15.4) {
      document.documentElement.style.scrollBehavior = 'auto';
    }
  }

  fixFirefoxIssues() {
    // Fix Firefox flexbox issues
    const firefoxVersion = parseFloat(this.browser.version);
    if (firefoxVersion < 63) {
      document.documentElement.classList.add('firefox-old-flexbox');
    }
  }

  fixEdgeIssues() {
    // Fix Edge CSS Grid issues
    const edgeVersion = parseFloat(this.browser.version);
    if (edgeVersion < 16) {
      document.documentElement.classList.add('edge-old-grid');
    }
  }

  supportsWebP() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  supportsCSSCustomProperties() {
    return window.CSS && CSS.supports('color', 'var(--test)');
  }

  supportsCSSGrid() {
    return CSS.supports('display', 'grid');
  }

  supportsFlexbox() {
    return CSS.supports('display', 'flex');
  }
}

const browserCompatibility = new BrowserCompatibility();
export default browserCompatibility;