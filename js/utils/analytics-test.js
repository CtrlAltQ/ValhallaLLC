/**
 * Analytics Testing Utilities
 * Helper functions for testing and debugging analytics implementation
 */

class AnalyticsTestSuite {
    constructor(analyticsManager) {
        this.analytics = analyticsManager;
        this.testResults = [];
    }

    /**
     * Run all analytics tests
     */
    async runAllTests() {
        console.log('🧪 Starting Analytics Test Suite...');
        
        this.testResults = [];
        
        // Test basic functionality
        await this.testInitialization();
        await this.testConsentManagement();
        await this.testEventTracking();
        await this.testFormTracking();
        await this.testPortfolioTracking();
        await this.testSocialTracking();
        await this.testPerformanceTracking();
        
        this.displayResults();
    }

    /**
     * Test analytics initialization
     */
    async testInitialization() {
        console.log('Testing analytics initialization...');
        
        try {
            const isReady = this.analytics.isReady();
            const consentStatus = this.analytics.getConsentStatus();
            
            this.addResult('Initialization', {
                isReady,
                consentStatus,
                measurementId: this.analytics.measurementId
            }, isReady);
            
        } catch (error) {
            this.addResult('Initialization', { error: error.message }, false);
        }
    }

    /**
     * Test consent management
     */
    async testConsentManagement() {
        console.log('Testing consent management...');
        
        try {
            const initialConsent = this.analytics.getConsentStatus();
            
            // Test consent granting
            this.analytics.updateConsent(true);
            const grantedConsent = this.analytics.getConsentStatus();
            
            // Test consent denial
            this.analytics.updateConsent(false);
            const deniedConsent = this.analytics.getConsentStatus();
            
            // Restore original state
            this.analytics.updateConsent(initialConsent);
            
            this.addResult('Consent Management', {
                initialConsent,
                grantedConsent,
                deniedConsent,
                finalConsent: this.analytics.getConsentStatus()
            }, grantedConsent === true && deniedConsent === false);
            
        } catch (error) {
            this.addResult('Consent Management', { error: error.message }, false);
        }
    }

    /**
     * Test event tracking
     */
    async testEventTracking() {
        console.log('Testing event tracking...');
        
        try {
            // Test basic event tracking
            this.analytics.trackEvent('test_event', {
                test_parameter: 'test_value',
                event_category: 'testing'
            });
            
            // Test page view tracking
            this.analytics.trackPageView({
                page_title: 'Test Page',
                page_path: '/test'
            });
            
            this.addResult('Event Tracking', {
                basicEvent: 'test_event sent',
                pageView: 'page_view sent'
            }, true);
            
        } catch (error) {
            this.addResult('Event Tracking', { error: error.message }, false);
        }
    }

    /**
     * Test form tracking
     */
    async testFormTracking() {
        console.log('Testing form tracking...');
        
        try {
            // Test form submission tracking
            this.analytics.trackFormSubmission('test_form', {
                artist: 'jimmy',
                destination: 'test@example.com'
            });
            
            // Test contact conversion tracking
            this.analytics.trackContactConversion({
                artist: 'jimmy',
                source: 'test',
                value: 1
            });
            
            this.addResult('Form Tracking', {
                formSubmission: 'form_submit sent',
                contactConversion: 'generate_lead sent'
            }, true);
            
        } catch (error) {
            this.addResult('Form Tracking', { error: error.message }, false);
        }
    }

    /**
     * Test portfolio tracking
     */
    async testPortfolioTracking() {
        console.log('Testing portfolio tracking...');
        
        try {
            // Test portfolio interaction tracking
            this.analytics.trackPortfolioInteraction('click', {
                artist_name: 'jimmy',
                image_id: 'test_image_1',
                portfolio_section: 'main'
            });
            
            this.addResult('Portfolio Tracking', {
                portfolioInteraction: 'portfolio_interaction sent'
            }, true);
            
        } catch (error) {
            this.addResult('Portfolio Tracking', { error: error.message }, false);
        }
    }

