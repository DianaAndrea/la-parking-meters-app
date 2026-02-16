const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  next();
});
app.use(express.static(path.join(__dirname, 'public')));

// LA City Parking API Endpoints
const LA_PARKING_OCCUPANCY_API = 'https://data.lacity.org/resource/e7h6-4a3e.json';
const LA_PARKING_INVENTORY_API = 'https://data.lacity.org/resource/s49e-q6j2.json';

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get real-time parking occupancy data
app.get('/api/parking/occupancy', async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const response = await fetch(`${LA_PARKING_OCCUPANCY_API}?$limit=${limit}`);
    const data = await response.json();
    
    res.json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get available (vacant) parking spots only
app.get('/api/parking/available', async (req, res) => {
  try {
    const limit = req.query.limit || 50;
    const response = await fetch(
      `${LA_PARKING_OCCUPANCY_API}?occupancystate=VACANT&$limit=${limit}`
    );
    const data = await response.json();
    
    res.json({
      success: true,
      availableSpots: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get parking spots near a location (lat/lon with radius in meters)
app.get('/api/parking/nearby', async (req, res) => {
  try {
    const { lat, lon, radius = 500 } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({
        success: false,
        error: 'Please provide lat and lon parameters'
      });
    }

    // Use SODA API's within_circle function
    const query = `$where=within_circle(location, ${lat}, ${lon}, ${radius})&$limit=100`;
    const response = await fetch(`${LA_PARKING_OCCUPANCY_API}?${query}`);
    const data = await response.json();
    
    res.json({
      success: true,
      location: { lat: parseFloat(lat), lon: parseFloat(lon) },
      radiusMeters: parseInt(radius),
      spotsFound: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get parking meter inventory and policies
app.get('/api/parking/inventory', async (req, res) => {
  try {
    const limit = req.query.limit || 100;
    const response = await fetch(`${LA_PARKING_INVENTORY_API}?$limit=${limit}`);
    const data = await response.json();
    
    res.json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get parking details by specific meter ID
app.get('/api/parking/meter/:meterId', async (req, res) => {
  try {
    const { meterId } = req.params;
    
    // Get occupancy data
    const occupancyResponse = await fetch(
      `${LA_PARKING_OCCUPANCY_API}?meterid=${meterId}`
    );
    const occupancyData = await occupancyResponse.json();
    
    // Get inventory/policy data
    const inventoryResponse = await fetch(
      `${LA_PARKING_INVENTORY_API}?meterid=${meterId}`
    );
    const inventoryData = await inventoryResponse.json();
    
    res.json({
      success: true,
      meterId: meterId,
      occupancy: occupancyData[0] || null,
      details: inventoryData[0] || null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`LA Parking API Server running on port ${PORT}`);
});
