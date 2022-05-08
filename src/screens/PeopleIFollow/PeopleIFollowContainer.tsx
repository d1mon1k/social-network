import React, { useEffect } from 'react'
import { RootState } from '../../redux/store'
import PeopleIFollow from './PeopleIFollow'
import { fetchUsersThunk } from '../../redux/users/thunks'
import { clearUsersState } from '../../redux/users/actions';
import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';

const PeopleIFollowContainerApi: React.FC<PeopleIFollowContainerProps> = ({fetchUsersThunk, clearUsersState, ...props}) => {
  useEffect(() => {
    fetchUsersThunk(1, '', true);
    return () => {
      clearUsersState()
    }
  }, [fetchUsersThunk, clearUsersState])
  
  return (
    <PeopleIFollow usersList={props.usersList}/>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    usersList: state.users.users
  }
} 

const mapDispatchToProps = {
  clearUsersState,
  fetchUsersThunk
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type PeopleIFollowContainerProps = ConnectedProps<typeof connector>

export default compose(connector)(PeopleIFollowContainerApi)