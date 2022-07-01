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
  // maxPageItemsCount,
  isSubscribePending,
  isUsersFetching,
  fetchUsersError,
  toggleFollowOnUserError,
  clearUsersState,
  setCurrentPeoplePage,
  fetchUsersThunk,
  toggleFollowOnUserThunk,
  createDialogThunk
}) => {
  // const memorizedPath = useRef(pathName)
  const {location: {pathname: pathName}, navigate} = route
  const [searchInput, setSearchInput] = useState('')
  const maxPageItemsCount = 10
  const currentPage = searchInput 
      ? (pathName == '/people' ? searchedUsersList.people.currentPage : searchedUsersList.friends.currentPage) 
      : (pathName == '/people' ? usersList.people.currentPage : usersList.friends.currentPage)
  const totalUsersCount = searchInput 
      ? (pathName == '/people' ? searchedUsersList.people.totalItemsCount : searchedUsersList.friends.totalItemsCount) 
      : (pathName == '/people' ? usersList.people.totalItemsCount : usersList.friends.totalItemsCount)
  const setCurrentPageAction = searchInput 
    ? (pathName == '/people' ? 'searched/people' : 'searched/friends') 
    : (pathName == '/people' ? 'people' : 'friends')
  const users = searchInput 
    ? (pathName == '/people' ? searchedUsersList.people.items : searchedUsersList.friends.items ) 
    : (pathName == '/people' ? usersList.people.items : usersList.friends.items)

  // useEffect(() => {
  //   return () => {
  //     clearUsersState()
  //   }
  // }, [clearUsersState])

  useEffect(() => {
    clearUsersState()
  // window.scrollTo(0, 0)
  }, [searchInput])

  // useEffect(() => {
  //   clearUsersState()
  // }, [pathName])

  useEffect(() => {
    fetchUsersThunk(currentPage, maxPageItemsCount, searchInput, true)
    fetchUsersThunk(currentPage, maxPageItemsCount, searchInput)
  }, [])

  useEffect(() => {
    // if(memorizedPath.current !== pathName && currentPage > 1) {
    //   console.log(currentPage)
    //   memorizedPath.current = pathName
    //   return 
    // }

    if(isUsersFetching) return
    if(currentPage === 1 && !searchInput) return
    // memorizedPath.current = pathName

    switch (pathName) {
      case '/people':
        fetchUsersThunk(currentPage, maxPageItemsCount, searchInput)
        return
      case '/people/friends':
        fetchUsersThunk(currentPage, maxPageItemsCount, searchInput, true)
        return
    }
  }, [currentPage, searchInput, fetchUsersThunk])

  return (
    <>
      <ErrorPopUp titlesArray={[toggleFollowOnUserError, fetchUsersError]}/>
      <PeoplePage
        action={setCurrentPageAction}
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
        setCurrentPage={setCurrentPage}
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
  setCurrentPeoplePage: setCurrentPage,
  fetchUsersThunk,
  toggleFollowOnUserThunk,
  createDialogThunk,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type PeoplePageContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector, withRoute)(PeoplePageContainerApi)