/**
 * Portfolio Module
 * Handles portfolio gallery, lightbox, and artist data management
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
  }

  async init() {
    if (this.initialized) return;
    
    this.gallery = document.querySelector('.portfolio-gallery');
    this.lightbox = document.querySelector('.lightbox');
    
    await this.loadArtistData();
    this.setupGallery();
    this.setupLightbox();
    
    this.initialized = true;
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
    portfolioCache.clear();
    await this.loadArtistData();
    
    if (this.gallery) {
      // Trigger gallery refresh if implemented
      this.gallery.dispatchEvent(new CustomEvent('portfolio:refresh', {
        detail: { images: this.portfolioImages }
      }));
    }
  }
}