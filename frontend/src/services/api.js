// API service for BusLens backend integration
const API_BASE_URL = 'http://localhost:5000'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Search routes using existing backend
  async searchRoutes(from, to) {
    try {
      const response = await this.request('/bus-routes', {
        method: 'POST',
        body: JSON.stringify({
          stop1: from,
          stop2: to
        })
      })
      
      // Transform the response to match our frontend expectations
      return response.map((bus, index) => ({
        id: bus.bus_id || index + 1,
        route_number: bus.bus_number || `BUS-${bus.bus_id}`,
        name: `${from} to ${to} Express`,
        from_station_name: from,
        to_station_name: to,
        duration_minutes: 30, // Default duration
        frequency_minutes: 15, // Default frequency
        total_stops: 8, // Default stops
        status: 'On Time',
        color: this.getRouteColor(bus.bus_id || index + 1)
      }))
    } catch (error) {
      console.error('Route search failed:', error)
      // Return mock data if API fails
      return this.getMockRoutes(from, to)
    }
  }

  getRouteColor(busId) {
    const colors = ['#6366f1', '#10b981', '#ef4444', '#8b5cf6', '#f59e0b']
    return colors[busId % colors.length]
  }

  // Mock data for development
  getMockRoutes(from, to) {
    return [
      {
        id: 1,
        route_number: '101',
        name: 'Chandigarh-Panchkula Express',
        from_station_name: from,
        to_station_name: to,
        duration_minutes: 25,
        frequency_minutes: 10,
        total_stops: 8,
        status: 'On Time',
        color: '#6366f1'
      },
      {
        id: 2,
        route_number: '205',
        name: 'Chandigarh-Mohali Connector',
        from_station_name: from,
        to_station_name: to,
        duration_minutes: 20,
        frequency_minutes: 15,
        total_stops: 6,
        status: 'On Time',
        color: '#10b981'
      },
      {
        id: 3,
        route_number: '312',
        name: 'Tricity Circular',
        from_station_name: from,
        to_station_name: to,
        duration_minutes: 45,
        frequency_minutes: 20,
        total_stops: 12,
        status: 'Delayed 5 min',
        color: '#ef4444'
      }
    ]
  }

  // Mock station search
  async searchStations(query) {
    const stations = [
      'Sector 17 Bus Stand, Chandigarh',
      'ISBT 43, Chandigarh',
      'Panchkula Bus Stand',
      'Mohali Bus Stand',
      'Sector 22, Chandigarh',
      'Sector 35, Chandigarh',
      'Sector 43, Chandigarh',
      'Zirakpur Bus Stand',
      'Derabassi Bus Stand',
      'Kharar Bus Stand',
      'Rajpura Bus Stand',
      'Chandigarh Airport',
      'Punjab University',
      'Panjab University'
    ]

    return stations
      .filter(station => station.toLowerCase().includes(query.toLowerCase()))
      .map(station => ({
        name: station,
        city: station.split(', ')[1] || 'Chandigarh'
      }))
  }

  // Mock system analytics
  async getSystemAnalytics() {
    return {
      total_routes: 65,
      total_stations: 700,
      active_buses: 12
    }
  }

  // Mock bus locations
  async getBusLocations() {
    return [
      {
        id: 1,
        route_number: '101',
        current_latitude: 30.7333,
        current_longitude: 76.7794,
        status: 'On Time',
        passengers_count: 45,
        color: '#6366f1',
        next_stop_name: 'Sector 17 Bus Stand'
      },
      {
        id: 2,
        route_number: '205',
        current_latitude: 30.7500,
        current_longitude: 76.8000,
        status: 'On Time',
        passengers_count: 32,
        color: '#10b981',
        next_stop_name: 'ISBT 43'
      },
      {
        id: 3,
        route_number: '312',
        current_latitude: 30.7200,
        current_longitude: 76.7500,
        status: 'Delayed',
        passengers_count: 28,
        color: '#ef4444',
        next_stop_name: 'Panchkula Bus Stand'
      }
    ]
  }
}

// Create singleton instance
const apiService = new ApiService()

export default apiService
