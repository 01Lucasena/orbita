import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"

export function usePost(postId) {
  const [post, setPost] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    if (!postId) return

    const postRef = doc(db, "posts", postId)
    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      setPost(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null)
      setCarregando(false)
    })

    return unsubscribe
  }, [postId])

  return { post, carregando }
}