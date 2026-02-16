const fetch = require('node-fetch');

// Colors for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const API_URL = 'http://localhost:3000';

async function testEndpoint(name, endpoint) {
  try {
    console.log(`\n${colors.blue}Testing: ${name}${colors.reset}`);
    console.log(`Endpoint: ${endpoint}`);
    
    const response = await fetch(`${API_URL}${endpoint}`);
    const data = await response.json();
    
    if (response.ok && data.success) {
      console.log(`${colors.green}✓ Success${colors.reset}`);
      console.log(`Data count: ${data.count || data.spotsFound || data.availableSpots || 'N/A'}`);
      
      // Show sample data
      if (data.data && data.data.length > 0) {
        console.log('\nSample record:');
        console.log(JSON.stringify(data.data[0], null, 2).substring(0, 300) + '...');
      }
      return true;
    } else {
      console.log(`${colors.red}✗ Failed${colors.reset}`);
      console.log('Response:', JSON.stringify(data, null, 2));
      return false;
    }
  } catch (error) {
    console.log(`${colors.red}✗ Error: ${error.message}${colors.reset}`);
    return false;
  }
}

async function runTests() {
  console.log(`${colors.yellow}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.yellow}  LA Parking API - Backend Test Suite${colors.reset}`);
  console.log(`${colors.yellow}═══════════════════════════════════════${colors.reset}`);
  
  const tests = [
    ['Health Check', '/'],
    ['Get Parking Occupancy', '/api/parking/occupancy?limit=10'],
    ['Get Available Spots', '/api/parking/available?limit=10'],
    ['Find Nearby Parking', '/api/parking/nearby?lat=34.0522&lon=-118.2437&radius=500'],
    ['Get Parking Inventory', '/api/parking/inventory?limit=10'],
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const [name, endpoint] of tests) {
    const result = await testEndpoint(name, endpoint);
    if (result) {
      passed++;
    } else {
      failed++;
    }
    
    // Wait a bit between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`\n${colors.yellow}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.yellow}  Test Results${colors.reset}`);
  console.log(`${colors.yellow}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.green}Passed: ${passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${failed}${colors.reset}`);
  console.log(`Total: ${passed + failed}`);
  
  if (failed === 0) {
    console.log(`\n${colors.green}🎉 All tests passed! Backend is working correctly.${colors.reset}`);
  } else {
    console.log(`\n${colors.red}⚠️  Some tests failed. Check the backend server.${colors.reset}`);
  }
}

// Check if server is running first
async function checkServer() {
  try {
    await fetch(API_URL);
    return true;
  } catch (error) {
    console.log(`${colors.red}✗ Backend server not running at ${API_URL}${colors.reset}`);
    console.log(`\nPlease start the server first:`);
    console.log(`  cd backend`);
    console.log(`  npm start\n`);
    return false;
  }
}

// Run tests
(async () => {
  const serverRunning = await checkServer();
  if (serverRunning) {
    await runTests();
  }
  process.exit(0);
})();
