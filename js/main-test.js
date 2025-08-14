/**
 * Simplified Main Application Entry Point - For Testing
 * Minimal setup to identify loading issues
 */

console.log('Starting simplified app initialization...');

// Test basic module loading
try {
    // Test 1: Try loading basic modules one by one
    console.log('Loading basic modules...');
    
    // Remove the loading screen after 2 seconds for testing
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                console.log('Loading screen hidden successfully');
            }, 500);
        }
    }, 2000);
    
    console.log('Simplified app initialized successfully');
    
} catch (error) {
    console.error('Failed to initialize simplified app:', error);
}