import { useEffect, useState } from "react"
import { collection, query, where, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"

export function useUserLikes(userId) {
  const [likedPostIds, setLikedPostIds] = useState([])

  useEffect(() => {
    if (!userId) return

    const likesRef = collection(db, "likes")
    const q = query(likesRef, where("userId", "==", userId))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ids = snapshot.docs.map((doc) => doc.data().postId)
      setLikedPostIds(ids)
    })

    return unsubscribe
  }, [userId])

  return likedPostIds
}