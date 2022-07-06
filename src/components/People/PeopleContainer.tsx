import { connect, ConnectedProps } from "react-redux"
import { compose } from "redux"
import { RootState } from "../../redux/store"
import People from "./People"
import { createDialogThunk } from "../../redux/messenger/thunks"
import { toggleFollowOnUserThunk, fetchPeopleThunk, fetchSearchedPeopleThunk } from '../../redux/users/thunks'
import { clearUsersState } from '../../redux/users/actions'
import { useOutletContext } from "react-router-dom"
import { PeoplePageContextProps } from "../../pages/PeoplePage/PeoplePage"
import { useEffect } from "react"

/* ------------- Component ------------- */
const PeopleContainer: React.FC<PeopleContainerProps> = ({
  usersList,
  searchedUsersList,
  isSubscribePending,
  isUsersFetching,
  toggleFollowOnUserThunk,
  createDialogThunk,
  fetchPeopleThunk,
  fetchSearchedPeopleThunk,
  clearUsersState
}) => {
  const maxPageItemsCount = 10
  const { searchInput } = useOutletContext<PeoplePageContextProps>() //PeoplePage
  const fetchUsers = searchInput.length ? fetchSearchedPeopleThunk : fetchPeopleThunk

  useEffect(() => {
    window.scrollBy({ behavior: 'smooth', top: -9999999 })
    clearUsersState()
    fetchUsers(maxPageItemsCount, searchInput, false)

    return () => {
      clearUsersState()
    }
  }, [searchInput, fetchPeopleThunk, clearUsersState, fetchUsers])

  return <People 
    searchInput={searchInput}
    usersData={searchInput.length ? searchedUsersList : usersList}
    createDialog={createDialogThunk}
    isSubscribePending={isSubscribePending}
    toggleFollowOnUser={toggleFollowOnUserThunk}
    isUsersFetching={isUsersFetching}
    maxPageItemsCount={maxPageItemsCount}
    fetchUsers={searchInput.length ? fetchSearchedPeopleThunk : fetchPeopleThunk}
  />
}

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    usersPage: state.users.users.people.currentPage,
    searchedUsersPage: state.users.searchedUsers.people.currentPage,
    usersList: state.users.users.people,
    searchedUsersList: state.users.searchedUsers.people,
    isSubscribePending: state.users.requests.toggleFollowOnUserPending,
    isUsersFetching: state.users.requests.fetchUsersPending
  }
}

const mapDispatchToProps = {
  toggleFollowOnUserThunk,
  createDialogThunk,
  fetchPeopleThunk,
  fetchSearchedPeopleThunk,
  clearUsersState
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PeopleContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector)(PeopleContainer)
