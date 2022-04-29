import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { compose } from 'redux'
import { RouteType, withRoute } from '../../components/hoc/withRoute'
import {
  getProfile,
  getUserStatus,
  setUserStatus,
} from '../../redux/action-creators/profile-ac'
import { RootState } from '../../redux/store'
import Preloader from '../../components/Common/Preloader/Preloader'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import { Navigate } from 'react-router-dom'

interface Props extends PropsFromRedux, RouteType {}

class ProfileContainerAPI extends React.Component<Props> {
  componentDidMount() {
    let userId = Number.parseInt(this.props.route.params.userId) || this.props.authProfileId!
    this.props.getProfile(userId)
    this.props.getUserStatus(userId)
  }
  render() {
    if (this.props.isFetching) {
      return <Preloader />
    }
    if (this.props.error) {
      return <Navigate to='/login'/>
    }
    return (
      <ProfileInfo
        profile={this.props.profile}
        status={this.props.status}
        setStatus={this.props.setUserStatus}
        authProfileId={this.props.authProfileId}
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
    authProfileId: state.auth.data.id
  }
}

const actionCreators = {
  getProfile,
  getUserStatus,
  setUserStatus,
}

const connector = connect(mapStateToProps, actionCreators)
export type PropsFromRedux = ConnectedProps<typeof connector>

export default compose<any>(
  connector,
  withRoute,
)(ProfileContainerAPI)

// const withAuthRedirectComponent = withAuthRedirect(ProfileContainerAPI)
// const WithUrlContainerComponent = withRoute(withAuthRedirectComponent)
// const ProfileContainer = connector(WithUrlContainerComponent)

//  ProfileContainer
