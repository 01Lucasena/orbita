import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import { useState } from "react"
import { usePosts } from "../../hooks/usePosts"
import { toggleLike } from "../../hooks/useLike"
import { useUserLikes } from "../../hooks/useUserLikes"
import { collection, addDoc, serverTimestamp, doc, getDoc, setDoc, deleteDoc, updateDoc, increment } from "firebase/firestore"
import ComentariosDoPost from "../../components/ComentariosDoPost"
import { db } from "../../firebase/config"

export default function Feed() {
  const { user } = useAuth()
  const { posts, carregando } = usePosts()
  const [texto, setTexto] = useState('')
  const likedPostIds = useUserLikes(user?.uid)
  const [postAberto, setPostAberto] = useState(null)

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
    <div>
      <form onSubmit={criarPost}>
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="No que você está pensando?"
        />
        <button>Postar</button>
      </form>

      <div>
        {carregando && <p>Carregando posts...</p>}

        {posts.map((post) => {
          const jaCurtiu = likedPostIds.includes(post.id)

          return (
            <div key={post.id}>
              {post.authorPhoto && (
                <img src={post.authorPhoto} alt={post.authorName} width="32" />
              )}
              <Link to={`/perfil/${post.authorId}`}>{post.authorName}</Link>
              <p>{post.text}</p>
              <button onClick={() => toggleLike(post.id, user.uid)}>
                {jaCurtiu ? "❤️" : "🤍"} {post.likeCount}
              </button>
              <button onClick={() => setPostAberto(postAberto === post.id ? null : post.id)}>
                Comentários ({post.commentCount})
              </button>
              {postAberto === post.id && (
                <ComentariosDoPost postId={post.id} user={user} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
