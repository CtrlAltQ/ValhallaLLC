/**
 * Artist Data Structure
 * Contains artist profiles, portfolio data, and social media information
 */

export const artistsData = {
  pagan: {
    id: 'pagan',
    slug: 'pagan',
    name: 'Pagan',
    specialty: 'Traditional & Neo-Traditional',
    experience: '10+ years',
    bio: 'Specializing in bold traditional and neo-traditional tattoos with vibrant colors and timeless designs.',
    extendedBio: 'Pagan brings over a decade of experience to traditional and neo-traditional tattooing, with a deep respect for the classic American tattoo tradition while incorporating modern techniques and color palettes. Known for bold line work, vibrant colors, and designs that will look just as good in 20 years as they do today.',
    socialMedia: {
      instagram: '@valhallatattoo',
      facebook: 'ValhallaStudio'
    },
    portfolio: [
      // Sample portfolio items - will be populated with actual images
      {
        id: 1,
        filename: 'traditional-rose.jpg',
        title: 'Traditional Rose',
        style: 'Traditional',
        placement: 'Forearm',
        sessionTime: '3 hours',
        description: 'Classic traditional rose with bold lines and vibrant colors',
        tags: ['traditional', 'rose', 'color'],
        isHealed: true,
        uploadDate: new Date('2024-01-10')
      },
      {
        id: 2,
        filename: 'neo-traditional-skull.jpg',
        title: 'Neo-Traditional Skull',
        style: 'Neo-Traditional',
        placement: 'Upper Arm',
        sessionTime: '5 hours',
        description: 'Modern take on traditional skull design with enhanced shading',
        tags: ['neo-traditional', 'skull', 'modern'],
        isHealed: true,
        uploadDate: new Date('2024-01-25')
      }
    ],
    seoData: {
      title: 'Pagan - Traditional Tattoo Artist | Valhalla Tattoo',
      description: 'View Pagan\'s traditional and neo-traditional tattoo portfolio at Valhalla Tattoo in Spring Hill, TN.',
      keywords: ['traditional tattoos', 'neo-traditional', 'tattoo artist', 'Spring Hill TN']
    }
  },
  
  jimmy: {
    id: 'jimmy',
    slug: 'jimmy',
    name: 'Jimmy',
    specialty: 'Realism & Black & Grey',
    experience: '8+ years',
    bio: 'Master of photorealistic tattoos and intricate black and grey work that brings images to life on skin.',
    extendedBio: 'Jimmy has spent over 8 years perfecting the art of realistic tattooing, specializing in portraits, nature scenes, and detailed black and grey compositions. His meticulous attention to detail and understanding of light, shadow, and skin texture allows him to create tattoos that look like photographs. Each piece is carefully planned and executed over multiple sessions to achieve the highest level of realism.',
    socialMedia: {
      instagram: '@valhallatattoo',
      facebook: 'ValhallaStudio'
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
        tags: ['realism', 'black and grey', 'portrait'],
        isHealed: true,
        uploadDate: new Date('2024-01-15')
      },
      {
        id: 2,
        filename: 'FB_IMG_1754792184630.jpg',
        title: 'Black & Grey Portrait',
        style: 'Black & Grey',
        placement: 'Shoulder',
        sessionTime: '4 hours',
        description: 'Stunning black and grey portrait work',
        tags: ['portrait', 'black and grey', 'realism'],
        isHealed: true,
        uploadDate: new Date('2024-01-20')
      },
      {
        id: 3,
        filename: 'FB_IMG_1754792186833.jpg',
        title: 'Realistic Animal Portrait',
        style: 'Realism',
        placement: 'Forearm',
        sessionTime: '5 hours',
        description: 'Lifelike animal portrait with incredible detail',
        tags: ['animal', 'realism', 'black and grey'],
        isHealed: true,
        uploadDate: new Date('2024-02-01')
      },
      {
        id: 4,
        filename: 'FB_IMG_1754792189094.jpg',
        title: 'Detailed Character Work',
        style: 'Realism',
        placement: 'Leg',
        sessionTime: '7 hours',
        description: 'Complex character tattoo with fine shading',
        tags: ['character', 'realism', 'detailed'],
        isHealed: true,
        uploadDate: new Date('2024-02-10')
      },
      {
        id: 5,
        filename: 'FB_IMG_1754792191890.jpg',
        title: 'Photorealistic Portrait',
        style: 'Realism',
        placement: 'Back',
        sessionTime: '8 hours',
        description: 'Photorealistic portrait showcasing technical skill',
        tags: ['portrait', 'photorealism', 'black and grey'],
        isHealed: true,
        uploadDate: new Date('2024-02-15')
      },
      {
        id: 6,
        filename: 'FB_IMG_1754792208078.jpg',
        title: 'Intricate Detail Work',
        style: 'Black & Grey',
        placement: 'Chest',
        sessionTime: '6 hours',
        description: 'Highly detailed black and grey composition',
        tags: ['detailed', 'black and grey', 'composition'],
        isHealed: true,
        uploadDate: new Date('2024-02-20')
      },
      {
        id: 7,
        filename: 'FB_IMG_1754792232185.jpg',
        title: 'Realistic Scene',
        style: 'Realism',
        placement: 'Thigh',
        sessionTime: '9 hours',
        description: 'Complex realistic scene with multiple elements',
        tags: ['scene', 'realism', 'complex'],
        isHealed: true,
        uploadDate: new Date('2024-03-01')
      },
      {
        id: 8,
        filename: 'FB_IMG_1754792253508.jpg',
        title: 'Fine Line Realism',
        style: 'Realism',
        placement: 'Arm',
        sessionTime: '5 hours',
        description: 'Delicate realistic work with fine line details',
        tags: ['fine line', 'realism', 'delicate'],
        isHealed: true,
        uploadDate: new Date('2024-03-05')
      },
      {
        id: 9,
        filename: 'FB_IMG_1754792255949.jpg',
        title: 'Portrait Study',
        style: 'Black & Grey',
        placement: 'Forearm',
        sessionTime: '4 hours',
        description: 'Beautiful portrait study in black and grey',
        tags: ['portrait', 'study', 'black and grey'],
        isHealed: true,
        uploadDate: new Date('2024-03-10')
      },
      {
        id: 10,
        filename: 'FB_IMG_1754792270756.jpg',
        title: 'Detailed Character',
        style: 'Realism',
        placement: 'Calf',
        sessionTime: '6 hours',
        description: 'Detailed character work with shading mastery',
        tags: ['character', 'detailed', 'shading'],
        isHealed: true,
        uploadDate: new Date('2024-03-15')
      },
      {
        id: 11,
        filename: 'FB_IMG_1754792295914.jpg',
        title: 'Masterpiece Realism',
        style: 'Realism',
        placement: 'Back Piece',
        sessionTime: '12 hours',
        description: 'Large-scale realistic masterpiece showcasing technical excellence',
        tags: ['masterpiece', 'large scale', 'realism'],
        isHealed: true,
        uploadDate: new Date('2024-03-20')
      }
    ],
    seoData: {
      title: 'Jimmy - Realism Tattoo Artist | Valhalla Tattoo',
      description: 'View Jimmy\'s realistic and black & grey tattoo portfolio at Valhalla Tattoo in Spring Hill, TN.',
      keywords: ['realistic tattoos', 'black and grey', 'tattoo artist', 'Spring Hill TN']
    }
  },

  micah: {
    id: 'micah',
    slug: 'micah',
    name: 'Micah',
    specialty: 'Fine Line & Geometric',
    experience: '6+ years',
    bio: 'Creating delicate fine line work and precise geometric designs with mathematical precision and artistic flair.',
    extendedBio: 'Micah specializes in the delicate art of fine line tattooing and geometric designs, bringing mathematical precision to organic forms. With 6+ years of experience, Micah has developed a signature style that combines minimalist aesthetics with complex geometric patterns. Each design is carefully planned to flow with the body\'s natural contours while maintaining perfect symmetry and proportion.',
    socialMedia: {
      instagram: '@valhallatattoo',
      facebook: 'ValhallaStudio'
    },
    portfolio: [
      // Sample portfolio items - will be populated with actual images
      {
        id: 1,
        filename: 'geometric-mandala.jpg',
        title: 'Geometric Mandala',
        style: 'Geometric',
        placement: 'Back',
        sessionTime: '4 hours',
        description: 'Intricate geometric mandala with precise line work',
        tags: ['geometric', 'mandala', 'precise'],
        isHealed: true,
        uploadDate: new Date('2024-02-05')
      },
      {
        id: 2,
        filename: 'fine-line-floral.jpg',
        title: 'Fine Line Floral',
        style: 'Fine Line',
        placement: 'Wrist',
        sessionTime: '2 hours',
        description: 'Delicate floral design with ultra-fine line work',
        tags: ['fine line', 'floral', 'delicate'],
        isHealed: true,
        uploadDate: new Date('2024-02-12')
      }
    ],
    seoData: {
      title: 'Micah - Fine Line Tattoo Artist | Valhalla Tattoo',
      description: 'View Micah\'s fine line and geometric tattoo portfolio at Valhalla Tattoo in Spring Hill, TN.',
      keywords: ['fine line tattoos', 'geometric tattoos', 'tattoo artist', 'Spring Hill TN']
    }
  },

  sarah: {
    id: 'sarah',
    slug: 'sarah',
    name: 'Sarah',
    specialty: 'Watercolor & Illustrative',
    experience: '7+ years',
    bio: 'Creating vibrant watercolor tattoos and illustrative designs that blur the line between art and skin.',
    extendedBio: 'Sarah brings a unique artistic perspective to tattooing with her background in fine arts and illustration. Specializing in watercolor techniques and illustrative styles, she creates tattoos that look like paintings on skin. Her work features flowing colors, organic shapes, and artistic compositions that celebrate the beauty of both traditional and contemporary art forms.',
    socialMedia: {
      instagram: '@valhallatattoo',
      facebook: 'ValhallaStudio'
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
        tags: ['watercolor', 'floral', 'colorful'],
        isHealed: true,
        uploadDate: new Date('2024-01-20')
      },
      {
        id: 2,
        filename: 'illustrative-bird.jpg',
        title: 'Illustrative Bird',
        style: 'Illustrative',
        placement: 'Forearm',
        sessionTime: '3 hours',
        description: 'Artistic bird illustration with flowing lines and color accents',
        tags: ['illustrative', 'bird', 'artistic'],
        isHealed: true,
        uploadDate: new Date('2024-02-05')
      }
    ],
    seoData: {
      title: 'Sarah - Watercolor Tattoo Artist | Valhalla Tattoo',
      description: 'View Sarah\'s watercolor and illustrative tattoo portfolio at Valhalla Tattoo in Spring Hill, TN.',
      keywords: ['watercolor tattoos', 'illustrative tattoos', 'tattoo artist', 'Spring Hill TN']
    }
  },

  kason: {
    id: 'kason',
    slug: 'kason',
    name: 'Kason',
    specialty: 'Japanese & Oriental',
    experience: '9+ years',
    bio: 'Master of traditional Japanese tattooing techniques and oriental design aesthetics.',
    extendedBio: 'Kason has dedicated over 9 years to studying and perfecting traditional Japanese tattooing techniques, including the art of tebori (hand-poking) and machine work. His deep respect for Japanese culture and artistic traditions shows in every piece, from small traditional motifs to full body suits. Kason combines traditional imagery with modern techniques to create tattoos that honor the rich history of Japanese tattooing.',
    socialMedia: {
      instagram: '@valhallatattoo',
      facebook: 'ValhallaStudio'
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
        tags: ['japanese', 'dragon', 'traditional'],
        isHealed: true,
        uploadDate: new Date('2024-01-25')
      },
      {
        id: 2,
        filename: 'koi-sleeve.jpg',
        title: 'Koi Fish Sleeve',
        style: 'Japanese',
        placement: 'Full Sleeve',
        sessionTime: '12 hours',
        description: 'Full sleeve featuring koi fish, cherry blossoms, and water elements',
        tags: ['japanese', 'koi', 'sleeve'],
        isHealed: true,
        uploadDate: new Date('2024-02-10')
      }
    ],
    seoData: {
      title: 'Kason - Japanese Tattoo Artist | Valhalla Tattoo',
      description: 'View Kason\'s traditional Japanese and oriental tattoo portfolio at Valhalla Tattoo in Spring Hill, TN.',
      keywords: ['japanese tattoos', 'oriental tattoos', 'tattoo artist', 'Spring Hill TN']
    }
  },

  heather: {
    id: 'heather',
    slug: 'heather',
    name: 'Heather',
    specialty: 'Script & Ornamental',
    experience: '5+ years',
    bio: 'Specializing in beautiful script work, ornamental designs, and decorative tattoo elements.',
    extendedBio: 'Heather has developed a reputation for creating some of the most beautiful script and ornamental work in the region. With 5+ years of focused experience in lettering, calligraphy, and decorative elements, she brings an eye for typography and ornamental design that transforms words and symbols into works of art. Her attention to spacing, flow, and decorative flourishes makes every piece uniquely beautiful.',
    socialMedia: {
      instagram: '@valhallatattoo',
      facebook: 'ValhallaStudio'
    },
    portfolio: [
      {
        id: 1,
        filename: 'script-design.jpg',
        title: 'Elegant Script',
        style: 'Script',
        placement: 'Ribcage',
        sessionTime: '2 hours',
        description: 'Beautiful script lettering with ornamental flourishes',
        tags: ['script', 'lettering', 'ornamental'],
        isHealed: true,
        uploadDate: new Date('2024-02-01')
      },
      {
        id: 2,
        filename: 'mandala-ornamental.jpg',
        title: 'Ornamental Mandala',
        style: 'Ornamental',
        placement: 'Upper Back',
        sessionTime: '5 hours',
        description: 'Intricate ornamental mandala with detailed line work',
        tags: ['ornamental', 'mandala', 'detailed'],
        isHealed: true,
        uploadDate: new Date('2024-02-15')
      }
    ],
    seoData: {
      title: 'Heather - Script & Ornamental Tattoo Artist | Valhalla Tattoo',
      description: 'View Heather\'s script and ornamental tattoo portfolio at Valhalla Tattoo in Spring Hill, TN.',
      keywords: ['script tattoos', 'ornamental tattoos', 'lettering', 'tattoo artist', 'Spring Hill TN']
    }
  }
};

