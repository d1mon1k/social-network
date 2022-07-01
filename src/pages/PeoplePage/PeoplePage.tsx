import React, { useEffect, useRef } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Preloader from '../../components/common/Preloader/Preloader'
import TabsRowBlock from '../../components/TabsRowBlock/TabsRowBlock'
import { getPagesAmount, isActiveNavLink } from '../../helpers/helpers'
import { IUser, IUsersData, SetUsersActionTypes } from '../../redux/users/types'
import cl from './PeoplePage.module.scss'

/* ------------- Types ------------- */
interface PeoplePageProps {
  action: SetUsersActionTypes
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
  setCurrentPage: (payload: {currentPage: number, action: SetUsersActionTypes}) => void
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
  // const path = useRef(pathName)
  const actualTotalCount = useRef(totalUsersCount) 

  useEffect(() => {
    window.scrollBy({behavior: 'smooth', top: -9999999})
  }, [pathName])

  useEffect(() => {
    actualTotalCount.current = totalUsersCount
  }, [totalUsersCount])

  useEffect(() => {
    if (isUsersFetching) return
    if (observer.current) observer.current.disconnect()
    
    const callBack = (entries: IntersectionObserverEntry[]): void => {
      if (
        entries[0].isIntersecting 
        && currentPage < getPagesAmount(actualTotalCount.current, maxPageItemsCount) 
        // && path.current === pathName
      ) {
        setCurrentPage({currentPage: currentPage + 1, action: 'friends'})
      }
      // path.current = pathName
    }
    observer.current = new IntersectionObserver(callBack)
    observer.current.observe(observedElement.current!)
  }, [isUsersFetching, pathName])

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput(e.target.value)

  return (
    <section className={cl.usersIFollowSection}>
      <section className={cl.usersSection}>
        <TabsRowBlock 
          firstTabName={'All developers '} 
          secondTabName={'Friends'} 
          totalCount={totalUsersCount} 
          callBack={() => navigate('/people')} 
        />
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
              usersList: usersList,
              isSubscribePending,
              toggleFollowOnUser,
              createDialogThunk,
            }} 
          />
        </div>
        {isUsersFetching ? (<Preloader width="50px" height="50px" position="absolute" />) : (<div style={{height: '1px', width: '100%'}} ref={observedElement} />)}
      </section>
      <PeopleNav />
    </section>
  )
}

export default PeoplePage

/* ------------- Nested components ------------- */
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
