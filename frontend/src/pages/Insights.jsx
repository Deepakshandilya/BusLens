import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

export default function Insights() {
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  // Mock data for Tricity insights
  const ridershipData = [
    { time: '6:00', passengers: 120 },
    { time: '7:00', passengers: 450 },
    { time: '8:00', passengers: 680 },
    { time: '9:00', passengers: 520 },
    { time: '10:00', passengers: 380 },
    { time: '11:00', passengers: 290 },
    { time: '12:00', passengers: 320 },
    { time: '13:00', passengers: 280 },
    { time: '14:00', passengers: 310 },
    { time: '15:00', passengers: 350 },
    { time: '16:00', passengers: 420 },
    { time: '17:00', passengers: 580 },
    { time: '18:00', passengers: 650 },
    { time: '19:00', passengers: 480 },
    { time: '20:00', passengers: 320 },
    { time: '21:00', passengers: 180 }
  ]

  const routePerformance = [
    { route: '101', ridership: 1250, onTime: 92, satisfaction: 4.2, name: 'Chandigarh-Panchkula' },
    { route: '205', ridership: 980, onTime: 88, satisfaction: 4.0, name: 'Chandigarh-Mohali' },
    { route: '312', ridership: 750, onTime: 85, satisfaction: 3.8, name: 'Tricity Circular' },
    { route: '420', ridership: 1100, onTime: 90, satisfaction: 4.1, name: 'Airport Express' },
    { route: '501', ridership: 680, onTime: 87, satisfaction: 3.9, name: 'University Line' }
  ]

  const cityDistribution = [
    { city: 'Chandigarh', percentage: 45, routes: 28 },
    { city: 'Panchkula', percentage: 30, routes: 19 },
    { city: 'Mohali', percentage: 25, routes: 18 }
  ]

  const COLORS = ['#2563eb', '#059669', '#dc2626', '#7c3aed', '#ea580c']

  const stats = [
    { label: 'Total Riders Today', value: '12,450', change: '+5.2%', positive: true },
    { label: 'Average Wait Time', value: '3.2 min', change: '-12%', positive: true },
    { label: 'On-Time Performance', value: '89%', change: '+2.1%', positive: true },
    { label: 'Active Routes', value: '65', change: '0%', positive: true }
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container-px mx-auto max-w-7xl section-y">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                Tricity Transit Insights
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Data-driven analytics for better public transportation across Tricity.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg text-slate-500 dark:text-slate-400">Period:</span>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-lg dark:bg-slate-800 dark:text-slate-100"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.label}
                </h3>
                <span className={`text-sm font-medium ${
                  stat.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Ridership Over Time */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Ridership by Hour
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={ridershipData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'var(--tw-bg-opacity)',
                      border: '1px solid var(--tw-border-color)',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="passengers" 
                    stroke="#2563eb" 
                    strokeWidth={3}
                    dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* City Distribution */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
              City Distribution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cityDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="percentage"
                  >
                    {cityDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {cityDistribution.map((city, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-slate-600 dark:text-slate-400">{city.city}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {city.percentage}%
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {city.routes} routes
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Route Performance Table */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            Route Performance
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Route</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Ridership</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">On-Time %</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-500 dark:text-slate-400">Satisfaction</th>
                </tr>
              </thead>
              <tbody>
                {routePerformance.map((route, index) => (
                  <tr key={index} className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          {route.route}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {route.name}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {route.ridership.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                          <div 
                            className="bg-brand-600 h-2 rounded-full" 
                            style={{ width: `${route.onTime}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {route.onTime}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(route.satisfaction) 
                                ? 'text-yellow-400' 
                                : 'text-slate-300 dark:text-slate-600'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-sm text-slate-600 dark:text-slate-400">
                          {route.satisfaction}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tricity Overview */}
        <div className="mt-8 bg-gradient-to-r from-brand-50 to-blue-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8">
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            Tricity Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-600 mb-2">65+</div>
              <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">Bus Routes</div>
              <div className="text-slate-600 dark:text-slate-400">Across 3 cities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-600 mb-2">700+</div>
              <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">Bus Stops</div>
              <div className="text-slate-600 dark:text-slate-400">Complete coverage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-600 mb-2">50K+</div>
              <div className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">Daily Riders</div>
              <div className="text-slate-600 dark:text-slate-400">Tricity region</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}