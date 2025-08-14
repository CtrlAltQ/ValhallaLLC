/**
 * Content Data Structure
 * Contains blog posts, news, and general site content
 */

export const blogPosts = [
  {
    id: 1,
    title: 'Welcome to Valhalla Tattoo',
    date: '2024-03-25',
    category: 'Studio News',
    excerpt: 'We\'re excited to share our new website and showcase our artists\' incredible work.',
    content: `<p>Welcome to the new Valhalla Tattoo website! We're thrilled to finally have a digital home that truly represents the artistry and craftsmanship that defines our studio.</p>
    
    <p>Located in the heart of Spring Hill, Tennessee, Valhalla Tattoo has been creating legendary ink for years. Our team of master artists brings decades of combined experience, specializing in everything from traditional American tattoos to intricate realism, fine line work, and custom designs.</p>
    
    <p>This new website showcases our artists' incredible portfolios, makes it easier than ever to book consultations, and keeps you updated on all the latest studio news. Whether you're looking for your first tattoo or adding to an existing collection, we're here to help bring your vision to life.</p>
    
    <p>Explore our artists' work, learn about our studio, and don't hesitate to reach out with any questions. We can't wait to help you forge your legend in ink!</p>`,
    tags: ['studio', 'announcement', 'artists'],
    featured: true,
    author: 'Valhalla Team',
    image: 'blog-welcome.jpg'
  },
  {
    id: 6,
    title: 'Spring 2024 Flash Sale Event',
    date: '2024-03-20',
    category: 'Studio News',
    excerpt: 'Join us for our Spring Flash Sale featuring exclusive designs from all our artists.',
    content: `<p>We're excited to announce our Spring 2024 Flash Sale Event happening April 5-7! This special weekend event will feature exclusive flash designs from all our talented artists, available at special pricing.</p>
    
    <p>Each artist has created a unique collection of flash designs specifically for this event, ranging from small traditional pieces to medium-sized custom work. It's the perfect opportunity to get tattooed by your favorite artist or try someone new at a great price.</p>
    
    <h3>Event Details:</h3>
    <ul>
      <li><strong>Dates:</strong> April 5-7, 2024</li>
      <li><strong>Hours:</strong> 12 PM - 8 PM each day</li>
      <li><strong>Booking:</strong> Walk-ins welcome, appointments recommended</li>
      <li><strong>Pricing:</strong> Flash designs starting at $80</li>
    </ul>
    
    <p>Follow us on Instagram @valhallatattoo to see preview images of the flash designs, and don't forget to arrive early for the best selection!</p>`,
    tags: ['event', 'flash sale', 'special pricing'],
    featured: true,
    author: 'Valhalla Team',
    image: 'blog-flash-sale.jpg'
  },
  {
    id: 2,
    title: 'The Art of Traditional Tattooing',
    date: '2024-01-10',
    category: 'Artist Spotlight',
    excerpt: 'Dive deep into the timeless world of traditional tattoo artistry with our master artist Pagan.',
    content: `<p>Traditional tattooing is more than just a style—it's a connection to the roots of tattoo culture. With bold lines, solid colors, and iconic imagery, traditional tattoos have stood the test of time for good reason.</p>
    
    <p>Our artist Pagan has spent over 8 years perfecting the traditional and neo-traditional styles, studying under some of the most respected names in the industry. "Traditional tattoos are about storytelling," Pagan explains. "Each piece carries meaning, history, and craftsmanship that will look just as good in 20 years as it does today."</p>
    
    <p>From classic American traditional designs featuring eagles, roses, and pin-ups to modern neo-traditional pieces with enhanced detail and color palettes, Pagan brings both respect for tradition and contemporary innovation to every piece.</p>
    
    <p>If you're considering a traditional tattoo, we'd love to discuss your ideas and help create something truly legendary.</p>`,
    tags: ['traditional', 'pagan', 'artist-spotlight'],
    featured: false,
    author: 'Pagan',
    image: 'blog-traditional.jpg'
  },
  {
    id: 3,
    title: 'Studio Expansion and New Equipment',
    date: '2024-01-05',
    category: 'Studio News',
    excerpt: 'We\'ve expanded our studio space and invested in state-of-the-art equipment to serve you better.',
    content: `<p>We're excited to announce that Valhalla Tattoo has expanded! Our newly renovated space now features additional private tattoo stations, a larger waiting area, and upgraded ventilation systems for the comfort and safety of our clients and artists.</p>
    
    <p>We've also invested in the latest tattoo equipment, including new rotary machines, improved lighting systems, and enhanced sterilization equipment. These upgrades ensure that every tattoo session meets the highest standards of safety and artistry.</p>
    
    <p>The expansion also includes a dedicated consultation room where you can discuss your tattoo ideas in a comfortable, private setting. We believe that great tattoos start with great conversations, and this new space allows us to really dive deep into your vision.</p>
    
    <p>Come check out our updated studio—we think you'll love the new vibe!</p>`,
    tags: ['studio', 'expansion', 'equipment'],
    featured: false,
    author: 'Valhalla Team',
    image: 'blog-expansion.jpg'
  },
  {
    id: 4,
    title: 'Aftercare: Your Tattoo\'s Best Friend',
    date: '2023-12-28',
    category: 'Education',
    excerpt: 'Proper aftercare is crucial for healing and maintaining the quality of your new tattoo.',
    content: `<p>Getting a tattoo is just the beginning of your journey. Proper aftercare is essential for ensuring your new ink heals beautifully and maintains its vibrancy for years to come.</p>
    
    <h3>The First 24 Hours</h3>
    <p>Keep the bandage on for 2-4 hours after your session. When you remove it, gently wash the tattoo with antibacterial soap and lukewarm water. Pat dry with a clean paper towel—never rub!</p>
    
    <h3>Days 2-14: The Healing Process</h3>
    <p>Apply a thin layer of unscented lotion 2-3 times daily. Your tattoo will likely peel and flake—this is normal! Resist the urge to pick or scratch.</p>
    
    <h3>Long-term Care</h3>
    <p>Always use sunscreen on healed tattoos to prevent fading. Keep your skin moisturized and healthy to maintain the tattoo's appearance.</p>
    
    <p>We provide detailed aftercare instructions with every tattoo, and we're always here to answer questions during your healing process.</p>`,
    tags: ['aftercare', 'education', 'healing'],
    featured: true,
    author: 'Valhalla Team',
    image: 'blog-aftercare.jpg'
  },
  {
    id: 5,
    title: 'Jimmy\'s Realism Masterclass',
    date: '2024-03-10',
    category: 'Artist Spotlight',
    excerpt: 'Discover the techniques and passion behind Jimmy\'s photorealistic tattoo artistry.',
    content: `<p>Realism in tattooing requires not just artistic skill, but an understanding of light, shadow, and the way skin accepts ink. Our artist Jimmy has spent over 8 years perfecting these techniques, creating tattoos that look like photographs on skin.</p>
    
    <p>"The key to good realism is patience," Jimmy explains. "You can't rush the process. Each session builds on the last, gradually adding depth and detail until the image comes to life."</p>
    
    <p>Jimmy's portfolio includes everything from portrait work to nature scenes, each piece demonstrating his mastery of black and grey techniques. His attention to detail and commitment to excellence has earned him recognition throughout the tattoo community.</p>
    
    <p>Realism tattoos typically require multiple sessions and significant time investment, but the results speak for themselves. If you're considering a realistic piece, Jimmy would love to discuss your vision and create something truly extraordinary.</p>`,
    tags: ['realism', 'jimmy', 'artist-spotlight', 'technique'],
    featured: false,
    author: 'Jimmy',
    image: 'blog-realism.jpg'
  },
  {
    id: 7,
    title: 'New Artist Spotlight: Sarah\'s Watercolor Magic',
    date: '2024-03-05',
    category: 'Artist Spotlight',
    excerpt: 'Meet Sarah, our newest artist specializing in watercolor and illustrative tattoo styles.',
    content: `<p>We're thrilled to introduce Sarah, the newest addition to our Valhalla family! Sarah brings a unique artistic perspective with her background in fine arts and specialization in watercolor and illustrative tattoo styles.</p>
    
    <p>Sarah's journey into tattooing began with traditional painting and illustration. "I've always been drawn to the way watercolors flow and blend," Sarah explains. "Translating that organic, flowing quality to skin creates something truly magical."</p>
    
    <p>Her portfolio showcases vibrant florals, abstract compositions, and illustrative pieces that look like they've been painted directly onto the skin. Sarah's technique involves layering translucent colors to create depth and movement that captures the essence of watercolor painting.</p>
    
    <p>"Every tattoo is a collaboration between the client's vision and my artistic interpretation," Sarah says. "I love working with people to create something that's uniquely theirs while maintaining the artistic integrity of the watercolor style."</p>
    
    <p>Sarah is now accepting consultations for new projects. If you're interested in watercolor or illustrative work, we'd love to help you create something beautiful together!</p>`,
    tags: ['sarah', 'watercolor', 'new artist', 'illustrative'],
    featured: true,
    author: 'Sarah',
    image: 'blog-sarah-spotlight.jpg'
  },
  {
    id: 8,
    title: 'Studio Safety and Cleanliness Standards',
    date: '2024-02-28',
    category: 'Education',
    excerpt: 'Learn about our rigorous safety protocols and why cleanliness is our top priority.',
    content: `<p>At Valhalla Tattoo, your safety and health are our absolute top priorities. We maintain the highest standards of cleanliness and follow all state and local health department regulations to ensure every client has a safe, comfortable experience.</p>
    
    <h3>Our Safety Protocols Include:</h3>
    <ul>
      <li><strong>Autoclave Sterilization:</strong> All reusable equipment is sterilized using hospital-grade autoclaves</li>
      <li><strong>Single-Use Items:</strong> Needles, tubes, and other critical items are used once and properly disposed of</li>
      <li><strong>Fresh Setup:</strong> Every station is completely cleaned and set up fresh for each client</li>
      <li><strong>Barrier Protection:</strong> All surfaces are covered with disposable barriers that are changed between clients</li>
      <li><strong>Hand Hygiene:</strong> Artists wash and sanitize hands before and after each client interaction</li>
    </ul>
    
    <h3>What You Can Expect:</h3>
    <p>When you arrive for your appointment, you'll see your artist open fresh, sterile equipment packages in front of you. All ink caps are new, and we use only the highest quality, sterile tattoo inks from reputable suppliers.</p>
    
    <p>Our studio is regularly inspected by the Tennessee Department of Health, and we proudly maintain all required certifications. We believe that exceptional art should never come at the expense of your health and safety.</p>
    
    <p>If you have any questions about our safety protocols or health standards, please don't hesitate to ask during your consultation. We're always happy to explain our processes and put your mind at ease.</p>`,
    tags: ['safety', 'health', 'cleanliness', 'protocols'],
    featured: false,
    author: 'Valhalla Team',
    image: 'blog-safety.jpg'
  }
];

