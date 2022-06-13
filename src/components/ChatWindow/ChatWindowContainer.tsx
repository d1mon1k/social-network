import { connect, ConnectedProps } from "react-redux"
import { compose } from "redux"
import { RootState } from "../../redux/store"
import ChatWindow from "./ChatWindow"
import {
  fetchDialogsThunk,
  fetchMessagesThunk,
  sendMessageThunk,
} from '../../redux/messenger/thunks'
import { sendChatMessageThunk, startMessagesListeningThunk } from "../../redux/chat/thunks"
import { clearMessagesState } from '../../redux/messenger/actions'
import { useEffect, useState } from "react"
import { DialogType } from "../../redux/messenger/types"

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
  fetchDialogsThunk,
  fetchMessagesThunk,
  startMessagesListeningThunk,
  sendChatMessageThunk,
  sendMessageThunk,
  clearMessagesState //bug extra
}) => {
  const [openedDialogs, setOpenedDialogs] = useState<DialogType[]>([])
  
  useEffect(() => {
    startMessagesListeningThunk()
    fetchDialogsThunk()
  }, [fetchDialogsThunk])
  
  useEffect(() => {
    const lastDialogIndex = openedDialogs.length - 1
    if(lastDialogIndex < 0) return
    if(messages[openedDialogs[lastDialogIndex].id]) return
    fetchMessagesThunk(openedDialogs[lastDialogIndex].id)
  }, [openedDialogs])

  return (
    <ChatWindow
      authProfileId={authProfileId!}
      authProfilePhoto={authProfilePhoto!}
      dialogs={dialogs}
      dialogsMessages={messages}
      chatMessages={chatMessages}
      openedDialogs={openedDialogs}
      setOpenedDialogs={setOpenedDialogs}
      fetchChatMessagesStatus={fetchChatMessagesStatus}
      fetchMessagesPending={fetchMessagesPending}
      sendMessage={sendMessageThunk}
      sendChatMessage={sendChatMessageThunk}
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
    authProfileId: state.auth.user?.data.id,
    authProfilePhoto: state.auth.user?.data.photos?.small,
    fetchChatMessagesStatus: state.chat.requests.fetchChatMessagesStatus,
    fetchMessagesPending: state.messenger.requests.fetchMessagesPending,
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
  clearMessagesState, //bug extra
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type ChatWindowContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector)(ChatWindowApi)