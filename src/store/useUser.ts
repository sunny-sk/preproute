import { create } from "zustand"
import { persist } from "zustand/middleware"
import { USER_AUTH_KEY } from "@/config"

interface User {
  id: string
  name: string
  email: string
}

interface UserStore {
  user: User | null
  token: string | null
  setUser: (user: User) => void
  setToken: (token: string) => void
  logout: () => void
}

const useUser = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user: User) => set({ user }),
      setToken: (token: string) => set({ token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: USER_AUTH_KEY, // name of the item in the storage (must be unique)
    }
  )
)

export default useUser
