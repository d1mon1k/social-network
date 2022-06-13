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
  fetchChatMessagesStatus,
  fetchMessagesPending,
  fetchMessagesError, //bug handle error
  fetchDialogsError, //bug handle error
  sendMessageError, //bug handle error
  fetchDialogsThunk,
  fetchMessagesThunk,
  sendMessageThunk,
  sendChatMessageThunk,
  startMessagesListeningThunk, //bug extra
  stopMessagesListeningThunk, //bug extra
  clearMessagesState, //bug extra
}) => {
  const userId = parseInt(route.params.userId)
  const isDialogSelected = (route.location.pathname === '/messenger/chat') || userId ? true : false

  useEffect(() => {
    fetchDialogsThunk()
  }, [fetchDialogsThunk])

  useEffect(() => {
    if(messages[userId]) {
      return
    }
    if(userId) {
      fetchMessagesThunk(userId)
    }
  }, [userId])

  return (
    <Messenger
      navigate={route.navigate}
      pathName={route.location.pathname}
      interlocutorId={userId}
      isDialogSelected={isDialogSelected}
      authProfilePhoto={authProfilePhoto}
      authProfileId={authProfileId} //bug extra
      dialogs={dialogs}
      messages={messages[userId] || []}
      chatMessages={chatMessages}
      sendMessage={sendMessageThunk}
      sendChatMessage={sendChatMessageThunk}
      startMessagesListening={startMessagesListeningThunk}
      stopMessagesListening={stopMessagesListeningThunk}
      fetchChatMessagesStatus={fetchChatMessagesStatus}
      fetchMessagesPending={fetchMessagesPending}

      clearMessagesState={clearMessagesState} //bug extra
    />
  )
}

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    dialogs: state.messenger.dialogs,
    messages: state.messenger.messages,
    chatMessages: state.chat.messages,
    authProfilePhoto: state.auth.user?.data.photos?.small,
    fetchChatMessagesStatus: state.chat.requests.fetchChatMessagesStatus,
    fetchMessagesPending: state.messenger.requests.fetchMessagesPending,
    fetchMessagesError: state.messenger.requests.fetchMessagesError,  
    fetchDialogsError: state.messenger.requests.fetchMessagesError, 
    sendMessageError: state.messenger.requests.sendMessageError, 

    authProfileId: state.auth.user?.data.id, //bug extra
  };
};

const mapDispatchToProps = {
  fetchDialogsThunk,
  fetchMessagesThunk,
  sendMessageThunk,
  sendChatMessageThunk,
  startMessagesListeningThunk,
  stopMessagesListeningThunk,

  clearMessagesState, //bug extra
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type MessengerContainer = ConnectedProps<typeof connector>
interface MessengerContainerProps extends MessengerContainer, RouteType {}

export default compose<any>(
  connector,
  withRoute,
  withAuthenticatedRedirect,
)(MessengerContainerApi)