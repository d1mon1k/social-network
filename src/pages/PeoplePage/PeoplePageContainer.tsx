import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import ErrorPopUp from '../../components/common/ErrorPopUp/ErrorPopUp';
import { RouteType, withRoute } from '../../components/hoc/withRoute';
import { createDialogThunk } from '../../redux/messenger/thunks';
import { RootState } from '../../redux/store';
import { clearUsersState, setCurrentPage } from '../../redux/users/actions';
import { fetchUsersThunk, toggleFollowOnUserThunk } from '../../redux/users/thunks';
import PeoplePage from './PeoplePage';

/* ------------- Component ------------- */
const PeoplePageContainerApi: React.FC<PeoplePageContainerProps & RouteType> = ({
  route,
  usersList,
  searchedUsersList,
  isSubscribePending,
  isUsersFetching,
  fetchUsersError,
  toggleFollowOnUserError,
  clearUsersState,
  fetchUsersThunk,
  toggleFollowOnUserThunk,
  createDialogThunk
}) => {
  const {location: {pathname: pathName}, navigate} = route
  const [searchInput, setSearchInput] = useState('')
  const maxPageItemsCount = 10
  const currentPage = searchInput 
      ? (pathName == '/people' ? searchedUsersList.people.currentPage : searchedUsersList.friends.currentPage) 
      : (pathName == '/people' ? usersList.people.currentPage : usersList.friends.currentPage)
  const totalUsersCount = searchInput 
      ? (pathName == '/people' ? searchedUsersList.people.totalItemsCount : searchedUsersList.friends.totalItemsCount) 
      : (pathName == '/people' ? usersList.people.totalItemsCount : usersList.friends.totalItemsCount)
      const users = searchInput 
      ? (pathName == '/people' ? searchedUsersList.people.items : searchedUsersList.friends.items ) 
      : (pathName == '/people' ? usersList.people.items : usersList.friends.items)
      // const setCurrentPageAction = searchInput ? (pathName == '/people' ? 'searched/people' : 'searched/friends') 
      //   : (pathName == '/people' ? 'people' : 'friends')

  useEffect(() => {
    console.log('count')
    if (currentPage === 1) {
      fetchUsersThunk(maxPageItemsCount, searchInput, true)
      fetchUsersThunk(maxPageItemsCount, searchInput)
    }
  }, [])

  useEffect(() => {
    clearUsersState()
    window.scrollBy({ behavior: 'smooth', top: -9999999 })
  }, [pathName, clearUsersState])

  useEffect(() => {
    clearUsersState()
    window.scrollBy({ behavior: 'auto', top: -9999999 })
  }, [searchInput, clearUsersState])

  useEffect(() => {
    if(searchInput) {
      (pathName === '/people')
        ? (fetchUsersThunk(maxPageItemsCount, searchInput))
        : (fetchUsersThunk(maxPageItemsCount, searchInput, true))
    }
  }, [searchInput, pathName, fetchUsersThunk])

  return (
    <>
      <ErrorPopUp titlesArray={[toggleFollowOnUserError, fetchUsersError]}/>
      <PeoplePage
        fetchUsersThunk={fetchUsersThunk}
        pathName={pathName}
        searchInput={searchInput}
        currentPage={currentPage}
        maxPageItemsCount={maxPageItemsCount}
        isUsersFetching={isUsersFetching}
        totalUsersCount={totalUsersCount}
        usersList={users}
        isSubscribePending={isSubscribePending}
        navigate={navigate}
        setSearchInput={setSearchInput}
        toggleFollowOnUser={toggleFollowOnUserThunk}
        createDialogThunk={createDialogThunk}
      />
    </>
  )
}

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    usersList: state.users.users,
    searchedUsersList: state.users.searchedUsers,
    isUsersFetching: state.users.requests.fetchUsersPending,
    isSubscribePending: state.users.requests.toggleFollowOnUserPending,
    toggleFollowOnUserError: state.users.requests.toggleFollowOnUserError,
    fetchUsersError: state.users.requests.fetchUsersError, 
  }
} 

const mapDispatchToProps = {
  clearUsersState,
  fetchUsersThunk,
  toggleFollowOnUserThunk,
  createDialogThunk,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type PeoplePageContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector, withRoute)(PeoplePageContainerApi)