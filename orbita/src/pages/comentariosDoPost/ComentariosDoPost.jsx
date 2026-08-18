import { useState } from "react"
import { Link } from "react-router-dom"
import { collection, addDoc, getDoc, serverTimestamp, doc, updateDoc, increment } from "firebase/firestore"
import { db } from "../../firebase/config"
import { useComments } from "../../hooks/useComments"
import { criarNotificacao } from "../../utils/criarNotificacao"
import Avatar from "../../components/Avatar"
import styles from "./ComentariosDoPost.module.css"

export default function ComentariosDoPost({ postId, user }) {
    const comments = useComments(postId)
    const [texto, setTexto] = useState('')

    const enviarComentario = async (evento) => {
    evento.preventDefault()

    if (!texto.trim()) return

    await addDoc(collection(db, "posts", postId, "comments"), {
        authorId: user.uid,
        authorName: user.displayName,
        authorPhoto: user.photoURL || '',
        text: texto,
        createdAt: serverTimestamp()
    })

    const postRef = doc(db, "posts", postId)
    await updateDoc(postRef, { commentCount: increment(1) })

    const postSnap = await getDoc(postRef)
    const post = postSnap.data()
    await criarNotificacao({
        userId: post.authorId,
        type: "comment",
        fromUserId: user.uid,
        fromUserName: user.displayName,
        fromUserPhoto: user.photoURL || '',
        postId
    })

    setTexto('')
    }

    return (
    <div className={styles.wrapper}>
    <form onSubmit={enviarComentario} className={styles.form}>
        <input
        type="text"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Escreva um comentário..."
        />
        <button className={styles.sendButton}>Enviar</button>
    </form>

    <div className={styles.commentList}>
        {comments.map((comment) => (
            <div key={comment.id} className={styles.comment}>
                <Link to={`/perfil/${comment.authorId}`}>
                    <Avatar photoURL={comment.authorPhoto} name={comment.authorName} size={28} />
                </Link>
                <div className={styles.commentBody}>
                    <Link to={`/perfil/${comment.authorId}`} className={styles.authorLink}>
                    {comment.authorName}
                    </Link>
                    <p className={styles.commentText}>{comment.text}</p>
                </div>
            </div>
            ))}
         </div>
    </div>
    )   
}