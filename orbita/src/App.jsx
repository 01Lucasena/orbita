import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Login from './pages/login/Login'
import Feed from "./pages/feed/Feed"
import ProtectedRoute from "./components/ProtectedRoute"
import './App.css'

function App() {
  

  return (
    <>
     <AuthProvider>
         <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/feed" element={
                <ProtectedRoute>
                    <Feed />
                </ProtectedRoute>
                }/>
            </Routes>
        </BrowserRouter>
     </AuthProvider>
    </>
  )
}

export default App
