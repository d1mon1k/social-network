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
  setUserProfileThunk,
} from '../../redux/profile/thunks'
import { sendMessageThunk, createDialogThunk } from '../../redux/messenger/thunks'
import Profile from './Profile'
import { ErrorPopUp } from '../../components/common/ErrorPopUp/ErrorPopUp'
import { fetchUsersThunk } from '../../redux/users/thunks'
import { clearUsersState } from '../../redux/users/actions'

interface ProfileContainerApiProps extends ProfileContainerProps, RouteType {}

const ProfileContainerApi: React.FC<ProfileContainerApiProps> = ({
  route,
  authProfileId,
  profile,
  status,
  friends,
  totalFriendsCount,
  fetchUsersThunk,
  clearUsersState,
  getUserProfileThunk,
  fetchUserStatusThunk,
  setUserProfileThunk,
  setProfilePhotoThunk,
  sendMessageThunk,
  createDialogThunk,
  setUserStatusThunk,
  isProfileFetching,
  isProfilePhotoPending,
  isProfileStatusPending,
  isSetProfilePending,
  fetchProfileError,
  setProfileError,
  setProfileStatusError,
  setProfilePhotoError,
}) => {
  let userId = Number.parseInt(route.params.userId) || authProfileId!
  const path = route.location.pathname

  useEffect(() => {
    if (!userId) return
    getUserProfileThunk(userId)
    fetchUserStatusThunk(userId)
    fetchUsersThunk(1, 6, '', true)
  }, [userId, authProfileId, getUserProfileThunk, fetchUserStatusThunk])

  useEffect(() => {
    return () => {
      clearUsersState()
    }
  }, [path])
  
  return isProfileFetching ? (
    <Preloader width="80px" height="80px" position="absolute" />
  ) : (
    <>
      {(fetchProfileError || !userId) && <Navigate to="/login" />}
      <ErrorPopUp titlesArray={[fetchProfileError, setProfileStatusError, setProfilePhotoError, setProfileError]} />
      <Profile
        friends={friends}
        totalFriendsCount={totalFriendsCount}
        profile={profile}
        status={status}
        authProfileId={authProfileId}
        isProfileStatusPending={isProfileStatusPending}
        isProfilePhotoPending={isProfilePhotoPending}
        createDialogThunk={createDialogThunk}
        sendMessageThunk={sendMessageThunk}
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
    isSetProfilePending: state.profile.requests.setProfilePending,
    isProfileFetching: state.profile.requests.fetchProfilePending,
    friends: state.users.users,
    totalFriendsCount: state.users.totalUsersCount,
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
  createDialogThunk,
  fetchUsersThunk,
  clearUsersState,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type ProfileContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector, withRoute)(ProfileContainerApi)
