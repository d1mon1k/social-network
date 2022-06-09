import React, { useState } from 'react'
import { DialogType, MessageType } from '../../redux/messenger/types'
import MessagesBlock from '../../components/MessagesBlock/MessagesBlock'
import DialogsBlock from '../../components/DialogsBlock/DialogsBlock'
import cl from './Messenger.module.scss'
import { ChatMessageType } from '../../redux/chat/types'

/* ------------- Types ------------- */
interface MessengerProps {
  interlocutorId: number
  dialogs: DialogType[]
  messages: MessageType[] 
  chatMessages: ChatMessageType[]
  authProfileId: number | undefined
  authProfilePhoto: string | undefined | null
  pathName: string
  isDialogSelected: boolean
  fetchMessagesPending: boolean
  navigate: (path: string) => void
  sendChatMessageThunk: (message: string) => void
  stopMessagesListening: () => void
  startMessagesListening: () => void
  sendMessage: (userId: number, messageBody: string) => void
  clearMessagesState: () => void
}

/* ------------- Component ------------- */
const Messenger: React.FC<MessengerProps> = ({
  pathName,
  dialogs,
  messages,
  chatMessages,
  authProfileId,
  authProfilePhoto,
  interlocutorId,
  fetchMessagesPending,
  sendMessage,
  clearMessagesState,
  isDialogSelected,
  navigate,
  sendChatMessageThunk,
  startMessagesListening,
  stopMessagesListening
}) => {
  return (
    <div className={cl.messenger}>
      <DialogsBlock dialogs={dialogs} />
      <MessagesBlock
        sendChatMessageThunk={sendChatMessageThunk}
        stopMessagesListening={stopMessagesListening}
        startMessagesListening={startMessagesListening}
        fetchMessagesPending={fetchMessagesPending}
        isDialogSelected={isDialogSelected}
        navigate={navigate}
        pathName={pathName}
        clearMessagesState={clearMessagesState}
        sendMessage={sendMessage}
        authProfileId={authProfileId!}
        authProfilePhoto={authProfilePhoto!}
        dialogs={dialogs}
        interlocutorId={interlocutorId}
        messages={messages}
        chatMessages={chatMessages}
      />
    </div>
  )
}

export default Messenger

