/**
 * Portfolio Gallery Component
 * Shared component for displaying artist portfolio images
 * Used by both main site and individual portfolio pages
 */

export class PortfolioGallery {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      showFilters: false,
      showArtistNames: false,
      lightboxEnabled: true,
      lazyLoading: true,
      animateOnScroll: true,
      ...options
    };
    
    this.images = [];
    this.currentFilter = 'all';
    this.lightbox = null;
    this.boundHandleLightboxKeydown = null;
    this.portfolioItems = [];
    this.currentImageIndex = 0;
    this.lazyObserver = null;
  }

  /**
   * Initialize the gallery with image data
   * @param {Array} images - Array of image objects
   */
  init(images) {
    this.images = images;
    this.render();
    
    if (this.options.showFilters) {
      this.renderFilters();
    }
    
    if (this.options.lightboxEnabled) {
      this.setupLightbox();
    }
    
    if (this.options.animateOnScroll) {
      this.setupScrollAnimations();
    }
    
    console.log(`Portfolio gallery initialized with ${images.length} images`);
  }

  /**
   * Render the gallery HTML
   */
  render() {
    if (!this.container) {
      console.error('Gallery container not found');
      return;
    }

    const galleryHTML = this.images.map(image => this.renderImageItem(image)).join('');

    this.container.innerHTML = `
      <div class="portfolio-gallery-grid" role="grid" aria-label="Portfolio gallery">
        ${galleryHTML}
      </div>
    `;

    if (this.options.lazyLoading) {
      this.setupLazyLoading();
    }
  }

  /**
   * Render individual image item
   * @param {Object} image - Image data object
   * @returns {string} HTML string for image item
   */
  renderImageItem(image) {
    const imageSrc = image.src || `../images/portfolio/${image.artistSlug || 'default'}/${image.filename}`;
    const placeholder = this.generatePlaceholder();
    
    return `
      <article class="portfolio-item" 
               data-style="${image.style || ''}" 
               data-tags="${(image.tags || []).join(',')}"
               data-artist="${image.artistSlug || ''}"
               role="gridcell">
        <div class="portfolio-item__image">
          <img src="${this.options.lazyLoading ? placeholder : imageSrc}" 
               ${this.options.lazyLoading ? `data-src="${imageSrc}"` : ''}
               alt="${image.title || 'Portfolio image'}" 
               class="portfolio-img ${this.options.lazyLoading ? 'lazy' : ''}"
               loading="${this.options.lazyLoading ? 'lazy' : 'eager'}">
        </div>
        
        <div class="portfolio-overlay">
          <div class="portfolio-info">
            <h4 class="portfolio-title">${image.title || 'Untitled'}</h4>
            
            ${image.style ? `<p class="portfolio-style">${image.style}</p>` : ''}
            
            ${this.options.showArtistNames && image.artist ? 
              `<p class="portfolio-artist">By ${image.artist}</p>` : ''}
            
            ${image.placement ? `<p class="portfolio-placement">${image.placement}</p>` : ''}
            
            ${image.sessionTime ? `<p class="portfolio-time">${image.sessionTime}</p>` : ''}
            
            ${image.description ? `<p class="portfolio-description">${image.description}</p>` : ''}
            
            ${image.tags && image.tags.length ? 
              `<div class="portfolio-tags">${image.tags.map(tag => 
                `<span class="portfolio-tag">${tag}</span>`
              ).join('')}</div>` : ''}
          </div>
        </div>
      </article>
    `;
  }

  /**
   * Render filter buttons
   */
  renderFilters() {
    const filterContainer = document.createElement('div');
    filterContainer.className = 'portfolio-filters';
    
    const filters = this.getUniqueFilters();
    const filterButtons = filters.map(filter => `
      <button class="filter-btn ${filter === 'all' ? 'active' : ''}" 
              data-filter="${filter}"
              aria-pressed="${filter === 'all' ? 'true' : 'false'}">
        ${this.capitalizeFilter(filter)}
      </button>
    `).join('');
    
    filterContainer.innerHTML = filterButtons;
    
    // Insert before gallery
    this.container.insertBefore(filterContainer, this.container.firstChild);
    
    // Add filter event listeners
    filterContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        this.handleFilterClick(e.target);
      }
    });
  }

  /**
   * Setup lazy loading for gallery images
   */
  setupLazyLoading() {
    if (!this.container) return;

    const images = this.container.querySelectorAll('img.lazy[data-src]');
    if (images.length === 0) return;

    const loadImage = (img) => {
      const dataSrc = img.getAttribute('data-src');
      if (!dataSrc) return;

      img.src = dataSrc;
      img.removeAttribute('data-src');
      img.classList.remove('lazy');
    };

    if (!('IntersectionObserver' in window)) {
      images.forEach(loadImage);
      return;
    }

    if (this.lazyObserver) {
      this.lazyObserver.disconnect();
    }

    this.lazyObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        loadImage(entry.target);
        observer.unobserve(entry.target);
      });
    }, {
      rootMargin: '200px 0px',
      threshold: 0.1
    });

    images.forEach(img => this.lazyObserver.observe(img));
  }

  /**
   * Get unique filters from images
   * @returns {Array} Array of unique filter values
   */
  getUniqueFilters() {
    const filters = new Set(['all']);
    
    this.images.forEach(image => {
      if (image.style) {
        filters.add(image.style.toLowerCase().replace(/\s+/g, '-'));
      }
      
      if (image.tags) {
        image.tags.forEach(tag => {
          filters.add(tag.toLowerCase().replace(/\s+/g, '-'));
        });
      }
    });
    
    return Array.from(filters);
  }

  /**
   * Handle filter button click
   * @param {HTMLElement} button - Clicked filter button
   */
  handleFilterClick(button) {
    const filter = button.getAttribute('data-filter');
    
    // Update active state
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });
    
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    
    // Filter images
    this.filterImages(filter);
    this.currentFilter = filter;
  }

  /**
   * Filter visible images
   * @param {string} filter - Filter value
   */
  filterImages(filter) {
    const items = this.container.querySelectorAll('.portfolio-item');
    
    items.forEach(item => {
      const shouldShow = filter === 'all' || 
                        item.getAttribute('data-style').toLowerCase().includes(filter) ||
                        item.getAttribute('data-tags').toLowerCase().includes(filter);
      
      if (shouldShow) {
        item.style.display = '';
        item.setAttribute('aria-hidden', 'false');
      } else {
        item.style.display = 'none';
        item.setAttribute('aria-hidden', 'true');
      }
    });
  }

  /**
   * Setup lightbox functionality
   */
  setupLightbox() {
    this.container.addEventListener('click', (e) => {
      const img = e.target.closest('.portfolio-img');
      if (img) {
        e.preventDefault();
        this.openLightbox(img);
      }
    });
  }

  /**
   * Open lightbox with image
   * @param {HTMLElement} imgElement - Clicked image element
   */
  openLightbox(imgElement) {
    const src = imgElement.getAttribute('data-src') || imgElement.src;
    const alt = imgElement.alt;

    // Find associated image data
    const portfolioItem = imgElement.closest('.portfolio-item');
    const imageData = this.getImageDataFromElement(portfolioItem);

    // Track current items and index for navigation
    this.portfolioItems = Array.from(this.container.querySelectorAll('.portfolio-item'))
      .filter(item => item.style.display !== 'none');
    this.currentImageIndex = this.portfolioItems.indexOf(portfolioItem);

    this.lightbox = document.createElement('div');
    this.lightbox.className = 'lightbox-overlay';
    this.lightbox.innerHTML = `
      <div class="lightbox-content">
        <div class="lightbox-image-container">
          <img src="${src}" alt="${alt}" class="lightbox-img">
        </div>

        ${imageData ? `
          <div class="lightbox-info">
            <h3 class="lightbox-title">${imageData.title}</h3>
            ${imageData.style ? `<p class="lightbox-style">${imageData.style}</p>` : ''}
            ${imageData.artist ? `<p class="lightbox-artist">By ${imageData.artist}</p>` : ''}
            ${imageData.description ? `<p class="lightbox-description">${imageData.description}</p>` : ''}
          </div>
        ` : ''}

        <button class="lightbox-close" aria-label="Close lightbox">&times;</button>

        <button class="lightbox-prev" aria-label="Previous image">‹</button>
        <button class="lightbox-next" aria-label="Next image">›</button>
      </div>
    `;

    document.body.appendChild(this.lightbox);
    document.body.style.overflow = 'hidden';

    // Event listeners for lightbox
    this.setupLightboxEvents();

    // Focus management for accessibility
    this.lightbox.querySelector('.lightbox-close').focus();
  }

  /**
   * Setup lightbox event listeners
   */
  setupLightboxEvents() {
    if (!this.lightbox) return;
    
    // Close button
    this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
      this.closeLightbox();
    });
    
    // Click outside to close
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.closeLightbox();
      }
    });

    // Keyboard navigation
    if (!this.boundHandleLightboxKeydown) {
      this.boundHandleLightboxKeydown = this.handleLightboxKeydown.bind(this);
    }
    document.addEventListener('keydown', this.boundHandleLightboxKeydown);
  }

  /**
   * Handle lightbox keyboard events
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleLightboxKeydown(e) {
    if (!this.lightbox) return;
    
    switch (e.key) {
      case 'Escape':
        this.closeLightbox();
        break;
      case 'ArrowLeft':
        this.navigateLightbox(-1);
        break;
      case 'ArrowRight':
        this.navigateLightbox(1);
        break;
    }
  }

  /**
   * Close lightbox
   */
  closeLightbox() {
    if (this.lightbox) {
      document.body.removeChild(this.lightbox);
      document.body.style.overflow = '';
      if (this.boundHandleLightboxKeydown) {
        document.removeEventListener('keydown', this.boundHandleLightboxKeydown);
      }
      this.lightbox = null;
    }
  }

  /**
   * Navigate between images in the lightbox
   * @param {number} direction -1 for previous, 1 for next
   */
  navigateLightbox(direction) {
    if (!this.portfolioItems.length) return;

    const total = this.portfolioItems.length;
    let newIndex = this.currentImageIndex + direction;

    if (newIndex < 0) {
      newIndex = total - 1;
    } else if (newIndex >= total) {
      newIndex = 0;
    }

    const nextItem = this.portfolioItems[newIndex];
    const nextImg = nextItem.querySelector('.portfolio-img');
    const src = nextImg.getAttribute('data-src') || nextImg.src;
    const alt = nextImg.alt;
    const imageData = this.getImageDataFromElement(nextItem);

    const lightboxImg = this.lightbox.querySelector('.lightbox-img');
    lightboxImg.src = src;
    lightboxImg.alt = alt;

    const existingInfo = this.lightbox.querySelector('.lightbox-info');
    if (existingInfo) {
      existingInfo.innerHTML = imageData ? `
        <h3 class="lightbox-title">${imageData.title}</h3>
        ${imageData.style ? `<p class="lightbox-style">${imageData.style}</p>` : ''}
        ${imageData.artist ? `<p class="lightbox-artist">By ${imageData.artist}</p>` : ''}
        ${imageData.description ? `<p class="lightbox-description">${imageData.description}</p>` : ''}` : '';
    } else if (imageData) {
      const infoContainer = document.createElement('div');
      infoContainer.className = 'lightbox-info';
      infoContainer.innerHTML = `
        <h3 class="lightbox-title">${imageData.title}</h3>
        ${imageData.style ? `<p class="lightbox-style">${imageData.style}</p>` : ''}
        ${imageData.artist ? `<p class="lightbox-artist">By ${imageData.artist}</p>` : ''}
        ${imageData.description ? `<p class="lightbox-description">${imageData.description}</p>` : ''}`;
      this.lightbox
        .querySelector('.lightbox-content')
        .insertBefore(infoContainer, this.lightbox.querySelector('.lightbox-close'));
    }

    this.currentImageIndex = newIndex;
  }

  /**
   * Setup scroll animations
   */
  setupScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    // Observe portfolio items
    setTimeout(() => {
      const items = this.container.querySelectorAll('.portfolio-item');
      items.forEach(item => observer.observe(item));
    }, 100);
  }

  /**
   * Get image data from DOM element
   * @param {HTMLElement} element - Portfolio item element
   * @returns {Object|null} Image data object
   */
  getImageDataFromElement(element) {
    const title = element.querySelector('.portfolio-title')?.textContent;
    const style = element.querySelector('.portfolio-style')?.textContent;
    const artist = element.querySelector('.portfolio-artist')?.textContent?.replace('By ', '');
    const description = element.querySelector('.portfolio-description')?.textContent;

    return { title, style, artist, description };
  }

  /**
   * Generate placeholder image
   * @returns {string} Data URL for placeholder
   */
  generatePlaceholder() {
    return 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" fill="#999" font-family="Arial" font-size="16">Loading...</text></svg>');
  }

  /**
   * Capitalize filter name for display
   * @param {string} filter - Filter name
   * @returns {string} Capitalized filter name
   */
  capitalizeFilter(filter) {
    if (filter === 'all') return 'All Work';

    return filter
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Update gallery with new images
   * @param {Array} newImages - New image array
   */
  update(newImages) {
    this.images = newImages;
    this.render();
  }

  /**
   * Destroy the gallery and clean up
   */
  destroy() {
    if (this.lightbox) {
      this.closeLightbox();
    }

    if (this.lazyObserver) {
      this.lazyObserver.disconnect();
      this.lazyObserver = null;
    }

    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

export default PortfolioGallery;