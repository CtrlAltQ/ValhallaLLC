/**
 * Enhanced Portfolio Module
 * Handles portfolio gallery, lightbox, artist data management, and new components integration
 */

import { 
  getAllArtists, 
  getArtistBySlug, 
  getArtistPortfolio, 
  getAllPortfolioImages,
  getFeaturedPortfolio,
  searchPortfolio,
  portfolioCache
} from '../data/artists.js';

export class Portfolio {
  constructor() {
    this.gallery = null;
    this.lightbox = null;
    this.artistData = {};
    this.portfolioImages = [];
    this.currentArtist = null;
    this.initialized = false;
    
    // New component references
    this.bioComponent = null;
    this.showcaseComponent = null;
    this.testimonialsComponent = null;
  }

  async init() {
    if (this.initialized) return;
    
    try {
      // Initialize core elements
      this.gallery = document.querySelector('.portfolio-gallery');
      this.lightbox = document.querySelector('.lightbox');
      
      // Load artist data first
      await this.loadArtistData();
      
      // Initialize components in order
      await this.initializeComponents();
      
      // Setup gallery and lightbox
      this.setupGallery();
      this.setupLightbox();
      
      // Setup component integrations
      this.setupComponentIntegrations();
      
      this.initialized = true;
      console.log('Portfolio module fully initialized');
      
    } catch (error) {
      console.error('Failed to initialize portfolio module:', error);
      this.handleInitializationError(error);
    }
  }

  async initializeComponents() {
    // The new components auto-initialize via data attributes,
    // but we can set up references and event listeners here
    
    // Set up component event listeners for better integration
    this.setupComponentEventListeners();
    
    // Ensure components are properly loaded
    await this.waitForComponentsToLoad();
  }

  setupComponentEventListeners() {
    // Listen for style showcase lightbox requests
    document.addEventListener('openPortfolioItem', (event) => {
      const { imageId } = event.detail;
      this.openLightboxForImage(imageId);
    });

    // Listen for portfolio refresh requests
    document.addEventListener('portfolio:refresh', () => {
      this.refreshPortfolio();
    });

    // Listen for component errors
    document.addEventListener('component:error', (event) => {
      console.error('Component error:', event.detail);
    });
  }

  async waitForComponentsToLoad() {
    // Wait for components to be ready
    return new Promise((resolve) => {
      let attempts = 0;
      const maxAttempts = 10;
      
      const checkComponents = () => {
        const bioElement = document.querySelector('[data-artist-bio]');
        const showcaseElement = document.querySelector('[data-style-showcase]');
        const testimonialsElement = document.querySelector('[data-testimonials]');
        
        attempts++;
        
        if (attempts >= maxAttempts) {
          console.warn('Components did not load within expected time');
          resolve();
          return;
        }
        
        // Check if components are present and initialized
        const componentsReady = (!bioElement || bioElement.innerHTML.trim() !== '') &&
                               (!showcaseElement || showcaseElement.innerHTML.trim() !== '') &&
                               (!testimonialsElement || testimonialsElement.innerHTML.trim() !== '');
        
        if (componentsReady) {
          resolve();
        } else {
          setTimeout(checkComponents, 100);
        }
      };
      
      setTimeout(checkComponents, 100);
    });
  }

  setupComponentIntegrations() {
    // Integrate lightbox with style showcase
    this.integrateShowcaseLightbox();
    
    // Add smooth scrolling between sections
    this.setupSmoothScrolling();
    
    // Setup responsive handlers
    this.setupResponsiveHandlers();
  }

  integrateShowcaseLightbox() {
    // Make sure showcase components can trigger the main portfolio lightbox
    const showcaseElements = document.querySelectorAll('[data-style-showcase]');
    showcaseElements.forEach(element => {
      element.addEventListener('click', (event) => {
        const viewButton = event.target.closest('.btn-view-details');
        if (viewButton) {
          const imageId = parseInt(viewButton.dataset.imageId);
          this.openLightboxForImage(imageId);
        }
      });
    });
  }

