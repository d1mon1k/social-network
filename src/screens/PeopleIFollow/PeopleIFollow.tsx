import cl from './PeopleIFollow.module.scss'
import photoPlaceholder from '../../assets/images/jpeg/no-photo.jpg'
import { IUser } from '../../redux/users/types'
import { CrossSvg } from '../../helpers/icons/icons'
import { makeFirstLetterUppercase } from '../../helpers/helpers'
import { useOutletContext } from 'react-router-dom'

interface UserIFollowItemProps {
  user: IUser
}

export const UserIFollowItem:React.FC<UserIFollowItemProps> = ({user}) => {
  const userName = makeFirstLetterUppercase(user.name)
  return (
    <div className={cl.userItem}>
      <a href="/"><img className={cl.userPhoto} src={user.photos.small || photoPlaceholder} alt="user" /></a>
      <div className={cl.infoColumn}>
        <a href="/"><div className={cl.userName}>{userName}</div></a>
        <div className={cl.userStatus}>{user.status || `${userName} has no status`}</div>
        <a href="/"><div className={cl.newMessage}>Write message</div></a>
      </div>
      <div className={cl.btnContainer}><CrossSvg className={cl.unfollowBtn} /></div>
    </div>
  )
}

const PeopleIFollow: React.FC = () => {
  const { usersList } = useOutletContext<{usersList: IUser[]}>()
  return (
    <>
      {usersList && usersList.map((user) => (
        <UserIFollowItem key={user.id} user={user} />
      ))}
    </>
  )
}

export default PeopleIFollow
