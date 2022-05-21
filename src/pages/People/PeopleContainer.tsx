import React, { useEffect, useRef, useState } from 'react'
import { RootState } from '../../redux/store'
import { fetchUsersThunk } from '../../redux/users/thunks'
import { clearUsersState } from '../../redux/users/actions';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { setCurrentUsersPage } from '../../redux/users/actions';
import { toggleFollowOnUserThunk } from '../../redux/users/thunks';
import People from './People';
import { RouteType, withRoute } from '../../components/hoc/withRoute';
import { ErrorPopUp } from '../../components/common/ErrorPopUp/ErrorPopUp';
import { createDialogThunk } from '../../redux/messenger/thunks';

const PeopleContainerApi: React.FC<PeopleContainerProps & RouteType> = ({
  usersList,
  currentPage,
  route,
  totalUsersCount,
  maxPageItemsCount,
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
  const {location: {pathname}, navigate} = route

  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    return () => {clearUsersState()}
  }, [pathname, searchInput, clearUsersState]) //clearUsersState

  useEffect(() => {
    switch(pathname) {
      case '/people':
        fetchUsersThunk(currentPage, searchInput)
        return
      case '/people/developersIFollow':
       fetchUsersThunk(currentPage, searchInput, true)
       return
    }
  }, [currentPage, searchInput, pathname, fetchUsersThunk]) //searchInput, pathname, fetchUsersThunk

  return (
    <>
      <ErrorPopUp titlesArray={[toggleFollowOnUserError, fetchUsersError]}/>
      <People
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

const mapStateToProps = (state: RootState) => {
  return {
    toggleFollowOnUserError: state.users.requests.toggleFollowOnUserError,
    fetchUsersError: state.users.requests.fetchUsersError, 
    usersList: state.users.users,
    currentPage: state.users.currentUsersPage,
    maxPageItemsCount: state.users.maxPageItemsCount,
    totalUsersCount: state.users.totalUsersCount,
    isUsersFetching: state.users.requests.fetchUsersPending,
    isSubscribePending: state.users.requests.toggleFollowOnUserPending
  }
} 

const mapDispatchToProps = {
  clearUsersState,
  fetchUsersThunk,
  setCurrentUsersPage,
  toggleFollowOnUserThunk,
  createDialogThunk,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type PeopleContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector, withRoute)(PeopleContainerApi)