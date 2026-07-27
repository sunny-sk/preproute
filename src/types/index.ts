export type UserResponse = {
  status: "success" | "error"
  message: string
  data: {
    user: {
      endDate: string
      id: string
      joiningDate: string
      lastActive: string
      name: string
      payment: boolean
      phone: string
      role: "admin" | "moderator" | "user"
      subrole: string
      userId: string
    }
    token: string
  }
}

export type SubjectResponse = {
  status: "success" | "error"
  message: string
  data: {
    id: string
    name: string
    created_at: string
    updated_at: string
  }[]
}
