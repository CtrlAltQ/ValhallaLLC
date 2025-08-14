/**
 * Performance Monitoring Utility
 * Tracks Core Web Vitals and other performance metrics
 */

export class PerformanceMonitor {
  constructor(options = {}) {
    this.options = {
      // Reporting options
      reportToConsole: true,
      reportToAnalytics: false,
      analyticsEndpoint: '/analytics/performance',
      
      // Thresholds for Core Web Vitals
      thresholds: {
        lcp: { good: 2500, poor: 4000 }, // Largest Contentful Paint
        fid: { good: 100, poor: 300 },   // First Input Delay
        cls: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
        fcp: { good: 1800, poor: 3000 }, // First Contentful Paint
        ttfb: { good: 800, poor: 1800 }  // Time to First Byte
      },
      
      // Sampling rate (0-1)
      sampleRate: 1.0,
      
      ...options
    };
    
    this.metrics = {};
    this.observers = [];
    
    this.init();
  }

  /**
   * Initialize performance monitoring
   */
  init() {
    // Check if we should sample this session
    if (Math.random() > this.options.sampleRate) {
      return;
    }

    // Setup performance observers
    this.setupPerformanceObservers();
    
    // Monitor page load metrics
    this.monitorPageLoad();
    
    // Monitor resource loading
    this.monitorResources();
    
    // Monitor user interactions
    this.monitorInteractions();
    
    console.log('Performance monitoring initialized');
  }

  /**
   * Setup performance observers for Core Web Vitals
   */
  setupPerformanceObservers() {
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported');
      return;
    }

    // Largest Contentful Paint (LCP)
    this.observeLCP();
    
    // First Input Delay (FID)
    this.observeFID();
    
    // Cumulative Layout Shift (CLS)
    this.observeCLS();
    
    // First Contentful Paint (FCP)
    this.observeFCP();
    
