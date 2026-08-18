import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"

export default function ThemedArea({ children }) {
  const { user } = useAuth()
  const { theme } = useTheme()

  return (
    <div
      data-theme={user ? theme : "dark"}
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-ink)',
        color: 'var(--color-star)',
        transition: 'background-color 0.2s ease, color 0.2s ease'
      }}
    >
      {children}
    </div>
  )
}