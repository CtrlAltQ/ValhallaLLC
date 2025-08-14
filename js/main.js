/**
 * Main Application Entry Point
 * Initializes all modules and handles application lifecycle
 */

import { Homepage } from './modules/homepage.js';
import { Portfolio } from './modules/portfolio.js';
import { Contact } from './modules/contact.js';
import { AnimationSystem } from './modules/animations.js';
import { BlogManager } from './modules/blog.js';
import { NewsletterManager } from './modules/newsletter.js';
import { SocialIntegration } from './modules/social-integration.js';
import { gsapLoader } from './utils/gsap-loader.js';
import SEOManager from './modules/seo.js';
import AnalyticsManager from './modules/analytics.js';
import ConsentBanner from '../components/analytics/consent-banner.js';
import { socialConfig } from './config/social.js';
import { analyticsConfig } from './config/analytics.js';
import { imageOptimizer } from './utils/image-optimizer.js';
import { progressiveEnhancement } from './utils/progressive-enhancement.js';
import { serviceWorkerManager } from './utils/service-worker-manager.js';
import { performanceMonitor } from './utils/performance-monitor.js';
import AnalyticsTestSuite from './utils/analytics-test.js';
import accessibilityManager from './utils/accessibility.js';
import browserCompatibility from './utils/browser-compatibility.js';
import mobileOptimization from './utils/mobile-optimization.js';
import pwaManager from './utils/pwa-manager.js';

class ValhallaTattooApp {
  constructor() {
    // Initialize analytics first (before other modules)
    this.analytics = new AnalyticsManager(analyticsConfig.measurementId);
    if (analyticsConfig.debugMode) {
      this.analytics.enableDebugMode();
    }
    
    this.modules = {
      homepage: new Homepage(),
      portfolio: new Portfolio(),
      contact: new Contact(),
      animations: new AnimationSystem(),
      blog: new BlogManager(),
      newsletter: new NewsletterManager(),
      social: new SocialIntegration(),
      seo: new SEOManager(),
      analytics: this.analytics
    };
    
    this.consentBanner = null;
    this.initialized = false;
    this.scrollDepthTracked = new Set();
  }

  async init() {
    if (this.initialized) return;

    try {
      // Wait for DOM to be ready
      if (document.readyState === 'loading') {
        await new Promise(resolve => {
          document.addEventListener('DOMContentLoaded', resolve);
        });
      }

      // Initialize progressive enhancement and performance optimizations
      await progressiveEnhancement.init();
      await imageOptimizer.init();
      await serviceWorkerManager.init();
      performanceMonitor.init();
      console.log('Progressive enhancement, image optimization, service worker, and performance monitoring initialized');

      // Initialize accessibility manager
      console.log('Accessibility manager initialized');

      // Browser compatibility is automatically initialized on import
      console.log(`Browser detected: ${browserCompatibility.browser.name} ${browserCompatibility.browser.version}`);

      // Load GSAP first for animations
      await gsapLoader.loadGSAP();
      console.log('GSAP loaded successfully');

      // Initialize SEO for current page
      this.initializeSEO();

      // Initialize consent banner for analytics
      this.initializeConsent();

      // Initialize modules in order
      await this.modules.animations.init();
      await this.modules.social.init();
      this.modules.homepage.init();
      this.modules.portfolio.init();
      this.modules.contact.init();
      this.modules.blog.init();
      this.modules.newsletter.init();

      // Initialize analytics tracking
      this.initializeAnalyticsTracking();

      // Initialize analytics test suite in development
      if (analyticsConfig.debugMode) {
        this.analyticsTestSuite = new AnalyticsTestSuite(this.analytics);
        window.analyticsTestSuite = this.analyticsTestSuite;
        console.log('🧪 Analytics Test Suite initialized for development');
      }

      // Trigger initial animations after a short delay
      setTimeout(() => {
        this.modules.homepage.triggerHeroAnimations();
      }, 100);

      this.initialized = true;
      console.log('Valhalla Tattoo app initialized successfully');

      // Dispatch custom event for other scripts
      document.dispatchEvent(new CustomEvent('valhalla:initialized', {
        detail: { app: this }
      }));

    } catch (error) {
      console.error('Failed to initialize Valhalla Tattoo app:', error);
    }
  }

  getModule(name) {
    return this.modules[name];
  }

