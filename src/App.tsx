import { Toaster } from "@/components/ui/toast"
import ProtectedRoute from "@/guards/protected-route"
import { Navigate, Route, Routes } from "react-router"
import Login from "./pages/login"
import NotFound from "./pages/notFound"
import TaskCreate from "./pages/prepTests/create"
import TaskDashboard from "./pages/prepTests/dashboard"
import TaskEdit from "./pages/prepTests/edit"
import TaskLayout from "./pages/prepTests/layout"
import TaskQuestions from "./pages/prepTests/questions"
import TaskTracking from "./pages/prepTests/tracking"

const App = () => {
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
