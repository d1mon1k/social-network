import React, { useEffect, useState } from "react"
import { StatusType } from "../../redux/chat/types"
import { DialogType, MessageType } from "../../redux/messenger/types"
import cl from './MessagesBlock.module.scss'
import MessagesWrapper from "./MessagesWrapper/MessagesWrapper"

/* ------------- Types ------------- */
interface MessagesBlockProps {
  pathName: string
  isDialogSelected: boolean
  authProfileId: number
  authProfilePhoto: string
  currentDialog: DialogType
  messages: MessageType[]
  fetchMessagesPending: number[]
  fetchChatMessagesStatus: StatusType
  navigate: (path: string) => void
  sendMessage: (messageBody: string) => void
}

/* ------------- Component ------------- */
const MessagesBlock: React.FC<MessagesBlockProps> = ({
  pathName,
  isDialogSelected,
  authProfileId,
  authProfilePhoto,
  messages,
  currentDialog,
  navigate,
  fetchChatMessagesStatus,
  fetchMessagesPending,
  sendMessage,
}) => {
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    const callBack = (e: KeyboardEvent) => {
      if(e.key === 'Escape' && fetchMessagesPending.every(id => id !== currentDialog.id)) {
        navigate('messenger')
      }
    }
    window.addEventListener('keydown', callBack)
    return () => {
      window.removeEventListener('keydown', callBack)
    }
  }, [])

  const handleSending = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(newMessage)
      setNewMessage('')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNewMessage(e.target.value)

  return (
    <div className={cl.messagesBlock}>
      <MessagesWrapper
        pathName={pathName}
        authProfileId={authProfileId}
        authProfilePhoto={authProfilePhoto}
        currentDialog={currentDialog}
        isDialogSelected={isDialogSelected}
        messages={messages}
        fetchChatMessagesStatus={fetchChatMessagesStatus}
        fetchMessagesPending={fetchMessagesPending}
      />
      <div className={cl.textAreaWrapper}>
        <textarea
          value={newMessage}
          disabled={fetchChatMessagesStatus === 'pending'}
          placeholder={(fetchChatMessagesStatus !== 'ready') ? 'Reconnect to the channel..' : 'Write message'}
          className={cl.newMessageField}
          onKeyDown={handleSending}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default MessagesBlock


