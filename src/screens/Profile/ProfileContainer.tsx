import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { compose } from 'redux'
import { RouteType, withRoute } from '../../components/hoc/withRoute'
import { RootState } from '../../redux/store'
import Preloader from '../../components/Common/Preloader/Preloader'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import { Navigate } from 'react-router-dom'
import {
  getUserProfileThunk,
  fetchUserStatusThunk,
  setUserStatusThunk,
} from '../../redux/profile/thunks'

interface ProfileContainerApiProps extends ProfileContainerProps, RouteType {}

const ProfileContainerApi: React.FC<ProfileContainerApiProps> = ({ route, authProfileId, getUserProfileThunk, fetchUserStatusThunk, ...props }) => {
  let userId = Number.parseInt(route.params.userId) || authProfileId!

  useEffect(() => {
    if(!userId) return
    getUserProfileThunk(userId)
    fetchUserStatusThunk(userId)
  }, [ userId, authProfileId, getUserProfileThunk, fetchUserStatusThunk, ])

  return props.isProfileFetching ? (
    <Preloader width='80px' height='80px' position='absolute' />
  ) : (
    <>
      {(props.isProfileFailure || !userId) && <Navigate to="/login" />}
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        setStatus={props.setUserStatusThunk}
        authProfileId={authProfileId}
      />
    </>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    isProfileFetching: state.profile.requests.fetchProfilePending,
    isProfileFailure: state.profile.requests.fetchProfileError,
    profile: state.profile.profile,
    status: state.profile.status,
    authProfileId: state.auth.user ? state.auth.user.data.id : null,
  }
}

const mapDispatchToProps = {
  getUserProfileThunk,
  fetchUserStatusThunk,
  setUserStatusThunk,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type ProfileContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector, withRoute)(ProfileContainerApi)
