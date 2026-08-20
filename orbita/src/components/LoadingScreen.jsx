import OrbitaIcon from "../assets/svg/OrbitaIcon.svg"
import styles from './LoadingScreen.module.css'

export default function LoadingScreen({ mensagem = "Carregando..." }) {
  return (
    <div className={styles.page}>
      <img src={OrbitaIcon} alt="Órbita" className={styles.spinner} />
    </div>
  )
}