import React, { useEffect, useRef, useState } from "react"
import { Outlet } from "react-router-dom"
import { ChatSvg } from "../../helpers/icons/icons"
import { ChatMessageType } from "../../redux/chat/types"
import { DialogType, MessageType } from "../../redux/messenger/types"
import cl from './MessagesBlock.module.scss'
import MessagesList from "./MessagesList/MessagesList"

/* ------------- Types ------------- */
interface MessagesBlockProps {
  dialogs: DialogType[]
  messages: MessageType[]
  chatMessages: ChatMessageType[]
  interlocutorId: number
  authProfileId: number
  authProfilePhoto: string
  pathName: string
  isDialogSelected: boolean
  fetchMessagesPending: number[]
  navigate: (path: string) => void
  sendChatMessageThunk: (message: string) => void
  stopMessagesListening: () => void
  startMessagesListening: () => void
  sendMessage: (userId: number, messageBody: string) => void
  clearMessagesState: () => void
}

/* ------------- Component ------------- */
const MessagesBlock: React.FC<MessagesBlockProps> = ({
  pathName,
  isDialogSelected,
  dialogs,
  messages,
  chatMessages,
  interlocutorId,
  authProfileId,
  authProfilePhoto,
  fetchMessagesPending,
  navigate,
  sendMessage,
  clearMessagesState,
  sendChatMessageThunk,
  startMessagesListening,
  stopMessagesListening
}) => {
  const [newMessage, setNewMessage] = useState('')
  const isWebSocketChatSelected = pathName === '/messenger/chat' ? true : false

  useEffect(() => {
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

  useEffect(() => {
    startMessagesListening()
    return () => stopMessagesListening()
  }, [])

  const handleSending = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if(isWebSocketChatSelected) {
        sendChatMessageThunk(newMessage)
      }else {
        sendMessage(interlocutorId, newMessage)
      }
      setNewMessage('')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNewMessage(e.target.value)

  return (
    <div className={cl.messagesBlock}>
      <MessagesWrapper
        authProfileId={authProfileId}
        authProfilePhoto={authProfilePhoto}
        chatMessages={chatMessages}
        dialogs={dialogs}
        fetchMessagesPending={fetchMessagesPending}
        interlocutorId={interlocutorId}
        isDialogSelected={isDialogSelected}
        messages={messages}
        pathName={pathName}
        isWebSocketChatSelected={isWebSocketChatSelected}
      />
      <div className={cl.textareaWrapper}>
        <textarea
          onKeyDown={handleSending}
          value={newMessage}
          onChange={handleChange}
          placeholder="Write message"
          className={cl.newMessageField}
        />
      </div>
    </div>
  )
}

export default MessagesBlock

/* ------------- Nested components ------------- */
interface MessengerContainerProps {
  chatMessages?: ChatMessageType[]
  isDialogSelected?: boolean
  //===========================================
  // setChatMessages: React.Dispatch<React.SetStateAction<[] | ChatMessageType[]>>
  // webSocketChannel: WebSocket
  pathName?: string
  //===========================================
  dialogs: DialogType[]
  messages: MessageType[]
  interlocutorId: number
  authProfileId: number
  authProfilePhoto: string
  fetchMessagesPending: number[]
  isWebSocketChatSelected?: boolean
}

export const MessagesWrapper: React.FC<MessengerContainerProps> = ({
  dialogs,
  messages,
  interlocutorId,
  authProfileId,
  authProfilePhoto,
  fetchMessagesPending,
  pathName,
  isWebSocketChatSelected,
  // setChatMessages,
  // webSocketChannel,
  chatMessages,
  isDialogSelected
}) => {
  const messagesWrapper = useRef<HTMLDivElement>(null)
  const messagesLength = isWebSocketChatSelected ? (chatMessages ? chatMessages.length : null) : messages.length

  useEffect(() => {
    messagesWrapper.current?.scrollTo(0, 99999)
  }, [messages, chatMessages, pathName]) //bug - Заменить pathName на userId

  return (
    <div ref={messagesWrapper} className={cl.messagesWrapper}>
      {!fetchMessagesPending && <EmptyChatPlaceholder isDialogSelected={isDialogSelected || true} messagesLength={messagesLength}/>}
      {pathName ? (
        <Outlet context={{ //MessagesList, Chat
          pathName,
          authProfileId,
          authProfilePhoto,
          dialogs,
          interlocutorId,
          messages,
          fetchMessagesPending,
          isChatSelected: isWebSocketChatSelected,
        }}/>
      ) : (
        <MessagesList
          dialogs={dialogs}
          messages={messages}
          interlocutorId={interlocutorId!}
          authProfileId={authProfileId}
          authProfilePhoto={authProfilePhoto}
          fetchMessagesPending={fetchMessagesPending}
        />
      )}
      
    </div>
  )
}

interface EmptyChatPlaceholderProps {
  messagesLength: number | null
  isDialogSelected: boolean | null
}

const EmptyChatPlaceholder: React.FC<EmptyChatPlaceholderProps> = ({messagesLength, isDialogSelected: isChatSelected}) => {
  const tip = isChatSelected === false ? 'Select a chat' : 'You can write your first message'

  return (
    <>
      {(messagesLength === 0 || isChatSelected === false) && (
        <div className={cl.emptyChatPlaceholder}>
          <div><ChatSvg /></div>
          <div>{tip}</div>
        </div>
      )}
    </>
  )
}
