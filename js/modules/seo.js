/**
 * Advanced SEO Meta Tag Management System
 * Handles dynamic meta tag generation, structured data, and local SEO optimization
 */

class SEOManager {
    constructor() {
        this.baseUrl = 'https://valhallatattoo.com';
        this.defaultImage = `${this.baseUrl}/images/og-image.jpg`;
        this.businessData = {
            '@id': `${this.baseUrl}/#business`,
            name: 'Valhalla Tattoo',
            description: 'Professional tattoo studio in Spring Hill, Tennessee',
            address: {
                streetAddress: '404 Mclemore Ave. Suite 4',
                addressLocality: 'Spring Hill',
                addressRegion: 'TN',
                postalCode: '37174'
            },
            telephone: '931-451-5313',
            url: this.baseUrl,
            openingHours: ['Tu-Sa 12:00-20:00'],
            priceRange: '$',
            geo: {
                '@type': 'GeoCoordinates',
                latitude: '35.7518',
                longitude: '-86.9306'
            },
            areaServed: [
                'Spring Hill, TN',
                'Franklin, TN',
                'Nashville, TN',
                'Brentwood, TN',
                'Thompson\'s Station, TN'
            ],
            paymentAccepted: ['Cash', 'Credit Card', 'Debit Card'],
            currenciesAccepted: 'USD'
        };
    }

    /**
     * Update meta tags dynamically with enhanced SEO features
     * @param {Object} metaData - Meta tag data
     */
    updateMetaTags(metaData) {
        const {
            title,
            description,
            keywords,
            image = this.defaultImage,
            url = window.location.href,
            type = 'website',
            author = 'Valhalla Tattoo',
            robots = 'index, follow',
            canonical = url,
            locale = 'en_US'
        } = metaData;

        // Update document title
        if (title) {
            document.title = title;
        }

        // Basic meta tags
        this.setMetaTag('description', description);
        this.setMetaTag('keywords', keywords);
        this.setMetaTag('author', author);
        this.setMetaTag('robots', robots);

        // Canonical URL
        this.setCanonicalUrl(canonical);

        // Open Graph tags
        this.setMetaProperty('og:title', title);
        this.setMetaProperty('og:description', description);
        this.setMetaProperty('og:image', image);
        this.setMetaProperty('og:url', canonical);
        this.setMetaProperty('og:type', type);
        this.setMetaProperty('og:locale', locale);
        this.setMetaProperty('og:site_name', this.businessData.name);

        // Twitter Card tags
        this.setMetaProperty('twitter:card', 'summary_large_image');
        this.setMetaProperty('twitter:title', title);
        this.setMetaProperty('twitter:description', description);
        this.setMetaProperty('twitter:image', image);
        this.setMetaProperty('twitter:url', canonical);
        this.setMetaProperty('twitter:site', '@valhallatattoo');

        // Additional SEO meta tags
        this.setMetaTag('theme-color', '#d4af37');
        this.setMetaProperty('og:image:width', '1200');
        this.setMetaProperty('og:image:height', '630');
        this.setMetaProperty('og:image:alt', title || this.businessData.name);
    }

