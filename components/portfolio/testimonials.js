/**
 * Testimonials Component
 * Displays client testimonials with star ratings and rotation
 */

import { getArtistBySlug } from '../../js/data/artists.js';

export class Testimonials {
  constructor(container, artistSlug) {
    this.container = container;
    this.artistSlug = artistSlug;
    this.artist = null;
    this.testimonials = [];
    this.currentIndex = 0;
    this.autoRotateInterval = null;
    this.autoRotateDelay = 5000; // 5 seconds
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;
    
    try {
      // Load artist data
      this.artist = getArtistBySlug(this.artistSlug);
      
      if (!this.artist) {
        console.error(`Artist not found: ${this.artistSlug}`);
        this.renderError();
        return;
      }

      this.testimonials = this.artist.testimonials || [];
      
      if (this.testimonials.length === 0) {
        this.renderEmptyState();
        return;
      }

      this.render();
      this.setupInteractions();
      this.startAutoRotation();
      this.initialized = true;
      
      console.log(`Testimonials initialized for: ${this.artist.name} with ${this.testimonials.length} testimonials`);
    } catch (error) {
      console.error('Error initializing testimonials:', error);
      this.renderError();
    }
  }

  render() {
    const testimonialHTML = `
      <div class="testimonials-container">
        <header class="testimonials-header">
          <h2>What Clients Say About ${this.artist.name}</h2>
          <div class="average-rating">
            ${this.renderStars(this.getAverageRating())}
            <span class="rating-text">${this.getAverageRating().toFixed(1)} out of 5 stars</span>
            <span class="review-count">(${this.testimonials.length} review${this.testimonials.length !== 1 ? 's' : ''})</span>
          </div>
        </header>
        
        <div class="testimonials-carousel">
          <div class="testimonials-track" style="transform: translateX(-${this.currentIndex * 100}%)">
            ${this.testimonials.map((testimonial, index) => this.renderTestimonial(testimonial, index)).join('')}
          </div>
          
          ${this.testimonials.length > 1 ? this.renderCarouselControls() : ''}
        </div>
        
        <div class="testimonials-footer">
          <div class="verification-note">
            <span class="verified-icon">✓</span>
            <span>All reviews are from verified clients</span>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = testimonialHTML;
  }

  renderTestimonial(testimonial, index) {
    const isActive = index === this.currentIndex;
    const formattedDate = new Date(testimonial.date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });

    return `
      <div class="testimonial-slide ${isActive ? 'active' : ''}" data-index="${index}">
        <div class="testimonial-content">
          <div class="testimonial-rating">
            ${this.renderStars(testimonial.rating)}
          </div>
          
          <blockquote class="testimonial-text">
            "${testimonial.text}"
          </blockquote>
          
          <div class="testimonial-author">
            <div class="author-info">
              <h4 class="author-name">${testimonial.name}</h4>
              <div class="testimonial-meta">
                <span class="testimonial-date">${formattedDate}</span>
                ${testimonial.verified ? '<span class="verified-badge">Verified Client</span>' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<span class="star full">★</span>';
    }
    
    // Half star
    if (hasHalfStar) {
      starsHTML += '<span class="star half">☆</span>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<span class="star empty">☆</span>';
    }

    return `<div class="star-rating" data-rating="${rating}">${starsHTML}</div>`;
  }

  renderCarouselControls() {
    return `
      <div class="carousel-controls">
        <button class="carousel-btn prev-btn" aria-label="Previous testimonial">‹</button>
        <div class="carousel-indicators">
          ${this.testimonials.map((_, index) => 
            `<button class="indicator ${index === this.currentIndex ? 'active' : ''}" 
                     data-index="${index}" 
                     aria-label="Go to testimonial ${index + 1}"></button>`
          ).join('')}
        </div>
        <button class="carousel-btn next-btn" aria-label="Next testimonial">›</button>
      </div>
    `;
  }

