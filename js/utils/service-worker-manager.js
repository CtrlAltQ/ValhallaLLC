/**
 * Service Worker Manager
 * Handles service worker registration, updates, and communication
 */

export class ServiceWorkerManager {
  constructor(options = {}) {
    this.options = {
      swPath: '/sw.js',
      scope: '/',
      updateCheckInterval: 60000, // 1 minute
      showUpdateNotification: true,
      autoUpdate: false,
      ...options
    };
    
    this.registration = null;
    this.isOnline = navigator.onLine;
    this.updateAvailable = false;
    this.updateCheckTimer = null;
    
    this.init();
  }

  /**
   * Initialize service worker manager
   */
  async init() {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Worker not supported');
      return;
    }

    try {
      // Register service worker
      await this.register();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Start periodic update checks
      this.startUpdateChecks();
      
      console.log('Service Worker Manager initialized');
    } catch (error) {
      console.error('Failed to initialize Service Worker Manager:', error);
    }
  }

  /**
   * Register service worker
   */
  async register() {
    try {
      this.registration = await navigator.serviceWorker.register(
        this.options.swPath,
        { scope: this.options.scope }
      );
      
      console.log('Service Worker registered:', this.registration);
      
      // Handle different registration states
      if (this.registration.installing) {
        console.log('Service Worker installing...');
        this.trackInstalling(this.registration.installing);
      } else if (this.registration.waiting) {
        console.log('Service Worker waiting...');
        this.showUpdateAvailable();
      } else if (this.registration.active) {
        console.log('Service Worker active');
      }
      
      // Listen for updates
      this.registration.addEventListener('updatefound', () => {
        console.log('Service Worker update found');
        this.trackInstalling(this.registration.installing);
      });
      
      return this.registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      throw error;
    }
  }

  /**
   * Track installing service worker
   * @param {ServiceWorker} worker - Installing service worker
   */
  trackInstalling(worker) {
    worker.addEventListener('statechange', () => {
      if (worker.state === 'installed') {
        if (navigator.serviceWorker.controller) {
          // New service worker available
          console.log('New Service Worker available');
          this.showUpdateAvailable();
        } else {
          // First time installation
          console.log('Service Worker installed for the first time');
          this.showInstallSuccess();
        }
      }
    });
  }

  /**
   * Show update available notification
   */
  showUpdateAvailable() {
    this.updateAvailable = true;
    
    if (this.options.showUpdateNotification) {
      this.showUpdateNotification();
    }
    
    if (this.options.autoUpdate) {
      this.activateUpdate();
    }
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('sw:update-available', {
      detail: { registration: this.registration }
    }));
  }

  /**
   * Show install success notification
   */
  showInstallSuccess() {
    console.log('App is ready for offline use');
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('sw:installed', {
      detail: { registration: this.registration }
    }));
  }

  /**
   * Show update notification to user
   */
  showUpdateNotification() {
    // Create update notification
    const notification = document.createElement('div');
    notification.className = 'sw-update-notification';
    notification.innerHTML = `
      <div class="sw-update-content">
        <div class="sw-update-message">
          <h4>Update Available</h4>
          <p>A new version of the app is available. Refresh to get the latest features.</p>
        </div>
        <div class="sw-update-actions">
          <button class="sw-update-btn sw-update-refresh">Refresh</button>
          <button class="sw-update-btn sw-update-dismiss">Later</button>
        </div>
      </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .sw-update-notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--color-surface, #ffffff);
        border: 1px solid var(--color-border, #e5e5e5);
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        max-width: 400px;
        z-index: 10000;
        animation: slideInUp 0.3s ease-out;
      }
      
      .sw-update-content {
        padding: 20px;
      }
      
      .sw-update-message h4 {
        margin: 0 0 8px 0;
        color: var(--color-accent, #d4af37);
        font-size: 16px;
        font-weight: 600;
      }
      
      .sw-update-message p {
        margin: 0 0 16px 0;
        color: var(--color-text-secondary, #666666);
        font-size: 14px;
        line-height: 1.4;
      }
      
      .sw-update-actions {
        display: flex;
        gap: 12px;
      }
      
      .sw-update-btn {
        padding: 8px 16px;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .sw-update-refresh {
        background: var(--color-accent, #d4af37);
        color: white;
      }
      
      .sw-update-refresh:hover {
        background: var(--color-accent-hover, #b8941f);
      }
      
      .sw-update-dismiss {
        background: transparent;
        color: var(--color-text-secondary, #666666);
        border: 1px solid var(--color-border, #e5e5e5);
      }
      
      .sw-update-dismiss:hover {
        background: var(--color-surface-elevated, #f5f5f5);
      }
      
      @keyframes slideInUp {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      @media (max-width: 480px) {
        .sw-update-notification {
          left: 20px;
          right: 20px;
          bottom: 20px;
          max-width: none;
        }
        
        .sw-update-actions {
          flex-direction: column;
        }
        
        .sw-update-btn {
          width: 100%;
        }
      }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Handle button clicks
    notification.querySelector('.sw-update-refresh').addEventListener('click', () => {
      this.activateUpdate();
      notification.remove();
    });
    
    notification.querySelector('.sw-update-dismiss').addEventListener('click', () => {
      notification.remove();
    });
    
    // Auto-dismiss after 30 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 30000);
  }

  /**
   * Activate service worker update
   */
  async activateUpdate() {
    if (!this.registration || !this.registration.waiting) {
      return;
    }
    
    try {
      // Tell the waiting service worker to skip waiting
      this.registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Reload the page to activate the new service worker
      window.location.reload();
    } catch (error) {
      console.error('Failed to activate update:', error);
    }
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Online/offline status
    window.addEventListener('online', () => {
      this.isOnline = true;
      console.log('App is online');
      this.handleOnline();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
      console.log('App is offline');
      this.handleOffline();
    });
    
    // Service worker controller change
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('Service Worker controller changed');
      // Reload to ensure all tabs are using the new service worker
      if (!this.options.autoUpdate) {
        window.location.reload();
      }
    });
    
    // Listen for messages from service worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      this.handleServiceWorkerMessage(event);
    });
  }

  /**
   * Handle online event
   */
  handleOnline() {
    // Trigger background sync if supported
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      navigator.serviceWorker.ready.then((registration) => {
        return registration.sync.register('background-sync');
      }).catch((error) => {
        console.error('Background sync registration failed:', error);
      });
    }
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('sw:online'));
  }

  /**
   * Handle offline event
   */
  handleOffline() {
    // Show offline notification
    this.showOfflineNotification();
    
    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('sw:offline'));
  }

  /**
   * Show offline notification
   */
  showOfflineNotification() {
    // Create offline indicator
    let indicator = document.querySelector('.offline-indicator');
    
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'offline-indicator';
      indicator.innerHTML = `
        <div class="offline-content">
          <span class="offline-icon">📡</span>
          <span class="offline-text">You're offline</span>
        </div>
      `;
      
      // Add styles
      const style = document.createElement('style');
      style.textContent = `
        .offline-indicator {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: #ff6b6b;
          color: white;
          padding: 12px;
          text-align: center;
          font-size: 14px;
          font-weight: 500;
          z-index: 10001;
          transform: translateY(-100%);
          transition: transform 0.3s ease-out;
        }
        
        .offline-indicator.show {
          transform: translateY(0);
        }
        
        .offline-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .offline-icon {
          font-size: 16px;
        }
      `;
      
      document.head.appendChild(style);
      document.body.appendChild(indicator);
    }
    
    // Show indicator
    setTimeout(() => {
      indicator.classList.add('show');
    }, 100);
    
    // Hide when back online
    const hideOnOnline = () => {
      indicator.classList.remove('show');
      setTimeout(() => {
        if (indicator.parentNode) {
          indicator.remove();
        }
      }, 300);
      window.removeEventListener('online', hideOnOnline);
    };
    
    window.addEventListener('online', hideOnOnline);
  }

  /**
   * Handle messages from service worker
   * @param {MessageEvent} event - Message event
   */
  handleServiceWorkerMessage(event) {
    const { type, payload } = event.data;
    
    switch (type) {
      case 'CACHE_UPDATED':
        console.log('Cache updated:', payload);
        break;
      case 'OFFLINE_FALLBACK':
        console.log('Offline fallback served:', payload);
        break;
      default:
        console.log('Service Worker message:', event.data);
    }
  }

  /**
   * Start periodic update checks
   */
  startUpdateChecks() {
    if (this.updateCheckTimer) {
      clearInterval(this.updateCheckTimer);
    }
    
    this.updateCheckTimer = setInterval(() => {
      this.checkForUpdates();
    }, this.options.updateCheckInterval);
  }

  /**
   * Check for service worker updates
   */
  async checkForUpdates() {
    if (!this.registration) return;
    
    try {
      await this.registration.update();
    } catch (error) {
      console.error('Update check failed:', error);
    }
  }

  /**
   * Get service worker version
   * @returns {Promise<string>}
   */
  async getVersion() {
    if (!this.registration || !this.registration.active) {
      return null;
    }
    
    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.version);
      };
      
      this.registration.active.postMessage(
        { type: 'GET_VERSION' },
        [messageChannel.port2]
      );
    });
  }

  /**
   * Clear all caches
   * @returns {Promise<boolean>}
   */
  async clearCaches() {
    if (!this.registration || !this.registration.active) {
      return false;
    }
    
    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data.success);
      };
      
      this.registration.active.postMessage(
        { type: 'CLEAR_CACHE' },
        [messageChannel.port2]
      );
    });
  }

  /**
   * Unregister service worker
   */
  async unregister() {
    if (!this.registration) return false;
    
    try {
      const result = await this.registration.unregister();
      console.log('Service Worker unregistered:', result);
      
      // Clear update check timer
      if (this.updateCheckTimer) {
        clearInterval(this.updateCheckTimer);
        this.updateCheckTimer = null;
      }
      
      return result;
    } catch (error) {
      console.error('Failed to unregister Service Worker:', error);
      return false;
    }
  }

  /**
   * Get registration status
   * @returns {Object}
   */
  getStatus() {
    return {
      supported: 'serviceWorker' in navigator,
      registered: !!this.registration,
      active: !!(this.registration && this.registration.active),
      updateAvailable: this.updateAvailable,
      isOnline: this.isOnline
    };
  }
}

// Create global instance
export const serviceWorkerManager = new ServiceWorkerManager();

export default ServiceWorkerManager;