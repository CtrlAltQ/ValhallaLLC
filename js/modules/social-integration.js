/**
 * Social Media Integration Module
 * Coordinates social media components and data
 */

import { SocialMediaManager } from './social.js';
import InstagramFeed from '../../components/social/instagram-feed.js';
import SocialLinks from '../../components/social/social-links.js';
import { socialConfig } from '../config/social.js';

export class SocialIntegration {
  constructor() {
    this.socialManager = null;
    this.instagramFeeds = new Map();
    this.socialLinks = new Map();
    this.initialized = false;
  }

  /**
   * Initialize social media integration
   */
  async init() {
    if (this.initialized) return;

    try {
      // Initialize social media manager
      this.socialManager = new SocialMediaManager();
      await this.socialManager.init(socialConfig);

      // Auto-discover and initialize components
      this.initializeInstagramFeeds();
      this.initializeSocialLinks();

      // Set up global event listeners
      this.setupEventListeners();

      // Load initial Instagram content
      await this.loadInstagramContent();

      this.initialized = true;
      console.log('Social media integration initialized');

    } catch (error) {
      console.error('Failed to initialize social media integration:', error);
    }
  }

  /**
   * Initialize Instagram feed components
   */
  initializeInstagramFeeds() {
    const feedContainers = document.querySelectorAll('[data-instagram-feed]');
    
    feedContainers.forEach((container, index) => {
      const options = this.parseDataAttributes(container, 'instagram-feed');
      const feedId = container.dataset.instagramFeed || `feed-${index}`;
      
      const feed = new InstagramFeed(container, options);
      this.instagramFeeds.set(feedId, feed);
      
      console.log(`Instagram feed initialized: ${feedId}`);
    });
  }

  /**
   * Initialize social links components
   */
  initializeSocialLinks() {
    const linkContainers = document.querySelectorAll('[data-social-links]');
    
    linkContainers.forEach((container, index) => {
      const options = this.parseDataAttributes(container, 'social-links');
      const linksId = container.dataset.socialLinks || `links-${index}`;
      
      const links = new SocialLinks(container, options);
      this.socialLinks.set(linksId, links);
      
      console.log(`Social links initialized: ${linksId}`);
    });
  }

  /**
   * Parse data attributes for component options
   * @param {Element} element - DOM element
   * @param {string} prefix - Attribute prefix
   * @returns {Object} Parsed options
   */
  parseDataAttributes(element, prefix) {
    const options = {};
    const dataset = element.dataset;
    
    Object.keys(dataset).forEach(key => {
      if (key.startsWith(prefix)) {
        const optionKey = key.replace(prefix, '').replace(/([A-Z])/g, '-$1').toLowerCase();
        let value = dataset[key];
        
        // Try to parse as JSON, number, or boolean
        if (value === 'true') value = true;
        else if (value === 'false') value = false;
        else if (!isNaN(value) && value !== '') value = Number(value);
        else if (value.startsWith('[') || value.startsWith('{')) {
          try {
            value = JSON.parse(value);
          } catch (e) {
            // Keep as string if JSON parsing fails
          }
        }
        
        options[optionKey] = value;
      }
    });
    
    return options;
  }

