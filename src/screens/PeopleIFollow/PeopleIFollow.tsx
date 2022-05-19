import cl from './PeopleIFollow.module.scss'
import photoPlaceholder from '../../assets/images/jpeg/no-photo.jpg'
import { IUser } from '../../redux/users/types'
import { makeFirstLetterUppercase } from '../../helpers/helpers'
import { useNavigate, useOutletContext } from 'react-router-dom'
import MyButton from '../../components/common/MyButton/MyButton'
import { OutletContext } from '../Users/Users'
import { Link } from 'react-router-dom'

interface UserIFollowItemProps {
  user: IUser
  isFollowing: number[]
  toggleFollowOnUser: (userId: number, followed: boolean) => void
  createDialogThunk: (userId: number) => void
}

export const UserIFollowItem:React.FC<UserIFollowItemProps> = ({ 
   user,
   isFollowing,
   toggleFollowOnUser,
   createDialogThunk,
 }) => {
  const navigation = useNavigate()

  const writeMessageHandler = async () => {
    await createDialogThunk(user.id)
    navigation(`/messenger/${user.id}`)
  }

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
          <div onClick={writeMessageHandler} className={cl.newMessageBtn}>Write message</div>
      </div>
      <MyButton
        disabled={isFollowing.some((i) => i === user.id)}
        callBack={() => toggleFollowOnUser!(user.id, user.followed)}
      >
        {user.followed ? 'Unfollow' : 'Follow'}
      </MyButton>
    </div>
  )
}

const PeopleIFollow: React.FC = () => {
  const { usersList, isSubscribePending, toggleFollowOnUser, createDialogThunk } = useOutletContext<OutletContext>()
  return (
    <>
      {usersList &&
        usersList.map((user) => (
          <UserIFollowItem
            createDialogThunk={createDialogThunk}
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
