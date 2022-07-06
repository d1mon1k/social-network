import { connect, ConnectedProps } from "react-redux"
import { compose } from "redux"
import { RootState } from "../../redux/store"
import Friends from "./Friends"
import { createDialogThunk } from "../../redux/messenger/thunks"
import { toggleFollowOnUserThunk, fetchFriendsThunk, fetchSearchedFriendsThunk } from '../../redux/users/thunks'
import { clearUsersState } from "../../redux/users/actions"
import { useOutletContext } from "react-router-dom"
import { PeoplePageContextProps } from "../../pages/PeoplePage/PeoplePage"
import { useEffect } from "react"

/* ------------- Component ------------- */
const FriendsContainer: React.FC<FriendsContainerProps> = ({
  usersList,
  searchedUsersList,
  isSubscribePending,
  isUsersFetching,
  toggleFollowOnUserThunk,
  createDialogThunk,
  fetchFriendsThunk,
  fetchSearchedFriendsThunk,
  clearSearchedUsersState
}) => {
  const maxPageItemsCount = 10
  const { searchInput } = useOutletContext<PeoplePageContextProps>() //PeoplePage
  const fetchUsers = searchInput.length ? fetchSearchedFriendsThunk : fetchFriendsThunk

  useEffect(() => {
    window.scrollBy({ behavior: 'smooth', top: -9999999 })
    clearSearchedUsersState()
    fetchUsers(maxPageItemsCount, searchInput, true)
  }, [searchInput, fetchFriendsThunk, clearSearchedUsersState, fetchUsers])

  return <Friends 
    searchInput={searchInput}
    usersData={searchInput.length ? searchedUsersList : usersList}
    createDialog={createDialogThunk}
    isSubscribePending={isSubscribePending}
    toggleFollowOnUser={toggleFollowOnUserThunk}
    isUsersFetching={isUsersFetching}
    maxPageItemsCount={maxPageItemsCount}
    fetchUsers={fetchUsers}
  />
}

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    usersPage: state.users.users.friends.currentPage,
    searchedUsersPage: state.users.searchedUsers.friends.currentPage,
    usersList: state.users.users.friends,
    searchedUsersList: state.users.searchedUsers.friends,
    isSubscribePending: state.users.requests.toggleFollowOnUserPending,
    isUsersFetching: state.users.requests.fetchUsersPending
  }
}

const mapDispatchToProps = {
  toggleFollowOnUserThunk,
  createDialogThunk,
  fetchFriendsThunk,
  fetchSearchedFriendsThunk,
  clearSearchedUsersState: clearUsersState
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type FriendsContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector)(FriendsContainer)
