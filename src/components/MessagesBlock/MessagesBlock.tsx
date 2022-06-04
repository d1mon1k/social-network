import React, { useEffect, useRef, useState } from "react"
import { Outlet } from "react-router-dom"
import { ChatSvg } from "../../helpers/icons/icons"
import { ChatMessageType } from "../../redux/chat/types"
import { DialogType, MessageType } from "../../redux/messenger/types"
import cl from './MessagesBlock.module.scss'

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
  fetchMessagesPending: boolean
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

  const messagesWrapper = useRef<HTMLDivElement>(null)
  const isWebSocketChatSelected = pathName === '/messenger/chat' ? true : false
  const messagesLength = isWebSocketChatSelected ? chatMessages.length : messages.length

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

  useEffect(() => {
    messagesWrapper.current?.scrollTo(0, 99999)
  }, [messages, chatMessages, pathName]) //bug - Заменить pathName на userId

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
      <div ref={messagesWrapper} className={cl.messagesWrapper}>
      {!fetchMessagesPending && <EmptyChatPlaceholder isDialogSelected={isDialogSelected} messagesLength={messagesLength}/>}
      <Outlet context={{ //MessagesList, Chat
        pathName,
        authProfileId,
        authProfilePhoto,
        dialogs,
        interlocutorId,
        messages,
        clearMessagesState,
        isDialogSelected,
        fetchMessagesPending,
        chatMessages,
        isChatSelected: isWebSocketChatSelected,
      }}/>
      </div>
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
