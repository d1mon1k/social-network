import cl from './PeopleIFollow.module.scss'
import photoPlaceholder from '../../assets/images/jpeg/no-photo.jpg'
import { IUser } from '../../redux/users/types'
import { makeFirstLetterUppercase } from '../../helpers/helpers'
import { useOutletContext } from 'react-router-dom'
import MyButton from '../../components/common/MyButton/MyButton'
import { OutletContext } from '../Users/Users'
import { Link } from 'react-router-dom'

interface UserIFollowItemProps {
  user: IUser
  isFollowing: number[]
  toggleFollowOnUser: (userId: number, followed: boolean) => void
}

export const UserIFollowItem:React.FC<UserIFollowItemProps> = (props) => {
const { user, isFollowing, toggleFollowOnUser } = props

  const userName = makeFirstLetterUppercase(user.name)
  return (
    <div className={cl.userItem}>
      <Link to={`/profile/${user.id}`}>
        <img
          className={cl.userPhoto}
          src={user.photos.small || photoPlaceholder}
          alt="user"
        />
      </Link>
      <div className={cl.infoColumn}>
        <Link to={`/profile/${user.id}`}>
          <div className={cl.userName}>{userName}</div>
        </Link>
        <div className={cl.userStatus}>
          {user.status || `${userName} has no status`}
        </div>
        <Link to={`/profile/${user.id}`}>
          <div className={cl.newMessage}>Write message</div>
        </Link>
      </div>
      <MyButton
        disabled={isFollowing.some((i) => i === props.user.id)}
        callBack={() => toggleFollowOnUser!(props.user.id, props.user.followed)}
      >
        {props.user.followed ? 'Unfollow' : 'Follow'}
      </MyButton>
    </div>
  )
}

const PeopleIFollow: React.FC = () => {
  const { usersList, isSubscribePending, toggleFollowOnUser } = useOutletContext<OutletContext>()
  return (
    <>
      {usersList &&
        usersList.map((user) => (
          <UserIFollowItem
            key={user.id}
            user={user}
            isFollowing={isSubscribePending}
            toggleFollowOnUser={toggleFollowOnUser}
          />
        ))}
    </>
  )
}

export default PeopleIFollow
