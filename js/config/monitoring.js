// Monitoring Configuration
export const monitoringConfig = {
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

export default monitoringConfig;