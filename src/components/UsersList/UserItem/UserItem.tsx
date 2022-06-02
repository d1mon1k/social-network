import { useNavigate } from 'react-router-dom'
import { makeFirstLetterUppercase } from '../../../helpers/helpers'
import photoPlaceholder from '../../../assets/images/jpeg/no-photo.jpg'
import { IUser } from '../../../redux/users/types'
import cl from './UserItem.module.scss'
import { Link } from 'react-router-dom'
import MyButton from '../../common/MyButton/MyButton'
import Avatar from '../../Avatar/Avatar'

/* ------------- Types ------------- */
interface UserItemProps {
  user: IUser
  isFollowing: number[]
  toggleFollowOnUser: (userId: number, followed: boolean) => void
  createDialogThunk: (userId: number) => void
}

/* ------------- Component ------------- */
export const UserItem:React.FC<UserItemProps> = ({ 
  user,
  isFollowing,
  toggleFollowOnUser,
  createDialogThunk,
}) => {
 const navigation = useNavigate()
 const userName = makeFirstLetterUppercase(user.name)

 const handleWritingMessage = async () => {
   await createDialogThunk(user.id)
   navigation(`/messenger/${user.id}`)
 }

 return (
   <div className={cl.userItem}>
     <Avatar photo={user.photos.small || photoPlaceholder} userId={user.id} />
     <div className={cl.infoColumn}>
       <Link to={`/profile/${user.id}`}>
         <div className={cl.userName}>{userName}</div>
       </Link>
       <div className={cl.userStatus}>
         {user.status || `${userName} has no status`}
       </div>
         <div onClick={handleWritingMessage} className={cl.newMessageBtn}>Write message</div>
     </div>
     <MyButton
       disabled={isFollowing.some((i) => i === user.id)}
       callBack={() => toggleFollowOnUser!(user.id, user.followed)}
       children={user.followed ? 'Unfollow' : 'Follow'}
     />
   </div>
 )
}

export default UserItem