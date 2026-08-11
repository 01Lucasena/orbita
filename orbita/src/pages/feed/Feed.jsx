import { useAuth } from "../../context/AuthContext"

export default function Feed() {
  const { logout } = useAuth()

  return (
    <div>
      <h1>Feed</h1>
      <button type="button" onClick={() => logout()}>Deslogar</button>
    </div>
  )
}