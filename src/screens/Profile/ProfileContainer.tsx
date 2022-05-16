import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { compose } from 'redux'
import { RouteType, withRoute } from '../../components/hoc/withRoute'
import { RootState } from '../../redux/store'
import Preloader from '../../components/common/Preloader/Preloader'
import { Navigate } from 'react-router-dom'
import {
  getUserProfileThunk,
  fetchUserStatusThunk,
  setUserStatusThunk,
  setProfilePhotoThunk,
  setUserProfileThunk
} from '../../redux/profile/thunks'
import Profile from './Profile'

interface ProfileContainerApiProps extends ProfileContainerProps, RouteType {}

const ProfileContainerApi: React.FC<ProfileContainerApiProps> = ({
  route,
  authProfileId,
  profile,
  status,
  isProfileFailure,
  isProfileFetching,
  isProfilePhotoFetching,
  isProfileStatusFetching,
  getUserProfileThunk,
  fetchUserStatusThunk,
  setUserProfileThunk,
  setProfilePhotoThunk,
  setUserStatusThunk,
}) => {
  
  let userId = Number.parseInt(route.params.userId) || authProfileId!

  useEffect(() => {
    if (!userId) return
    getUserProfileThunk(userId)
    fetchUserStatusThunk(userId)
  }, [userId, authProfileId, getUserProfileThunk, fetchUserStatusThunk])

  return isProfileFetching ? (
    <Preloader width="80px" height="80px" position="absolute" />
  ) : (
    <>
      {(isProfileFailure || !userId) && <Navigate to="/login" />}
      <Profile
        isProfileStatusFetching={isProfileStatusFetching}
        isProfilePhotoFetching={isProfilePhotoFetching}
        profile={profile}
        status={status}
        authProfileId={authProfileId}
        setUserProfileThunk={setUserProfileThunk}
        setStatus={setUserStatusThunk}
        setProfilePhoto={setProfilePhotoThunk}
      />
    </>
  )
}

const mapStateToProps = (state: RootState) => {
  return {
    isProfileStatusFetching: state.profile.requests.setProfileStatusPending,
    isProfilePhotoFetching: state.profile.requests.setProfilePhotoPending, 
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
  setProfilePhotoThunk,
  setUserProfileThunk,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type ProfileContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector, withRoute)(ProfileContainerApi)
