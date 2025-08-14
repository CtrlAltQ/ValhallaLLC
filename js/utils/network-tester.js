/**
 * Network Condition Testing Utility
 * Tests page load times across different network conditions and provides optimization recommendations
 */

/**
 * Network Speed Simulator
 */
export class NetworkSpeedSimulator {
  constructor() {
    this.profiles = {
      'fast-3g': {
        name: 'Fast 3G',
        downloadThroughput: 1.6 * 1024 * 1024 / 8, // 1.6 Mbps in bytes/sec
        uploadThroughput: 0.75 * 1024 * 1024 / 8,   // 0.75 Mbps in bytes/sec
        latency: 562.5 // ms
      },
      'slow-3g': {
        name: 'Slow 3G',
        downloadThroughput: 0.4 * 1024 * 1024 / 8,  // 0.4 Mbps in bytes/sec
        uploadThroughput: 0.4 * 1024 * 1024 / 8,    // 0.4 Mbps in bytes/sec
        latency: 2000 // ms
      },
      '2g': {
        name: '2G',
        downloadThroughput: 0.25 * 1024 * 1024 / 8, // 0.25 Mbps in bytes/sec
        uploadThroughput: 0.05 * 1024 * 1024 / 8,   // 0.05 Mbps in bytes/sec
        latency: 2800 // ms
      },
      'wifi': {
        name: 'WiFi',
        downloadThroughput: 30 * 1024 * 1024 / 8,   // 30 Mbps in bytes/sec
        uploadThroughput: 15 * 1024 * 1024 / 8,     // 15 Mbps in bytes/sec
        latency: 28 // ms
      }
    };
    this.currentProfile = null;
  }

  /**
   * Simulate network conditions (for testing purposes)
   */
  simulateNetwork(profileName) {
    const profile = this.profiles[profileName];
    if (!profile) {
      console.error(`Network profile '${profileName}' not found`);
      return;
    }

    this.currentProfile = profile;
    console.log(`Simulating ${profile.name} network conditions`);
    
    // Note: Actual network throttling would require browser dev tools or server-side implementation
    // This is primarily for calculating expected load times
    return profile;
  }

  /**
   * Calculate expected load time for a resource
   */
  calculateLoadTime(resourceSize, profileName = 'fast-3g') {
    const profile = this.profiles[profileName];
    if (!profile) return null;

    const downloadTime = (resourceSize / profile.downloadThroughput) * 1000; // Convert to ms
    const totalTime = profile.latency + downloadTime;

    return {
      latency: profile.latency,
      downloadTime: Math.round(downloadTime),
      totalTime: Math.round(totalTime),
      profile: profile.name
    };
  }

  /**
   * Get current network information
   */
  getCurrentNetworkInfo() {
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
}

/**
 * Page Load Time Tester
 */
export class PageLoadTester {
  constructor() {
    this.networkSimulator = new NetworkSpeedSimulator();
    this.testResults = {};
  }

  /**
   * Test page load performance across different network conditions
   */
  async testAcrossNetworks() {
    const results = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      tests: {},
      recommendations: []
    };

    // Get current page resources
    const resources = this.getPageResources();
    const totalSize = resources.reduce((sum, resource) => sum + (resource.size || 0), 0);

    // Test each network profile
    Object.keys(this.networkSimulator.profiles).forEach(profileName => {
      const loadTime = this.networkSimulator.calculateLoadTime(totalSize, profileName);
      
      results.tests[profileName] = {
        ...loadTime,
        totalSize: Math.round(totalSize / 1024), // KB
        resourceCount: resources.length,
        rating: this.rateLoadTime(loadTime.totalTime, profileName)
      };
    });

    // Generate recommendations
    results.recommendations = this.generateNetworkRecommendations(results.tests);

    this.testResults = results;
    return results;
  }

  /**
   * Get all page resources with sizes
   */
  getPageResources() {
    const resources = [];

    if ('performance' in window && 'getEntriesByType' in performance) {
      const entries = performance.getEntriesByType('resource');
      
      entries.forEach(entry => {
        resources.push({
          name: entry.name,
          size: entry.transferSize || entry.encodedBodySize || 0,
          type: this.getResourceType(entry.name),
          duration: entry.responseEnd - entry.startTime
        });
      });
    }

    return resources;
  }

