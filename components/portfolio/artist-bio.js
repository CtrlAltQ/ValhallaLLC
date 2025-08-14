/**
 * Artist Bio Component
 * Displays extended artist biography, specialty, and experience information
 */

import { getArtistBySlug } from '../../js/data/artists.js';

export class ArtistBio {
  constructor(container, artistSlug) {
    this.container = container;
    this.artistSlug = artistSlug;
    this.artist = null;
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

      this.render();
      this.initialized = true;
      
      console.log(`Artist bio initialized for: ${this.artist.name}`);
    } catch (error) {
      console.error('Error initializing artist bio:', error);
      this.renderError();
    }
  }

  render() {
    const bioHTML = `
      <div class="artist-bio-container">
        <header class="artist-bio-header">
          <div class="artist-bio-title">
            <h2>About ${this.artist.name}</h2>
            <p class="artist-specialty-badge">${this.artist.specialty}</p>
          </div>
          <div class="artist-experience">
            <span class="experience-badge">${this.artist.experience} Experience</span>
          </div>
        </header>
        
        <div class="artist-bio-content">
          <div class="bio-text">
            ${this.formatBiography(this.artist.extendedBio)}
          </div>
          
          <div class="artist-highlights">
            <div class="highlight-item">
              <h4>Specialty Focus</h4>
              <p>${this.artist.specialty}</p>
            </div>
            <div class="highlight-item">
              <h4>Experience</h4>
              <p>${this.artist.experience}</p>
            </div>
            <div class="highlight-item">
              <h4>Signature Style</h4>
              <p>${this.getSignatureStyleDescription()}</p>
            </div>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = bioHTML;
    this.addInteractions();
  }

  formatBiography(bio) {
    // Split by double line breaks and wrap each paragraph
    const paragraphs = bio.split('\\n\\n');
    return paragraphs
      .map(paragraph => `<p>${paragraph.trim()}</p>`)
      .join('');
  }

  getSignatureStyleDescription() {
    const styleDescriptions = {
      pagan: 'Bold traditional designs with vibrant colors that stand the test of time',
      jimmy: 'Photorealistic portraits and detailed black & grey compositions',
      micah: 'Mathematical precision meets minimalist aesthetics in fine line work',
      sarah: 'Watercolor techniques that create paintings on skin with flowing colors',
      kason: 'Traditional Japanese artistry with deep cultural respect and authenticity',
      heather: 'Typography and ornamental designs that transform words into art'
    };

    return styleDescriptions[this.artistSlug] || 'Unique artistic vision and technical excellence';
  }

  addInteractions() {
    // Add smooth reveal animation
    const bioContainer = this.container.querySelector('.artist-bio-container');
    if (bioContainer) {
      bioContainer.classList.add('animate-in');
      
      // Animate highlights on scroll
      const highlights = this.container.querySelectorAll('.highlight-item');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, index * 100);
          }
        });
      }, { threshold: 0.3 });

      highlights.forEach(highlight => observer.observe(highlight));
    }
  }

  renderError() {
    this.container.innerHTML = `
      <div class="artist-bio-error">
        <h3>Unable to load artist information</h3>
        <p>Please refresh the page or contact support if the issue persists.</p>
      </div>
    `;
  }

  // Public method to refresh bio data
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
  const bioElements = document.querySelectorAll('[data-artist-bio]');
  
  bioElements.forEach(element => {
    const artistSlug = element.dataset.artistBio;
    if (artistSlug) {
      const bio = new ArtistBio(element, artistSlug);
      bio.init();
    }
  });
});