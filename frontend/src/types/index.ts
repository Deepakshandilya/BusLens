export interface BusRoute {
  route_number: string
  start_point: string
  end_point: string
  start_time: string
  end_time: string
  frequency: string
  num_buses: string
  route_length: string
}

export interface BusStop {
  name: string
  coords: [number, number]
  city: 'chandigarh' | 'mohali' | 'panchkula'
}

export interface SearchState {
  stop1: string
  stop2: string
  isLoading: boolean
  results: BusRoute[]
  error: string | null
}

export interface ThemeState {
  isDark: boolean
  toggle: () => void
}

export interface MapState {
  center: [number, number]
  zoom: number
  selectedRoute: string | null
  selectedStop: string | null
}

export interface NotificationState {
  message: string
  type: 'success' | 'error' | 'info' | 'warning'
  isVisible: boolean
  show: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void
  hide: () => void
}

export interface ChartData {
  name: string
  value: number
  color?: string
}

export interface InsightData {
  routeCoverage: ChartData[]
  peakHours: { time: string; frequency: number }[]
  cityDistribution: ChartData[]
}
