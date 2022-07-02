import { connect, ConnectedComponent, ConnectedProps } from "react-redux"
import { compose } from "redux"
import { RootState } from "../../redux/store"
import Friends from "./Friends"
import { createDialogThunk } from "../../redux/messenger/thunks"
import { toggleFollowOnUserThunk, fetchUsersThunk } from '../../redux/users/thunks'
import { useOutletContext } from "react-router-dom"
import { PeoplePageContextProps } from "../../pages/PeoplePage/PeoplePage"

/* ------------- Component ------------- */
const FriendsContainer: React.FC<FriendsContainerProps> = ({
  usersList,
  searchedUsersList,
  isSubscribePending,
  isUsersFetching,
  toggleFollowOnUserThunk,
  createDialogThunk,
  fetchUsersThunk,
}) => {
  const { searchInput } = useOutletContext<PeoplePageContextProps>() //PeoplePage
  const maxPageItemsCount = 10

  return <Friends 
    searchInput={searchInput}
    usersData={searchInput.length ? searchedUsersList : usersList}
    createDialog={createDialogThunk}
    isSubscribePending={isSubscribePending}
    toggleFollowOnUser={toggleFollowOnUserThunk}
    isUsersFetching={isUsersFetching}
    maxPageItemsCount={maxPageItemsCount}
    fetchUsers={fetchUsersThunk}
  />
}

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    usersList: state.users.users.friends,
    searchedUsersList: state.users.searchedUsers.friends,
    isSubscribePending: state.users.requests.toggleFollowOnUserPending,
    isUsersFetching: state.users.requests.fetchUsersPending
  }
}

const mapDispatchToProps = {
  toggleFollowOnUserThunk,
  createDialogThunk,
  fetchUsersThunk
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type FriendsContainerProps = ConnectedProps<typeof connector>

export default compose(connector)(FriendsContainer)
