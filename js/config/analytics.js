/**
 * Analytics Configuration
 * Google Analytics 4 and tracking settings
 */

export const analyticsConfig = {
    // Google Analytics 4 Measurement ID
    // Replace with actual measurement ID from Google Analytics
    measurementId: 'G-XXXXXXXXXX',
    
    // Debug mode (set to false in production)
    debugMode: false,
    
    // Default consent settings
    defaultConsent: {
        analytics_storage: 'denied',
        ad_storage: 'denied',
        functionality_storage: 'granted',
        personalization_storage: 'denied',
        security_storage: 'granted'
    },
    
    // Event tracking configuration
    events: {
        // Form submission tracking
        forms: {
            enabled: true,
            trackValidation: true,
            trackFieldInteractions: false
        },
        
        // Portfolio interaction tracking
        portfolio: {
            enabled: true,
            trackImageViews: true,
            trackLightboxInteractions: true,
            trackFilterUsage: true
        },
        
        // Social media tracking
        social: {
            enabled: true,
            trackClicks: true,
            trackShares: false // Not implemented yet
        },
        
        // Scroll depth tracking
        scrollDepth: {
            enabled: true,
            milestones: [25, 50, 75, 90, 100]
        },
        
        // Performance tracking
        performance: {
            enabled: true,
            trackCoreWebVitals: true,
            trackCustomMetrics: true
        },
        
        // Newsletter tracking
        newsletter: {
            enabled: true,
            trackSignups: true,
            trackSource: true
        }
    },
    
    // Custom dimensions and metrics
    customDimensions: {
        artist_selected: 'custom_dimension_1',
        user_type: 'custom_dimension_2',
        page_section: 'custom_dimension_3'
    },
    
    // Enhanced ecommerce (for future booking system)
    ecommerce: {
        enabled: false, // Will be enabled when booking system is implemented
        currency: 'USD'
    },
    
    // Privacy settings
    privacy: {
        anonymizeIp: true,
        respectDoNotTrack: true,
        cookieExpires: 63072000, // 2 years in seconds
        consentMode: true
    }
};

// Environment-specific overrides
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    analyticsConfig.debugMode = true;
    analyticsConfig.measurementId = 'G-XXXXXXXXXX'; // Use test measurement ID for development
}

export default analyticsConfig;