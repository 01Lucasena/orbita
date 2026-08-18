import { doc, getDoc, setDoc, deleteDoc, updateDoc, increment } from "firebase/firestore"
import { db } from "../firebase/config"
import { criarNotificacao } from "../utils/criarNotificacao"

export async function toggleLike(postId, userId, userName, userPhoto) {
  const likeId = `${userId}_${postId}`
  const likeRef = doc(db, "likes", likeId)
  const postRef = doc(db, "posts", postId)

  const likeSnap = await getDoc(likeRef)

  if (likeSnap.exists()) {
    await deleteDoc(likeRef)
    await updateDoc(postRef, { likeCount: increment(-1) })
  } else {
    await setDoc(likeRef, {
      userId,
      postId,
      createdAt: new Date()
    })
    await updateDoc(postRef, { likeCount: increment(1) })

    const postSnap = await getDoc(postRef)
    const post = postSnap.data()

    await criarNotificacao({
      userId: post.authorId,
      type: "like",
      fromUserId: userId,
      fromUserName: userName,
      fromUserPhoto: userPhoto || '',
      postId
    })
  }
}