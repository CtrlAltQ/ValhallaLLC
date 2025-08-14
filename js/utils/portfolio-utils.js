/**
 * Portfolio Utilities
 * Helper functions for portfolio data management and validation
 */

/**
 * Image loading utilities
 */
export class ImageLoader {
  constructor() {
    this.loadedImages = new Set();
    this.failedImages = new Set();
  }

  async loadImage(src) {
    if (this.loadedImages.has(src)) {
      return Promise.resolve(src);
    }

    if (this.failedImages.has(src)) {
      return Promise.reject(new Error(`Image previously failed to load: ${src}`));
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.loadedImages.add(src);
        resolve(src);
      };
      
      img.onerror = () => {
        this.failedImages.add(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      
      img.src = src;
    });
  }

  async loadImages(sources) {
    const promises = sources.map(src => this.loadImage(src));
    return Promise.allSettled(promises);
  }

  isLoaded(src) {
    return this.loadedImages.has(src);
  }

  hasFailed(src) {
    return this.failedImages.has(src);
  }

  clearCache() {
    this.loadedImages.clear();
    this.failedImages.clear();
  }
}

/**
 * Portfolio data formatters
 */
export function formatPortfolioForGallery(portfolioImages) {
  return portfolioImages.map(image => ({
    ...image,
    // Ensure all required properties exist
    title: image.title || 'Untitled',
    description: image.description || '',
    style: image.style || 'Mixed',
    tags: Array.isArray(image.tags) ? image.tags : [],
    // Add gallery-specific properties
    aspectRatio: calculateAspectRatio(image),
    displayTitle: formatDisplayTitle(image),
    displayInfo: formatDisplayInfo(image)
  }));
}

function calculateAspectRatio(image) {
  // Default aspect ratio - could be enhanced with actual image dimensions
  return image.aspectRatio || 0.75; // 3:4 ratio
}

function formatDisplayTitle(image) {
  return image.title || `${image.style} Tattoo`;
}

function formatDisplayInfo(image) {
  const info = [];
  if (image.style) info.push(image.style);
  if (image.placement) info.push(image.placement);
  if (image.sessionTime) info.push(image.sessionTime);
  return info.join(' • ');
}

/**
 * URL and routing utilities
 */
export function generateArtistURL(artistSlug) {
  return `portfolio/${artistSlug}.html`;
}

export function generateImageURL(artistSlug, filename) {
  return `images/portfolio/${artistSlug}/${filename}`;
}

export function generateThumbnailURL(artistSlug, filename) {
  // For now, use the same image - could be optimized thumbnails later
  return generateImageURL(artistSlug, filename);
}

/**
 * SEO and meta data utilities
 */
export function generateImageAlt(image, artistName) {
  const parts = [];
  if (image.title) parts.push(image.title);
  if (image.style) parts.push(image.style);
  parts.push('tattoo');
  if (artistName) parts.push(`by ${artistName}`);
  return parts.join(' ');
}

export function generateImageCaption(image, artistName) {
  const parts = [];
  if (image.title) parts.push(image.title);
  if (image.description) parts.push(image.description);
  if (artistName) parts.push(`Artist: ${artistName}`);
  return parts.join(' - ');
}

/**
 * Performance utilities
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Local storage utilities for caching
 */
export class PortfolioStorage {
  constructor(prefix = 'valhalla_portfolio_') {
    this.prefix = prefix;
  }

  set(key, data, expiry = null) {
    const item = {
      data,
      timestamp: Date.now(),
      expiry
    };
    
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  get(key) {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (!item) return null;

      const parsed = JSON.parse(item);
      
      // Check if expired
      if (parsed.expiry && Date.now() > parsed.expiry) {
        this.remove(key);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return null;
    }
  }

  remove(key) {
    try {
      localStorage.removeItem(this.prefix + key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }

  clear() {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }
}

/**
 * Error handling utilities
 */
export function handleImageError(img, fallbackSrc = null) {
  if (fallbackSrc && img.src !== fallbackSrc) {
    img.src = fallbackSrc;
  } else {
    // Create a placeholder
    img.src = generatePlaceholder(400, 300, '#333');
    img.classList.add('image-error');
  }
}

export function generatePlaceholder(width = 400, height = 300, color = '#333') {
  return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3Crect width="${width}" height="${height}" fill="${color}"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-size="16"%3EImage%3C/text%3E%3C/svg%3E`;
}

// Create global instances
export const imageLoader = new ImageLoader();
export const portfolioStorage = new PortfolioStorage();