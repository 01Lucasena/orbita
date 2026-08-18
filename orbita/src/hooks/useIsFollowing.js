import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"

export function useIsFollowing(currentUserId, targetUserId) {
  const [seguindo, setSeguindo] = useState(false)

  useEffect(() => {
    if (!currentUserId || !targetUserId) return

    const followRef = doc(db, "follows", `${currentUserId}_${targetUserId}`)

    const unsubscribe = onSnapshot(followRef, (snapshot) => {
      setSeguindo(snapshot.exists())
    })

    return unsubscribe
  }, [currentUserId, targetUserId])

  return seguindo
}
