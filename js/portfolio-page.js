/**
 * Portfolio Gallery Component (patched)
 */
class PortfolioGallery {
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
    this.boundTrapFocus = null;
    this.portfolioItems = [];
    this.currentImageIndex = 0;
    this.lazyObserver = null;
  }

  /** Utils */
  _norm = (s) => (s || '').toLowerCase().trim().replace(/\s+/g, '-');
  _safe = (s) => (s == null ? '' : String(s));

  /** Initialize */
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

  /** Render gallery */
  render() {
    if (!this.container) {
      console.error('Gallery container not found');
      return;
    }

    const galleryHTML = this.images.map(img => this.renderImageItem(img)).join('');

    this.container.innerHTML = `
      <div class="portfolio-gallery-grid" role="grid" aria-label="Portfolio gallery">
        ${galleryHTML}
      </div>
    `;

    if (this.options.lazyLoading) {
      this.setupLazyLoading();
    }
  }

  /** Render one item (store normalized attrs for filtering) */
  renderImageItem(image) {
    const imageSrc = image.src || `../images/portfolio/${image.artistSlug || 'default'}/${image.filename}`;
    const placeholder = this.generatePlaceholder();
    const normStyle = this._norm(image.style);
    const normTags = (image.tags || []).map(this._norm).join(',');

    return `
      <article class="portfolio-item"
               data-style="${normStyle}"
               data-tags="${normTags}"
               data-artist="${this._safe(image.artistSlug)}"
               role="gridcell">
        <div class="portfolio-item__image">
          <img src="${this.options.lazyLoading ? placeholder : imageSrc}" 
               ${this.options.lazyLoading ? `data-src="${imageSrc}"` : ''}
               alt="${this._safe(image.title) || 'Portfolio image'}" 
               class="portfolio-img ${this.options.lazyLoading ? 'lazy' : ''}"
               loading="${this.options.lazyLoading ? 'lazy' : 'eager'}"
               tabindex="0">
        </div>

        <div class="portfolio-overlay">
          <div class="portfolio-info">
            <h4 class="portfolio-title">${this._safe(image.title) || 'Untitled'}</h4>
            ${image.style ? `<p class="portfolio-style">${this._safe(image.style)}</p>` : ''}
            ${this.options.showArtistNames && image.artist ? `<p class="portfolio-artist">By ${this._safe(image.artist)}</p>` : ''}
            ${image.placement ? `<p class="portfolio-placement">${this._safe(image.placement)}</p>` : ''}
            ${image.sessionTime ? `<p class="portfolio-time">${this._safe(image.sessionTime)}</p>` : ''}
            ${image.description ? `<p class="portfolio-description">${this._safe(image.description)}</p>` : ''}
            ${image.tags && image.tags.length ? 
              `<div class="portfolio-tags">${image.tags.map(tag => 
                `<span class="portfolio-tag">${this._safe(tag)}</span>`
              ).join('')}</div>` : ''}
          </div>
        </div>
      </article>
    `;
  }

  /** Filters UI */
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
    this.container.insertBefore(filterContainer, this.container.firstChild);

    // Scoped listener
    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (btn) this.handleFilterClick(btn);
    });
  }

  /** Lazy loading */
  setupLazyLoading() {
    if (!this.container) return;

    const images = this.container.querySelectorAll('img.lazy[data-src]');
    if (!images.length) return;

    const loadImage = (img) => {
      const dataSrc = img.getAttribute('data-src');
      if (!dataSrc) return;
      img.src = dataSrc;
      img.removeAttribute('data-src');
      img.classList.remove('lazy');
    };

    // Fallback
    if (!('IntersectionObserver' in window)) {
      images.forEach(loadImage);
      return;
    }

    if (this.lazyObserver) this.lazyObserver.disconnect();

    this.lazyObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        loadImage(entry.target);
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '200px 0px', threshold: 0.1 });

    images.forEach(img => {
      // Optional: error fallback
      img.onerror = () => { img.src = this.generatePlaceholder(); };
      this.lazyObserver.observe(img);
    });
  }

  /** Collect unique normalized filters */
  getUniqueFilters() {
    const filters = new Set(['all']);
    this.images.forEach(image => {
      if (image.style) filters.add(this._norm(image.style));
      (image.tags || []).forEach(tag => filters.add(this._norm(tag)));
    });
    return Array.from(filters);
  }

  /** Filter button click (scoped) */
  handleFilterClick(button) {
    const filter = button.getAttribute('data-filter') || 'all';
    const filterWrap = this.container.querySelector('.portfolio-filters');

    filterWrap?.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    });

    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');

    this.filterImages(filter);
    this.currentFilter = filter;
  }

  /** Apply filter (compare normalized equality) */
  filterImages(filter) {
    const f = (filter || '').toLowerCase();
    const items = this.container.querySelectorAll('.portfolio-item');

    items.forEach(item => {
      const style = item.getAttribute('data-style') || '';
      const tags = (item.getAttribute('data-tags') || '').split(',').filter(Boolean);
      const show = f === 'all' || style === f || tags.includes(f);

      item.style.display = show ? '' : 'none';
      item.setAttribute('aria-hidden', show ? 'false' : 'true');
    });
  }

  /** Lightbox setup (delegated) */
  setupLightbox() {
    this.container.addEventListener('click', (e) => {
      const img = e.target.closest('.portfolio-img');
      if (img) {
        e.preventDefault();
        this.openLightbox(img);
      }
    });

    // Keyboard activation on focused image
    this.container.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.classList?.contains('portfolio-img')) {
        e.preventDefault();
        this.openLightbox(e.target);
      }
    });
  }

  /** Open lightbox */
  openLightbox(imgElement) {
    if (!imgElement) return;

    const portfolioItem = imgElement.closest('.portfolio-item');
    if (!portfolioItem) return;

    const src = imgElement.getAttribute('data-src') || imgElement.src;
    const alt = imgElement.alt || '';

    // Visible items for navigation
    this.portfolioItems = Array.from(this.container.querySelectorAll('.portfolio-item'))
      .filter(item => item.style.display !== 'none');

    this.currentImageIndex = Math.max(0, this.portfolioItems.indexOf(portfolioItem));

    this.lightbox = document.createElement('div');
    this.lightbox.className = 'lightbox-overlay';
    this.lightbox.setAttribute('role', 'dialog');
    this.lightbox.setAttribute('aria-modal', 'true');

    const imageData = this.getImageDataFromElement(portfolioItem);

    this.lightbox.innerHTML = `
      <div class="lightbox-content">
        <div class="lightbox-image-container">
          <img src="${src}" alt="${alt}" class="lightbox-img">
        </div>

        ${imageData ? `
          <div class="lightbox-info">
            <h3 class="lightbox-title">${this._safe(imageData.title)}</h3>
            ${imageData.style ? `<p class="lightbox-style">${this._safe(imageData.style)}</p>` : ''}
            ${imageData.artist ? `<p class="lightbox-artist">By ${this._safe(imageData.artist)}</p>` : ''}
            ${imageData.description ? `<p class="lightbox-description">${this._safe(imageData.description)}</p>` : ''}
          </div>
        ` : ''}

        <button class="lightbox-close" aria-label="Close lightbox" type="button">&times;</button>
        <button class="lightbox-prev" aria-label="Previous image" type="button">‹</button>
        <button class="lightbox-next" aria-label="Next image" type="button">›</button>
      </div>
    `;

    document.body.appendChild(this.lightbox);
    document.body.style.overflow = 'hidden';

    this.setupLightboxEvents();
    this.lightbox.querySelector('.lightbox-close')?.focus();
  }

  /** Lightbox events: close, nav, keyboard, focus trap */
  setupLightboxEvents() {
    if (!this.lightbox) return;

    const closeBtn = this.lightbox.querySelector('.lightbox-close');
    const prevBtn  = this.lightbox.querySelector('.lightbox-prev');
    const nextBtn  = this.lightbox.querySelector('.lightbox-next');

    closeBtn?.addEventListener('click', () => this.closeLightbox());
    prevBtn?.addEventListener('click', () => this.navigateLightbox(-1));
    nextBtn?.addEventListener('click', () => this.navigateLightbox(1));

    // Click outside content to close
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.closeLightbox();
    });

    // Keyboard navigation
    if (!this.boundHandleLightboxKeydown) {
      this.boundHandleLightboxKeydown = this.handleLightboxKeydown.bind(this);
    }
    document.addEventListener('keydown', this.boundHandleLightboxKeydown);

    // Basic focus trap (Tab cycles inside the dialog)
    if (!this.boundTrapFocus) {
      this.boundTrapFocus = (e) => {
        if (!this.lightbox) return;
        if (e.key !== 'Tab') return;

        const focusables = this.lightbox.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
    }
    this.lightbox.addEventListener('keydown', this.boundTrapFocus);
  }

  /** Keyboard handler */
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

  /** Close lightbox */
  closeLightbox() {
    if (!this.lightbox) return;

    this.lightbox.removeEventListener('keydown', this.boundTrapFocus);
    this.boundTrapFocus = null;

    document.body.removeChild(this.lightbox);
    document.body.style.overflow = '';

    if (this.boundHandleLightboxKeydown) {
      document.removeEventListener('keydown', this.boundHandleLightboxKeydown);
    }

    this.lightbox = null;
  }

  /** Navigate images */
  navigateLightbox(direction) {
    if (!this.portfolioItems.length || !this.lightbox) return;

    const total = this.portfolioItems.length;
    let newIndex = (this.currentImageIndex + direction + total) % total;

    const nextItem = this.portfolioItems[newIndex];
    const nextImg = nextItem.querySelector('.portfolio-img');
    if (!nextImg) return;

    const src = nextImg.getAttribute('data-src') || nextImg.src;
    const alt = nextImg.alt || '';
    const imageData = this.getImageDataFromElement(nextItem);

    const lightboxImg = this.lightbox.querySelector('.lightbox-img');
    if (lightboxImg) {
      lightboxImg.src = src;
      lightboxImg.alt = alt;
    }

    // Update info panel (remove if no data)
    const info = this.lightbox.querySelector('.lightbox-info');
    if (imageData) {
      const html = `
        <h3 class="lightbox-title">${this._safe(imageData.title)}</h3>
        ${imageData.style ? `<p class="lightbox-style">${this._safe(imageData.style)}</p>` : ''}
        ${imageData.artist ? `<p class="lightbox-artist">By ${this._safe(imageData.artist)}</p>` : ''}
        ${imageData.description ? `<p class="lightbox-description">${this._safe(imageData.description)}</p>` : ''}`;
      if (info) {
        info.innerHTML = html;
      } else {
        const infoContainer = document.createElement('div');
        infoContainer.className = 'lightbox-info';
        infoContainer.innerHTML = html;
        this.lightbox.querySelector('.lightbox-content')
          .insertBefore(infoContainer, this.lightbox.querySelector('.lightbox-close'));
      }
    } else if (info) {
      info.remove();
    }

    this.currentImageIndex = newIndex;
  }

  /** Scroll animations */
  setupScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '50px' });

    setTimeout(() => {
      const items = this.container.querySelectorAll('.portfolio-item');
      items.forEach(item => observer.observe(item));
    }, 100);
  }

  /** Extract info for lightbox from DOM */
  getImageDataFromElement(element) {
    if (!element) return null;
    const title = element.querySelector('.portfolio-title')?.textContent || '';
    const style = element.querySelector('.portfolio-style')?.textContent || '';
    const artist = (element.querySelector('.portfolio-artist')?.textContent || '').replace(/^By\s+/, '');
    const description = element.querySelector('.portfolio-description')?.textContent || '';
    return { title, style, artist, description };
  }

  /** Placeholder */
  generatePlaceholder() {
    return 'data:image/svg+xml,' + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><rect width="400" height="300" fill="#f0f0f0"/><text x="50%" y="50%" text-anchor="middle" fill="#999" font-family="Arial" font-size="16">Loading...</text></svg>'
    );
  }

  /** Human label for filter */
  capitalizeFilter(filter) {
    if (filter === 'all') return 'All Work';
    return filter.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  /** Update images + refresh filters and behaviors */
  update(newImages) {
    this.images = newImages;
    this.render();

    if (this.options.showFilters) {
      const old = this.container.querySelector('.portfolio-filters');
      if (old) old.remove();
      this.renderFilters();
    }

    // Reattach lightbox delegation in case DOM replaced
    if (this.options.lightboxEnabled) {
      // no-op: delegation remains on container; if container was replaced,
      // ensure you passed the same node in ctor. If not, re-bind here.
    }

    if (this.options.animateOnScroll) {
      this.setupScrollAnimations();
    }
  }

  /** Destroy */
  destroy() {
    if (this.lightbox) this.closeLightbox();
    if (this.lazyObserver) {
      this.lazyObserver.disconnect();
      this.lazyObserver = null;
    }
    if (this.container) this.container.innerHTML = '';
  }
}

