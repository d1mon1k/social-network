import React, { useState } from 'react'
import { DialogType, MessageType } from '../../redux/messenger/types'
import MessagesBlock from '../../components/MessagesBlock/MessagesBlock'
import DialogsBlock from '../../components/DialogsBlock/DialogsBlock'
import cl from './Messenger.module.scss'

/* ------------- Types ------------- */
interface MessengerProps {
  interlocutorId: number
  dialogs: DialogType[]
  messages: MessageType[]
  authProfileId: number | undefined
  authProfilePhoto: string | undefined | null
  pathName: string
  isDialogSelected: boolean
  fetchMessagesPending: boolean,
  sendMessage: (userId: number, messageBody: string) => void
  clearMessagesState: () => void
}

/* ------------- Component ------------- */
const Messenger: React.FC<MessengerProps> = ({
  pathName,
  dialogs,
  messages,
  authProfileId,
  authProfilePhoto,
  interlocutorId,
  fetchMessagesPending,
  sendMessage,
  clearMessagesState,
  isDialogSelected,
}) => {

  return (
    <div className={cl.messenger}>
      <DialogsBlock dialogs={dialogs} />
      <MessagesBlock
        fetchMessagesPending={fetchMessagesPending}
        isDialogSelected={isDialogSelected}
        pathName={pathName}
        clearMessagesState={clearMessagesState}
        sendMessage={sendMessage}
        authProfileId={authProfileId!}
        authProfilePhoto={authProfilePhoto!}
        dialogs={dialogs}
        interlocutorId={interlocutorId}
        messages={messages}
      />
    </div>
  )
}

export default Messenger