export const blogCategories = [
  { id: 'all', name: 'All Posts', count: 8 },
  { id: 'studio-news', name: 'Studio News', count: 3 },
  { id: 'artist-spotlight', name: 'Artist Spotlight', count: 3 },
  { id: 'education', name: 'Education', count: 2 }
];

export const studioInfo = {
  name: 'Valhalla Tattoo',
  address: {
    street: '404 Mclemore Ave. Suite 4',
    city: 'Spring Hill',
    state: 'TN',
    zip: '37174'
  },
  phone: '931-451-5313',
  email: 'valhallatattoo931@gmail.com',
  hours: {
    monday: 'Closed',
    tuesday: '12:00 PM - 8:00 PM',
    wednesday: '12:00 PM - 8:00 PM',
    thursday: '12:00 PM - 8:00 PM',
    friday: '12:00 PM - 8:00 PM',
    saturday: '12:00 PM - 8:00 PM',
    sunday: 'Closed'
  },
  socialMedia: {
    instagram: '@valhallatattoo',
    facebook: 'ValhallaStudio'
  },
  description: 'Premier tattoo studio in Spring Hill, Tennessee, featuring master artists specializing in traditional, realism, fine line, watercolor, Japanese, and script tattoo styles.',
  established: '2018',
  specialties: [
    'Traditional & Neo-Traditional',
    'Realism & Black & Grey',
    'Fine Line & Geometric',
    'Watercolor & Illustrative',
    'Japanese & Oriental',
    'Script & Ornamental'
  ]
};