import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/config"

export async function marcarComoLida(notificationId) {
  await updateDoc(doc(db, "notifications", notificationId), { read: true })
}