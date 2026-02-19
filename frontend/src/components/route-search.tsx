"use client"

import { useState } from 'react'
import { Search, MapPin, Clock, Users, Route, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useSearchStore } from '@/store/searchStore'
import { useToast } from '@/hooks/use-toast'
import { formatTime, formatDuration } from '@/lib/utils'
import { searchRoutes } from '@/lib/api'

export function RouteSearch() {
  const [stop1, setStop1] = useState('')
  const [stop2, setStop2] = useState('')
  const { stop1: storeStop1, stop2: storeStop2, isLoading, results, error, setStop1: setStoreStop1, setStop2: setStoreStop2, setLoading, setResults, setError } = useSearchStore()
  const { toast } = useToast()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!stop1.trim() || !stop2.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both starting and destination stops.",
        variant: "warning",
      })
      return
    }

    setStoreStop1(stop1)
    setStoreStop2(stop2)
    setLoading(true)
    setError(null)

    try {
      const data = await searchRoutes({ 
        stop1: stop1.trim(), 
        stop2: stop2.trim() 
      })
      setResults(data)
      
      if (data.length === 0) {
        toast({
          title: "No Routes Found",
          description: "We couldn't find any direct bus routes between these stops.",
          variant: "warning",
        })
      } else {
        toast({
          title: "Routes Found",
          description: `Found ${data.length} route(s) for your journey.`,
          variant: "success",
        })
      }
    } catch (error) {
      console.error('Error:', error)
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch routes. Please try again.'
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="routes" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display gradient-text mb-4">
            Find Your Perfect Route
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Search and discover the best bus routes for your journey across the Tricity area
          </p>
        </div>

        {/* Search Form */}
        <Card className="p-8 mb-12 glass-card">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  From
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Enter starting stop"
                    value={stop1}
                    onChange={(e) => setStop1(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  To
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Enter destination stop"
                    value={stop2}
                    onChange={(e) => setStop2(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full sm:w-auto h-12 px-8"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5 mr-2" />
                  Find Routes
                </>
              )}
            </Button>
          </form>
        </Card>

        {/* Results */}
        {error && (
          <Card className="p-6 mb-8 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                Error
              </h3>
              <p className="text-red-600 dark:text-red-300">{error}</p>
            </div>
          </Card>
        )}

        {results.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Available Routes
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Found {results.length} route(s) from {storeStop1} to {storeStop2}
              </p>
            </div>

            <div className="grid gap-6">
              {results.map((route, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <Route className="w-5 h-5 text-white" />
                        </div>
                        <span>Route {route.route_number}</span>
                      </CardTitle>
                      <Badge variant="outline" className="text-primary-600 border-primary-200">
                        {route.num_buses} buses
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Route Path */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="text-center">
                        <div className="w-3 h-3 bg-primary-500 rounded-full mb-2"></div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {route.start_point}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTime(route.start_time)}
                        </div>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center">
                        <div className="flex-1 h-0.5 bg-gradient-primary"></div>
                        <ArrowRight className="w-5 h-5 text-primary-500 mx-2" />
                        <div className="flex-1 h-0.5 bg-gradient-primary"></div>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-3 h-3 bg-accent-orange rounded-full mb-2"></div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {route.end_point}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatTime(route.end_time)}
                        </div>
                      </div>
                    </div>

                    {/* Route Details */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg">
                        <Clock className="w-5 h-5 text-primary-500" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            Frequency
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {formatDuration(route.frequency)}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg">
                        <Users className="w-5 h-5 text-accent-green" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            Buses Available
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {route.num_buses} buses
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-700 rounded-lg">
                        <Route className="w-5 h-5 text-accent-purple" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            Route Length
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {route.route_length} km
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {results.length === 0 && !error && !isLoading && (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">🚌</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Ready to Find Your Route?
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enter your starting and destination stops to discover the best bus routes for your journey.
            </p>
          </Card>
        )}
      </div>
    </section>
  )
}
