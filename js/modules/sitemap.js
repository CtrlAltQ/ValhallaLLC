/**
 * XML Sitemap Generation System
 * Generates dynamic sitemap for SEO optimization
 */

// Export the generator as the default class to ensure proper module parsing
export default class SitemapGenerator {
    constructor() {
        this.baseUrl = 'https://valhallatattoo.com';
        this.pages = [];
        this.lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    }

    /**
     * Add a page to the sitemap
     * @param {Object} pageData - Page information
     */
    addPage(pageData) {
        const {
            url,
            lastmod = this.lastmod,
            changefreq = 'monthly',
            priority = '0.5'
        } = pageData;

        this.pages.push({
            url: url.startsWith('http') ? url : `${this.baseUrl}${url}`,
            lastmod,
            changefreq,
            priority
        });
    }

    /**
     * Initialize default pages
     */
    initializeDefaultPages() {
        // Homepage
        this.addPage({
            url: '/',
            changefreq: 'weekly',
            priority: '1.0'
        });

        // Main sections
        this.addPage({
            url: '/#artists',
            changefreq: 'monthly',
            priority: '0.9'
        });

        this.addPage({
            url: '/#portfolio',
            changefreq: 'weekly',
            priority: '0.8'
        });

        this.addPage({
            url: '/#about',
            changefreq: 'monthly',
            priority: '0.7'
        });

        this.addPage({
            url: '/#contact',
            changefreq: 'monthly',
            priority: '0.8'
        });
    }

    /**
     * Add artist portfolio pages
     * @param {Array} artists - Array of artist data
     */
    addArtistPages(artists) {
        artists.forEach(artist => {
            this.addPage({
                url: `/portfolio/${artist.slug}.html`,
                changefreq: 'weekly',
                priority: '0.8'
            });
        });
    }

    /**
     * Generate XML sitemap content
     * @returns {string} XML sitemap content
     */
    generateXML() {
        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        this.pages.forEach(page => {
            xml += '  <url>\n';
            xml += `    <loc>${page.url}</loc>\n`;
            xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
            xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
            xml += `    <priority>${page.priority}</priority>\n`;
            xml += '  </url>\n';
        });

        xml += '</urlset>';
        return xml;
    }

    /**
     * Generate and download sitemap
     */
    downloadSitemap() {
        const xml = this.generateXML();
        const blob = new Blob([xml], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'sitemap.xml';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Generate sitemap for console output (development)
     */
    logSitemap() {
        console.log('Generated Sitemap:');
        console.log(this.generateXML());
    }

    /**
     * Initialize complete sitemap with all pages
     * @param {Array} artists - Array of artist data
     */
    generateCompleteSitemap(artists = []) {
        this.pages = []; // Reset pages
        this.initializeDefaultPages();
        
        if (artists.length > 0) {
            this.addArtistPages(artists);
        } else {
            // Default artist pages if no data provided
            const defaultArtists = [
                { slug: 'pagan' },
                { slug: 'jimmy' },
                { slug: 'micah' },
                { slug: 'sarah' },
                { slug: 'kason' },
                { slug: 'heather' }
            ];
            this.addArtistPages(defaultArtists);
        }

        return this.generateXML();
    }
}
