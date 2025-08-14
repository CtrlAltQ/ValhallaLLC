/**
 * Performance Auditing and Optimization System
 * Comprehensive performance monitoring, Core Web Vitals tracking, and optimization recommendations
 */

/**
 * Core Web Vitals Monitor
 */
export class CoreWebVitalsMonitor {
  constructor() {
    this.metrics = {
      lcp: null,
      fid: null,
      cls: null,
      fcp: null,
      ttfb: null
    };
    this.observers = [];
    this.thresholds = {
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      fcp: { good: 1800, poor: 3000 },
      ttfb: { good: 800, poor: 1800 }
    };
  }

  /**
   * Initialize Core Web Vitals monitoring
   */
  init() {
    this.measureLCP();
    this.measureFID();
    this.measureCLS();
    this.measureFCP();
    this.measureTTFB();
    this.setupReporting();
  }

  /**
   * Measure Largest Contentful Paint (LCP)
   */
  measureLCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.lcp = Math.round(lastEntry.startTime);
        this.reportMetric('LCP', this.metrics.lcp);
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    }
  }

  /**
   * Measure First Input Delay (FID)
   */
  measureFID() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          this.metrics.fid = Math.round(entry.processingStart - entry.startTime);
          this.reportMetric('FID', this.metrics.fid);
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
      this.observers.push(observer);
    }
  }

  /**
   * Measure Cumulative Layout Shift (CLS)
   */
  measureCLS() {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      let sessionValue = 0;
      let sessionEntries = [];

      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

            if (sessionValue && 
                entry.startTime - lastSessionEntry.startTime < 1000 &&
                entry.startTime - firstSessionEntry.startTime < 5000) {
              sessionValue += entry.value;
              sessionEntries.push(entry);
            } else {
              sessionValue = entry.value;
              sessionEntries = [entry];
            }

            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              this.metrics.cls = Math.round(clsValue * 1000) / 1000;
              this.reportMetric('CLS', this.metrics.cls);
            }
          }
        });
      });

      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    }
  }

  /**
   * Measure First Contentful Paint (FCP)
   */
  measureFCP() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = Math.round(entry.startTime);
            this.reportMetric('FCP', this.metrics.fcp);
          }
        });
      });

      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    }
  }

  /**
   * Measure Time to First Byte (TTFB)
   */
  measureTTFB() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            this.metrics.ttfb = Math.round(entry.responseStart - entry.requestStart);
            this.reportMetric('TTFB', this.metrics.ttfb);
          }
        });
      });

      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    }
  }

  /**
   * Report individual metric
   */
  reportMetric(name, value) {
    const threshold = this.thresholds[name.toLowerCase()];
    let rating = 'good';
    
    if (threshold) {
      if (value > threshold.poor) {
        rating = 'poor';
      } else if (value > threshold.good) {
        rating = 'needs-improvement';
      }
    }

    console.log(`${name}: ${value}ms (${rating})`);
    
    // Dispatch custom event for external tracking
    window.dispatchEvent(new CustomEvent('web-vital', {
      detail: { name, value, rating }
    }));
  }

  /**
   * Setup performance reporting
   */
  setupReporting() {
    // Report metrics after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.generateReport();
      }, 1000);
    });

    // Report on page visibility change (for SPA navigation)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.generateReport();
      }
    });
  }

  /**
   * Generate comprehensive performance report
   */
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      connection: this.getConnectionInfo(),
      metrics: { ...this.metrics },
      ratings: {},
      recommendations: []
    };

    // Calculate ratings
    Object.entries(this.metrics).forEach(([key, value]) => {
      if (value !== null) {
        const threshold = this.thresholds[key];
        if (threshold) {
          if (value <= threshold.good) {
            report.ratings[key] = 'good';
          } else if (value <= threshold.poor) {
            report.ratings[key] = 'needs-improvement';
          } else {
            report.ratings[key] = 'poor';
          }
        }
      }
    });

    // Generate recommendations
    report.recommendations = this.generateRecommendations(report);

    console.group('Performance Report');
    console.table(report.metrics);
    console.table(report.ratings);
    console.log('Recommendations:', report.recommendations);
    console.groupEnd();

    // Store for external access
    window.performanceReport = report;

    return report;
  }

  /**
   * Get connection information
   */
  getConnectionInfo() {
    if ('connection' in navigator) {
      return {
        effectiveType: navigator.connection.effectiveType,
        downlink: navigator.connection.downlink,
        rtt: navigator.connection.rtt,
        saveData: navigator.connection.saveData
      };
    }
    return null;
  }

  /**
   * Generate performance recommendations
   */
  generateRecommendations(report) {
    const recommendations = [];

    // LCP recommendations
    if (report.ratings.lcp === 'poor') {
      recommendations.push({
        metric: 'LCP',
        priority: 'high',
        issue: 'Largest Contentful Paint is too slow',
        suggestions: [
          'Optimize images and use WebP format',
          'Implement lazy loading for below-fold content',
          'Minimize render-blocking resources',
          'Use a CDN for faster asset delivery'
        ]
      });
    }

    // FID recommendations
    if (report.ratings.fid === 'poor') {
      recommendations.push({
        metric: 'FID',
        priority: 'high',
        issue: 'First Input Delay is too high',
        suggestions: [
          'Reduce JavaScript execution time',
          'Split large JavaScript bundles',
          'Use web workers for heavy computations',
          'Defer non-critical JavaScript'
        ]
      });
    }

    // CLS recommendations
    if (report.ratings.cls === 'poor') {
      recommendations.push({
        metric: 'CLS',
        priority: 'high',
        issue: 'Cumulative Layout Shift is too high',
        suggestions: [
          'Set explicit dimensions for images and videos',
          'Reserve space for dynamic content',
          'Avoid inserting content above existing content',
          'Use CSS aspect-ratio for responsive images'
        ]
      });
    }

    // TTFB recommendations
    if (report.ratings.ttfb === 'poor') {
      recommendations.push({
        metric: 'TTFB',
        priority: 'medium',
        issue: 'Time to First Byte is slow',
        suggestions: [
          'Optimize server response time',
          'Use a CDN',
          'Enable server-side caching',
          'Minimize server processing time'
        ]
      });
    }

    return recommendations;
  }

  /**
   * Cleanup observers
   */
  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

