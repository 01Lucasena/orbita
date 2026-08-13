import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from './Cadastro.module.css'
import { validarSenha } from "../../utils/validarSenha"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../firebase/config"
import { traduzirErroFirebase } from "../../utils/traduzirErroFirebase"
import ReCAPTCHA from "react-google-recaptcha"

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

            navigate("/feed")
        } catch (erro) {
            setErro(traduzirErroFirebase(erro.code))
        } finally {
            setCarregando(false)
        }
    }

    return <>
        <form onSubmit={enviarDados}>
            <input type="text" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder='Digite seu nome.'/>
            <input type="text" value={form.sobrenome} onChange={(e) => setForm({ ...form, sobrenome: e.target.value })} placeholder='Digite seu Sobrenome.'/>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder='Digite seu email.'/>
            <div>
                <input type={mostrarSenha ? "text" : "password"} value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} placeholder='Digite sua senha.'/>
                <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)}>
                    {mostrarSenha ? "Ocultar" : "Mostrar"}
                 </button>
                 {form.senha && (
                    <p style={{ color: forcaSenha.cor }}>{forcaSenha.rotulo}</p>
                )}
            </div>
            <div>
                <input type={mostrarConfirmarSenha? "text" : "password"} value={form.confirmarSenha} onChange={(e) => setForm({ ...form, confirmarSenha: e.target.value })} placeholder='Confirme sua senha.'/>
                <button type="button" onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}>
                    {mostrarConfirmarSenha ? "Ocultar" : "Mostrar"}
                 </button>
            </div>
            {erro && <p style={{ color: 'red' }}>{erro}</p>}
             <button disabled={carregando}>
                {carregando ? "Cadastrando..." : "Cadastre-se"}
            </button>

            <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
                onExpired={() => setCaptchaToken(null)}
            />
        </form>
        

       
    </>
}