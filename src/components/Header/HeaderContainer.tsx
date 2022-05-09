import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { compose } from 'redux'
import { RootState } from '../../redux/store'
import { deleteAuthenticatedSessionThunk } from '../../redux/auth/thunks'
import Header from './Header'

const HeaderContainerApi: React.FC<HeaderContainerApiProps> = ({profile, ...props}) => {
    return (
      <Header
        deleteAuthenticatedSession={props.deleteAuthenticatedSessionThunk}
        profile={profile}
      />
    )
}

const mapStateToProps = (state: RootState) => {
  return {
    profile: state.profile.profile,
  }
}

const mapDispatchToProps = {
  deleteAuthenticatedSessionThunk
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type HeaderContainerApiProps = ConnectedProps<typeof connector>

export default compose(connector)(HeaderContainerApi) 