import cl from './PeopleIFollow.module.scss'
import photoPlaceholder from '../../assets/images/jpeg/no-photo.jpg'
import MyButton from '../../components/common/MyButton/MyButton'
import { IUser } from '../../redux/users/types'
import { CrossSvg } from '../../helpers/icons/icons'
import { getPagesAmount, makeFirstLetterUppercase } from '../../helpers/helpers'
import { useEffect, useRef } from 'react'
import Preloader from '../../components/common/Preloader/Preloader'

interface UserIFollowItemProps {
  user: IUser
}

const UserIFollowItem:React.FC<UserIFollowItemProps> = ({user}) => {
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


interface PeopleIFollowProps {
  usersList: IUser[]
  totalUsersCount: number
  isUsersFetching: boolean
  currentPage: number
  maxPageItemsCount: number
  setCurrentPage: (page: number) => void
}

const PeopleIFollow: React.FC<PeopleIFollowProps> = ({
  setCurrentPage,
  maxPageItemsCount,
  currentPage,
  isUsersFetching,
  usersList,
  totalUsersCount,
  ...props
}) => {
  console.log(currentPage, 'PeopleIFollow')
  const observedElement = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (isUsersFetching) return
    observer.current && observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      entries[0].isIntersecting &&
        currentPage < getPagesAmount(totalUsersCount, maxPageItemsCount) &&
        setCurrentPage(currentPage + 1)
    })
    observer.current.observe(observedElement.current!)
  }, [isUsersFetching, currentPage, totalUsersCount, maxPageItemsCount, setCurrentPage])

  return (
    <section className={cl.usersSection}>
      <div className={cl.usersTabs}>
        <div className={cl.tabsRow}>
          <div className={`${cl.tabItem} ${cl.active}`}>
            <span>All developers </span>
            <span className={cl.totalCount}>{totalUsersCount}</span>
          </div>
          <div className={cl.tabItem}>Developers online</div>
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
      <div className={cl.usersList}>
        {usersList.map((user) => (
          <UserIFollowItem key={user.id} user={user} />
        ))}
      </div>
      {isUsersFetching && (
        <Preloader width="50px" height="50px" position="absolute" />
      )}
      <div ref={observedElement}></div>
    </section>
  )
}

export default PeopleIFollow
