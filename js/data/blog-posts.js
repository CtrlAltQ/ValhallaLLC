/**
 * Blog Posts Data
 * Add your blog posts and studio news here
 */

export const blogPosts = [
  {
    id: 1,
    title: "Welcome to Our New Website!",
    date: "2024-01-15",
    category: "Studio News",
    featured: true,
    excerpt: "We're excited to launch our brand new website featuring artist portfolios, online booking, and the latest studio news.",
    content: `
      <p>Welcome to the new Valhalla Tattoo website! We've completely redesigned our online presence to better serve our clients and showcase our incredible artists.</p>
      
      <h3>What's New:</h3>
      <ul>
        <li><strong>Artist Portfolios:</strong> Browse detailed galleries of each artist's work</li>
        <li><strong>Easy Contact Forms:</strong> Get in touch quickly for consultations</li>
        <li><strong>Studio News:</strong> Stay updated on events, new artists, and special offers</li>
        <li><strong>Mobile Friendly:</strong> Perfect experience on all devices</li>
      </ul>
      
      <p>We can't wait to help bring your tattoo vision to life. Explore our artists' work and reach out when you're ready to start your next piece!</p>
    `,
    author: "Valhalla Team",
    image: "studio/valhalla_exterior_web.jpeg",
    tags: ["website", "announcement", "studio"]
  },
  
  {
    id: 2,
    title: "Artist Spotlight: Jimmy's Realism Mastery",
    date: "2024-01-10",
    category: "Artist Spotlight",
    featured: false,
    excerpt: "Meet Jimmy, our master of photorealistic tattoos with over 10 years of experience creating stunning black & grey pieces.",
    content: `
      <p>This month we're highlighting Jimmy, one of our most skilled artists specializing in photorealistic tattoos and black & grey work.</p>
      
      <h3>Jimmy's Journey</h3>
      <p>With over 10 years of experience, Jimmy has developed a unique style that brings photographs to life on skin. His attention to detail and mastery of shading techniques make him one of the most sought-after realism artists in Tennessee.</p>
      
      <h3>Specialty Areas:</h3>
      <ul>
        <li>Portrait tattoos</li>
        <li>Black & grey realism</li>
        <li>Animal portraits</li>
        <li>Memorial pieces</li>
      </ul>
      
      <p>Jimmy is currently booking 2-3 months out for large pieces. Contact us to discuss your realism project!</p>
    `,
    author: "Valhalla Team",
    image: "gallery/jimmy.jpg",
    tags: ["artist-spotlight", "jimmy", "realism"]
  },
  
  {
    id: 3,
    title: "Tattoo Aftercare: Your Complete Guide",
    date: "2024-01-05",
    category: "Tattoo Care",
    featured: false,
    excerpt: "Proper aftercare is crucial for healing and maintaining the beauty of your new tattoo. Here's our complete step-by-step guide.",
    content: `
      <p>Getting a tattoo is just the first step - proper aftercare ensures your new ink heals beautifully and stays vibrant for years to come.</p>
      
      <h3>First 24 Hours</h3>
      <ul>
        <li>Keep the bandage on for 2-4 hours</li>
        <li>Gently wash with antibacterial soap</li>
        <li>Pat dry with a clean towel</li>
        <li>Apply a thin layer of unscented moisturizer</li>
      </ul>
      
      <h3>Days 2-14</h3>
      <ul>
        <li>Wash gently 2-3 times daily</li>
        <li>Keep moisturized but not oversaturated</li>
        <li>Avoid soaking (pools, baths, ocean)</li>
        <li>Don't pick at scabs or peeling skin</li>
      </ul>
      
      <h3>Long-term Care</h3>
      <p>Always use SPF 30+ sunscreen on healed tattoos to prevent fading. Keep skin moisturized and healthy for the best appearance.</p>
      
      <p><strong>Questions about healing?</strong> Contact us anytime - we're here to help!</p>
    `,
    author: "Valhalla Team",
    image: "studio/studio1_web.jpeg",
    tags: ["aftercare", "healing", "tips"]
  }
];

// Blog categories for filtering
export const blogCategories = [
  { id: "all", name: "All", count: 0 },
  { id: "studio-news", name: "Studio News", count: 0 },
  { id: "artist-spotlight", name: "Artist Spotlight", count: 0 },
  { id: "tattoo-care", name: "Tattoo Care", count: 0 },
  { id: "events", name: "Events", count: 0 },
  { id: "style-guide", name: "Style Guide", count: 0 }
];

/**
 * HOW TO ADD A NEW BLOG POST:
 * 
 * 1. Copy the template below
 * 2. Update the id to be unique (increment from the last post)
 * 3. Fill in your content
 * 4. Add to the blogPosts array above
 * 
 * TEMPLATE:
 * {
 *   id: 4,
 *   title: "Your Post Title Here",
 *   date: "2024-MM-DD",
 *   category: "Studio News", // or "Artist Spotlight", "Tattoo Care", etc.
 *   featured: false, // set to true to feature on homepage
 *   excerpt: "A brief summary that appears in the post list...",
 *   content: `
 *     <p>Your main content goes here. You can use HTML:</p>
 *     <h3>Subheadings</h3>
 *     <ul>
 *       <li>Bullet points</li>
 *       <li>Lists</li>
 *     </ul>
 *     <p>Multiple paragraphs work great!</p>
 *   `,
 *   author: "Valhalla Team", // or specific artist name
 *   image: "path/to/image.jpg", // relative to images/ folder
 *   tags: ["tag1", "tag2", "tag3"]
 * }
 */