import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { compose } from 'redux'
import ErrorPopUp from '../../components/common/ErrorPopUp/ErrorPopUp'
import Preloader from '../../components/common/Preloader/Preloader'
import { RouteType, withRoute } from '../../components/hoc/withRoute'
import { createDialogThunk, sendMessageThunk } from '../../redux/messenger/thunks'
import {
  fetchUserStatusThunk, getUserProfileThunk, setProfilePhotoThunk,
  setUserProfileThunk, setUserStatusThunk, toggleFollowOnProfileThunk
} from '../../redux/profile/thunks'
import { RootState } from '../../redux/store'
import { clearSearchedUsersState } from '../../redux/users/actions'
import { fetchFriendsThunk } from '../../redux/users/thunks'
import Profile from './Profile'

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
  toggleFollowOnProfileThunk,
  isProfileFetching,
  isProfilePhotoPending,
  isProfileStatusPending,
  isSetProfilePending,
  toggleFollowOnProfilePending,
  toggleFollowOnProfileError,
  fetchProfileError,
  setProfileError,
  setProfileStatusError,
  setProfilePhotoError,
  createDialogError,
}) => {
  let userId = Number.parseInt(route.params.userId) || authProfileId!
  const path = route.location.pathname

  useEffect(() => {
    if (!userId) return
    getUserProfileThunk(userId)
    fetchUserStatusThunk(userId)
    fetchUsersThunk(6, '', true)
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
      <ErrorPopUp
        titlesArray={[
          fetchProfileError,
          setProfileStatusError,
          setProfilePhotoError,
          setProfileError,
          createDialogError,
          toggleFollowOnProfileError,
        ]}
      />
      <Profile
        friends={friends}
        totalFriendsCount={totalFriendsCount}
        profile={profile}
        status={status}
        authProfileId={authProfileId}
        isProfileStatusPending={isProfileStatusPending}
        isProfilePhotoPending={isProfilePhotoPending}
        toggleFollowOnProfilePending={toggleFollowOnProfilePending}
        toggleFollowOnProfileThunk={toggleFollowOnProfileThunk}
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
    createDialogError: state.messenger.requests.createDialogError,
    toggleFollowOnProfilePending: state.profile.requests.toggleFollowOnProfilePending,
    toggleFollowOnProfileError: state.profile.requests.toggleFollowOnProfileError,
    isProfileStatusPending: state.profile.requests.setProfileStatusPending,
    isProfilePhotoPending: state.profile.requests.setProfilePhotoPending, 
    isSetProfilePending: state.profile.requests.setProfilePending,
    isProfileFetching: state.profile.requests.fetchProfilePending,
    dialogs: state.messenger.dialogs,
    friends: state.users.users.friends.items,
    totalFriendsCount: state.users.users.friends.totalItemsCount,
    profile: state.profile.profile,
    status: state.profile.status,
    authProfileId: state.auth.user ? state.auth.user.id : null,
  }
}

const mapDispatchToProps = {
  getUserProfileThunk,
  toggleFollowOnProfileThunk,
  fetchUserStatusThunk,
  setUserStatusThunk,
  setProfilePhotoThunk,
  setUserProfileThunk,
  sendMessageThunk,
  createDialogThunk,
  fetchUsersThunk: fetchFriendsThunk,
  clearUsersState: clearSearchedUsersState,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type ProfileContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector, withRoute)(ProfileContainerApi)
