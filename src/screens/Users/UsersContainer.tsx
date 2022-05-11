import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import Users from './Users'
import { RootState } from '../../redux/store'
import { compose } from 'redux'
import {
  fetchUsersThunk,
  toggleFollowOnUserThunk,
} from '../../redux/users/thunks'
import {
  currentUsersPageSelector,
  fetchUsersPendingSelector,
  toggleIsSubscribePendingSelector,
  maxPageItemsCountSelector,
  totalUsersCountSelector,
  usersSelector,
} from '../../redux/users/selectors'
import { clearUsersState, setCurrentUsersPage } from '../../redux/users/actions'

const UsersContainer: React.FC<UsersContainerProps> = ({
  isUsersFetching,
  currentPage,
  totalUsersCount,
  usersList,
  maxPageItemsCount,
  fetchUsersThunk,
  clearUsersState,
  ...props
}) => {

  useEffect(() => {
    fetchUsersThunk(currentPage)
  }, [currentPage, fetchUsersThunk])

  useEffect(() => {
    return () => {
      clearUsersState()
    }
  }, [clearUsersState])

  return (
    <Users
      isUsersFetching={isUsersFetching}
      totalUsersCount={totalUsersCount}
      pageItemsCount={props.pageItemsCount}
      currentPage={currentPage}
      usersList={usersList}
      maxPageItemsCount={maxPageItemsCount}
      isSubscribePending={props.isSubscribePending}
      toggleFollowOnUser={props.toggleFollowOnUserThunk}
      setCurrentUsersPage={props.setCurrentUsersPage}
    />
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    usersList: usersSelector(state),
    totalUsersCount: totalUsersCountSelector(state),
    currentPage: currentUsersPageSelector(state),
    pageItemsCount: maxPageItemsCountSelector(state),
    isUsersFetching: fetchUsersPendingSelector(state),
    isSubscribePending: toggleIsSubscribePendingSelector(state),
    maxPageItemsCount: maxPageItemsCountSelector(state)
  }
}

const actionCreators = {
  fetchUsersThunk,
  toggleFollowOnUserThunk,
  clearUsersState,
  setCurrentUsersPage,
}

const connector = connect(mapStateToProps, actionCreators)
export type UsersContainerProps = ConnectedProps<typeof connector>

export default compose(connector)(UsersContainer)


