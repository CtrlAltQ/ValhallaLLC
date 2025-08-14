// Privacy Consent Banner Component
class ConsentBanner {
  constructor() {
    this.consentGiven = localStorage.getItem('analytics-consent');
    this.init();
  }
  
  init() {
    if (!this.consentGiven) {
      this.showBanner();
    }
  }
  
  showBanner() {
    const banner = document.createElement('div');
    banner.id = 'consent-banner';
    banner.className = 'consent-banner';
    banner.innerHTML = `
      <div class="consent-content">
        <div class="consent-text">
          <h3>Privacy & Cookies</h3>
          <p>We use cookies and analytics to improve your experience and understand how you use our site. This helps us showcase our artists' work better and improve our services.</p>
        </div>
        <div class="consent-actions">
          <button id="consent-accept" class="btn btn-primary">Accept</button>
          <button id="consent-decline" class="btn btn-secondary">Decline</button>
          <a href="/privacy-policy.html" class="consent-link">Privacy Policy</a>
        </div>
      </div>
    `;
    
    document.body.appendChild(banner);
    
    // Add event listeners
    document.getElementById('consent-accept').addEventListener('click', () => {
      this.grantConsent();
    });
    
    document.getElementById('consent-decline').addEventListener('click', () => {
      this.declineConsent();
    });
    
    // Show banner with animation
    setTimeout(() => {
      banner.classList.add('show');
    }, 100);
  }
  
  grantConsent() {
    localStorage.setItem('analytics-consent', 'granted');
    this.hideBanner();
    
    // Initialize analytics if not already done
    if (window.ValhallaTattooAnalytics) {
      window.ValhallaTattooAnalytics.consentGiven = true;
      window.ValhallaTattooAnalytics.init();
    }
  }
  
  declineConsent() {
    localStorage.setItem('analytics-consent', 'declined');
    this.hideBanner();
  }
  
  hideBanner() {
    const banner = document.getElementById('consent-banner');
    if (banner) {
      banner.classList.add('hide');
      setTimeout(() => {
        banner.remove();
      }, 300);
    }
  }
}

// Initialize consent banner
document.addEventListener('DOMContentLoaded', () => {
  new ConsentBanner();
});

export default ConsentBanner;