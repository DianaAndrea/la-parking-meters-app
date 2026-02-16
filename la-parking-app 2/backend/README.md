# LA Parking Backend API

Node.js/Express server that fetches real-time parking data from LA City's open data portal.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start the server
npm start

# For development with auto-reload
npm run dev
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Health Check
```
GET /
```
Returns server status and available endpoints.

### Get Real-Time Occupancy
```
GET /api/parking/occupancy?limit=100
```
Returns current parking occupancy for all monitored spots.

### Get Available Spots Only
```
GET /api/parking/available?limit=50
```
Returns only vacant parking spots.

### Find Nearby Parking
```
GET /api/parking/nearby?lat=34.0522&lon=-118.2437&radius=500
```
- `lat` - Latitude (required)
- `lon` - Longitude (required)
- `radius` - Search radius in meters (default: 500)

### Get Parking Inventory
```
GET /api/parking/inventory?limit=100
```
Returns meter locations, rates, and policies.

### Get Specific Meter Details
```
GET /api/parking/meter/:meterId
```
Returns both occupancy and policy info for a specific meter.

## 🧪 Test Examples

```bash
# Get all available spots
curl http://localhost:3000/api/parking/available

# Find parking near Downtown LA
curl "http://localhost:3000/api/parking/nearby?lat=34.0522&lon=-118.2437&radius=1000"

# Get specific meter info
curl http://localhost:3000/api/parking/meter/DT1A-4531
```

## 📊 Data Source

This API uses Los Angeles City's open data portal:
- **Parking Occupancy**: https://data.lacity.org/resource/e7h6-4a3e.json
- **Parking Inventory**: https://data.lacity.org/resource/s49e-q6j2.json

## 🔧 Tech Stack

- **Express.js** - Web framework
- **node-fetch** - HTTP client for API calls
- **CORS** - Cross-origin resource sharing
- **Socrata/SODA API** - LA City data platform
