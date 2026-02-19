import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ThemeState } from '@/types'

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false,
      toggle: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'buslens-theme',
    }
  )
)
