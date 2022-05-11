import { useEffect, useRef } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import MyButton from '../../components/common/MyButton/MyButton'
import Preloader from '../../components/common/Preloader/Preloader'
import { getPagesAmount, isActiveNavLink } from '../../helpers/helpers'
import { IUser } from '../../redux/users/types'
import cl from './People.module.scss'

interface PeopleProps {
  usersList: IUser[]
  totalUsersCount: number
  isUsersFetching: boolean
  currentPage: number
  maxPageItemsCount: number
  setCurrentPage: (page: number) => void
}

const People: React.FC<PeopleProps> = (props) => {
  const {
    totalUsersCount,
    isUsersFetching,
    currentPage,
    maxPageItemsCount,
    usersList,
    setCurrentPage,
  } = props

  const observedElement = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    if (isUsersFetching) return
    observer.current && observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      entries[0].isIntersecting 
      && currentPage < getPagesAmount(totalUsersCount, maxPageItemsCount) 
      && setCurrentPage(currentPage + 1)
    })
    observer.current.observe(observedElement.current!)
  }, [isUsersFetching, currentPage, totalUsersCount, maxPageItemsCount, setCurrentPage])

  return (
    <section className={cl.usersIFollowSection}>
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
          <Outlet context={{usersList}} />
        </div>
        {isUsersFetching && (<Preloader width="50px" height="50px" position="absolute" />)}
        <div ref={observedElement}></div>
      </section>
      <nav className={cl.usersNav}>
        <NavLink to="developersIFollow" className={isActiveNavLink(cl.usersNavItem, cl.active)} >People I follow</NavLink>
        <NavLink to="developers" className={isActiveNavLink(cl.usersNavItem, cl.active)} >Find Developers</NavLink>
        <div className={cl.usersNavItem}>Placeholder</div>
        <div className={cl.usersNavItem}>Placeholder</div>
        <div className={cl.usersNavItem}>Placeholder</div>
      </nav>
    </section>
  )
}

export default People