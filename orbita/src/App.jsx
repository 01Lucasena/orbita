import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import Login from './pages/login/Login'
import Feed from "./pages/feed/Feed"
import Cadastro from "./pages/cadastro/Cadastro"
import RecuperarSenha from "./pages/recuperarSenha/RecuperarSenha"
import Navbar from "./components/NavBar"
import ProtectedRoute from "./components/ProtectedRoute"
import Perfil from "./pages/perfil/Perfil"
import EditarPerfil from "./pages/editarPerfil/EditarPerfil"
import NotFound from "./pages/notFound/NotFound"
import PostDetail from "./pages/postDetail/PostDetail"
import { ThemeProvider } from "./context/ThemeContext"
import ThemedArea from "./components/ThemedArea"
import Home from "./pages/home/Home"
import './App.css'

function App() {
  

  return (
    <>
    <ThemeProvider>
       <AuthProvider>
         <BrowserRouter>
          <ThemedArea>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
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
                  <Route path="/post/:id" element={
                  <ProtectedRoute>
                    <PostDetail />
                  </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
              </Routes>
          </ThemedArea>
        </BrowserRouter>
     </AuthProvider>
    </ThemeProvider>
    </>
  )
}

export default App
