import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { createDialogThunk, sendMessageThunk } from '../../redux/messenger/thunks';
import { setProfilePhotoThunk, toggleFollowOnProfileThunk } from '../../redux/profile/thunks';
import { RootState } from '../../redux/store';
import PhotoBlock from './PhotoBlock';

/* ------------- Types ------------- */
interface PhotoBlockContainerApiProps extends PhotoBlockContainerProps {
  isEdit: boolean;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

/* ------------- Component ------------- */
const PhotoBlockContainerApi: React.FC<PhotoBlockContainerApiProps> = ({
  isEdit,
  setIsEdit,
  profile,
  authenticatedUserId,
  isProfileFetching,
  isProfilePhotoSending,
  toggleFollowPending,
  createDialogThunk,
  sendMessageThunk,
  setProfilePhotoThunk,
  toggleFollowOnProfileThunk,
}) => {
  return (
    <PhotoBlock
      isEdit={isEdit}
      setIsEdit={setIsEdit}
      profile={profile}
      authUserId={authenticatedUserId}
      isProfileFetching={isProfileFetching}
      isPhotoSending={isProfilePhotoSending}
      isSubscribePending={toggleFollowPending}
      createDialog={createDialogThunk}
      sendMessage={sendMessageThunk}
      setProfilePhoto={setProfilePhotoThunk}
      toggleSubscribe={toggleFollowOnProfileThunk}
    />
  );
};

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    profile: state.profile.profile,
    authenticatedUserId: state.auth.user?.id,
    isProfilePhotoSending: state.profile.requests.setProfilePhotoPending,
    isProfileFetching: state.profile.requests.fetchProfilePending,
    toggleFollowPending: state.profile.requests.toggleFollowOnProfilePending,
  };
};

const mapDispatchToProps = {
  createDialogThunk,
  sendMessageThunk,
  setProfilePhotoThunk,
  toggleFollowOnProfileThunk,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PhotoBlockContainerProps = ConnectedProps<typeof connector>;

export default compose<any>(connector)(PhotoBlockContainerApi);
