import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import Users from './Users'
import Preloader from '../../components/Common/Preloader/Preloader'
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

class UsersContainerAPI extends React.Component<PropsFromRedux> {
  componentDidMount() {
    this.props.fetchUsersThunk()
  }

  setCurrentPage = (currentPage: number) => {
    this.props.fetchUsersThunk(currentPage)
  }

  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            totalCount={this.props.totalCount}
            pageItemsCount={this.props.pageItemsCount}
            currentPage={this.props.currentPage}
            setCurrentPage={this.setCurrentPage}
            users={this.props.users}
            isFollowing={this.props.isFollowing}
            userFollow={this.props.toggleFollowOnUserThunk}
            userUnFollow={this.props.toggleFollowOnUserThunk}
          />
        )}
      </>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    users: usersSelector(state),
    totalCount: totalUsersCountSelector(state),
    currentPage: currentUsersPageSelector(state),
    pageItemsCount: maxPageItemsCountSelector(state),
    isFetching: fetchUsersPendingSelector(state),
    isFollowing: toggleIsSubscribePendingSelector(state),
  }
}

const actionCreators = {
  fetchUsersThunk,
  toggleFollowOnUserThunk,
}

const connector = connect(mapStateToProps, actionCreators)
export type PropsFromRedux = ConnectedProps<typeof connector>

export default compose<any>(connector)(UsersContainerAPI)
