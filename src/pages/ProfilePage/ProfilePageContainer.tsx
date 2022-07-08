import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { compose } from 'redux';
import ErrorPopUp from '../../components/common/ErrorPopUp/ErrorPopUp';
import Preloader from '../../components/common/Preloader/Preloader';
import withAuthenticatedRedirect from '../../components/hoc/withAuthRedirect';
import { RouteType, withRoute } from '../../components/hoc/withRoute';
import { fetchPostsThunk } from '../../redux/posts/thunks';
import { fetchUserStatusThunk, getUserProfileThunk } from '../../redux/profile/thunks';
import { RootState } from '../../redux/store';
import { fetchFriendsThunk } from '../../redux/users/thunks';
import ProfilePage from './ProfilePage';

/* ------------- Types ------------- */
interface ProfilePageContainerApiProps extends ProfilePageContainerProps, RouteType {}

/* ------------- Component ------------- */
const ProfilePageContainerApi: React.FC<ProfilePageContainerApiProps> = ({
  route,
  authProfileId,
  friends,
  totalFriendsCount,
  fetchFriendsThunk: fetchUsersThunk,
  getUserProfileThunk,
  fetchUserStatusThunk,
  fetchPostsThunk,
  isProfileFetching,
  isPostsFetching,
  toggleFollowOnProfileError,
  fetchProfileError,
  setProfileError,
  setProfileStatusError,
  setProfilePhotoError,
  createDialogError,
}) => {
  let userId = Number.parseInt(route.params.userId) || authProfileId!;

  useEffect(() => {
    if (!userId) return;
    getUserProfileThunk(userId);
    fetchUserStatusThunk(userId);
    fetchUsersThunk(100, '', true);
  }, [userId, authProfileId, getUserProfileThunk, fetchUserStatusThunk, fetchUsersThunk]);

  useEffect(() => {
    fetchPostsThunk();
  }, [friends, fetchPostsThunk]);

  if (isProfileFetching || isPostsFetching) {
    return <Preloader width='80px' height='80px' position='absolute' />;
  }

  return (
    <>
      {fetchProfileError && <Navigate to='/login' />}
      <ErrorPopUp
        titlesArray={[fetchProfileError, setProfileStatusError, setProfilePhotoError, setProfileError, createDialogError, toggleFollowOnProfileError]}
      />
      <ProfilePage friends={friends} totalFriendsCount={totalFriendsCount} />
    </>
  );
};

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    setProfileStatusError: state.profile.requests.setProfileStatusError,
    setProfilePhotoError: state.profile.requests.setProfilePhotoError,
    setProfileError: state.profile.requests.setProfileError,
    fetchProfileError: state.profile.requests.fetchProfileError,
    createDialogError: state.messenger.requests.createDialogError,
    toggleFollowOnProfileError: state.profile.requests.toggleFollowOnProfileError,
    isProfileFetching: state.profile.requests.fetchProfilePending,
    isPostsFetching: state.posts.requests.fetchPostsPending,
    dialogs: state.messenger.dialogs,
    friends: state.users.users.friends.items,
    totalFriendsCount: state.users.users.friends.totalItemsCount,
    authProfileId: state.auth.user?.id,
  };
};

const mapDispatchToProps = {
  getUserProfileThunk,
  fetchUserStatusThunk,
  fetchFriendsThunk,
  fetchPostsThunk,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ProfilePageContainerProps = ConnectedProps<typeof connector>;

export default compose<any>(connector, withRoute, withAuthenticatedRedirect)(ProfilePageContainerApi);
