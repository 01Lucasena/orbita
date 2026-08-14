import { useState } from "react"
import { Link } from "react-router-dom"
import { collection, addDoc, serverTimestamp, doc, updateDoc, increment } from "firebase/firestore"
import { db } from "../firebase/config"
import { useComments } from "../hooks/useComments"

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

    setTexto('')
    }

    return (
        <div>
        <form onSubmit={enviarComentario}>
            <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escreva um comentário..."
            />
            <button>Enviar</button>
        </form>

        <div>
           {comments.map((comment) => (
            <div key={comment.id}>
                {comment.authorPhoto && (
                    <img src={comment.authorPhoto} alt={`Foto de ${comment.authorName}`} width="32" />
                )}
                <Link to={`/perfil/${comment.authorId}`}>{comment.authorName}</Link>
                <p>{comment.text}</p>
            </div>
            ))}
        </div>
        </div>
    )
}