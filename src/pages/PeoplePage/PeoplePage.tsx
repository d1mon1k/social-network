import React, { useEffect, useRef } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import MyButton from '../../components/common/MyButton/MyButton'
import Preloader from '../../components/common/Preloader/Preloader'
import { getPagesAmount, isActiveNavLink } from '../../helpers/helpers'
import { IUser } from '../../redux/users/types'
import cl from './PeoplePage.module.scss'

/* ------------- Types ------------- */
interface PeoplePageProps {
  usersList: IUser[]
  totalUsersCount: number
  currentPage: number
  maxPageItemsCount: number
  searchInput: string
  pathName: string
  isUsersFetching: boolean
  isSubscribePending: number[]
  navigate: (link: string) => void
  setSearchInput: (searchInput: string) => void
  toggleFollowOnUser: (userId: number, followed: boolean) => void
  setCurrentPage: (page: number) => void
  createDialogThunk: (userId: number) => void
}

export interface PeoplePageOutletContext {
  usersList: IUser[]
  isSubscribePending: number[]
  toggleFollowOnUser: (userId: number, followed: boolean) => void
  createDialogThunk: (userId: number) => void
}

/* ------------- Component ------------- */
const PeoplePage: React.FC<PeoplePageProps> = ({
  totalUsersCount,
  currentPage,
  maxPageItemsCount,
  usersList,
  searchInput,
  navigate,
  pathName,
  isUsersFetching,
  isSubscribePending,
  toggleFollowOnUser,
  setCurrentPage,
  setSearchInput,
  createDialogThunk,
}) => {
  const observedElement = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  const path = useRef(pathName)

  useEffect(() => {
    if (isUsersFetching) return
    if (observer.current) {
      observer.current.disconnect()
    }
    const callBack = (entries: IntersectionObserverEntry[]): void => {
      if (
        entries[0].isIntersecting &&
        currentPage < getPagesAmount(totalUsersCount, maxPageItemsCount) &&
        path.current === pathName
      ) {
        setCurrentPage(currentPage + 1)
      }
      path.current = pathName
    }
    observer.current = new IntersectionObserver(callBack)
    observer.current.observe(observedElement.current!)
  }, [isUsersFetching, pathName])

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput(e.target.value)

  return (
    <section className={cl.usersIFollowSection}>
      <section className={cl.usersSection}>
        <PeopleTabs totalUsersCount={totalUsersCount} navigate={navigate} />
        <input
          placeholder={'Search users I follow'}
          className={cl.searchInput}
          type="text"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <div className={cl.usersList}>
          <Outlet //UsersList
            context={{
              usersList,
              isSubscribePending,
              toggleFollowOnUser,
              createDialogThunk,
            }} 
          />
        </div>
        {isUsersFetching ? (<Preloader width="50px" height="50px" position="absolute" />) : (<div ref={observedElement} />)}
      </section>
      <PeopleNav />
    </section>
  )
}

export default PeoplePage

/* ------------- Nested components ------------- */
interface PeopleTabsProps {
  totalUsersCount: number
  navigate: (link: string) => void
}

const PeopleTabs: React.FC<PeopleTabsProps> = ({ totalUsersCount, navigate }) => {
  return (
    <div className={cl.usersTabs}>
      <div className={cl.tabsRow}>
        <div className={`${cl.tabItem} ${cl.active}`}>
          <span>All developers </span>
          <span className={cl.totalCount}>{totalUsersCount}</span>
        </div>
        <div className={cl.tabItem}>Developers online</div>
      </div>
      <div className={cl.buttonContainer}>
        <MyButton callBack={() => navigate('/people')}>Find developers</MyButton>
      </div>
    </div>
  )
}

const PeopleNav = () => {
  return (
    <nav className={cl.usersNav}>
      <NavLink to="friends" className={isActiveNavLink(cl.usersNavItem, cl.active)} >People I follow</NavLink>
      <NavLink to="/people" end className={isActiveNavLink(cl.usersNavItem, cl.active)} >Find Developers</NavLink>
      <div className={cl.usersNavItem}>Placeholder</div>
      <div className={cl.usersNavItem}>Placeholder</div>
      <div className={cl.usersNavItem}>Placeholder</div>
    </nav>
  )
}
