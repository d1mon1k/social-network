import React, { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import PeopleNav from '../../components/PeopleNav/PeopleNav'
import TabsRowBlock from '../../components/TabsRowBlock/TabsRowBlock'
import cl from './PeoplePage.module.scss'

/* ------------- Types ------------- */
interface PeoplePageProps {
  totalUsersCount: number
  searchInput: string
  isUsersFetching: boolean
  navigate: (link: string) => void
  setSearchInput: (searchInput: string) => void
}

export interface PeoplePageContextProps {
  searchInput: string
}

/* ------------- Component ------------- */
const PeoplePage: React.FC<PeoplePageProps> = ({
  totalUsersCount,
  searchInput,
  navigate,
  isUsersFetching,
  setSearchInput,
}) => {
  const searchField = useRef<HTMLInputElement>(null)

  useEffect(() => {
    (!isUsersFetching) && (searchInput.length > 0) && (searchField.current?.focus())
  }, [searchInput, isUsersFetching])

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
        <Outlet context={{searchInput}}/> {/* PeopleContainer, FriendsContainer */}
      </section>
      <PeopleNav />
    </section>
  )
}

export default PeoplePage
