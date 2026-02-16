# LA Parking Finder

## Overview
A full-stack web application for finding real-time parking availability in Los Angeles using official city open data. Originally a React Native mobile app with a Node.js backend, adapted for web deployment on Replit.

## Project Architecture
- **Backend**: Node.js/Express API server (`backend/server.js`) that proxies LA City parking data
- **Frontend**: Static HTML/CSS/JS web app served from `backend/public/`
- **Mobile**: Original React Native/Expo mobile app in `mobile/` (reference only, not used in web deployment)
- **Data Source**: LA City Open Data Portal (Socrata/SODA API) - real-time parking sensor data

## Key Files
- `backend/server.js` - Express server with API endpoints and static file serving
- `backend/public/index.html` - Web frontend
- `backend/public/app.js` - Frontend JavaScript
- `backend/public/styles.css` - Frontend styles
- `backend/package.json` - Backend dependencies

## API Endpoints
- `GET /api/parking/occupancy` - All parking spots
- `GET /api/parking/available` - Vacant spots only
- `GET /api/parking/nearby?lat=&lon=&radius=` - Spots near coordinates
- `GET /api/parking/inventory` - Meter inventory and policies
- `GET /api/parking/meter/:meterId` - Specific meter details

## Running
- Server runs on port 5000 (bound to 0.0.0.0)
- No database required - data is fetched live from LA City API
- No API keys needed - LA City data is publicly accessible

## Recent Changes
- 2026-02-16: Initial Replit setup - moved files from nested directory, created web frontend, configured for port 5000
