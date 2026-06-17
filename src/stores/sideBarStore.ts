import { getViewPortWidth } from '@/utils/ui/getViewPortW'
import { create } from 'zustand'

interface SideBarStore {
    isSideBarCollapse: boolean,
    isSideBarOpen: boolean,
    isMobile: boolean,
    actions: {
        setSideBarOpen: (value: boolean) => void,
        toggleCollapse: () => void,
    }
}

const useSideBarStore = create<SideBarStore>((set) => ({
    isSideBarCollapse: false,
    isMobile: getViewPortWidth() < 1024 ? true : false,
    isSideBarOpen: false,
    actions: {
        toggleCollapse: () => set((state) => ({ isSideBarCollapse: !state.isSideBarCollapse })),
        setSideBarOpen: (newValue) => set(() => ({ isSideBarOpen: newValue }))
    }
}))

export const useIsSideBarCollapse = () => useSideBarStore((state) => state.isSideBarCollapse)
export const useIsMobile = () => useSideBarStore((state) => state.isMobile)
export const useIsSideBarOpen = () => useSideBarStore((state) => state.isSideBarOpen)
export const useSidebarActions = () => useSideBarStore((state) => state.actions)
