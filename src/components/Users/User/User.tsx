import { IUser } from '../../../store/types/users-types'
import cl from './User.module.scss'
import photo from '../../../assets/images/jpeg/no-photo.jpg'
import { Link } from 'react-router-dom'
import { MyButton } from '../../Common/MyButton/MyButton'
import axios from 'axios'

interface Props {
  user: IUser
  toggleUserFollow: (userId: number) => void
}

export const User: React.FC<Props> = (props) => {
  const followUser = () => {
    axios
    .post(
      `https://social-network.samuraijs.com/api/1.0/follow/${props.user.id}`,
      {},
      {
        withCredentials: true,
        headers: { "API-KEY": "61ac4a57-11aa-4c80-a12b-d117d48a000f" },
      }
    )
    .then(({ data }) => {
      if(data.resultCode === 0) {
        props.toggleUserFollow(props.user.id)
      }
    })
  }

  const unfollowUser = () => {
    axios
    .delete(
      `https://social-network.samuraijs.com/api/1.0/follow/${props.user.id}`,
      {
        withCredentials: true,
        headers: { "API-KEY": "61ac4a57-11aa-4c80-a12b-d117d48a000f" },
      }
    )
    .then(({ data }) => {
      if(data.resultCode === 0) {
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
