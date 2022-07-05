import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { compose } from "redux";
import ErrorPopUp from "../../components/common/ErrorPopUp/ErrorPopUp";
import withAuthenticatedRedirect from "../../components/hoc/withAuthRedirect";
import { RouteType, withRoute } from "../../components/hoc/withRoute";
import { sendChatMessageThunk } from '../../redux/chat/thunks';
import { fetchDialogsThunk, fetchMessagesThunk, sendMessageThunk } from '../../redux/messenger/thunks';
import { RootState } from "../../redux/store";
import MessengerPage from "./MessengerPage";

/* ------------- Component ------------- */
const MessengerPageContainerApi: React.FC<MessengerPageContainerProps> = ({
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
      <MessengerPage
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
    authProfilePhoto: state.auth.user?.photos?.small,
    fetchChatMessagesStatus: state.chat.requests.fetchChatMessagesStatus,
    fetchMessagesPending: state.messenger.requests.fetchMessagesPending,
    createDialogError: state.messenger.requests.createDialogError,
    fetchMessagesError: state.messenger.requests.fetchMessagesError,  
    fetchDialogsError: state.messenger.requests.fetchMessagesError, 
    sendMessageError: state.messenger.requests.sendMessageError, 
    authProfileId: state.auth.user?.id, 
  };
};

const mapDispatchToProps = {
  fetchDialogsThunk,
  fetchMessagesThunk,
  sendMessageThunk,
  sendChatMessageThunk,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type MessengerContainer = ConnectedProps<typeof connector>
interface MessengerPageContainerProps extends MessengerContainer, RouteType {}

export default compose<any>(
  connector,
  withRoute,
  withAuthenticatedRedirect,
)(MessengerPageContainerApi)