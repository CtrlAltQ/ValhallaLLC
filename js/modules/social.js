/**
 * Social Media Integration Module
 * Handles Instagram Graph API integration and social media display
 */

export class SocialMediaManager {
  constructor() {
    this.config = {
      instagram: {
        accessToken: null, // Will be set via environment or config
        userId: null, // Will be set via environment or config
        apiUrl: 'https://graph.instagram.com',
        fields: 'id,caption,media_type,media_url,permalink,timestamp,thumbnail_url',
        limit: 12,
        cacheKey: 'valhalla_instagram_cache',
        cacheExpiry: 3600000 // 1 hour in milliseconds
      },
      fallback: {
        enabled: true,
        content: []
      }
    };
    
    this.cache = new Map();
    this.initialized = false;
  }

  /**
   * Initialize the social media manager
   * @param {Object} options - Configuration options
   */
  async init(options = {}) {
    if (this.initialized) return;

    // Merge configuration
    this.config = { ...this.config, ...options };
    
    // Load cached data
    this.loadFromCache();
    
    // Set up automatic refresh
    this.setupAutoRefresh();
    
    this.initialized = true;
    console.log('Social Media Manager initialized');
  }

  /**
   * Set Instagram API credentials
   * @param {string} accessToken - Instagram Graph API access token
   * @param {string} userId - Instagram user ID
   */
  setInstagramCredentials(accessToken, userId) {
    this.config.instagram.accessToken = accessToken;
    this.config.instagram.userId = userId;
  }

