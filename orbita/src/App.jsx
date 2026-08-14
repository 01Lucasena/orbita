import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Login from './pages/login/Login'
import Feed from "./pages/feed/Feed"
import Cadastro from "./pages/cadastro/Cadastro"
import RecuperarSenha from "./pages/recuperarSenha/RecuperarSenha"
import ProtectedRoute from "./components/ProtectedRoute"
import Perfil from "./pages/perfil/Perfil"
import EditarPerfil from "./pages/editarPerfil/EditarPerfil"
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
                <Route path="/cadastro" element={<Cadastro/>}/>
                <Route path="/recuperar-senha" element={<RecuperarSenha />} />
                <Route path="/perfil/:uid" element={
                <ProtectedRoute>
                    <Perfil />
                </ProtectedRoute>
                } />
                <Route path="/editar-perfil" element={
                <ProtectedRoute>
                    <EditarPerfil />
                </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
     </AuthProvider>
    </>
  )
}

export default App
