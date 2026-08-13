import { doc, getDoc, setDoc, deleteDoc, updateDoc, increment } from "firebase/firestore"
import { db } from "../firebase/config"

export async function toggleLike(postId, userId) {
  const likeId = `${userId}_${postId}`
  const likeRef = doc(db, "likes", likeId)
  const postRef = doc(db, "posts", postId)

  const likeSnap = await getDoc(likeRef)

  if (likeSnap.exists()) {
    // já curtiu → remove
    await deleteDoc(likeRef)
    await updateDoc(postRef, { likeCount: increment(-1) })
  } else {
    // ainda não curtiu → adiciona
    await setDoc(likeRef, {
      userId,
      postId,
      createdAt: new Date()
    })
    await updateDoc(postRef, { likeCount: increment(1) })
  }
}