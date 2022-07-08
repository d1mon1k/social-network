import { connect, ConnectedProps } from "react-redux"
import { compose } from "redux"
import { RootState } from "../../redux/store"
import ChatWindow from "./ChatWindow"
import {
  fetchDialogsThunk,
  fetchMessagesThunk,
  sendMessageThunk,
} from '../../redux/messenger/thunks'
import { sendChatMessageThunk, startMessagesListeningThunk, stopMessagesListeningThunk } from "../../redux/chat/thunks"
import { useEffect, useState } from "react"
import { DialogType } from "../../redux/messenger/types"
import ErrorPopUp from '../../components/common/ErrorPopUp/ErrorPopUp'

/* ------------- Component ------------- */
const ChatWindowApi: React.FC<ChatWindowContainerProps> = ({
  authProfileId,
  authProfilePhoto,
  dialogs,
  messages,
  chatMessages,
  fetchChatMessagesStatus,
  fetchMessagesPending,
  fetchMessagesError,
  fetchDialogsError,
  sendMessageError,
  createDialogError,
  fetchDialogsThunk,
  fetchMessagesThunk,
  startMessagesListeningThunk,
  stopMessagesListeningThunk,
  sendChatMessageThunk,
  sendMessageThunk,
}) => {
  const [openedDialogs, setOpenedDialogs] = useState<DialogType[]>([])
  const messagesWithChatMessages = {...messages, 9999999: chatMessages}
  const dialogsWithChat = [
    {
      id: 9999999,
      userName: 'WebSocket Chat',
      hasNewMessages: true,
      lastDialogActivityDate: '2022-05-20T23:06:26.437',
      lastUserActivityDate: '2022-05-20T23:06:26.437',
      newMessagesCount: 200,
      photos: { small: null, large: null },
    },
    ...dialogs
  ]

  useEffect(() => {
    startMessagesListeningThunk()
    fetchDialogsThunk()
    return () => {
      stopMessagesListeningThunk()
    }
  }, [fetchDialogsThunk, startMessagesListeningThunk, stopMessagesListeningThunk])
  
  useEffect(() => {
    const lastDialogIndex = openedDialogs.length - 1
    if(lastDialogIndex < 0) return
    if(messages[openedDialogs[lastDialogIndex].id]) return
    if(openedDialogs[lastDialogIndex].id === 9999999) return
    fetchMessagesThunk(openedDialogs[lastDialogIndex].id)
  }, [openedDialogs, fetchMessagesThunk, messages])

  return (
    <>
      <ErrorPopUp titlesArray={[fetchDialogsError, fetchMessagesError, sendMessageError, createDialogError]}/>
      <ChatWindow
        authProfileId={authProfileId!}
        authProfilePhoto={authProfilePhoto!}
        dialogs={dialogsWithChat}
        messages={messagesWithChatMessages}
        openedDialogs={openedDialogs}
        setOpenedDialogs={setOpenedDialogs}
        fetchChatMessagesStatus={fetchChatMessagesStatus}
        fetchMessagesPending={fetchMessagesPending}
        sendMessage={sendMessageThunk}
        sendChatMessage={sendChatMessageThunk}
      />
    </>
  )
}

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    dialogs: state.messenger.dialogs,
    messages: state.messenger.messages,
    chatMessages: state.chat.messages,
    authProfileId: state.auth.user?.id,
    authProfilePhoto: state.auth.user?.photos?.small,
    fetchChatMessagesStatus: state.chat.requests.fetchChatMessagesStatus,
    fetchMessagesPending: state.messenger.requests.fetchMessagesPending,
    createDialogError: state.messenger.requests.createDialogError, //bug should handle errors 
    fetchMessagesError: state.messenger.requests.fetchMessagesError, //bug should handle errors 
    fetchDialogsError: state.messenger.requests.fetchMessagesError, //bug should handle errors
    sendMessageError: state.messenger.requests.sendMessageError, //bug should handle errors
  };
};

const mapDispatchToProps = {
  fetchDialogsThunk,
  fetchMessagesThunk,
  sendMessageThunk,
  sendChatMessageThunk,
  startMessagesListeningThunk,
  stopMessagesListeningThunk
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type ChatWindowContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector)(ChatWindowApi)