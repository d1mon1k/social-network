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
import { sendMessageThunk } from '../../redux/messenger/thunks'
import Profile from './Profile'
import { ErrorPopUp } from '../../components/common/ErrorPopUp/ErrorPopUp'

interface ProfileContainerApiProps extends ProfileContainerProps, RouteType {}

const ProfileContainerApi: React.FC<ProfileContainerApiProps> = ({
  route,
  authProfileId,
  profile,
  status,
  getUserProfileThunk,
  fetchUserStatusThunk,
  setUserProfileThunk,
  setProfilePhotoThunk,
  setUserStatusThunk,
  isProfileFetching,
  isProfilePhotoPending,
  isProfileStatusPending,
  isSetProfilePending,
  fetchProfileError,
  setProfileError,
  setProfileStatusError,
  setProfilePhotoError,
  sendMessageThunk,
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
      {(fetchProfileError || !userId) && <Navigate to="/login" />}
      <ErrorPopUp titlesArray={[fetchProfileError, setProfileStatusError, setProfilePhotoError, setProfileError]} />
      <Profile
        sendMessageThunk={sendMessageThunk}
        isProfileStatusPending={isProfileStatusPending}
        isProfilePhotoPending={isProfilePhotoPending}
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
    setProfileStatusError: state.profile.requests.setProfileStatusError,
    setProfilePhotoError: state.profile.requests.setProfilePhotoError,
    setProfileError: state.profile.requests.setProfileError,
    fetchProfileError: state.profile.requests.fetchProfileError,
    isProfileStatusPending: state.profile.requests.setProfileStatusPending,
    isProfilePhotoPending: state.profile.requests.setProfilePhotoPending, 
    isProfileFetching: state.profile.requests.fetchProfilePending,
    isSetProfilePending: state.profile.requests.setProfilePending,
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
  sendMessageThunk,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type ProfileContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector, withRoute)(ProfileContainerApi)
