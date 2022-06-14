import { useEffect } from "react";
import { compose } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store";
import { withAuthenticatedRedirect } from "../../components/hoc/withAuthRedirect";
import { RouteType, withRoute } from "../../components/hoc/withRoute";
import { fetchDialogsThunk, fetchMessagesThunk, sendMessageThunk } from '../../redux/messenger/thunks'
import { sendChatMessageThunk } from '../../redux/chat/thunks';
import Messenger from "./Messenger";
import ErrorPopUp from "../../components/common/ErrorPopUp/ErrorPopUp";

/* ------------- Component ------------- */
const MessengerContainerApi: React.FC<MessengerContainerProps> = ({
  route,
  dialogs,
  dialogMessages,
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
}) => {
  const userId = parseInt(route.params.userId)
  const isWsChatSelected = (route.location.pathname === '/messenger/chat') ? true : false
  const isDialogSelected = isWsChatSelected || userId ? true : false
  const messages = (isWsChatSelected ? chatMessages : dialogMessages[userId]) || [] 
  const sendMessage = isWsChatSelected ? sendChatMessageThunk : sendMessageThunk.bind(null, userId)
  const dialogsWithChat = [
    {
      id: 9999999,
      userName: 'WebSocket Chat',
      hasNewMessages: true,
      lastDialogActivityDate: '2022-05-20T23:06:26.437',
      lastUserActivityDate: '2022-05-20T23:06:26.437',
      newMessagesCount: 0,
      photos: { small: null, large: null },
    },
    ...dialogs
  ]

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
    <>
      <ErrorPopUp titlesArray={[fetchMessagesError, fetchDialogsError, sendMessageError]}/>
      <Messenger
        navigate={route.navigate}
        pathName={route.location.pathname}
        interlocutorId={userId || 9999999}
        isDialogSelected={isDialogSelected}
        authProfilePhoto={authProfilePhoto}
        authProfileId={authProfileId}
        dialogs={dialogsWithChat}
        messages={messages}
        sendMessage={sendMessage}
        fetchChatMessagesStatus={fetchChatMessagesStatus}
        fetchMessagesPending={fetchMessagesPending}
      />
    </>
  )
}

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    dialogs: state.messenger.dialogs,
    dialogMessages: state.messenger.messages,
    chatMessages: state.chat.messages,
    authProfilePhoto: state.auth.user?.data.photos?.small,
    fetchChatMessagesStatus: state.chat.requests.fetchChatMessagesStatus,
    fetchMessagesPending: state.messenger.requests.fetchMessagesPending,
    createDialogError: state.messenger.requests.createDialogError,
    fetchMessagesError: state.messenger.requests.fetchMessagesError,  
    fetchDialogsError: state.messenger.requests.fetchMessagesError, 
    sendMessageError: state.messenger.requests.sendMessageError, 
    authProfileId: state.auth.user?.data.id, 
  };
};

const mapDispatchToProps = {
  fetchDialogsThunk,
  fetchMessagesThunk,
  sendMessageThunk,
  sendChatMessageThunk,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type MessengerContainer = ConnectedProps<typeof connector>
interface MessengerContainerProps extends MessengerContainer, RouteType {}

export default compose<any>(
  connector,
  withRoute,
  withAuthenticatedRedirect,
)(MessengerContainerApi)