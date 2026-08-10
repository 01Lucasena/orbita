import { useState } from "react"
import styles from './Login.module.css'

export default function Login() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const enviarDados = async (evento) => {
        evento.preventDefault();
        console.log(email, senha)
    }


    return <>
        <form onSubmit={enviarDados}>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail." />
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha." />
            <button>Fazer login</button>
        </form>
    </>
   

}