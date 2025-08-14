#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 Running comprehensive test suite for Valhalla Tattoo website');
console.log('================================================================\n');

let overallResults = {
  tests: [],
  totalPassed: 0,
  totalFailed: 0,
  totalWarnings: 0,
  startTime: new Date(),
  endTime: null
};

// Run a test script and capture results
function runTestScript(scriptName, description) {
  return new Promise((resolve) => {
    console.log(`🔄 Running ${description}...`);
    
    const scriptPath = path.join(__dirname, scriptName);
    const testProcess = spawn('node', [scriptPath], {
      stdio: 'pipe'
    });
    
    let output = '';
    let errorOutput = '';
    
    testProcess.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    testProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });
    
    testProcess.on('close', (code) => {
      const result = {
        script: scriptName,
        description: description,
        exitCode: code,
        output: output,
        error: errorOutput,
        passed: code === 0,
        timestamp: new Date()
      };
      
      overallResults.tests.push(result);
      
      if (code === 0) {
        console.log(`✅ ${description} - PASSED\n`);
        overallResults.totalPassed++;
      } else {
        console.log(`❌ ${description} - FAILED (Exit code: ${code})\n`);
        overallResults.totalFailed++;
      }
      
      resolve(result);
    });
    
    testProcess.on('error', (error) => {
      console.log(`❌ ${description} - ERROR: ${error.message}\n`);
      overallResults.totalFailed++;
      resolve({
        script: scriptName,
        description: description,
        exitCode: -1,
        output: '',
        error: error.message,
        passed: false,
        timestamp: new Date()
      });
    });
  });
}

// Main test execution
async function runAllTests() {
  try {
    console.log('Starting comprehensive testing...\n');
    
    // Test sequence
    const testSequence = [
      { script: 'test-runner.js', description: 'Basic Structure Tests' },
      { script: 'performance-test.js', description: 'Performance Analysis' },
      { script: 'final-testing.js', description: 'Final Integration Tests' },
      { script: 'launch-checklist.js', description: 'Launch Readiness Checklist' }
    ];
    
    // Run tests sequentially
    for (const test of testSequence) {
      await runTestScript(test.script, test.description);
    }
    
    // Generate comprehensive report
    generateComprehensiveReport();
    
  } catch (error) {
    console.error('❌ Test suite execution failed:', error);
    process.exit(1);
  }
}

