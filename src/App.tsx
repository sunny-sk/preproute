import { Routes, Route } from "react-router";
import Login from "./pages/login";
import NotFound from "./pages/notFound";
import { Toaster } from "@/components/ui/toast";

export function App() {
  return (
    <>
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
      <Toaster />
    </>
  )
}

export default App