  /**
   * Fetch Instagram posts from Graph API
   * @returns {Promise<Array>} Array of Instagram posts
   */
  async fetchInstagramPosts() {
    const { accessToken, userId, apiUrl, fields, limit } = this.config.instagram;
    
    if (!accessToken || !userId) {
      console.warn('Instagram credentials not configured, using fallback content');
      return this.getFallbackContent();
    }

    try {
      const url = `${apiUrl}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Instagram API error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`Instagram API error: ${data.error.message}`);
      }
      
      const posts = this.processInstagramData(data.data || []);
      
      // Cache the results
      this.cacheData('instagram_posts', posts);
      
      console.log(`Fetched ${posts.length} Instagram posts`);
      return posts;
      
    } catch (error) {
      console.error('Failed to fetch Instagram posts:', error);
      
      // Try to return cached data
      const cachedPosts = this.getCachedData('instagram_posts');
      if (cachedPosts && cachedPosts.length > 0) {
        console.log('Using cached Instagram posts');
        return cachedPosts;
      }
      
      // Fall back to manual content
      return this.getFallbackContent();
    }
  }

  /**
   * Process raw Instagram API data
   * @param {Array} rawData - Raw data from Instagram API
   * @returns {Array} Processed Instagram posts
   */
  processInstagramData(rawData) {
    return rawData.map(post => ({
      id: post.id,
      type: post.media_type?.toLowerCase() || 'image',
      caption: this.truncateCaption(post.caption || ''),
      fullCaption: post.caption || '',
      mediaUrl: post.media_url,
      thumbnailUrl: post.thumbnail_url || post.media_url,
      permalink: post.permalink,
      timestamp: new Date(post.timestamp),
      isVideo: post.media_type === 'VIDEO',
      isCarousel: post.media_type === 'CAROUSEL_ALBUM'
    }));
  }

  /**
   * Truncate Instagram caption for display
   * @param {string} caption - Full caption text
   * @param {number} maxLength - Maximum length
   * @returns {string} Truncated caption
   */
  truncateCaption(caption, maxLength = 100) {
    if (caption.length <= maxLength) return caption;
    
    const truncated = caption.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    
    return lastSpace > 0 
      ? truncated.substring(0, lastSpace) + '...'
      : truncated + '...';
  }

  /**
   * Get fallback content when Instagram API is unavailable
   * @returns {Array} Fallback social media content
   */
  getFallbackContent() {
    return [
      {
        id: 'fallback_1',
        type: 'image',
        caption: 'Check out our latest work on Instagram!',
        fullCaption: 'Follow us on Instagram @valhallatattoo for the latest updates and portfolio pieces.',
        mediaUrl: '/images/gallery/jimmy.jpg',
        thumbnailUrl: '/images/gallery/jimmy.jpg',
        permalink: 'https://instagram.com/valhallatattoo',
        timestamp: new Date(),
        isVideo: false,
        isCarousel: false,
        isFallback: true
      },
      {
        id: 'fallback_2',
        type: 'image',
        caption: 'Amazing traditional piece by our artists!',
        fullCaption: 'Traditional tattoo work by our talented artists. Book your consultation today!',
        mediaUrl: '/images/gallery/sarah.jpg',
        thumbnailUrl: '/images/gallery/sarah.jpg',
        permalink: 'https://instagram.com/valhallatattoo',
        timestamp: new Date(),
        isVideo: false,
        isCarousel: false,
        isFallback: true
      },
      {
        id: 'fallback_3',
        type: 'image',
        caption: 'Beautiful realism work in progress...',
        fullCaption: 'Photorealistic tattoo work by our skilled artists. Contact us for your custom piece.',
        mediaUrl: '/images/gallery/micah.jpg',
        thumbnailUrl: '/images/gallery/micah.jpg',
        permalink: 'https://instagram.com/valhallatattoo',
        timestamp: new Date(),
        isVideo: false,
        isCarousel: false,
        isFallback: true
      }
    ];
  }

  /**
   * Cache data with expiry
   * @param {string} key - Cache key
   * @param {any} data - Data to cache
   */
  cacheData(key, data) {
    const cacheEntry = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + this.config.instagram.cacheExpiry
    };
    
    this.cache.set(key, cacheEntry);
    
    // Also store in localStorage for persistence
    try {
      localStorage.setItem(
        `${this.config.instagram.cacheKey}_${key}`,
        JSON.stringify(cacheEntry)
      );
    } catch (error) {
      console.warn('Failed to cache data in localStorage:', error);
    }
  }

  /**
   * Get cached data if not expired
   * @param {string} key - Cache key
   * @returns {any|null} Cached data or null if expired/not found
   */
  getCachedData(key) {
    // Check memory cache first
    const memoryCache = this.cache.get(key);
    if (memoryCache && memoryCache.expiry > Date.now()) {
      return memoryCache.data;
    }

    // Check localStorage cache
    try {
      const stored = localStorage.getItem(`${this.config.instagram.cacheKey}_${key}`);
      if (stored) {
        const cacheEntry = JSON.parse(stored);
        if (cacheEntry.expiry > Date.now()) {
          // Restore to memory cache
          this.cache.set(key, cacheEntry);
          return cacheEntry.data;
        } else {
          // Remove expired cache
          localStorage.removeItem(`${this.config.instagram.cacheKey}_${key}`);
        }
      }
    } catch (error) {
      console.warn('Failed to read cache from localStorage:', error);
    }

    return null;
  }

  /**
   * Load cached data on initialization
   */
  loadFromCache() {
    const cachedPosts = this.getCachedData('instagram_posts');
    if (cachedPosts) {
      console.log('Loaded cached Instagram posts');
    }
  }

  /**
   * Set up automatic content refresh
   */
  setupAutoRefresh() {
    // Refresh every hour
    setInterval(() => {
      this.refreshContent();
    }, this.config.instagram.cacheExpiry);
  }

  /**
   * Refresh Instagram content
   */
  async refreshContent() {
    try {
      console.log('Refreshing Instagram content...');
      const posts = await this.fetchInstagramPosts();
      
      // Dispatch event for UI updates
      document.dispatchEvent(new CustomEvent('valhalla:instagram-updated', {
        detail: { posts }
      }));
      
    } catch (error) {
      console.error('Failed to refresh Instagram content:', error);
    }
  }

  /**
   * Get Instagram posts (cached or fresh)
   * @param {boolean} forceRefresh - Force fetch from API
   * @returns {Promise<Array>} Instagram posts
   */
  async getPosts(forceRefresh = false) {
    if (!forceRefresh) {
      const cachedPosts = this.getCachedData('instagram_posts');
      if (cachedPosts && cachedPosts.length > 0) {
        return cachedPosts;
      }
    }
    
    return await this.fetchInstagramPosts();
  }

  /**
   * Clear all cached data
   */
  clearCache() {
    this.cache.clear();
    
    // Clear localStorage cache
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.config.instagram.cacheKey)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear localStorage cache:', error);
    }
    
    console.log('Social media cache cleared');
  }
}

export default SocialMediaManager;