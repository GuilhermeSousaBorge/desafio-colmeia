import { create } from "zustand";
import { persist } from "zustand/middleware";
import userData from "@/mocks/users.json";

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  address?: string;
  phone?: string;
}

interface UserState {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (newUser: User) => Promise<boolean>;
  logout: () => void;
}

// Usuários mockados (pode importar de /mocks/users.json)
const mockUsers: User[] = userData;


export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,

      login: async (email, password) => {
        const found = mockUsers.find(
          (u) => u.email === email && u.password === password
        );
        if (found) {
          set({ user: found });
          return true;
        }
        return false;
      },

      register: async (newUser) => {
        const exists = mockUsers.some((u) => u.email === newUser.email);
        if (exists) return false;
        const newId = Math.max(...mockUsers.map(u => u.id)) + 1;
        mockUsers.push({ ...newUser, id:  newId});
        set({ user: newUser });
        return true;
      },

      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage",
    }
  )
);
