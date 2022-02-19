import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { compose } from 'redux'
import { RouteType, withRoute } from '../../helpers/withRoute'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { getProfile, setUserStatus } from '../../store/action-creators/profile-ac'
import { RootState } from '../../store/store'
import Preloader from '../Common/Preloader/Preloader'
import ProfileInfo from './ProfileInfo/ProfileInfo'

interface Props extends PropsFromRedux, RouteType {}

class ProfileContainerAPI extends React.Component<Props> {
  componentDidMount() {
    let userId = this.props.route.params.userId
    if(!userId) { userId = '22277' }
    this.props.getProfile(userId)
    this.props.setUserStatus(userId)
  }
  render() {
    if (this.props.isFetching) {
      return <Preloader />
    }
    if (this.props.error) {
      return <h2>{this.props.error}</h2>
    }
    return <ProfileInfo profile={this.props.profile} status={this.props.status} />
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isFetching: state.profilePage.isFetching,
    error: state.profilePage.error,
    profile: state.profilePage.profile,
    status: state.profilePage.status
  }
}

const actionCreators = {
  getProfile,
  setUserStatus
}

const connector = connect(mapStateToProps, actionCreators)
export type PropsFromRedux = ConnectedProps<typeof connector>

export default compose<React.ComponentType>(connector, withRoute, withAuthRedirect)(ProfileContainerAPI)


// const withAuthRedirectComponent = withAuthRedirect(ProfileContainerAPI)
// const WithUrlContainerComponent = withRoute(withAuthRedirectComponent)
// const ProfileContainer = connector(WithUrlContainerComponent)

//  ProfileContainer
