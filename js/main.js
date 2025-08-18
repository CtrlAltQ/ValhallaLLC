/**
 * Main Application Entry Point
 * Handles portfolio pages and general site functionality
 */

import { PortfolioPageManager } from './modules/portfolio-page.js';
import { AnimationSystem } from './modules/animations.js';

// Initialize portfolio page if we're on one
document.addEventListener('DOMContentLoaded', async () => {
  // Check if this is a portfolio page
  const isPortfolioPage = document.querySelector('.artist-hero') ||
                         document.querySelector('.portfolio-gallery') ||
                         window.location.pathname.includes('/portfolio/');
  
  if (isPortfolioPage) {
    try {
      const animationSystem = new AnimationSystem();
      await animationSystem.init();

      console.log('Initializing portfolio page...');
      const portfolioManager = new PortfolioPageManager();
      await portfolioManager.init();
      
      // Make globally available for debugging
      window.PortfolioPageManager = portfolioManager;
      console.log('Portfolio page initialized successfully');
    } catch (error) {
      console.error('Failed to initialize portfolio page:', error);
    }
  }
});