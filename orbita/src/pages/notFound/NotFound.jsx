import { Link } from "react-router-dom"
import OrbitaIcon from "../../assets/svg/OrbitaIcon.svg"
import styles from './NotFound.module.css'

export default function NotFound() {
  return (
    <div className={styles.page}>
      <img src={OrbitaIcon} alt="" className={styles.icon} />
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>
        Essa página saiu de órbita e não foi encontrada.
      </p>
      <Link to="/feed" className={styles.btnPrimary}>
        Voltar para o feed
      </Link>
    </div>
  )
}