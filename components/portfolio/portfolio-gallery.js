/**
 * Portfolio Gallery Component
 * Handles image grid display, lazy loading, and lightbox functionality
 * Enhanced with image optimization and WebP support
 */

import { imageOptimizer } from '../../js/utils/image-optimizer.js';
import accessibilityManager from '../../js/utils/accessibility.js';

class PortfolioGallery {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      lazyLoad: true,
      lightbox: true,
      masonry: true,
      itemsPerPage: 12,
      ...options
    };

    this.images = [];
    this.currentPage = 1;
    this.isLoading = false;
    this.observer = null;

    this.init();
  }

  init() {
    this.setupGallery();
    if (this.options.lazyLoad) {
      this.setupLazyLoading();
    }
    if (this.options.lightbox) {
      this.setupLightbox();
    }
    this.bindEvents();
  }

  setupGallery() {
    this.container.classList.add('portfolio-gallery');
    if (this.options.masonry) {
      this.container.classList.add('masonry-layout');
    }
  }

  setupLazyLoading() {
    // The image optimizer handles lazy loading, so we don't need a separate observer
    // But we can listen for image load events for additional functionality
    this.container.addEventListener('optimized-load', (event) => {
      const img = event.target;
      const galleryItem = img.closest('.gallery-item');
      
      if (galleryItem && this.options.masonry) {
        // Recalculate masonry layout when images load
        this.setGridRowSpan(galleryItem, img);
      }
    });

    this.container.addEventListener('optimized-error', (event) => {
      console.warn('Gallery image failed to load:', event.detail.originalSrc);
    });
  }

  setupLightbox() {
    // Create cinematic lightbox overlay with enhanced accessibility features
    this.lightbox = document.createElement('div');
    this.lightbox.className = 'lightbox-overlay';
    this.lightbox.setAttribute('role', 'dialog');
    this.lightbox.setAttribute('aria-modal', 'true');
    this.lightbox.setAttribute('aria-labelledby', 'lightbox-title');
    this.lightbox.setAttribute('aria-describedby', 'lightbox-description');
    this.lightbox.setAttribute('aria-hidden', 'true');
    this.lightbox.innerHTML = `
      <div class="lightbox-backdrop"></div>
      <div class="lightbox-container">
        <div class="lightbox-header">
          <button class="lightbox-close" aria-label="Close lightbox (Escape key)">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div class="lightbox-counter" role="status" aria-live="polite">
            <span class="sr-only">Image </span>
            <span class="current">1</span> 
            <span class="sr-only"> of </span>
            <span class="total">1</span>
          </div>
        </div>
        
        <div class="lightbox-content">
          <button class="lightbox-nav lightbox-prev" aria-label="Previous image (Left arrow key)" title="Previous image">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polyline points="15,18 9,12 15,6"></polyline>
            </svg>
          </button>
          
          <div class="lightbox-image-container" role="img" aria-labelledby="lightbox-title">
            <div class="lightbox-loading" role="status" aria-live="polite">
              <div class="lightbox-spinner" aria-hidden="true"></div>
              <p>Loading image...</p>
            </div>
            <img class="lightbox-image" alt="" draggable="false" tabindex="0">
            <div class="lightbox-zoom-controls" role="group" aria-label="Image zoom controls">
              <button class="zoom-in" aria-label="Zoom in (+ key)" title="Zoom in">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button>
              <button class="zoom-out" aria-label="Zoom out (- key)" title="Zoom out">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </button>
              <button class="zoom-reset" aria-label="Reset zoom (0 key)" title="Reset zoom">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M3 3l18 18M21 3l-18 18"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <button class="lightbox-nav lightbox-next" aria-label="Next image (Right arrow key)" title="Next image">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>
        
        <div class="lightbox-info">
          <div class="lightbox-info-content">
            <h3 class="lightbox-title" id="lightbox-title"></h3>
            <p class="lightbox-description" id="lightbox-description"></p>
            <div class="lightbox-meta" role="group" aria-label="Tattoo details">
              <span class="lightbox-artist"></span>
              <span class="lightbox-style"></span>
              <span class="lightbox-placement"></span>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(this.lightbox);
    
    // Initialize lightbox state
    this.lightboxState = {
      isOpen: false,
      currentIndex: 0,
      isZoomed: false,
      zoomLevel: 1,
      panX: 0,
      panY: 0,
      isDragging: false,
      startX: 0,
      startY: 0,
      preloadedImages: new Map()
    };
    
    // Setup touch and gesture support
    this.setupTouchGestures();
    this.setupZoomAndPan();
  }

  loadImages(images) {
    this.images = images.map(image => ({
      ...image,
      // Ensure compatibility with existing structure
      src: image.src || `images/portfolio/${image.artistSlug || 'default'}/${image.filename}`,
      placeholder: image.placeholder || this.generatePlaceholder(400, 300)
    }));
    this.renderImages();
  }

  renderImages(append = false) {
    if (!append) {
      this.container.innerHTML = '';
    }

    const startIndex = append ? (this.currentPage - 1) * this.options.itemsPerPage : 0;
    const endIndex = startIndex + this.options.itemsPerPage;
    const imagesToRender = this.images.slice(startIndex, endIndex);

    // Preload critical images for better performance
    const criticalImages = imagesToRender.slice(0, 6).map(img => img.src);
    imageOptimizer.preloadCriticalImages(criticalImages);

    imagesToRender.forEach((image, index) => {
      const imageElement = this.createImageElement(image, startIndex + index);
      this.container.appendChild(imageElement);
    });

    if (this.options.masonry) {
      // Apply masonry layout after a short delay to allow images to start loading
      setTimeout(() => {
        this.applyMasonryLayout();
      }, 100);
    }
  }

  createImageElement(image, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.dataset.index = index;

    // Create optimized image using the image optimizer
    const optimizedImage = imageOptimizer.createOptimizedImage({
      src: image.src,
      alt: this.generateImageAlt(image),
      width: 400,
      height: 400,
      className: 'gallery-image',
      lazy: this.options.lazyLoad,
      responsive: true,
      placeholder: 'blur',
      sizes: '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
      priority: index < 6 // First 6 images are priority
    });

    // Add gallery-specific classes
    optimizedImage.classList.add('portfolio-image');

    const overlay = document.createElement('div');
    overlay.className = 'gallery-overlay';
    
    const info = this.formatImageInfo(image);
    overlay.innerHTML = `
      <div class="gallery-info">
        <h4>${info.title}</h4>
        <p>${info.subtitle}</p>
      </div>
      <button class="gallery-view-btn" aria-label="View ${info.title} full size">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
        </svg>
      </button>
    `;

    item.appendChild(optimizedImage);
    item.appendChild(overlay);

    return item;
  }

  generateImageAlt(image) {
    const parts = [];
    if (image.title) parts.push(image.title);
    if (image.style) parts.push(image.style);
    parts.push('tattoo');
    if (image.artist) parts.push(`by ${image.artist}`);
    return parts.join(' ');
  }

  formatImageInfo(image) {
    const title = image.title || `${image.style || 'Tattoo'} Work`;
    const subtitleParts = [];
    
    if (image.style && image.style !== title) subtitleParts.push(image.style);
    if (image.placement) subtitleParts.push(image.placement);
    if (image.sessionTime) subtitleParts.push(image.sessionTime);
    if (image.artist) subtitleParts.push(`by ${image.artist}`);
    
    return {
      title,
      subtitle: subtitleParts.join(' • ')
    };
  }

  generatePlaceholder(width = 400, height = 300) {
    return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3Crect width="${width}" height="${height}" fill="%23333"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="16"%3ELoading...%3C/text%3E%3C/svg%3E`;
  }

  // Image loading is now handled by the image optimizer
  // This method is kept for backward compatibility but delegates to the optimizer

  applyMasonryLayout() {
    // Simple masonry layout using CSS Grid
    const items = this.container.querySelectorAll('.gallery-item');
    items.forEach(item => {
      const img = item.querySelector('img');
      if (img.complete) {
        this.setGridRowSpan(item, img);
      } else {
        img.onload = () => this.setGridRowSpan(item, img);
      }
    });
  }

  setGridRowSpan(item, img) {
    const rowHeight = parseInt(getComputedStyle(this.container).getPropertyValue('grid-auto-rows'));
    const rowGap = parseInt(getComputedStyle(this.container).getPropertyValue('grid-row-gap'));
    const rowSpan = Math.ceil((img.offsetHeight + rowGap) / (rowHeight + rowGap));
    item.style.gridRowEnd = `span ${rowSpan}`;
  }

  openLightbox(index) {
    if (!this.lightbox) return;

    this.lightboxState.isOpen = true;
    this.lightboxState.currentIndex = index;
    this.currentLightboxIndex = index;
    
    const image = this.images[index];
    const info = this.formatImageInfo(image);

    // Show loading state
    const loadingEl = this.lightbox.querySelector('.lightbox-loading');
    const lightboxImg = this.lightbox.querySelector('.lightbox-image');
    const lightboxTitle = this.lightbox.querySelector('.lightbox-title');
    const lightboxDescription = this.lightbox.querySelector('.lightbox-description');
    const lightboxArtist = this.lightbox.querySelector('.lightbox-artist');
    const lightboxStyle = this.lightbox.querySelector('.lightbox-style');
    const lightboxPlacement = this.lightbox.querySelector('.lightbox-placement');
    const currentCounter = this.lightbox.querySelector('.current');
    const totalCounter = this.lightbox.querySelector('.total');

    // Reset zoom and pan
    this.resetZoomAndPan();
    
    // Show lightbox with backdrop blur animation
    this.lightbox.classList.add('active');
    this.lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    
    // Trap focus within lightbox for accessibility
    this.focusTrap = accessibilityManager.trapFocus(this.lightbox);
    
    // Preload current and adjacent images
    this.preloadImages(index);
    
    // Load main image with elegant loading animation
    loadingEl.style.display = 'flex';
    lightboxImg.style.opacity = '0';
    
    // Announce lightbox opening to screen readers
    accessibilityManager.announce(`Opening image ${index + 1} of ${this.images.length}: ${info.title}`);
    
    const imageLoader = new Image();
    imageLoader.onload = () => {
      lightboxImg.src = image.src;
      lightboxImg.alt = this.generateImageAlt(image);
      
      // Smooth reveal animation
      setTimeout(() => {
        loadingEl.style.display = 'none';
        lightboxImg.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
        
        // Announce image loaded
        accessibilityManager.announce(`Image loaded: ${info.title}`);
      }, 300);
    };
    
    imageLoader.onerror = () => {
      loadingEl.innerHTML = '<p role="alert">Failed to load image</p>';
      accessibilityManager.announceError('Failed to load image');
      setTimeout(() => {
        loadingEl.style.display = 'none';
      }, 2000);
    };
    
    imageLoader.src = image.src;
    
    // Update info with smooth animations
    lightboxTitle.textContent = info.title;
    
    // Create detailed description
    const descriptionParts = [];
    if (image.description) descriptionParts.push(image.description);
    if (image.tags && image.tags.length > 0) {
      descriptionParts.push(`Tags: ${image.tags.join(', ')}`);
    }
    
    lightboxDescription.textContent = descriptionParts.join(' • ');
    lightboxArtist.textContent = image.artist ? `Artist: ${image.artist}` : '';
    lightboxStyle.textContent = image.style ? `Style: ${image.style}` : '';
    lightboxPlacement.textContent = image.placement ? `Placement: ${image.placement}` : '';
    
    currentCounter.textContent = index + 1;
    totalCounter.textContent = this.images.length;

    // Focus management for accessibility - focus close button initially
    setTimeout(() => {
      const closeButton = this.lightbox.querySelector('.lightbox-close');
      if (closeButton) {
        closeButton.focus();
      }
    }, 100);
    
    // Update navigation button states
    this.updateNavigationButtons();
  }

  closeLightbox() {
    if (!this.lightbox || !this.lightboxState.isOpen) return;

    this.lightboxState.isOpen = false;
    
    // Announce closing to screen readers
    accessibilityManager.announce('Closing image viewer');
    
    // Release focus trap
    if (this.focusTrap) {
      accessibilityManager.releaseFocusTrap();
      this.focusTrap = null;
    }
    
    // Smooth close animation
    this.lightbox.classList.add('closing');
    this.lightbox.setAttribute('aria-hidden', 'true');
    
    setTimeout(() => {
      this.lightbox.classList.remove('active', 'closing');
      document.body.classList.remove('lightbox-open');
      
      // Reset zoom and pan
      this.resetZoomAndPan();
      
      // Return focus to the gallery item that opened the lightbox
      const galleryItem = this.container.querySelector(`[data-index="${this.currentLightboxIndex}"]`);
      if (galleryItem) {
        const viewBtn = galleryItem.querySelector('.gallery-view-btn');
        if (viewBtn) {
          viewBtn.focus();
        } else {
          // If no view button, focus the gallery item itself
          galleryItem.setAttribute('tabindex', '0');
          galleryItem.focus();
          galleryItem.removeAttribute('tabindex');
        }
      }
    }, 300);
  }

  navigateLightbox(direction) {
    if (!this.lightboxState.isOpen) return;
    
    const newIndex = direction === 'next'
      ? (this.currentLightboxIndex + 1) % this.images.length
      : (this.currentLightboxIndex - 1 + this.images.length) % this.images.length;

    // Announce navigation to screen readers
    const image = this.images[newIndex];
    const info = this.formatImageInfo(image);
    accessibilityManager.announce(`${direction === 'next' ? 'Next' : 'Previous'} image: ${info.title}`);

    // Smooth transition animation
    const imageContainer = this.lightbox.querySelector('.lightbox-image-container');
    const currentDirection = direction === 'next' ? 'slide-left' : 'slide-right';
    
    imageContainer.classList.add(`transition-${currentDirection}`);
    
    setTimeout(() => {
      this.openLightbox(newIndex);
      imageContainer.classList.remove(`transition-${currentDirection}`);
    }, 200);
  }

  setupTouchGestures() {
    if (!this.lightbox) return;
    
    const imageContainer = this.lightbox.querySelector('.lightbox-image-container');
    const image = this.lightbox.querySelector('.lightbox-image');
    
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    let initialDistance = 0;
    let initialScale = 1;
    let touchStartTime = 0;
    let lastTouchEnd = 0;
    let touchCount = 0;
    
    // Enhanced touch start with multi-touch support
    imageContainer.addEventListener('touchstart', (e) => {
      touchStartTime = Date.now();
      touchCount = e.touches.length;
      
      if (e.touches.length === 1) {
        // Single touch - prepare for swipe or pan
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        
        // Handle double tap to zoom
        const timeSinceLastTouch = touchStartTime - lastTouchEnd;
        if (timeSinceLastTouch < 300 && timeSinceLastTouch > 0) {
          // Double tap detected
          if (this.lightboxState.zoomLevel === 1) {
            this.setZoom(2, e.touches[0].clientX, e.touches[0].clientY);
          } else {
            this.resetZoomAndPan();
          }
          e.preventDefault();
          return;
        }
        
      } else if (e.touches.length === 2) {
        // Two finger touch - prepare for pinch zoom
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        initialDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        initialScale = this.lightboxState.zoomLevel;
        
        // Calculate center point for zoom
        this.zoomCenterX = (touch1.clientX + touch2.clientX) / 2;
        this.zoomCenterY = (touch1.clientY + touch2.clientY) / 2;
      }
      
      e.preventDefault();
    }, { passive: false });
    
    // Enhanced touch move with smooth panning and zooming
    imageContainer.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && this.lightboxState.isZoomed) {
        // Single finger pan when zoomed
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        
        const deltaX = currentX - touchStartX;
        const deltaY = currentY - touchStartY;
        
        this.lightboxState.panX += deltaX;
        this.lightboxState.panY += deltaY;
        
        // Constrain panning to image bounds
        this.constrainPanning();
        this.updateImageTransform();
        
        touchStartX = currentX;
        touchStartY = currentY;
        
      } else if (e.touches.length === 2) {
        // Pinch zoom with smooth scaling
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        
        const scale = (currentDistance / initialDistance) * initialScale;
        const constrainedScale = Math.max(1, Math.min(4, scale));
        
        this.setZoom(constrainedScale, this.zoomCenterX, this.zoomCenterY);
      }
      
      e.preventDefault();
    }, { passive: false });
    
    // Enhanced touch end with gesture recognition
    imageContainer.addEventListener('touchend', (e) => {
      lastTouchEnd = Date.now();
      const touchDuration = lastTouchEnd - touchStartTime;
      
      if (e.changedTouches.length === 1 && touchCount === 1 && !this.lightboxState.isZoomed) {
        touchEndX = e.changedTouches[0].clientX;
        touchEndY = e.changedTouches[0].clientY;
        
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const distance = Math.hypot(deltaX, deltaY);
        const minSwipeDistance = 50;
        const maxTapDistance = 10;
        
        // Quick tap detection
        if (distance < maxTapDistance && touchDuration < 200) {
          // Quick tap - show/hide UI controls
          this.toggleLightboxControls();
        }
        // Swipe gesture detection
        else if (distance > minSwipeDistance) {
          const velocity = distance / touchDuration;
          
          // Horizontal swipe for navigation
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
              // Swipe right - previous image
              this.navigateLightbox('prev');
              this.addSwipeAnimation('right');
            } else {
              // Swipe left - next image
              this.navigateLightbox('next');
              this.addSwipeAnimation('left');
            }
          }
          // Vertical swipe down to close (with velocity threshold)
          else if (deltaY > minSwipeDistance && velocity > 0.3) {
            this.closeLightbox();
            this.addSwipeAnimation('down');
          }
        }
      }
      
      // Reset zoom constraints after pinch
      if (touchCount === 2) {
        this.constrainZoomAndPan();
      }
      
      e.preventDefault();
    }, { passive: false });
    
    // Handle touch cancel
    imageContainer.addEventListener('touchcancel', (e) => {
      // Reset any ongoing gestures
      touchCount = 0;
      e.preventDefault();
    }, { passive: false });
  }

  /**
   * Toggle lightbox controls visibility
   */
  toggleLightboxControls() {
    const controls = this.lightbox.querySelectorAll('.lightbox-header, .lightbox-info, .lightbox-nav');
    const isHidden = this.lightbox.classList.contains('controls-hidden');
    
    if (isHidden) {
      this.lightbox.classList.remove('controls-hidden');
      controls.forEach(control => {
        control.style.opacity = '1';
        control.style.pointerEvents = 'auto';
      });
    } else {
      this.lightbox.classList.add('controls-hidden');
      controls.forEach(control => {
        control.style.opacity = '0';
        control.style.pointerEvents = 'none';
      });
    }
  }

  /**
   * Add visual feedback for swipe gestures
   */
  addSwipeAnimation(direction) {
    const imageContainer = this.lightbox.querySelector('.lightbox-image-container');
    imageContainer.classList.add(`swipe-${direction}`);
    
    setTimeout(() => {
      imageContainer.classList.remove(`swipe-${direction}`);
    }, 300);
  }

  /**
   * Constrain panning to keep image within bounds
   */
  constrainPanning() {
    const image = this.lightbox.querySelector('.lightbox-image');
    const container = this.lightbox.querySelector('.lightbox-image-container');
    
    if (!image || !container) return;
    
    const imageRect = image.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    const scaledWidth = imageRect.width * this.lightboxState.zoomLevel;
    const scaledHeight = imageRect.height * this.lightboxState.zoomLevel;
    
    const maxPanX = Math.max(0, (scaledWidth - containerRect.width) / 2);
    const maxPanY = Math.max(0, (scaledHeight - containerRect.height) / 2);
    
    this.lightboxState.panX = Math.max(-maxPanX, Math.min(maxPanX, this.lightboxState.panX));
    this.lightboxState.panY = Math.max(-maxPanY, Math.min(maxPanY, this.lightboxState.panY));
  }

  /**
   * Constrain zoom and pan after gesture ends
   */
  constrainZoomAndPan() {
    // Smooth zoom to nearest valid level if needed
    if (this.lightboxState.zoomLevel < 1) {
      this.setZoom(1);
    } else if (this.lightboxState.zoomLevel > 4) {
      this.setZoom(4);
    }
    
    // Constrain panning
    this.constrainPanning();
    this.updateImageTransform();
  }

  setupZoomAndPan() {
    if (!this.lightbox) return;
    
    const imageContainer = this.lightbox.querySelector('.lightbox-image-container');
    const image = this.lightbox.querySelector('.lightbox-image');
    const zoomInBtn = this.lightbox.querySelector('.zoom-in');
    const zoomOutBtn = this.lightbox.querySelector('.zoom-out');
    const zoomResetBtn = this.lightbox.querySelector('.zoom-reset');
    
    // Zoom button controls
    zoomInBtn.addEventListener('click', () => {
      this.setZoom(Math.min(4, this.lightboxState.zoomLevel * 1.5));
    });
    
    zoomOutBtn.addEventListener('click', () => {
      this.setZoom(Math.max(1, this.lightboxState.zoomLevel / 1.5));
    });
    
    zoomResetBtn.addEventListener('click', () => {
      this.resetZoomAndPan();
    });
    
    // Mouse wheel zoom
    imageContainer.addEventListener('wheel', (e) => {
      if (!this.lightboxState.isOpen) return;
      
      e.preventDefault();
      const delta = e.deltaY > 0 ? 0.9 : 1.1;
      const newZoom = Math.max(1, Math.min(4, this.lightboxState.zoomLevel * delta));
      this.setZoom(newZoom);
    }, { passive: false });
    
    // Pan functionality
    let isPanning = false;
    let startPanX = 0;
    let startPanY = 0;
    
    image.addEventListener('mousedown', (e) => {
      if (this.lightboxState.isZoomed) {
        isPanning = true;
        startPanX = e.clientX - this.lightboxState.panX;
        startPanY = e.clientY - this.lightboxState.panY;
        image.style.cursor = 'grabbing';
        e.preventDefault();
      }
    });
    
    document.addEventListener('mousemove', (e) => {
      if (isPanning && this.lightboxState.isZoomed) {
        this.lightboxState.panX = e.clientX - startPanX;
        this.lightboxState.panY = e.clientY - startPanY;
        this.updateImageTransform();
        e.preventDefault();
      }
    });
    
    document.addEventListener('mouseup', () => {
      if (isPanning) {
        isPanning = false;
        image.style.cursor = this.lightboxState.isZoomed ? 'grab' : 'default';
      }
    });
    
    // Double click to zoom
    image.addEventListener('dblclick', (e) => {
      if (this.lightboxState.zoomLevel === 1) {
        this.setZoom(2);
      } else {
        this.resetZoomAndPan();
      }
      e.preventDefault();
    });
  }

  setZoom(level, centerX = null, centerY = null) {
    const previousZoom = this.lightboxState.zoomLevel;
    this.lightboxState.zoomLevel = level;
    this.lightboxState.isZoomed = level > 1;
    
    const image = this.lightbox.querySelector('.lightbox-image');
    const zoomControls = this.lightbox.querySelector('.lightbox-zoom-controls');
    const imageContainer = this.lightbox.querySelector('.lightbox-image-container');
    
    // Calculate zoom center point
    if (centerX !== null && centerY !== null && level > previousZoom) {
      const containerRect = imageContainer.getBoundingClientRect();
      const centerXRel = (centerX - containerRect.left) / containerRect.width - 0.5;
      const centerYRel = (centerY - containerRect.top) / containerRect.height - 0.5;
      
      // Adjust pan to zoom into the touch point
      const zoomFactor = level / previousZoom;
      this.lightboxState.panX = this.lightboxState.panX * zoomFactor - centerXRel * containerRect.width * (zoomFactor - 1);
      this.lightboxState.panY = this.lightboxState.panY * zoomFactor - centerYRel * containerRect.height * (zoomFactor - 1);
    }
    
    // Show/hide zoom controls based on device type
    const isTouchDevice = 'ontouchstart' in window;
    if (this.lightboxState.isZoomed) {
      if (!isTouchDevice) {
        zoomControls.classList.add('visible');
        image.style.cursor = 'grab';
      }
      imageContainer.classList.add('zoomed');
    } else {
      zoomControls.classList.remove('visible');
      image.style.cursor = 'default';
      imageContainer.classList.remove('zoomed');
      this.lightboxState.panX = 0;
      this.lightboxState.panY = 0;
    }
    
    // Add smooth zoom animation
    image.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    this.updateImageTransform();
    
    // Remove transition after animation
    setTimeout(() => {
      image.style.transition = '';
    }, 300);
    
    // Update zoom level indicator
    this.updateZoomIndicator(level);
  }

  /**
   * Update zoom level indicator for accessibility
   */
  updateZoomIndicator(level) {
    let indicator = this.lightbox.querySelector('.zoom-indicator');
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'zoom-indicator';
      indicator.setAttribute('role', 'status');
      indicator.setAttribute('aria-live', 'polite');
      this.lightbox.querySelector('.lightbox-container').appendChild(indicator);
    }
    
    const percentage = Math.round(level * 100);
    indicator.textContent = `${percentage}%`;
    indicator.classList.add('visible');
    
    // Hide indicator after 2 seconds
    clearTimeout(this.zoomIndicatorTimeout);
    this.zoomIndicatorTimeout = setTimeout(() => {
      indicator.classList.remove('visible');
    }, 2000);
  }

  resetZoomAndPan() {
    this.lightboxState.zoomLevel = 1;
    this.lightboxState.isZoomed = false;
    this.lightboxState.panX = 0;
    this.lightboxState.panY = 0;
    
    const image = this.lightbox.querySelector('.lightbox-image');
    const zoomControls = this.lightbox.querySelector('.lightbox-zoom-controls');
    
    zoomControls.classList.remove('visible');
    image.style.cursor = 'default';
    
    this.updateImageTransform();
  }

  updateImageTransform() {
    const image = this.lightbox.querySelector('.lightbox-image');
    image.style.transform = `scale(${this.lightboxState.zoomLevel}) translate(${this.lightboxState.panX}px, ${this.lightboxState.panY}px)`;
  }

  preloadImages(currentIndex) {
    const preloadIndices = [
      currentIndex - 1 >= 0 ? currentIndex - 1 : this.images.length - 1,
      currentIndex + 1 < this.images.length ? currentIndex + 1 : 0
    ];
    
    preloadIndices.forEach(index => {
      if (!this.lightboxState.preloadedImages.has(index)) {
        const img = new Image();
        img.src = this.images[index].src;
        this.lightboxState.preloadedImages.set(index, img);
      }
    });
  }

  updateNavigationButtons() {
    const prevBtn = this.lightbox.querySelector('.lightbox-prev');
    const nextBtn = this.lightbox.querySelector('.lightbox-next');
    
    // Show/hide navigation buttons based on image count
    if (this.images.length <= 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'flex';
      nextBtn.style.display = 'flex';
    }
  }

  loadMore() {
    if (this.isLoading) return;

    const totalPages = Math.ceil(this.images.length / this.options.itemsPerPage);
    if (this.currentPage >= totalPages) return;

    this.isLoading = true;
    this.currentPage++;

    // Simulate loading delay for better UX
    setTimeout(() => {
      this.renderImages(true);
      this.isLoading = false;
    }, 300);
  }

  bindEvents() {
    // Gallery item clicks
    this.container.addEventListener('click', (e) => {
      const galleryItem = e.target.closest('.gallery-item');
      if (galleryItem && this.options.lightbox) {
        const index = parseInt(galleryItem.dataset.index);
        this.openLightbox(index);
      }
    });

    // Enhanced lightbox events
    if (this.lightbox) {
      this.lightbox.addEventListener('click', (e) => {
        if (e.target.classList.contains('lightbox-overlay') ||
            e.target.classList.contains('lightbox-backdrop') ||
            e.target.classList.contains('lightbox-close') ||
            e.target.closest('.lightbox-close')) {
          this.closeLightbox();
        } else if (e.target.classList.contains('lightbox-prev') ||
                   e.target.closest('.lightbox-prev')) {
          this.navigateLightbox('prev');
        } else if (e.target.classList.contains('lightbox-next') ||
                   e.target.closest('.lightbox-next')) {
          this.navigateLightbox('next');
        }
      });

      // Enhanced keyboard navigation
      document.addEventListener('keydown', (e) => {
        if (!this.lightboxState.isOpen) return;

        switch (e.key) {
          case 'Escape':
            this.closeLightbox();
            break;
          case 'ArrowLeft':
          case 'a':
          case 'A':
            this.navigateLightbox('prev');
            break;
          case 'ArrowRight':
          case 'd':
          case 'D':
            this.navigateLightbox('next');
            break;
          case '+':
          case '=':
            this.setZoom(Math.min(4, this.lightboxState.zoomLevel * 1.2));
            break;
          case '-':
          case '_':
            this.setZoom(Math.max(1, this.lightboxState.zoomLevel / 1.2));
            break;
          case '0':
            this.resetZoomAndPan();
            break;
          case 'f':
          case 'F':
            // Toggle fullscreen if supported
            if (document.fullscreenElement) {
              document.exitFullscreen();
            } else {
              this.lightbox.requestFullscreen?.();
            }
            break;
        }
        
        // Prevent default behavior for handled keys
        if (['Escape', 'ArrowLeft', 'ArrowRight', '+', '=', '-', '_', '0', 'f', 'F', 'a', 'A', 'd', 'D'].includes(e.key)) {
          e.preventDefault();
        }
      });
    }

    // Infinite scroll for load more
    window.addEventListener('scroll', () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        this.loadMore();
      }
    });

    // Window resize for masonry layout
    if (this.options.masonry) {
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          this.applyMasonryLayout();
        }, 250);
      });
    }
  }

  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }

    if (this.lightbox) {
      document.body.removeChild(this.lightbox);
    }

    document.body.classList.remove('lightbox-open');
  }
}

export default PortfolioGallery;