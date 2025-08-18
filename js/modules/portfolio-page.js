/**
 * Portfolio Page Module
 * ES6 module for individual artist portfolio pages
 * Integrates with existing site architecture and components
 */

import { getArtistBySlug, getArtistPortfolio } from '../data/artists.js';
import SEOManager from './seo.js';
import PortfolioGallery from '../components/portfolio-gallery.js';
import SocialLinks from '../components/social-links.js';
import URLUtils from '../utils/url-utils.js';

export class PortfolioPageManager {
  constructor() {
    this.artist = null;
    this.artistSlug = null;
    this.seoManager = new SEOManager();
    this.gallery = null;
    this.socialLinks = null;
    this.initialized = false;
    
    // DOM elements
    this.elements = {
      heroTitle: null,
      heroSubtitle: null,
      specialty: null,
      experience: null,
      bio: null,
      extendedBio: null,
      galleryContainer: null,
      socialContainer: null,
      contactForm: null
    };
  }

  /**
   * Initialize the portfolio page
   */
  async init() {
    if (this.initialized) return;

    try {
      console.log('Initializing portfolio page...');

      // Get artist slug from URL
      this.artistSlug = URLUtils.getArtistSlugFromURL();
      
      if (!this.artistSlug) {
        throw new Error('No artist slug found in URL');
      }

      console.log(`Loading portfolio for artist: ${this.artistSlug}`);

      // Load artist data
      this.artist = getArtistBySlug(this.artistSlug);
      
      if (!this.artist) {
        throw new Error(`Artist not found: ${this.artistSlug}`);
      }

      // Wait for DOM to be ready
      await this.waitForDOM();

      // Find DOM elements
      this.findElements();

      // Initialize components
      await this.initializeSEO();
      this.updatePageContent();
      this.initializeGallery();
      this.initializeSocialLinks();
      this.setupContactForm();
      this.setupNavigation();

      this.initialized = true;
      console.log(`Portfolio page initialized successfully for ${this.artist.name}`);

      // Dispatch event for other scripts
      document.dispatchEvent(new CustomEvent('portfolio:initialized', {
        detail: { 
          artist: this.artist,
          manager: this 
        }
      }));

    } catch (error) {
      console.error('Failed to initialize portfolio page:', error);
      this.showErrorMessage(error.message);
    }
  }