  /**
   * Initialize SEO based on current page
   */
  initializeSEO() {
    const path = window.location.pathname;
    const seoManager = this.modules.seo;

    if (path === '/' || path === '/index.html') {
      // Homepage SEO
      seoManager.initHomepage();
    } else if (path.includes('/portfolio/')) {
      // Artist portfolio page SEO
      const artistSlug = path.split('/').pop().replace('.html', '');
      this.initializeArtistSEO(artistSlug, seoManager);
    }
  }

  /**
   * Initialize SEO for artist pages
   * @param {string} artistSlug - Artist slug from URL
   * @param {SEOManager} seoManager - SEO manager instance
   */
  initializeArtistSEO(artistSlug, seoManager) {
    // Artist data mapping
    const artistData = {
      pagan: {
        name: 'Pagan',
        specialty: 'Traditional & Neo-Traditional',
        bio: 'Master of traditional and neo-traditional tattoo styles with 8+ years of experience.',
        image: 'https://valhallatattoo.com/images/gallery/pagan.jpg',
        socialMedia: {
          instagram: 'https://instagram.com/pagan_tattoo',
          facebook: 'https://facebook.com/pagan.valhalla.tattoo'
        }
      },
      jimmy: {
        name: 'Jimmy',
        specialty: 'Realism & Black & Grey',
        bio: 'Specialist in photorealistic and black & grey tattoos with 10+ years of experience.',
        image: 'https://valhallatattoo.com/images/gallery/jimmy.jpg',
        socialMedia: {
          instagram: 'https://instagram.com/jimmy_illustrative',
          facebook: 'https://facebook.com/jimmy.valhalla.tattoo'
        }
      },
      micah: {
        name: 'Micah',
        specialty: 'Fine Line & Geometric',
        bio: 'Expert in fine line and geometric tattoo designs with 6+ years of experience.',
        image: 'https://valhallatattoo.com/images/gallery/micah.jpg',
        socialMedia: {
          instagram: 'https://instagram.com/micah_fineline',
          facebook: 'https://facebook.com/micah.valhalla.tattoo'
        }
      },
      sarah: {
        name: 'Sarah',
        specialty: 'Watercolor & Illustrative',
        bio: 'Creative artist specializing in watercolor and illustrative tattoos with 7+ years of experience.',
        image: 'https://valhallatattoo.com/images/gallery/sarah.jpg',
        socialMedia: {
          instagram: 'https://instagram.com/sarah_watercolor',
          facebook: 'https://facebook.com/sarah.valhalla.tattoo'
        }
      },
      kason: {
        name: 'Kason',
        specialty: 'Japanese & Oriental',
        bio: 'Master of Japanese and Oriental tattoo traditions with 12+ years of experience.',
        image: 'https://valhallatattoo.com/images/gallery/kason.jpg',
        socialMedia: {
          instagram: 'https://instagram.com/kason_japanese',
          facebook: 'https://facebook.com/kason.valhalla.tattoo'
        }
      },
      heather: {
        name: 'Heather',
        specialty: 'Botanical & Nature',
        bio: 'Specialist in botanical and nature-inspired tattoos with 9+ years of experience.',
        image: 'https://valhallatattoo.com/images/gallery/heather.jpg',
        socialMedia: {
          instagram: 'https://instagram.com/heather_botanical',
          facebook: 'https://facebook.com/heather.valhalla.tattoo'
        }
      }
    };

    const artist = artistData[artistSlug];
    if (artist) {
      artist.slug = artistSlug; // Add slug to artist data
      seoManager.initArtistPage(artist);
    }
  }

  /**
   * Initialize consent banner and analytics
   */
  initializeConsent() {
    this.consentBanner = new ConsentBanner(this.analytics);
  }

  /**
   * Initialize analytics event tracking
   */
  initializeAnalyticsTracking() {
    // Track scroll depth
    this.initializeScrollTracking();
    
    // Track form submissions
    this.initializeFormTracking();
    
    // Track portfolio interactions
    this.initializePortfolioTracking();
    
    // Track social media clicks
    this.initializeSocialTracking();
    
    // Track external links
    this.initializeExternalLinkTracking();
    
    // Track performance metrics
    this.initializePerformanceTracking();
  }

