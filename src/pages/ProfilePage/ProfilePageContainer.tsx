import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { compose } from 'redux'
import ErrorPopUp from '../../components/common/ErrorPopUp/ErrorPopUp'
import Preloader from '../../components/common/Preloader/Preloader'
import { RouteType, withRoute } from '../../components/hoc/withRoute'
import {
  fetchUserStatusThunk, getUserProfileThunk, setUserProfileThunk, setUserStatusThunk
} from '../../redux/profile/thunks'
import { RootState } from '../../redux/store'
import { clearUsersState } from '../../redux/users/actions'
import { fetchFriendsThunk } from '../../redux/users/thunks'
import ProfilePage from './ProfilePage'

interface ProfilePageContainerApiProps extends ProfilePageContainerProps, RouteType {}

const ProfilePageContainerApi: React.FC<ProfilePageContainerApiProps> = ({
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
  setUserStatusThunk,
  isProfileFetching,
  isProfileStatusPending,
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
    fetchUsersThunk(10, '', true)
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
      <ProfilePage
        friends={friends.slice(0, 6)}
        totalFriendsCount={totalFriendsCount}
        profile={profile}
        status={status}
        authProfileId={authProfileId}
        isProfileStatusPending={isProfileStatusPending}
        setUserProfileThunk={setUserProfileThunk}
        setStatus={setUserStatusThunk}
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
    toggleFollowOnProfileError: state.profile.requests.toggleFollowOnProfileError,
    isProfileStatusPending: state.profile.requests.setProfileStatusPending,
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
  fetchUserStatusThunk,
  setUserStatusThunk,
  setUserProfileThunk,
  fetchUsersThunk: fetchFriendsThunk,
  clearUsersState: clearUsersState,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type ProfilePageContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector, withRoute)(ProfilePageContainerApi)
