import { useEffect, useState } from "react"
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"

export function useNotifications(userId) {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    if (!userId) return

    const ref = collection(db, "notifications")
    const q = query(ref, where("userId", "==", userId), orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setNotifications(lista)
    }, (erro) => {
      console.log("Erro ao buscar notificações:", erro.code, erro.message)
    })

    return unsubscribe
  }, [userId])

  const naoLidas = notifications.filter((n) => !n.read).length

  return { notifications, naoLidas }
}