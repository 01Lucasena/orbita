import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase/config"

export async function criarNotificacao({ userId, type, fromUserId, fromUserName, fromUserPhoto, postId = null }) {
  if (userId === fromUserId) return

  await addDoc(collection(db, "notifications"), {
    userId,
    type,
    fromUserId,
    fromUserName: fromUserName || '',
    fromUserPhoto: fromUserPhoto || '',
    postId,
    read: false,
    createdAt: serverTimestamp()
  })
}