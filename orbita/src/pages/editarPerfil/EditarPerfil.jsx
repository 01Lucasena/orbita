import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useUserProfile } from "../../hooks/useUserProfile"
import { updateProfile } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { db, auth } from "../../firebase/config"
import { uploadImagem } from "../../utils/uploadImagem"
import { Camera, Pencil, Check, X } from "lucide-react"
import Avatar from "../../components/Avatar"
import styles from './EditarPerfil.module.css'

export default function EditarPerfil() {
  const { user } = useAuth()
  const { profile } = useUserProfile(user?.uid)
  const navigate = useNavigate()

  const [nome, setNome] = useState('')
  const [bio, setBio] = useState('')
  const [editandoInfo, setEditandoInfo] = useState(false)

  const [arquivo, setArquivo] = useState(null)
  const [arquivoCapa, setArquivoCapa] = useState(null)
  const [previewFoto, setPreviewFoto] = useState(null)
  const [previewCapa, setPreviewCapa] = useState(null)

  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const fotoInputRef = useRef(null)
  const capaInputRef = useRef(null)

  useEffect(() => {
    if (user) setNome(user.displayName || '')
    if (profile) setBio(profile.bio || '')
  }, [user, profile])

  function selecionarFoto(e) {
    const file = e.target.files[0]
    if (!file) return
    setArquivo(file)
    setPreviewFoto(URL.createObjectURL(file))
  }

  function selecionarCapa(e) {
    const file = e.target.files[0]
    if (!file) return
    setArquivoCapa(file)
    setPreviewCapa(URL.createObjectURL(file))
  }

  async function salvar() {
    setErro('')
    setCarregando(true)

    try {
      let photoURL = user.photoURL || ''
      let coverURL = profile?.coverURL || ''

      if (arquivo) photoURL = await uploadImagem(arquivo)
      if (arquivoCapa) coverURL = await uploadImagem(arquivoCapa)

      await updateProfile(auth.currentUser, { displayName: nome, photoURL })

      await updateDoc(doc(db, "users", user.uid), {
        displayName: nome,
        bio,
        photoURL,
        coverURL
      })

      navigate(`/perfil/${user.uid}`)
    } catch {
      setErro("Não foi possível salvar. Tente novamente.")
    } finally {
      setCarregando(false)
    }
  }

  if (!user) return null

  return (
    <div className={styles.page}>
      <div
        className={styles.cover}
        style={{
          backgroundImage: previewCapa
            ? `url(${previewCapa})`
            : profile?.coverURL
              ? `url(${profile.coverURL})`
              : undefined
        }}
      >
        <button
          type="button"
          className={styles.coverUploadButton}
          onClick={() => capaInputRef.current.click()}
        >
          <Camera size={18} />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={capaInputRef}
          className={styles.hiddenInput}
          onChange={selecionarCapa}
        />
      </div>

      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          <Avatar photoURL={previewFoto || user.photoURL} name={user.displayName} size={96} />
          <button
            type="button"
            className={styles.avatarUploadButton}
            onClick={() => fotoInputRef.current.click()}
          >
            <Camera size={16} />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fotoInputRef}
            className={styles.hiddenInput}
            onChange={selecionarFoto}
          />
        </div>

        {!editandoInfo ? (
          <div className={styles.infoDisplay}>
            <div className={styles.nameRow}>
              <h1 className={styles.name}>{nome || "Sem nome"}</h1>
              <button className={styles.pencilButton} onClick={() => setEditandoInfo(true)}>
                <Pencil size={16} />
              </button>
            </div>
            <p className={styles.bio}>{bio || "Sem bio ainda."}</p>
          </div>
        ) : (
          <div className={styles.infoEdit}>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              className={styles.nameInput}
            />
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Fale um pouco sobre você..."
              className={styles.bioInput}
            />
            <div className={styles.infoEditActions}>
              <button
                type="button"
                className={styles.confirmButton}
                onClick={() => setEditandoInfo(false)}
              >
                <Check size={14} /> Ok
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => {
                  setNome(user.displayName || '')
                  setBio(profile?.bio || '')
                  setEditandoInfo(false)
                }}
              >
                <X size={14} /> Cancelar
              </button>
            </div>
          </div>
        )}

        {erro && <p className={styles.error}>{erro}</p>}

        <div className={styles.saveRow}>
          <button
            className={styles.btnPrimary}
            disabled={carregando}
            onClick={salvar}
          >
            {carregando ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      </div>
    </div>
  )
}