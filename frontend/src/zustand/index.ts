
import { create } from "zustand";
import { api } from "@/lib/api";
import { persist } from "zustand/middleware";

interface UserData {
  email: string;
  emailVerified: boolean;
  username: string;
  _id: string;
}

interface StoreState {
  user: null | UserData;
  loadCurrentUserData: () => Promise<UserData>;
  logout: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      loadCurrentUserData: async () => {
        const data = (await api
          .get("users/currentUser", { credentials: "include" })
          .json()) as UserData;
        set({ user: data });
        return data
      },
      
      logout: async () => {
        await api.post("auth/logout", { credentials: "include" });
        set({ user: null });

      },
    }),
    {
      name: "zustand-store",
    }
  )
);
