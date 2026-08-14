import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"

export function useUserProfile(uid) {
  const [profile, setProfile] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    if (!uid) return

    const userRef = doc(db, "users", uid)

    const unsubscribe = onSnapshot(userRef, (snapshot) => {
      setProfile(snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null)
      setCarregando(false)
    })

    return unsubscribe
  }, [uid])

  return { profile, carregando }
}