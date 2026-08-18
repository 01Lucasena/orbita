import { useParams } from "react-router-dom"
import { usePost } from "../../hooks/usePost"
import { useAuth } from "../../context/AuthContext"
import { useUserLikes } from "../../hooks/useUserLikes"
import PostCard from "../../components/PostCard"
import styles from './PostDetail.module.css'

export default function PostDetail() {
  const { id } = useParams()
  const { post, carregando } = usePost(id)
  const { user } = useAuth()
  const likedPostIds = useUserLikes(user?.uid)

  if (carregando) return <p className={styles.loadingText}>Carregando post...</p>
  if (!post) return <p className={styles.loadingText}>Post não encontrado.</p>

  return (
    <div className={styles.page}>
      <PostCard post={post} user={user} likedPostIds={likedPostIds} />
    </div>
  )
}