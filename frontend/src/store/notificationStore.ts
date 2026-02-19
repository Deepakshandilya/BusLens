import { create } from 'zustand'
import { NotificationState } from '@/types'

export const useNotificationStore = create<NotificationState>((set) => ({
  message: '',
  type: 'info',
  isVisible: false,
  
  show: (message: string, type: 'success' | 'error' | 'info' | 'warning') => 
    set({ message, type, isVisible: true }),
  
  hide: () => set({ isVisible: false }),
}))
