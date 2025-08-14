/**
 * GSAP Loader Utility
 * Handles dynamic loading of GSAP library and plugins
 */

export class GSAPLoader {
  constructor() {
    this.gsapLoaded = false;
    this.scrollTriggerLoaded = false;
    this.loadingPromise = null;
  }

  async loadGSAP() {
    if (this.loadingPromise) {
      return this.loadingPromise;
    }

    this.loadingPromise = this._loadGSAPLibrary();
    return this.loadingPromise;
  }

  async _loadGSAPLibrary() {
    try {
      // Load GSAP core
      if (!window.gsap) {
        await this._loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js');
        this.gsapLoaded = true;
      }

      // Load ScrollTrigger plugin
      if (!window.ScrollTrigger) {
        await this._loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js');
        window.gsap.registerPlugin(window.ScrollTrigger);
        this.scrollTriggerLoaded = true;
      }

      return {
        gsap: window.gsap,
        ScrollTrigger: window.ScrollTrigger
      };
    } catch (error) {
      console.error('Failed to load GSAP:', error);
      // Return fallback animation object
      return this.createFallbackAnimations();
    }
  }

  createFallbackAnimations() {
    // Simple fallback animations without GSAP
    return {
      gsap: {
        to: () => console.log('GSAP fallback: animation skipped'),
        from: () => console.log('GSAP fallback: animation skipped'),
        set: () => console.log('GSAP fallback: set skipped'),
        timeline: () => ({
          to: () => console.log('GSAP fallback: timeline animation skipped'),
          from: () => console.log('GSAP fallback: timeline animation skipped')
        })
      },
      ScrollTrigger: {
        create: () => console.log('GSAP fallback: ScrollTrigger skipped'),
        refresh: () => console.log('GSAP fallback: ScrollTrigger refresh skipped')
      }
    };
  }

  _loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  isLoaded() {
    return this.gsapLoaded && this.scrollTriggerLoaded;
  }
}

// Export singleton instance
export const gsapLoader = new GSAPLoader();