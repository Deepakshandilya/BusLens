"use client"

import { useEffect, useRef, useState } from 'react'
import { MapPin, Filter, Route } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Mock data for demonstration
const busStops = [
  { name: "ISBT-17", coords: [30.7333, 76.7794], city: "chandigarh" },
  { name: "Sector 17 Bus Stand", coords: [30.7333, 76.7794], city: "chandigarh" },
  { name: "Panchkula Bus Stand", coords: [30.6915, 76.8577], city: "panchkula" },
  { name: "Mohali Bus Stand", coords: [30.7045, 76.7179], city: "mohali" },
  { name: "Sector 43 Bus Stand", coords: [30.7045, 76.7179], city: "chandigarh" },
  { name: "Airport", coords: [30.6705, 76.7881], city: "chandigarh" },
  { name: "Railway Station", coords: [30.7333, 76.7794], city: "chandigarh" },
]

const routes = [
  {
    name: "Route 1",
    coords: [[30.7333, 76.7794], [30.7045, 76.7179], [30.6915, 76.8577]],
    color: "#0ea5e9"
  },
  {
    name: "Route 2", 
    coords: [[30.7333, 76.7794], [30.6705, 76.7881], [30.7045, 76.7179]],
    color: "#8b5cf6"
  }
]

export function MapSection() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<any>(null)
  const [selectedFilter, setSelectedFilter] = useState('all')

  useEffect(() => {
    // Initialize Mapbox (you'll need to add your Mapbox token)
    if (typeof window !== 'undefined' && mapContainer.current && !map.current) {
      // For now, we'll create a placeholder map
      // In production, you would initialize Mapbox GL JS here
      mapContainer.current.innerHTML = `
        <div class="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center rounded-lg">
          <div class="text-center">
            <div class="text-6xl mb-4">🗺️</div>
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Interactive Tricity Map
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Real-time bus routes and stops visualization
            </p>
            <div class="text-sm text-gray-500 dark:text-gray-500">
              Mapbox integration coming soon
            </div>
          </div>
        </div>
      `
    }
  }, [])

  const filteredStops = selectedFilter === 'all' 
    ? busStops 
    : busStops.filter(stop => stop.city === selectedFilter)

  return (
    <section id="map" className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display gradient-text mb-4">
            Interactive Tricity Map
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore bus routes and stops across Chandigarh, Mohali, and Panchkula
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Map */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <div 
                ref={mapContainer}
                className="w-full h-96 lg:h-[500px]"
              />
            </Card>
          </div>

          {/* Controls */}
          <div className="space-y-6">
            {/* Legend */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Legend
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-primary-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Bus Routes</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-accent-orange rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Bus Stops</span>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filter by City</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { id: 'all', label: 'All Routes', count: busStops.length },
                  { id: 'chandigarh', label: 'Chandigarh', count: busStops.filter(s => s.city === 'chandigarh').length },
                  { id: 'mohali', label: 'Mohali', count: busStops.filter(s => s.city === 'mohali').length },
                  { id: 'panchkula', label: 'Panchkula', count: busStops.filter(s => s.city === 'panchkula').length },
                ].map((filter) => (
                  <Button
                    key={filter.id}
                    variant={selectedFilter === filter.id ? "default" : "outline"}
                    className="w-full justify-between"
                    onClick={() => setSelectedFilter(filter.id)}
                  >
                    <span>{filter.label}</span>
                    <Badge variant="secondary">{filter.count}</Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Bus Stops List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Bus Stops
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {filteredStops.map((stop, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                    >
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {stop.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                          {stop.city}
                        </div>
                      </div>
                      <div className="w-2 h-2 bg-accent-orange rounded-full"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
