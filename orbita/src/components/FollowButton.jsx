import { useIsFollowing } from "../hooks/useIsFollowing"
import { toggleFollow } from "../hooks/useFollow"
import { UserPlus, UserCheck } from "lucide-react"
import styles from './FollowButton.module.css'

export default function FollowButton({ currentUserId, targetUserId }) {
  const seguindo = useIsFollowing(currentUserId, targetUserId)

  if (currentUserId === targetUserId) return null

  return (
    <button
      className={seguindo ? styles.following : styles.follow}
      onClick={() => toggleFollow(currentUserId, targetUserId)}
    >
      {seguindo ? <UserCheck size={16} /> : <UserPlus size={16} />}
      {seguindo ? "Seguindo" : "Seguir"}
    </button>
  )
}