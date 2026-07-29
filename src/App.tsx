import { Routes, Route, Navigate } from "react-router"
import Login from "./pages/login"
import NotFound from "./pages/notFound"
import { Toaster } from "@/components/ui/toast"
import ProtectedRoute from "@/guards/protected-route"
import TaskLayout from "./pages/prepTests/layout"
import TaskDashboard from "./pages/prepTests/dashboard"
import TaskCreate from "./pages/prepTests/create"
import TaskEdit from "./pages/prepTests/edit"
import TaskTracking from "./pages/prepTests/tracking"
import TaskQuestions from "./pages/prepTests/questions"

export function App() {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="/test/create" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/test" element={<TaskLayout />}>
            <Route index element={<Navigate to="/test/create" replace />} />
            <Route path="dashboard" element={<TaskDashboard />} />
            <Route path="create" element={<TaskCreate />} />
            <Route path=":id/edit" element={<TaskEdit />} />
            <Route path=":id/questions" element={<TaskQuestions />} />
            <Route path="tracking" element={<TaskTracking />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