    /**
     * Test social media tracking
     */
    async testSocialTracking() {
        console.log('Testing social media tracking...');
        
        try {
            // Test social click tracking
            this.analytics.trackSocialClick('instagram', 'hero');
            
            // Test newsletter signup tracking
            this.analytics.trackNewsletterSignup({
                source: 'website',
                location: 'footer'
            });
            
            this.addResult('Social Tracking', {
                socialClick: 'social_click sent',
                newsletterSignup: 'newsletter_signup sent'
            }, true);
            
        } catch (error) {
            this.addResult('Social Tracking', { error: error.message }, false);
        }
    }

    /**
     * Test performance tracking
     */
    async testPerformanceTracking() {
        console.log('Testing performance tracking...');
        
        try {
            // Test performance metrics tracking
            this.analytics.trackPerformance({
                page_load_time: 1500,
                dom_content_loaded: 800,
                first_contentful_paint: 1200
            });
            
            // Test scroll depth tracking
            this.analytics.trackScrollDepth(50);
            
            this.addResult('Performance Tracking', {
                performanceMetrics: 'page_performance sent',
                scrollDepth: 'scroll sent'
            }, true);
            
        } catch (error) {
            this.addResult('Performance Tracking', { error: error.message }, false);
        }
    }

    /**
     * Add test result
     */
    addResult(testName, data, passed) {
        this.testResults.push({
            test: testName,
            passed,
            data,
            timestamp: new Date().toISOString()
        });
    }

    /**
     * Display test results
     */
    displayResults() {
        console.log('\n📊 Analytics Test Results:');
        console.log('========================');
        
        let passedTests = 0;
        let totalTests = this.testResults.length;
        
        this.testResults.forEach(result => {
            const status = result.passed ? '✅ PASS' : '❌ FAIL';
            console.log(`${status} ${result.test}`);
            
            if (result.passed) {
                passedTests++;
            } else {
                console.log(`   Error: ${JSON.stringify(result.data, null, 2)}`);
            }
        });
        
        console.log('========================');
        console.log(`Results: ${passedTests}/${totalTests} tests passed`);
        
        if (passedTests === totalTests) {
            console.log('🎉 All analytics tests passed!');
        } else {
            console.log('⚠️  Some tests failed. Check the errors above.');
        }
        
        return {
            passed: passedTests,
            total: totalTests,
            success: passedTests === totalTests,
            results: this.testResults
        };
    }

    /**
     * Test specific event manually
     */
    testEvent(eventName, parameters = {}) {
        console.log(`🧪 Testing event: ${eventName}`);
        
        try {
            this.analytics.trackEvent(eventName, {
                ...parameters,
                test_mode: true,
                timestamp: Date.now()
            });
            
            console.log('✅ Event sent successfully');
            return true;
        } catch (error) {
            console.error('❌ Event failed:', error);
            return false;
        }
    }

    /**
     * Monitor real-time events
     */
    startEventMonitoring() {
        console.log('🔍 Starting event monitoring...');
        console.log('Check Google Analytics Real-time reports to see events');
        
        // Override the trackEvent method to log all events
        const originalTrackEvent = this.analytics.trackEvent.bind(this.analytics);
        
        this.analytics.trackEvent = (eventName, parameters) => {
            console.log(`📡 Event: ${eventName}`, parameters);
            return originalTrackEvent(eventName, parameters);
        };
        
        console.log('Event monitoring active. All events will be logged to console.');
    }

    /**
     * Stop event monitoring
     */
    stopEventMonitoring() {
        console.log('🛑 Stopping event monitoring...');
        // This would need to restore the original method
        // Implementation depends on how monitoring was set up
    }
}

// Export for use in browser console
window.AnalyticsTestSuite = AnalyticsTestSuite;

// Auto-create test suite when analytics is available
document.addEventListener('valhalla:initialized', (event) => {
    const app = event.detail.app;
    const analytics = app.getAnalytics();
    
    if (analytics) {
        window.analyticsTestSuite = new AnalyticsTestSuite(analytics);
        
        console.log('🧪 Analytics Test Suite ready!');
        console.log('Run tests with: analyticsTestSuite.runAllTests()');
        console.log('Test specific event: analyticsTestSuite.testEvent("event_name", {param: "value"})');
        console.log('Monitor events: analyticsTestSuite.startEventMonitoring()');
    }
});

export default AnalyticsTestSuite;