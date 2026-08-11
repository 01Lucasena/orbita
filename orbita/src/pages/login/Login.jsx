import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase/config"
import { useAuth } from "../../context/AuthContext"
import styles from './Login.module.css'

export default function Login() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()
    const { loginWithGoogle, user } = useAuth()

    useEffect(() => {
        if (user) {
            navigate("/feed")
        }
    }, [user])

    const enviarDados = async (evento) => {
        evento.preventDefault();

        try{
            await signInWithEmailAndPassword(auth, email, senha)
        }catch(erro){
            console.log(erro.code)
        }
    }
    
    return <>
        <form onSubmit={enviarDados}>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail." />
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha." />
            <button>Fazer login</button>
            <button type="button" onClick={() => loginWithGoogle()}>Entrar com Google</button>
        </form>
    </>
}
   

