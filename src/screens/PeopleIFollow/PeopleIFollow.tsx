import cl from './PeopleIFollow.module.scss'
import { IUser } from '../../redux/users/types'
import photoPlaceholder from '../../assets/images/jpeg/no-photo.jpg'
import crossBtn from '../../assets/images/svg/cross.svg'
import { MyButton } from '../../components/common/MyButton/MyButton'
import { makeFirstLetterUppercase } from '../../helpers/helpers'

interface PeopleIFollowProps {
  usersList: IUser[]
}

const PeopleIFollow: React.FC<PeopleIFollowProps> = (props) => {
    return (
    <section className={cl.usersIFollowSection}>
      <div className={cl.usersList}>
        <div className={cl.usersTabs}>
          <div className={cl.tabsRow} >
            <div className={`${cl.tabItem} ${cl.active}`} >All developers <span className={cl.totalCount}>100</span></div>
            <div className={cl.tabItem} >Developers online</div>
          </div>
          <div className={cl.buttonContainer}>
            <MyButton callBack={() => {}}>Find developers</MyButton>
          </div>
        </div>
        <input
          placeholder={'Search users I follow'}
          className={cl.searchInput}
          type="text"
        />
        {props.usersList.map((user) => {
          const userName = makeFirstLetterUppercase(user.name)
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
                  <div className={cl.userName}>{userName}</div>
                </a>
                <div className={cl.userStatus}>
                  {user.status || `${userName} has no status`}
                </div>
                <a href="/">
                  <div className={cl.newMessage}>Write message</div>
                </a>
              </div>
              <div className={cl.unfollowBtn}>
                <img src={crossBtn} alt="unfollow" />
              </div>
            </div>
          )
        })}
      </div>
      <nav className={cl.usersNav}>
        <div className={cl.usersNavItem}>People I follow</div>
        <div className={cl.usersNavItem}>Find Developers</div>
        <div className={cl.usersNavItem}>Placeholder</div>
        <div className={`${cl.usersNavItem} ${cl.active}`}>Placeholder</div>
        <div className={cl.usersNavItem}>Placeholder</div>
      </nav>
    </section>
  )
}

export default PeopleIFollow

const Placeholder = () => {
  return (
    <div></div>
  )
}
