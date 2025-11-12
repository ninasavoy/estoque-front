// src/store/index.ts
import { create } from "zustand";

type Notification = { id: string; title: string; message?: string; type?: "info" | "success" | "error" };

type UIState = {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  toggleSidebar: () => void;

  darkMode: boolean;
  setDarkMode: (v: boolean) => void;

  notifications: Notification[];
  pushNotification: (n: { title: string; message?: string; type?: "info" | "success" | "error" }) => void;
  removeNotification: (id: string) => void;
};

export const useUIStore = create<UIState>((set, get) => ({
  sidebarOpen: true,
  setSidebarOpen: (v: boolean) => set({ sidebarOpen: v }),
  toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),

  darkMode: false,
  setDarkMode: (v: boolean) => set({ darkMode: v }),

  notifications: [],
  pushNotification: (n) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    set((state) => ({ notifications: [...state.notifications, { id, ...n }] }));
    setTimeout(() => {
      const exists = get().notifications.find((x) => x.id === id);
      if (exists) get().removeNotification(id);
    }, 6000);
  },
  removeNotification: (id) => set((state) => ({ notifications: state.notifications.filter((x) => x.id !== id) })),
}));

export default useUIStore;
