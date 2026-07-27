import { Navigate, Outlet, useLocation } from "react-router"
import useUser from "@/store/useUser"

const ProtectedRoute = () => {
  const token = useUser((s) => s.token)
  const location = useLocation()

  if (!token) {
    const redirect = encodeURIComponent(
      location.pathname + location.search + location.hash
    )
    return <Navigate to={`/login?redirect=${redirect}`} replace />
  }

  return <Outlet />
}

export default ProtectedRoute
