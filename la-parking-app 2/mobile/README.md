# LA Parking Finder - Mobile App

React Native mobile app built with Expo that displays real-time parking availability in Los Angeles.

## 🚀 Quick Start

### Prerequisites
- Node.js installed
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your phone (download from App Store or Google Play)

### Installation

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# Start the app
npm start
```

This will open Expo Developer Tools in your browser. You can then:
- Scan the QR code with Expo Go (Android) or Camera app (iOS)
- Press `a` to open in Android emulator
- Press `i` to open in iOS simulator

## ⚙️ Configuration

**Important:** Before running the app, you need to configure the backend URL.

1. Open `App.js`
2. Find this line:
   ```javascript
   const API_BASE_URL = 'http://localhost:3000';
   ```
3. Replace with your computer's IP address:
   ```javascript
   const API_BASE_URL = 'http://192.168.1.XXX:3000';
   ```

**To find your IP address:**
- **Mac/Linux**: Run `ifconfig | grep inet` in terminal
- **Windows**: Run `ipconfig` in command prompt
- Look for your local network IP (usually starts with 192.168.x.x)

## 📱 Features

- ✅ View real-time parking occupancy
- ✅ Filter available spots only
- ✅ Pull-to-refresh for latest data
- ✅ Color-coded availability (green = available, red = occupied)
- ✅ Location coordinates for each meter
- ✅ Last updated timestamp

## 🎯 Next Steps to Add

1. **Map View** - Show parking spots on an interactive map
2. **Current Location** - Use device GPS to find nearby parking
3. **Navigation** - Get directions to available spots
4. **Rates & Hours** - Display pricing and time limits
5. **Favorites** - Save frequently used parking areas
6. **Notifications** - Alert when spots become available

## 🛠️ Tech Stack

- **React Native** - Mobile framework
- **Expo** - Development platform
- **Axios** - HTTP client
- **React Native Maps** (ready to use for map view)

## 📸 Screenshots

The app displays:
- Header with app title and current filter
- Toggle buttons for "All Spots" vs "Available Only"
- Scrollable list of parking spots with:
  - Meter ID
  - Availability status badge
  - GPS coordinates
  - Last update time

## 🧪 Testing

Make sure:
1. Backend server is running (`npm start` in backend folder)
2. Your phone and computer are on the same WiFi network
3. API_BASE_URL is set to your computer's IP address
4. Backend is accessible (test in browser: `http://YOUR_IP:3000`)

## 📚 Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [LA Open Data Portal](https://data.lacity.org/)
