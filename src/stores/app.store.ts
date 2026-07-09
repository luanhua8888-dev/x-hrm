import { create } from 'zustand';

interface AppState {
  isSidebarCollapsed: boolean;
  isMobileNavigationOpen: boolean;
  ToggleSidebar: () => void;
  SetMobileNavigationOpen: (isOpen: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarCollapsed: false,
  isMobileNavigationOpen: false,
  ToggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  SetMobileNavigationOpen: (isOpen) => set({ isMobileNavigationOpen: isOpen }),
}));
