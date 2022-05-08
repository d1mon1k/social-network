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
import { clearUsersState } from '../../redux/users/actions'

const UsersContainerAPI: React.FC<UsersContainerProps> = ({usersList, fetchUsersThunk, clearUsersState, ...props}) => {
  useEffect(() => {
    fetchUsersThunk()
    return () => { clearUsersState() }
  }, [fetchUsersThunk, clearUsersState])

  return (
    <Users
      isUsersFetching={props.isUsersFetching}
      totalUsersCount={props.totalUsersCount}
      pageItemsCount={props.pageItemsCount}
      currentPage={props.currentPage}
      usersList={usersList}
      isSubscribePending={props.isSubscribePending}
      setCurrentPage={fetchUsersThunk}
      toggleFollowOnUser={props.toggleFollowOnUserThunk}
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
  }
}

const actionCreators = {
  fetchUsersThunk,
  toggleFollowOnUserThunk,
  clearUsersState
}

const connector = connect(mapStateToProps, actionCreators)
export type UsersContainerProps = ConnectedProps<typeof connector>

export default compose(connector)(UsersContainerAPI)
