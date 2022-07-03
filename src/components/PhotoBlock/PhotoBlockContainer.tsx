import { connect, ConnectedProps } from "react-redux"
import { compose } from "redux"
import { createDialogThunk, sendMessageThunk } from '../../redux/messenger/thunks'
import {
  setProfilePhotoThunk,
  toggleFollowOnProfileThunk
} from '../../redux/profile/thunks'
import { RootState } from "../../redux/store"
import PhotoBlock from "./PhotoBlock"

/* ------------- Types ------------- */
interface PhotoBlockContainerApiProps extends PhotoBlockContainerProps {
  isEdit: boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
}

/* ------------- Component ------------- */
const PhotoBlockContainerApi: React.FC<PhotoBlockContainerApiProps> = ({
  isEdit,
  setIsEdit,
  authProfileId,
  profile,
  isProfilePhotoSending,
  toggleFollowPending,
  createDialogThunk,
  sendMessageThunk,
  setProfilePhotoThunk,
  toggleFollowOnProfileThunk,
}) => {
  return <PhotoBlock
    isEdit={isEdit}
    setIsEdit={setIsEdit}
    authProfileId={authProfileId}
    profile={profile}
    isPhotoSending={isProfilePhotoSending}
    isSubscribePending={toggleFollowPending}
    createDialog={createDialogThunk}
    sendMessage={sendMessageThunk}
    setProfilePhoto={setProfilePhotoThunk}
    toggleSubscribe={toggleFollowOnProfileThunk}
  />
}

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    authProfileId: state.auth.user?.id,
    profile: state.profile.profile,
    isProfilePhotoSending: state.profile.requests.setProfilePhotoPending,
    toggleFollowPending: state.profile.requests.toggleFollowOnProfilePending
  }
} 

const mapDispatchToProps = {
  createDialogThunk,
  sendMessageThunk,
  setProfilePhotoThunk,
  toggleFollowOnProfileThunk,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PhotoBlockContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector)(PhotoBlockContainerApi)