/**
 * Cross-Browser Testing Utility
 * Automated tests for browser compatibility
 */

class CrossBrowserTest {
  constructor() {
    this.testResults = [];
    this.criticalFeatures = [
      'css-grid',
      'css-flexbox',
      'css-custom-properties',
      'intersection-observer',
      'service-worker',
      'fetch-api',
      'es6-promises'
    ];
  }

  /**
   * Run all cross-browser tests
   */
  async runAllTests() {
    console.log('🧪 Starting cross-browser compatibility tests...');
    
    // Test CSS features
    this.testCSSFeatures();
    
    // Test JavaScript APIs
    this.testJavaScriptAPIs();
    
    // Test form functionality
    await this.testFormFunctionality();
    
    // Test image loading
    await this.testImageLoading();
    
    // Test animations
    this.testAnimations();
    
    // Test responsive design
    this.testResponsiveDesign();
    
    // Generate report
    this.generateReport();
    
    return this.testResults;
  }

  /**
   * Test CSS feature support
   */
  testCSSFeatures() {
    const cssTests = [
      { name: 'CSS Grid', test: () => CSS.supports('display', 'grid') },
      { name: 'CSS Flexbox', test: () => CSS.supports('display', 'flex') },
      { name: 'CSS Custom Properties', test: () => CSS.supports('color', 'var(--test)') },
      { name: 'CSS Backdrop Filter', test: () => CSS.supports('backdrop-filter', 'blur(10px)') },
      { name: 'CSS Scroll Behavior', test: () => CSS.supports('scroll-behavior', 'smooth') },
      { name: 'CSS Object Fit', test: () => CSS.supports('object-fit', 'cover') }
    ];

    cssTests.forEach(({ name, test }) => {
      const result = test();
      this.addTestResult('CSS', name, result, result ? 'Supported' : 'Not supported');
    });
  }

  /**
   * Test JavaScript API support
   */
  testJavaScriptAPIs() {
    const apiTests = [
      { name: 'Intersection Observer', test: () => 'IntersectionObserver' in window },
      { name: 'Service Worker', test: () => 'serviceWorker' in navigator },
      { name: 'Fetch API', test: () => 'fetch' in window },
      { name: 'Promises', test: () => 'Promise' in window },
      { name: 'Local Storage', test: () => 'localStorage' in window },
      { name: 'Session Storage', test: () => 'sessionStorage' in window },
      { name: 'Web Workers', test: () => 'Worker' in window },
      { name: 'Geolocation', test: () => 'geolocation' in navigator }
    ];

    apiTests.forEach(({ name, test }) => {
      const result = test();
      this.addTestResult('JavaScript API', name, result, result ? 'Available' : 'Not available');
    });
  }

  /**
   * Test form functionality
   */
  async testFormFunctionality() {
    try {
      // Test form validation
      const testForm = document.createElement('form');
      const testInput = document.createElement('input');
      testInput.type = 'email';
      testInput.required = true;
      testInput.value = 'invalid-email';
      testForm.appendChild(testInput);
      
      const validationSupported = testInput.checkValidity !== undefined;
      this.addTestResult('Forms', 'HTML5 Validation', validationSupported, 
        validationSupported ? 'Supported' : 'Not supported');

      // Test file upload
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      const fileSupported = fileInput.files !== undefined;
      this.addTestResult('Forms', 'File Upload', fileSupported,
        fileSupported ? 'Supported' : 'Not supported');

    } catch (error) {
      this.addTestResult('Forms', 'Form Testing', false, `Error: ${error.message}`);
    }
  }

  /**
   * Test image loading and formats
   */
  async testImageLoading() {
    // Test WebP support
    const webpSupported = await this.testWebPSupport();
    this.addTestResult('Images', 'WebP Format', webpSupported,
      webpSupported ? 'Supported' : 'Not supported');

    // Test lazy loading
    const lazyLoadingSupported = 'loading' in HTMLImageElement.prototype;
    this.addTestResult('Images', 'Native Lazy Loading', lazyLoadingSupported,
      lazyLoadingSupported ? 'Supported' : 'Not supported');
  }

