/**
 * Instagram Graph API Utilities
 * Helper functions for Instagram API integration
 */

/**
 * Instagram API Error Types
 */
export const InstagramErrorTypes = {
  INVALID_TOKEN: 'invalid_token',
  RATE_LIMITED: 'rate_limited',
  NETWORK_ERROR: 'network_error',
  INVALID_USER: 'invalid_user',
  PERMISSIONS_ERROR: 'permissions_error',
  UNKNOWN_ERROR: 'unknown_error'
};

/**
 * Parse Instagram API error response
 * @param {Response} response - Fetch response object
 * @param {Object} data - Response data
 * @returns {Object} Parsed error information
 */
export function parseInstagramError(response, data) {
  const error = {
    type: InstagramErrorTypes.UNKNOWN_ERROR,
    message: 'Unknown error occurred',
    code: response.status,
    retryable: false
  };

  if (data && data.error) {
    const apiError = data.error;
    
    switch (apiError.code) {
      case 190: // Invalid access token
        error.type = InstagramErrorTypes.INVALID_TOKEN;
        error.message = 'Instagram access token is invalid or expired';
        error.retryable = false;
        break;
        
      case 4: // Rate limited
        error.type = InstagramErrorTypes.RATE_LIMITED;
        error.message = 'Instagram API rate limit exceeded';
        error.retryable = true;
        break;
        
      case 100: // Invalid parameter
        if (apiError.error_subcode === 33) {
          error.type = InstagramErrorTypes.INVALID_USER;
          error.message = 'Instagram user ID is invalid';
          error.retryable = false;
        }
        break;
        
      case 10: // Permissions error
        error.type = InstagramErrorTypes.PERMISSIONS_ERROR;
        error.message = 'Insufficient permissions for Instagram API';
        error.retryable = false;
        break;
    }
    
    if (apiError.message) {
      error.message = apiError.message;
    }
  } else if (response.status >= 500) {
    error.type = InstagramErrorTypes.NETWORK_ERROR;
    error.message = 'Instagram API server error';
    error.retryable = true;
  } else if (response.status === 429) {
    error.type = InstagramErrorTypes.RATE_LIMITED;
    error.message = 'Too many requests to Instagram API';
    error.retryable = true;
  }

  return error;
}

/**
 * Validate Instagram access token format
 * @param {string} token - Access token to validate
 * @returns {boolean} True if token format is valid
 */
export function validateAccessToken(token) {
  if (!token || typeof token !== 'string') {
    return false;
  }
  
  // Instagram access tokens are typically long alphanumeric strings
  // This is a basic format check, not a validity check
  return token.length > 50 && /^[A-Za-z0-9_-]+$/.test(token);
}

/**
 * Validate Instagram user ID format
 * @param {string} userId - User ID to validate
 * @returns {boolean} True if user ID format is valid
 */
export function validateUserId(userId) {
  if (!userId || typeof userId !== 'string') {
    return false;
  }
  
  // Instagram user IDs are numeric strings
  return /^\d+$/.test(userId);
}

/**
 * Build Instagram Graph API URL
 * @param {string} userId - Instagram user ID
 * @param {string} endpoint - API endpoint (e.g., 'media')
 * @param {Object} params - Query parameters
 * @returns {string} Complete API URL
 */
export function buildInstagramApiUrl(userId, endpoint = 'media', params = {}) {
  const baseUrl = 'https://graph.instagram.com';
  const url = new URL(`${baseUrl}/${userId}/${endpoint}`);
  
  // Add query parameters
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.append(key, value.toString());
    }
  });
  
  return url.toString();
}

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxRetries - Maximum number of retries
 * @param {number} baseDelay - Base delay in milliseconds
 * @returns {Promise} Promise that resolves with function result
 */
export async function retryWithBackoff(fn, maxRetries = 3, baseDelay = 1000) {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // Don't retry on non-retryable errors
      if (error.retryable === false || attempt === maxRetries) {
        throw error;
      }
      
      // Calculate delay with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      console.log(`Instagram API attempt ${attempt + 1} failed, retrying in ${delay}ms...`);
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
}

/**
 * Format Instagram timestamp for display
 * @param {string} timestamp - ISO timestamp from Instagram API
 * @returns {string} Formatted date string
 */
export function formatInstagramDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffMs / (1000 * 60));
      return diffMinutes <= 1 ? 'Just now' : `${diffMinutes}m ago`;
    }
    return `${diffHours}h ago`;
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else if (diffDays < 30) {
    const diffWeeks = Math.floor(diffDays / 7);
    return `${diffWeeks}w ago`;
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }
}

/**
 * Extract hashtags from Instagram caption
 * @param {string} caption - Instagram post caption
 * @returns {Array<string>} Array of hashtags
 */
export function extractHashtags(caption) {
  if (!caption) return [];
  
  const hashtagRegex = /#[\w\u0590-\u05ff]+/g;
  const matches = caption.match(hashtagRegex);
  
  return matches ? matches.map(tag => tag.toLowerCase()) : [];
}

/**
 * Extract mentions from Instagram caption
 * @param {string} caption - Instagram post caption
 * @returns {Array<string>} Array of mentions
 */
export function extractMentions(caption) {
  if (!caption) return [];
  
  const mentionRegex = /@[\w.]+/g;
  const matches = caption.match(mentionRegex);
  
  return matches ? matches.map(mention => mention.toLowerCase()) : [];
}

/**
 * Clean Instagram caption for display
 * @param {string} caption - Raw Instagram caption
 * @param {Object} options - Cleaning options
 * @returns {string} Cleaned caption
 */
export function cleanInstagramCaption(caption, options = {}) {
  if (!caption) return '';
  
  const {
    removeHashtags = false,
    removeMentions = false,
    maxLength = null,
    preserveLineBreaks = true
  } = options;
  
  let cleaned = caption;
  
  // Remove hashtags if requested
  if (removeHashtags) {
    cleaned = cleaned.replace(/#[\w\u0590-\u05ff]+/g, '').trim();
  }
  
  // Remove mentions if requested
  if (removeMentions) {
    cleaned = cleaned.replace(/@[\w.]+/g, '').trim();
  }
  
  // Handle line breaks
  if (!preserveLineBreaks) {
    cleaned = cleaned.replace(/\n+/g, ' ');
  }
  
  // Truncate if max length specified
  if (maxLength && cleaned.length > maxLength) {
    const truncated = cleaned.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(' ');
    cleaned = (lastSpace > 0 ? truncated.substring(0, lastSpace) : truncated) + '...';
  }
  
  return cleaned.trim();
}

/**
 * Check if Instagram media is supported for display
 * @param {Object} media - Instagram media object
 * @returns {boolean} True if media can be displayed
 */
export function isMediaSupported(media) {
  if (!media || !media.media_type) return false;
  
  const supportedTypes = ['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'];
  return supportedTypes.includes(media.media_type.toUpperCase());
}

/**
 * Get appropriate media URL for display
 * @param {Object} media - Instagram media object
 * @param {string} size - Preferred size ('thumbnail' or 'full')
 * @returns {string} Media URL
 */
export function getMediaUrl(media, size = 'full') {
  if (!media) return '';
  
  if (size === 'thumbnail' && media.thumbnail_url) {
    return media.thumbnail_url;
  }
  
  return media.media_url || '';
}

export default {
  InstagramErrorTypes,
  parseInstagramError,
  validateAccessToken,
  validateUserId,
  buildInstagramApiUrl,
  retryWithBackoff,
  formatInstagramDate,
  extractHashtags,
  extractMentions,
  cleanInstagramCaption,
  isMediaSupported,
  getMediaUrl
};