  /**
   * Determine resource type from URL
   */
  getResourceType(url) {
    const extension = url.split('.').pop().toLowerCase().split('?')[0];
    
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
      return 'image';
    } else if (['js'].includes(extension)) {
      return 'script';
    } else if (['css'].includes(extension)) {
      return 'stylesheet';
    } else if (['woff', 'woff2', 'ttf', 'otf'].includes(extension)) {
      return 'font';
    }
    return 'other';
  }

  /**
   * Rate load time performance
   */
  rateLoadTime(loadTime, networkType) {
    const thresholds = {
      '2g': { good: 10000, poor: 20000 },
      'slow-3g': { good: 8000, poor: 15000 },
      'fast-3g': { good: 5000, poor: 10000 },
      'wifi': { good: 2000, poor: 4000 }
    };

    const threshold = thresholds[networkType] || thresholds['fast-3g'];
    
    if (loadTime <= threshold.good) {
      return 'good';
    } else if (loadTime <= threshold.poor) {
      return 'needs-improvement';
    } else {
      return 'poor';
    }
  }

  /**
   * Generate network-specific recommendations
   */
  generateNetworkRecommendations(tests) {
    const recommendations = [];

    // Check slow network performance
    const slowNetworks = ['2g', 'slow-3g'];
    const poorPerformance = slowNetworks.filter(network => 
      tests[network] && tests[network].rating === 'poor'
    );

    if (poorPerformance.length > 0) {
      recommendations.push({
        priority: 'high',
        issue: `Poor performance on slow networks (${poorPerformance.join(', ')})`,
        suggestions: [
          'Implement aggressive image compression',
          'Use critical CSS inlining',
          'Enable resource preloading for key assets',
          'Consider implementing a service worker for caching',
          'Minimize initial JavaScript bundle size'
        ]
      });
    }

    // Check total page size
    const averageSize = Object.values(tests).reduce((sum, test) => sum + test.totalSize, 0) / Object.keys(tests).length;
    
    if (averageSize > 2000) { // 2MB
      recommendations.push({
        priority: 'high',
        issue: `Large page size (${Math.round(averageSize)}KB)`,
        suggestions: [
          'Optimize and compress images',
          'Remove unused CSS and JavaScript',
          'Implement lazy loading for non-critical resources',
          'Use WebP image format',
          'Enable gzip/brotli compression'
        ]
      });
    } else if (averageSize > 1000) { // 1MB
      recommendations.push({
        priority: 'medium',
        issue: `Moderate page size (${Math.round(averageSize)}KB)`,
        suggestions: [
          'Consider further image optimization',
          'Review JavaScript bundle size',
          'Implement resource prioritization'
        ]
      });
    }

    // Check WiFi performance
    if (tests.wifi && tests.wifi.rating !== 'good') {
      recommendations.push({
        priority: 'medium',
        issue: 'Suboptimal performance even on fast connections',
        suggestions: [
          'Optimize server response times',
          'Minimize render-blocking resources',
          'Use HTTP/2 server push for critical resources',
          'Implement resource hints (preload, prefetch)'
        ]
      });
    }

    return recommendations;
  }

  /**
   * Generate detailed network performance report
   */
  generateReport() {
    if (!this.testResults || Object.keys(this.testResults).length === 0) {
      console.warn('No test results available. Run testAcrossNetworks() first.');
      return null;
    }

    console.group('🌐 Network Performance Report');
    
    console.group('📊 Load Time Analysis');
    console.table(this.testResults.tests);
    console.groupEnd();

    console.group('📋 Network Recommendations');
    this.testResults.recommendations.forEach((rec, index) => {
      const emoji = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
      console.log(`${emoji} ${index + 1}. ${rec.issue}`);
      rec.suggestions.forEach(suggestion => {
        console.log(`   • ${suggestion}`);
      });
    });
    console.groupEnd();

    console.groupEnd();

    return this.testResults;
  }
}

/**
 * Real User Monitoring (RUM) Simulator
 */
export class RUMSimulator {
  constructor() {
    this.metrics = [];
    this.isCollecting = false;
  }

  /**
   * Start collecting performance metrics
   */
  startCollection() {
    this.isCollecting = true;
    this.collectNavigationTiming();
    this.collectResourceTiming();
    this.setupPerformanceObserver();
  }

  /**
   * Collect navigation timing data
   */
  collectNavigationTiming() {
    if ('performance' in window && 'timing' in performance) {
      const timing = performance.timing;
      const navigation = {
        type: 'navigation',
        timestamp: Date.now(),
        metrics: {
          dns: timing.domainLookupEnd - timing.domainLookupStart,
          tcp: timing.connectEnd - timing.connectStart,
          request: timing.responseStart - timing.requestStart,
          response: timing.responseEnd - timing.responseStart,
          dom: timing.domContentLoadedEventEnd - timing.navigationStart,
          load: timing.loadEventEnd - timing.navigationStart
        }
      };

      this.metrics.push(navigation);
    }
  }

