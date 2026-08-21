import { useState } from "react"
import { Link } from "react-router-dom"
import { toggleLike } from "../hooks/useLike"
import ComentariosDoPost from "../pages/comentariosDoPost/ComentariosDoPost"
import { formatarTempoRelativo } from "../utils/formatarData"
import { MessageCircle } from "lucide-react"
import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase/config"
import { Trash2 } from "lucide-react"
import { TbComet } from "react-icons/tb"
import ConfirmDialog from "./ConfirmDialog"
import Avatar from "./Avatar"
import styles from './PostCard.module.css'

export default function PostCard({ post, user, likedPostIds }) {
  const [comentariosAbertos, setComentariosAbertos] = useState(false)
  const jaCurtiu = likedPostIds.includes(post.id)
  const [animando, setAnimando] = useState(false)
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false)

  function curtir() {
    toggleLike(post.id, user.uid, user.displayName, user.photoURL)
    setAnimando(true)
    setTimeout(() => setAnimando(false), 300)
  }

  async function confirmarExclusao() {
    await deleteDoc(doc(db, "posts", post.id))
    setConfirmandoExclusao(false)
  }

  return (
    <div className={styles.postCard}>
      <div className={styles.postHeader}>
        <Link to={`/perfil/${post.authorId}`}>
          <Avatar photoURL={post.authorPhoto} name={post.authorName} size={32} />
        </Link>
        <Link to={`/perfil/${post.authorId}`} className={styles.authorLink}>
          {post.authorName}
        </Link>
        <span className={styles.timestamp}>
            {formatarTempoRelativo(post.createdAt)}
        </span>
      </div>

      <p className={styles.postText}>{post.text}</p>

      <div className={styles.postActions}>
       <button className={styles.actionButton} onClick={curtir}>
          <TbComet
            size={24}
            className={`${styles.cometIcon} ${animando ? styles.cometPulse : ''}`}
            color={jaCurtiu ? "var(--color-gold)" : "currentColor"}
          />
          {post.likeCount}
        </button>
        <button className={styles.actionButton} onClick={() => setComentariosAbertos(!comentariosAbertos)}>
          <MessageCircle size={18} />{post.commentCount}
        </button>
        {post.authorId === user.uid && (
          <button className={styles.deleteButton} onClick={() => setConfirmandoExclusao(true)}>
            <Trash2 size={18} />
          </button>
        )}
      </div>
      <div className={`${styles.commentsWrapper} ${comentariosAbertos ? styles.open : ''}`}>
        <ComentariosDoPost postId={post.id} user={user} />
      </div>
      <ConfirmDialog
        aberto={confirmandoExclusao}
        titulo="Excluir post?"
        mensagem="Essa ação não pode ser desfeita. O post será removido permanentemente."
        onConfirmar={confirmarExclusao}
        onCancelar={() => setConfirmandoExclusao(false)}
      />
    </div>
  )
}