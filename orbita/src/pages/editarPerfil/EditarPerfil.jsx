import { useState, useEffect } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { updateProfile } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { db, auth, storage } from "../../firebase/config"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { uploadImagem } from "../../utils/uploadImagem"



export default function EditarPerfil() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [nome, setNome] = useState('')
    const [bio, setBio] = useState('')
    const [erro, setErro] = useState('')
    const [carregando, setCarregando] = useState(false)
    const [arquivo, setArquivo] = useState(null)

    useEffect(() => {
        if (user) {
        setNome(user.displayName || '')
        }
    }, [user])

    const uploadFoto = async () => {
        if (!arquivo) return null

        const storageRef = ref(storage, `avatars/${user.uid}`)
        await uploadBytes(storageRef, arquivo)
        const url = await getDownloadURL(storageRef)

        return url
    }

    const salvar = async (evento) => {
    evento.preventDefault()
    setErro('')
    setCarregando(true)

    try {
        let photoURL = user.photoURL || ''

        if (arquivo) {
            photoURL = await uploadImagem(arquivo)
        }

        await updateProfile(auth.currentUser, { displayName: nome, photoURL })

        await updateDoc(doc(db, "users", user.uid), {
        displayName: nome,
        bio: bio,
        photoURL: photoURL
        })

        navigate(`/perfil/${user.uid}`)
    } catch (erro) {
        setErro("Não foi possível salvar. Tente novamente.")
    } finally {
        setCarregando(false)
    }
    }

    return (
        <form onSubmit={salvar}>
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setArquivo(e.target.files[0])}
            />

            <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
            />
            <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Fale um pouco sobre você..."
            />

            {erro && <p style={{ color: 'red' }}>{erro}</p>}

            <button disabled={carregando}>
                {carregando ? "Salvando..." : "Salvar"}
            </button>
            </form>
    )
}