import { Link, Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import OrbitaLogo from "../../assets/svg/OrbitaLogo.svg"
import HomeBackground from "../../assets/video/homebg.mp4"
import styles from './Home.module.css'

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) return null
  if (user) return <Navigate to="/feed" replace />

  return (
    <div className={styles.page}>
      <video className={styles.bgVideo} autoPlay loop muted playsInline>
        <source src={HomeBackground} type="video/mp4" />
      </video>

      <div className={styles.hero}>
        <img 
          src={OrbitaLogo} 
          alt="Órbita"
          className={styles.logo}
        />
        <p className={styles.tagline}>
          Onde suas ideias gravitam ao redor de pessoas de verdade.
        </p>

        <div className={styles.actions}>
          <Link to="/cadastro" className={styles.btnPrimary}>Criar conta</Link>
          <Link to="/login" className={styles.btnSecondary}>Entrar</Link>
        </div>
      </div>
    </div>
  )
}