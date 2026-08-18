import { useParams, Link } from "react-router-dom"
import { useUserProfile } from "../../hooks/useUserProfile"
import { useAuth } from "../../context/AuthContext"
import { usePostsByUser } from "../../hooks/usePostsByUser"
import { useUserLikes } from "../../hooks/useUserLikes"
import PostCard from "../../components/PostCard"
import FollowButton from "../../components/FollowButton"
import Avatar from "../../components/Avatar"
import styles from './Perfil.module.css'

export default function Perfil(){
    const { uid } = useParams()
    const { profile, carregando } = useUserProfile(uid)
    const { user } = useAuth()
    const { posts, carregando: carregandoPosts } = usePostsByUser(uid)
    const likedPostIds = useUserLikes(user?.uid)

    if (carregando) return <p className={styles.loadingText}>Carregando perfil...</p>
    if (!profile) return <p className={styles.loadingText}>Usuário não encontrado.</p>

    return (
    <div className={styles.page}>
        <div
          className={styles.cover}
          style={{ backgroundImage: profile.coverURL ? `url(${profile.coverURL})` : undefined }}
        >
            {user?.uid === uid && (
              <Link to="/editar-perfil" className={styles.editButton}>Editar perfil</Link>
            )}
        </div>

        <div className={styles.header}>
            <div className={styles.avatarWrapper}>
              <Avatar photoURL={profile.photoURL} name={profile.displayName} size={96} />
            </div>

            <h1 className={styles.name}>{profile.displayName}</h1>
            <p className={styles.bio}>{profile.bio || "Sem bio ainda."}</p>

            <p className={styles.followCounts}>
              <strong>{profile.followersCount || 0}</strong> seguidores · <strong>{profile.followingCount || 0}</strong> seguindo
            </p>

            {user && user.uid !== uid && (
              <FollowButton currentUserId={user.uid} targetUserId={uid} />
            )}
        </div>

        <div className={styles.postList}>
            {carregandoPosts && <p className={styles.loadingText}>Carregando posts...</p>}
            {!carregandoPosts && posts.length === 0 && (
              <p className={styles.emptyState}>Nenhum post ainda.</p>
            )}
            {posts.map((post) => (
                <PostCard key={post.id} post={post} user={user} likedPostIds={likedPostIds} />
            ))}
        </div>
    </div>
)
}