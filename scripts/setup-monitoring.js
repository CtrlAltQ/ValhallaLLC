#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('📊 Setting up monitoring and analytics...');

// Create monitoring configuration
const monitoringConfig = {
  analytics: {
    googleAnalytics: {
      enabled: true,
      trackingId: 'GA_MEASUREMENT_ID', // Replace with actual GA4 measurement ID
      events: {
        formSubmissions: true,
        portfolioViews: true,
        socialClicks: true,
        newsletterSignups: true
      }
    },
    customEvents: {
      contactFormSubmission: 'contact_form_submit',
      portfolioView: 'portfolio_view',
      artistSelect: 'artist_select',
      socialMediaClick: 'social_click',
      newsletterSignup: 'newsletter_signup',
      imageView: 'image_view'
    }
  },
  errorMonitoring: {
    enabled: true,
    logLevel: 'error',
    reportToConsole: true,
    reportToAnalytics: true
  },
  performance: {
    enabled: true,
    trackCoreWebVitals: true,
    trackCustomMetrics: true
  }
};

// Create enhanced analytics module
const analyticsModule = `// Enhanced Analytics Module
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
    
    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = \`https://www.googletagmanager.com/gtag/js?id=\${trackingId}\`;
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
const analyticsConfig = ${JSON.stringify(monitoringConfig, null, 2)};
const analytics = new AnalyticsManager(analyticsConfig);

// Export for use in other modules
window.ValhallaTattooAnalytics = analytics;

export default analytics;`;

// Create consent banner component
const consentBannerComponent = `// Privacy Consent Banner Component
class ConsentBanner {
  constructor() {
    this.consentGiven = localStorage.getItem('analytics-consent');
    this.init();
  }
  
  init() {
    if (!this.consentGiven) {
      this.showBanner();
    }
  }
  
  showBanner() {
    const banner = document.createElement('div');
    banner.id = 'consent-banner';
    banner.className = 'consent-banner';
    banner.innerHTML = \`
      <div class="consent-content">
        <div class="consent-text">
          <h3>Privacy & Cookies</h3>
          <p>We use cookies and analytics to improve your experience and understand how you use our site. This helps us showcase our artists' work better and improve our services.</p>
        </div>
        <div class="consent-actions">
          <button id="consent-accept" class="btn btn-primary">Accept</button>
          <button id="consent-decline" class="btn btn-secondary">Decline</button>
          <a href="/privacy-policy.html" class="consent-link">Privacy Policy</a>
        </div>
      </div>
    \`;
    
    document.body.appendChild(banner);
    
    // Add event listeners
    document.getElementById('consent-accept').addEventListener('click', () => {
      this.grantConsent();
    });
    
    document.getElementById('consent-decline').addEventListener('click', () => {
      this.declineConsent();
    });
    
    // Show banner with animation
    setTimeout(() => {
      banner.classList.add('show');
    }, 100);
  }
  
  grantConsent() {
    localStorage.setItem('analytics-consent', 'granted');
    this.hideBanner();
    
    // Initialize analytics if not already done
    if (window.ValhallaTattooAnalytics) {
      window.ValhallaTattooAnalytics.consentGiven = true;
      window.ValhallaTattooAnalytics.init();
    }
  }
  
  declineConsent() {
    localStorage.setItem('analytics-consent', 'declined');
    this.hideBanner();
  }
  
  hideBanner() {
    const banner = document.getElementById('consent-banner');
    if (banner) {
      banner.classList.add('hide');
      setTimeout(() => {
        banner.remove();
      }, 300);
    }
  }
}

// Initialize consent banner
document.addEventListener('DOMContentLoaded', () => {
  new ConsentBanner();
});

export default ConsentBanner;`;

