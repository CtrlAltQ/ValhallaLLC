/**
 * URL Utilities
 * Handles URL parsing and routing for portfolio pages
 */

export class URLUtils {
  /**
   * Get artist slug from current URL path
   * @returns {string|null} Artist slug or null if not found
   */
  static getArtistSlugFromURL() {
    const path = window.location.pathname;
    const segments = path.split('/');
    const filename = segments[segments.length - 1];
    
    // Remove .html extension if present
    const slug = filename.replace('.html', '');
    
    // Validate it's a proper artist slug (not empty, not index)
    if (slug && slug !== 'index' && !slug.includes('.')) {
      return slug;
    }
    
    return null;
  }

  /**
   * Get full URL for artist portfolio page
   * @param {string} artistSlug - Artist slug
   * @returns {string} Full URL to artist portfolio
   */
  static getArtistPortfolioURL(artistSlug) {
    const baseUrl = window.location.origin;
    return `${baseUrl}/portfolio/${artistSlug}.html`;
  }

  /**
   * Update browser URL without page reload
   * @param {string} artistSlug - Artist slug
   * @param {string} title - Page title for history
   */
  static updateURL(artistSlug, title) {
    const newUrl = this.getArtistPortfolioURL(artistSlug);
    window.history.pushState({ artist: artistSlug }, title, newUrl);
  }

  /**
   * Get query parameters from URL
   * @returns {Object} Object with query parameters
   */
  static getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    
    return result;
  }

  /**
   * Validate artist slug format
   * @param {string} slug - Artist slug to validate
   * @returns {boolean} Whether slug is valid
   */
  static isValidArtistSlug(slug) {
    if (!slug || typeof slug !== 'string') return false;
    
    // Must be lowercase alphanumeric with optional hyphens
    const validSlugPattern = /^[a-z0-9-]+$/;
    return validSlugPattern.test(slug) && slug.length > 0 && slug.length <= 50;
  }
}

export default URLUtils;