/**
 * Resource Performance Analyzer
 */
export class ResourceAnalyzer {
  constructor() {
    this.resources = [];
    this.analysis = {};
  }

  /**
   * Analyze all loaded resources
   */
  analyzeResources() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      this.resources = performance.getEntriesByType('resource');
      this.analysis = this.categorizeResources();
      return this.generateResourceReport();
    }
    return null;
  }

  /**
   * Categorize resources by type
   */
  categorizeResources() {
    const categories = {
      images: [],
      scripts: [],
      stylesheets: [],
      fonts: [],
      other: []
    };

    this.resources.forEach(resource => {
      const url = new URL(resource.name);
      const extension = url.pathname.split('.').pop().toLowerCase();
      
      if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
        categories.images.push(resource);
      } else if (['js'].includes(extension)) {
        categories.scripts.push(resource);
      } else if (['css'].includes(extension)) {
        categories.stylesheets.push(resource);
      } else if (['woff', 'woff2', 'ttf', 'otf'].includes(extension)) {
        categories.fonts.push(resource);
      } else {
        categories.other.push(resource);
      }
    });

    return categories;
  }

  /**
   * Generate resource performance report
   */
  generateResourceReport() {
    const report = {
      summary: {
        totalResources: this.resources.length,
        totalSize: 0,
        totalDuration: 0
      },
      categories: {},
      slowResources: [],
      largeResources: [],
      recommendations: []
    };

    // Analyze each category
    Object.entries(this.analysis).forEach(([category, resources]) => {
      const categoryStats = {
        count: resources.length,
        totalSize: 0,
        averageSize: 0,
        totalDuration: 0,
        averageDuration: 0,
        slowest: null,
        largest: null
      };

      resources.forEach(resource => {
        const size = resource.transferSize || 0;
        const duration = resource.responseEnd - resource.startTime;

        categoryStats.totalSize += size;
        categoryStats.totalDuration += duration;

        // Track slowest resource
        if (!categoryStats.slowest || duration > (categoryStats.slowest.responseEnd - categoryStats.slowest.startTime)) {
          categoryStats.slowest = resource;
        }

        // Track largest resource
        if (!categoryStats.largest || size > (categoryStats.largest.transferSize || 0)) {
          categoryStats.largest = resource;
        }

        // Flag slow resources (>1s)
        if (duration > 1000) {
          report.slowResources.push({
            name: resource.name,
            duration: Math.round(duration),
            category
          });
        }

        // Flag large resources (>500KB)
        if (size > 500000) {
          report.largeResources.push({
            name: resource.name,
            size: Math.round(size / 1024),
            category
          });
        }
      });

      if (resources.length > 0) {
        categoryStats.averageSize = Math.round(categoryStats.totalSize / resources.length);
        categoryStats.averageDuration = Math.round(categoryStats.totalDuration / resources.length);
      }

      report.categories[category] = categoryStats;
      report.summary.totalSize += categoryStats.totalSize;
      report.summary.totalDuration += categoryStats.totalDuration;
    });

    // Generate recommendations
    report.recommendations = this.generateResourceRecommendations(report);

    return report;
  }

  /**
   * Generate resource optimization recommendations
   */
  generateResourceRecommendations(report) {
    const recommendations = [];

    // Image optimization recommendations
    if (report.categories.images.count > 0) {
      const imageStats = report.categories.images;
      
      if (imageStats.averageSize > 100000) { // 100KB
        recommendations.push({
          category: 'images',
          priority: 'high',
          issue: 'Large image sizes detected',
          suggestions: [
            'Compress images using tools like TinyPNG or ImageOptim',
            'Convert to WebP format for better compression',
            'Implement responsive images with srcset',
            'Use lazy loading for below-fold images'
          ]
        });
      }
    }

    // JavaScript optimization recommendations
    if (report.categories.scripts.count > 0) {
      const scriptStats = report.categories.scripts;
      
      if (scriptStats.totalSize > 500000) { // 500KB
        recommendations.push({
          category: 'scripts',
          priority: 'high',
          issue: 'Large JavaScript bundle size',
          suggestions: [
            'Split JavaScript bundles using code splitting',
            'Remove unused JavaScript code',
            'Minify and compress JavaScript files',
            'Use dynamic imports for non-critical code'
          ]
        });
      }
    }

    // CSS optimization recommendations
    if (report.categories.stylesheets.count > 0) {
      const cssStats = report.categories.stylesheets;
      
      if (cssStats.totalSize > 100000) { // 100KB
        recommendations.push({
          category: 'stylesheets',
          priority: 'medium',
          issue: 'Large CSS bundle size',
          suggestions: [
            'Remove unused CSS rules',
            'Minify CSS files',
            'Use critical CSS inlining',
            'Split CSS by page or component'
          ]
        });
      }
    }

    // Slow resource recommendations
    if (report.slowResources.length > 0) {
      recommendations.push({
        category: 'performance',
        priority: 'high',
        issue: `${report.slowResources.length} slow-loading resources detected`,
        suggestions: [
          'Use a CDN for faster asset delivery',
          'Enable compression (gzip/brotli)',
          'Optimize server response times',
          'Consider preloading critical resources'
        ]
      });
    }

    return recommendations;
  }
}

