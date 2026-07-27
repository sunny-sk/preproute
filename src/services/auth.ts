import type { LoginFormSchema } from "@/validations"
import { api, URLS } from "@/config"
import type { UserResponse } from "@/types"

export const loginApi = async (data: LoginFormSchema) => {
  const response = await api.post<UserResponse>(URLS.LOGIN, data)
  return response.data
}
