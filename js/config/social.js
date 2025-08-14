/**
 * Social Media Configuration
 * Configure Instagram Graph API and other social media settings
 */

export const socialConfig = {
  instagram: {
    // Instagram Graph API Configuration
    // To enable Instagram integration, replace 'null' values with your actual credentials
    // Get these from: https://developers.facebook.com/docs/instagram-graph-api/
    accessToken: null, // Replace with: 'YOUR_INSTAGRAM_ACCESS_TOKEN'
    userId: null,      // Replace with: 'YOUR_INSTAGRAM_USER_ID'
    
    // API Settings
    apiUrl: 'https://graph.instagram.com',
    fields: 'id,caption,media_type,media_url,permalink,timestamp,thumbnail_url',
    limit: 12,
    
    // Cache Settings
    cacheKey: 'valhalla_instagram_cache',
    cacheExpiry: 3600000, // 1 hour in milliseconds
    
    // Fallback Settings
    fallbackEnabled: true,
    
    // Rate Limiting
    rateLimitDelay: 1000, // 1 second between requests
    maxRetries: 3
  },
  
  // Studio Social Media Links
  studioSocial: {
    instagram: {
      url: 'https://instagram.com/valhallatattoo',
      handle: '@valhallatattoo',
      displayName: 'Valhalla Tattoo'
    },
    facebook: {
      url: 'https://facebook.com/valhallatattoo',
      handle: 'Valhalla Tattoo',
      displayName: 'Valhalla Tattoo'
    },
    tiktok: {
      url: 'https://tiktok.com/@valhallatattoo',
      handle: '@valhallatattoo',
      displayName: 'Valhalla Tattoo'
    }
  },
  
  // Artist Social Media Links
  artistSocial: {
    pagan: {
      instagram: {
        url: 'https://instagram.com/pagan_tattoo',
        handle: '@pagan_tattoo'
      },
      facebook: {
        url: 'https://facebook.com/pagan.valhalla.tattoo',
        handle: 'Pagan - Valhalla Tattoo'
      }
    },
    jimmy: {
      instagram: {
        url: 'https://instagram.com/jimmy_illustrative',
        handle: '@jimmy_illustrative'
      },
      facebook: {
        url: 'https://facebook.com/jimmy.valhalla.tattoo',
        handle: 'Jimmy - Valhalla Tattoo'
      }
    },
    micah: {
      instagram: {
        url: 'https://instagram.com/micah_fineline',
        handle: '@micah_fineline'
      },
      facebook: {
        url: 'https://facebook.com/micah.valhalla.tattoo',
        handle: 'Micah - Valhalla Tattoo'
      }
    },
    sarah: {
      instagram: {
        url: 'https://instagram.com/sarah_watercolor',
        handle: '@sarah_watercolor'
      },
      facebook: {
        url: 'https://facebook.com/sarah.valhalla.tattoo',
        handle: 'Sarah - Valhalla Tattoo'
      }
    },
    kason: {
      instagram: {
        url: 'https://instagram.com/kason_japanese',
        handle: '@kason_japanese'
      },
      facebook: {
        url: 'https://facebook.com/kason.valhalla.tattoo',
        handle: 'Kason - Valhalla Tattoo'
      }
    },
    heather: {
      instagram: {
        url: 'https://instagram.com/heather_botanical',
        handle: '@heather_botanical'
      },
      facebook: {
        url: 'https://facebook.com/heather.valhalla.tattoo',
        handle: 'Heather - Valhalla Tattoo'
      }
    }
  }
};

/**
 * Get social media configuration for a specific artist
 * @param {string} artistSlug - Artist slug (e.g., 'pagan', 'jimmy')
 * @returns {Object|null} Artist social media configuration
 */
export function getArtistSocial(artistSlug) {
  return socialConfig.artistSocial[artistSlug] || null;
}

/**
 * Get studio social media links
 * @returns {Object} Studio social media configuration
 */
export function getStudioSocial() {
  return socialConfig.studioSocial;
}

/**
 * Initialize Instagram API with credentials
 * This should be called with actual credentials in production
 * @param {string} accessToken - Instagram Graph API access token
 * @param {string} userId - Instagram user ID
 */
export function setInstagramCredentials(accessToken, userId) {
  socialConfig.instagram.accessToken = accessToken;
  socialConfig.instagram.userId = userId;
}

export default socialConfig;