  /**
   * Set up global event listeners
   */
  setupEventListeners() {
    // Listen for Instagram content updates
    document.addEventListener('valhalla:instagram-updated', (event) => {
      this.updateAllInstagramFeeds(event.detail.posts);
    });

    // Listen for social link clicks for analytics
    document.addEventListener('valhalla:social-click', (event) => {
      this.trackSocialInteraction(event.detail);
    });

    // Handle page visibility changes to pause/resume updates
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseUpdates();
      } else {
        this.resumeUpdates();
      }
    });
  }

  /**
   * Load Instagram content
   */
  async loadInstagramContent() {
    if (!this.socialManager) return;

    try {
      // Show loading state on all feeds
      this.instagramFeeds.forEach(feed => feed.showLoading());

      // Fetch Instagram posts
      const posts = await this.socialManager.getPosts();
      
      // Update all Instagram feeds
      this.updateAllInstagramFeeds(posts);

    } catch (error) {
      console.error('Failed to load Instagram content:', error);
      
      // Hide loading state and show fallback
      this.instagramFeeds.forEach(feed => {
        feed.hideLoading();
        feed.render([]); // This will show fallback content
      });
    }
  }

  /**
   * Update all Instagram feeds with new posts
   * @param {Array} posts - Instagram posts
   */
  updateAllInstagramFeeds(posts) {
    this.instagramFeeds.forEach(feed => {
      feed.hideLoading();
      feed.render(posts);
    });
  }

  /**
   * Refresh Instagram content
   */
  async refreshInstagramContent() {
    if (!this.socialManager) return;

    try {
      const posts = await this.socialManager.getPosts(true); // Force refresh
      this.updateAllInstagramFeeds(posts);
      
      console.log('Instagram content refreshed');
    } catch (error) {
      console.error('Failed to refresh Instagram content:', error);
    }
  }

  /**
   * Track social media interactions
   * @param {Object} detail - Interaction details
   */
  trackSocialInteraction(detail) {
    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'social_click', {
        social_network: detail.platform,
        social_action: 'click',
        social_target: detail.type === 'artist' ? detail.artistSlug : 'studio'
      });
    }

    // Custom analytics tracking
    console.log('Social interaction tracked:', detail);
  }

  /**
   * Pause automatic updates
   */
  pauseUpdates() {
    if (this.socialManager) {
      // Implementation would depend on social manager's pause functionality
      console.log('Social media updates paused');
    }
  }

  /**
   * Resume automatic updates
   */
  resumeUpdates() {
    if (this.socialManager) {
      // Implementation would depend on social manager's resume functionality
      console.log('Social media updates resumed');
    }
  }

  /**
   * Add Instagram feed programmatically
   * @param {string|Element} container - Container element or selector
   * @param {Object} options - Feed options
   * @param {string} id - Feed ID
   * @returns {InstagramFeed} Created feed instance
   */
  addInstagramFeed(container, options = {}, id = null) {
    const feedId = id || `feed-${Date.now()}`;
    const feed = new InstagramFeed(container, options);
    
    this.instagramFeeds.set(feedId, feed);
    
    // Load current posts if available
    if (this.socialManager) {
      this.socialManager.getPosts().then(posts => {
        feed.render(posts);
      }).catch(error => {
        console.error('Failed to load posts for new feed:', error);
        feed.render([]);
      });
    }
    
    return feed;
  }

  /**
   * Add social links programmatically
   * @param {string|Element} container - Container element or selector
   * @param {Object} options - Links options
   * @param {string} id - Links ID
   * @returns {SocialLinks} Created links instance
   */
  addSocialLinks(container, options = {}, id = null) {
    const linksId = id || `links-${Date.now()}`;
    const links = new SocialLinks(container, options);
    
    this.socialLinks.set(linksId, links);
    
    return links;
  }

  /**
   * Remove Instagram feed
   * @param {string} id - Feed ID
   */
  removeInstagramFeed(id) {
    const feed = this.instagramFeeds.get(id);
    if (feed) {
      feed.destroy();
      this.instagramFeeds.delete(id);
    }
  }

  /**
   * Remove social links
   * @param {string} id - Links ID
   */
  removeSocialLinks(id) {
    const links = this.socialLinks.get(id);
    if (links) {
      links.destroy();
      this.socialLinks.delete(id);
    }
  }

  /**
   * Get Instagram feed by ID
   * @param {string} id - Feed ID
   * @returns {InstagramFeed|null} Feed instance
   */
  getInstagramFeed(id) {
    return this.instagramFeeds.get(id) || null;
  }

  /**
   * Get social links by ID
   * @param {string} id - Links ID
   * @returns {SocialLinks|null} Links instance
   */
  getSocialLinks(id) {
    return this.socialLinks.get(id) || null;
  }

  /**
   * Get social media manager
   * @returns {SocialMediaManager} Social media manager instance
   */
  getSocialManager() {
    return this.socialManager;
  }

  /**
   * Set Instagram credentials
   * @param {string} accessToken - Access token
   * @param {string} userId - User ID
   */
  setInstagramCredentials(accessToken, userId) {
    if (this.socialManager) {
      this.socialManager.setInstagramCredentials(accessToken, userId);
    }
  }

  /**
   * Clear Instagram cache
   */
  clearInstagramCache() {
    if (this.socialManager) {
      this.socialManager.clearCache();
    }
  }

  /**
   * Get current Instagram posts
   * @returns {Promise<Array>} Instagram posts
   */
  async getInstagramPosts() {
    if (!this.socialManager) return [];
    return await this.socialManager.getPosts();
  }

  /**
   * Destroy the integration
   */
  destroy() {
    // Destroy all Instagram feeds
    this.instagramFeeds.forEach(feed => feed.destroy());
    this.instagramFeeds.clear();

    // Destroy all social links
    this.socialLinks.forEach(links => links.destroy());
    this.socialLinks.clear();

    // Remove event listeners
    document.removeEventListener('valhalla:instagram-updated', this.updateAllInstagramFeeds);
    document.removeEventListener('valhalla:social-click', this.trackSocialInteraction);

    this.initialized = false;
    console.log('Social media integration destroyed');
  }
}

export default SocialIntegration;