  setupInteractions() {
    if (this.testimonials.length <= 1) return;

    // Previous button
    const prevBtn = this.container.querySelector('.prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        this.pauseAutoRotation();
        this.previousTestimonial();
      });
    }

    // Next button
    const nextBtn = this.container.querySelector('.next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        this.pauseAutoRotation();
        this.nextTestimonial();
      });
    }

    // Indicator buttons
    const indicators = this.container.querySelectorAll('.indicator');
    indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        const index = parseInt(indicator.dataset.index);
        this.pauseAutoRotation();
        this.goToTestimonial(index);
      });
    });

    // Pause auto-rotation on hover
    const carousel = this.container.querySelector('.testimonials-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', () => this.pauseAutoRotation());
      carousel.addEventListener('mouseleave', () => this.startAutoRotation());
    }

    // Keyboard navigation
    this.container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.pauseAutoRotation();
        this.previousTestimonial();
      } else if (e.key === 'ArrowRight') {
        this.pauseAutoRotation();
        this.nextTestimonial();
      }
    });

    // Touch/swipe support
    this.setupTouchEvents();
  }

  setupTouchEvents() {
    const carousel = this.container.querySelector('.testimonials-carousel');
    if (!carousel) return;

    let startX = 0;
    let isDragging = false;

    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      this.pauseAutoRotation();
    });

    carousel.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
    });

    carousel.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          this.nextTestimonial();
        } else {
          this.previousTestimonial();
        }
      }
      
      isDragging = false;
    });
  }

  nextTestimonial() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.updateCarousel();
  }

  previousTestimonial() {
    this.currentIndex = this.currentIndex === 0 ? this.testimonials.length - 1 : this.currentIndex - 1;
    this.updateCarousel();
  }

  goToTestimonial(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }

  updateCarousel() {
    const track = this.container.querySelector('.testimonials-track');
    const indicators = this.container.querySelectorAll('.indicator');
    const slides = this.container.querySelectorAll('.testimonial-slide');

    if (track) {
      track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    // Update active states
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle('active', index === this.currentIndex);
    });

    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === this.currentIndex);
    });
  }

  startAutoRotation() {
    if (this.testimonials.length <= 1) return;
    
    this.pauseAutoRotation(); // Clear any existing interval
    this.autoRotateInterval = setInterval(() => {
      this.nextTestimonial();
    }, this.autoRotateDelay);
  }

  pauseAutoRotation() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
      this.autoRotateInterval = null;
    }
  }

  getAverageRating() {
    if (this.testimonials.length === 0) return 5;
    
    const total = this.testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
    return total / this.testimonials.length;
  }

  renderError() {
    this.container.innerHTML = `
      <div class="testimonials-error">
        <h3>Unable to load testimonials</h3>
        <p>Please refresh the page or contact support if the issue persists.</p>
      </div>
    `;
  }

  renderEmptyState() {
    this.container.innerHTML = `
      <div class="testimonials-empty">
        <h3>Client testimonials coming soon</h3>
        <p>Check back later to see what clients are saying about ${this.artist.name}'s work.</p>
      </div>
    `;
  }

  // Cleanup
  destroy() {
    this.pauseAutoRotation();
    this.initialized = false;
  }

  // Public method to refresh testimonials
  async refresh() {
    this.destroy();
    await this.init();
  }
}

// Auto-initialization for data attributes
document.addEventListener('DOMContentLoaded', () => {
  const testimonialElements = document.querySelectorAll('[data-testimonials]');
  
  testimonialElements.forEach(element => {
    const artistSlug = element.dataset.testimonials;
    if (artistSlug) {
      const testimonials = new Testimonials(element, artistSlug);
      testimonials.init();
    }
  });
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
  const testimonialElements = document.querySelectorAll('[data-testimonials]');
  testimonialElements.forEach(element => {
    if (element.testimonialsComponent) {
      element.testimonialsComponent.destroy();
    }
  });
});