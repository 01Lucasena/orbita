import { Link } from "react-router-dom"
import { Bell } from "lucide-react"
import { useState } from "react"
import { useNotifications } from "../hooks/useNotifications"
import { useClickOutside } from "../hooks/useClickOutside"
import { marcarComoLida } from "../utils/marcarComoLida"
import { marcarTodasComoLidas } from "../utils/marcarTodasComoLidas"
import { formatarTempoRelativo } from "../utils/formatarData"
import Avatar from "./Avatar"
import styles from './NotificationBell.module.css'

const TEXTOS = {
  like: "curtiu seu post",
  comment: "comentou no seu post",
  follow: "começou a seguir você"
}

export default function NotificationBell({ userId }) {
  const { notifications, naoLidas } = useNotifications(userId)
  const [aberto, setAberto] = useState(false)
  const ref = useClickOutside(aberto, () => setAberto(false))

  return (
    <div className={styles.wrapper} ref={ref}>
      <button className={styles.bellButton} onClick={() => setAberto(!aberto)}>
        <Bell size={20} />
        {naoLidas > 0 && <span className={styles.badge}>{naoLidas}</span>}
      </button>

      
        <div className={`${styles.dropdown} ${aberto ? styles.dropdownOpen : ''}`}>
          {notifications.length === 0 && (
            <p className={styles.empty}>Nenhuma notificação ainda.</p>
          )}

          {naoLidas > 0 && (
            <button className={styles.markAllButton} onClick={() => marcarTodasComoLidas(notifications)}>
              Marcar todas como lidas
            </button>
          )}

          {notifications.map((n) => (
            <Link
              key={n.id}
              to={n.postId ? `/post/${n.postId}` : `/perfil/${n.fromUserId}`}
              className={`${styles.item} ${n.read ? '' : styles.unread}`}
              onClick={() => { marcarComoLida(n.id); setAberto(false) }}
            >
              <Avatar photoURL={n.fromUserPhoto} name={n.fromUserName} size={32} />
              <div className={styles.itemBody}>
                <span><strong>{n.fromUserName}</strong> {TEXTOS[n.type]}</span>
                <span className={styles.itemTime}>{formatarTempoRelativo(n.createdAt)}</span>
              </div>
            </Link>
          ))}
        </div>
      
    </div>
  )
}