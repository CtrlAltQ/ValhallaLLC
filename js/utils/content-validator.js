/**
 * Content Validation and Optimization Utilities
 * Validates all content, optimizes images, and ensures data integrity
 */

import { artistsData } from '../data/artists.js';
import { blogPosts, studioInfo } from '../data/content.js';

/**
 * Content Validator Class
 */
export class ContentValidator {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.optimizations = [];
  }

  /**
   * Validate artist data structure
   */
  validateArtistData() {
    const requiredFields = ['id', 'slug', 'name', 'specialty', 'experience', 'bio', 'socialMedia', 'portfolio', 'seoData'];
    const requiredPortfolioFields = ['id', 'filename', 'title', 'style', 'placement', 'description', 'tags', 'uploadDate'];
    const requiredSEOFields = ['title', 'description', 'keywords'];

    Object.entries(artistsData).forEach(([slug, artist]) => {
      // Check required fields
      requiredFields.forEach(field => {
        if (!artist[field]) {
          this.errors.push(`Artist ${slug}: Missing required field '${field}'`);
        }
      });

      // Validate slug consistency
      if (artist.slug !== slug) {
        this.errors.push(`Artist ${slug}: Slug mismatch (${artist.slug} !== ${slug})`);
      }

      // Validate portfolio items
      if (artist.portfolio && Array.isArray(artist.portfolio)) {
        artist.portfolio.forEach((item, index) => {
          requiredPortfolioFields.forEach(field => {
            if (!item[field]) {
              this.errors.push(`Artist ${slug}, Portfolio item ${index}: Missing required field '${field}'`);
            }
          });

          // Validate tags array
          if (item.tags && !Array.isArray(item.tags)) {
            this.errors.push(`Artist ${slug}, Portfolio item ${index}: Tags must be an array`);
          }

          // Validate upload date
          if (item.uploadDate && !(item.uploadDate instanceof Date)) {
            this.errors.push(`Artist ${slug}, Portfolio item ${index}: uploadDate must be a Date object`);
          }
        });
      } else {
        this.warnings.push(`Artist ${slug}: Portfolio is empty or not an array`);
      }

      // Validate SEO data
      if (artist.seoData) {
        requiredSEOFields.forEach(field => {
          if (!artist.seoData[field]) {
            this.errors.push(`Artist ${slug}: Missing SEO field '${field}'`);
          }
        });

        // Check SEO title length
        if (artist.seoData.title && artist.seoData.title.length > 60) {
          this.warnings.push(`Artist ${slug}: SEO title too long (${artist.seoData.title.length} chars, max 60)`);
        }

        // Check SEO description length
        if (artist.seoData.description && artist.seoData.description.length > 160) {
          this.warnings.push(`Artist ${slug}: SEO description too long (${artist.seoData.description.length} chars, max 160)`);
        }
      }

      // Check social media links
      if (artist.socialMedia) {
        if (artist.socialMedia.instagram && !artist.socialMedia.instagram.startsWith('@')) {
          this.warnings.push(`Artist ${slug}: Instagram handle should start with @`);
        }
      }
    });
  }

  /**
   * Validate blog content
   */
  validateBlogContent() {
    const requiredFields = ['id', 'title', 'date', 'category', 'excerpt', 'content', 'author'];

    blogPosts.forEach(post => {
      // Check required fields
      requiredFields.forEach(field => {
        if (!post[field]) {
          this.errors.push(`Blog post ${post.id}: Missing required field '${field}'`);
        }
      });

      // Validate date format
      if (post.date && isNaN(Date.parse(post.date))) {
        this.errors.push(`Blog post ${post.id}: Invalid date format '${post.date}'`);
      }

      // Check title length for SEO
      if (post.title && post.title.length > 60) {
        this.warnings.push(`Blog post ${post.id}: Title too long for SEO (${post.title.length} chars, max 60)`);
      }

      // Check excerpt length
      if (post.excerpt && post.excerpt.length > 160) {
        this.warnings.push(`Blog post ${post.id}: Excerpt too long for meta description (${post.excerpt.length} chars, max 160)`);
      }

      // Validate tags
      if (post.tags && !Array.isArray(post.tags)) {
        this.errors.push(`Blog post ${post.id}: Tags must be an array`);
      }

      // Check for duplicate IDs
      const duplicates = blogPosts.filter(p => p.id === post.id);
      if (duplicates.length > 1) {
        this.errors.push(`Blog post ${post.id}: Duplicate ID found`);
      }
    });
  }

  /**
   * Validate studio information
   */
  validateStudioInfo() {
    const requiredFields = ['name', 'address', 'phone', 'email', 'hours', 'socialMedia'];
    const requiredAddressFields = ['street', 'city', 'state', 'zip'];

    requiredFields.forEach(field => {
      if (!studioInfo[field]) {
        this.errors.push(`Studio info: Missing required field '${field}'`);
      }
    });

    // Validate address
    if (studioInfo.address) {
      requiredAddressFields.forEach(field => {
        if (!studioInfo.address[field]) {
          this.errors.push(`Studio address: Missing required field '${field}'`);
        }
      });
    }

    // Validate email format
    if (studioInfo.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(studioInfo.email)) {
        this.errors.push(`Studio info: Invalid email format '${studioInfo.email}'`);
      }
    }

    // Validate phone format
    if (studioInfo.phone) {
      const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$|^\d{3}-\d{3}-\d{4}$/;
      if (!phoneRegex.test(studioInfo.phone)) {
        this.warnings.push(`Studio info: Phone format may not be optimal for display '${studioInfo.phone}'`);
      }
    }
  }

  /**
   * Check for content optimization opportunities
   */
  checkOptimizations() {
    // Check for missing alt text opportunities
    Object.entries(artistsData).forEach(([slug, artist]) => {
      if (artist.portfolio) {
        artist.portfolio.forEach((item, index) => {
          if (!item.description || item.description.length < 20) {
            this.optimizations.push(`Artist ${slug}, Portfolio item ${index}: Description could be more detailed for better SEO`);
          }

          if (!item.tags || item.tags.length < 3) {
            this.optimizations.push(`Artist ${slug}, Portfolio item ${index}: More tags could improve searchability`);
          }
        });
      }
    });

    // Check blog post optimization
    blogPosts.forEach(post => {
      if (!post.tags || post.tags.length < 3) {
        this.optimizations.push(`Blog post ${post.id}: More tags could improve SEO`);
      }

      if (!post.featured && post.category === 'Studio News') {
        this.optimizations.push(`Blog post ${post.id}: Consider featuring important studio news`);
      }
    });
  }

  /**
   * Run complete validation
   */
  validate() {
    this.errors = [];
    this.warnings = [];
    this.optimizations = [];

    this.validateArtistData();
    this.validateBlogContent();
    this.validateStudioInfo();
    this.checkOptimizations();

    return {
      isValid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      optimizations: this.optimizations,
      summary: {
        totalErrors: this.errors.length,
        totalWarnings: this.warnings.length,
        totalOptimizations: this.optimizations.length,
        artists: Object.keys(artistsData).length,
        blogPosts: blogPosts.length
      }
    };
  }

  /**
   * Generate validation report
   */
  generateReport() {
    const validation = this.validate();
    
    console.group('Content Validation Report');
    console.log('Summary:', validation.summary);
    
    if (validation.errors.length > 0) {
      console.group('Errors (Must Fix)');
      validation.errors.forEach(error => console.error(error));
      console.groupEnd();
    }
    
    if (validation.warnings.length > 0) {
      console.group('Warnings (Should Fix)');
      validation.warnings.forEach(warning => console.warn(warning));
      console.groupEnd();
    }
    
    if (validation.optimizations.length > 0) {
      console.group('Optimization Opportunities');
      validation.optimizations.forEach(opt => console.info(opt));
      console.groupEnd();
    }
    
    console.groupEnd();
    
    return validation;
  }
}

