"use client"

import { useState } from 'react'
import { Search, MapPin, Bus, Clock, Users, Map } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useSearchStore } from '@/store/searchStore'
import { useToast } from '@/hooks/use-toast'
import { searchRoutes } from '@/lib/api'

const stats = [
  { number: '65+', label: 'Bus Routes', icon: Bus },
  { number: '700+', label: 'Bus Stops', icon: MapPin },
  { number: '24/7', label: 'Real-time Info', icon: Clock },
  { number: '3', label: 'Cities Covered', icon: Map },
]

export function Hero() {
  const [stop1, setStop1] = useState('')
  const [stop2, setStop2] = useState('')
  const { setStop1: setStoreStop1, setStop2: setStoreStop2, setLoading, setResults, setError } = useSearchStore()
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
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display text-white mb-6">
              <span className="block">Smart Bus Routes</span>
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                for Tricity
              </span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
              Discover the fastest, most convenient bus routes across Chandigarh, Mohali, and Panchkula with real-time information and smart recommendations.
            </p>

            {/* Search Form */}
            <Card className="p-6 mb-8 glass-card">
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="From where?"
                      value={stop1}
                      onChange={(e) => setStop1(e.target.value)}
                      className="pl-10 h-12 text-gray-900"
                      required
                    />
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="To where?"
                      value={stop2}
                      onChange={(e) => setStop2(e.target.value)}
                      className="pl-10 h-12 text-gray-900"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full sm:w-auto h-12 px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Find Routes
                </Button>
              </form>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <stat.icon className="w-8 h-8 text-white mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white font-display">
                    {stat.number}
                  </div>
                  <div className="text-sm text-white/80">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* 3D Bus Container */}
              <div className="w-80 h-80 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-float">🚌</div>
                  <div className="text-white/80 text-lg font-medium">
                    Interactive 3D Bus
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
