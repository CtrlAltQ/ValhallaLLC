/**
 * Artist Data Structure
 * Contains artist profiles, portfolio data, and social media information
 */

export const artistsData = {
  pagan: {
    id: 'pagan',
    slug: 'pagan',
    name: 'Pagan',
    specialty: 'Fine Line, Traditional, Black & Grey, Norse/Viking',
    experience: '10+ years',
    bio: 'Hi, I\'m Pagan. Originally from Murfreesboro, Tennessee, I moved to Spring Hill in 1990 and have watched this little town grow into what it is today.',
    extendedBio: 'Hi, I\'m Pagan. Originally from Murfreesboro, Tennessee, I moved to Spring Hill, Tennessee, in 1990 and have watched this little town grow into what it is today. I learned how to tattoo in Columbia, Tennessee, and have been tattooing for about a decade. I feel tattooing chose me. Even though I drew as a kid, tattooing was never on my radar—but it quickly became my passion. I specialize in fine line work, American traditional, black-and-gray, and Norse/Viking-inspired tattoos.\n\nI love sitting down with clients to brainstorm their ideas so we\'re always on the same page, creating tattoos that tell their stories. I enjoy working on bigger pieces, but small tattoos are where the artistry really shines. My goal is to cultivate a relaxing, joyful environment for every client, making each session an experience to enjoy.\n\nOutside the studio, I love spending time outdoors, riding motorcycles, giving back to the community, and most importantly, spending time with my son.',
    socialMedia: {
      instagram: '@valhallatattoo',
      facebook: 'ValhallaStudio'
    },
    portfolio: [
      {
        id: 1,
        filename: '20250729_145017.jpg',
        title: 'Custom Traditional Design',
        style: 'Traditional',
        placement: 'Arm',
        sessionTime: '4 hours',
        description: 'Custom traditional tattoo design with bold lines',
        tags: ['traditional', 'custom'],
        isHealed: true,
        uploadDate: new Date('2024-07-29')
      },
      {
        id: 2,
        filename: 'IMG_3111.jpg',
        title: 'Black and Grey Work',
        style: 'Black & Grey',
        placement: 'Forearm',
        sessionTime: '3 hours',
        description: 'Detailed black and grey tattoo',
        tags: ['black-grey', 'detailed'],
        isHealed: true,
        uploadDate: new Date('2024-01-15')
      },
      {
        id: 3,
        filename: 'IMG_3129.jpg',
        title: 'Fine Line Art',
        style: 'Fine Line',
        placement: 'Arm',
        sessionTime: '3 hours',
        description: 'Intricate fine line tattoo work',
        tags: ['fine-line', 'detailed'],
        isHealed: true,
        uploadDate: new Date('2024-01-20')
      },
      {
        id: 4,
        filename: 'image0(1).jpeg',
        title: 'Traditional Piece',
        style: 'Traditional',
        placement: 'Shoulder',
        sessionTime: '5 hours',
        description: 'Bold traditional tattoo with vibrant colors',
        tags: ['traditional', 'color'],
        isHealed: true,
        uploadDate: new Date('2024-02-01')
      },
      {
        id: 5,
        filename: 'image0(3).jpeg',
        title: 'Norse-Inspired Design',
        style: 'Norse/Viking',
        placement: 'Back',
        sessionTime: '6 hours',
        description: 'Norse-inspired tattoo with traditional elements',
        tags: ['norse', 'viking', 'traditional'],
        isHealed: true,
        uploadDate: new Date('2024-02-10')
      },
      {
        id: 6,
        filename: 'image1(2).jpeg',
        title: 'Detailed Black Work',
        style: 'Black & Grey',
        placement: 'Leg',
        sessionTime: '4 hours',
        description: 'Detailed black and grey composition',
        tags: ['black-grey', 'detailed'],
        isHealed: true,
        uploadDate: new Date('2024-02-15')
      },
      {
        id: 7,
        filename: 'image1.jpeg',
        title: 'Fine Line Portrait',
        style: 'Fine Line',
        placement: 'Forearm',
        sessionTime: '4 hours',
        description: 'Delicate fine line portrait work',
        tags: ['fine-line', 'portrait'],
        isHealed: true,
        uploadDate: new Date('2024-02-20')
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
    testimonials: [],
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
        filename: 'MIkah_creation_F51EDE92-0E39-4170-B60F-C9A4571A860D.jpeg',
        title: 'Fine Line Creation',
        style: 'Fine Line',
        placement: 'Arm',
        sessionTime: '3 hours',
        description: 'Delicate fine line work showcasing precision and artistic detail',
        tags: ['fine line', 'detailed', 'artistic'],
        isHealed: true,
        uploadDate: new Date('2024-01-15')
      },
      {
        id: 2,
        filename: 'Micah_creation_263C33BD-0726-46E3-8FE0-E7BD0C494296.jpeg',
        title: 'Geometric Design',
        style: 'Geometric',
        placement: 'Forearm',
        sessionTime: '4 hours',
        description: 'Precise geometric patterns with mathematical accuracy',
        tags: ['geometric', 'precision', 'mathematical'],
        isHealed: true,
        uploadDate: new Date('2024-01-22')
      },
      {
        id: 3,
        filename: 'Micah_creation_3101BC6C-B9BD-4C12-AEF6-9B1667A9C184.jpeg',
        title: 'Artistic Composition',
        style: 'Fine Line',
        placement: 'Upper Arm',
        sessionTime: '2.5 hours',
        description: 'Artistic fine line composition with flowing elements',
        tags: ['fine line', 'artistic', 'flowing'],
        isHealed: true,
        uploadDate: new Date('2024-02-05')
      },
      {
        id: 4,
        filename: 'Micah_creation_4C1CC18F-1D13-4E87-8BCF-23C95B16FC2A.jpeg',
        title: 'Detailed Line Work',
        style: 'Fine Line',
        placement: 'Wrist',
        sessionTime: '3 hours',
        description: 'Intricate fine line work with careful attention to detail',
        tags: ['fine line', 'intricate', 'detailed'],
        isHealed: true,
        uploadDate: new Date('2024-02-12')
      },
      {
        id: 5,
        filename: 'Micah_creation_51D6B834-A69A-4429-BD20-FDFF80B50B83.jpeg',
        title: 'Geometric Pattern',
        style: 'Geometric',
        placement: 'Shoulder',
        sessionTime: '4 hours',
        description: 'Complex geometric pattern with perfect symmetry',
        tags: ['geometric', 'pattern', 'symmetry'],
        isHealed: true,
        uploadDate: new Date('2024-02-20')
      },
      {
        id: 6,
        filename: 'Micah_creation_7332848750778413037.jpeg',
        title: 'Fine Line Art',
        style: 'Fine Line',
        placement: 'Back',
        sessionTime: '5 hours',
        description: 'Beautiful fine line artwork with organic flow',
        tags: ['fine line', 'artwork', 'organic'],
        isHealed: true,
        uploadDate: new Date('2024-03-01')
      },
      {
        id: 7,
        filename: 'Micah_creation_7332848750782917803.jpeg',
        title: 'Minimalist Design',
        style: 'Fine Line',
        placement: 'Ankle',
        sessionTime: '2 hours',
        description: 'Elegant minimalist design with clean lines',
        tags: ['fine line', 'minimalist', 'elegant'],
        isHealed: true,
        uploadDate: new Date('2024-03-08')
      },
      {
        id: 8,
        filename: 'Micah_creation_7332848750783349603.jpeg',
        title: 'Geometric Composition',
        style: 'Geometric',
        placement: 'Thigh',
        sessionTime: '4 hours',
        description: 'Sophisticated geometric composition with precise execution',
        tags: ['geometric', 'sophisticated', 'precise'],
        isHealed: true,
        uploadDate: new Date('2024-03-15')
      },
      {
        id: 9,
        filename: 'Micah_creation_7332848750784236948.jpeg',
        title: 'Artistic Line Work',
        style: 'Fine Line',
        placement: 'Ribcage',
        sessionTime: '3 hours',
        description: 'Artistic fine line work with beautiful composition',
        tags: ['fine line', 'artistic', 'composition'],
        isHealed: true,
        uploadDate: new Date('2024-03-20')
      },
      {
        id: 10,
        filename: 'Micah_creation_CCAB9748-CB96-4E28-B528-D89253D97CB4.jpeg',
        title: 'Detailed Creation',
        style: 'Fine Line',
        placement: 'Leg',
        sessionTime: '3.5 hours',
        description: 'Meticulously detailed creation with fine line precision',
        tags: ['fine line', 'detailed', 'meticulous'],
        isHealed: true,
        uploadDate: new Date('2024-03-25')
      },
      {
        id: 11,
        filename: 'Mikah_creation_7332848750783349603 2.jpeg',
        title: 'Geometric Art',
        style: 'Geometric',
        placement: 'Forearm',
        sessionTime: '4 hours',
        description: 'Geometric art piece with mathematical precision',
        tags: ['geometric', 'art', 'mathematical'],
        isHealed: true,
        uploadDate: new Date('2024-04-01')
      },
      {
        id: 12,
        filename: 'Mikah_creation_D59A6904-6065-4078-A0AE-B8889D4DB6DD.jpeg',
        title: 'Fine Line Masterpiece',
        style: 'Fine Line',
        placement: 'Upper Back',
        sessionTime: '5 hours',
        description: 'Fine line masterpiece showcasing artistic expertise',
        tags: ['fine line', 'masterpiece', 'artistic'],
        isHealed: true,
        uploadDate: new Date('2024-04-05')
      }
    ],
    testimonials: [],
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
    portfolio: [],
    testimonials: [],
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
    specialty: 'Black & Grey Realism, Portraits, Anime/Cartoon',
    experience: '4+ years',
    bio: 'Tattooing isn\'t just what I do—it\'s who I am. For 4 years I\'ve been perfecting my craft, specializing in black and grey realism, smooth shading, portraits, and bold anime/cartoon styles.',
    extendedBio: 'Tattooing isn\'t just what I do—it\'s who I am. For 4 years I\'ve been perfecting my craft, specializing in black and grey realism, smooth shading, portraits, and bold anime/cartoon styles. Since 2021, Valhalla Tattoo has been my only shop, my creative home, and where I\'ve built lasting connections through ink that tells a story.\n\nEvery piece I create is about bringing visions to life—whether it\'s a lifelike portrait, striking realism, or artwork with that animated edge. My mission is simple: tattoos that don\'t just look good, but live with you.\n\nOutside the shop, I\'m a dedicated single parent to my 12-year-old son—he\'s my reason, my drive, and the source of the grind behind every tattoo I do.\n\nLet\'s create something unforgettable.',
    socialMedia: {
      instagram: '@valhallatattoo',
      facebook: 'ValhallaStudio'
    },
    portfolio: [
      {
        id: 1,
        filename: 'IMG_20250610_143911_compressed.jpeg',
        title: 'Realism Portrait Work',
        style: 'Black & Grey Realism',
        placement: 'Arm',
        sessionTime: '6 hours',
        description: 'Detailed black and grey realism showcasing smooth shading technique',
        tags: ['realism', 'black and grey', 'portrait', 'shading'],
        isHealed: true,
        uploadDate: new Date('2024-01-15')
      },
      {
        id: 2,
        filename: 'kason1.jpeg',
        title: 'Character Portrait',
        style: 'Black & Grey',
        placement: 'Forearm',
        sessionTime: '5 hours',
        description: 'Detailed character work with smooth black and grey shading',
        tags: ['character', 'black and grey', 'portrait', 'detailed'],
        isHealed: true,
        uploadDate: new Date('2024-01-20')
      },
      {
        id: 3,
        filename: 'kason4.jpeg',
        title: 'Realistic Portrait',
        style: 'Realism',
        placement: 'Upper Arm',
        sessionTime: '7 hours',
        description: 'Photorealistic portrait work with incredible detail and shading',
        tags: ['realism', 'portrait', 'photorealistic', 'detailed'],
        isHealed: true,
        uploadDate: new Date('2024-01-25')
      },
      {
        id: 4,
        filename: 'Kason_Bear.jpeg',
        title: 'Bear Portrait',
        style: 'Black & Grey Realism',
        placement: 'Shoulder',
        sessionTime: '8 hours',
        description: 'Stunning realistic bear portrait with detailed fur texture',
        tags: ['animal', 'bear', 'realism', 'black and grey'],
        isHealed: true,
        uploadDate: new Date('2024-02-01')
      },
      {
        id: 5,
        filename: 'chucky.jpeg',
        title: 'Chucky Character',
        style: 'Horror Character',
        placement: 'Leg',
        sessionTime: '6 hours',
        description: 'Horror movie character with incredible detail and shading',
        tags: ['horror', 'character', 'movie', 'chucky'],
        isHealed: true,
        uploadDate: new Date('2024-02-05')
      },
      {
        id: 6,
        filename: 'kason_freddy.jpeg',
        title: 'Freddy Krueger',
        style: 'Horror Character',
        placement: 'Forearm',
        sessionTime: '7 hours',
        description: 'Iconic horror character with realistic detail and texture',
        tags: ['horror', 'freddy krueger', 'character', 'realistic'],
        isHealed: true,
        uploadDate: new Date('2024-02-10')
      },
      {
        id: 7,
        filename: 'kason_jason.jpeg',
        title: 'Jason Voorhees',
        style: 'Horror Character',
        placement: 'Upper Arm',
        sessionTime: '6 hours',
        description: 'Classic horror icon with detailed mask and shading',
        tags: ['horror', 'jason', 'character', 'mask'],
        isHealed: true,
        uploadDate: new Date('2024-02-15')
      },
      {
        id: 8,
        filename: 'kason_jesus.jpeg',
        title: 'Religious Portrait',
        style: 'Religious Art',
        placement: 'Back',
        sessionTime: '10 hours',
        description: 'Beautiful religious artwork with incredible detail and reverence',
        tags: ['religious', 'portrait', 'detailed', 'spiritual'],
        isHealed: true,
        uploadDate: new Date('2024-02-20')
      },
      {
        id: 9,
        filename: 'kason_angel.jpeg',
        title: 'Angel Portrait',
        style: 'Religious Art',
        placement: 'Shoulder Blade',
        sessionTime: '8 hours',
        description: 'Ethereal angel artwork with soft shading and detail',
        tags: ['angel', 'religious', 'portrait', 'ethereal'],
        isHealed: true,
        uploadDate: new Date('2024-02-25')
      },
      {
        id: 10,
        filename: 'kason_tiger.jpeg',
        title: 'Tiger Portrait',
        style: 'Animal Realism',
        placement: 'Thigh',
        sessionTime: '9 hours',
        description: 'Fierce tiger portrait with incredible fur detail and intensity',
        tags: ['tiger', 'animal', 'realism', 'fierce'],
        isHealed: true,
        uploadDate: new Date('2024-03-01')
      },
      {
        id: 11,
        filename: 'kason_dragon.jpeg',
        title: 'Dragon Artwork',
        style: 'Fantasy Art',
        placement: 'Back Piece',
        sessionTime: '12 hours',
        description: 'Detailed dragon with incredible scale work and shading',
        tags: ['dragon', 'fantasy', 'detailed', 'scales'],
        isHealed: true,
        uploadDate: new Date('2024-03-05')
      },
      {
        id: 12,
        filename: 'kason_rose.jpeg',
        title: 'Rose Design',
        style: 'Traditional',
        placement: 'Forearm',
        sessionTime: '4 hours',
        description: 'Beautiful rose with smooth shading and natural flow',
        tags: ['rose', 'traditional', 'shading', 'natural'],
        isHealed: true,
        uploadDate: new Date('2024-03-10')
      },
      {
        id: 13,
        filename: 'kason_bird.jpeg',
        title: 'Bird Portrait',
        style: 'Animal Art',
        placement: 'Shoulder',
        sessionTime: '5 hours',
        description: 'Detailed bird artwork with feather texture and natural pose',
        tags: ['bird', 'animal', 'feathers', 'natural'],
        isHealed: true,
        uploadDate: new Date('2024-03-12')
      },
      {
        id: 14,
        filename: 'kason_bbasket.jpeg',
        title: 'Basketball Theme',
        style: 'Sports Art',
        placement: 'Calf',
        sessionTime: '6 hours',
        description: 'Sports-themed artwork with dynamic composition',
        tags: ['basketball', 'sports', 'dynamic', 'composition'],
        isHealed: true,
        uploadDate: new Date('2024-03-15')
      },
      {
        id: 15,
        filename: 'kason_bbasket2.jpeg',
        title: 'Basketball Art',
        style: 'Sports Art',
        placement: 'Leg',
        sessionTime: '5 hours',
        description: 'Basketball-inspired design with realistic shading',
        tags: ['basketball', 'sports', 'realistic', 'shading'],
        isHealed: true,
        uploadDate: new Date('2024-03-17')
      },
      {
        id: 16,
        filename: 'kason_balance.jpeg',
        title: 'Balance Symbol',
        style: 'Symbolic Art',
        placement: 'Wrist',
        sessionTime: '3 hours',
        description: 'Symbolic artwork representing balance and harmony',
        tags: ['balance', 'symbolic', 'harmony', 'meaningful'],
        isHealed: true,
        uploadDate: new Date('2024-03-20')
      },
      {
        id: 17,
        filename: 'kason_bug.jpeg',
        title: 'Insect Detail',
        style: 'Nature Art',
        placement: 'Hand',
        sessionTime: '4 hours',
        description: 'Detailed insect artwork with incredible fine detail work',
        tags: ['insect', 'nature', 'detailed', 'fine work'],
        isHealed: true,
        uploadDate: new Date('2024-03-22')
      },
      {
        id: 18,
        filename: 'kason_clown_Large.jpeg',
        title: 'Clown Character',
        style: 'Character Art',
        placement: 'Upper Arm',
        sessionTime: '7 hours',
        description: 'Detailed clown character with expressive features',
        tags: ['clown', 'character', 'expressive', 'detailed'],
        isHealed: true,
        uploadDate: new Date('2024-03-25')
      },
      {
        id: 19,
        filename: 'IMG_20250816_202406_Large.jpeg',
        title: 'Recent Character Work',
        style: 'Character Art',
        placement: 'Arm',
        sessionTime: '6 hours',
        description: 'Latest character artwork showcasing current skill level',
        tags: ['character', 'recent', 'detailed', 'skill'],
        isHealed: true,
        uploadDate: new Date('2024-08-16')
      },
      {
        id: 20,
        filename: 'IMG_20250816_202438.jpeg',
        title: 'Character Portrait',
        style: 'Portrait Art',
        placement: 'Forearm',
        sessionTime: '5 hours',
        description: 'Character portrait with smooth shading and detail',
        tags: ['character', 'portrait', 'shading', 'smooth'],
        isHealed: true,
        uploadDate: new Date('2024-08-16')
      }
    ],
    testimonials: [],
    featuredWork: [
      { portfolioId: 3, category: 'Realism Excellence' },
      { portfolioId: 4, category: 'Animal Portrait Mastery' },
      { portfolioId: 8, category: 'Religious Art' }
    ],
    seoData: {
      title: 'Kason - Black & Grey Realism Tattoo Artist | Valhalla Tattoo',
      description: 'View Kason\'s black & grey realism, portrait, and character tattoo portfolio at Valhalla Tattoo in Spring Hill, TN.',
      keywords: ['black and grey tattoos', 'realism tattoos', 'portrait tattoos', 'character tattoos', 'tattoo artist', 'Spring Hill TN']
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
    portfolio: [],
    testimonials: [],
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
export function getArtistPortfolio(slug, isPortfolioPage = false) {
  const artist = getArtistBySlug(slug);
  if (!artist) return [];

  const pathPrefix = isPortfolioPage ? '../' : '';

  return artist.portfolio.map(image => ({
    ...image,
    src: `${pathPrefix}images/portfolio/${slug}/${encodeURIComponent(image.filename)}`,
    thumbnail: `${pathPrefix}images/portfolio/${slug}/${encodeURIComponent(image.filename)}`, // Could be optimized thumbnails
    placeholder: generatePlaceholder(400, 300),
    artistSlug: slug
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