  /**
   * Collect resource timing data
   */
  collectResourceTiming() {
    if ('performance' in window && 'getEntriesByType' in performance) {
      const resources = performance.getEntriesByType('resource');
      
      resources.forEach(resource => {
        this.metrics.push({
          type: 'resource',
          timestamp: Date.now(),
          name: resource.name,
          duration: resource.responseEnd - resource.startTime,
          size: resource.transferSize || 0,
          cached: resource.transferSize === 0 && resource.decodedBodySize > 0
        });
      });
    }
  }

  /**
   * Setup performance observer for real-time metrics
   */
  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          this.metrics.push({
            type: entry.entryType,
            timestamp: Date.now(),
            name: entry.name,
            startTime: entry.startTime,
            duration: entry.duration || 0
          });
        });
      });

      observer.observe({ entryTypes: ['measure', 'mark', 'resource'] });
    }
  }

  /**
   * Generate RUM report
   */
  generateRUMReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalMetrics: this.metrics.length,
      navigation: this.metrics.filter(m => m.type === 'navigation'),
      resources: this.metrics.filter(m => m.type === 'resource'),
      summary: {
        averageLoadTime: 0,
        totalResourceSize: 0,
        cachedResources: 0
      }
    };

    // Calculate summary statistics
    const resourceMetrics = report.resources;
    if (resourceMetrics.length > 0) {
      report.summary.averageLoadTime = resourceMetrics.reduce((sum, r) => sum + r.duration, 0) / resourceMetrics.length;
      report.summary.totalResourceSize = resourceMetrics.reduce((sum, r) => sum + r.size, 0);
      report.summary.cachedResources = resourceMetrics.filter(r => r.cached).length;
    }

    return report;
  }

  /**
   * Stop collecting metrics
   */
  stopCollection() {
    this.isCollecting = false;
  }
}

/**
 * Network Testing Suite
 */
export class NetworkTestSuite {
  constructor() {
    this.networkSimulator = new NetworkSpeedSimulator();
    this.pageLoadTester = new PageLoadTester();
    this.rumSimulator = new RUMSimulator();
  }

  /**
   * Run comprehensive network testing
   */
  async runComprehensiveTest() {
    console.log('🚀 Starting comprehensive network testing...');

    const results = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      currentNetwork: this.networkSimulator.getCurrentNetworkInfo(),
      loadTimeTests: await this.pageLoadTester.testAcrossNetworks(),
      rumData: this.rumSimulator.generateRUMReport(),
      recommendations: []
    };

    // Compile all recommendations
    results.recommendations = [
      ...results.loadTimeTests.recommendations
    ];

    // Generate final report
    this.generateComprehensiveReport(results);

    return results;
  }

  /**
   * Generate comprehensive network testing report
   */
  generateComprehensiveReport(results) {
    console.group('🌐 Comprehensive Network Testing Report');
    
    if (results.currentNetwork) {
      console.group('📡 Current Network');
      console.table(results.currentNetwork);
      console.groupEnd();
    }

    console.group('⏱️ Load Time Tests');
    console.table(results.loadTimeTests.tests);
    console.groupEnd();

    console.group('📊 RUM Data Summary');
    console.table(results.rumData.summary);
    console.groupEnd();

    console.group('💡 All Recommendations');
    results.recommendations.forEach((rec, index) => {
      const emoji = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
      console.log(`${emoji} ${index + 1}. ${rec.issue}`);
      rec.suggestions.forEach(suggestion => {
        console.log(`   • ${suggestion}`);
      });
    });
    console.groupEnd();

    console.groupEnd();

    // Store globally
    window.networkTestResults = results;
  }
}

// Auto-initialize network testing
document.addEventListener('DOMContentLoaded', () => {
  const testSuite = new NetworkTestSuite();
  
  // Start RUM collection
  testSuite.rumSimulator.startCollection();
  
  // Run comprehensive test after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      testSuite.runComprehensiveTest().then(results => {
        console.log('Network testing completed');
      }).catch(error => {
        console.error('Network testing failed:', error);
      });
    }, 3000);
  });
});

export { NetworkSpeedSimulator, PageLoadTester, RUMSimulator, NetworkTestSuite };