    // Time to First Byte (TTFB)
    this.observeTTFB();
  }

  /**
   * Observe Largest Contentful Paint
   */
  observeLCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.metrics.lcp = {
          value: lastEntry.startTime,
          rating: this.getRating(lastEntry.startTime, this.options.thresholds.lcp),
          element: lastEntry.element?.tagName || 'unknown',
          url: lastEntry.url || window.location.href,
          timestamp: Date.now()
        };
        
        this.reportMetric('lcp', this.metrics.lcp);
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('LCP observation failed:', error);
    }
  }

  /**
   * Observe First Input Delay
   */
  observeFID() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          const fid = entry.processingStart - entry.startTime;
          
          this.metrics.fid = {
            value: fid,
            rating: this.getRating(fid, this.options.thresholds.fid),
            eventType: entry.name,
            timestamp: Date.now()
          };
          
          this.reportMetric('fid', this.metrics.fid);
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('FID observation failed:', error);
    }
  }

  /**
   * Observe Cumulative Layout Shift
   */
  observeCLS() {
    try {
      let clsValue = 0;
      let sessionValue = 0;
      let sessionEntries = [];
      
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          // Only count layout shifts without recent input
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
            
            // If the entry occurred less than 1 second after the previous entry
            // and less than 5 seconds after the first entry in the session,
            // include it in the current session. Otherwise, start a new session.
            if (sessionValue &&
                entry.startTime - lastSessionEntry.startTime < 1000 &&
                entry.startTime - firstSessionEntry.startTime < 5000) {
              sessionValue += entry.value;
              sessionEntries.push(entry);
            } else {
              sessionValue = entry.value;
              sessionEntries = [entry];
            }
            
            // If the current session value is larger than the current CLS value,
            // update CLS and the entries contributing to it.
            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              
              this.metrics.cls = {
                value: clsValue,
                rating: this.getRating(clsValue, this.options.thresholds.cls),
                entries: sessionEntries.length,
                timestamp: Date.now()
              };
              
              this.reportMetric('cls', this.metrics.cls);
            }
          }
        });
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('CLS observation failed:', error);
    }
  }

  /**
   * Observe First Contentful Paint
   */
  observeFCP() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = {
              value: entry.startTime,
              rating: this.getRating(entry.startTime, this.options.thresholds.fcp),
              timestamp: Date.now()
            };
            
            this.reportMetric('fcp', this.metrics.fcp);
          }
        });
      });
      
      observer.observe({ entryTypes: ['paint'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('FCP observation failed:', error);
    }
  }

  /**
   * Observe Time to First Byte
   */
  observeTTFB() {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const ttfb = entry.responseStart - entry.requestStart;
            
            this.metrics.ttfb = {
              value: ttfb,
              rating: this.getRating(ttfb, this.options.thresholds.ttfb),
              timestamp: Date.now()
            };
            
            this.reportMetric('ttfb', this.metrics.ttfb);
          }
        });
      });
      
      observer.observe({ entryTypes: ['navigation'] });
      this.observers.push(observer);
    } catch (error) {
      console.warn('TTFB observation failed:', error);
    }
  }

  /**
   * Monitor page load metrics
   */
  monitorPageLoad() {
    window.addEventListener('load', () => {
      // Use setTimeout to ensure all resources are loaded
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        
        if (navigation) {
          this.metrics.pageLoad = {
            domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
            loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
            totalTime: navigation.loadEventEnd - navigation.fetchStart,
            timestamp: Date.now()
          };
          
          this.reportMetric('pageLoad', this.metrics.pageLoad);
        }
      }, 0);
    });
  }

  /**
   * Monitor resource loading performance
   */
  monitorResources() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        // Track slow resources
        if (entry.duration > 1000) {
          this.reportSlowResource({
            name: entry.name,
            type: entry.initiatorType,
            duration: entry.duration,
            size: entry.transferSize || 0,
            timestamp: Date.now()
          });
        }
      });
    });
    
    observer.observe({ entryTypes: ['resource'] });
    this.observers.push(observer);
  }

  /**
   * Monitor user interactions
   */
  monitorInteractions() {
    let interactionCount = 0;
    
    const trackInteraction = (type) => {
      interactionCount++;
      
      // Track interaction responsiveness
      const startTime = performance.now();
      
      requestAnimationFrame(() => {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        if (duration > 16) { // More than one frame
          this.reportSlowInteraction({
            type,
            duration,
            count: interactionCount,
            timestamp: Date.now()
          });
        }
      });
    };
    
    // Track clicks
    document.addEventListener('click', () => trackInteraction('click'), { passive: true });
    
    // Track scrolls
    let scrollTimeout;
    document.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => trackInteraction('scroll'), 100);
    }, { passive: true });
    
    // Track form interactions
    document.addEventListener('input', () => trackInteraction('input'), { passive: true });
  }

  /**
   * Get performance rating based on thresholds
   * @param {number} value - Metric value
   * @param {Object} thresholds - Good and poor thresholds
   * @returns {string} Rating (good, needs-improvement, poor)
   */
  getRating(value, thresholds) {
    if (value <= thresholds.good) {
      return 'good';
    } else if (value <= thresholds.poor) {
      return 'needs-improvement';
    } else {
      return 'poor';
    }
  }

  /**
   * Report metric
   * @param {string} name - Metric name
   * @param {Object} data - Metric data
   */
  reportMetric(name, data) {
    if (this.options.reportToConsole) {
      console.log(`Performance Metric [${name}]:`, data);
    }
    
    if (this.options.reportToAnalytics) {
      this.sendToAnalytics(name, data);
    }
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('performance:metric', {
      detail: { name, data }
    }));
  }

  /**
   * Report slow resource
   * @param {Object} data - Resource data
   */
  reportSlowResource(data) {
    if (this.options.reportToConsole) {
      console.warn('Slow Resource:', data);
    }
    
    if (this.options.reportToAnalytics) {
      this.sendToAnalytics('slow-resource', data);
    }
  }

  /**
   * Report slow interaction
   * @param {Object} data - Interaction data
   */
  reportSlowInteraction(data) {
    if (this.options.reportToConsole) {
      console.warn('Slow Interaction:', data);
    }
    
    if (this.options.reportToAnalytics) {
      this.sendToAnalytics('slow-interaction', data);
    }
  }

  /**
   * Send data to analytics endpoint
   * @param {string} type - Data type
   * @param {Object} data - Data to send
   */
  async sendToAnalytics(type, data) {
    try {
      await fetch(this.options.analyticsEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type,
          data,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: Date.now()
        })
      });
    } catch (error) {
      console.error('Failed to send analytics data:', error);
    }
  }

  /**
   * Get all collected metrics
   * @returns {Object} All metrics
   */
  getMetrics() {
    return { ...this.metrics };
  }

  /**
   * Get performance summary
   * @returns {Object} Performance summary
   */
  getSummary() {
    const summary = {
      coreWebVitals: {},
      otherMetrics: {},
      overall: 'unknown'
    };
    
    // Core Web Vitals
    if (this.metrics.lcp) {
      summary.coreWebVitals.lcp = {
        value: Math.round(this.metrics.lcp.value),
        rating: this.metrics.lcp.rating
      };
    }
    
    if (this.metrics.fid) {
      summary.coreWebVitals.fid = {
        value: Math.round(this.metrics.fid.value),
        rating: this.metrics.fid.rating
      };
    }
    
    if (this.metrics.cls) {
      summary.coreWebVitals.cls = {
        value: Math.round(this.metrics.cls.value * 1000) / 1000,
        rating: this.metrics.cls.rating
      };
    }
    
    // Other metrics
    if (this.metrics.fcp) {
      summary.otherMetrics.fcp = {
        value: Math.round(this.metrics.fcp.value),
        rating: this.metrics.fcp.rating
      };
    }
    
    if (this.metrics.ttfb) {
      summary.otherMetrics.ttfb = {
        value: Math.round(this.metrics.ttfb.value),
        rating: this.metrics.ttfb.rating
      };
    }
    
    // Calculate overall rating
    const ratings = Object.values(summary.coreWebVitals).map(m => m.rating);
    if (ratings.length > 0) {
      const goodCount = ratings.filter(r => r === 'good').length;
      const poorCount = ratings.filter(r => r === 'poor').length;
      
      if (poorCount === 0 && goodCount === ratings.length) {
        summary.overall = 'good';
      } else if (poorCount === 0) {
        summary.overall = 'needs-improvement';
      } else {
        summary.overall = 'poor';
      }
    }
    
    return summary;
  }

  /**
   * Cleanup observers
   */
  destroy() {
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers = [];
  }
}

