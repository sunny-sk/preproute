import { USER_AUTH_KEY } from "@/config"

export const logout = () => {
  localStorage.removeItem(USER_AUTH_KEY)
  window.location.href = "/login"
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
