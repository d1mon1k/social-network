import React, { useEffect, useRef, useState, WheelEventHandler } from "react"
import { Outlet } from "react-router-dom"
import { ChatSvg } from "../../helpers/icons/icons"
import { StatusType } from "../../redux/chat/types"
import { DialogType, MessageType } from "../../redux/messenger/types"
import cl from './MessagesBlock.module.scss'
import MessagesList from "./MessagesList/MessagesList"
import MessagesWrapper from "./MessagesWrapper/MessagesWrapper"

/* ------------- Types ------------- */
interface MessagesBlockProps {
  pathName: string
  isDialogSelected: boolean
  interlocutorId: number
  authProfileId: number
  authProfilePhoto: string
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
const MessagesBlock: React.FC<MessagesBlockProps> = ({
  pathName,
  isDialogSelected,
  interlocutorId,
  authProfileId,
  authProfilePhoto,
  dialogs, //bug extra?
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
  const [newMessage, setNewMessage] = useState('')
  const isWsChatSelected = pathName === '/messenger/chat' ? true : false
  const sendMessageCallBack = isWsChatSelected ? sendChatMessage : sendMessage.bind(null, interlocutorId)

  useEffect(() => { //bug doesn't work as expecting
    const callBack = (e: KeyboardEvent) => {
      if(e.key === 'Escape' && !fetchMessagesPending) {
        clearMessagesState()
        navigate('messenger')
      }
    }
    window.addEventListener('keydown', callBack)
    return () => {
      window.removeEventListener('keydown', callBack)
    }
  })

  useEffect(() => { //bug it should be in another component
    startMessagesListening()
    return () => stopMessagesListening()
  }, [])

  const handleSending = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessageCallBack(newMessage)
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
        interlocutorId={interlocutorId}
        isDialogSelected={isDialogSelected}
        dialogs={dialogs}
        dialogMessages={messages}
        chatMessages={chatMessages}
        isWebSocketChatSelected={isWsChatSelected}
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


