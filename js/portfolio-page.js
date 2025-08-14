/**
 * Portfolio Page JavaScript
 * Handles individual artist portfolio pages without ES6 modules
 * Compatible with <script src=""> loading
 */

// Artist data (copied from artists.js but without ES6 export)
window.ValhallaTattooArtists = {
  pagan: {
    id: 'pagan',
    slug: 'pagan',
    name: 'Pagan',
    specialty: 'Traditional & Neo-Traditional',
    experience: '10+ years',
    bio: 'Specializing in bold traditional and neo-traditional tattoos with vibrant colors and timeless designs.',
    extendedBio: 'Pagan brings over a decade of experience to traditional and neo-traditional tattooing, with a deep respect for the classic American tattoo tradition while incorporating modern techniques and color palettes. Known for bold line work, vibrant colors, and designs that will look just as good in 20 years as they do today.',
    socialMedia: {
      instagram: '@valhallatattoollc',
      facebook: 'Valhallatattoollc'
    },
    portfolio: [
      {
        id: 1,
        filename: 'traditional-rose.jpg',
        title: 'Traditional Rose',
        style: 'Traditional',
        placement: 'Forearm',
        sessionTime: '3 hours',
        description: 'Classic traditional rose with bold lines and vibrant colors',
        tags: ['traditional', 'rose', 'color']
      },
      {
        id: 2,
        filename: 'neo-traditional-skull.jpg',
        title: 'Neo-Traditional Skull',
        style: 'Neo-Traditional',
        placement: 'Upper Arm',
        sessionTime: '5 hours',
        description: 'Modern take on traditional skull design with enhanced shading',
        tags: ['neo-traditional', 'skull', 'modern']
      }
    ]
  },
  
  jimmy: {
    id: 'jimmy',
    slug: 'jimmy',
    name: 'Jimmy',
    specialty: 'Realism & Black & Grey',
    experience: '8+ years',
    bio: 'Master of photorealistic tattoos and intricate black and grey work that brings images to life on skin.',
    extendedBio: 'Jimmy has spent over 8 years perfecting the art of realistic tattooing, specializing in portraits, nature scenes, and detailed black and grey compositions. His meticulous attention to detail and understanding of light, shadow, and skin texture allows him to create tattoos that look like photographs.',
    socialMedia: {
      instagram: '@valhallatattoollc',
      facebook: 'Valhallatattoollc'
    },
    portfolio: [
      {
        id: 1,
        filename: 'FB_IMG_1754792182200.jpg',
        title: 'Detailed Realism Work',
        style: 'Realism',
        placement: 'Arm',
        sessionTime: '6 hours',
        description: 'Intricate realistic tattoo showcasing fine detail work',
        tags: ['realism', 'black and grey', 'portrait']
      },
      {
        id: 2,
        filename: 'FB_IMG_1754792184630.jpg',
        title: 'Black & Grey Portrait',
        style: 'Black & Grey',
        placement: 'Shoulder',
        sessionTime: '4 hours',
        description: 'Stunning black and grey portrait work',
        tags: ['portrait', 'black and grey', 'realism']
      },
      {
        id: 3,
        filename: 'FB_IMG_1754792186833.jpg',
        title: 'Realistic Animal Portrait',
        style: 'Realism',
        placement: 'Forearm',
        sessionTime: '5 hours',
        description: 'Lifelike animal portrait with incredible detail',
        tags: ['animal', 'realism', 'black and grey']
      },
      {
        id: 4,
        filename: 'FB_IMG_1754792189094.jpg',
        title: 'Detailed Character Work',
        style: 'Realism',
        placement: 'Leg',
        sessionTime: '7 hours',
        description: 'Complex character tattoo with fine shading',
        tags: ['character', 'realism', 'detailed']
      }
    ]
  },

  micah: {
    id: 'micah',
    slug: 'micah',
    name: 'Micah',
    specialty: 'Fine Line & Geometric',
    experience: '6+ years',
    bio: 'Creating delicate fine line work and precise geometric designs with mathematical precision and artistic flair.',
    extendedBio: 'Micah specializes in the delicate art of fine line tattooing and geometric designs, bringing mathematical precision to organic forms. With 6+ years of experience, Micah has developed a signature style that combines minimalist aesthetics with complex geometric patterns.',
    socialMedia: {
      instagram: '@valhallatattoollc',
      facebook: 'Valhallatattoollc'
    },
    portfolio: [
      {
        id: 1,
        filename: 'geometric-mandala.jpg',
        title: 'Geometric Mandala',
        style: 'Geometric',
        placement: 'Back',
        sessionTime: '4 hours',
        description: 'Intricate geometric mandala with precise line work',
        tags: ['geometric', 'mandala', 'precise']
      },
      {
        id: 2,
        filename: 'fine-line-floral.jpg',
        title: 'Fine Line Floral',
        style: 'Fine Line',
        placement: 'Wrist',
        sessionTime: '2 hours',
        description: 'Delicate floral design with ultra-fine line work',
        tags: ['fine line', 'floral', 'delicate']
      }
    ]
  },

  sarah: {
    id: 'sarah',
    slug: 'sarah',
    name: 'Sarah',
    specialty: 'Watercolor & Illustrative',
    experience: '7+ years',
    bio: 'Creating vibrant watercolor tattoos and illustrative designs that blur the line between art and skin.',
    extendedBio: 'Sarah brings a unique artistic perspective to tattooing with her background in fine arts and illustration. Specializing in watercolor techniques and illustrative styles, she creates tattoos that look like paintings on skin.',
    socialMedia: {
      instagram: '@valhallatattoollc',
      facebook: 'Valhallatattoollc'
    },
    portfolio: [
      {
        id: 1,
        filename: 'watercolor-flower.jpg',
        title: 'Watercolor Floral',
        style: 'Watercolor',
        placement: 'Shoulder',
        sessionTime: '4 hours',
        description: 'Flowing watercolor floral design with vibrant color blending',
        tags: ['watercolor', 'floral', 'colorful']
      },
      {
        id: 2,
        filename: 'illustrative-bird.jpg',
        title: 'Illustrative Bird',
        style: 'Illustrative',
        placement: 'Forearm',
        sessionTime: '3 hours',
        description: 'Artistic bird illustration with flowing lines and color accents',
        tags: ['illustrative', 'bird', 'artistic']
      }
    ]
  },

  kason: {
    id: 'kason',
    slug: 'kason',
    name: 'Kason',
    specialty: 'Japanese & Oriental',
    experience: '9+ years',
    bio: 'Master of traditional Japanese tattooing techniques and oriental design aesthetics.',
    extendedBio: 'Kason has dedicated over 9 years to studying and perfecting traditional Japanese tattooing techniques, including the art of tebori (hand-poking) and machine work. His deep respect for Japanese culture and artistic traditions shows in every piece.',
    socialMedia: {
      instagram: '@valhallatattoollc',
      facebook: 'Valhallatattoollc'
    },
    portfolio: [
      {
        id: 1,
        filename: 'japanese-dragon.jpg',
        title: 'Traditional Dragon',
        style: 'Japanese',
        placement: 'Back',
        sessionTime: '8 hours',
        description: 'Traditional Japanese dragon with wind bars and cloud motifs',
        tags: ['japanese', 'dragon', 'traditional']
      },
      {
        id: 2,
        filename: 'koi-sleeve.jpg',
        title: 'Koi Fish Sleeve',
        style: 'Japanese',
        placement: 'Full Sleeve',
        sessionTime: '12 hours',
        description: 'Full sleeve featuring koi fish, cherry blossoms, and water elements',
        tags: ['japanese', 'koi', 'sleeve']
      }
    ]
  },

  heather: {
    id: 'heather',
    slug: 'heather',
    name: 'Heather',
    specialty: 'Botanical & Nature',
    experience: '5+ years',
    bio: 'Specializing in beautiful botanical work, nature-inspired designs, and organic tattoo elements.',
    extendedBio: 'Heather has developed a reputation for creating some of the most beautiful botanical and nature-inspired work in the region. With 5+ years of focused experience in organic designs, florals, and natural elements, she brings life and growth to every piece.',
    socialMedia: {
      instagram: '@valhallatattoollc',
      facebook: 'Valhallatattoollc'
    },
    portfolio: [
      {
        id: 1,
        filename: 'botanical-design.jpg',
        title: 'Botanical Sleeve',
        style: 'Botanical',
        placement: 'Arm',
        sessionTime: '6 hours',
        description: 'Beautiful botanical design with natural flowing elements',
        tags: ['botanical', 'nature', 'organic']
      },
      {
        id: 2,
        filename: 'floral-mandala.jpg',
        title: 'Floral Mandala',
        style: 'Nature',
        placement: 'Back',
        sessionTime: '5 hours',
        description: 'Intricate floral mandala with detailed natural elements',
        tags: ['floral', 'mandala', 'detailed']
      }
    ]
  }
};

