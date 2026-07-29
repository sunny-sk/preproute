import { Toaster } from "@/components/ui/toast"
import ProtectedRoute from "@/guards/protected-route"
import { Navigate, Route, Routes } from "react-router"
import Login from "./pages/login"
import NotFound from "./pages/notFound"
import TestCreate from "./pages/prepTests/create"
import TestPreview from "./pages/prepTests/preview"
import TestDashboard from "./pages/prepTests/dashboard"
import TestEdit from "./pages/prepTests/edit"
import TaskLayout from "./pages/prepTests/layout"
import TestQuestions from "./pages/prepTests/questions"
import TestTracking from "./pages/prepTests/tracking"

const App = () => {
  return (
    <>
      <Routes>
        <Route index element={<Navigate to="/test/create" replace />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/test" element={<TaskLayout />}>
            <Route index element={<Navigate to="/test/create" replace />} />
            <Route path="dashboard" element={<TestDashboard />} />
            <Route path="create" element={<TestCreate />} />
            <Route path=":id/edit" element={<TestEdit />} />
            <Route path=":id/questions" element={<TestQuestions />} />
            <Route path=":id/preview" element={<TestPreview />} />
            <Route path="tracking" element={<TestTracking />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