  /**
   * Initialize scroll depth tracking
   */
  initializeScrollTracking() {
    let ticking = false;
    
    const trackScrollDepth = () => {
      const scrollTop = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      // Track at specific milestones
      const milestones = [25, 50, 75, 90, 100];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !this.scrollDepthTracked.has(milestone)) {
          this.scrollDepthTracked.add(milestone);
          this.analytics.trackScrollDepth(milestone);
        }
      });
      
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(trackScrollDepth);
        ticking = true;
      }
    });
  }

  /**
   * Initialize form submission tracking
   */
  initializeFormTracking() {
    document.addEventListener('submit', (event) => {
      const form = event.target;
      if (form.tagName === 'FORM') {
        const formName = form.getAttribute('name') || form.id || 'unknown';
        const artistField = form.querySelector('[name="artist"]');
        const artist = artistField ? artistField.value : 'general';
        
        this.analytics.trackFormSubmission(formName, {
          artist: artist,
          destination: form.action || 'unknown'
        });
        
        // Track conversion for contact forms
        if (formName.includes('contact') || form.classList.contains('contact-form')) {
          this.analytics.trackContactConversion({
            artist: artist,
            source: document.referrer ? 'referral' : 'direct'
          });
        }
      }
    });
  }

  /**
   * Initialize portfolio interaction tracking
   */
  initializePortfolioTracking() {
    document.addEventListener('click', (event) => {
      const target = event.target;
      
      // Track portfolio image clicks
      if (target.closest('.portfolio-item') || target.closest('.gallery-item')) {
        const portfolioItem = target.closest('.portfolio-item, .gallery-item');
        const artistName = portfolioItem.dataset.artist || 'unknown';
        const imageId = portfolioItem.dataset.imageId || null;
        
        this.analytics.trackPortfolioInteraction('click', {
          artist_name: artistName,
          image_id: imageId,
          portfolio_section: 'main'
        });
      }
      
      // Track lightbox opens
      if (target.closest('.lightbox-trigger')) {
        const artistName = target.dataset.artist || 'unknown';
        this.analytics.trackPortfolioInteraction('lightbox_open', {
          artist_name: artistName
        });
      }
    });
  }

  /**
   * Initialize social media click tracking
   */
  initializeSocialTracking() {
    document.addEventListener('click', (event) => {
      const target = event.target;
      const socialLink = target.closest('a[href*="instagram.com"], a[href*="facebook.com"], a[href*="twitter.com"], a[href*="tiktok.com"]');
      
      if (socialLink) {
        const href = socialLink.href;
        let platform = 'unknown';
        
        if (href.includes('instagram.com')) platform = 'instagram';
        else if (href.includes('facebook.com')) platform = 'facebook';
        else if (href.includes('twitter.com')) platform = 'twitter';
        else if (href.includes('tiktok.com')) platform = 'tiktok';
        
        const source = target.closest('.hero') ? 'hero' : 
                      target.closest('.footer') ? 'footer' : 
                      target.closest('.social-feed') ? 'social_feed' : 'unknown';
        
        this.analytics.trackSocialClick(platform, source);
      }
    });
  }

  /**
   * Initialize external link tracking
   */
  initializeExternalLinkTracking() {
    document.addEventListener('click', (event) => {
      const target = event.target;
      const link = target.closest('a[href]');
      
      if (link && link.hostname !== window.location.hostname) {
        this.analytics.trackExternalLink(link.href, link.textContent.trim());
      }
    });
  }

  /**
   * Initialize performance tracking
   */
  initializePerformanceTracking() {
    // Track page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          this.analytics.trackPerformance({
            page_load_time: Math.round(perfData.loadEventEnd - perfData.fetchStart),
            dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
            first_contentful_paint: this.getFirstContentfulPaint()
          });
        }
      }, 1000);
    });
  }

  /**
   * Get First Contentful Paint timing
   * @returns {number} FCP timing in milliseconds
   */
  getFirstContentfulPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return fcpEntry ? Math.round(fcpEntry.startTime) : 0;
  }

  /**
   * Track newsletter signup
   * @param {Object} signupData - Signup data
   */
  trackNewsletterSignup(signupData = {}) {
    this.analytics.trackNewsletterSignup(signupData);
  }

  /**
   * Get analytics instance
   * @returns {AnalyticsManager} Analytics manager instance
   */
  getAnalytics() {
    return this.analytics;
  }
}

// Initialize app
const app = new ValhallaTattooApp();
app.init();

// Export for global access
window.ValhallaTattoo = app;