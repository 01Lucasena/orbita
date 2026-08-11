import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth"
import { auth } from "../firebase/config"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  function loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    return signInWithRedirect(auth, provider)
  }

  function logout() {
    return signOut(auth)
  }

  useEffect(() => {
    getRedirectResult(auth).catch((erro) => console.log(erro.code))

    const unsubscribe = onAuthStateChanged(auth, (usuarioAtual) => {
      setUser(usuarioAtual)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = { user, loading, loginWithGoogle, logout }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}