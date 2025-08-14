/**
 * Blog Management System
 * Handles blog post display, filtering, pagination, and social sharing
 */

import { blogPosts, blogCategories } from '../data/blog-posts.js';

export class BlogManager {
  constructor() {
    this.posts = blogPosts;
    this.categories = blogCategories;
    this.currentCategory = 'all';
    this.currentPage = 1;
    this.postsPerPage = 6;
    this.filteredPosts = [...this.posts];
    
    this.elements = {
      container: null,
      categoryFilter: null,
      pagination: null,
      loadMoreBtn: null
    };
  }

  /**
   * Initialize the blog system
   */
  init() {
    this.findElements();
    if (!this.elements.container) return;

    this.setupEventListeners();
    this.renderCategories();
    this.renderPosts();
    this.updateCategoryCounts();
  }

  /**
   * Find DOM elements
   */
  findElements() {
    this.elements.container = document.querySelector('.blog-posts');
    this.elements.categoryFilter = document.querySelector('.blog-categories');
    this.elements.pagination = document.querySelector('.blog-pagination');
    this.elements.loadMoreBtn = document.querySelector('.blog-load-more');
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Category filtering
    if (this.elements.categoryFilter) {
      this.elements.categoryFilter.addEventListener('click', (e) => {
        if (e.target.matches('.category-btn')) {
          this.handleCategoryFilter(e.target.dataset.category);
        }
      });
    }

    // Load more button
    if (this.elements.loadMoreBtn) {
      this.elements.loadMoreBtn.addEventListener('click', () => {
        this.loadMorePosts();
      });
    }

    // Social sharing
    document.addEventListener('click', (e) => {
      if (e.target.matches('.share-btn')) {
        this.handleSocialShare(e.target);
      }
    });
  }

