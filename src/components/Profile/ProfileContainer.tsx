import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { compose } from 'redux'
import { RouteType, withRoute } from '../../HOCs/withRoute'
import { withAuthRedirect } from '../../HOCs/withAuthRedirect'
import {
  getProfile,
  getUserStatus,
  setUserStatus,
} from '../../store/action-creators/profile-ac'
import { RootState } from '../../store/store'
import Preloader from '../Common/Preloader/Preloader'
import ProfileInfo from './ProfileInfo/ProfileInfo'

interface Props extends PropsFromRedux, RouteType {}

class ProfileContainerAPI extends React.Component<Props> {
  componentDidMount() {
    let userId = Number.parseInt(this.props.route.params.userId) || this.props.profileId!
    this.props.getProfile(userId)
    this.props.getUserStatus(userId)
  }
  render() {
    if (this.props.isFetching) {
      return <Preloader />
    }
    if (this.props.error) {
      return <h2>{this.props.error}</h2>
    }
    return (
      <ProfileInfo
        profile={this.props.profile}
        status={this.props.status}
        setStatus={this.props.setUserStatus}
      />
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isFetching: state.profilePage.isFetching,
    error: state.profilePage.error,
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    profileId: state.auth.data.id
  }
}

const actionCreators = {
  getProfile,
  getUserStatus,
  setUserStatus,
}

const connector = connect(mapStateToProps, actionCreators)
export type PropsFromRedux = ConnectedProps<typeof connector>

export default compose<React.ComponentType>(
  connector,
  withRoute,
  withAuthRedirect
)(ProfileContainerAPI)

// const withAuthRedirectComponent = withAuthRedirect(ProfileContainerAPI)
// const WithUrlContainerComponent = withRoute(withAuthRedirectComponent)
// const ProfileContainer = connector(WithUrlContainerComponent)

//  ProfileContainer
