import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/config"
import { useAuth } from "../../context/AuthContext"
import { traduzirErroFirebase } from "../../utils/traduzirErroFirebase"
import OrbitaLogo from "../../assets/svg/OrbitaLogo.svg"
import styles from './Login.module.css'

export default function Login() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const [carregando, setCarregando] = useState(false)
    const navigate = useNavigate()
    const { loginWithGoogle, user } = useAuth()

    useEffect(() => {
        if (user) {
            navigate("/feed")
        }
    }, [user])

    const enviarDados = async (evento) => {
        evento.preventDefault();
        setErro('')          
        setCarregando(true) 
        try{
            await signInWithEmailAndPassword(auth, email, senha)
        }catch(erro){
            setErro(traduzirErroFirebase(erro.code))
        }finally {
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
            <p className={styles.subtitle}>Entre para ver o que gira ao seu redor.</p>
            </div>

            <form onSubmit={enviarDados} className={styles.form}>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail." />
                <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha." />

                {erro && <p className={styles.error}>{erro}</p>}

                <button disabled={carregando} className={styles.btnPrimary}>
                    {carregando ? "Entrando..." : "Fazer login"}
                </button>
                <button type="button" onClick={() => loginWithGoogle()} className={styles.btnGoogle}>
                Entrar com Google
                </button>
            </form>

            <div className={styles.links}>
                <Link to="/recuperar-senha">Esqueceu a senha?</Link>
                <Link to="/cadastro">Criar conta</Link>
            </div>
        </div>
        </div>
    </>
}
   

