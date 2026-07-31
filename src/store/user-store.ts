import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserInfo {
  name: string;
  lastName: string;
  email: string;
  phone: string;
}

interface UserStore {
  user: UserInfo | null;
  login: (user: UserInfo) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      isLoggedIn: () => get().user !== null,
    }),
    { name: "fifor-user" },
  ),
);
