import React, { useEffect, useState } from 'react'
import { RootState } from '../../redux/store'
import { fetchUsersThunk } from '../../redux/users/thunks'
import { clearUsersState } from '../../redux/users/actions';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { setCurrentUsersPage } from '../../redux/users/actions';
import { toggleFollowOnUserThunk } from '../../redux/users/thunks';
import People from './People';
import { RouteType, withRoute } from '../../components/hoc/withRoute';

const PeopleContainerApi: React.FC<PeopleContainerProps & RouteType> = ({
  fetchUsersThunk,
  clearUsersState,
  currentPage,
  route,
  isSubscribePending,
  isUsersFetching,
  maxPageItemsCount,
  setCurrentUsersPage,
  toggleFollowOnUserThunk,
  totalUsersCount,
  usersList
}) => {
  const {location: {pathname}, navigate} = route

  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    clearUsersState()
  }, [pathname, searchInput, clearUsersState]) //clearUsersState

  useEffect(() => {
    switch(pathname) {
      case '/people/developers':
        fetchUsersThunk(currentPage, searchInput)
        return
      case '/people/developersIFollow':
       fetchUsersThunk(currentPage, searchInput, true)
       return
    }
  }, [currentPage, searchInput, pathname, fetchUsersThunk]) //fetchUsersThunk

  return (
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
      setCurrentPage={setCurrentUsersPage}
    />
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    usersList: state.users.users,
    currentPage: state.users.currentUsersPage,
    maxPageItemsCount: state.users.maxPageItemsCount,
    totalUsersCount: state.users.totalUsersCount,
    isUsersFetching: state.users.request.fetchUsersPending,
    isSubscribePending: state.users.request.toggleIsSubscribePending
  }
} 

const mapDispatchToProps = {
  clearUsersState,
  fetchUsersThunk,
  setCurrentUsersPage,
  toggleFollowOnUserThunk
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type PeopleContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector, withRoute)(PeopleContainerApi)