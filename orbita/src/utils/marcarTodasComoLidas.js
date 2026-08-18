import { writeBatch, doc } from "firebase/firestore"
import { db } from "../firebase/config"

export async function marcarTodasComoLidas(notifications) {
  const naoLidas = notifications.filter((n) => !n.read)
  if (naoLidas.length === 0) return

  const batch = writeBatch(db)
  naoLidas.forEach((n) => {
    batch.update(doc(db, "notifications", n.id), { read: true })
  })
  await batch.commit()
}