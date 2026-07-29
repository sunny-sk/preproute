import { USER_AUTH_KEY } from "@/config"

type ApiErrorData = {
  status?: string
  message?: string
  errors?: { msg?: string }[]
}

/**
 * Safely extracts a human-readable message from an axios-style error without
 * assuming the error shape (keeps `catch` blocks typed as `unknown`).
 */
export const getApiErrorMessage = (
  err: unknown,
  fallback = "Something went wrong"
) => {
  const data = (err as { response?: { data?: ApiErrorData } })?.response?.data
  return data?.errors?.[0]?.msg ?? data?.message ?? fallback
}

export const logout = () => {
  localStorage.removeItem(USER_AUTH_KEY)
  window.location.href = "/login"
}

export const getSafeRedirectPath = (
  raw: string | null,
  fallback = "/test/dashboard"
) => {
  if (!raw) return fallback
  let decoded: string
  try {
    decoded = decodeURIComponent(raw)
  } catch {
    return fallback
  }
  if (!decoded.startsWith("/") || decoded.startsWith("//")) return fallback
  return decoded
}

/** Formats an ISO date string (e.g. "2026-07-18") as "18 Jul 2026". */
export const formatDate = (isoDate: string) => {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}
