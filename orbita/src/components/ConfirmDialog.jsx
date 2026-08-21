import styles from './ConfirmDialog.module.css'

export default function ConfirmDialog({ aberto, titulo, mensagem, onConfirmar, onCancelar }) {
  if (!aberto) return null

  return (
    <div className={styles.overlay} onClick={onCancelar}>
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>{titulo}</h2>
        <p className={styles.message}>{mensagem}</p>
        <div className={styles.actions}>
          <button className={styles.cancelButton} onClick={onCancelar}>
            Cancelar
          </button>
          <button className={styles.confirmButton} onClick={onConfirmar}>
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}