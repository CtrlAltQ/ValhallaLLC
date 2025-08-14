/**
 * Content Migration Utilities
 * Handles migration and optimization of existing content and assets
 */

import { artistsData } from '../data/artists.js';
import { blogPosts } from '../data/content.js';

/**
 * Portfolio Image Optimization
 */
export class PortfolioOptimizer {
  constructor() {
    this.supportedFormats = ['webp', 'jpg', 'jpeg', 'png'];
    this.targetSizes = {
      thumbnail: { width: 400, height: 300 },
      medium: { width: 800, height: 600 },
      large: { width: 1200, height: 900 }
    };
  }

  /**
   * Check if image exists and is accessible
   */
  async checkImageExists(imagePath) {
    try {
      const response = await fetch(imagePath, { method: 'HEAD' });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  /**
   * Generate optimized image URLs with fallbacks
   */
  generateImageUrls(artistSlug, filename) {
    const basePath = `images/portfolio/${artistSlug}`;
    const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
    
    return {
      webp: `${basePath}/${nameWithoutExt}.webp`,
      original: `${basePath}/${filename}`,
      thumbnail: `${basePath}/thumbs/${filename}`,
      placeholder: this.generatePlaceholder(400, 300, '#2a2a2a')
    };
  }

  /**
   * Generate placeholder image data URL
   */
  generatePlaceholder(width = 400, height = 300, color = '#333') {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
        <rect width="${width}" height="${height}" fill="${color}"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#666" font-family="Arial, sans-serif" font-size="14">
          Portfolio Image
        </text>
      </svg>
    `;
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }

  /**
   * Validate and optimize portfolio images for an artist
   */
  async optimizeArtistPortfolio(artistSlug) {
    const artist = artistsData[artistSlug];
    if (!artist) {
      console.warn(`Artist ${artistSlug} not found`);
      return [];
    }

    const optimizedImages = [];

    for (const image of artist.portfolio) {
      const imageUrls = this.generateImageUrls(artistSlug, image.filename);
      const exists = await this.checkImageExists(imageUrls.original);

      optimizedImages.push({
        ...image,
        src: exists ? imageUrls.original : imageUrls.placeholder,
        webp: exists ? imageUrls.webp : null,
        thumbnail: exists ? imageUrls.thumbnail : imageUrls.placeholder,
        placeholder: imageUrls.placeholder,
        optimized: exists,
        artist: artist.name,
        artistSlug: artistSlug
      });
    }

    return optimizedImages;
  }

  /**
   * Get all optimized portfolio images
   */
  async getAllOptimizedImages() {
    const allImages = [];
    
    for (const artistSlug of Object.keys(artistsData)) {
      const artistImages = await this.optimizeArtistPortfolio(artistSlug);
      allImages.push(...artistImages);
    }

    return allImages.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
  }
}

/**
 * Content Migration Manager
 */
export class ContentMigrator {
  constructor() {
    this.portfolioOptimizer = new PortfolioOptimizer();
  }

  /**
   * Migrate and validate all artist data
   */
  async migrateArtistData() {
    const migrationReport = {
      artists: [],
      totalImages: 0,
      optimizedImages: 0,
      missingImages: 0
    };

    for (const [slug, artist] of Object.entries(artistsData)) {
      const optimizedPortfolio = await this.portfolioOptimizer.optimizeArtistPortfolio(slug);
      
      const artistReport = {
        slug,
        name: artist.name,
        totalImages: optimizedPortfolio.length,
        optimizedImages: optimizedPortfolio.filter(img => img.optimized).length,
        missingImages: optimizedPortfolio.filter(img => !img.optimized).length,
        portfolio: optimizedPortfolio
      };

      migrationReport.artists.push(artistReport);
      migrationReport.totalImages += artistReport.totalImages;
      migrationReport.optimizedImages += artistReport.optimizedImages;
      migrationReport.missingImages += artistReport.missingImages;
    }

    return migrationReport;
  }

  /**
   * Validate blog content and images
   */
  validateBlogContent() {
    const validationReport = {
      totalPosts: blogPosts.length,
      validPosts: 0,
      missingImages: [],
      issues: []
    };

    blogPosts.forEach(post => {
      let isValid = true;

      // Check required fields
      if (!post.title || !post.content || !post.date) {
        validationReport.issues.push(`Post ${post.id}: Missing required fields`);
        isValid = false;
      }

      // Check image exists (if specified)
      if (post.image && !post.image.startsWith('data:')) {
        // Note: We can't easily check file existence in browser context
        // This would be handled by the build process or server
      }

      // Validate date format
      if (post.date && isNaN(Date.parse(post.date))) {
        validationReport.issues.push(`Post ${post.id}: Invalid date format`);
        isValid = false;
      }

      if (isValid) {
        validationReport.validPosts++;
      }
    });

    return validationReport;
  }

  /**
   * Generate SEO-optimized content structure
   */
  generateSEOContent() {
    const seoContent = {
      artists: {},
      blog: {},
      studio: {}
    };

    // Generate artist SEO content
    Object.entries(artistsData).forEach(([slug, artist]) => {
      seoContent.artists[slug] = {
        title: artist.seoData.title,
        description: artist.seoData.description,
        keywords: artist.seoData.keywords,
        structuredData: {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": artist.name,
          "jobTitle": "Tattoo Artist",
          "description": artist.bio,
          "worksFor": {
            "@type": "LocalBusiness",
            "name": "Valhalla Tattoo"
          },
          "url": `https://valhallatattoo.com/portfolio/${slug}.html`
        }
      };
    });

    // Generate blog SEO content
    blogPosts.forEach(post => {
      seoContent.blog[post.id] = {
        title: `${post.title} | Valhalla Tattoo Blog`,
        description: post.excerpt,
        keywords: post.tags,
        structuredData: {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "datePublished": post.date,
          "publisher": {
            "@type": "Organization",
            "name": "Valhalla Tattoo"
          }
        }
      };
    });

    return seoContent;
  }

  /**
   * Run complete content migration
   */
  async runMigration() {
    console.log('Starting content migration...');

    const migrationResults = {
      timestamp: new Date().toISOString(),
      artistData: await this.migrateArtistData(),
      blogContent: this.validateBlogContent(),
      seoContent: this.generateSEOContent()
    };

    console.log('Content migration completed:', migrationResults);
    return migrationResults;
  }
}

