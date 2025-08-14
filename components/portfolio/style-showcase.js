/**
 * Style Showcase Component
 * Displays featured portfolio work for an artist with category groupings
 */

import { getArtistBySlug, getArtistPortfolio } from '../../js/data/artists.js';

export class StyleShowcase {
  constructor(container, artistSlug) {
    this.container = container;
    this.artistSlug = artistSlug;
    this.artist = null;
    this.portfolio = [];
    this.featuredWork = [];
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;
    
    try {
      // Load artist data and portfolio
      this.artist = getArtistBySlug(this.artistSlug);
      this.portfolio = getArtistPortfolio(this.artistSlug);
      
      if (!this.artist) {
        console.error(`Artist not found: ${this.artistSlug}`);
        this.renderError();
        return;
      }

      // Get featured work items
      this.featuredWork = this.getFeaturedWork();
      
      if (this.featuredWork.length === 0) {
        this.renderEmptyState();
        return;
      }

      this.render();
      this.setupInteractions();
      this.initialized = true;
      
      console.log(`Style showcase initialized for: ${this.artist.name} with ${this.featuredWork.length} featured pieces`);
    } catch (error) {
      console.error('Error initializing style showcase:', error);
      this.renderError();
    }
  }

  getFeaturedWork() {
    if (!this.artist.featuredWork || this.artist.featuredWork.length === 0) {
      // Fallback: use first 3 portfolio items
      return this.portfolio.slice(0, 3).map((item, index) => ({
        ...item,
        category: index === 0 ? 'Recent Work' : 'Featured'
      }));
    }

    // Map featured work IDs to actual portfolio items
    return this.artist.featuredWork
      .map(featured => {
        const portfolioItem = this.portfolio.find(item => item.id === featured.portfolioId);
        return portfolioItem ? {
          ...portfolioItem,
          category: featured.category
        } : null;
      })
      .filter(item => item !== null);
  }

  render() {
    const showcaseHTML = `
      <div class="style-showcase-container">
        <header class="showcase-header">
          <h2>${this.artist.name}'s Featured Work</h2>
          <p>Highlighting the best of ${this.artist.name}'s ${this.artist.specialty} artistry</p>
        </header>
        
        <div class="showcase-grid">
          ${this.featuredWork.map((item, index) => this.renderFeaturedItem(item, index)).join('')}
        </div>
        
        <div class="showcase-footer">
          <a href="#portfolio-gallery" class="btn-secondary view-full-portfolio">
            View Full Portfolio
            <span class="arrow">→</span>
          </a>
        </div>
      </div>
    `;

    this.container.innerHTML = showcaseHTML;
  }

  renderFeaturedItem(item, index) {
    return `
      <div class="featured-item" data-category="${item.category}" data-index="${index}">
        <div class="featured-image-container">
          <img 
            src="${item.src}" 
            alt="${item.title} - ${item.style} tattoo by ${this.artist.name}"
            class="featured-image"
            loading="lazy"
          />
          <div class="image-overlay">
            <div class="overlay-content">
              <h4>${item.title}</h4>
              <p class="item-style">${item.style}</p>
              <p class="item-placement">${item.placement}</p>
              <button class="btn-view-details" data-image-id="${item.id}">
                View Details
              </button>
            </div>
          </div>
        </div>
        
        <div class="featured-info">
          <span class="category-badge">${item.category}</span>
          <h3 class="item-title">${item.title}</h3>
          <div class="item-meta">
            <span class="meta-item">${item.style}</span>
            <span class="meta-separator">•</span>
            <span class="meta-item">${item.placement}</span>
          </div>
          <p class="item-description">${item.description}</p>
          <div class="item-tags">
            ${item.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }

  setupInteractions() {
    // Smooth scroll to full portfolio
    const viewFullButton = this.container.querySelector('.view-full-portfolio');
    if (viewFullButton) {
      viewFullButton.addEventListener('click', (e) => {
        e.preventDefault();
        const portfolioSection = document.querySelector('#portfolio-gallery');
        if (portfolioSection) {
          portfolioSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Featured item interactions
    const featuredItems = this.container.querySelectorAll('.featured-item');
    featuredItems.forEach((item, index) => {
      // Hover effects
      item.addEventListener('mouseenter', () => {
        item.classList.add('hovered');
      });

      item.addEventListener('mouseleave', () => {
        item.classList.remove('hovered');
      });

      // View details buttons
      const viewButton = item.querySelector('.btn-view-details');
      if (viewButton) {
        viewButton.addEventListener('click', () => {
          const imageId = parseInt(viewButton.dataset.imageId);
          this.openLightbox(imageId);
        });
      }

      // Intersection observer for animations
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * 150);
          }
        });
      }, { threshold: 0.2 });

      observer.observe(item);
    });
  }

  openLightbox(imageId) {
    // Trigger the main portfolio lightbox
    const portfolioGallery = document.querySelector('.portfolio-gallery');
    if (portfolioGallery) {
      // Find and click the corresponding gallery image
      const galleryImage = portfolioGallery.querySelector(`[data-image-id="${imageId}"]`);
      if (galleryImage) {
        galleryImage.click();
      }
    } else {
      // Fallback: create a custom event
      document.dispatchEvent(new CustomEvent('openPortfolioItem', {
        detail: { imageId }
      }));
    }
  }

  renderError() {
    this.container.innerHTML = `
      <div class="showcase-error">
        <h3>Unable to load featured work</h3>
        <p>Please refresh the page or contact support if the issue persists.</p>
      </div>
    `;
  }

  renderEmptyState() {
    this.container.innerHTML = `
      <div class="showcase-empty">
        <h3>Featured work coming soon</h3>
        <p>Check out ${this.artist.name}'s full portfolio below while we prepare the featured showcase.</p>
        <a href="#portfolio-gallery" class="btn-secondary">View Portfolio</a>
      </div>
    `;
  }

  // Public method to refresh showcase
  async refresh() {
    this.initialized = false;
    await this.init();
  }

  // Public method to update artist
  async updateArtist(newArtistSlug) {
    this.artistSlug = newArtistSlug;
    this.initialized = false;
    await this.init();
  }
}

// Auto-initialization for data attributes
document.addEventListener('DOMContentLoaded', () => {
  const showcaseElements = document.querySelectorAll('[data-style-showcase]');
  
  showcaseElements.forEach(element => {
    const artistSlug = element.dataset.styleShowcase;
    if (artistSlug) {
      const showcase = new StyleShowcase(element, artistSlug);
      showcase.init();
    }
  });
});