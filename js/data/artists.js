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
    extendedBio: 'Pagan brings over a decade of experience to traditional and neo-traditional tattooing, with a deep respect for the classic American tattoo tradition while incorporating modern techniques and color palettes. Known for bold line work, vibrant colors, and designs that will look just as good in 20 years as they do today.\n\nHis journey into tattooing began with a fascination for the rich history of American traditional work, studying under masters who taught him the importance of solid fundamentals. Over the years, Pagan has developed his signature style that bridges the gap between classic and contemporary, creating pieces that honor tradition while embracing innovation.\n\nWhether you\'re looking for a bold traditional eagle, a vibrant neo-traditional portrait, or something that blends both styles, Pagan\'s expertise ensures every tattoo tells a story that will stand the test of time.',
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
    testimonials: [
      {
        id: 1,
        name: 'Marcus Rodriguez',
        rating: 5,
        text: 'Pagan absolutely nailed my traditional eagle piece! The line work is incredibly clean and the colors are still vibrant after two years. True craftsman.',
        date: '2024-01-15',
        verified: true
      },
      {
        id: 2,
        name: 'Jessica Thompson',
        rating: 5,
        text: 'Got my neo-traditional rose from Pagan and I couldn\'t be happier. He really understands how to blend classic and modern styles perfectly.',
        date: '2024-02-20',
        verified: true
      },
      {
        id: 3,
        name: 'David Chen',
        rating: 5,
        text: 'Professional, clean studio, and amazing artwork. Pagan is a master of his craft and made the whole experience comfortable and enjoyable.',
        date: '2024-03-10',
        verified: true
      }
    ],
    featuredWork: [
      { portfolioId: 1, category: 'Best Traditional' },
      { portfolioId: 2, category: 'Neo-Traditional Excellence' }
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
    extendedBio: 'Jimmy has spent over 8 years perfecting the art of realistic tattooing, specializing in portraits, nature scenes, and detailed black and grey compositions. His meticulous attention to detail and understanding of light, shadow, and skin texture allows him to create tattoos that look like photographs. Each piece is carefully planned and executed over multiple sessions to achieve the highest level of realism.\n\nWhat sets Jimmy apart is his background in fine arts and his obsession with capturing emotion in every piece. He approaches each tattoo like a painting, considering composition, lighting, and the natural flow of the skin. His clients often say their tattoos look so realistic that people think they\'re looking at actual photographs.\n\nFrom memorial portraits to wildlife scenes, Jimmy\'s work speaks to the soul. He believes that realistic tattoos should not only capture a likeness but also tell a story and evoke the same emotions as the original subject.',
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
    testimonials: [
      {
        id: 1,
        name: 'Sarah Williams',
        rating: 5,
        text: 'Jimmy did a portrait of my late grandfather and I literally cried when I saw it. The detail and emotion he captured is unbelievable. It looks exactly like a photograph.',
        date: '2024-01-25',
        verified: true
      },
      {
        id: 2,
        name: 'Michael Anderson',
        rating: 5,
        text: 'Got a realistic wolf piece from Jimmy and people are constantly asking if it\'s real. His attention to detail is insane - worth every penny and every hour in the chair.',
        date: '2024-02-18',
        verified: true
      },
      {
        id: 3,
        name: 'Lisa Martinez',
        rating: 5,
        text: 'Jimmy is an absolute artist. His realistic work is museum quality. Professional, patient, and creates masterpieces that will last a lifetime.',
        date: '2024-03-05',
        verified: true
      }
    ],
    featuredWork: [
      { portfolioId: 5, category: 'Portrait Mastery' },
      { portfolioId: 11, category: 'Large Scale Realism' },
      { portfolioId: 3, category: 'Wildlife Excellence' }
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
    extendedBio: 'Micah specializes in the delicate art of fine line tattooing and geometric designs, bringing mathematical precision to organic forms. With 6+ years of experience, Micah has developed a signature style that combines minimalist aesthetics with complex geometric patterns. Each design is carefully planned to flow with the body\'s natural contours while maintaining perfect symmetry and proportion.\n\nWhat draws people to Micah\'s work is the perfect balance between simplicity and complexity. Their fine line work appears effortless but requires incredible skill and steady hands to execute. Every line must be perfect because there\'s nowhere to hide in minimalist design. Micah\'s geometric pieces often incorporate sacred geometry principles, creating tattoos that are both visually stunning and spiritually meaningful.\n\nMicah believes that less is more, but that doesn\'t mean less impactful. Each piece is designed to be timeless, elegant, and deeply personal to the wearer. Whether it\'s a delicate botanical fine line piece or an intricate mandala, every tattoo tells a story through precise, clean artistry.',
    socialMedia: {
      instagram: '@valhallatattoo',
      facebook: 'ValhallaStudio'
    },
    portfolio: [
      {
        id: 1,
        filename: 'geometric-mandala-back.jpg',
        title: 'Sacred Geometry Mandala',
        style: 'Geometric',
        placement: 'Upper Back',
        sessionTime: '5 hours',
        description: 'Intricate mandala incorporating sacred geometry principles with perfect symmetry',
        tags: ['geometric', 'mandala', 'sacred geometry', 'symmetry'],
        isHealed: true,
        uploadDate: new Date('2024-01-15')
      },
      {
        id: 2,
        filename: 'fine-line-botanical-wrist.jpg',
        title: 'Botanical Fine Line',
        style: 'Fine Line',
        placement: 'Wrist',
        sessionTime: '2 hours',
        description: 'Delicate botanical design with ultra-fine line work and organic flow',
        tags: ['fine line', 'botanical', 'delicate', 'organic'],
        isHealed: true,
        uploadDate: new Date('2024-01-22')
      },
      {
        id: 3,
        filename: 'geometric-sleeve-pattern.jpg',
        title: 'Geometric Sleeve Pattern',
        style: 'Geometric',
        placement: 'Forearm Sleeve',
        sessionTime: '6 hours',
        description: 'Complex geometric pattern designed to flow with arm contours',
        tags: ['geometric', 'sleeve', 'pattern', 'flow'],
        isHealed: true,
        uploadDate: new Date('2024-02-05')
      },
      {
        id: 4,
        filename: 'minimalist-mountain-range.jpg',
        title: 'Minimalist Mountain Range',
        style: 'Fine Line',
        placement: 'Ribcage',
        sessionTime: '3 hours',
        description: 'Simple yet striking mountain silhouette in fine line style',
        tags: ['fine line', 'minimalist', 'nature', 'mountain'],
        isHealed: true,
        uploadDate: new Date('2024-02-12')
      },
      {
        id: 5,
        filename: 'geometric-animal-fox.jpg',
        title: 'Geometric Fox Design',
        style: 'Geometric',
        placement: 'Thigh',
        sessionTime: '4 hours',
        description: 'Stylized fox composed of geometric shapes and clean lines',
        tags: ['geometric', 'animal', 'fox', 'stylized'],
        isHealed: true,
        uploadDate: new Date('2024-02-20')
      },
      {
        id: 6,
        filename: 'fine-line-constellation.jpg',
        title: 'Constellation Map',
        style: 'Fine Line',
        placement: 'Shoulder Blade',
        sessionTime: '2.5 hours',
        description: 'Detailed constellation map with connecting fine lines',
        tags: ['fine line', 'constellation', 'stars', 'celestial'],
        isHealed: true,
        uploadDate: new Date('2024-03-01')
      },
      {
        id: 7,
        filename: 'geometric-lotus-mandala.jpg',
        title: 'Lotus Geometric Mandala',
        style: 'Geometric',
        placement: 'Sternum',
        sessionTime: '4 hours',
        description: 'Lotus flower integrated with geometric mandala design',
        tags: ['geometric', 'lotus', 'mandala', 'spiritual'],
        isHealed: true,
        uploadDate: new Date('2024-03-08')
      },
      {
        id: 8,
        filename: 'minimalist-wave-line.jpg',
        title: 'Ocean Wave Line',
        style: 'Fine Line',
        placement: 'Ankle',
        sessionTime: '1.5 hours',
        description: 'Simple wave design with flowing fine line work',
        tags: ['fine line', 'wave', 'ocean', 'flow'],
        isHealed: true,
        uploadDate: new Date('2024-03-15')
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'Emma Collins',
        rating: 5,
        text: 'Micah is incredible with fine line work! My delicate floral piece healed perfectly and still looks amazing. Their attention to detail is unmatched.',
        date: '2024-02-10',
        verified: true
      },
      {
        id: 2,
        name: 'Alexander Kim',
        rating: 5,
        text: 'Got a geometric mandala from Micah and I\'m blown away. The precision and symmetry is perfect. True geometric artistry.',
        date: '2024-02-28',
        verified: true
      },
      {
        id: 3,
        name: 'Maya Patel',
        rating: 5,
        text: 'Micah understands minimalism like no other artist I\'ve met. My fine line constellation tattoo is exactly what I envisioned - simple but powerful.',
        date: '2024-03-12',
        verified: true
      }
    ],
    featuredWork: [
      { portfolioId: 1, category: 'Geometric Excellence' },
      { portfolioId: 6, category: 'Fine Line Mastery' },
      { portfolioId: 7, category: 'Spiritual Design' }
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
    extendedBio: 'Sarah brings a unique artistic perspective to tattooing with her background in fine arts and illustration. Specializing in watercolor techniques and illustrative styles, she creates tattoos that look like paintings on skin. Her work features flowing colors, organic shapes, and artistic compositions that celebrate the beauty of both traditional and contemporary art forms.\n\nWhat makes Sarah\'s work special is her ability to capture movement and emotion through color and form. Her watercolor pieces seem to flow naturally across the skin, with colors that blend and fade like real watercolor paintings. Her illustrative work combines technical skill with artistic vision, creating pieces that are both beautiful and meaningful.\n\nSarah believes that tattoos should be personal expressions of art that grow more beautiful with time. Her approach combines classical art training with modern tattoo techniques, resulting in pieces that are both contemporary and timeless. Each tattoo is a collaboration between artist and client, ensuring every piece is as unique as the person wearing it.',
    socialMedia: {
      instagram: '@valhallatattoo',
      facebook: 'ValhallaStudio'
    },
    portfolio: [
      {
        id: 1,
        filename: 'watercolor-floral-shoulder.jpg',
        title: 'Watercolor Peony Bloom',
        style: 'Watercolor',
        placement: 'Shoulder',
        sessionTime: '4 hours',
        description: 'Flowing watercolor peony with vibrant pinks and soft color bleeding',
        tags: ['watercolor', 'peony', 'floral', 'colorful'],
        isHealed: true,
        uploadDate: new Date('2024-01-20')
      },
      {
        id: 2,
        filename: 'illustrative-bird-hummingbird.jpg',
        title: 'Illustrative Hummingbird',
        style: 'Illustrative',
        placement: 'Forearm',
        sessionTime: '3 hours',
        description: 'Artistic hummingbird with flowing lines and watercolor accents',
        tags: ['illustrative', 'hummingbird', 'bird', 'artistic'],
        isHealed: true,
        uploadDate: new Date('2024-01-28')
      },
      {
        id: 3,
        filename: 'watercolor-butterfly-wing.jpg',
        title: 'Butterfly Wing Splash',
        style: 'Watercolor',
        placement: 'Upper Arm',
        sessionTime: '5 hours',
        description: 'Butterfly with watercolor wing details and abstract color splashes',
        tags: ['watercolor', 'butterfly', 'abstract', 'colorful'],
        isHealed: true,
        uploadDate: new Date('2024-02-05')
      },
      {
        id: 4,
        filename: 'illustrative-deer-forest.jpg',
        title: 'Forest Deer Silhouette',
        style: 'Illustrative',
        placement: 'Ribcage',
        sessionTime: '4 hours',
        description: 'Artistic deer silhouette with forest landscape illustration',
        tags: ['illustrative', 'deer', 'forest', 'nature'],
        isHealed: true,
        uploadDate: new Date('2024-02-12')
      },
      {
        id: 5,
        filename: 'watercolor-rose-abstract.jpg',
        title: 'Abstract Watercolor Rose',
        style: 'Watercolor',
        placement: 'Thigh',
        sessionTime: '4.5 hours',
        description: 'Rose with abstract watercolor background and flowing paint effects',
        tags: ['watercolor', 'rose', 'abstract', 'flowing'],
        isHealed: true,
        uploadDate: new Date('2024-02-20')
      },
      {
        id: 6,
        filename: 'illustrative-moon-phases.jpg',
        title: 'Lunar Phase Illustration',
        style: 'Illustrative',
        placement: 'Spine',
        sessionTime: '3 hours',
        description: 'Artistic interpretation of moon phases with celestial elements',
        tags: ['illustrative', 'moon', 'phases', 'celestial'],
        isHealed: true,
        uploadDate: new Date('2024-02-28')
      },
      {
        id: 7,
        filename: 'watercolor-feather-dreamcatcher.jpg',
        title: 'Watercolor Dreamcatcher',
        style: 'Watercolor',
        placement: 'Shoulder Blade',
        sessionTime: '5 hours',
        description: 'Dreamcatcher with watercolor feathers and soft color transitions',
        tags: ['watercolor', 'dreamcatcher', 'feathers', 'spiritual'],
        isHealed: true,
        uploadDate: new Date('2024-03-08')
      },
      {
        id: 8,
        filename: 'illustrative-botanical-branch.jpg',
        title: 'Botanical Branch Study',
        style: 'Illustrative',
        placement: 'Calf',
        sessionTime: '3.5 hours',
        description: 'Detailed botanical illustration of flowering branch',
        tags: ['illustrative', 'botanical', 'branch', 'detailed'],
        isHealed: true,
        uploadDate: new Date('2024-03-15')
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'Rachel Johnson',
        rating: 5,
        text: 'Sarah created the most beautiful watercolor piece I\'ve ever seen! The colors are so vibrant and the way they blend together is like magic. Pure artistry.',
        date: '2024-02-15',
        verified: true
      },
      {
        id: 2,
        name: 'Christopher Lee',
        rating: 5,
        text: 'My illustrative forest piece from Sarah is incredible. She has such a unique artistic vision and really understands how to make tattoos look like paintings.',
        date: '2024-03-02',
        verified: true
      },
      {
        id: 3,
        name: 'Amanda Foster',
        rating: 5,
        text: 'Sarah is a true artist. My watercolor butterfly looks like it could fly right off my skin. Her attention to color and detail is phenomenal.',
        date: '2024-03-18',
        verified: true
      }
    ],
    featuredWork: [
      { portfolioId: 3, category: 'Watercolor Excellence' },
      { portfolioId: 6, category: 'Illustrative Mastery' },
      { portfolioId: 7, category: 'Color Artistry' }
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
    extendedBio: 'Kason has dedicated over 9 years to studying and perfecting traditional Japanese tattooing techniques, including the art of tebori (hand-poking) and machine work. His deep respect for Japanese culture and artistic traditions shows in every piece, from small traditional motifs to full body suits. Kason combines traditional imagery with modern techniques to create tattoos that honor the rich history of Japanese tattooing.\n\nKason\'s journey into Japanese tattooing began with extensive study of the cultural significance behind every element - from the direction a dragon faces to the meaning of cherry blossom placement. He has spent years learning not just the techniques, but the stories, legends, and symbolism that make Japanese tattoos so powerful and meaningful.\n\nWhether creating a traditional dragon that wraps around the body with perfect flow, or a delicate cherry blossom branch that follows natural body contours, Kason ensures every piece respects the ancient traditions while being perfectly suited to modern life. His work is more than decoration - it\'s wearable cultural art that tells timeless stories.',
    socialMedia: {
      instagram: '@valhallatattoo',
      facebook: 'ValhallaStudio'
    },
    portfolio: [
      {
        id: 1,
        filename: 'japanese-dragon-back.jpg',
        title: 'Traditional Dragon Backpiece',
        style: 'Japanese',
        placement: 'Full Back',
        sessionTime: '15 hours',
        description: 'Traditional Japanese dragon with wind bars, clouds, and perfect flow across the back',
        tags: ['japanese', 'dragon', 'backpiece', 'traditional'],
        isHealed: true,
        uploadDate: new Date('2024-01-25')
      },
      {
        id: 2,
        filename: 'koi-fish-sleeve-color.jpg',
        title: 'Koi Fish Full Sleeve',
        style: 'Japanese',
        placement: 'Full Sleeve',
        sessionTime: '18 hours',
        description: 'Full sleeve featuring swimming koi, cherry blossoms, and traditional water elements',
        tags: ['japanese', 'koi', 'sleeve', 'cherry blossom'],
        isHealed: true,
        uploadDate: new Date('2024-02-10')
      },
      {
        id: 3,
        filename: 'japanese-tiger-thigh.jpg',
        title: 'Traditional Tiger',
        style: 'Japanese',
        placement: 'Thigh',
        sessionTime: '10 hours',
        description: 'Fierce traditional Japanese tiger with bamboo and wind elements',
        tags: ['japanese', 'tiger', 'bamboo', 'traditional'],
        isHealed: true,
        uploadDate: new Date('2024-02-20')
      },
      {
        id: 4,
        filename: 'cherry-blossom-branch.jpg',
        title: 'Sakura Branch',
        style: 'Japanese',
        placement: 'Shoulder to Elbow',
        sessionTime: '6 hours',
        description: 'Delicate cherry blossom branch following natural arm contours',
        tags: ['japanese', 'cherry blossom', 'sakura', 'delicate'],
        isHealed: true,
        uploadDate: new Date('2024-03-01')
      },
      {
        id: 5,
        filename: 'japanese-phoenix-chest.jpg',
        title: 'Phoenix Rising',
        style: 'Japanese',
        placement: 'Chest',
        sessionTime: '12 hours',
        description: 'Majestic phoenix with flowing feathers and traditional fire elements',
        tags: ['japanese', 'phoenix', 'fire', 'majestic'],
        isHealed: true,
        uploadDate: new Date('2024-03-08')
      },
      {
        id: 6,
        filename: 'oni-mask-traditional.jpg',
        title: 'Oni Mask',
        style: 'Japanese',
        placement: 'Upper Arm',
        sessionTime: '5 hours',
        description: 'Traditional oni demon mask with authentic coloring and detail',
        tags: ['japanese', 'oni', 'mask', 'demon'],
        isHealed: true,
        uploadDate: new Date('2024-03-15')
      },
      {
        id: 7,
        filename: 'japanese-waves-forearm.jpg',
        title: 'Traditional Wave Pattern',
        style: 'Japanese',
        placement: 'Forearm',
        sessionTime: '4 hours',
        description: 'Classic Japanese wave pattern with traditional blue gradients',
        tags: ['japanese', 'waves', 'water', 'traditional'],
        isHealed: true,
        uploadDate: new Date('2024-03-22')
      },
      {
        id: 8,
        filename: 'samurai-helmet-leg.jpg',
        title: 'Samurai Kabuto Helmet',
        style: 'Japanese',
        placement: 'Calf',
        sessionTime: '7 hours',
        description: 'Detailed samurai helmet with traditional armor elements',
        tags: ['japanese', 'samurai', 'helmet', 'armor'],
        isHealed: true,
        uploadDate: new Date('2024-03-28')
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'Daniel Suzuki',
        rating: 5,
        text: 'Kason is the real deal when it comes to Japanese tattoos. His knowledge of the culture and traditions behind each design is incredible. My dragon backpiece is a masterpiece.',
        date: '2024-02-25',
        verified: true
      },
      {
        id: 2,
        name: 'Maria Santos',
        rating: 5,
        text: 'Got my koi sleeve from Kason and it\'s absolutely stunning. He explained every element and its meaning. True respect for the art form.',
        date: '2024-03-12',
        verified: true
      },
      {
        id: 3,
        name: 'James Mitchell',
        rating: 5,
        text: 'Kason\'s attention to traditional Japanese detail is unmatched. My phoenix chest piece flows perfectly and the colors are incredible. Worth every session.',
        date: '2024-03-25',
        verified: true
      }
    ],
    featuredWork: [
      { portfolioId: 1, category: 'Traditional Excellence' },
      { portfolioId: 2, category: 'Full Sleeve Mastery' },
      { portfolioId: 5, category: 'Large Scale Work' }
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
    extendedBio: 'Heather has developed a reputation for creating some of the most beautiful script and ornamental work in the region. With 5+ years of focused experience in lettering, calligraphy, and decorative elements, she brings an eye for typography and ornamental design that transforms words and symbols into works of art. Her attention to spacing, flow, and decorative flourishes makes every piece uniquely beautiful.\n\nWhat sets Heather apart is her background in calligraphy and typography design. She understands that lettering tattoos are more than just writing on skin - they\'re about capturing emotion, personality, and meaning through the art of beautiful letterforms. Every curve, flourish, and spacing decision is deliberate and designed to enhance the meaning of the words.\n\nHeather believes that script tattoos should be as unique as the person wearing them. She works closely with each client to understand not just what they want to say, but how they want it to feel. Whether it\'s an elegant memorial piece, an empowering mantra, or decorative ornamental work, Heather creates tattoos that are both readable and artistically stunning.',
    socialMedia: {
      instagram: '@valhallatattoo',
      facebook: 'ValhallaStudio'
    },
    portfolio: [
      {
        id: 1,
        filename: 'elegant-script-ribcage.jpg',
        title: 'Cursive Memorial Script',
        style: 'Script',
        placement: 'Ribcage',
        sessionTime: '2.5 hours',
        description: 'Elegant cursive memorial script with delicate flourishes and perfect spacing',
        tags: ['script', 'cursive', 'memorial', 'elegant'],
        isHealed: true,
        uploadDate: new Date('2024-01-18')
      },
      {
        id: 2,
        filename: 'ornamental-mandala-back.jpg',
        title: 'Sacred Ornamental Mandala',
        style: 'Ornamental',
        placement: 'Upper Back',
        sessionTime: '6 hours',
        description: 'Intricate ornamental mandala with sacred geometry and detailed line work',
        tags: ['ornamental', 'mandala', 'sacred', 'detailed'],
        isHealed: true,
        uploadDate: new Date('2024-01-25')
      },
      {
        id: 3,
        filename: 'calligraphy-quote-forearm.jpg',
        title: 'Calligraphy Quote',
        style: 'Script',
        placement: 'Forearm',
        sessionTime: '3 hours',
        description: 'Inspirational quote in modern calligraphy style with flowing letterforms',
        tags: ['script', 'calligraphy', 'quote', 'inspirational'],
        isHealed: true,
        uploadDate: new Date('2024-02-05')
      },
      {
        id: 4,
        filename: 'decorative-border-wrist.jpg',
        title: 'Ornamental Wrist Band',
        style: 'Ornamental',
        placement: 'Wrist',
        sessionTime: '2 hours',
        description: 'Delicate ornamental border design wrapping around the wrist',
        tags: ['ornamental', 'border', 'wrist', 'delicate'],
        isHealed: true,
        uploadDate: new Date('2024-02-12')
      },
      {
        id: 5,
        filename: 'gothic-lettering-shoulder.jpg',
        title: 'Gothic Lettering',
        style: 'Script',
        placement: 'Shoulder',
        sessionTime: '4 hours',
        description: 'Bold gothic lettering with ornamental accents and traditional styling',
        tags: ['script', 'gothic', 'bold', 'traditional'],
        isHealed: true,
        uploadDate: new Date('2024-02-20')
      },
      {
        id: 6,
        filename: 'filigree-sternum.jpg',
        title: 'Filigree Sternum Piece',
        style: 'Ornamental',
        placement: 'Sternum',
        sessionTime: '4 hours',
        description: 'Intricate filigree design with flowing ornamental patterns',
        tags: ['ornamental', 'filigree', 'intricate', 'flowing'],
        isHealed: true,
        uploadDate: new Date('2024-02-28')
      },
      {
        id: 7,
        filename: 'handwritten-script-ankle.jpg',
        title: 'Handwritten Script',
        style: 'Script',
        placement: 'Ankle',
        sessionTime: '1.5 hours',
        description: 'Personal handwritten-style script with natural, flowing letterforms',
        tags: ['script', 'handwritten', 'personal', 'natural'],
        isHealed: true,
        uploadDate: new Date('2024-03-08')
      },
      {
        id: 8,
        filename: 'ornamental-corner-shoulder.jpg',
        title: 'Ornamental Corner Design',
        style: 'Ornamental',
        placement: 'Shoulder',
        sessionTime: '3 hours',
        description: 'Decorative corner ornament with Victorian-inspired flourishes',
        tags: ['ornamental', 'corner', 'victorian', 'decorative'],
        isHealed: true,
        uploadDate: new Date('2024-03-15')
      }
    ],
    testimonials: [
      {
        id: 1,
        name: 'Jennifer Walsh',
        rating: 5,
        text: 'Heather did the most beautiful memorial script for my grandmother. The lettering is perfect and the flourishes are exactly what I wanted. So grateful for her artistry.',
        date: '2024-02-22',
        verified: true
      },
      {
        id: 2,
        name: 'Tyler Brooks',
        rating: 5,
        text: 'My ornamental mandala from Heather is incredible. The detail and precision in every line is amazing. She really understands how to make decorative work flow with your body.',
        date: '2024-03-05',
        verified: true
      },
      {
        id: 3,
        name: 'Sophia Rivera',
        rating: 5,
        text: 'Heather has such an eye for beautiful lettering. My quote tattoo looks like it was hand-lettered by a master calligrapher. Perfect spacing and flow.',
        date: '2024-03-18',
        verified: true
      }
    ],
    featuredWork: [
      { portfolioId: 2, category: 'Ornamental Excellence' },
      { portfolioId: 3, category: 'Script Mastery' },
      { portfolioId: 6, category: 'Decorative Artistry' }
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

// Provide default export for convenience when importing the entire dataset
export default artistsData;