// Create monitoring dashboard HTML
const monitoringDashboard = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Valhalla Tattoo - Monitoring Dashboard</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 20px;
            background: #f5f5f5;
        }
        .dashboard {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            background: white;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .metrics-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        .metric-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .metric-title {
            font-size: 14px;
            color: #666;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .metric-value {
            font-size: 32px;
            font-weight: bold;
            color: #333;
            margin-bottom: 5px;
        }
        .metric-change {
            font-size: 14px;
            color: #28a745;
        }
        .metric-change.negative {
            color: #dc3545;
        }
        .status-indicator {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-right: 8px;
        }
        .status-good { background: #28a745; }
        .status-warning { background: #ffc107; }
        .status-error { background: #dc3545; }
        .logs-section {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .log-entry {
            padding: 10px;
            border-bottom: 1px solid #eee;
            font-family: monospace;
            font-size: 12px;
        }
        .log-error { color: #dc3545; }
        .log-warning { color: #ffc107; }
        .log-info { color: #17a2b8; }
    </style>
</head>
<body>
    <div class="dashboard">
        <div class="header">
            <h1>🎨 Valhalla Tattoo - Monitoring Dashboard</h1>
            <p>Real-time monitoring and analytics for the website</p>
        </div>
        
        <div class="metrics-grid">
            <div class="metric-card">
                <div class="metric-title">
                    <span class="status-indicator status-good"></span>
                    Website Status
                </div>
                <div class="metric-value">Online</div>
                <div class="metric-change">Last checked: <span id="last-check">--</span></div>
            </div>
            
            <div class="metric-card">
                <div class="metric-title">Page Load Time</div>
                <div class="metric-value" id="load-time">--</div>
                <div class="metric-change">Average over 24h</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-title">Form Submissions</div>
                <div class="metric-value" id="form-submissions">--</div>
                <div class="metric-change">This week</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-title">Portfolio Views</div>
                <div class="metric-value" id="portfolio-views">--</div>
                <div class="metric-change">This week</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-title">Social Media Clicks</div>
                <div class="metric-value" id="social-clicks">--</div>
                <div class="metric-change">This week</div>
            </div>
            
            <div class="metric-card">
                <div class="metric-title">Newsletter Signups</div>
                <div class="metric-value" id="newsletter-signups">--</div>
                <div class="metric-change">This week</div>
            </div>
        </div>
        
        <div class="logs-section">
            <h2>Recent Activity</h2>
            <div id="activity-log">
                <div class="log-entry log-info">
                    [INFO] Monitoring dashboard initialized
                </div>
                <div class="log-entry log-info">
                    [INFO] Analytics tracking active
                </div>
                <div class="log-entry log-info">
                    [INFO] Error monitoring enabled
                </div>
            </div>
        </div>
    </div>
    
    <script>
        // Simple monitoring dashboard functionality
        function updateDashboard() {
            // Update last check time
            document.getElementById('last-check').textContent = new Date().toLocaleTimeString();
            
            // Simulate metrics (in production, these would come from real analytics)
            document.getElementById('load-time').textContent = (Math.random() * 2 + 1).toFixed(2) + 's';
            document.getElementById('form-submissions').textContent = Math.floor(Math.random() * 50 + 10);
            document.getElementById('portfolio-views').textContent = Math.floor(Math.random() * 500 + 100);
            document.getElementById('social-clicks').textContent = Math.floor(Math.random() * 200 + 50);
            document.getElementById('newsletter-signups').textContent = Math.floor(Math.random() * 30 + 5);
        }
        
        // Update dashboard every 30 seconds
        updateDashboard();
        setInterval(updateDashboard, 30000);
        
        // Add log entry
        function addLogEntry(type, message) {
            const log = document.getElementById('activity-log');
            const entry = document.createElement('div');
            entry.className = \`log-entry log-\${type}\`;
            entry.textContent = \`[\${type.toUpperCase()}] \${new Date().toLocaleTimeString()} - \${message}\`;
            log.insertBefore(entry, log.firstChild);
            
            // Keep only last 20 entries
            while (log.children.length > 20) {
                log.removeChild(log.lastChild);
            }
        }
        
        // Simulate some activity
        setTimeout(() => addLogEntry('info', 'User visited homepage'), 5000);
        setTimeout(() => addLogEntry('info', 'Portfolio page viewed'), 10000);
        setTimeout(() => addLogEntry('info', 'Contact form submitted'), 15000);
    </script>
</body>
</html>`;

// Write all monitoring files
try {
  // Update analytics module
  fs.writeFileSync('js/modules/analytics.js', analyticsModule);
  console.log('✅ Enhanced analytics module created');
  
  // Update consent banner component
  fs.writeFileSync('components/analytics/consent-banner.js', consentBannerComponent);
  console.log('✅ Consent banner component updated');
  
  // Create monitoring dashboard
  fs.writeFileSync('monitoring-dashboard.html', monitoringDashboard);
  console.log('✅ Monitoring dashboard created');
  
  // Create monitoring config file
  fs.writeFileSync('js/config/monitoring.js', `// Monitoring Configuration
export const monitoringConfig = ${JSON.stringify(monitoringConfig, null, 2)};

export default monitoringConfig;`);
  console.log('✅ Monitoring configuration created');
  
  console.log('\n📊 Monitoring setup complete!');
  console.log('\nNext steps:');
  console.log('1. Replace GA_MEASUREMENT_ID with your actual Google Analytics 4 measurement ID');
  console.log('2. Configure your analytics service (Google Analytics, etc.)');
  console.log('3. Test the monitoring dashboard at /monitoring-dashboard.html');
  console.log('4. Set up alerts for critical errors');
  console.log('5. Review privacy policy and consent banner text');
  
} catch (error) {
  console.error('❌ Monitoring setup failed:', error);
  process.exit(1);
}