import { IUser } from '../../../store/types/users-types'
import cl from './User.module.scss'
import photo from '../../../assets/images/jpeg/no-photo.jpg'
import { Link } from 'react-router-dom'
import { MyButton } from '../../Common/MyButton/MyButton'

interface Props {
  user: IUser
  isFollowing: number[]
  userFollow: (userId: number) => void
  userUnFollow: (userId: number) => void
}

export const User: React.FC<Props> = (props) => {
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
          disabled={props.isFollowing.some((num) => num === props.user.id)}
          callBack={() => {
            props.user.followed
              ? props.userUnFollow(props.user.id)
              : props.userFollow(props.user.id)
          }}
        >
          {props.user.followed ? 'Unfollow' : 'Follow'}
        </MyButton>
      </div>
    </li>
  )
}
