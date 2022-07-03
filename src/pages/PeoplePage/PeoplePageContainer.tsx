import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import ErrorPopUp from '../../components/common/ErrorPopUp/ErrorPopUp';
import { RouteType, withRoute } from '../../components/hoc/withRoute';
import { RootState } from '../../redux/store';
import PeoplePage from './PeoplePage';

/* ------------- Component ------------- */
const PeoplePageContainerApi: React.FC<PeoplePageContainerProps & RouteType> = ({
  route,
  usersList,
  searchedUsersList,
  isUsersFetching,
  fetchUsersError,
  toggleFollowOnUserError
}) => {
  const [searchInput, setSearchInput] = useState('')

  const {location: {pathname: pathName}, navigate} = route
  const isPeople = pathName === '/people'
  const searchedUsersTotal = isPeople ? searchedUsersList.people.totalItemsCount : searchedUsersList.friends.totalItemsCount 
  const usersTotal = isPeople ? usersList.people.totalItemsCount : usersList.friends.totalItemsCount
  const totalUsersCount = searchInput ? searchedUsersTotal : usersTotal

  return (
    <>
      <ErrorPopUp titlesArray={[toggleFollowOnUserError, fetchUsersError]}/>
      <PeoplePage
        searchInput={searchInput}
        isUsersFetching={isUsersFetching}
        totalUsersCount={totalUsersCount}
        navigate={navigate}
        setSearchInput={setSearchInput}
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
    toggleFollowOnUserError: state.users.requests.toggleFollowOnUserError,
    fetchUsersError: state.users.requests.fetchUsersError, 
  }
} 

const mapDispatchToProps = {}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PeoplePageContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector, withRoute)(PeoplePageContainerApi)