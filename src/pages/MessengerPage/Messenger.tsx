import React from 'react'
import { DialogType, MessageType } from '../../redux/messenger/types'
import MessagesBlock from '../../components/MessagesBlock/MessagesBlock'
import DialogsBlock from '../../components/DialogsBlock/DialogsBlock'
import cl from './Messenger.module.scss'
import { StatusType } from '../../redux/chat/types'

/* ------------- Types ------------- */
interface MessengerProps {
  pathName: string
  interlocutorId: number
  authProfileId: number | undefined
  authProfilePhoto: string | undefined | null
  isDialogSelected: boolean
  dialogs: DialogType[]
  messages: MessageType[] 
  chatMessages: MessageType[]
  fetchMessagesPending: number[]
  fetchChatMessagesStatus: StatusType
  navigate: (path: string) => void
  sendChatMessage: (message: string) => void
  sendMessage: (userId: number, messageBody: string) => void
  stopMessagesListening: () => void //bug extra
  startMessagesListening: () => void //bug extra
  clearMessagesState: () => void //bug extra
}

/* ------------- Component ------------- */
const Messenger: React.FC<MessengerProps> = ({
  isDialogSelected,
  authProfileId,
  authProfilePhoto,
  interlocutorId,
  pathName,
  dialogs,
  messages,
  chatMessages,
  fetchChatMessagesStatus,
  fetchMessagesPending,
  navigate,
  sendMessage,
  sendChatMessage,
  startMessagesListening, //bug extra
  stopMessagesListening, //bug extra
  clearMessagesState, //bug extra
}) => {
  return (
    <div className={cl.messenger}>
      <DialogsBlock dialogs={dialogs} />
      <MessagesBlock
        pathName={pathName}
        isDialogSelected={isDialogSelected}
        authProfileId={authProfileId!}
        authProfilePhoto={authProfilePhoto!}
        interlocutorId={interlocutorId}
        dialogs={dialogs}
        messages={messages}
        chatMessages={chatMessages}
        sendChatMessage={sendChatMessage}
        sendMessage={sendMessage}
        fetchChatMessagesStatus={fetchChatMessagesStatus}
        fetchMessagesPending={fetchMessagesPending}
        navigate={navigate}
        stopMessagesListening={stopMessagesListening} //bug extra
        startMessagesListening={startMessagesListening} //bug extra
        clearMessagesState={clearMessagesState} //bug extra
      />
    </div>
  )
}

export default Messenger

