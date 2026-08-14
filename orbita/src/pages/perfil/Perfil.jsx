import { useParams } from "react-router-dom"
import { useUserProfile } from "../../hooks/useUserProfile"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { usePostsByUser } from "../../hooks/usePostsByUser"

export default function Perfil(){
    const { uid } = useParams()
    const { profile, carregando } = useUserProfile(uid)
    const { user } = useAuth()
    const { posts, carregando: carregandoPosts } = usePostsByUser(uid)

    console.log("uid:", uid)
    console.log("profile:", profile)
    console.log("carregando:", carregando)

    if (carregando) return <p>Carregando perfil...</p>
    if (!profile) return <p>Usuário não encontrado.</p>

    return (
        <div>
            {profile.photoURL && (
                <img src={profile.photoURL} alt={`Foto de ${profile.displayName}`} width="120" />
            )}
            <h1>{profile.displayName}</h1>
            <p>{profile.bio || "Sem bio ainda."}</p>
            <div>
            {carregandoPosts && <p>Carregando posts...</p>}
            {posts.map((post) => (
                <div key={post.id}>
                    <p>{post.text}</p>
                </div>
            ))}
            </div>
            {user?.uid === uid && (
            <Link to="/editar-perfil">Editar perfil</Link>
            )}
        </div>
    )
}