    /**
     * Set or update a meta tag
     * @param {string} name - Meta tag name
     * @param {string} content - Meta tag content
     */
    setMetaTag(name, content) {
        if (!content) return;

        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = name;
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    /**
     * Set or update a meta property
     * @param {string} property - Meta property name
     * @param {string} content - Meta property content
     */
    setMetaProperty(property, content) {
        if (!content) return;

        let meta = document.querySelector(`meta[property="${property}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('property', property);
            document.head.appendChild(meta);
        }
        meta.content = content;
    }

    /**
     * Set canonical URL
     * @param {string} url - Canonical URL
     */
    setCanonicalUrl(url) {
        if (!url) return;

        let canonical = document.querySelector('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = url;
    }

    /**
     * Generate local SEO optimized meta tags
     * @param {Object} locationData - Location-specific data
     */
    generateLocalSEOTags(locationData = {}) {
        const {
            city = 'Spring Hill',
            state = 'Tennessee',
            region = 'Middle Tennessee',
            services = ['tattoo', 'custom tattoo design', 'tattoo consultation']
        } = locationData;

        // Generate location-based keywords
        const locationKeywords = [
            `tattoo studio ${city} TN`,
            `tattoo artist ${city}`,
            `best tattoo shop ${city}`,
            `custom tattoos ${city}`,
            `professional tattoo ${state}`,
            `tattoo parlor ${region}`,
            ...services.map(service => `${service} ${city}`)
        ];

        return locationKeywords.join(', ');
    }

    /**
     * Generate FAQ structured data for local SEO
     * @param {Array} faqs - Array of FAQ objects
     */
    generateFAQStructuredData(faqs) {
        const faqData = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(faq => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer
                }
            }))
        };

        this.injectStructuredData('faq-schema', faqData);
    }

    /**
     * Generate enhanced structured data for LocalBusiness with local SEO
     * @param {Object} additionalData - Additional business data
     */
    generateBusinessStructuredData(additionalData = {}) {
        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            '@id': this.businessData['@id'],
            ...this.businessData,
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Tattoo Services',
                itemListElement: [
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name: 'Custom Tattoo Design',
                            description: 'Professional custom tattoo design and application'
                        }
                    },
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name: 'Tattoo Consultation',
                            description: 'Professional tattoo consultation and planning'
                        }
                    },
                    {
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name: 'Cover-up Tattoos',
                            description: 'Expert cover-up and rework of existing tattoos'
                        }
                    }
                ]
            },
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.8',
                reviewCount: '127',
                bestRating: '5',
                worstRating: '1'
            },
            ...additionalData
        };

        this.injectStructuredData('business-schema', structuredData);
    }

    /**
     * Generate structured data for Person (Artist)
     * @param {Object} artistData - Artist information
     */
    generatePersonStructuredData(artistData) {
        const {
            name,
            jobTitle = 'Tattoo Artist',
            description,
            image,
            sameAs = [],
            worksFor = this.businessData.name
        } = artistData;

        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name,
            jobTitle,
            description,
            image,
            sameAs,
            worksFor: {
                '@type': 'LocalBusiness',
                name: worksFor,
                url: this.baseUrl
            }
        };

        this.injectStructuredData('person-schema', structuredData);
    }

    /**
     * Generate structured data for WebPage
     * @param {Object} pageData - Page information
     */
    generateWebPageStructuredData(pageData) {
        const {
            name,
            description,
            url = window.location.href,
            breadcrumb = null
        } = pageData;

        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name,
            description,
            url,
            isPartOf: {
                '@type': 'WebSite',
                name: this.businessData.name,
                url: this.baseUrl
            }
        };

        if (breadcrumb) {
            structuredData.breadcrumb = breadcrumb;
        }

        this.injectStructuredData('webpage-schema', structuredData);
    }

    /**
     * Generate breadcrumb structured data
     * @param {Array} breadcrumbItems - Array of breadcrumb items
     */
    generateBreadcrumbStructuredData(breadcrumbItems) {
        const listItems = breadcrumbItems.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
        }));

        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: listItems
        };

        this.injectStructuredData('breadcrumb-schema', structuredData);
    }

    /**
     * Inject structured data into the page
     * @param {string} id - Script element ID
     * @param {Object} data - Structured data object
     */
    injectStructuredData(id, data) {
        // Remove existing script if it exists
        const existingScript = document.getElementById(id);
        if (existingScript) {
            existingScript.remove();
        }

        // Create new script element
        const script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(data, null, 2);
        document.head.appendChild(script);
    }

    /**
     * Initialize enhanced SEO for homepage with local optimization
     */
    initHomepage() {
        const localKeywords = this.generateLocalSEOTags();
        
        this.updateMetaTags({
            title: 'Valhalla Tattoo - Professional Tattoo Studio in Spring Hill, TN',
            description: 'Premium tattoo artistry in Spring Hill, Tennessee. Expert artists specializing in traditional, realism, and custom tattoo designs. Book your consultation today.',
            keywords: `${localKeywords}, traditional tattoos, realism tattoos, custom tattoo design, professional tattoo artist`,
            canonical: this.baseUrl + '/'
        });

        this.generateBusinessStructuredData();
        this.generateWebPageStructuredData({
            name: 'Valhalla Tattoo - Professional Tattoo Studio',
            description: 'Premium tattoo artistry in Spring Hill, Tennessee'
        });

        // Add FAQ structured data for local SEO
        const faqs = [
            {
                question: 'Where is Valhalla Tattoo located?',
                answer: 'Valhalla Tattoo is located at 404 Mclemore Ave. Suite 4, Spring Hill, TN 37174.'
            },
            {
                question: 'What are your hours of operation?',
                answer: 'We are open Tuesday through Saturday from 12:00 PM to 8:00 PM.'
            },
            {
                question: 'Do you accept walk-ins?',
                answer: 'We recommend scheduling an appointment, but we do accept walk-ins based on availability.'
            },
            {
                question: 'What tattoo styles do you specialize in?',
                answer: 'Our artists specialize in traditional, realism, black & grey, and custom tattoo designs.'
            }
        ];
        this.generateFAQStructuredData(faqs);
    }

    /**
     * Initialize enhanced SEO for artist portfolio page
     * @param {Object} artistData - Artist information
     */
    initArtistPage(artistData) {
        const { name, specialty, bio, image, socialMedia = {}, slug, experience } = artistData;
        const canonicalUrl = `${this.baseUrl}/portfolio/${slug}.html`;
        const localKeywords = this.generateLocalSEOTags({
            services: [`${specialty} tattoos`, `${name} tattoo artist`, 'custom tattoo design']
        });
        
        this.updateMetaTags({
            title: `${name}'s Portfolio | Valhalla Tattoo - ${specialty} Specialist in Spring Hill, TN`,
            description: `View ${name}'s professional tattoo portfolio at Valhalla Tattoo in Spring Hill, TN. Specializing in ${specialty} with ${experience || '5+'} years experience. ${bio ? bio.substring(0, 100) + '...' : 'Book your consultation today.'}`,
            keywords: `${name} tattoo portfolio, ${specialty} tattoos, ${localKeywords}, tattoo artist Spring Hill TN`,
            image: image || this.defaultImage,
            type: 'profile',
            canonical: canonicalUrl
        });

        // Generate Person structured data
        const sameAs = [];
        if (socialMedia.instagram) sameAs.push(socialMedia.instagram);
        if (socialMedia.facebook) sameAs.push(socialMedia.facebook);

        this.generatePersonStructuredData({
            name,
            jobTitle: `${specialty} Tattoo Artist`,
            description: `Professional ${specialty} tattoo artist at Valhalla Tattoo in Spring Hill, TN with ${experience || '5+'} years of experience`,
            image,
            sameAs,
            worksFor: this.businessData.name,
            knowsAbout: [specialty, 'Tattoo Design', 'Custom Artwork'],
            hasOccupation: {
                '@type': 'Occupation',
                name: 'Tattoo Artist',
                occupationLocation: {
                    '@type': 'City',
                    name: 'Spring Hill, TN'
                }
            }
        });

        // Generate breadcrumb
        this.generateBreadcrumbStructuredData([
            { name: 'Home', url: this.baseUrl },
            { name: 'Artists', url: `${this.baseUrl}/#artists` },
            { name: `${name}'s Portfolio`, url: canonicalUrl }
        ]);

        this.generateWebPageStructuredData({
            name: `${name}'s Tattoo Portfolio`,
            description: `Professional ${specialty} tattoo portfolio by ${name} at Valhalla Tattoo`,
            url: canonicalUrl
        });

        // Generate ImageGallery structured data for portfolio
        this.generateImageGalleryStructuredData({
            name: `${name}'s Tattoo Portfolio`,
            description: `Collection of ${specialty} tattoos by ${name}`,
            artist: name
        });
    }

    /**
     * Generate ImageGallery structured data for portfolio pages
     * @param {Object} galleryData - Gallery information
     */
    generateImageGalleryStructuredData(galleryData) {
        const { name, description, artist } = galleryData;
        
        const structuredData = {
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name,
            description,
            creator: {
                '@type': 'Person',
                name: artist,
                worksFor: {
                    '@type': 'LocalBusiness',
                    '@id': this.businessData['@id']
                }
            },
            about: {
                '@type': 'Thing',
                name: 'Tattoo Art',
                description: 'Professional tattoo artwork and designs'
            }
        };

        this.injectStructuredData('gallery-schema', structuredData);
    }
}

// Export for use in other modules
export default SEOManager;