import { Routes, Route } from "react-router";
import Login from "./pages/login";
import NotFound from "./pages/notFound";

export function App() {
  return (
    <div className="flex min-h-svh p-6">
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test/creation" element={<TestCreation />} />
          <Route path="/test/creation/:id" element={<TestCreation />} />
          <Route path="/test/creation/:id/view" element={<TestCreationView />} />
        </Route> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