/**
 * Image Lazy Loading and Optimization
 */
export class ImageOptimizer {
  constructor() {
    this.observer = null;
    this.imageCache = new Map();
  }

  /**
   * Initialize lazy loading observer
   */
  initLazyLoading() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
    }
  }

  /**
   * Load and optimize image
   */
  async loadImage(img) {
    const src = img.dataset.src;
    const webpSrc = img.dataset.webp;
    
    if (!src) return;

    // Check WebP support and use WebP if available
    const useWebP = webpSrc && this.supportsWebP();
    const imageSrc = useWebP ? webpSrc : src;

    try {
      // Preload image
      const image = new Image();
      image.src = imageSrc;
      
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });

      // Update img element
      img.src = imageSrc;
      img.classList.add('loaded');
      
      // Cache the image
      this.imageCache.set(src, imageSrc);
      
    } catch (error) {
      console.warn(`Failed to load image: ${imageSrc}`, error);
      
      // Fallback to placeholder
      if (img.dataset.placeholder) {
        img.src = img.dataset.placeholder;
      }
    }
  }

  /**
   * Check WebP support
   */
  supportsWebP() {
    if (this.webpSupport !== undefined) {
      return this.webpSupport;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    this.webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    return this.webpSupport;
  }

  /**
   * Observe images for lazy loading
   */
  observeImages(selector = 'img[data-src]') {
    if (!this.observer) {
      this.initLazyLoading();
    }

    const images = document.querySelectorAll(selector);
    images.forEach(img => {
      this.observer.observe(img);
    });
  }

  /**
   * Preload critical images
   */
  preloadCriticalImages(imagePaths) {
    imagePaths.forEach(path => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = path;
      document.head.appendChild(link);
    });
  }
}

// Initialize content migration on page load
document.addEventListener('DOMContentLoaded', async () => {
  const migrator = new ContentMigrator();
  const imageOptimizer = new ImageOptimizer();

  // Run content migration
  try {
    const results = await migrator.runMigration();
    
    // Store results for debugging
    window.migrationResults = results;
    
    // Initialize image optimization
    imageOptimizer.observeImages();
    
    console.log('Content migration and optimization initialized successfully');
  } catch (error) {
    console.error('Content migration failed:', error);
  }
});

export { ContentMigrator, PortfolioOptimizer, ImageOptimizer };