/**
 * Main Application Entry Point - Minimal Version
 * Initializes core modules only
 */

import { Homepage } from './modules/homepage.js';
import { Portfolio } from './modules/portfolio.js';
import { Contact } from './modules/contact.js';
import { AnimationSystem } from './modules/animations.js';
import { BlogManager } from './modules/blog.js';
import { NewsletterManager } from './modules/newsletter.js';
import { gsapLoader } from './utils/gsap-loader.js';
import SEOManager from './modules/seo.js';

class ValhallaTattooApp {
  constructor() {
    this.modules = {
      homepage: new Homepage(),
      portfolio: new Portfolio(),
      contact: new Contact(),
      animations: new AnimationSystem(),
      blog: new BlogManager(),
      newsletter: new NewsletterManager(),
      seo: new SEOManager()
    };
    
    this.initialized = false;
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

      console.log('Starting minimal app initialization...');

      // Load GSAP first for animations
      await gsapLoader.loadGSAP();
      console.log('GSAP loaded successfully');

      // Initialize SEO for current page
      this.initializeSEO();

      // Initialize modules in order
      await this.modules.animations.init();
      this.modules.homepage.init();
      this.modules.portfolio.init();
      this.modules.contact.init();
      this.modules.blog.init();
      this.modules.newsletter.init();

      // Trigger initial animations after a short delay
      setTimeout(() => {
        this.modules.homepage.triggerHeroAnimations();
      }, 100);

      this.initialized = true;
      console.log('Valhalla Tattoo app initialized successfully (Blog + Newsletter with placeholders)');

      // Dispatch custom event for other scripts
      document.dispatchEvent(new CustomEvent('valhalla:initialized', {
        detail: { app: this }
      }));

    } catch (error) {
      console.error('Failed to initialize minimal Valhalla Tattoo app:', error);
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
    }
  }
}

// Initialize app
const app = new ValhallaTattooApp();
app.init();

// Export for global access
window.ValhallaTattoo = app;