/**
 * Image Asset Validator
 */
export class ImageAssetValidator {
  constructor() {
    this.missingImages = [];
    this.optimizationOpportunities = [];
  }

  /**
   * Check if image exists
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
   * Validate portfolio images
   */
  async validatePortfolioImages() {
    for (const [slug, artist] of Object.entries(artistsData)) {
      if (artist.portfolio) {
        for (const item of artist.portfolio) {
          const imagePath = `images/portfolio/${slug}/${item.filename}`;
          const exists = await this.checkImageExists(imagePath);
          
          if (!exists) {
            this.missingImages.push({
              artist: slug,
              filename: item.filename,
              path: imagePath,
              title: item.title
            });
          }

          // Check for WebP optimization opportunity
          const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          const webpExists = await this.checkImageExists(webpPath);
          
          if (exists && !webpExists) {
            this.optimizationOpportunities.push({
              type: 'webp-conversion',
              original: imagePath,
              suggested: webpPath
            });
          }
        }
      }
    }
  }

  /**
   * Validate blog images
   */
  async validateBlogImages() {
    for (const post of blogPosts) {
      if (post.image && !post.image.startsWith('data:')) {
        const imagePath = `images/blog/${post.image}`;
        const exists = await this.checkImageExists(imagePath);
        
        if (!exists) {
          this.missingImages.push({
            type: 'blog',
            postId: post.id,
            filename: post.image,
            path: imagePath,
            title: post.title
          });
        }
      }
    }
  }

