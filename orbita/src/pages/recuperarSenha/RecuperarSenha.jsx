import { useState } from "react"
import { Link } from "react-router-dom"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../firebase/config"
import { traduzirErroFirebase } from "../../utils/traduzirErroFirebase"
import styles from './RecuperarSenha.module.css'

export default function RecuperarSenha() {
  const [email, setEmail] = useState('')
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const enviarRecuperacao = async (evento) => {
    evento.preventDefault()
    setErro('')          
    setCarregando(true)
    try {
        await sendPasswordResetEmail(auth, email)
        setEnviado(true)
    } catch (erro) {
        setErro(traduzirErroFirebase(erro.code))
    }finally {
        setCarregando(false)
    }
  }

  return <>
      <div className={styles.pageCenter}>
        <div className={styles.card}>
          <div className={styles.header}>
            <h1 className={styles.title}>Recuperar senha</h1>
            <p className={styles.subtitle}>Enviamos um link de redefinição para o seu e-mail.</p>
          </div>

          {enviado ? (
            <p className={styles.success}>Verifique sua caixa de entrada — o link chega em instantes.</p>
          ) : (
            <form onSubmit={enviarRecuperacao} className={styles.form}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu e-mail." />
              {erro && <p className={styles.error}>{erro}</p>}
              <button disabled={carregando} className={styles.btnPrimary}>
                  {carregando ? "Enviando Link..." : "Redefinir Senha"}
              </button>
            </form>
          )}
          <Link to="/login" className={styles.backLink}>Voltar para o login</Link>
        </div>
      </div>
  </>
}