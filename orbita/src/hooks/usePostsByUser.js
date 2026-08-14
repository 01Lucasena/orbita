import { useEffect, useState } from "react"
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "../firebase/config"

export function usePostsByUser(uid) {
    const [posts, setPosts] = useState([])
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        if (!uid) return

    const postsRef = collection(db, "posts")
    const q = query(postsRef, where("authorId", "==", uid), orderBy("createdAt", "desc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
    const lista = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    }))
        setPosts(lista)
        setCarregando(false)
    }, (erro) => {
        console.log("Erro ao buscar posts:", erro.code, erro.message)
        setCarregando(false)
    })

    return unsubscribe
    }, [uid])

    return { posts, carregando }
}