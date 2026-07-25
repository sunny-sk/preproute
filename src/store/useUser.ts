import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  id: string
  name: string
  email: string
}

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
}

const useUser = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
    }
  )
)

export default useUser
