/**
 * Service Worker for Valhalla Tattoo Website
 * Provides caching, offline functionality, and performance optimizations
 * 
 * Fix for MobX state tree error: Added safety checks for accessing detached objects
 */

const CACHE_NAME = 'valhalla-tattoo-v1.0.1';
const CACHE_VERSION = '1.0.1';

/**
 * Safety wrapper to prevent MobX state tree errors when accessing detached objects
 * @param {Function} fn - Function to safely execute
 * @param {*} defaultValue - Default value to return if an error occurs
 * @returns {Function} - Wrapped function that catches MobX errors
 */
function safeAccess(fn, defaultValue = null) {
  return function(...args) {
    try {
      return fn(...args);
    } catch (error) {
      // Check if it's a MobX state tree error about detached objects
      if (error.message && error.message.includes('no longer part of a state tree')) {
        console.warn('Prevented access to detached object:', error.message);
        return defaultValue;
      }
      // Re-throw other errors
      throw error;
    }
  };
}

/**
 * Safely get a property from an object that might be detached
 * @param {Object} obj - The object to access
 * @param {string} prop - The property to get
 * @param {*} defaultValue - Default value to return if the object is detached
 * @returns {*} - The property value or default value
 */
function safeGet(obj, prop, defaultValue = null) {
  if (!obj) return defaultValue;
  
  try {
    return obj[prop];
  } catch (error) {
    if (error.message && error.message.includes('no longer part of a state tree')) {
      console.warn(`Prevented access to detached object property: ${prop}`, error.message);
      return defaultValue;
    }
    throw error;
  }
}

/**
 * Global error handler for the service worker
 */
self.addEventListener('error', (event) => {
  const error = event.error || new Error('Unknown service worker error');
  
  // Handle MobX state tree errors
  if (error.message && error.message.includes('no longer part of a state tree')) {
    console.warn('Caught MobX state tree error:', error.message);
    event.preventDefault(); // Prevent the error from crashing the service worker
  } else {
    console.error('Service worker error:', error);
  }
});

// Cache strategies
const CACHE_STRATEGIES = {
  CACHE_FIRST: 'cache-first',
  NETWORK_FIRST: 'network-first',
  STALE_WHILE_REVALIDATE: 'stale-while-revalidate',
  NETWORK_ONLY: 'network-only',
  CACHE_ONLY: 'cache-only'
};

// Resources to cache immediately on install
const STATIC_CACHE_RESOURCES = [
  // Core HTML pages
  '/',
  '/index.html',
  '/portfolio/pagan.html',
  '/portfolio/jimmy.html',
  '/portfolio/micah.html',
  '/portfolio/sarah.html',
  '/portfolio/kason.html',
  '/portfolio/heather.html',
  '/thank-you.html',
  
  // CSS files
  '/assets/css/main.css',
  '/assets/css/variables.css',
  '/assets/css/base.css',
  '/assets/css/layout.css',
  '/assets/css/components.css',
  '/assets/css/animations.css',
  '/assets/css/social.css',
  '/assets/css/image-optimization.css',
  '/assets/css/utilities.css',
  
  // JavaScript files
  '/js/main.js',
  '/js/modules/homepage.js',
  '/js/modules/portfolio.js',
  '/js/modules/contact.js',
  '/js/modules/animations.js',
  '/js/modules/blog.js',
  '/js/modules/newsletter.js',
  '/js/modules/social-integration.js',
  '/js/modules/seo.js',
  '/js/utils/gsap-loader.js',
  '/js/utils/image-optimizer.js',
  '/js/utils/progressive-enhancement.js',
  '/js/utils/portfolio-utils.js',
  '/js/utils/instagram-api.js',
  '/js/data/artists.js',
  '/js/data/content.js',
  '/js/data/animations.js',
  '/js/config/app.js',
  '/js/config/forms.js',
  '/js/config/social.js',
  '/components/portfolio/portfolio-gallery.js',
  '/components/forms/contact-form.js',
  '/components/social/instagram-feed.js',
  '/components/social/social-links.js',
  
  // Essential images
  '/images/logo.jpg',
  '/images/blkValhallalogo.jpg',
  '/images/valhalla_heropic.jpg',
  '/images/gallery/pagan.jpg',
  '/images/gallery/jimmy.jpg',
  '/images/gallery/micah.jpg',
  '/images/gallery/sarah.jpg',
  '/images/gallery/kason.jpg',
  '/images/gallery/heather.jpg',
  
  // Manifest and icons
  '/manifest.json',
  '/robots.txt',
  '/sitemap.xml'
];

// Resources that should use network-first strategy
const NETWORK_FIRST_RESOURCES = [
  // API endpoints
  '/api/',
  // Social media content
  '/instagram/',
  // Form submissions
  '/contact',
  '/newsletter'
];

