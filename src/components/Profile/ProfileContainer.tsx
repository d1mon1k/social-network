import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { compose } from 'redux'
import { RouteType, withRoute } from '../../helpers/withRoute'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'
import { getProfile } from '../../store/action-creators/profile-ac'
import { RootState } from '../../store/store'
import Preloader from '../Common/Preloader/Preloader'
import ProfileInfo from './ProfileInfo/ProfileInfo'

interface Props extends PropsFromRedux, RouteType {}

class ProfileContainerAPI extends React.Component<Props> {
  componentDidMount() {
    let userId = this.props.route.params.userId
    if(!userId) { userId = '2' }
    this.props.getProfile(userId)
  }
  render() {
    if (this.props.isFetching) {
      return <Preloader />
    }
    if (this.props.error) {
      return <h2>{this.props.error}</h2>
    }
    return <ProfileInfo profile={this.props.profile} />
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    isFetching: state.profilePage.isFetching,
    error: state.profilePage.error,
    profile: state.profilePage.profile,
  }
}

const actionCreators = {
  getProfile
}


const connector = connect(mapStateToProps, actionCreators)
export type PropsFromRedux = ConnectedProps<typeof connector>


// const withAuthRedirectComponent = withAuthRedirect(ProfileContainerAPI)
// const WithUrlContainerComponent = withRoute(withAuthRedirectComponent)
// const ProfileContainer = connector(WithUrlContainerComponent)

export default compose<React.ComponentType>(connector, withRoute, withAuthRedirect)(ProfileContainerAPI)
//  ProfileContainer