// Generate comprehensive report
function generateComprehensiveReport() {
  overallResults.endTime = new Date();
  const duration = Math.round((overallResults.endTime - overallResults.startTime) / 1000);
  
  console.log('📊 COMPREHENSIVE TEST RESULTS');
  console.log('==============================\n');
  
  // Summary
  console.log('📈 Test Summary:');
  console.log(`   ✅ Passed: ${overallResults.totalPassed}`);
  console.log(`   ❌ Failed: ${overallResults.totalFailed}`);
  console.log(`   ⏱️  Duration: ${duration} seconds`);
  console.log(`   📝 Total Test Suites: ${overallResults.tests.length}\n`);
  
  // Individual test results
  console.log('📋 Individual Test Results:');
  overallResults.tests.forEach((test, index) => {
    const icon = test.passed ? '✅' : '❌';
    console.log(`   ${icon} ${test.description}`);
    
    if (!test.passed && test.error) {
      console.log(`      Error: ${test.error}`);
    }
  });
  
  // Overall assessment
  console.log('\n🎯 Overall Assessment:');
  
  if (overallResults.totalFailed === 0) {
    console.log('🟢 ALL TESTS PASSED - Website is ready for launch!');
    console.log('\n🚀 Launch Recommendations:');
    console.log('   1. Deploy to staging environment for final review');
    console.log('   2. Configure production analytics and monitoring');
    console.log('   3. Set up custom domain and SSL certificate');
    console.log('   4. Test contact forms with real email delivery');
    console.log('   5. Verify social media integrations are working');
    console.log('   6. Launch and monitor for any issues');
    
  } else if (overallResults.totalFailed <= 2) {
    console.log('🟡 MOSTLY READY - Minor issues to address');
    console.log('\n⚠️  Action Required:');
    console.log('   1. Review failed test results above');
    console.log('   2. Fix identified issues');
    console.log('   3. Re-run tests to verify fixes');
    console.log('   4. Proceed with launch preparation');
    
  } else {
    console.log('🔴 NOT READY FOR LAUNCH - Multiple critical issues');
    console.log('\n🚨 Critical Actions Required:');
    console.log('   1. Review all failed test results');
    console.log('   2. Fix critical issues before proceeding');
    console.log('   3. Re-run full test suite');
    console.log('   4. Do not launch until all tests pass');
  }
  
  // Detailed logs
  console.log('\n📄 Detailed Test Logs:');
  overallResults.tests.forEach((test, index) => {
    if (!test.passed) {
      console.log(`\n--- ${test.description} (FAILED) ---`);
      if (test.output) {
        console.log('Output:', test.output.slice(-500)); // Last 500 chars
      }
      if (test.error) {
        console.log('Error:', test.error);
      }
    }
  });
  
  // Save comprehensive report
  const reportData = {
    ...overallResults,
    summary: {
      totalTests: overallResults.tests.length,
      passed: overallResults.totalPassed,
      failed: overallResults.totalFailed,
      passRate: Math.round((overallResults.totalPassed / overallResults.tests.length) * 100),
      duration: duration,
      readyForLaunch: overallResults.totalFailed === 0
    }
  };
  
  const reportPath = path.join(__dirname, '../comprehensive-test-results.json');
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  console.log(`\n📁 Comprehensive report saved to: ${reportPath}`);
  
  // Exit with appropriate code
  if (overallResults.totalFailed === 0) {
    console.log('\n🎉 All tests passed! Ready for launch!');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Please address issues before launch.');
    process.exit(1);
  }
}

// Additional utility functions
function createTestSummaryHTML() {
  const htmlReport = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Valhalla Tattoo - Test Results</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 20px; }
        .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px; }
        .metric { background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); text-align: center; }
        .metric-value { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .test-results { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .test-item { padding: 10px; border-bottom: 1px solid #eee; display: flex; align-items: center; }
        .test-icon { margin-right: 10px; font-size: 18px; }
        .timestamp { color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎨 Valhalla Tattoo - Test Results</h1>
        <p class="timestamp">Generated: ${new Date().toLocaleString()}</p>
    </div>
    
    <div class="summary">
        <div class="metric">
            <div class="metric-value passed">${overallResults.totalPassed}</div>
            <div>Tests Passed</div>
        </div>
        <div class="metric">
            <div class="metric-value failed">${overallResults.totalFailed}</div>
            <div>Tests Failed</div>
        </div>
        <div class="metric">
            <div class="metric-value">${overallResults.tests.length}</div>
            <div>Total Suites</div>
        </div>
        <div class="metric">
            <div class="metric-value">${Math.round((overallResults.totalPassed / overallResults.tests.length) * 100)}%</div>
            <div>Pass Rate</div>
        </div>
    </div>
    
    <div class="test-results">
        <h2>Test Suite Results</h2>
        ${overallResults.tests.map(test => `
            <div class="test-item">
                <span class="test-icon">${test.passed ? '✅' : '❌'}</span>
                <div>
                    <strong>${test.description}</strong>
                    <div class="timestamp">${test.timestamp.toLocaleString()}</div>
                    ${!test.passed && test.error ? `<div style="color: #dc3545; font-size: 12px; margin-top: 5px;">${test.error}</div>` : ''}
                </div>
            </div>
        `).join('')}
    </div>
</body>
</html>`;
  
  const htmlPath = path.join(__dirname, '../test-results.html');
  fs.writeFileSync(htmlPath, htmlReport);
  console.log(`📄 HTML report saved to: ${htmlPath}`);
}

// Run the comprehensive test suite
console.log('🚀 Initializing test environment...\n');
runAllTests();