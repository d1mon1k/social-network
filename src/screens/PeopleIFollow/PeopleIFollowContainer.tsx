import React, { useEffect } from 'react'
import { RootState } from '../../redux/store'
import { fetchUsersThunk } from '../../redux/users/thunks'
import { clearUsersState } from '../../redux/users/actions';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { setCurrentUsersPage } from '../../redux/users/actions';
import PeopleIFollow from './PeopleIFollow'

const PeopleIFollowContainerApi: React.FC<PeopleIFollowContainerProps> = ({
  fetchUsersThunk,
  clearUsersState,
  currentPage,
  ...props
}) => {

  useEffect(() => {
    fetchUsersThunk(currentPage, '', true)
  }, [fetchUsersThunk, currentPage])

  useEffect(() => {
    return () => {
      clearUsersState()
    }
  }, [clearUsersState])

  return (
    <PeopleIFollow
      maxPageItemsCount={props.maxPageItemsCount}
      isUsersFetching={props.isUsersFetching}
      totalUsersCount={props.totalUsersCount}
      usersList={props.usersList}
      currentPage={currentPage}
      setCurrentPage={props.setCurrentUsersPage}
    />
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    usersList: state.users.users,
    currentPage: state.users.currentUsersPage,
    maxPageItemsCount: state.users.maxPageItemsCount,
    totalUsersCount: state.users.totalUsersCount,
    isUsersFetching: state.users.request.fetchUsersPending
  }
} 

const mapDispatchToProps = {
  clearUsersState,
  fetchUsersThunk,
  setCurrentUsersPage
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type PeopleIFollowContainerProps = ConnectedProps<typeof connector>

export default compose(connector)(PeopleIFollowContainerApi)