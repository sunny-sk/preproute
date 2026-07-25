import { Routes, Route, Navigate } from "react-router";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import { Toaster } from "@/components/ui/toast";
import TaskLayout from "./pages/task/layout";
import TaskDashboard from "./pages/task/dashboard";
import TaskCreate from "./pages/task/create";
import TaskTracking from "./pages/task/tracking";

export function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/task" element={<TaskLayout />}>
          <Route index element={<Navigate to="/task/create" replace />} />
          <Route path="dashboard" element={<TaskDashboard />} />
          <Route path="create" element={<TaskCreate />} />
          <Route path="tracking" element={<TaskTracking />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}

export default App
