/**
 * CLIENT CONFIGURATION FILE
 * 
 * This file contains all the settings you might need to modify.
 * Only edit the values after the ':' symbol.
 * 
 * ⚠️  IMPORTANT: Keep this file backed up before making changes!
 */

// ==========================================
// 🏢 STUDIO INFORMATION
// ==========================================
export const STUDIO_INFO = {
  // Basic studio details
  name: 'Valhalla Tattoo',
  tagline: 'Crafting Legends in Ink',
  
  // Contact information
  phone: '931-451-5313',
  email: 'inkedbyvalhalla@gmail.com',
  
  // Address
  address: '404 Mclemore Ave. Suite 4',
  city: 'Spring Hill',
  state: 'TN',
  zipCode: '37174',
  
  // Hours
  hours: {
    monday: 'Closed',
    tuesday: '12:00 PM - 8:00 PM',
    wednesday: '12:00 PM - 8:00 PM',
    thursday: '12:00 PM - 8:00 PM',
    friday: '12:00 PM - 8:00 PM',
    saturday: '12:00 PM - 8:00 PM',
    sunday: 'Closed'
  }
};

// ==========================================
// 📱 SOCIAL MEDIA LINKS
// ==========================================
export const SOCIAL_MEDIA = {
  instagram: 'https://www.instagram.com/valhallatattoollc/',
  facebook: 'https://www.facebook.com/Valhallatattoollc',
  tiktok: '', // Leave empty to hide TikTok link
  twitter: '', // Leave empty to hide Twitter link
  
  // Individual artist social media (optional)
  artists: {
    pagan: {
      instagram: '', // Add @username or full URL
      facebook: ''
    },
    jimmy: {
      instagram: '',
      facebook: ''
    },
    micah: {
      instagram: '',
      facebook: ''
    },
    sarah: {
      instagram: '',
      facebook: ''
    },
    kason: {
      instagram: '',
      facebook: ''
    },
    heather: {
      instagram: '',
      facebook: ''
    }
  }
};

// ==========================================
// 📧 CONTACT FORM SETTINGS
// ==========================================
export const CONTACT_FORM = {
  // Which service to use: 'formspree' or 'netlify'
  service: 'netlify',
  
  // FOR FORMSPREE USERS:
  // 1. Sign up at https://formspree.io
  // 2. Create a form and get your form ID
  // 3. Replace 'YOUR_FORM_ID' below
  formspreeId: 'xpwzgqpv', // Not needed for Netlify Forms
  
  // Where to send different types of inquiries
  emailRouting: {
    general: 'inkedbyvalhalla@gmail.com',
    booking: 'inkedbyvalhalla@gmail.com',
    // You can set different emails for specific artists:
    // pagan: 'pagan@valhallatattoo.com',
    // jimmy: 'jimmy@valhallatattoo.com',
  },
  
  // Thank you page (after form submission)
  thankYouPage: '/thank-you.html'
};

// ==========================================
// 📰 NEWSLETTER SETTINGS
// ==========================================
export const NEWSLETTER = {
  // Which service to use: 'mailerlite', 'convertkit', or 'disabled'
  service: 'disabled', // Change to 'mailerlite' or 'convertkit' when ready
  
  // FOR MAILERLITE USERS:
  mailerlite: {
    apiKey: '', // Add your API key from MailerLite settings
    groupId: '' // Add your group/list ID
  },
  
  // FOR CONVERTKIT USERS:
  convertkit: {
    apiKey: '', // Add your API key from ConvertKit settings
    formId: ''  // Add your form ID
  }
};

// ==========================================
// 📸 INSTAGRAM INTEGRATION
// ==========================================
export const INSTAGRAM = {
  // Set to 'enabled' or 'disabled'
  status: 'disabled', // Change to 'enabled' when you have API credentials
  
  // Instagram Graph API credentials (get from Facebook Developer Console)
  accessToken: '', // Your Instagram Access Token
  userId: '',      // Your Instagram User ID
  
  // How many posts to display
  postsToShow: 6,
  
  // Fallback message when Instagram is disabled or unavailable
  fallbackMessage: 'Follow us @valhallatattoo for daily tattoo inspiration and behind-the-scenes content!'
};

// ==========================================
// 🎨 WEBSITE THEME COLORS
// ==========================================
export const THEME_COLORS = {
  // Main brand color (gold)
  accent: '#d4af37',
  
  // Background colors
  background: '#1a1a1a',
  backgroundLight: '#2a2a2a',
  
  // Text colors
  textPrimary: '#ffffff',
  textSecondary: '#cccccc',
  textMuted: '#888888',
  
  // Status colors
  success: '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
  info: '#2196f3'
};

// ==========================================
// 📊 GOOGLE ANALYTICS (Optional)
// ==========================================
export const ANALYTICS = {
  // Set to 'enabled' or 'disabled'
  status: 'disabled', // Change to 'enabled' when you have a tracking ID
  
  // Your Google Analytics tracking ID (starts with G- or GA-)
  trackingId: '', // Example: 'G-XXXXXXXXXX'
  
  // Privacy settings
  anonymizeIP: true,
  respectDoNotTrack: true
};

// ==========================================
// 🔧 ADVANCED SETTINGS
// ==========================================
export const ADVANCED = {
  // Loading screen timeout (in seconds)
  loadingTimeout: 2,
  
  // Image optimization
  images: {
    lazyLoading: true,
    webpSupport: true,
    compressionQuality: 85
  },
  
  // Animation settings
  animations: {
    enabled: true,
    reducedMotion: true, // Respect user's motion preferences
    duration: 300 // Default animation duration in milliseconds
  },
  
  // Performance
  performance: {
    preloadImages: true,
    cachingEnabled: true,
    serviceWorkerEnabled: true
  }
};

/**
 * ==========================================
 * 🚨 IMPORTANT NOTES:
 * ==========================================
 * 
 * 1. Always backup this file before making changes
 * 2. Only edit values after the ':' symbol
 * 3. Keep quotes around text values: 'like this'
 * 4. Use true/false for yes/no settings (no quotes)
 * 5. Test your changes on a development site first
 * 6. Contact your developer for help with API integrations
 * 
 * ==========================================
 * 📋 QUICK SETUP CHECKLIST:
 * ==========================================
 * 
 * □ Update STUDIO_INFO with your details
 * □ Add SOCIAL_MEDIA links
 * □ Set up CONTACT_FORM (Formspree or Netlify)
 * □ Configure NEWSLETTER if desired
 * □ Set up INSTAGRAM integration if desired
 * □ Add ANALYTICS tracking if desired
 * □ Test contact form submission
 * □ Verify social media links work
 * 
 */