// Create global instance
export const performanceMonitor = new PerformanceMonitor();

/**
 * Enhanced Performance Monitor with Auditing Capabilities
 */
export class EnhancedPerformanceMonitor extends PerformanceMonitor {
  constructor(options = {}) {
    super(options);
    this.auditResults = null;
    this.lastAuditTime = null;
  }

  /**
   * Run comprehensive performance audit
   */
  async runComprehensiveAudit() {
    try {
      // Import auditing modules dynamically to avoid circular dependencies
      const { PerformanceAuditor } = await import('./performance-auditor.js');
      const { NetworkTestSuite } = await import('./network-tester.js');
      const { ContentValidator } = await import('./content-validator.js');

      const auditor = new PerformanceAuditor();
      const networkTester = new NetworkTestSuite();
      const contentValidator = new ContentValidator();

      // Run all audits
      const [auditResults, networkResults, contentValidation] = await Promise.all([
        auditor.runAudit(),
        networkTester.runComprehensiveTest(),
        Promise.resolve(contentValidator.validate())
      ]);

      this.auditResults = {
        timestamp: new Date().toISOString(),
        performance: auditResults,
        network: networkResults,
        content: contentValidation,
        summary: this.generateAuditSummary(auditResults, networkResults, contentValidation)
      };

      this.lastAuditTime = Date.now();

      // Report results
      if (this.options.reportToConsole) {
        this.reportAuditResults();
      }

      return this.auditResults;
    } catch (error) {
      console.error('Comprehensive audit failed:', error);
      throw error;
    }
  }

