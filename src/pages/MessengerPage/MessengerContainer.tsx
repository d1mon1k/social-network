import { useEffect } from "react";
import { compose } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store";
import { withAuthenticatedRedirect } from "../../components/hoc/withAuthRedirect";
import { RouteType, withRoute } from "../../components/hoc/withRoute";
import { fetchDialogsThunk, fetchMessagesThunk, sendMessageThunk } from '../../redux/messenger/thunks'
import Messenger from "./Messenger";

/* ------------- Component ------------- */
const MessengerContainerApi: React.FC<MessengerContainerProps> = ({
  route,
  dialogs,
  messages,
  authProfileId,
  authProfilePhoto,
  fetchDialogsThunk,
  fetchMessagesThunk,
  sendMessageThunk,
}) => {
  const userId = parseInt(route.params.userId)

  useEffect(() => {
    fetchDialogsThunk()
  }, [fetchDialogsThunk])

  useEffect(() => {
    if(userId) {
      fetchMessagesThunk(userId)
    }
  }, [userId])

  return (
    <Messenger
    interlocutorId={userId}
    authProfilePhoto={authProfilePhoto}
    authProfileId={authProfileId}
    messages={messages}
    dialogs={dialogs}
    sendMessage={sendMessageThunk}
    />
  )
}

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    dialogs: state.messenger.dialogs,
    messages: state.messenger.messages,
    authProfileId: state.auth.user?.data.id,
    authProfilePhoto: state.auth.user?.data.photos?.small
  };
};

const mapDispatchToProps = {
  fetchDialogsThunk,
  fetchMessagesThunk,
  sendMessageThunk,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type MessengerContainer = ConnectedProps<typeof connector>
interface MessengerContainerProps extends MessengerContainer, RouteType {}

export default compose<any>(
  connector,
  withRoute,
  withAuthenticatedRedirect,
)(MessengerContainerApi)