/**
 * Social Links Component
 * Shared component for rendering social media links
 * Used across main site and portfolio pages
 */

export class SocialLinks {
  constructor(container, options = {}) {
    this.container = container;
    this.options = {
      type: 'studio', // 'studio' or 'artist'
      layout: 'horizontal', // 'horizontal' or 'vertical'
      style: 'default', // 'default', 'minimal', 'buttons'
      size: 'medium', // 'small', 'medium', 'large'
      showLabels: true,
      showFollowText: false,
      platforms: ['instagram', 'facebook', 'tiktok'],
      ...options
    };
    
    this.socialData = null;
  }

  /**
   * Initialize social links
   * @param {Object} socialData - Social media data
   */
  init(socialData) {
    this.socialData = socialData;
    this.render();
    this.setupEventListeners();
    
    console.log(`Social links initialized for ${this.options.type}`);
  }

  /**
   * Render social links HTML
   */
  render() {
    if (!this.container || !this.socialData) {
      console.error('Social links container or data not provided');
      return;
    }

    const linksHTML = this.generateLinksHTML();
    const wrapperClass = this.getWrapperClass();
    
    this.container.innerHTML = `
      <div class="${wrapperClass}">
        ${this.options.showFollowText ? `<p class="social-follow-text">Follow Us</p>` : ''}
        <div class="social-links-list" role="list" aria-label="Social media links">
          ${linksHTML}
        </div>
      </div>
    `;
  }

  /**
   * Generate HTML for social links
   * @returns {string} HTML string for social links
   */
  generateLinksHTML() {
    const links = [];
    
    this.options.platforms.forEach(platform => {
      const url = this.getSocialURL(platform);
      if (url) {
        links.push(this.generateLinkHTML(platform, url));
      }
    });
    
    return links.join('');
  }

  /**
   * Generate HTML for individual social link
   * @param {string} platform - Social media platform
   * @param {string} url - Social media URL
   * @returns {string} HTML string for individual link
   */
  generateLinkHTML(platform, url) {
    const icon = this.getSocialIcon(platform);
    const label = this.getSocialLabel(platform);
    const linkClass = this.getLinkClass(platform);
    
    return `
      <div class="social-link-item" role="listitem">
        <a href="${url}" 
           class="${linkClass}" 
           target="_blank" 
           rel="noopener noreferrer"
           aria-label="${label}"
           data-platform="${platform}">
          
          <span class="social-icon" aria-hidden="true">
            ${icon}
          </span>
          
          ${this.options.showLabels ? `
            <span class="social-label">${this.getPlatformDisplayName(platform)}</span>
          ` : ''}
        </a>
      </div>
    `;
  }

  /**
   * Get social media URL for platform
   * @param {string} platform - Platform name
   * @returns {string|null} URL or null if not available
   */
  getSocialURL(platform) {
    if (!this.socialData) return null;
    
    switch (platform) {
      case 'instagram':
        if (this.socialData.instagram) {
          const username = this.socialData.instagram.replace('@', '');
          return `https://www.instagram.com/${username}/`;
        }
        break;
        
      case 'facebook':
        if (this.socialData.facebook) {
          return this.socialData.facebook.startsWith('http') 
            ? this.socialData.facebook 
            : `https://www.facebook.com/${this.socialData.facebook}`;
        }
        break;
        
      case 'tiktok':
        if (this.socialData.tiktok) {
          const username = this.socialData.tiktok.replace('@', '');
          return `https://www.tiktok.com/@${username}`;
        }
        break;
        
      case 'twitter':
        if (this.socialData.twitter) {
          const username = this.socialData.twitter.replace('@', '');
          return `https://twitter.com/${username}`;
        }
        break;
    }
    
    return null;
  }

  /**
   * Get SVG icon for social platform
   * @param {string} platform - Platform name
   * @returns {string} SVG icon HTML
   */
  getSocialIcon(platform) {
    const iconSize = this.getIconSize();
    
    const icons = {
      instagram: `
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      `,
      
      facebook: `
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      `,
      
      tiktok: `
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      `,
      
      twitter: `
        <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      `
    };
    
    return icons[platform] || '';
  }

  /**
   * Get appropriate icon size based on component size setting
   * @returns {number} Icon size in pixels
   */
  getIconSize() {
    switch (this.options.size) {
      case 'small': return 16;
      case 'large': return 32;
      default: return 24;
    }
  }

  /**
   * Get wrapper CSS class based on options
   * @returns {string} CSS class string
   */
  getWrapperClass() {
    const classes = ['social-links-component'];
    
    classes.push(`social-links--${this.options.layout}`);
    classes.push(`social-links--${this.options.style}`);
    classes.push(`social-links--${this.options.size}`);
    
    if (this.options.showLabels) {
      classes.push('social-links--with-labels');
    }
    
    return classes.join(' ');
  }

  /**
   * Get link CSS class for specific platform
   * @param {string} platform - Platform name
   * @returns {string} CSS class string
   */
  getLinkClass(platform) {
    const classes = ['social-link'];
    classes.push(`social-link--${platform}`);
    
    return classes.join(' ');
  }

  /**
   * Get accessibility label for platform
   * @param {string} platform - Platform name
   * @returns {string} Accessibility label
   */
  getSocialLabel(platform) {
    const type = this.options.type === 'artist' ? 'artist' : 'Valhalla Tattoo';
    const platformName = this.getPlatformDisplayName(platform);
    
    return `Follow ${type} on ${platformName}`;
  }

  /**
   * Get display name for platform
   * @param {string} platform - Platform name
   * @returns {string} Display name
   */
  getPlatformDisplayName(platform) {
    const names = {
      instagram: 'Instagram',
      facebook: 'Facebook',
      tiktok: 'TikTok',
      twitter: 'Twitter'
    };
    
    return names[platform] || platform;
  }

  /**
   * Setup event listeners for analytics tracking
   */
  setupEventListeners() {
    if (!this.container) return;
    
    this.container.addEventListener('click', (e) => {
      const link = e.target.closest('.social-link');
      if (link) {
        const platform = link.getAttribute('data-platform');
        this.trackSocialClick(platform, link.href);
      }
    });
  }

  /**
   * Track social media click for analytics
   * @param {string} platform - Platform clicked
   * @param {string} url - URL clicked
   */
  trackSocialClick(platform, url) {
    // Integration with analytics system
    if (window.ValhallaTattoo && window.ValhallaTattoo.getAnalytics) {
      const analytics = window.ValhallaTattoo.getAnalytics();
      const source = this.options.type === 'artist' ? 'artist_page' : 'main_site';
      
      analytics.trackSocialClick(platform, source);
    }
    
    console.log(`Social click tracked: ${platform} from ${this.options.type}`);
  }

  /**
   * Update social links with new data
   * @param {Object} newSocialData - New social media data
   */
  update(newSocialData) {
    this.socialData = newSocialData;
    this.render();
    this.setupEventListeners();
  }

  /**
   * Destroy component and clean up
   */
  destroy() {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

export default SocialLinks;