// Enhanced Analytics Module
class AnalyticsManager {
  constructor(config) {
    this.config = config;
    this.isInitialized = false;
    this.consentGiven = false;
    
    this.init();
  }
  
  async init() {
    try {
      // Check for consent
      this.consentGiven = this.checkConsent();
      
      if (this.consentGiven && this.config.analytics.googleAnalytics.enabled) {
        await this.initGoogleAnalytics();
      }
      
      this.setupErrorMonitoring();
      this.setupPerformanceMonitoring();
      this.isInitialized = true;
      
      console.log('✅ Analytics initialized successfully');
    } catch (error) {
      console.error('❌ Analytics initialization failed:', error);
    }
  }
  
  checkConsent() {
    // Check for stored consent or show consent banner
    const consent = localStorage.getItem('analytics-consent');
    return consent === 'granted';
  }
  
  async initGoogleAnalytics() {
    const { trackingId } = this.config.analytics.googleAnalytics;

    if (!trackingId || trackingId === 'GA_MEASUREMENT_ID') {
      window.gtag = function() {};
      console.warn('Google Analytics disabled: tracking ID not provided.');
      return;
    }

    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', trackingId, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });

    console.log('📊 Google Analytics initialized');
  }
  
  setupErrorMonitoring() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.logError('JavaScript Error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      });
    });
    
    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.logError('Unhandled Promise Rejection', {
        reason: event.reason,
        stack: event.reason?.stack
      });
    });
    
    console.log('🔍 Error monitoring setup complete');
  }
  
  setupPerformanceMonitoring() {
    if (!this.config.performance.enabled) return;
    
    // Core Web Vitals
    if (this.config.performance.trackCoreWebVitals) {
      this.trackCoreWebVitals();
    }
    
    // Custom performance metrics
    if (this.config.performance.trackCustomMetrics) {
      this.trackCustomMetrics();
    }
  }
  
  trackCoreWebVitals() {
    // Track Largest Contentful Paint (LCP)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        this.trackEvent('core_web_vitals', {
          metric: 'LCP',
          value: Math.round(entry.startTime),
          rating: entry.startTime < 2500 ? 'good' : entry.startTime < 4000 ? 'needs_improvement' : 'poor'
        });
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });
    
    // Track First Input Delay (FID)
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        this.trackEvent('core_web_vitals', {
          metric: 'FID',
          value: Math.round(entry.processingStart - entry.startTime),
          rating: entry.processingStart - entry.startTime < 100 ? 'good' : entry.processingStart - entry.startTime < 300 ? 'needs_improvement' : 'poor'
        });
      }
    }).observe({ entryTypes: ['first-input'] });
    
    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      
      this.trackEvent('core_web_vitals', {
        metric: 'CLS',
        value: Math.round(clsValue * 1000) / 1000,
        rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs_improvement' : 'poor'
      });
    }).observe({ entryTypes: ['layout-shift'] });
  }
  
  trackCustomMetrics() {
    // Track page load time
    window.addEventListener('load', () => {
      const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
      this.trackEvent('performance', {
        metric: 'page_load_time',
        value: loadTime,
        page: window.location.pathname
      });
    });
    
    // Track DOM content loaded time
    document.addEventListener('DOMContentLoaded', () => {
      const domTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
      this.trackEvent('performance', {
        metric: 'dom_content_loaded',
        value: domTime,
        page: window.location.pathname
      });
    });
  }
  
  trackEvent(eventName, parameters = {}) {
    if (!this.isInitialized || !this.consentGiven) return;
    
    try {
      // Track with Google Analytics
      if (window.gtag) {
        window.gtag('event', eventName, {
          ...parameters,
          timestamp: new Date().toISOString()
        });
      }
      
      // Log to console in development
      if (this.config.errorMonitoring.reportToConsole) {
        console.log('📊 Event tracked:', eventName, parameters);
      }
    } catch (error) {
      console.error('❌ Event tracking failed:', error);
    }
  }
  
  logError(errorType, errorData) {
    if (!this.config.errorMonitoring.enabled) return;
    
    const errorInfo = {
      type: errorType,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...errorData
    };
    
    // Log to console
    if (this.config.errorMonitoring.reportToConsole) {
      console.error('🚨 Error logged:', errorInfo);
    }
    
    // Report to analytics
    if (this.config.errorMonitoring.reportToAnalytics && this.consentGiven) {
      this.trackEvent('error', {
        error_type: errorType,
        error_message: errorData.message || 'Unknown error',
        page: window.location.pathname
      });
    }
  }
  
  // Public methods for tracking specific events
  trackFormSubmission(formType, artistSelected = null) {
    this.trackEvent(this.config.analytics.customEvents.contactFormSubmission, {
      form_type: formType,
      artist_selected: artistSelected,
      page: window.location.pathname
    });
  }
  
  trackPortfolioView(artistName) {
    this.trackEvent(this.config.analytics.customEvents.portfolioView, {
      artist_name: artistName,
      page: window.location.pathname
    });
  }
  
  trackSocialClick(platform, url) {
    this.trackEvent(this.config.analytics.customEvents.socialMediaClick, {
      platform: platform,
      destination_url: url,
      page: window.location.pathname
    });
  }
  
  trackNewsletterSignup(source) {
    this.trackEvent(this.config.analytics.customEvents.newsletterSignup, {
      source: source,
      page: window.location.pathname
    });
  }
  
  trackImageView(imageName, artistName) {
    this.trackEvent(this.config.analytics.customEvents.imageView, {
      image_name: imageName,
      artist_name: artistName,
      page: window.location.pathname
    });
  }
}

// Initialize analytics
const analyticsConfig = {
  "analytics": {
    "googleAnalytics": {
      "enabled": true,
      "trackingId": "GA_MEASUREMENT_ID",
      "events": {
        "formSubmissions": true,
        "portfolioViews": true,
        "socialClicks": true,
        "newsletterSignups": true
      }
    },
    "customEvents": {
      "contactFormSubmission": "contact_form_submit",
      "portfolioView": "portfolio_view",
      "artistSelect": "artist_select",
      "socialMediaClick": "social_click",
      "newsletterSignup": "newsletter_signup",
      "imageView": "image_view"
    }
  },
  "errorMonitoring": {
    "enabled": true,
    "logLevel": "error",
    "reportToConsole": true,
    "reportToAnalytics": true
  },
  "performance": {
    "enabled": true,
    "trackCoreWebVitals": true,
    "trackCustomMetrics": true
  }
};
const analytics = new AnalyticsManager(analyticsConfig);

// Export for use in other modules
window.ValhallaTattooAnalytics = analytics;

export default analytics;