/**
 * Bundle Size Analyzer
 */
export class BundleAnalyzer {
  constructor() {
    this.bundles = {
      css: [],
      js: [],
      total: 0
    };
  }

  /**
   * Analyze bundle sizes
   */
  analyzeBundles() {
    // Get all CSS files
    const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
    cssLinks.forEach(link => {
      this.analyzeResource(link.href, 'css');
    });

    // Get all JavaScript files
    const scripts = document.querySelectorAll('script[src]');
    scripts.forEach(script => {
      this.analyzeResource(script.src, 'js');
    });

    return this.generateBundleReport();
  }

  /**
   * Analyze individual resource
   */
  async analyzeResource(url, type) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const size = parseInt(response.headers.get('content-length') || '0');
      
      this.bundles[type].push({
        url,
        size,
        compressed: response.headers.get('content-encoding') !== null
      });
      
      this.bundles.total += size;
    } catch (error) {
      console.warn(`Could not analyze bundle: ${url}`, error);
    }
  }

  /**
   * Generate bundle analysis report
   */
  generateBundleReport() {
    const report = {
      summary: {
        totalSize: this.bundles.total,
        cssSize: this.bundles.css.reduce((sum, file) => sum + file.size, 0),
        jsSize: this.bundles.js.reduce((sum, file) => sum + file.size, 0),
        cssFiles: this.bundles.css.length,
        jsFiles: this.bundles.js.length
      },
      details: this.bundles,
      recommendations: []
    };

    // Generate recommendations based on bundle sizes
    if (report.summary.totalSize > 1000000) { // 1MB
      report.recommendations.push({
        priority: 'high',
        issue: 'Total bundle size is very large',
        suggestion: 'Consider code splitting and lazy loading'
      });
    }

    if (report.summary.jsSize > 500000) { // 500KB
      report.recommendations.push({
        priority: 'high',
        issue: 'JavaScript bundle is too large',
        suggestion: 'Split JavaScript into smaller chunks'
      });
    }

    if (report.summary.cssSize > 100000) { // 100KB
      report.recommendations.push({
        priority: 'medium',
        issue: 'CSS bundle is large',
        suggestion: 'Remove unused CSS and consider critical CSS'
      });
    }

    return report;
  }
}