  /**
   * Wait for DOM to be ready
   * @returns {Promise} Promise that resolves when DOM is ready
   */
  waitForDOM() {
    return new Promise(resolve => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', resolve);
      } else {
        resolve();
      }
    });
  }

  /**
   * Find and store references to DOM elements
   */
  findElements() {
    this.elements = {
      heroTitle: document.querySelector('.artist-hero-title'),
      heroSubtitle: document.querySelector('.hero-subtitle'),
      specialty: document.querySelector('.artist-specialty'),
      experience: document.querySelector('.artist-experience'),
      bio: document.querySelector('.artist-bio'),
      extendedBio: document.querySelector('.artist-bio-extended'),
      galleryContainer: document.querySelector('.portfolio-gallery'),
      socialContainer: document.querySelector('.artist-social-links'),
      contactForm: document.querySelector('#contact-artist'),
      
      // Additional elements that might exist
      artistImage: document.querySelector('.artist-hero__bg-img'),
      statsContainer: document.querySelector('.artist-info-stats'),
      specialtiesList: document.querySelector('.artist-specialties ul')
    };
  }

  /**
   * Initialize SEO for the artist page
   */
  async initializeSEO() {
    if (!this.artist) return;

    try {
      // Use the existing SEO manager's artist page initialization
      this.seoManager.initArtistPage({
        ...this.artist,
        slug: this.artistSlug
      });

      console.log(`SEO initialized for ${this.artist.name}`);
    } catch (error) {
      console.error('Failed to initialize SEO:', error);
    }
  }

  /**
   * Update page content with artist data
   */
  updatePageContent() {
    if (!this.artist) return;

    // Update page title
    if (this.elements.heroTitle) {
      this.elements.heroTitle.textContent = `${this.artist.name}'s Portfolio`;
    }

    // Update specialty
    if (this.elements.specialty) {
      this.elements.specialty.textContent = this.artist.specialty;
    }

    // Update experience
    if (this.elements.experience) {
      this.elements.experience.textContent = `${this.artist.experience} Experience`;
    }

    // Update bio
    if (this.elements.bio) {
      this.elements.bio.textContent = this.artist.bio;
    }

    // Update extended bio
    if (this.elements.extendedBio) {
      this.elements.extendedBio.textContent = this.artist.extendedBio || this.artist.bio;
    }

    // Update artist image if it exists
    if (this.elements.artistImage) {
      this.elements.artistImage.src = `../images/gallery/${this.artistSlug}.jpg`;
      this.elements.artistImage.alt = `${this.artist.name}'s work`;
    }

    // Update specialties list if it exists
    this.updateSpecialtiesList();
    
    console.log(`Page content updated for ${this.artist.name}`);
  }

  /**
   * Update specialties list based on artist data
   */
  updateSpecialtiesList() {
    if (!this.elements.specialtiesList) return;

    // Generate specialties from artist data
    const specialties = this.getArtistSpecialties();
    
    if (specialties.length > 0) {
      this.elements.specialtiesList.innerHTML = specialties
        .map(specialty => `<li>${specialty}</li>`)
        .join('');
    }
  }

  /**
   * Get artist specialties based on their data and portfolio
   * @returns {Array} Array of specialty strings
   */
  getArtistSpecialties() {
    const specialties = [];
    
    // Add main specialty
    if (this.artist.specialty) {
      specialties.push(this.artist.specialty);
    }
    
    // Add unique styles from portfolio
    if (this.artist.portfolio) {
      const portfolioStyles = [...new Set(
        this.artist.portfolio.map(item => item.style).filter(Boolean)
      )];
      
      portfolioStyles.forEach(style => {
        if (!specialties.includes(style)) {
          specialties.push(style);
        }
      });
    }
    
    return specialties.slice(0, 6); // Limit to 6 specialties
  }

  /**
   * Initialize portfolio gallery
   */
  initializeGallery() {
    if (!this.elements.galleryContainer || !this.artist) return;

    try {
      // Get portfolio images
      const portfolioImages = getArtistPortfolio(this.artistSlug);
      
      if (portfolioImages.length === 0) {
        console.warn(`No portfolio images found for ${this.artistSlug}`);
        this.showNoImagesMessage();
        return;
      }

      // Initialize gallery component
      this.gallery = new PortfolioGallery(this.elements.galleryContainer, {
        showFilters: true,
        showArtistNames: false,
        lightboxEnabled: true,
        lazyLoading: true,
        animateOnScroll: true
      });

      this.gallery.init(portfolioImages);
      
      console.log(`Gallery initialized with ${portfolioImages.length} images`);
    } catch (error) {
      console.error('Failed to initialize gallery:', error);
      this.showGalleryError();
    }
  }

  /**
   * Initialize social links
   */
  initializeSocialLinks() {
    // Only initialize social links for Heather
    if (this.artistSlug !== 'heather' || !this.elements.socialContainer || !this.artist.socialMedia) return;

    try {
      this.socialLinks = new SocialLinks(this.elements.socialContainer, {
        type: 'artist',
        layout: 'horizontal',
        style: 'default',
        size: 'medium',
        showLabels: false,
        platforms: ['instagram', 'facebook']
      });

      this.socialLinks.init(this.artist.socialMedia);
      
      console.log(`Social links initialized for ${this.artist.name}`);
    } catch (error) {
      console.error('Failed to initialize social links:', error);
    }
  }

  /**
   * Setup contact form with artist pre-selected
   */
  setupContactForm() {
    if (!this.elements.contactForm || !this.artist) return;

    try {
      // Pre-select this artist in contact form
      this.elements.contactForm.value = this.artistSlug;
      
      // Store artist reference for form submission
      this.elements.contactForm.setAttribute('data-artist', this.artistSlug);
      
      console.log(`Contact form configured for ${this.artist.name}`);
    } catch (error) {
      console.error('Failed to setup contact form:', error);
    }
  }

  /**
   * Setup navigation highlighting
   */
  setupNavigation() {
    try {
      // Highlight portfolio navigation item
      const portfolioNavItem = document.querySelector('.main-nav__item a[href*="portfolio"]');
      if (portfolioNavItem) {
        portfolioNavItem.closest('.main-nav__item').classList.add('main-nav__item--active');
      }

      // Add breadcrumb navigation if container exists
      const breadcrumbContainer = document.querySelector('.breadcrumb-nav');
      if (breadcrumbContainer) {
        this.createBreadcrumbs(breadcrumbContainer);
      }
      
    } catch (error) {
      console.error('Failed to setup navigation:', error);
    }
  }

  /**
   * Create breadcrumb navigation
   * @param {HTMLElement} container - Breadcrumb container
   */
  createBreadcrumbs(container) {
    if (!this.artist) return;

    const breadcrumbs = [
      { name: 'Home', url: '../index.html' },
      { name: 'Artists', url: '../index.html#artists' },
      { name: `${this.artist.name}'s Portfolio`, url: null }
    ];

    const breadcrumbHTML = breadcrumbs.map((crumb, index) => {
      if (crumb.url) {
        return `<a href="${crumb.url}" class="breadcrumb-link">${crumb.name}</a>`;
      } else {
        return `<span class="breadcrumb-current">${crumb.name}</span>`;
      }
    }).join('<span class="breadcrumb-separator">›</span>');

    container.innerHTML = `<nav class="breadcrumb-nav" aria-label="Breadcrumb">${breadcrumbHTML}</nav>`;
  }

  /**
   * Show error message to user
   * @param {string} message - Error message
   */
  showErrorMessage(message) {
    const errorHTML = `
      <div class="portfolio-error">
        <h2>Portfolio Unavailable</h2>
        <p>${message}</p>
        <a href="../index.html" class="btn btn-primary">Return to Homepage</a>
      </div>
    `;

    document.body.innerHTML = errorHTML;
  }

  /**
   * Show message when no images are available
   */
  showNoImagesMessage() {
    if (this.elements.galleryContainer) {
      this.elements.galleryContainer.innerHTML = `
        <div class="portfolio-empty">
          <p>Portfolio images coming soon! Check back later to see ${this.artist.name}'s latest work.</p>
          <a href="../index.html#contact" class="btn btn-primary">Contact for More Info</a>
        </div>
      `;
    }
  }

  /**
   * Show gallery error message
   */
  showGalleryError() {
    if (this.elements.galleryContainer) {
      this.elements.galleryContainer.innerHTML = `
        <div class="portfolio-error">
          <p>Sorry, there was an issue loading the portfolio gallery.</p>
          <button onclick="window.location.reload()" class="btn btn-secondary">Reload Page</button>
        </div>
      `;
    }
  }

  /**
   * Get current artist data
   * @returns {Object|null} Current artist object
   */
  getArtist() {
    return this.artist;
  }

  /**
   * Get gallery instance
   * @returns {PortfolioGallery|null} Gallery instance
   */
  getGallery() {
    return this.gallery;
  }

  /**
   * Destroy the portfolio page and clean up
   */
  destroy() {
    if (this.gallery) {
      this.gallery.destroy();
      this.gallery = null;
    }
    
    if (this.socialLinks) {
      this.socialLinks.destroy();
      this.socialLinks = null;
    }
    
    this.initialized = false;
    console.log('Portfolio page destroyed');
  }
}

// Auto-initialize if this is a portfolio page
document.addEventListener('DOMContentLoaded', async () => {
  // Check if this is a portfolio page by looking for portfolio-specific elements
  const isPortfolioPage = document.querySelector('.artist-hero') || 
                         document.querySelector('.portfolio-gallery') ||
                         window.location.pathname.includes('/portfolio/');
  
  if (isPortfolioPage) {
    const portfolioManager = new PortfolioPageManager();
    await portfolioManager.init();
    
    // Make globally available for debugging
    window.PortfolioPageManager = portfolioManager;
  }
});

export default PortfolioPageManager;