  /**
   * Run image validation
   */
  async validate() {
    this.missingImages = [];
    this.optimizationOpportunities = [];

    await this.validatePortfolioImages();
    await this.validateBlogImages();

    return {
      missingImages: this.missingImages,
      optimizationOpportunities: this.optimizationOpportunities,
      summary: {
        totalMissing: this.missingImages.length,
        totalOptimizations: this.optimizationOpportunities.length
      }
    };
  }
}

/**
 * Performance Optimizer
 */
export class PerformanceOptimizer {
  constructor() {
    this.recommendations = [];
  }

  /**
   * Analyze content for performance optimization
   */
  analyzeContent() {
    // Check for large content blocks
    blogPosts.forEach(post => {
      if (post.content && post.content.length > 5000) {
        this.recommendations.push({
          type: 'content-length',
          item: `Blog post ${post.id}`,
          issue: 'Very long content may impact page load',
          suggestion: 'Consider breaking into multiple posts or adding pagination'
        });
      }
    });

    // Check portfolio sizes
    Object.entries(artistsData).forEach(([slug, artist]) => {
      if (artist.portfolio && artist.portfolio.length > 20) {
        this.recommendations.push({
          type: 'portfolio-size',
          item: `Artist ${slug}`,
          issue: `Large portfolio (${artist.portfolio.length} items)`,
          suggestion: 'Consider implementing pagination or lazy loading'
        });
      }
    });

    return this.recommendations;
  }

  /**
   * Generate performance recommendations
   */
  getRecommendations() {
    this.recommendations = [];
    this.analyzeContent();

    return {
      recommendations: this.recommendations,
      summary: {
        totalRecommendations: this.recommendations.length
      }
    };
  }
}

// Auto-run validation on page load (development only)
if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
  document.addEventListener('DOMContentLoaded', () => {
    const validator = new ContentValidator();
    const imageValidator = new ImageAssetValidator();
    const performanceOptimizer = new PerformanceOptimizer();

    // Run validation
    const contentValidation = validator.generateReport();
    const performanceRecommendations = performanceOptimizer.getRecommendations();

    // Store results globally for debugging
    window.contentValidation = contentValidation;
    window.performanceRecommendations = performanceRecommendations;

    // Run image validation asynchronously
    imageValidator.validate().then(imageValidation => {
      window.imageValidation = imageValidation;
      console.log('Image validation completed:', imageValidation);
    });
  });
}

export { ContentValidator, ImageAssetValidator, PerformanceOptimizer };