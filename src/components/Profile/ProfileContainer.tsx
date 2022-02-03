import axios from 'axios'
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RouteType, withRoute } from '../../helpers/withRoute'
import {
  fetchProfile,
  fetchProfileSuccess,
  fetchProfileError,
} from '../../store/action-creators/profile-ac'
import { RootState } from '../../store/store'
import Preloader from '../common/Preloader'
import ProfileInfo from './ProfileInfo/ProfileInfo'

interface Props extends PropsFromRedux, RouteType {}

class ProfileContainerAPI extends React.Component<Props> {
  componentDidMount() {
    let userId = this.props.route.params.userId
    if(!userId) {
      userId = '2'
    }
    ;(async () => {
      try {
        this.props.fetchProfile()
        const response = await axios.get(
          `https://social-network.samuraijs.com/api/1.0/profile/${userId}`
        )
        this.props.fetchProfileSuccess(response.data)
      } catch (e) {
        this.props.fetchProfileError('Не удалось получить профиль пользователя')
      }
    })()
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
  fetchProfile,
  fetchProfileSuccess,
  fetchProfileError,
}

const WithUrlContainerComponent = withRoute(ProfileContainerAPI)

const connector = connect(mapStateToProps, actionCreators)
export type PropsFromRedux = ConnectedProps<typeof connector>
const ProfileContainer = connector(WithUrlContainerComponent)

export default ProfileContainer
