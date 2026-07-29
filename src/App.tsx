import PageLoader from "@/components/page-loader"
import { Toaster } from "@/components/ui/toast"
import ProtectedRoute from "@/guards/protected-route"
import { lazy, Suspense } from "react"
import { Navigate, Route, Routes } from "react-router"
import TaskLayout from "./pages/prepTests/layout"

const Login = lazy(() => import("./pages/login"))
const NotFound = lazy(() => import("./pages/notFound"))
const TestCreate = lazy(() => import("./pages/prepTests/create"))
const TestPreview = lazy(() => import("./pages/prepTests/preview"))
const TestDashboard = lazy(() => import("./pages/prepTests/dashboard"))
const TestEdit = lazy(() => import("./pages/prepTests/edit"))
const TestQuestions = lazy(() => import("./pages/prepTests/questions"))
const TestTracking = lazy(() => import("./pages/prepTests/tracking"))

const App = () => {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
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
      </Suspense>
      <Toaster />
    </>
  )
}

export default App
