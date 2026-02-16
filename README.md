# 🚗 LA Parking Finder

A full-stack mobile application for finding real-time parking availability in Los Angeles using official city data.

## 🚀 Two Ways to Get Started

### Option 1: Deploy to Cloud (RECOMMENDED - Easiest!)
☁️ **No local setup needed!** Deploy backend to Replit in 5 minutes.

👉 **Follow the [DEPLOYMENT.md](DEPLOYMENT.md) guide**

**Why this is better:**
- ✅ No Node.js installation needed
- ✅ Backend runs 24/7 in the cloud
- ✅ No IP address configuration
- ✅ Works from anywhere
- ✅ Free to start

### Option 2: Run Locally
💻 Run on your own computer for development.

👉 **Follow the [QUICKSTART.md](QUICKSTART.md) guide**

**Use this if you:**
- Want to modify the backend code
- Prefer local development
- Don't want cloud dependencies

---

```
la-parking-app/
├── backend/          # Node.js/Express API server
│   ├── server.js     # Main server file
│   ├── package.json  # Backend dependencies
│   └── README.md     # Backend documentation
└── mobile/           # React Native mobile app
    ├── App.js        # Main app component
    ├── package.json  # Mobile dependencies
    └── README.md     # Mobile documentation
```

## 🎯 What This App Does

- **Real-time Data**: Fetches live parking occupancy from 5,000+ sensors across LA
- **Filter Available Spots**: Show only vacant parking spaces
- **Location Info**: GPS coordinates for each parking meter
- **Refresh Updates**: Pull down to get latest parking status
- **Cross-Platform**: Works on both iOS and Android

## 🚀 Complete Setup Guide

### Step 1: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

Server will run at `http://localhost:3000`

**Test it's working:**
```bash
# In another terminal
curl http://localhost:3000/api/parking/available
```

You should see JSON data with available parking spots!

### Step 2: Mobile App Setup

```bash
# Navigate to mobile folder
cd mobile

# Install dependencies
npm install

# Install Expo CLI globally (if not already installed)
npm install -g expo-cli

# Start the app
npm start
```

### Step 3: Configure Mobile App

**IMPORTANT:** The mobile app needs to connect to your backend.

1. Find your computer's IP address:
   - **Mac/Linux**: `ifconfig | grep "inet "` (look for 192.168.x.x)
   - **Windows**: `ipconfig` (look for IPv4 Address)

2. Open `mobile/App.js` and update line 16:
   ```javascript
   const API_BASE_URL = 'http://YOUR_IP_HERE:3000';
   // Example: 'http://192.168.1.105:3000'
   ```

3. Make sure your phone and computer are on the **same WiFi network**

### Step 4: Run on Your Phone

1. Download **Expo Go** app:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Scan the QR code from the Expo terminal with:
   - **iOS**: Camera app
   - **Android**: Expo Go app

The app will load on your phone! 🎉

## 🧪 Testing

### Test Backend Endpoints

```bash
# Get all parking data
curl http://localhost:3000/api/parking/occupancy

# Get only available spots
curl http://localhost:3000/api/parking/available

# Find parking near Downtown LA
curl "http://localhost:3000/api/parking/nearby?lat=34.0522&lon=-118.2437&radius=500"

# Get specific meter details
curl http://localhost:3000/api/parking/meter/DT1A-4531
```

### Test Mobile App

1. Open the app on your phone
2. You should see a list of parking spots
3. Tap "Available Only" to filter vacant spots
4. Pull down to refresh data
5. Each card shows:
   - Meter ID
   - Availability status (green = available, red = occupied)
   - GPS coordinates
   - Last update time

## 📊 Data Source

This app uses the **Los Angeles Open Data Portal**:
- **API**: Socrata/SODA platform
- **Update Frequency**: Real-time sensor data
- **Coverage**: Downtown LA, Hollywood, Westwood, Venice Beach
- **Meters**: 5,000+ parking spaces with sensors

**Official Data Links:**
- [Parking Occupancy Dataset](https://data.lacity.org/Transportation/LA-Express-Park-Occupancy/e7h6-4a3e)
- [Parking Inventory Dataset](https://data.lacity.org/Transportation/LA-Express-Park-Meter-Inventory/s49e-q6j2)

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **node-fetch** - HTTP client
- **CORS** - Cross-origin requests

### Mobile
- **React Native** - Mobile framework
- **Expo** - Development platform
- **Axios** - API requests
- **React Native Maps** - Ready for map integration

### Data
- **LA City Open Data** - Real-time parking sensors
- **Socrata SODA API** - RESTful data platform

## 🎨 App Features

### Current Features
✅ Real-time parking occupancy  
✅ Filter available spots  
✅ Pull-to-refresh  
✅ Color-coded status  
✅ Location coordinates  
✅ Last update timestamp  

### Ready to Add Next
🔲 Interactive map view  
🔲 GPS-based "find nearby parking"  
🔲 Navigation to spots  
🔲 Pricing & time limit info  
🔲 Push notifications  
🔲 Save favorite locations  
🔲 Historical availability patterns  

## 🐛 Troubleshooting

**Mobile app shows "Network Error":**
- Check backend is running (`curl http://localhost:3000`)
- Verify API_BASE_URL uses your computer's IP, not localhost
- Confirm phone and computer on same WiFi
- Check firewall isn't blocking port 3000

**No parking data showing:**
- LA City API might be down temporarily
- Check internet connection
- Try refreshing (pull down)

**Expo won't start:**
- Clear cache: `expo start -c`
- Reinstall: `rm -rf node_modules && npm install`

## 📚 Learning Resources

- [Node.js Docs](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/guide)
- [React Native Docs](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [LA Open Data Portal](https://data.lacity.org/)

## 🚀 Next Steps

1. **Add Map View**: Use React Native Maps to show spots on a map
2. **Get User Location**: Use Expo Location to find nearby parking
3. **Show Pricing**: Integrate parking meter inventory data
4. **Build Navigation**: Directions to available spots
5. **Deploy Backend**: Host on Heroku, Railway, or AWS
6. **Publish App**: Submit to App Store and Google Play

## 📄 License

This is a learning project. LA City parking data is public domain.

## 🙏 Credits

- **Data**: City of Los Angeles Open Data Portal
- **Platform**: Built with Node.js, Express, React Native, and Expo