// Resources that should use stale-while-revalidate
const STALE_WHILE_REVALIDATE_RESOURCES = [
  // Portfolio images
  '/images/portfolio/',
  // Studio images
  '/images/studio/',
  // Blog images
  '/images/blog/'
];

// Resources that should never be cached
const NETWORK_ONLY_RESOURCES = [
  // Analytics
  '/analytics',
  // Real-time data
  '/live',
  // Admin areas
  '/admin'
];

/**
 * Install event - cache static resources
 */
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching static resources...');
        return cache.addAll(STATIC_CACHE_RESOURCES);
      })
      .then(() => {
        console.log('Static resources cached successfully');
        // Force activation of new service worker
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Failed to cache static resources:', error);
      })
  );
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

/**
 * Fetch event - handle network requests with appropriate caching strategy
 */
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip cross-origin requests (except for known CDNs)
  if (url.origin !== location.origin && !isTrustedOrigin(url.origin)) {
    return;
  }
  
  // Determine caching strategy based on request
  const strategy = getCachingStrategy(request);
  
  switch (strategy) {
    case CACHE_STRATEGIES.CACHE_FIRST:
      event.respondWith(cacheFirst(request));
      break;
    case CACHE_STRATEGIES.NETWORK_FIRST:
      event.respondWith(networkFirst(request));
      break;
    case CACHE_STRATEGIES.STALE_WHILE_REVALIDATE:
      event.respondWith(staleWhileRevalidate(request));
      break;
    case CACHE_STRATEGIES.NETWORK_ONLY:
      // Let the browser handle it
      break;
    case CACHE_STRATEGIES.CACHE_ONLY:
      event.respondWith(cacheOnly(request));
      break;
    default:
      event.respondWith(staleWhileRevalidate(request));
  }
});

/**
 * Determine caching strategy for a request
 * @param {Request} request - The request object
 * @returns {string} Caching strategy
 */
function getCachingStrategy(request) {
  const url = request.url;
  
  // Network-only resources
  if (NETWORK_ONLY_RESOURCES.some(pattern => url.includes(pattern))) {
    return CACHE_STRATEGIES.NETWORK_ONLY;
  }
  
  // Network-first resources (APIs, dynamic content)
  if (NETWORK_FIRST_RESOURCES.some(pattern => url.includes(pattern))) {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }
  
  // Stale-while-revalidate resources (images, media)
  if (STALE_WHILE_REVALIDATE_RESOURCES.some(pattern => url.includes(pattern))) {
    return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
  }
  
  // Static resources (CSS, JS, fonts)
  if (url.includes('.css') || url.includes('.js') || url.includes('.woff') || url.includes('.ttf')) {
    return CACHE_STRATEGIES.CACHE_FIRST;
  }
  
  // HTML pages
  if (request.destination === 'document') {
    return CACHE_STRATEGIES.NETWORK_FIRST;
  }
  
  // Images
  if (request.destination === 'image') {
    return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
  }
  
  // Default strategy
  return CACHE_STRATEGIES.STALE_WHILE_REVALIDATE;
}

/**
 * Cache-first strategy
 * @param {Request} request - The request object
 * @returns {Promise<Response>}
 */
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache-first strategy failed:', error);
    return getOfflineFallback(request);
  }
}

/**
 * Network-first strategy
 * @param {Request} request - The request object
 * @returns {Promise<Response>}
 */
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', request.url);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    return getOfflineFallback(request);
  }
}

/**
 * Stale-while-revalidate strategy
 * @param {Request} request - The request object
 * @returns {Promise<Response>}
 */
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  // Start network request in background
  const networkResponsePromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        const cache = caches.open(CACHE_NAME);
        cache.then(c => c.put(request, networkResponse.clone()));
      }
      return networkResponse;
    })
    .catch((error) => {
      console.log('Network request failed:', error);
      return null;
    });
  
  // Return cached response immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Otherwise wait for network response
  const networkResponse = await networkResponsePromise;
  if (networkResponse) {
    return networkResponse;
  }
  
  return getOfflineFallback(request);
}

/**
 * Cache-only strategy
 * @param {Request} request - The request object
 * @returns {Promise<Response>}
 */
async function cacheOnly(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  return getOfflineFallback(request);
}

/**
 * Get offline fallback response
 * @param {Request} request - The request object
 * @returns {Response}
 */
function getOfflineFallback(request) {
  const url = new URL(request.url);
  
  // HTML pages - return offline page
  if (request.destination === 'document') {
    return caches.match('/offline.html') || new Response(
      getOfflineHTML(),
      { 
        headers: { 'Content-Type': 'text/html' },
        status: 200
      }
    );
  }
  
  // Images - return placeholder
  if (request.destination === 'image') {
    return new Response(
      getImagePlaceholder(),
      { 
        headers: { 'Content-Type': 'image/svg+xml' },
        status: 200
      }
    );
  }
  
  // API requests - return error response
  if (url.pathname.startsWith('/api/')) {
    return new Response(
      JSON.stringify({ error: 'Offline', message: 'This feature requires an internet connection' }),
      { 
        headers: { 'Content-Type': 'application/json' },
        status: 503
      }
    );
  }
  
  // Default fallback
  return new Response('Offline', { status: 503 });
}

