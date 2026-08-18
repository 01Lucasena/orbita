import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { User, Moon, Sun, LogOut } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useTheme } from "../context/ThemeContext"
import { useClickOutside } from "../hooks/useClickOutside"
import Avatar from "./Avatar"
import styles from './ProfileMenu.module.css'

export default function ProfileMenu() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [aberto, setAberto] = useState(false)
  const ref = useClickOutside(aberto, () => setAberto(false))

  const sair = async () => {
    await logout()
    navigate("/login")
  }

  return (
    <div className={styles.wrapper} ref={ref}>
      <button className={styles.trigger} onClick={() => setAberto(!aberto)}>
        <Avatar photoURL={user.photoURL} name={user.displayName} size={28} />
      </button>

      <div className={`${styles.dropdown} ${aberto ? styles.dropdownOpen : ''}`}>
        <Link
          to={`/perfil/${user.uid}`}
          className={styles.item}
          onClick={() => setAberto(false)}
        >
          <User size={16} /> Ver perfil
        </Link>

        <button className={styles.item} onClick={toggleTheme}>
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          {theme === "dark" ? "Tema claro" : "Tema escuro"}
        </button>

        <button className={`${styles.item} ${styles.danger}`} onClick={sair}>
          <LogOut size={16} /> Sair
        </button>
      </div>
    </div>
  )
}