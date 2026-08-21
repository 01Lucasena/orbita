import { useAuth } from "../../context/AuthContext"
import { useState } from "react"
import { usePosts } from "../../hooks/usePosts"
import { useUserLikes } from "../../hooks/useUserLikes"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import LoadingScreen from "../../components/LoadingScreen"
import PostCard from "../../components/PostCard"
import { db } from "../../firebase/config"
import styles from "./Feed.module.css"

export default function Feed() {
  const { user } = useAuth()
  const { posts, carregando } = usePosts()
  const [texto, setTexto] = useState('')
  const likedPostIds = useUserLikes(user?.uid)

  const criarPost = async (evento) => {
    evento.preventDefault()
    if (!texto.trim()) return

    try {
      await addDoc(collection(db, "posts"), {
        authorId: user.uid,
        authorName: user.displayName,
        authorPhoto: user.photoURL || '',
        text: texto,
        createdAt: serverTimestamp(),
        likeCount: 0,
        commentCount: 0
      })
      setTexto('')
    } catch (erro) {
      console.log(erro.code)
    }
  }

  return (
    <div className={styles.page}>
      <form onSubmit={criarPost} className={styles.postForm}>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="No que você está pensando?"
        />
        <button className={styles.btnPrimary}>Postar</button>
      </form>

      <div className={styles.postList}>
        {carregando && <LoadingScreen />}

        {posts.map((post) => (
          <PostCard key={post.id} post={post} user={user} likedPostIds={likedPostIds} />
        ))}
      </div>
    </div>
  )
}