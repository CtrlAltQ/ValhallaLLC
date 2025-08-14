/**
 * Minimal Application Entry Point
 * Includes only essential modules for basic site functionality
 */

import { Homepage } from './modules/homepage.js';
import { Portfolio } from './modules/portfolio.js';
import { Contact } from './modules/contact.js';
import { AnimationSystem } from './modules/animations.js';
import { gsapLoader } from './utils/gsap-loader.js';
import { progressiveEnhancement } from './utils/progressive-enhancement.js';
import { imageOptimizer } from './utils/image-optimizer.js';
import browserCompatibility from './utils/browser-compatibility.js';

class ValhallaTattooMinimalApp {
  constructor() {
    this.modules = {
      homepage: new Homepage(),
      portfolio: new Portfolio(),
      contact: new Contact(),
      animations: new AnimationSystem()
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

      // Initialize progressive enhancement and image optimization
      await progressiveEnhancement.init();
      await imageOptimizer.init();
      console.log('Progressive enhancement and image optimization initialized');

      // Browser compatibility is automatically initialized on import
      console.log(`Browser detected: ${browserCompatibility.browser.name} ${browserCompatibility.browser.version}`);

      // Load GSAP first for animations
      await gsapLoader.loadGSAP();
      console.log('GSAP loaded successfully');

      // Initialize modules in order
      await this.modules.animations.init();
      this.modules.homepage.init();
      this.modules.portfolio.init();
      this.modules.contact.init();

      // Trigger initial animations after a short delay
      setTimeout(() => {
        this.modules.homepage.triggerHeroAnimations();
      }, 100);

      this.initialized = true;
      console.log('Valhalla Tattoo minimal app initialized successfully');

      // Dispatch custom event for other scripts
      document.dispatchEvent(new CustomEvent('valhalla:initialized', {
        detail: { app: this }
      }));

    } catch (error) {
      console.error('Failed to initialize Valhalla Tattoo minimal app:', error);
    }
  }

  getModule(name) {
    return this.modules[name];
  }
}

// Initialize app
const app = new ValhallaTattooMinimalApp();
app.init();

// Export for global access
window.ValhallaTattoo = app;