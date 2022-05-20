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
  sendMessage: (userId: number, messageBody: string) => void
}

/* ------------- Component ------------- */
const Messenger: React.FC<MessengerProps> = ({
  dialogs,
  messages,
  authProfileId,
  authProfilePhoto,
  interlocutorId,
  sendMessage,
}) => {

  return (
    <div className={cl.messenger}>
      <DialogsBlock dialogs={dialogs} />
      <MessagesBlock
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