export const portfolioImageStructure = {
  id: 0,
  filename: '',
  title: '',
  style: '',
  placement: '',
  sessionTime: '',
  description: '',
  tags: [],
  isHealed: false,
  uploadDate: new Date()
};

/**
 * Artist Data Management Functions
 */

// Get all artists
export function getAllArtists() {
  return Object.values(artistsData);
}

// Get artist by slug
export function getArtistBySlug(slug) {
  return artistsData[slug] || null;
}

// Get artist portfolio with image URLs
export function getArtistPortfolio(slug) {
  const artist = getArtistBySlug(slug);
  if (!artist) return [];

  return artist.portfolio.map(image => ({
    ...image,
    src: `images/portfolio/${slug}/${image.filename}`,
    thumbnail: `images/portfolio/${slug}/${image.filename}`, // Could be optimized thumbnails
    placeholder: generatePlaceholder(400, 300)
  }));
}

// Get all portfolio images across all artists
export function getAllPortfolioImages() {
  const allImages = [];
  
  Object.keys(artistsData).forEach(slug => {
    const artistPortfolio = getArtistPortfolio(slug);
    artistPortfolio.forEach(image => {
      allImages.push({
        ...image,
        artist: artistsData[slug].name,
        artistSlug: slug
      });
    });
  });

  return allImages.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
}

