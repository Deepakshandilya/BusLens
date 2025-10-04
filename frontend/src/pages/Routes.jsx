import { useState } from 'react'

export default function Routes() {
  const [searchFrom, setSearchFrom] = useState('')
  const [searchTo, setSearchTo] = useState('')
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [searchResults, setSearchResults] = useState([])

  // Mock Tricity bus routes data
  const tricityRoutes = [
    {
      id: 1,
      number: '101',
      name: 'Chandigarh-Panchkula Express',
      from: 'Sector 17 Bus Stand',
      to: 'Panchkula Bus Stand',
      duration: '25 min',
      frequency: 'Every 10 min',
      stops: 8,
      status: 'On Time',
      color: '#2563eb',
      stopsList: [
        'Sector 17 Bus Stand',
        'Sector 22',
        'Sector 35',
        'Sector 43',
        'ISBT 43',
        'Panchkula Sector 5',
        'Panchkula Sector 10',
        'Panchkula Bus Stand'
      ]
    },
    {
      id: 2,
      number: '205',
      name: 'Chandigarh-Mohali Connector',
      from: 'ISBT 43',
      to: 'Mohali Bus Stand',
      duration: '20 min',
      frequency: 'Every 15 min',
      stops: 6,
      status: 'On Time',
      color: '#059669',
      stopsList: [
        'ISBT 43',
        'Sector 43',
        'Sector 35',
        'Mohali Sector 70',
        'Mohali Sector 78',
        'Mohali Bus Stand'
      ]
    },
    {
      id: 3,
      number: '312',
      name: 'Tricity Circular',
      from: 'Sector 17 Bus Stand',
      to: 'Zirakpur Bus Stand',
      duration: '45 min',
      frequency: 'Every 20 min',
      stops: 12,
      status: 'Delayed 5 min',
      color: '#dc2626',
      stopsList: [
        'Sector 17 Bus Stand',
        'Sector 22',
        'Sector 35',
        'ISBT 43',
        'Panchkula Sector 5',
        'Panchkula Sector 10',
        'Mohali Sector 70',
        'Mohali Sector 78',
        'Kharar Bus Stand',
        'Derabassi Bus Stand',
        'Zirakpur Sector 1',
        'Zirakpur Bus Stand'
      ]
    },
    {
      id: 4,
      number: '420',
      name: 'Airport Express',
      from: 'Chandigarh Airport',
      to: 'Sector 17 Bus Stand',
      duration: '30 min',
      frequency: 'Every 30 min',
      stops: 5,
      status: 'On Time',
      color: '#7c3aed',
      stopsList: [
        'Chandigarh Airport',
        'Sector 35',
        'Sector 43',
        'ISBT 43',
        'Sector 17 Bus Stand'
      ]
    },
    {
      id: 5,
      number: '501',
      name: 'University Line',
      from: 'Punjab University',
      to: 'Panjab University',
      duration: '35 min',
      frequency: 'Every 25 min',
      stops: 10,
      status: 'On Time',
      color: '#ea580c',
      stopsList: [
        'Punjab University',
        'Sector 14',
        'Sector 22',
        'Sector 35',
        'Sector 43',
        'ISBT 43',
        'Panchkula Sector 5',
        'Panchkula Sector 10',
        'Panchkula Sector 15',
        'Panjab University'
      ]
    }
  ]

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

  const handleSearch = (query, type) => {
    if (query.length > 2) {
      const filtered = stations.filter(station => 
        station.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }

  const handleStationSelect = (station, type) => {
    if (type === 'from') {
      setSearchFrom(station)
    } else {
      setSearchTo(station)
    }
    setSearchResults([])
  }

  const searchRoutes = () => {
    // Mock search functionality
    console.log('Searching routes from:', searchFrom, 'to:', searchTo)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container-px mx-auto max-w-7xl section-y">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Tricity Bus Routes
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            Find and plan your bus journey across Chandigarh, Panchkula, and Mohali.
          </p>
        </div>

        {/* Search Section */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            Plan Your Trip
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                From
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchFrom}
                  onChange={(e) => {
                    setSearchFrom(e.target.value)
                    handleSearch(e.target.value, 'from')
                  }}
                  placeholder="Enter starting location"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-slate-800 dark:text-slate-100 text-lg"
                />
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-20 max-h-60 overflow-y-auto">
                    {searchResults.map((station, index) => (
                      <button
                        key={index}
                        onClick={() => handleStationSelect(station, 'from')}
                        className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-700 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-base">{station}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                To
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchTo}
                  onChange={(e) => {
                    setSearchTo(e.target.value)
                    handleSearch(e.target.value, 'to')
                  }}
                  placeholder="Enter destination"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent dark:bg-slate-800 dark:text-slate-100 text-lg"
                />
                {searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 z-20 max-h-60 overflow-y-auto">
                    {searchResults.map((station, index) => (
                      <button
                        key={index}
                        onClick={() => handleStationSelect(station, 'to')}
                        className="w-full px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-700 last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-base">{station}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-end">
              <button 
                onClick={searchRoutes}
                className="w-full px-6 py-3 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 transition-colors text-lg"
              >
                Search Routes
              </button>
            </div>
          </div>
        </div>

        {/* Routes List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Available Routes
          </h2>
          
          {tricityRoutes.map((route) => (
            <div
              key={route.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-800 p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedRoute?.id === route.id ? 'ring-2 ring-brand-500 border-brand-500' : ''
              }`}
              onClick={() => setSelectedRoute(route)}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-6">
                  <div 
                    className="w-16 h-16 text-white rounded-2xl flex items-center justify-center font-bold text-xl"
                    style={{ backgroundColor: route.color }}
                  >
                    {route.number}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                      {route.name}
                    </h3>
                    <p className="text-lg text-slate-600 dark:text-slate-400">
                      {route.from} → {route.to}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    route.status === 'On Time' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {route.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-lg">
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Duration:</span>
                  <span className="ml-2 font-medium text-slate-900 dark:text-slate-100">{route.duration}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Frequency:</span>
                  <span className="ml-2 font-medium text-slate-900 dark:text-slate-100">{route.frequency}</span>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400">Stops:</span>
                  <span className="ml-2 font-medium text-slate-900 dark:text-slate-100">{route.stops}</span>
                </div>
                <div className="flex justify-end">
                  <button className="text-brand-600 hover:text-brand-700 font-medium text-lg">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Route Details Modal */}
        {selectedRoute && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedRoute(null)}>
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 text-white rounded-xl flex items-center justify-center font-bold text-lg"
                    style={{ backgroundColor: selectedRoute.color }}
                  >
                    {selectedRoute.number}
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                    {selectedRoute.name}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedRoute(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Route Name</span>
                    <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{selectedRoute.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Status</span>
                    <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{selectedRoute.status}</p>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Route</span>
                  <p className="text-lg font-medium text-slate-900 dark:text-slate-100">
                    {selectedRoute.from} → {selectedRoute.to}
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Duration</span>
                    <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{selectedRoute.duration}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Frequency</span>
                    <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{selectedRoute.frequency}</p>
                  </div>
                  <div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">Total Stops</span>
                    <p className="text-lg font-medium text-slate-900 dark:text-slate-100">{selectedRoute.stops}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">All Stops</h4>
                  <div className="space-y-2">
                    {selectedRoute.stopsList.map((stop, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <div className="w-6 h-6 bg-brand-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <span className="text-slate-900 dark:text-slate-100">{stop}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
