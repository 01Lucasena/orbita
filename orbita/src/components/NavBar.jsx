import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import OrbitaIcon from "../assets/svg/OrbitaIcon.svg"
import NotificationBell from "./NotificationBell"
import ProfileMenu from "./ProfileMenu"
import styles from './Navbar.module.css'

export default function Navbar() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <nav className={styles.navbar}>
        <Link to="/feed" className={styles.brand}>
            <img 
              src={OrbitaIcon} 
              alt="Órbita"
              className={styles.icon}
            /> 
        </Link>
        <div className={styles.actions}>
            <NotificationBell userId={user.uid} />
            <ProfileMenu />
        </div>
    </nav>
  )
}