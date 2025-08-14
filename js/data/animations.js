/**
 * Animation Configuration Data
 * Defines animation settings, timelines, and presets
 */

export const animationConfig = {
  // Global animation settings
  defaults: {
    duration: 0.6,
    ease: "power2.out",
    stagger: 0.1
  },
  
  // Scroll trigger settings
  scrollTrigger: {
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse"
  },
  
  // Animation presets
  presets: {
    fadeInUp: {
      from: { opacity: 0, y: 30 },
      to: { opacity: 1, y: 0 }
    },
    
    fadeInLeft: {
      from: { opacity: 0, x: -30 },
      to: { opacity: 1, x: 0 }
    },
    
    fadeInRight: {
      from: { opacity: 0, x: 30 },
      to: { opacity: 1, x: 0 }
    },
    
    scaleIn: {
      from: { opacity: 0, scale: 0.8 },
      to: { opacity: 1, scale: 1 }
    },
    
    slideInUp: {
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0 }
    }
  },
  
  // Hero section animations
  hero: {
    title: {
      duration: 1,
      ease: "power3.out",
      delay: 0.3
    },
    subtitle: {
      duration: 0.8,
      ease: "power2.out",
      delay: 0.6
    },
    cta: {
      duration: 0.6,
      ease: "back.out(1.7)",
      delay: 0.9
    }
  },
  
  // Portfolio gallery animations
  portfolio: {
    grid: {
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out"
    },
    lightbox: {
      backdrop: {
        duration: 0.3,
        ease: "power2.out"
      },
      content: {
        duration: 0.4,
        ease: "back.out(1.7)"
      }
    }
  },
  
  // Micro-interaction settings
  microInteractions: {
    hover: {
      duration: 0.3,
      ease: "power2.out"
    },
    click: {
      duration: 0.15,
      ease: "power2.inOut"
    },
    focus: {
      duration: 0.2,
      ease: "power2.out"
    }
  }
};

export const scrollAnimations = [
  {
    selector: '.scroll-reveal',
    animation: 'fadeInUp',
    trigger: {
      start: "top 85%",
      end: "bottom 15%"
    }
  },
  {
    selector: '.hero-parallax',
    animation: 'parallax',
    trigger: {
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  },
  {
    selector: '.stagger-children',
    animation: 'fadeInUp',
    stagger: 0.1,
    trigger: {
      start: "top 80%"
    }
  }
];