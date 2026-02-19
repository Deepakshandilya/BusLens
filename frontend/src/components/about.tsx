"use client"

import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, Bus, MapPin, Clock, Smartphone } from 'lucide-react'

const features = [
  "Comprehensive route database covering all three cities",
  "Real-time bus tracking and arrival information",
  "Interactive map visualization with stop details",
  "Mobile-first design for seamless experience",
  "Offline capabilities for uninterrupted service",
  "Accessibility features for all users"
]

export function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold font-display gradient-text mb-6">
              About BusLens
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              BusLens is a comprehensive bus route planning platform designed specifically for the Tricity area. 
              We combine cutting-edge technology with local expertise to provide the most accurate and 
              user-friendly public transportation information.
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Our mission is to make public transportation more accessible, efficient, and enjoyable for 
              everyone in Chandigarh, Mohali, and Panchkula. We believe that reliable public transport 
              is the backbone of a sustainable urban future.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent-green flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <Card className="p-8 glass-card">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center">
                  <Bus className="w-12 h-12 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Tricity Bus Network
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Connecting three cities with smart, efficient, and reliable bus services
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <MapPin className="w-8 h-8 text-primary-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">700+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Bus Stops</div>
                  </div>
                  
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <Clock className="w-8 h-8 text-accent-purple mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">24/7</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Service</div>
                  </div>
                  
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <Bus className="w-8 h-8 text-accent-pink mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">65+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Routes</div>
                  </div>
                  
                  <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <Smartphone className="w-8 h-8 text-accent-green mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">10K+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Users</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce" />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20">
          <Card className="p-12 text-center bg-gradient-to-r from-primary-50 to-accent-purple/10 dark:from-gray-800 dark:to-gray-700 border-primary-200 dark:border-gray-600">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              To revolutionize public transportation in the Tricity area by providing intelligent, 
              user-friendly solutions that make commuting efficient, accessible, and enjoyable for everyone. 
              We're building the future of urban mobility, one route at a time.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
