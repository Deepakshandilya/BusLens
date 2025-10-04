import { useState, useEffect, useCallback } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'
import apiService from '../services/api'

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function Home() {
  const [searchFrom, setSearchFrom] = useState('')
  const [searchTo, setSearchTo] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showFromSuggestions, setShowFromSuggestions] = useState(false)
  const [showToSuggestions, setShowToSuggestions] = useState(false)
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [searchResultsData, setSearchResultsData] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [busLocations, setBusLocations] = useState([])
  const [systemStats, setSystemStats] = useState(null)

  // Load system stats on component mount
  useEffect(() => {
    loadSystemStats()
    loadBusLocations()
  }, [])

  const loadSystemStats = async () => {
    try {
      const stats = await apiService.getSystemAnalytics()
      setSystemStats(stats)
    } catch (error) {
      console.error('Failed to load system stats:', error)
    }
  }

  const loadBusLocations = async () => {
    try {
      const buses = await apiService.getBusLocations()
      setBusLocations(buses)
    } catch (error) {
      console.error('Failed to load bus locations:', error)
    }
  }

  const handleSearch = useCallback(async (query, type) => {
    if (query.length < 2) {
      setSearchResults([])
      setShowFromSuggestions(false)
      setShowToSuggestions(false)
      return
    }

    try {
      const results = await apiService.searchStations(query)
      setSearchResults(results)
      if (type === 'from') {
        setShowFromSuggestions(true)
        setShowToSuggestions(false)
      } else {
        setShowToSuggestions(true)
        setShowFromSuggestions(false)
      }
    } catch (error) {
      console.error('Search failed:', error)
      setSearchResults([])
    }
  }, [])

  const handleStationSelect = (station, type) => {
    if (type === 'from') {
      setSearchFrom(station.name)
      setShowFromSuggestions(false)
    } else {
      setSearchTo(station.name)
      setShowToSuggestions(false)
    }
    setSearchResults([])
  }

  const switchStations = () => {
    const temp = searchFrom
    setSearchFrom(searchTo)
    setSearchTo(temp)
  }

  const searchRoutes = async () => {
    if (!searchFrom || !searchTo) return

    setIsLoading(true)
    try {
      const results = await apiService.searchRoutes(searchFrom, searchTo)
      setSearchResultsData(results)
      setShowSearchResults(true)
    } catch (error) {
      console.error('Route search failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRouteColor = (route) => {
    const colors = {
      '101': '#6366f1',
      '205': '#10b981',
      '312': '#ef4444',
      '420': '#8b5cf6',
      '501': '#f59e0b'
    }
    return colors[route] || '#6b7280'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Time': return 'text-emerald-600'
      case 'Delayed': return 'text-amber-600'
      case 'Early': return 'text-blue-600'
      default: return 'text-slate-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50/30 via-transparent to-accent-50/30 dark:from-brand-900/20 dark:via-transparent dark:to-accent-900/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-200/40 dark:bg-brand-800/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-200/40 dark:bg-accent-800/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-200/40 dark:bg-emerald-800/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="container-px mx-auto relative z-10">
          <div className="max-w-7xl mx-auto pt-20 pb-32">
            {/* Hero Content */}
            <div className="text-center max-w-5xl mx-auto mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-200/50 dark:border-slate-700/50 mb-8">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Live Transit Data</span>
              </div>
              
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-slate-900 dark:text-slate-100 mb-8 leading-tight">
                <span className="bg-gradient-to-r from-brand-600 via-purple-600 to-accent-600 bg-clip-text text-transparent">
                  BusLens
                </span>
              </h1>
              
              <p className="text-2xl sm:text-3xl text-slate-600 dark:text-slate-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
                Your intelligent transit companion for the Tricity region
              </p>

              {/* System Stats */}
              {systemStats && (
                <div className="flex flex-wrap justify-center gap-8 mb-16">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-brand-600 dark:text-brand-400">{systemStats.total_routes}+</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Active Routes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{systemStats.total_stations}+</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Bus Stops</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent-600 dark:text-accent-400">{systemStats.active_buses}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Live Buses</div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Search Section */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 lg:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                    Plan Your Journey
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-lg">
                    Find the perfect route across Chandigarh, Panchkula & Mohali
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-end">
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      From
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={searchFrom}
                        onChange={(e) => {
                          setSearchFrom(e.target.value)
                          handleSearch(e.target.value, 'from')
                        }}
                        placeholder="Enter starting location"
                        className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 dark:bg-slate-700 dark:text-slate-100 transition-all duration-200"
                      />
                      {showFromSuggestions && searchResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-20 max-h-60 overflow-y-auto">
                          {searchResults.map((station, index) => (
                            <button
                              key={index}
                              onClick={() => handleStationSelect(station, 'from')}
                              className="w-full px-4 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-700 last:border-b-0 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-brand-500 rounded-full"></div>
                                <div>
                                  <div className="font-medium">{station.name}</div>
                                  <div className="text-sm text-slate-500 dark:text-slate-400">{station.city}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={switchStations}
                      className="p-4 bg-slate-100 dark:bg-slate-700 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-200 group"
                      title="Switch stations"
                    >
                      <svg className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </button>
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      To
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={searchTo}
                        onChange={(e) => {
                          setSearchTo(e.target.value)
                          handleSearch(e.target.value, 'to')
                        }}
                        placeholder="Enter destination"
                        className="w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 dark:bg-slate-700 dark:text-slate-100 transition-all duration-200"
                      />
                      {showToSuggestions && searchResults.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 z-20 max-h-60 overflow-y-auto">
                          {searchResults.map((station, index) => (
                            <button
                              key={index}
                              onClick={() => handleStationSelect(station, 'to')}
                              className="w-full px-4 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-700 last:border-b-0 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <div>
                                  <div className="font-medium">{station.name}</div>
                                  <div className="text-sm text-slate-500 dark:text-slate-400">{station.city}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button 
                    onClick={searchRoutes}
                    disabled={isLoading || !searchFrom || !searchTo}
                    className="px-12 py-4 bg-gradient-to-r from-brand-600 to-purple-600 text-white font-bold text-lg rounded-2xl hover:from-brand-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-xl"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Searching...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span>Find Routes</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {showSearchResults && (
        <section className="py-20 bg-white dark:bg-slate-900">
          <div className="container-px mx-auto max-w-7xl">
            <div className="mb-12">
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Available Routes
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Found {searchResultsData.length} routes from {searchFrom} to {searchTo}
              </p>
            </div>

            <div className="space-y-6">
              {searchResultsData.map((route) => (
                <div
                  key={route.id}
                  className={`bg-slate-50 dark:bg-slate-800 rounded-3xl border-2 border-slate-200 dark:border-slate-700 p-8 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                    selectedRoute?.id === route.id ? 'ring-4 ring-brand-500 border-brand-500 shadow-2xl' : ''
                  }`}
                  onClick={() => setSelectedRoute(route)}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-6">
                      <div 
                        className="w-20 h-20 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-lg"
                        style={{ backgroundColor: route.color }}
                      >
                        {route.route_number}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                          {route.name}
                        </h3>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                          {route.from_station_name} → {route.to_station_name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                        route.status === 'On Time' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {route.status || 'On Time'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-lg">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Duration:</span>
                      <span className="ml-2 font-bold text-slate-900 dark:text-slate-100">{route.duration_minutes} min</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Frequency:</span>
                      <span className="ml-2 font-bold text-slate-900 dark:text-slate-100">Every {route.frequency_minutes} min</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Stops:</span>
                      <span className="ml-2 font-bold text-slate-900 dark:text-slate-100">{route.total_stops}</span>
                    </div>
                    <div className="flex justify-end">
                      <button className="text-brand-600 hover:text-brand-700 font-bold text-lg group">
                        View Details 
                        <svg className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tricity Map Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
        <div className="container-px mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Tricity Transit Network
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Explore our comprehensive bus network across Chandigarh, Panchkula, and Mohali
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="h-[600px] w-full">
              <MapContainer
                center={[30.7333, 76.7794]}
                zoom={11}
                style={{ height: '100%', width: '100%' }}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Bus Markers */}
                {busLocations.map((bus) => (
                  <Marker key={bus.id} position={[bus.current_latitude, bus.current_longitude]}>
                    <Popup>
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div 
                            className="w-6 h-6 rounded-full" 
                            style={{ backgroundColor: bus.color }}
                          ></div>
                          <span className="text-lg font-bold">Route {bus.route_number}</span>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-slate-500">Status:</span>
                            <span className={`ml-2 font-bold ${getStatusColor(bus.status)}`}>
                              {bus.status}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">Next Stop:</span>
                            <span className="ml-2 font-bold">{bus.next_stop_name}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Passengers:</span>
                            <span className="ml-2 font-bold">{bus.passengers_count}</span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Cities Overview */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Chandigarh</h3>
              <p className="text-slate-600 dark:text-slate-400">Union Territory with modern infrastructure and planned sectors</p>
            </div>
            
            <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Panchkula</h3>
              <p className="text-slate-600 dark:text-slate-400">Haryana's planned city with excellent connectivity</p>
            </div>
            
            <div className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">Mohali</h3>
              <p className="text-slate-600 dark:text-slate-400">Punjab's modern city with growing commercial importance</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container-px mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-8">
                About BusLens
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                BusLens is your intelligent transit companion for the Tricity region. We combine 
                real-time data, smart algorithms, and user-centered design to make public 
                transportation accessible, efficient, and enjoyable.
              </p>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
                Our mission is to transform how people experience urban mobility through 
                technology that works seamlessly in the background.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href="https://github.com/deepakshandilya"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-lg rounded-2xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all duration-200 transform hover:scale-105 shadow-xl"
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
                <a
                  href="https://linkedin.com/in/deepakshandilyaa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-8 py-4 border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold text-lg rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-200 transform hover:scale-105"
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="bg-gradient-to-br from-brand-50 to-accent-50 dark:from-slate-800 dark:to-slate-700 rounded-3xl p-12">
              <div className="text-center">
                <div className="text-8xl font-black text-brand-600 mb-6">65+</div>
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">Bus Routes</div>
                <div className="text-slate-600 dark:text-slate-400 mb-12 text-lg">Covering entire Tricity region</div>
                
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-black text-brand-600 mb-2">700+</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Bus Stops</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-brand-600 mb-2">3</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">Cities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Route Details Modal */}
      {selectedRoute && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={() => setSelectedRoute(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 max-w-5xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-6">
                <div 
                  className="w-16 h-16 text-white rounded-2xl flex items-center justify-center font-black text-xl"
                  style={{ backgroundColor: selectedRoute.color }}
                >
                  {selectedRoute.route_number}
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {selectedRoute.name}
                  </h3>
                  <p className="text-lg text-slate-600 dark:text-slate-400">
                    {selectedRoute.from_station_name} → {selectedRoute.to_station_name}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedRoute(null)}
                className="p-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-8">
              <div className="grid grid-cols-3 gap-8">
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Duration</span>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{selectedRoute.duration_minutes} minutes</p>
                </div>
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Frequency</span>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">Every {selectedRoute.frequency_minutes} min</p>
                </div>
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Stops</span>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{selectedRoute.total_stops}</p>
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">Route Stops</h4>
                <div className="space-y-3">
                  {selectedRoute.stops?.map((stop, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
                      <div className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 dark:text-slate-100">{stop.name}</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">{stop.city}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}