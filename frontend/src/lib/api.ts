const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000'

export interface SearchRoutesRequest {
  stop1: string
  stop2: string
}

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

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export async function searchRoutes(request: SearchRoutesRequest): Promise<BusRoute[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/bus-routes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    })

    if (!response.ok) {
      throw new ApiError(
        `HTTP error! status: ${response.status}`,
        response.status,
        response.statusText
      )
    }

    const data = await response.json()
    return data
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    // Network or other errors
    throw new ApiError(
      'Failed to fetch routes. Please check your connection and try again.',
      0,
      'Network Error'
    )
  }
}

export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
    })
    return response.ok
  } catch {
    return false
  }
}
