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
import { getUserProfileThunk, fetchUserStatusThunk, setUserStatusThunk } from '../../redux/profile/thunks'

interface Props extends PropsFromRedux, RouteType {}

class ProfileContainerAPI extends React.Component<Props> {
  componentDidMount() {
    let userId = Number.parseInt(this.props.route.params.userId) || this.props.authProfileId!
    this.props.getUserProfileThunk(userId)
    this.props.fetchUserStatusThunk(userId)
  }
  render() {
    if (this.props.isProfileFetching) {
      return <Preloader />
    }
    if (this.props.isProfileFailure && !this.props.isProfileFetching) {
      return <Navigate to='/login'/>
    }
    return (
      <>
        {this.props.isProfileFailure && <Navigate to='/login'/>}
        <ProfileInfo
          profile={this.props.profile1} //BUG d
          status={this.props.status}
          setStatus={this.props.setUserStatusThunk}
          authProfileId={this.props.authProfileId}
        />
      </>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isProfileFetching: state.profile.requests.fetchProfilePending, //BUG d
    isProfileFailure: state.profile.requests.fetchProfileError,  //BUG d
    profile1: state.profile.profile,
    status: state.profile.status,
    authProfileId: state.auth.user ? state.auth.user.data.id : null
  }
}

const actionCreators = {
  getUserProfileThunk,
  fetchUserStatusThunk,
  setUserStatusThunk
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