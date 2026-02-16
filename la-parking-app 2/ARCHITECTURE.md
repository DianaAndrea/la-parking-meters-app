# Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                     LA PARKING FINDER APP                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│                  │          │                  │          │                  │
│  Mobile App      │  ◄────►  │  Node.js         │  ◄────►  │  LA City         │
│  (React Native)  │   HTTP   │  Backend API     │   HTTP   │  Open Data       │
│                  │          │  (Express)       │          │  (Socrata)       │
│                  │          │                  │          │                  │
└──────────────────┘          └──────────────────┘          └──────────────────┘
        │                              │                            │
        │                              │                            │
        ▼                              ▼                            ▼
   Your Phone                   Your Computer               LA City Servers
   (iOS/Android)                (localhost:3000)            (data.lacity.org)


DATA FLOW:
──────────

1. User opens mobile app
2. App requests parking data from YOUR backend
3. Backend fetches live data from LA City API
4. Backend processes and returns data to app
5. App displays parking spots with availability


TECHNOLOGIES:
─────────────

Frontend (Mobile):
├── React Native       → Cross-platform mobile framework
├── Expo              → Development and build tools
├── Axios             → HTTP requests to backend
└── React Native Maps → (Ready for map view)

Backend (API):
├── Node.js           → JavaScript runtime
├── Express           → Web framework
├── node-fetch        → HTTP client for LA City API
└── CORS              → Allow mobile app to connect

Data Source:
├── LA City Open Data → Official city parking data
├── Socrata SODA API  → REST API platform
└── Real-time sensors → 5,000+ parking meters


API ENDPOINTS:
──────────────

Mobile App ──► Node.js Backend ──► LA City API

GET /api/parking/occupancy     ──► Returns all parking spots
GET /api/parking/available     ──► Returns only vacant spots
GET /api/parking/nearby        ──► Returns spots near GPS coords
GET /api/parking/inventory     ──► Returns meter rates & policies
GET /api/parking/meter/:id     ──► Returns specific meter details


WHY THIS ARCHITECTURE?
──────────────────────

✓ JavaScript everywhere (one language to learn)
✓ Backend handles API rate limits & caching
✓ Mobile app stays simple and fast
✓ Easy to add features (maps, notifications, etc.)
✓ Backend can be deployed to cloud later
✓ Scales to thousands of users
