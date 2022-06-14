import React, { useEffect, useRef, useState } from 'react'
import { RootState } from '../../redux/store'
import { fetchUsersThunk } from '../../redux/users/thunks'
import { clearUsersState } from '../../redux/users/actions';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { setCurrentUsersPage } from '../../redux/users/actions';
import { toggleFollowOnUserThunk } from '../../redux/users/thunks';
import PeoplePage from './PeoplePage';
import { RouteType, withRoute } from '../../components/hoc/withRoute';
import ErrorPopUp from '../../components/common/ErrorPopUp/ErrorPopUp';
import { createDialogThunk } from '../../redux/messenger/thunks';

/* ------------- Component ------------- */
const PeoplePageContainerApi: React.FC<PeoplePageContainerProps & RouteType> = ({
  route,
  usersList,
  currentPage,
  totalUsersCount,
  // maxPageItemsCount,
  isSubscribePending,
  isUsersFetching,
  fetchUsersError,
  toggleFollowOnUserError,
  clearUsersState,
  setCurrentUsersPage,
  fetchUsersThunk,
  toggleFollowOnUserThunk,
  createDialogThunk
}) => {
  const {location: {pathname: pathName}, navigate} = route
  const [searchInput, setSearchInput] = useState('')
  const memorizedPath = useRef(pathName)
  const maxPageItemsCount = 15

  useEffect(() => {
    return () => {
      clearUsersState()
    }
  }, [clearUsersState])

  useEffect(() => {
    clearUsersState()
    window.scrollTo(0, 0)
  }, [searchInput])

  useEffect(() => {
    clearUsersState()
  }, [pathName])

  useEffect(() => {
    if(memorizedPath.current !== pathName && currentPage > 1) {
      memorizedPath.current = pathName
      return 
    }

    if(isUsersFetching) return

    memorizedPath.current = pathName

    switch (pathName) {
      case '/people':
        fetchUsersThunk(currentPage, maxPageItemsCount, searchInput)
        return
      case '/people/friends':
        fetchUsersThunk(currentPage, maxPageItemsCount, searchInput, true)
        return
    }
  }, [currentPage, searchInput, pathName, fetchUsersThunk])

  return (
    <>
      <ErrorPopUp titlesArray={[toggleFollowOnUserError, fetchUsersError]}/>
      <PeoplePage
        pathName={pathName}
        searchInput={searchInput}
        currentPage={currentPage}
        maxPageItemsCount={maxPageItemsCount}
        isUsersFetching={isUsersFetching}
        totalUsersCount={totalUsersCount}
        usersList={usersList}
        isSubscribePending={isSubscribePending}
        navigate={navigate}
        setSearchInput={setSearchInput}
        toggleFollowOnUser={toggleFollowOnUserThunk}
        createDialogThunk={createDialogThunk}
        setCurrentPage={setCurrentUsersPage}
      />
    </>
  )
}

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    usersList: state.users.users,
    currentPage: state.users.currentUsersPage,
    totalUsersCount: state.users.totalUsersCount,
    isUsersFetching: state.users.requests.fetchUsersPending,
    isSubscribePending: state.users.requests.toggleFollowOnUserPending,
    toggleFollowOnUserError: state.users.requests.toggleFollowOnUserError,
    fetchUsersError: state.users.requests.fetchUsersError, 
  }
} 

const mapDispatchToProps = {
  clearUsersState,
  setCurrentUsersPage,
  fetchUsersThunk,
  toggleFollowOnUserThunk,
  createDialogThunk,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type PeoplePageContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector, withRoute)(PeoplePageContainerApi)