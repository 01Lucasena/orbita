import { doc, getDoc, setDoc, deleteDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase/config"
import { criarNotificacao } from "../utils/criarNotificacao"

export async function toggleFollow(currentUserId, targetUserId) {
  const followId = `${currentUserId}_${targetUserId}`
  const followRef = doc(db, "follows", followId)
  const currentUserRef = doc(db, "users", currentUserId)
  const targetUserRef = doc(db, "users", targetUserId)

  const followSnap = await getDoc(followRef)

  if (followSnap.exists()) {
    await deleteDoc(followRef)
    await updateDoc(currentUserRef, { followingCount: increment(-1) })
    await updateDoc(targetUserRef, { followersCount: increment(-1) })
  } else {
    await setDoc(followRef, { followerId: currentUserId, followingId: targetUserId, createdAt: serverTimestamp() })
    await updateDoc(currentUserRef, { followingCount: increment(1) })
    await updateDoc(targetUserRef, { followersCount: increment(1) })

    const currentUserSnap = await getDoc(currentUserRef)
    await criarNotificacao({
      userId: targetUserId,
      type: "follow",
      fromUserId: currentUserId,
      fromUserName: currentUserSnap.data().displayName,
      fromUserPhoto: currentUserSnap.data().photoURL || ''
    })
  }
}