"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Route, Clock, MapPin, TrendingUp } from 'lucide-react'
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'

const routeCoverageData = [
  { name: 'Active Routes', value: 65, color: '#0ea5e9' },
  { name: 'Inactive Routes', value: 15, color: '#e2e8f0' },
]

const peakHoursData = [
  { time: '6AM', frequency: 20 },
  { time: '8AM', frequency: 80 },
  { time: '10AM', frequency: 40 },
  { time: '12PM', frequency: 60 },
  { time: '2PM', frequency: 30 },
  { time: '4PM', frequency: 50 },
  { time: '6PM', frequency: 90 },
  { time: '8PM', frequency: 70 },
  { time: '10PM', frequency: 25 },
]

const cityDistributionData = [
  { name: 'Chandigarh', value: 45, color: '#0ea5e9' },
  { name: 'Mohali', value: 30, color: '#8b5cf6' },
  { name: 'Panchkula', value: 25, color: '#ec4899' },
]

export function Insights() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-display gradient-text mb-4">
            Tricity Bus Network Insights
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real-time data and analytics for better travel decisions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Route Coverage */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Route className="w-6 h-6 text-primary-500" />
                Route Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={routeCoverageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {routeCoverageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-500">65+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Routes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-400">700+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Bus Stops</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Peak Hours */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-accent-purple" />
                Peak Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={peakHoursData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="frequency" 
                      stroke="#8b5cf6" 
                      strokeWidth={3}
                      dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-accent-purple">7-9 AM</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Morning Peak</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-accent-purple">5-7 PM</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Evening Peak</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* City Distribution */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-accent-pink" />
                City Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={cityDistributionData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      radius={[4, 4, 0, 0]}
                    >
                      {cityDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {cityDistributionData.map((city, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: city.color }}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {city.name}
                      </span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {city.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Stats */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6">
            <TrendingUp className="w-8 h-8 text-accent-green mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              95%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              On-time Performance
            </div>
          </Card>
          
          <Card className="text-center p-6">
            <Clock className="w-8 h-8 text-primary-500 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              15min
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Average Wait Time
            </div>
          </Card>
          
          <Card className="text-center p-6">
            <Route className="w-8 h-8 text-accent-purple mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              12.5km
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Average Route Length
            </div>
          </Card>
          
          <Card className="text-center p-6">
            <MapPin className="w-8 h-8 text-accent-pink mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              24/7
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Service Availability
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
