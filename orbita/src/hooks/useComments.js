import { useEffect, useState } from "react"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"

export function useComments(postId) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    if (!postId) return

    const commentsRef = collection(db, "posts", postId, "comments")
    const q = query(commentsRef, orderBy("createdAt", "asc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setComments(lista)
    })

    return unsubscribe
  }, [postId])

  return comments
}