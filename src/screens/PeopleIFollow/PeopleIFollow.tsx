import cl from './PeopleIFollow.module.scss'
import { IUser } from '../../redux/users/types'
import photoPlaceholder from '../../assets/images/jpeg/no-photo.jpg'
import crossBtn from '../../assets/images/svg/cross.svg'

interface PeopleIFollowProps {
  usersList: IUser[]
}

const PeopleIFollow: React.FC<PeopleIFollowProps> = (props) => {
  return (
    <section className={cl.usersIFollowSection}>
      <div className={cl.usersList}>
        {/* <div className={cl.searchInputContainer}> */}
          <input
            placeholder={'Search users I follow'}
            className={cl.searchInput}
            type="text"
          />
        {/* </div> */}
        {props.usersList.map((user) => {
          return (
            <div className={cl.userItem} key={user.id}>
              <a href="/">
                <img
                  className={cl.userPhoto}
                  src={user.photos.small || photoPlaceholder}
                  alt="user"
                />
              </a>
              <div className={cl.infoColumn}>
                <a href="/">
                  <div className={cl.userName}>{user.name}</div>
                </a>
                <div className={cl.userStatus}>
                  {user.status || `${user.name} has no status`}
                </div>
                <a href="/">
                  <div className={cl.newMessage}>Написать сообщение</div>
                </a>
              </div>
              <div className={cl.unfollowBtn}>
                <img src={crossBtn} alt="unfollow" />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default PeopleIFollow
