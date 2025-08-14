/**
 * Instagram Feed Display Component
 * Renders Instagram posts with proper attribution and interactions
 * Enhanced with image optimization and WebP support
 */

import { formatInstagramDate, cleanInstagramCaption, getMediaUrl } from '../../js/utils/instagram-api.js';
import { imageOptimizer } from '../../js/utils/image-optimizer.js';

export class InstagramFeed {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.options = {
      maxPosts: 6,
      showCaptions: true,
      showDates: true,
      showAttribution: true,
      captionLength: 100,
      lazyLoad: true,
      animateOnScroll: true,
      fallbackMessage: 'Follow us on Instagram for the latest updates!',
      ...options
    };
    
    this.posts = [];
    this.isLoading = false;
    this.observer = null;
    
    this.init();
  }

  /**
   * Initialize the Instagram feed component
   */
  init() {
    if (!this.container) {
      console.error('Instagram feed container not found');
      return;
    }

    this.container.classList.add('instagram-feed');
    this.setupEventListeners();
    this.setupIntersectionObserver();
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Listen for Instagram content updates
    document.addEventListener('valhalla:instagram-updated', (event) => {
      this.updatePosts(event.detail.posts);
    });

    // Handle click events for posts
    this.container.addEventListener('click', (event) => {
      this.handlePostClick(event);
    });
  }

  /**
   * Set up intersection observer for animations
   */
  setupIntersectionObserver() {
    if (!this.options.animateOnScroll) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });
  }

  /**
   * Render Instagram posts
   * @param {Array} posts - Array of Instagram posts
   */
  async render(posts = []) {
    this.posts = posts.slice(0, this.options.maxPosts);
    
    if (this.posts.length === 0) {
      this.renderFallback();
      return;
    }

    this.container.innerHTML = this.generateFeedHTML();
    this.setupLazyLoading();
    this.setupAnimations();
  }

  /**
   * Update posts and re-render
   * @param {Array} posts - New posts array
   */
  updatePosts(posts) {
    this.render(posts);
  }

  /**
   * Generate HTML for the Instagram feed
   * @returns {string} HTML string
   */
  generateFeedHTML() {
    const postsHTML = this.posts.map((post, index) => this.generatePostHTML(post, index)).join('');
    
    return `
      <div class="instagram-feed-header">
        <div class="instagram-feed-title">
          <svg class="instagram-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <span>Latest from Instagram</span>
        </div>
        <a href="https://instagram.com/valhallatattoo" target="_blank" rel="noopener" class="instagram-follow-btn">
          Follow @valhallatattoo
        </a>
      </div>
      <div class="instagram-feed-grid">
        ${postsHTML}
      </div>
    `;
  }

  /**
   * Generate HTML for a single Instagram post
   * @param {Object} post - Instagram post data
   * @param {number} index - Post index for animation delay
   * @returns {string} HTML string
   */
  generatePostHTML(post, index) {
    const mediaUrl = getMediaUrl(post, 'thumbnail');
    const fullMediaUrl = getMediaUrl(post, 'full');
    const caption = this.options.showCaptions ? cleanInstagramCaption(post.caption, { maxLength: this.options.captionLength }) : '';
    const date = this.options.showDates ? formatInstagramDate(post.timestamp) : '';
    const isVideo = post.isVideo;
    const isFallback = post.isFallback;
    
    // Create a temporary container to generate the optimized image
    const tempContainer = document.createElement('div');
    const optimizedImage = imageOptimizer.createOptimizedImage({
      src: mediaUrl,
      alt: caption || 'Instagram post',
      width: 300,
      height: 300,
      className: 'instagram-post-image',
      lazy: this.options.lazyLoad,
      responsive: true,
      placeholder: 'blur',
      sizes: '(max-width: 768px) 50vw, 300px',
      priority: index < 3 // First 3 posts are priority
    });
    
    tempContainer.appendChild(optimizedImage);
    const optimizedImageHTML = tempContainer.innerHTML;
    
    return `
      <article class="instagram-post" data-post-id="${post.id}" data-animation-delay="${index * 100}">
        <div class="instagram-post-media social-image">
          ${optimizedImageHTML}
          ${isVideo ? '<div class="instagram-post-video-indicator"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></div>' : ''}
          <div class="instagram-post-overlay">
            <div class="instagram-post-actions">
              <button class="instagram-post-view" data-media-url="${fullMediaUrl}" data-caption="${post.fullCaption || caption}" data-permalink="${post.permalink}">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              </button>
              <a href="${post.permalink}" target="_blank" rel="noopener" class="instagram-post-link">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        ${caption || date ? `
          <div class="instagram-post-content">
            ${caption ? `<p class="instagram-post-caption">${caption}</p>` : ''}
            ${date ? `<time class="instagram-post-date" datetime="${post.timestamp}">${date}</time>` : ''}
            ${isFallback ? '<span class="instagram-post-fallback-indicator">Sample content</span>' : ''}
          </div>
        ` : ''}
      </article>
    `;
  }

  /**
   * Render fallback content when no posts are available
   */
  renderFallback() {
    this.container.innerHTML = `
      <div class="instagram-feed-fallback">
        <div class="instagram-feed-fallback-content">
          <svg class="instagram-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
          <h3>Follow Us on Instagram</h3>
          <p>${this.options.fallbackMessage}</p>
          <a href="https://instagram.com/valhallatattoo" target="_blank" rel="noopener" class="instagram-follow-btn">
            Follow @valhallatattoo
          </a>
        </div>
      </div>
    `;
  }

  /**
   * Set up lazy loading for images
   * Now handled by the image optimizer, but we can listen for events
   */
  setupLazyLoading() {
    if (!this.options.lazyLoad) return;

    // Listen for image optimization events
    this.container.addEventListener('optimized-load', (event) => {
      console.log('Instagram image loaded:', event.detail.src);
    });

    this.container.addEventListener('optimized-error', (event) => {
      console.warn('Instagram image failed to load:', event.detail.originalSrc);
    });
  }

  /**
   * Set up scroll animations
   */
  setupAnimations() {
    if (!this.options.animateOnScroll || !this.observer) return;

    const posts = this.container.querySelectorAll('.instagram-post');
    posts.forEach(post => {
      this.observer.observe(post);
    });
  }

  /**
   * Handle post click events
   * @param {Event} event - Click event
   */
  handlePostClick(event) {
    const viewButton = event.target.closest('.instagram-post-view');
    if (viewButton) {
      event.preventDefault();
      this.openPostModal(viewButton);
    }
  }

  /**
   * Open post in modal/lightbox
   * @param {Element} button - View button element
   */
  openPostModal(button) {
    const mediaUrl = button.dataset.mediaUrl;
    const caption = button.dataset.caption;
    const permalink = button.dataset.permalink;

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'instagram-modal';
    modal.innerHTML = `
      <div class="instagram-modal-backdrop"></div>
      <div class="instagram-modal-content">
        <button class="instagram-modal-close" aria-label="Close">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        <div class="instagram-modal-media">
          <img src="${mediaUrl}" alt="${caption || 'Instagram post'}" />
        </div>
        <div class="instagram-modal-info">
          <p class="instagram-modal-caption">${caption || ''}</p>
          <a href="${permalink}" target="_blank" rel="noopener" class="instagram-modal-link">
            View on Instagram
          </a>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.classList.add('modal-open');

    // Handle modal close
    const closeModal = () => {
      document.body.removeChild(modal);
      document.body.classList.remove('modal-open');
    };

    modal.querySelector('.instagram-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.instagram-modal-backdrop').addEventListener('click', closeModal);

    // Handle escape key
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);

    // Animate in
    requestAnimationFrame(() => {
      modal.classList.add('active');
    });
  }

  /**
   * Show loading state
   */
  showLoading() {
    this.isLoading = true;
    this.container.innerHTML = `
      <div class="instagram-feed-loading">
        <div class="loading-spinner"></div>
        <p>Loading Instagram posts...</p>
      </div>
    `;
  }

  /**
   * Hide loading state
   */
  hideLoading() {
    this.isLoading = false;
  }

  /**
   * Destroy the component
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    document.removeEventListener('valhalla:instagram-updated', this.updatePosts);
    
    if (this.container) {
      this.container.innerHTML = '';
      this.container.classList.remove('instagram-feed');
    }
  }
}

export default InstagramFeed;