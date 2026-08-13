import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/config"
import { useAuth } from "../../context/AuthContext"
import { traduzirErroFirebase } from "../../utils/traduzirErroFirebase"
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
        <form onSubmit={enviarDados}>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail." />
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha." />
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
            <button disabled={carregando}>
                {carregando ? "Entrando..." : "Fazer login"}
            </button>
            <button type="button" onClick={() => loginWithGoogle()}>Entrar com Google</button>
            <Link to="/recuperar-senha">Esqueceu a senha?</Link>
            <Link to="/cadastro">Não tem uma conta? Cadastre-se</Link>
        </form>
        
    </>
}
   