  /**
   * Generate audit summary
   */
  generateAuditSummary(performance, network, content) {
    const summary = {
      overallScore: 0,
      coreWebVitalsScore: 0,
      networkScore: 0,
      contentScore: 0,
      recommendations: [],
      criticalIssues: []
    };

    // Calculate Core Web Vitals score
    if (performance.coreWebVitals && performance.coreWebVitals.ratings) {
      const ratings = Object.values(performance.coreWebVitals.ratings);
      const goodCount = ratings.filter(r => r === 'good').length;
      summary.coreWebVitalsScore = Math.round((goodCount / ratings.length) * 100);
    }

    // Calculate network score
    if (network.loadTimeTests && network.loadTimeTests.tests) {
      const tests = Object.values(network.loadTimeTests.tests);
      const goodCount = tests.filter(t => t.rating === 'good').length;
      summary.networkScore = Math.round((goodCount / tests.length) * 100);
    }

    // Calculate content score
    if (content.summary) {
      const errorWeight = content.summary.totalErrors * 10;
      const warningWeight = content.summary.totalWarnings * 5;
      const totalDeductions = errorWeight + warningWeight;
      summary.contentScore = Math.max(0, 100 - totalDeductions);
    }

    // Calculate overall score
    summary.overallScore = Math.round(
      (summary.coreWebVitalsScore * 0.4 + 
       summary.networkScore * 0.3 + 
       summary.contentScore * 0.3)
    );

    // Compile recommendations
    if (performance.recommendations) {
      summary.recommendations.push(...performance.recommendations);
    }
    if (network.recommendations) {
      summary.recommendations.push(...network.recommendations);
    }

    // Identify critical issues
    summary.criticalIssues = summary.recommendations.filter(r => r.priority === 'high');

    return summary;
  }

  /**
   * Report audit results to console
   */
  reportAuditResults() {
    if (!this.auditResults) return;

    console.group('🚀 Comprehensive Performance Audit Results');
    
    console.group('📊 Summary Scores');
    console.table({
      'Overall Score': `${this.auditResults.summary.overallScore}/100`,
      'Core Web Vitals': `${this.auditResults.summary.coreWebVitalsScore}/100`,
      'Network Performance': `${this.auditResults.summary.networkScore}/100`,
      'Content Quality': `${this.auditResults.summary.contentScore}/100`
    });
    console.groupEnd();

    if (this.auditResults.summary.criticalIssues.length > 0) {
      console.group('🔴 Critical Issues');
      this.auditResults.summary.criticalIssues.forEach((issue, index) => {
        console.error(`${index + 1}. ${issue.issue}`);
      });
      console.groupEnd();
    }

    console.group('💡 Top Recommendations');
    this.auditResults.summary.recommendations
      .slice(0, 5)
      .forEach((rec, index) => {
        const emoji = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
        console.log(`${emoji} ${index + 1}. ${rec.issue}`);
      });
    console.groupEnd();

    console.groupEnd();
  }

  /**
   * Get audit results
   */
  getAuditResults() {
    return this.auditResults;
  }

  /**
   * Check if audit is stale (older than 1 hour)
   */
  isAuditStale() {
    if (!this.lastAuditTime) return true;
    return Date.now() - this.lastAuditTime > 3600000; // 1 hour
  }
}

// Create enhanced global instance
export const enhancedPerformanceMonitor = new EnhancedPerformanceMonitor();

export default PerformanceMonitor;