  /**
   * Handle category filtering
   * @param {string} category - Category to filter by
   */
  handleCategoryFilter(category) {
    this.currentCategory = category;
    this.currentPage = 1;
    
    // Update active category button
    const categoryBtns = this.elements.categoryFilter.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === category);
    });

    // Filter posts
    this.filterPosts();
    this.renderPosts();
  }

  /**
   * Filter posts by category
   */
  filterPosts() {
    if (this.currentCategory === 'all') {
      this.filteredPosts = [...this.posts];
    } else {
      this.filteredPosts = this.posts.filter(post => 
        post.category.toLowerCase().replace(/\s+/g, '-') === this.currentCategory
      );
    }
  }

  /**
   * Render category filter buttons
   */
  renderCategories() {
    if (!this.elements.categoryFilter) return;

    const categoriesHTML = this.categories.map(category => `
      <button class="category-btn ${category.id === 'all' ? 'active' : ''}" 
              data-category="${category.id}">
        ${category.name} (${category.count})
      </button>
    `).join('');

    this.elements.categoryFilter.innerHTML = categoriesHTML;
  }

  /**
   * Render blog posts
   */
  renderPosts() {
    if (!this.elements.container) return;

    const startIndex = 0;
    const endIndex = this.currentPage * this.postsPerPage;
    const postsToShow = this.filteredPosts.slice(startIndex, endIndex);

    if (postsToShow.length === 0) {
      this.elements.container.innerHTML = `
        <div class="no-posts">
          <h3>No posts found</h3>
          <p>There are no posts in this category yet. Check back soon!</p>
        </div>
      `;
      this.hideLoadMoreButton();
      return;
    }

    const postsHTML = postsToShow.map(post => this.renderPostCard(post)).join('');
    this.elements.container.innerHTML = postsHTML;

    // Update load more button visibility
    this.updateLoadMoreButton();
  }

  /**
   * Render individual post card
   * @param {Object} post - Blog post data
   * @returns {string} HTML string for post card
   */
  renderPostCard(post) {
    const formattedDate = this.formatDate(post.date);
    const categoryClass = post.category.toLowerCase().replace(/\s+/g, '-');

    return `
      <article class="blog-post-card ${post.featured ? 'featured' : ''}" data-post-id="${post.id}">
        <div class="blog-post-image">
          <img src="images/blog/${post.image}" alt="${post.title}" loading="lazy">
          <div class="blog-post-category">
            <span class="category-tag category-${categoryClass}">${post.category}</span>
          </div>
        </div>
        <div class="blog-post-content">
          <header class="blog-post-header">
            <h3 class="blog-post-title">
              <a href="#" data-post-id="${post.id}" class="post-link">${post.title}</a>
            </h3>
            <div class="blog-post-meta">
              <time datetime="${post.date}">${formattedDate}</time>
              <span class="author">By ${post.author}</span>
            </div>
          </header>
          <div class="blog-post-excerpt">
            <p>${post.excerpt}</p>
          </div>
          <footer class="blog-post-footer">
            <div class="blog-post-tags">
              ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
            </div>
            <div class="blog-post-actions">
              <button class="read-more-btn" data-post-id="${post.id}">Read More</button>
              <div class="share-buttons">
                <button class="share-btn" data-platform="facebook" data-post-id="${post.id}" aria-label="Share on Facebook">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button class="share-btn" data-platform="twitter" data-post-id="${post.id}" aria-label="Share on Twitter">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button class="share-btn" data-platform="copy" data-post-id="${post.id}" aria-label="Copy link">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                  </svg>
                </button>
              </div>
            </div>
          </footer>
        </div>
      </article>
    `;
  }

  /**
   * Load more posts
   */
  loadMorePosts() {
    this.currentPage++;
    this.renderPosts();
  }

  /**
   * Update load more button visibility
   */
  updateLoadMoreButton() {
    if (!this.elements.loadMoreBtn) return;

    const totalPages = Math.ceil(this.filteredPosts.length / this.postsPerPage);
    const hasMorePosts = this.currentPage < totalPages;

    if (hasMorePosts) {
      this.elements.loadMoreBtn.style.display = 'block';
      this.elements.loadMoreBtn.textContent = `Load More Posts (${this.filteredPosts.length - (this.currentPage * this.postsPerPage)} remaining)`;
    } else {
      this.hideLoadMoreButton();
    }
  }

  /**
   * Hide load more button
   */
  hideLoadMoreButton() {
    if (this.elements.loadMoreBtn) {
      this.elements.loadMoreBtn.style.display = 'none';
    }
  }

  /**
   * Update category counts
   */
  updateCategoryCounts() {
    const counts = { all: this.posts.length };
    
    this.posts.forEach(post => {
      const categoryKey = post.category.toLowerCase().replace(/\s+/g, '-');
      counts[categoryKey] = (counts[categoryKey] || 0) + 1;
    });

    // Update category objects
    this.categories.forEach(category => {
      if (category.id === 'all') {
        category.count = this.posts.length;
      } else {
        category.count = counts[category.id] || 0;
      }
    });
  }

  /**
   * Handle social sharing
   * @param {HTMLElement} button - Share button element
   */
  handleSocialShare(button) {
    const platform = button.dataset.platform;
    const postId = parseInt(button.dataset.postId);
    const post = this.posts.find(p => p.id === postId);
    
    if (!post) return;

    const url = `${window.location.origin}#blog-post-${postId}`;
    const title = post.title;
    const text = post.excerpt;

    switch (platform) {
      case 'facebook':
        this.shareOnFacebook(url, title);
        break;
      case 'twitter':
        this.shareOnTwitter(url, title, text);
        break;
      case 'copy':
        this.copyToClipboard(url);
        break;
    }
  }

  /**
   * Share on Facebook
   * @param {string} url - URL to share
   * @param {string} title - Title to share
   */
  shareOnFacebook(url, title) {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    this.openShareWindow(shareUrl);
  }

  /**
   * Share on Twitter
   * @param {string} url - URL to share
   * @param {string} title - Title to share
   * @param {string} text - Text to share
   */
  shareOnTwitter(url, title, text) {
    const tweetText = `${title} - ${text}`;
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(tweetText)}`;
    this.openShareWindow(shareUrl);
  }

  /**
   * Copy URL to clipboard
   * @param {string} url - URL to copy
   */
  async copyToClipboard(url) {
    try {
      await navigator.clipboard.writeText(url);
      this.showToast('Link copied to clipboard!');
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.showToast('Link copied to clipboard!');
    }
  }

  /**
   * Open share window
   * @param {string} url - URL to open
   */
  openShareWindow(url) {
    window.open(url, 'share', 'width=600,height=400,scrollbars=yes,resizable=yes');
  }

  /**
   * Show toast notification
   * @param {string} message - Message to show
   */
  showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  /**
   * Format date for display
   * @param {string} dateString - Date string to format
   * @returns {string} Formatted date
   */
  formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  }

  /**
   * Get post by ID
   * @param {number} id - Post ID
   * @returns {Object|null} Post object or null
   */
  getPostById(id) {
    return this.posts.find(post => post.id === id) || null;
  }

  /**
   * Get featured posts
   * @param {number} limit - Number of posts to return
   * @returns {Array} Array of featured posts
   */
  getFeaturedPosts(limit = 3) {
    return this.posts
      .filter(post => post.featured)
      .slice(0, limit);
  }

  /**
   * Get recent posts
   * @param {number} limit - Number of posts to return
   * @returns {Array} Array of recent posts
   */
  getRecentPosts(limit = 5) {
    return [...this.posts]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  }

  /**
   * Search posts
   * @param {string} query - Search query
   * @returns {Array} Array of matching posts
   */
  searchPosts(query) {
    const searchTerm = query.toLowerCase();
    return this.posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
}