import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { validarSenha } from "../../utils/validarSenha"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../firebase/config"
import { traduzirErroFirebase } from "../../utils/traduzirErroFirebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../../firebase/config"
import ReCAPTCHA from "react-google-recaptcha"
import OrbitaLogo from "../../assets/svg/OrbitaLogo.svg"
import { Eye, EyeOff } from "lucide-react"
import styles from './Cadastro.module.css'

export default function Cadastro(){

    const [form, setForm] = useState({ nome: '', sobrenome: '', email: '', senha: '', confirmarSenha: '' })
    const [mostrarSenha, setMostrarSenha] = useState(false)
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false)
    const [erro, setErro] = useState('')
    const [carregando, setCarregando] = useState(false)
    const navigate = useNavigate()
    const forcaSenha = validarSenha(form.senha)
    const [captchaToken, setCaptchaToken] = useState(null)

    const enviarDados = async (evento) => {
        evento.preventDefault();
        setErro('')

        if (!captchaToken) {
            setErro("Confirme que você não é um robô.")
            return
        }

        if (form.senha !== form.confirmarSenha) {
            setErro("As senhas não coincidem.")
            return
        }

        setCarregando(true)
        try {
            const resultado = await createUserWithEmailAndPassword(auth, form.email, form.senha)
            
            await updateProfile(resultado.user, {
                displayName: `${form.nome} ${form.sobrenome}`
            })

            await setDoc(doc(db, "users", resultado.user.uid), {
                uid: resultado.user.uid,
                displayName: `${form.nome} ${form.sobrenome}`,
                photoURL: "",
                coverURL: "",
                bio: "",
                createdAt: serverTimestamp()
            })

            navigate("/feed")
        } catch (erro) {
            setErro(traduzirErroFirebase(erro.code))
        } finally {
            setCarregando(false)
        }
    }

   return <>
        <div className={styles.pageCenter}>
        <div className={styles.card}>
            <div className={styles.header}>
            <img 
                src={OrbitaLogo} 
                alt="Órbita"
                className={styles.logo}
            /> 

            <p className={styles.subtitle}>Crie sua conta e entre em órbita.</p>
            </div>

            <form onSubmit={enviarDados} className={styles.form}>
                <input type="text" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder='Digite seu nome.'/>
                <input type="text" value={form.sobrenome} onChange={(e) => setForm({ ...form, sobrenome: e.target.value })} placeholder='Digite seu Sobrenome.'/>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder='Digite seu email.'/>

                <div className={styles.passwordField}>
                    <input type={mostrarSenha ? "text" : "password"} value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} placeholder='Digite sua senha.'/>
                    <button type="button" className={styles.eyeButton} onClick={() => setMostrarSenha(!mostrarSenha)}>
                        {mostrarSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    {form.senha && (
                        <p className={styles.strengthLabel} style={{ color: forcaSenha.cor }}>{forcaSenha.rotulo}</p>
                    )}
                </div>

                <div className={styles.passwordField}>
                    <input type={mostrarConfirmarSenha? "text" : "password"} value={form.confirmarSenha} onChange={(e) => setForm({ ...form, confirmarSenha: e.target.value })} placeholder='Confirme sua senha.'/>
                    <button type="button" className={styles.eyeButton} onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}>
                    </button>
                </div>

                {erro && <p className={styles.error}>{erro}</p>}

                <button disabled={carregando} className={styles.btnPrimary}>
                    {carregando ? "Cadastrando..." : "Cadastre-se"}
                </button>

                <div className={styles.captchaWrapper}>
                <ReCAPTCHA
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={(token) => setCaptchaToken(token)}
                    onExpired={() => setCaptchaToken(null)}
                />
                </div>
            </form>
        </div>
        </div>
</>
}