  /**
   * Test WebP support
   */
  testWebPSupport() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  /**
   * Test animation support
   */
  testAnimations() {
    const animationTests = [
      { name: 'CSS Animations', test: () => CSS.supports('animation', 'test 1s') },
      { name: 'CSS Transitions', test: () => CSS.supports('transition', 'all 1s') },
      { name: 'CSS Transforms', test: () => CSS.supports('transform', 'translateX(10px)') },
      { name: 'Reduced Motion Preference', test: () => window.matchMedia('(prefers-reduced-motion)').media !== 'not all' }
    ];

    animationTests.forEach(({ name, test }) => {
      const result = test();
      this.addTestResult('Animations', name, result, result ? 'Supported' : 'Not supported');
    });
  }

  /**
   * Test responsive design features
   */
  testResponsiveDesign() {
    const responsiveTests = [
      { name: 'Media Queries', test: () => window.matchMedia('(min-width: 768px)').media !== 'not all' },
      { name: 'Viewport Meta', test: () => document.querySelector('meta[name="viewport"]') !== null },
      { name: 'Touch Events', test: () => 'ontouchstart' in window },
      { name: 'Pointer Events', test: () => 'PointerEvent' in window },
      { name: 'Orientation Change', test: () => 'onorientationchange' in window }
    ];

    responsiveTests.forEach(({ name, test }) => {
      const result = test();
      this.addTestResult('Responsive', name, result, result ? 'Supported' : 'Not supported');
    });
  }

  /**
   * Add test result
   */
  addTestResult(category, name, passed, details) {
    this.testResults.push({
      category,
      name,
      passed,
      details,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Generate test report
   */
  generateReport() {
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(test => test.passed).length;
    const failedTests = totalTests - passedTests;
    
    console.log(`\n📊 Cross-Browser Test Report`);
    console.log(`Total Tests: ${totalTests}`);
    console.log(`Passed: ${passedTests} (${Math.round(passedTests / totalTests * 100)}%)`);
    console.log(`Failed: ${failedTests} (${Math.round(failedTests / totalTests * 100)}%)`);
    
    // Group results by category
    const categories = {};
    this.testResults.forEach(test => {
      if (!categories[test.category]) {
        categories[test.category] = [];
      }
      categories[test.category].push(test);
    });
    
    // Display results by category
    Object.entries(categories).forEach(([category, tests]) => {
      console.log(`\n${category}:`);
      tests.forEach(test => {
        const status = test.passed ? '✅' : '❌';
        console.log(`  ${status} ${test.name}: ${test.details}`);
      });
    });
    
    // Check critical features
    this.checkCriticalFeatures();
  }

  /**
   * Check critical features for functionality
   */
  checkCriticalFeatures() {
    const criticalIssues = this.testResults.filter(test => 
      !test.passed && this.isCriticalFeature(test.name)
    );
    
    if (criticalIssues.length > 0) {
      console.warn('\n⚠️  Critical compatibility issues detected:');
      criticalIssues.forEach(issue => {
        console.warn(`  - ${issue.name}: ${issue.details}`);
      });
    } else {
      console.log('\n✅ All critical features are supported!');
    }
  }

  /**
   * Check if feature is critical
   */
  isCriticalFeature(featureName) {
    return this.criticalFeatures.some(critical => 
      featureName.toLowerCase().includes(critical.replace('-', ' '))
    );
  }

  /**
   * Export results as JSON
   */
  exportResults() {
    return {
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      results: this.testResults,
      summary: {
        total: this.testResults.length,
        passed: this.testResults.filter(test => test.passed).length,
        failed: this.testResults.filter(test => !test.passed).length
      }
    };
  }
}

export default CrossBrowserTest;