  setupSmoothScrolling() {
    // Setup smooth scrolling for internal navigation
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  setupResponsiveHandlers() {
    // Handle responsive behavior for components
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.handleResize();
      }, 250);
    });
  }

  handleResize() {
    // Trigger component responsive updates if needed
    const event = new CustomEvent('portfolio:resize', {
      detail: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
    document.dispatchEvent(event);
  }

  openLightboxForImage(imageId) {
    // Find the image in the portfolio and open lightbox
    const image = this.portfolioImages.find(img => img.id === imageId);
    if (image && this.galleryComponent) {
      // Trigger the existing lightbox functionality
      const galleryItem = this.gallery.querySelector(`[data-image-id="${imageId}"]`);
      if (galleryItem) {
        galleryItem.click();
      } else {
        // Fallback: create a temporary lightbox
        this.createTemporaryLightbox(image);
      }
    }
  }

  createTemporaryLightbox(image) {
    // Create a temporary lightbox for showcase images
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
        <img src="${image.src}" alt="${image.title}" class="lightbox-img">
        <div class="lightbox-info">
          <h3>${image.title}</h3>
          <p>${image.style} • ${image.placement}</p>
          <p>${image.description}</p>
        </div>
      </div>
    `;
    
    document.body.appendChild(lightbox);
    
    // Close handlers
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const closeHandlers = [
      () => lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) document.body.removeChild(lightbox);
      }),
      () => closeBtn.addEventListener('click', () => document.body.removeChild(lightbox)),
      () => document.addEventListener('keydown', function keyHandler(e) {
        if (e.key === 'Escape') {
          document.body.removeChild(lightbox);
          document.removeEventListener('keydown', keyHandler);
        }
      })
    ];
    
    closeHandlers.forEach(handler => handler());
  }

  handleInitializationError(error) {
    // Graceful degradation for initialization errors
    console.error('Portfolio initialization failed, attempting graceful degradation');
    
    // Show basic portfolio without enhanced features
    this.setupBasicGallery();
  }

  setupBasicGallery() {
    // Fallback gallery setup without advanced features
    if (this.gallery && this.portfolioImages.length > 0) {
      const basicHTML = this.portfolioImages.map(image => `
        <div class="portfolio-item">
          <img src="${image.src}" alt="${image.title}" loading="lazy">
          <div class="portfolio-info">
            <h4>${image.title}</h4>
            <p>${image.style}</p>
          </div>
        </div>
      `).join('');
      
      this.gallery.innerHTML = basicHTML;
    }
  }

  async loadArtistData() {
    try {
      // Load all artist data
      this.artistData = {};
      const artists = getAllArtists();
      
      artists.forEach(artist => {
        this.artistData[artist.slug] = artist;
      });

      // Determine current context (artist page or general portfolio)
      this.currentArtist = this.getCurrentArtistFromURL();
      
      if (this.currentArtist) {
        // Load specific artist portfolio
        this.portfolioImages = getArtistPortfolio(this.currentArtist);
      } else {
        // Load featured portfolio for homepage/general portfolio
        this.portfolioImages = getFeaturedPortfolio();
      }

      console.log(`Loaded ${this.portfolioImages.length} portfolio images`);
      
    } catch (error) {
      console.error('Error loading artist data:', error);
      this.portfolioImages = [];
    }
  }

  getCurrentArtistFromURL() {
    // Extract artist slug from URL path
    const path = window.location.pathname;
    const matches = path.match(/\/portfolio\/([^\/]+)\.html/);
    return matches ? matches[1] : null;
  }

  setupGallery() {
    if (!this.gallery) return;
    
    // Initialize the portfolio gallery component
    import('../components/portfolio/portfolio-gallery.js').then(({ default: PortfolioGallery }) => {
      this.galleryComponent = new PortfolioGallery(this.gallery, {
        lazyLoad: true,
        lightbox: true,
        masonry: true,
        itemsPerPage: 12
      });
      
      // Load images into the gallery
      this.galleryComponent.loadImages(this.portfolioImages);
      
      // Preload first few images for better performance
      this.preloadImages();
      
      console.log(`Portfolio gallery initialized with ${this.portfolioImages.length} images`);
      console.log(`Current artist: ${this.currentArtist || 'All artists'}`);
    }).catch(error => {
      console.error('Failed to load portfolio gallery component:', error);
    });
  }

  setupLightbox() {
    // Lightbox is handled by the PortfolioGallery component
    console.log('Lightbox integrated with portfolio gallery');
  }

  // Public API methods for external use
  getArtist(slug) {
    return getArtistBySlug(slug);
  }

  getPortfolioImages(artistSlug = null) {
    if (artistSlug) {
      return getArtistPortfolio(artistSlug);
    }
    return this.portfolioImages;
  }

  searchImages(query) {
    return searchPortfolio(query);
  }

  filterByStyle(style) {
    return this.portfolioImages.filter(image => 
      image.style.toLowerCase().includes(style.toLowerCase())
    );
  }

  filterByTags(tags) {
    const searchTags = Array.isArray(tags) ? tags : [tags];
    return this.portfolioImages.filter(image =>
      searchTags.some(tag => 
        image.tags.some(imageTag => 
          imageTag.toLowerCase().includes(tag.toLowerCase())
        )
      )
    );
  }

  // Preload images for better performance
  preloadImages(images = null) {
    const imagesToPreload = images || this.portfolioImages.slice(0, 6); // Preload first 6 images
    
    imagesToPreload.forEach(image => {
      const img = new Image();
      img.src = image.src;
    });
  }

  // Update portfolio data (for dynamic updates)
  async refreshPortfolio() {
    try {
      portfolioCache.clear();
      await this.loadArtistData();
      
      // Refresh main gallery
      if (this.gallery) {
        this.gallery.dispatchEvent(new CustomEvent('portfolio:refresh', {
          detail: { images: this.portfolioImages }
        }));
      }
      
      // Refresh new components
      await this.refreshComponents();
      
      console.log('Portfolio and components refreshed successfully');
    } catch (error) {
      console.error('Error refreshing portfolio:', error);
    }
  }

  async refreshComponents() {
    // Refresh artist bio component
    const bioElement = document.querySelector('[data-artist-bio]');
    if (bioElement && this.currentArtist) {
      // Trigger bio refresh if the component supports it
      const event = new CustomEvent('component:refresh', {
        detail: { type: 'bio', artist: this.currentArtist }
      });
      bioElement.dispatchEvent(event);
    }

    // Refresh style showcase component
    const showcaseElement = document.querySelector('[data-style-showcase]');
    if (showcaseElement && this.currentArtist) {
      const event = new CustomEvent('component:refresh', {
        detail: { type: 'showcase', artist: this.currentArtist }
      });
      showcaseElement.dispatchEvent(event);
    }

    // Refresh testimonials component
    const testimonialsElement = document.querySelector('[data-testimonials]');
    if (testimonialsElement && this.currentArtist) {
      const event = new CustomEvent('component:refresh', {
        detail: { type: 'testimonials', artist: this.currentArtist }
      });
      testimonialsElement.dispatchEvent(event);
    }
  }

  // Enhanced public API methods
  async refreshArtistData(artistSlug) {
    if (artistSlug !== this.currentArtist) {
      this.currentArtist = artistSlug;
      await this.refreshPortfolio();
    }
  }

  // Get component instances (if needed for direct manipulation)
  getComponents() {
    return {
      bio: this.bioComponent,
      showcase: this.showcaseComponent,
      testimonials: this.testimonialsComponent,
      gallery: this.galleryComponent
    };
  }

  // Enhanced error handling for components
  handleComponentError(componentType, error) {
    console.error(`${componentType} component error:`, error);
    
    // Dispatch error event for external handling
    document.dispatchEvent(new CustomEvent('portfolio:component-error', {
      detail: { componentType, error }
    }));
  }

  // Performance monitoring
  measurePerformance(operation, duration) {
    if (duration > 1000) { // Log slow operations
      console.warn(`Slow portfolio operation: ${operation} took ${duration}ms`);
    }
  }

  // Cleanup method for proper memory management
  destroy() {
    // Remove event listeners
    document.removeEventListener('openPortfolioItem', this.openLightboxForImage);
    document.removeEventListener('portfolio:refresh', this.refreshPortfolio);
    
    // Clear component references
    this.bioComponent = null;
    this.showcaseComponent = null;
    this.testimonialsComponent = null;
    this.galleryComponent = null;
    
    // Clear data
    this.portfolioImages = [];
    this.artistData = {};
    
    this.initialized = false;
    console.log('Portfolio module destroyed');
  }
}