(function initPortfolioFallback(global) {
  if (typeof global === 'undefined' || !global.document) {
    return;
  }

  // Expose the gallery so existing scripts can reach it if needed
  global.ValhallaPortfolioGallery = PortfolioGallery;

  const LOG_PREFIX = '[Portfolio Fallback]';

  const getArtistSlugFromURL = () => {
    const path = global.location?.pathname || '';
    if (!path) return null;

    const segments = path.split('/').filter(Boolean);
    if (!segments.length) return null;

    const filename = segments[segments.length - 1];
    const slug = filename.replace('.html', '');

    if (!slug || slug === 'index' || slug.includes('.')) {
      return null;
    }

    return slug;
  };

  const showNoImagesMessage = (container, artistName) => {
    if (!container) return;

    container.innerHTML = `
      <div class="portfolio-empty">
        <p>Portfolio images coming soon! Check back later to see ${artistName || 'this artist'}'s latest work.</p>
        <a href="../index.html#contact" class="btn btn-primary">Contact for More Info</a>
      </div>
    `;
  };

  const bootstrapFallback = () => {
    // If the modern module-driven manager already ran, respect it
    if (global.PortfolioPageManager || global.ValhallaFallbackInitialized) {
      return;
    }

    const getArtist = global.ValhallaGetArtistBySlug;
    const getPortfolio = global.ValhallaGetArtistPortfolio;

    if (typeof getArtist !== 'function' || typeof getPortfolio !== 'function') {
      console.warn(`${LOG_PREFIX} Artist data helpers unavailable; skipping fallback initialization.`);
      return;
    }

    const slug = getArtistSlugFromURL();
    if (!slug) {
      console.warn(`${LOG_PREFIX} Unable to determine artist slug from URL.`);
      return;
    }

    const artist = getArtist(slug);
    if (!artist) {
      console.warn(`${LOG_PREFIX} No artist data found for slug "${slug}".`);
      return;
    }

    const galleryContainer = global.document.querySelector('.portfolio-gallery');
    if (!galleryContainer) {
      return;
    }

    // If another script already rendered the gallery, no need to continue
    if (galleryContainer.querySelector('.portfolio-item')) {
      return;
    }

    const images = getPortfolio(slug, true);
    if (!images || images.length === 0) {
      showNoImagesMessage(galleryContainer, artist.name);
      return;
    }

    try {
      const gallery = new PortfolioGallery(galleryContainer, {
        showFilters: false,
        showArtistNames: false,
        lightboxEnabled: true,
        lazyLoading: true,
        animateOnScroll: true
      });

      gallery.init(images);
      global.ValhallaFallbackGallery = gallery;
      global.ValhallaFallbackInitialized = true;
      console.info(`${LOG_PREFIX} Initialized with ${images.length} images for ${artist.name || slug}.`);
    } catch (error) {
      console.error(`${LOG_PREFIX} Failed to initialize gallery:`, error);
      showNoImagesMessage(galleryContainer, artist.name);
    }
  };

  const scheduleBootstrap = () => {
    const execute = () => {
      // Ensure module-based setup had a chance to run first
      global.setTimeout(bootstrapFallback, 120);
    };

    if (global.document.readyState === 'loading') {
      global.document.addEventListener('DOMContentLoaded', execute, { once: true });
    } else {
      execute();
    }
  };

  scheduleBootstrap();
})(typeof window !== 'undefined' ? window : undefined);
