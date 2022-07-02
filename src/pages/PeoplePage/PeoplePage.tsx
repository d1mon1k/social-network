import React, { useEffect, useRef } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import Preloader from '../../components/common/Preloader/Preloader'
import PeopleNav from '../../components/PeopleNav/PeopleNav'
import TabsRowBlock from '../../components/TabsRowBlock/TabsRowBlock'
import { getPagesAmount, isActiveNavLink } from '../../helpers/helpers'
import { IUser, IUsersData, SetUsersActionTypes } from '../../redux/users/types'
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
  fetchUsersThunk: (maxPageItemsCount: number, searchInput: string, isFriends?: boolean) => void
  createDialogThunk: (userId: number) => void
}

export interface PeoplePageContextProps {
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
  setSearchInput,
  fetchUsersThunk,
  createDialogThunk,
}) => {
  const searchField = useRef<HTMLInputElement>(null)
  const observedElement = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  const actualTotalCount = useRef(totalUsersCount) 

  useEffect(() => {
    actualTotalCount.current = totalUsersCount
  }, [totalUsersCount])

  useEffect(() => {
    (!isUsersFetching) && (searchInput.length > 0) && (searchField.current?.focus())
  }, [searchInput, isUsersFetching])

  useEffect(() => {
    if (isUsersFetching) return
    if (observer.current) observer.current.disconnect()
    
    const callBack = (entries: IntersectionObserverEntry[]): void => {
      if (
        entries[0].isIntersecting 
          && currentPage < getPagesAmount(actualTotalCount.current, maxPageItemsCount) 
          && !isUsersFetching
      ) {
        pathName === '/people'
          ? fetchUsersThunk(maxPageItemsCount, searchInput) 
          : fetchUsersThunk(maxPageItemsCount, searchInput, true)
      }
    }
    observer.current = new IntersectionObserver(callBack)
    observer.current.observe(observedElement.current!)
  }, [isUsersFetching, pathName])

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)

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
          disabled={isUsersFetching}
          ref={searchField}
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
        {isUsersFetching ? (
          <Preloader width="50px" height="50px" position="absolute" />
        ) : (
          <div style={{height: '1px'}} ref={observedElement} />
        )}
      </section>
      <PeopleNav />
    </section>
  )
}

export default PeoplePage
