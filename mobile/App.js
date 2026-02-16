import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import axios from 'axios';

// Configure your backend API URL
// DEPLOYMENT: Replace this with your Replit URL (e.g., 'https://your-repl-name.yourname.repl.co')
// LOCAL: Use your computer's IP address (e.g., 'http://192.168.1.100:3000')
const API_BASE_URL = 'https://YOUR-REPLIT-URL-HERE.repl.co'; // ⚠️ CHANGE THIS!

export default function App() {
  const [parkingSpots, setParkingSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all' or 'available'

  // Fetch parking data
  const fetchParkingData = async () => {
    try {
      const endpoint = filter === 'available' 
        ? '/api/parking/available?limit=50'
        : '/api/parking/occupancy?limit=100';
      
      const response = await axios.get(`${API_BASE_URL}${endpoint}`);
      
      if (response.data.success) {
        setParkingSpots(response.data.data);
      }
      setLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching parking data:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchParkingData();
  }, [filter]);

  // Pull to refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchParkingData();
  };

  // Render individual parking spot
  const renderParkingSpot = ({ item }) => {
    const isVacant = item.occupancystate === 'VACANT';
    const location = item.location || {};
    
    return (
      <View style={[
        styles.card,
        isVacant ? styles.cardAvailable : styles.cardOccupied
      ]}>
        <View style={styles.cardHeader}>
          <Text style={styles.meterId}>Meter: {item.meterid || 'N/A'}</Text>
          <View style={[
            styles.statusBadge,
            isVacant ? styles.badgeAvailable : styles.badgeOccupied
          ]}>
            <Text style={styles.statusText}>
              {isVacant ? '✓ AVAILABLE' : '✗ OCCUPIED'}
            </Text>
          </View>
        </View>
        
        {item.spaceid && (
          <Text style={styles.spaceId}>Space: {item.spaceid}</Text>
        )}
        
        {location.latitude && location.longitude && (
          <Text style={styles.coordinates}>
            📍 {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </Text>
        )}
        
        {item.eventtime && (
          <Text style={styles.timestamp}>
            Updated: {new Date(item.eventtime).toLocaleTimeString()}
          </Text>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading parking data...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🚗 LA Parking Finder</Text>
        <Text style={styles.subtitle}>
          {filter === 'available' ? 'Available Spots' : 'All Spots'}
        </Text>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'all' && styles.filterButtonActive
          ]}
          onPress={() => setFilter('all')}
        >
          <Text style={[
            styles.filterButtonText,
            filter === 'all' && styles.filterButtonTextActive
          ]}>
            All Spots ({parkingSpots.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.filterButton,
            filter === 'available' && styles.filterButtonActive
          ]}
          onPress={() => setFilter('available')}
        >
          <Text style={[
            styles.filterButtonText,
            filter === 'available' && styles.filterButtonTextActive
          ]}>
            Available Only
          </Text>
        </TouchableOpacity>
      </View>

      {/* Parking List */}
      <FlatList
        data={parkingSpots}
        renderItem={renderParkingSpot}
        keyExtractor={(item, index) => `${item.meterid}-${index}`}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No parking data available</Text>
            <Text style={styles.emptySubtext}>Pull down to refresh</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardAvailable: {
    borderColor: '#34C759',
  },
  cardOccupied: {
    borderColor: '#FF3B30',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  meterId: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeAvailable: {
    backgroundColor: '#34C759',
  },
  badgeOccupied: {
    backgroundColor: '#FF3B30',
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  spaceId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  coordinates: {
    fontSize: 14,
    color: '#007AFF',
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});