/**
 * Performance Audit Runner
 */
export class PerformanceAuditor {
  constructor() {
    this.coreWebVitals = new CoreWebVitalsMonitor();
    this.resourceAnalyzer = new ResourceAnalyzer();
    this.bundleAnalyzer = new BundleAnalyzer();
    this.auditResults = {};
  }

  /**
   * Run complete performance audit
   */
  async runAudit() {
    console.log('Starting performance audit...');

    // Initialize Core Web Vitals monitoring
    this.coreWebVitals.init();

    // Wait for page to load
    if (document.readyState !== 'complete') {
      await new Promise(resolve => {
        window.addEventListener('load', resolve);
      });
    }

    // Run analyses
    this.auditResults = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      coreWebVitals: this.coreWebVitals.generateReport(),
      resources: this.resourceAnalyzer.analyzeResources(),
      bundles: await this.bundleAnalyzer.analyzeBundles(),
      recommendations: []
    };

    // Compile all recommendations
    this.auditResults.recommendations = this.compileRecommendations();

    // Generate final report
    this.generateAuditReport();

    return this.auditResults;
  }

  /**
   * Compile all recommendations
   */
  compileRecommendations() {
    const allRecommendations = [];

    // Core Web Vitals recommendations
    if (this.auditResults.coreWebVitals.recommendations) {
      allRecommendations.push(...this.auditResults.coreWebVitals.recommendations);
    }

    // Resource recommendations
    if (this.auditResults.resources.recommendations) {
      allRecommendations.push(...this.auditResults.resources.recommendations);
    }

    // Bundle recommendations
    if (this.auditResults.bundles.recommendations) {
      allRecommendations.push(...this.auditResults.bundles.recommendations);
    }

    // Sort by priority
    return allRecommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  /**
   * Generate comprehensive audit report
   */
  generateAuditReport() {
    console.group('🚀 Performance Audit Report');
    
    console.group('📊 Core Web Vitals');
    console.table(this.auditResults.coreWebVitals.metrics);
    console.table(this.auditResults.coreWebVitals.ratings);
    console.groupEnd();

    console.group('📦 Resource Analysis');
    console.table(this.auditResults.resources.summary);
    if (this.auditResults.resources.slowResources.length > 0) {
      console.warn('Slow Resources:', this.auditResults.resources.slowResources);
    }
    if (this.auditResults.resources.largeResources.length > 0) {
      console.warn('Large Resources:', this.auditResults.resources.largeResources);
    }
    console.groupEnd();

    console.group('📋 Recommendations');
    this.auditResults.recommendations.forEach((rec, index) => {
      const emoji = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
      console.log(`${emoji} ${index + 1}. ${rec.issue}`);
      if (rec.suggestions) {
        rec.suggestions.forEach(suggestion => {
          console.log(`   • ${suggestion}`);
        });
      } else if (rec.suggestion) {
        console.log(`   • ${rec.suggestion}`);
      }
    });
    console.groupEnd();

    console.groupEnd();

    // Store globally for external access
    window.performanceAudit = this.auditResults;
  }

  /**
   * Cleanup resources
   */
  cleanup() {
    this.coreWebVitals.cleanup();
  }
}

// Auto-initialize performance monitoring
document.addEventListener('DOMContentLoaded', () => {
  const auditor = new PerformanceAuditor();
  
  // Run audit after a short delay to ensure all resources are loaded
  setTimeout(() => {
    auditor.runAudit().then(results => {
      console.log('Performance audit completed');
    }).catch(error => {
      console.error('Performance audit failed:', error);
    });
  }, 2000);

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    auditor.cleanup();
  });
});

export { CoreWebVitalsMonitor, ResourceAnalyzer, BundleAnalyzer, PerformanceAuditor };