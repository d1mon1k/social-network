import { connect, ConnectedProps } from "react-redux"
import { compose } from "redux"
import {
  setUserProfileThunk, setUserStatusThunk
} from '../../redux/profile/thunks'
import { RootState } from "../../redux/store"
import InfoBlock from "./InfoBlock"

/* ------------- Types ------------- */
interface InfoBlockContainerApiProps extends InfoBlockContainerProps {
  isEdit: boolean
}

/* ------------- Component ------------- */
const PhotoBlockContainerApi: React.FC<InfoBlockContainerApiProps> = ({
  isEdit,
  authProfileId,
  profile,
  friendsAmount,
  status,
  isSetStatusPending,
  setUserStatusThunk,
  setUserProfileThunk
}) => {
  
  return <InfoBlock
    isEdit={isEdit}
    authProfileId={authProfileId}
    profile={profile}
    friendsAmount={friendsAmount}
    isSetStatusPending={isSetStatusPending}
    status={status}
    setStatus={setUserStatusThunk}
    setUserProfile={setUserProfileThunk}
  />
}

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    profile: state.profile.profile,
    status: state.profile.status,
    isSetStatusPending: state.profile.requests.setProfileStatusPending,
    authProfileId: state.auth.user?.id,
    friendsAmount: state.users.users.friends.totalItemsCount
  }
} 

const mapDispatchToProps = {
  setUserProfileThunk,
  setUserStatusThunk
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type InfoBlockContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector)(PhotoBlockContainerApi)