import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import L from 'leaflet'

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function MapPage() {
  const [mapCenter, setMapCenter] = useState([30.7333, 76.7794]) // Chandigarh coordinates
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [showRealTime, setShowRealTime] = useState(false)

  // Mock Tricity bus data
  const buses = [
    {
      id: 1,
      route: '101',
      position: [30.7333, 76.7794],
      status: 'On Time',
      nextStop: 'Sector 17 Bus Stand',
      passengers: 45,
      color: '#2563eb'
    },
    {
      id: 2,
      route: '205',
      position: [30.7500, 76.8000],
      status: 'Delayed',
      nextStop: 'ISBT 43',
      passengers: 32,
      color: '#059669'
    },
    {
      id: 3,
      route: '312',
      position: [30.7200, 76.7500],
      status: 'On Time',
      nextStop: 'Panchkula Bus Stand',
      passengers: 28,
      color: '#dc2626'
    },
    {
      id: 4,
      route: '420',
      position: [30.7100, 76.7900],
      status: 'On Time',
      nextStop: 'Chandigarh Airport',
      passengers: 15,
      color: '#7c3aed'
    },
    {
      id: 5,
      route: '501',
      position: [30.7400, 76.7600],
      status: 'On Time',
      nextStop: 'Punjab University',
      passengers: 38,
      color: '#ea580c'
    }
  ]

  // Mock route paths for Tricity
  const routePaths = {
    '101': [
      [30.7333, 76.7794], // Sector 17
      [30.7500, 76.8000], // ISBT 43
      [30.7600, 76.8200], // Panchkula
      [30.7700, 76.8400]  // Panchkula Bus Stand
    ],
    '205': [
      [30.7500, 76.8000], // ISBT 43
      [30.7200, 76.7500], // Mohali
      [30.7100, 76.7300]  // Mohali Bus Stand
    ],
    '312': [
      [30.7333, 76.7794], // Sector 17
      [30.7500, 76.8000], // ISBT 43
      [30.7600, 76.8200], // Panchkula
      [30.7200, 76.7500], // Mohali
      [30.7000, 76.7000]  // Zirakpur
    ],
    '420': [
      [30.7100, 76.7900], // Airport
      [30.7200, 76.8000], // Sector 35
      [30.7500, 76.8000], // ISBT 43
      [30.7333, 76.7794]  // Sector 17
    ],
    '501': [
      [30.7400, 76.7600], // Punjab University
      [30.7500, 76.8000], // ISBT 43
      [30.7600, 76.8200], // Panchkula
      [30.7700, 76.8400]  // Panjab University
    ]
  }

  const getRouteColor = (route) => {
    const colors = {
      '101': '#2563eb',
      '205': '#059669',
      '312': '#dc2626',
      '420': '#7c3aed',
      '501': '#ea580c'
    }
    return colors[route] || '#6b7280'
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Time': return 'text-green-600'
      case 'Delayed': return 'text-yellow-600'
      case 'Early': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container-px mx-auto max-w-7xl section-y">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Tricity Bus Map
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Real-time bus locations and route tracking across Chandigarh, Panchkula, and Mohali.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 mb-6 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="realtime"
                  checked={showRealTime}
                  onChange={(e) => setShowRealTime(e.target.checked)}
                  className="w-5 h-5 text-brand-600 bg-gray-100 border-gray-300 rounded focus:ring-brand-500"
                />
                <label htmlFor="realtime" className="text-lg font-medium text-slate-700 dark:text-slate-300">
                  Real-time updates
                </label>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-lg text-slate-500 dark:text-slate-400">Route:</span>
              <select
                value={selectedRoute || ''}
                onChange={(e) => setSelectedRoute(e.target.value || null)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-lg dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="">All Routes</option>
                <option value="101">Route 101 (Chandigarh-Panchkula)</option>
                <option value="205">Route 205 (Chandigarh-Mohali)</option>
                <option value="312">Route 312 (Tricity Circular)</option>
                <option value="420">Route 420 (Airport Express)</option>
                <option value="501">Route 501 (University Line)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Map Container - Made smaller for better scrolling */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg mb-8">
          <div className="h-[500px] w-full">
            <MapContainer
              center={mapCenter}
              zoom={12}
              style={{ height: '100%', width: '100%' }}
              className="z-0"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {/* Route Paths */}
              {Object.entries(routePaths).map(([route, path]) => {
                if (selectedRoute && selectedRoute !== route) return null
                return (
                  <Polyline
                    key={route}
                    positions={path}
                    color={getRouteColor(route)}
                    weight={6}
                    opacity={0.8}
                  />
                )
              })}
              
              {/* Bus Markers */}
              {buses
                .filter(bus => !selectedRoute || bus.route === selectedRoute)
                .map((bus) => (
                  <Marker key={bus.id} position={bus.position}>
                    <Popup>
                      <div className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div 
                            className="w-6 h-6 rounded-full" 
                            style={{ backgroundColor: bus.color }}
                          ></div>
                          <span className="text-lg font-semibold">Route {bus.route}</span>
                        </div>
                        <div className="space-y-2 text-base">
                          <div>
                            <span className="text-slate-500">Status:</span>
                            <span className={`ml-2 font-medium ${getStatusColor(bus.status)}`}>
                              {bus.status}
                            </span>
                          </div>
                          <div>
                            <span className="text-slate-500">Next Stop:</span>
                            <span className="ml-2 font-medium">{bus.nextStop}</span>
                          </div>
                          <div>
                            <span className="text-slate-500">Passengers:</span>
                            <span className="ml-2 font-medium">{bus.passengers}</span>
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          </div>
        </div>

        {/* Bus Status List */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            Bus Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buses
              .filter(bus => !selectedRoute || bus.route === selectedRoute)
              .map((bus) => (
                <div key={bus.id} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: bus.color }}
                      ></div>
                      <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Route {bus.route}
                      </span>
                    </div>
                    <span className={`text-sm font-medium ${getStatusColor(bus.status)}`}>
                      {bus.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <div>Next: {bus.nextStop}</div>
                    <div>Passengers: {bus.passengers}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Route Legend */}
        <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Route Legend
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(routePaths).map(([route, path]) => (
              <div key={route} className="flex items-center gap-3">
                <div 
                  className="w-6 h-6 rounded" 
                  style={{ backgroundColor: getRouteColor(route) }}
                ></div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-slate-100">Route {route}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    {route === '101' && 'Chandigarh-Panchkula'}
                    {route === '205' && 'Chandigarh-Mohali'}
                    {route === '312' && 'Tricity Circular'}
                    {route === '420' && 'Airport Express'}
                    {route === '501' && 'University Line'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}