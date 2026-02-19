"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Route, Clock, MapPin, Smartphone, Shield, Zap } from 'lucide-react'

const features = [
  {
    icon: Route,
    title: "Smart Route Planning",
    description: "AI-powered route optimization to find the fastest and most convenient journeys across the Tricity area.",
    color: "text-primary-500"
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "Live bus tracking and real-time arrival information for accurate planning and reduced waiting times.",
    color: "text-accent-purple"
  },
  {
    icon: MapPin,
    title: "Interactive Maps",
    description: "Visualize routes and stops on detailed maps of the entire tricity area with real-time data overlay.",
    color: "text-accent-pink"
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Seamless experience across all devices with offline capabilities and progressive web app features.",
    color: "text-accent-green"
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your data is protected with enterprise-grade security and privacy-first design principles.",
    color: "text-accent-orange"
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized performance with instant search results and smooth animations for the best user experience.",
    color: "text-primary-600"
  }
]

export function Features() {
  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display gradient-text mb-4">
            Why Choose BusLens?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the future of public transportation with our cutting-edge features
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
            >
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-primary-50 to-accent-purple/10 dark:from-gray-800 dark:to-gray-700 border-primary-200 dark:border-gray-600">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Transform Your Commute?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                Join thousands of commuters who trust BusLens for their daily travel needs across the Tricity area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">10K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Happy Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-purple">50K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Routes Searched</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent-pink">99.9%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
