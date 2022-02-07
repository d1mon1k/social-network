import { IUser } from '../../../store/types/users-types'
import cl from './User.module.scss'
import photo from '../../../assets/images/jpeg/no-photo.jpg'
import { Link } from 'react-router-dom'
import { MyButton } from '../../Common/MyButton/MyButton'
import { usersApi } from '../../../api/api'

interface Props {
  user: IUser
  toggleUserFollow: (userId: number) => void

}

export const User: React.FC<Props> = (props) => {
  const followUser = () => {
    usersApi.followUser(props.user.id)
    .then(({ resultCode }) => {
      if(resultCode === 0) {
        props.toggleUserFollow(props.user.id)
      }
    })
  }

  const unfollowUser = () => {
    usersApi.unFollowUser(props.user.id)
    .then(({ resultCode }) => {
      if(resultCode === 0) {
        props.toggleUserFollow(props.user.id)
      }
    })      
  }

  return (
    <li className={cl.userItem}>
      <Link className={cl.userPhotoWrap} to={`/profile/${props.user.id}`}>
        <img
          className={cl.userPhoto}
          src={props.user.photos.small || photo}
          alt=""
        />
      </Link>
      <div className={cl.infoColumn}>
        <Link className={cl.userPhotoWrap} to={`/profile/${props.user.id}`}>
          <span className={cl.userName}>{props.user.name}</span>
        </Link>
        <span className={cl.userLocation}>{`Minsk Belarus`}</span>
      </div>
      <div className={cl.followButton}>
        <MyButton
          disabled={false}
          callBack={() => {
            props.user.followed ? unfollowUser() : followUser()
          }}  
        >
          {props.user.followed ? 'Unfollow' : 'Follow'}
        </MyButton>
      </div>
    </li>
  )
}
