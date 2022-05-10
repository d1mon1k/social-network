import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { compose } from 'redux'
import { RootState } from '../../redux/store'
import { deleteAuthenticatedSessionThunk } from '../../redux/auth/thunks'
import Header from './Header'

const HeaderContainerApi: React.FC<HeaderContainerApiProps> = ({authUser, ...props}) => {
    return (
      <Header
        deleteAuthenticatedSession={props.deleteAuthenticatedSessionThunk}
        authUser={authUser}
      />
    )
}

const mapStateToProps = (state: RootState) => {
  return {
    authUser: state.auth.user,
  }
}

const mapDispatchToProps = {
  deleteAuthenticatedSessionThunk
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type HeaderContainerApiProps = ConnectedProps<typeof connector>

export default compose(connector)(HeaderContainerApi) 