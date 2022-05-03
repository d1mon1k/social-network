import React from 'react'
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

class UsersContainerAPI extends React.Component<UsersContainerProps> {
  componentDidMount() {
    this.props.usersList.length === 0 && this.props.fetchUsersThunk()
  }

  render() {
    return (
      <Users
        isUsersFetching={this.props.isUsersFetching}
        totalUsersCount={this.props.totalUsersCount}
        pageItemsCount={this.props.pageItemsCount}
        currentPage={this.props.currentPage}
        usersList={this.props.usersList}
        isSubscribePending={this.props.isSubscribePending}
        setCurrentPage={this.props.fetchUsersThunk}
        toggleFollowOnUser={this.props.toggleFollowOnUserThunk}
      />
    )
  }
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
}

const connector = connect(mapStateToProps, actionCreators)
export type UsersContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector)(UsersContainerAPI)
