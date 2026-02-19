import { create } from 'zustand'
import { SearchState } from '@/types'

interface SearchStore extends SearchState {
  setStop1: (stop1: string) => void
  setStop2: (stop2: string) => void
  setLoading: (isLoading: boolean) => void
  setResults: (results: any[]) => void
  setError: (error: string | null) => void
  clearResults: () => void
}

export const useSearchStore = create<SearchStore>((set) => ({
  stop1: '',
  stop2: '',
  isLoading: false,
  results: [],
  error: null,
  
  setStop1: (stop1: string) => set({ stop1 }),
  setStop2: (stop2: string) => set({ stop2 }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setResults: (results: any[]) => set({ results, error: null }),
  setError: (error: string | null) => set({ error, results: [] }),
  clearResults: () => set({ results: [], error: null }),
}))