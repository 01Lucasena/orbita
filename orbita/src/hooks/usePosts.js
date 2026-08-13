import { useEffect, useState } from "react"
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"

export function usePosts() {
  const [posts, setPosts] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const postsRef = collection(db, "posts")
    const q = query(postsRef, orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const listaPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setPosts(listaPosts)
      setCarregando(false)
    })

    return unsubscribe
  }, [])

  return { posts, carregando }
}