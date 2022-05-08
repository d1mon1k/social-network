import cl from './User.module.scss'
import photoPlaceholder from '../../../assets/images/jpeg/no-photo.jpg'
import { Link } from 'react-router-dom'
import { MyButton } from '../../../components/Common/MyButton/MyButton'
import { IUser } from '../../../redux/users/types'

interface Props {
  user: IUser
  isFollowing: number[]
  userFollow: (userId: number, followed: boolean) => void
}

export const User: React.FC<Props> = (props) => {
  return (
    <li className={cl.userItem}>
      <Link className={cl.userPhotoWrap} to={`/profile/${props.user.id}`}>
        <img
          className={cl.userPhoto}
          src={props.user.photos.small || photoPlaceholder}
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
          disabled={props.isFollowing.some((i) => i === props.user.id)}
          callBack={() => props.userFollow(props.user.id, props.user.followed)}
        >
          {props.user.followed ? ('Unfollow') : ('Follow')}
        </MyButton>
      </div>
    </li>
  )
}