// Portfolio Page Manager
window.PortfolioPageManager = {
  currentArtist: null,
  
  // Initialize the portfolio page
  init: function() {
    // Get artist slug from URL
    const urlPath = window.location.pathname;
    const artistSlug = urlPath.split('/').pop().replace('.html', '');
    
    this.currentArtist = window.ValhallaTattooArtists[artistSlug];
    
    if (this.currentArtist) {
      this.loadArtistData();
      this.setupPortfolioGallery();
      this.setupContactForm();
    } else {
      console.error('Artist not found:', artistSlug);
    }
  },

  // Load artist data into the page
  loadArtistData: function() {
    const artist = this.currentArtist;
    
    // Update page title if element exists
    const titleElement = document.querySelector('.artist-hero-title');
    if (titleElement) {
      titleElement.textContent = artist.name + "'s Portfolio";
    }
    
    // Update artist bio
    const bioElement = document.querySelector('.artist-bio');
    if (bioElement) {
      bioElement.textContent = artist.extendedBio || artist.bio;
    }
    
    // Update specialty
    const specialtyElement = document.querySelector('.artist-specialty');
    if (specialtyElement) {
      specialtyElement.textContent = artist.specialty;
    }
    
    // Update experience
    const experienceElement = document.querySelector('.artist-experience');
    if (experienceElement) {
      experienceElement.textContent = artist.experience;
    }

    // Update social media links
    this.updateSocialLinks();
  },

  // Update social media links
  updateSocialLinks: function() {
    const artist = this.currentArtist;
    
    const instagramLink = document.querySelector('.social-instagram');
    if (instagramLink && artist.socialMedia.instagram) {
      instagramLink.href = 'https://instagram.com/' + artist.socialMedia.instagram.replace('@', '');
    }
    
    const facebookLink = document.querySelector('.social-facebook');
    if (facebookLink && artist.socialMedia.facebook) {
      facebookLink.href = 'https://facebook.com/' + artist.socialMedia.facebook;
    }
  },

  // Setup portfolio gallery
  setupPortfolioGallery: function() {
    const galleryContainer = document.querySelector('.portfolio-gallery');
    if (!galleryContainer) return;
    
    const artist = this.currentArtist;
    let galleryHTML = '';
    
    artist.portfolio.forEach(image => {
      const imageSrc = `../images/portfolio/${artist.slug}/${image.filename}`;
      galleryHTML += `
        <div class="portfolio-item" data-style="${image.style}">
          <img src="${imageSrc}" alt="${image.title}" class="portfolio-img" loading="lazy">
          <div class="portfolio-overlay">
            <div class="portfolio-info">
              <h4>${image.title}</h4>
              <p class="portfolio-style">${image.style}</p>
              <p class="portfolio-placement">${image.placement}</p>
              <p class="portfolio-time">${image.sessionTime}</p>
              <p class="portfolio-description">${image.description}</p>
            </div>
          </div>
        </div>
      `;
    });
    
    galleryContainer.innerHTML = galleryHTML;
    
    // Setup lightbox/modal functionality
    this.setupLightbox();
  },

  // Setup lightbox functionality
  setupLightbox: function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item img');
    
    portfolioItems.forEach(img => {
      img.addEventListener('click', function() {
        // Simple lightbox implementation
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox-overlay';
        lightbox.innerHTML = `
          <div class="lightbox-content">
            <img src="${this.src}" alt="${this.alt}" class="lightbox-img">
            <button class="lightbox-close">&times;</button>
          </div>
        `;
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close lightbox
        lightbox.querySelector('.lightbox-close').addEventListener('click', function() {
          document.body.removeChild(lightbox);
          document.body.style.overflow = '';
        });
        
        lightbox.addEventListener('click', function(e) {
          if (e.target === lightbox) {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
          }
        });
      });
    });
  },

  // Setup contact form with artist pre-selected
  setupContactForm: function() {
    const artistSelect = document.querySelector('#contact-artist');
    if (artistSelect && this.currentArtist) {
      artistSelect.value = this.currentArtist.slug;
    }
  }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  if (window.PortfolioPageManager) {
    window.PortfolioPageManager.init();
  }
});

// Simple CSS for lightbox (can be moved to main.css)
const lightboxCSS = `
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.lightbox-img {
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
}

.lightbox-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.lightbox-close:hover {
  opacity: 0.7;
}
`;

// Inject CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = lightboxCSS;
document.head.appendChild(styleSheet);