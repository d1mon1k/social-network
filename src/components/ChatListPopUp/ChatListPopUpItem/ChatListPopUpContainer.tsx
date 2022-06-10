import { connect, ConnectedProps } from "react-redux"
import { compose } from "redux"
import { RootState } from "../../../redux/store"
import ChatListPopUp from "../ChatListPopUp"
import {
  fetchDialogsThunk,
  fetchMessagesThunk,
  sendMessageThunk,
} from '../../../redux/messenger/thunks'
import { clearMessagesState } from '../../../redux/messenger/actions'
import { useEffect, useState } from "react"
import { DialogType } from "../../../redux/messenger/types"


/* ------------- Component ------------- */
const ChatListPopUpApi: React.FC<ChatListPopUpContainerProps> = ({
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

  // route,
  // sendChatMessageThunk,
  // startMessagesListening,
  // stopMessagesListening,
  // clearMessagesState,
}) => {
  // const userId = parseInt(route.params.userId)
  // const isDialogSelected = (route.location.pathname === '/messenger/chat') || userId ? true : false

  const [openedDialogsArray, setOpenedDialogsArray] = useState<DialogType[]>([])

  useEffect(() => {
    fetchDialogsThunk()
  }, [fetchDialogsThunk])

  useEffect(() => {
    if(openedDialogsArray.length) {
      if(messages[openedDialogsArray[openedDialogsArray.length - 1].id]) {
        return
      }
      fetchMessagesThunk(openedDialogsArray[openedDialogsArray.length - 1].id)
    }
  }, [openedDialogsArray])

  return (
    <ChatListPopUp
      messages={messages}
      dialogs={dialogs}
      setOpenedDialogs={setOpenedDialogsArray}
      currentDialog={openedDialogsArray}
      interlocutorId={openedDialogsArray.length ? openedDialogsArray[openedDialogsArray.length - 1].id : undefined}
      authProfileId={authProfileId!}
      authProfilePhoto={authProfilePhoto!}
      fetchMessagesPending={fetchMessagesPending}
      clearMessagesState={clearMessagesState}
      // isDialogSelected={isDialogSelected}
      // navigate={route.navigate}
      // pathName={route.location.pathname}
      // chatMessages={chatMessages}
      // sendMessage={sendMessageThunk}
      // sendChatMessageThunk={sendChatMessageThunk}
      // startMessagesListening={startMessagesListening}
      // stopMessagesListening={stopMessagesListening}
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
    fetchMessagesError: state.messenger.requests.fetchMessagesError,  
    fetchDialogsError: state.messenger.requests.fetchMessagesError, 
    sendMessageError: state.messenger.requests.sendMessageError, 
    authProfileId: state.auth.user?.data.id,
    authProfilePhoto: state.auth.user?.data.photos?.small
  };
};

const mapDispatchToProps = {
  fetchDialogsThunk,
  fetchMessagesThunk,
  sendMessageThunk,
  clearMessagesState,
  // sendChatMessageThunk,
  // startMessagesListeningThunk,
  // stopMessagesListeningThunk
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type ChatListPopUpContainerProps = ConnectedProps<typeof connector>

export default compose<any>(connector)(ChatListPopUpApi)