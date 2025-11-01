import { create } from 'zustand'
import type { Proyecto } from '@/types'

interface ProyectoState {
  currentProject: Proyecto | null
  setCurrentProject: (project: Proyecto | null) => void
}

export const useProyectoStore = create<ProyectoState>()((set) => ({
  currentProject: null,
  setCurrentProject: (project) => set({ currentProject: project }),
}))
