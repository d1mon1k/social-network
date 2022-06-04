import { useEffect } from "react";
import { compose } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store";
import { withAuthenticatedRedirect } from "../../components/hoc/withAuthRedirect";
import { RouteType, withRoute } from "../../components/hoc/withRoute";
import { fetchDialogsThunk, fetchMessagesThunk, sendMessageThunk } from '../../redux/messenger/thunks'
import { clearMessagesState } from '../../redux/messenger/actions'
import { startMessagesListeningThunk, stopMessagesListeningThunk, sendChatMessageThunk } from '../../redux/chat/thunks';
import Messenger from "./Messenger";

/* ------------- Component ------------- */
const MessengerContainerApi: React.FC<MessengerContainerProps> = ({
  route,
  dialogs,
  messages,
  chatMessages,
  authProfileId,
  authProfilePhoto,
  fetchMessagesPending,
  fetchMessagesError,
  fetchDialogsError,
  sendMessageError,
  fetchDialogsThunk,
  fetchMessagesThunk,
  sendMessageThunk,
  sendChatMessageThunk,
  startMessagesListening,
  stopMessagesListening,
  clearMessagesState,
}) => {
  const userId = parseInt(route.params.userId)
  const isDialogSelected = (route.location.pathname === '/messenger/chat') || userId ? true : false

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
      isDialogSelected={isDialogSelected}
      navigate={route.navigate}
      pathName={route.location.pathname}
      interlocutorId={userId}
      authProfilePhoto={authProfilePhoto}
      authProfileId={authProfileId}
      messages={messages}
      chatMessages={chatMessages}
      dialogs={dialogs}
      sendMessage={sendMessageThunk}
      fetchMessagesPending={fetchMessagesPending}
      clearMessagesState={clearMessagesState}
      sendChatMessageThunk={sendChatMessageThunk}
      startMessagesListening={startMessagesListening}
      stopMessagesListening={stopMessagesListening}
    />
  )
}

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    dialogs: state.messenger.dialogs,
    messages: state.messenger.messages,
    chatMessages: state.chat.messages,
    fetchMessagesPending: state.messenger.requests.fetchMessagesPending,
    fetchMessagesError: state.messenger.requests.fetchMessagesError,  //+++
    fetchDialogsError: state.messenger.requests.fetchMessagesError, //+++
    sendMessageError: state.messenger.requests.sendMessageError, //+++
    authProfileId: state.auth.user?.data.id,
    authProfilePhoto: state.auth.user?.data.photos?.small
  };
};

const mapDispatchToProps = {
  fetchDialogsThunk,
  fetchMessagesThunk,
  sendMessageThunk,
  sendChatMessageThunk,
  clearMessagesState,
  startMessagesListening: startMessagesListeningThunk,
  stopMessagesListening: stopMessagesListeningThunk
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type MessengerContainer = ConnectedProps<typeof connector>
interface MessengerContainerProps extends MessengerContainer, RouteType {}

export default compose<any>(
  connector,
  withRoute,
  withAuthenticatedRedirect,
)(MessengerContainerApi)