// Filter portfolio images by style
export function getPortfolioByStyle(style) {
  return getAllPortfolioImages().filter(image => 
    image.style.toLowerCase().includes(style.toLowerCase()) ||
    image.tags.some(tag => tag.toLowerCase().includes(style.toLowerCase()))
  );
}

// Filter portfolio images by tags
export function getPortfolioByTags(tags) {
  const searchTags = Array.isArray(tags) ? tags : [tags];
  return getAllPortfolioImages().filter(image =>
    searchTags.some(tag => 
      image.tags.some(imageTag => 
        imageTag.toLowerCase().includes(tag.toLowerCase())
      )
    )
  );
}

// Get featured portfolio images (most recent or marked as featured)
export function getFeaturedPortfolio(limit = 12) {
  return getAllPortfolioImages()
    .slice(0, limit);
}

// Search portfolio images
export function searchPortfolio(query) {
  const searchTerm = query.toLowerCase();
  return getAllPortfolioImages().filter(image =>
    image.title.toLowerCase().includes(searchTerm) ||
    image.description.toLowerCase().includes(searchTerm) ||
    image.style.toLowerCase().includes(searchTerm) ||
    image.artist.toLowerCase().includes(searchTerm) ||
    image.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

// Validate portfolio image data
export function validatePortfolioImage(imageData) {
  const errors = [];
  
  if (!imageData.filename) errors.push('Filename is required');
  if (!imageData.title) errors.push('Title is required');
  if (!imageData.style) errors.push('Style is required');
  if (!Array.isArray(imageData.tags)) errors.push('Tags must be an array');
  if (!imageData.uploadDate || !(imageData.uploadDate instanceof Date)) {
    errors.push('Valid upload date is required');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

// Generate placeholder image data URL
export function generatePlaceholder(width = 400, height = 300, color = '#333') {
  return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3Crect width="${width}" height="${height}" fill="${color}"/%3E%3C/svg%3E`;
}

// Cache management for performance
class PortfolioCache {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  get(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  clear() {
    this.cache.clear();
  }
}

export const portfolioCache = new PortfolioCache();