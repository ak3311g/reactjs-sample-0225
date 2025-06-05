import { Route, Routes } from "react-router-dom"
import ProtectedRoute from "./services/protectedRoute"
import Auth from "./pages/auth"
import TaskBoard from "./pages/taskBoard"

function App() {

  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={
          <ProtectedRoute>
            <TaskBoard />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
