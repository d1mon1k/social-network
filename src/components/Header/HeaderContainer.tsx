import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { compose } from 'redux'
import { RootState } from '../../redux/store'
import { deleteAuthenticatedSessionThunk } from '../../redux/auth/thunks'
import Header from './Header'

const HeaderContainerApi: React.FC<HeaderContainerApiProps> = ({authUser ,profile, ...props}) => {
    return (
      <Header
        deleteAuthenticatedSession={props.deleteAuthenticatedSessionThunk}
        profile={profile}
        authUser={authUser}
      />
    )
}

const mapStateToProps = (state: RootState) => {
  return {
    authUser: state.auth.user,
    profile: state.profile.profile,
  }
}

const mapDispatchToProps = {
  deleteAuthenticatedSessionThunk
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type HeaderContainerApiProps = ConnectedProps<typeof connector>

export default compose(connector)(HeaderContainerApi) 