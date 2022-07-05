import React from 'react'
import DialogsBlock from '../../components/DialogsBlock/DialogsBlock'
import MessagesBlock from '../../components/MessagesBlock/MessagesBlock'
import { StatusType } from '../../redux/chat/types'
import { DialogType, MessageType } from '../../redux/messenger/types'
import cl from './MessengerPage.module.scss'

/* ------------- Types ------------- */
interface MessengerProps {
  pathName: string
  interlocutorId: number
  authProfileId: number | undefined
  authProfilePhoto: string | undefined | null
  isDialogSelected: boolean
  dialogs: DialogType[]
  messages: MessageType[] 
  fetchMessagesPending: number[]
  fetchChatMessagesStatus: StatusType
  navigate: (path: string) => void
  sendMessage: (messageBody: string) => void
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
  fetchChatMessagesStatus,
  fetchMessagesPending,
  navigate,
  sendMessage,
}) => {
  const currentDialog = dialogs.filter((dialog) => dialog.id === interlocutorId)[0]

  return (
    <div className={cl.messenger}>
      <DialogsBlock dialogs={dialogs} />
      <MessagesBlock
        pathName={pathName}
        currentDialog={currentDialog}
        isDialogSelected={isDialogSelected}
        authProfileId={authProfileId!}
        authProfilePhoto={authProfilePhoto!}
        messages={messages}
        sendMessage={sendMessage}
        fetchChatMessagesStatus={fetchChatMessagesStatus}
        fetchMessagesPending={fetchMessagesPending}
        navigate={navigate}
      />
    </div>
  )
}

export default Messenger

