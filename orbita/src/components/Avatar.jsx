import styles from './Avatar.module.css'

export default function Avatar({ photoURL, name, size = 32 }) {
  return (
    <img
      src={photoURL || '/default-avatar.svg'}
      alt={name || 'Avatar'}
      className={styles.avatar}
      style={{ width: size, height: size }}
    />
  )
}