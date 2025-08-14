/**
 * Application Configuration
 * Global settings and environment variables
 */

export const appConfig = {
  // Application info
  name: 'Valhalla Tattoo',
  version: '1.0.0',
  
  // Environment
  environment: 'development', // development, staging, production
  
  // API endpoints
  api: {
    formspree: 'https://formspree.io/f/YOUR_FORM_ID',
    instagram: {
      accessToken: 'YOUR_INSTAGRAM_ACCESS_TOKEN',
      userId: 'YOUR_INSTAGRAM_USER_ID',
      baseUrl: 'https://graph.instagram.com'
    },
    newsletter: {
      service: 'mailerlite', // mailerlite, convertkit
      apiKey: 'YOUR_API_KEY',
      listId: 'YOUR_LIST_ID'
    }
  },
  
  // Feature flags
  features: {
    animations: true,
    lazyLoading: true,
    serviceWorker: true,
    analytics: false, // Will be enabled in later tasks
    socialMedia: false, // Will be enabled in social media tasks
    newsletter: false // Will be enabled in newsletter tasks
  },
  
  // Performance settings
  performance: {
    imageOptimization: true,
    lazyLoadOffset: 100,
    debounceDelay: 250,
    throttleDelay: 16
  },
  
  // Animation settings
  animations: {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    duration: {
      fast: 0.15,
      normal: 0.3,
      slow: 0.6
    }
  },
  
  // Breakpoints (matching CSS)
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  },
  
  // SEO settings
  seo: {
    siteName: 'Valhalla Tattoo',
    defaultTitle: 'Valhalla Tattoo - Professional Tattoo Studio in Spring Hill, TN',
    defaultDescription: 'Premium tattoo artistry in Spring Hill, Tennessee. Expert artists specializing in traditional, realism, and custom tattoo designs.',
    defaultKeywords: ['tattoo studio', 'Spring Hill TN', 'tattoo artists', 'custom tattoos'],
    twitterHandle: '@valhallatattoo',
    facebookPage: 'ValhallaStudio'
  }
};

// Environment-specific overrides
if (appConfig.environment === 'production') {
  appConfig.features.analytics = true;
  appConfig.features.serviceWorker = true;
}

// Export individual configs for convenience
export const { api, features, performance, animations, breakpoints, seo } = appConfig;