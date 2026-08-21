import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import LoadingScreen from "./LoadingScreen" 

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />

  return children
}