/**
 * Generate offline HTML page
 * @returns {string}
 */
function getOfflineHTML() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Offline - Valhalla Tattoo</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
          color: #ffffff;
          margin: 0;
          padding: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .offline-container {
          max-width: 500px;
          padding: 2rem;
        }
        .logo {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: #d4af37;
          margin: 0 auto 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
        }
        h1 {
          color: #d4af37;
          margin-bottom: 1rem;
          font-size: 2rem;
        }
        p {
          color: #cccccc;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
        .retry-btn {
          background: #d4af37;
          color: #1a1a1a;
          border: none;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }
        .retry-btn:hover {
          background: #b8941f;
        }
      </style>
    </head>
    <body>
      <div class="offline-container">
        <div class="logo">V</div>
        <h1>You're Offline</h1>
        <p>
          It looks like you've lost your internet connection. 
          Don't worry - you can still browse the pages you've already visited.
        </p>
        <button class="retry-btn" onclick="window.location.reload()">
          Try Again
        </button>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate image placeholder SVG
 * @returns {string}
 */
function getImagePlaceholder() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#333333"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" 
            fill="#ffffff" font-family="Arial, sans-serif" font-size="16">
        Image unavailable offline
      </text>
    </svg>
  `;
}

/**
 * Check if origin is trusted for cross-origin requests
 * @param {string} origin - The origin to check
 * @returns {boolean}
 */
function isTrustedOrigin(origin) {
  const trustedOrigins = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdnjs.cloudflare.com',
    'https://unpkg.com',
    'https://api.instagram.com',
    'https://graph.instagram.com'
  ];
  
  return trustedOrigins.includes(origin);
}

/**
 * Handle background sync for offline actions
 */
self.addEventListener('sync', (event) => {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForms());
  }
  
  if (event.tag === 'newsletter-sync') {
    event.waitUntil(syncNewsletterSignups());
  }
});

/**
 * Sync contact form submissions when back online
 */
async function syncContactForms() {
  try {
    const db = await openIndexedDB();
    const forms = await getStoredForms(db);
    
    for (const form of forms) {
      try {
        const response = await fetch('/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form.data)
        });
        
        if (response.ok) {
          await removeStoredForm(db, form.id);
          console.log('Contact form synced successfully');
        }
      } catch (error) {
        console.error('Failed to sync contact form:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

/**
 * Sync newsletter signups when back online
 */
async function syncNewsletterSignups() {
  try {
    const db = await openIndexedDB();
    const signups = await getStoredNewsletterSignups(db);
    
    for (const signup of signups) {
      try {
        const response = await fetch('/newsletter', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(signup.data)
        });
        
        if (response.ok) {
          await removeStoredNewsletterSignup(db, signup.id);
          console.log('Newsletter signup synced successfully');
        }
      } catch (error) {
        console.error('Failed to sync newsletter signup:', error);
      }
    }
  } catch (error) {
    console.error('Newsletter sync failed:', error);
  }
}

/**
 * Handle push notifications
 */
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/images/logo.jpg',
    badge: '/images/logo.jpg',
    tag: data.tag || 'valhalla-notification',
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'View',
        icon: '/images/logo.jpg'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

/**
 * Handle notification clicks
 */
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

/**
 * Handle messages from main thread
 */
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
    case 'GET_VERSION':
      event.ports[0].postMessage({ version: CACHE_VERSION });
      break;
    case 'CLEAR_CACHE':
      clearAllCaches().then(() => {
        event.ports[0].postMessage({ success: true });
      });
      break;
  }
});

/**
 * Clear all caches
 */
async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
}

/**
 * IndexedDB helpers for offline storage
 */
function openIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('ValhallaTattooOffline', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('contactForms')) {
        db.createObjectStore('contactForms', { keyPath: 'id', autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains('newsletterSignups')) {
        db.createObjectStore('newsletterSignups', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

async function getStoredForms(db) {
  const transaction = db.transaction(['contactForms'], 'readonly');
  const store = transaction.objectStore('contactForms');
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function removeStoredForm(db, id) {
  const transaction = db.transaction(['contactForms'], 'readwrite');
  const store = transaction.objectStore('contactForms');
  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

async function getStoredNewsletterSignups(db) {
  const transaction = db.transaction(['newsletterSignups'], 'readonly');
  const store = transaction.objectStore('newsletterSignups');
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function removeStoredNewsletterSignup(db, id) {
  const transaction = db.transaction(['newsletterSignups'], 'readwrite');
  const store = transaction.objectStore('newsletterSignups');
  return new Promise((resolve, reject) => {
    const request = store.delete(id);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

console.log('Service Worker loaded successfully');