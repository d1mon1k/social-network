import { useEffect, useRef, useState } from "react"
import { Outlet } from "react-router-dom"
import { json } from "stream/consumers"
import { ChatSvg } from "../../helpers/icons/icons"
import { DialogType, MessageType } from "../../redux/messenger/types"
import cl from './MessagesBlock.module.scss'

const webSocketChannel = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

/* ------------- Types ------------- */
interface MessagesBlockProps {
  dialogs: DialogType[]
  messages: MessageType[]
  interlocutorId: number
  authProfileId: number
  authProfilePhoto: string
  pathName: string
  isDialogSelected: boolean
  fetchMessagesPending: boolean
  sendMessage: (userId: number, messageBody: string) => void
  clearMessagesState: () => void
}

export interface ChatMessageType {
  message: string,
  photo: string,
  userId: number,
  userName: string
}

/* ------------- Component ------------- */
const MessagesBlock: React.FC<MessagesBlockProps> = ({
  pathName,
  isDialogSelected,
  dialogs,
  messages,
  interlocutorId,
  authProfileId,
  authProfilePhoto,
  fetchMessagesPending,
  sendMessage,
  clearMessagesState
}) => {
  const [newMessage, setNewMessage] = useState('')
  const [wsReadyStatus, setWsReadyStatus] = useState<'ready' | 'pending'>('pending')
  const [chatMessages, setChatMessages] = useState<[] | ChatMessageType[]>([])

  const isChatSelected = pathName === '/messenger/chat' ? true : false
  const messagesLength = isChatSelected ? chatMessages.length : messages.length

  const messagesWrapper = useRef<HTMLDivElement>(null)
  useEffect(() => {
    messagesWrapper.current?.scrollTo(0, 99999)
  }, [messages])

  useEffect(() => {
    webSocketChannel.addEventListener('open', (e) => {
      setWsReadyStatus('ready')
    })
  }, [])

  const handleSending = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      if(isChatSelected) {
        if(wsReadyStatus === 'pending') return
        webSocketChannel.send(newMessage)
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
        isChatSelected,
        webSocketChannel,
        setChatMessages,
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
          <div>
            <ChatSvg />
          </div>
          <div>{tip}</div>
        </div>
      )}
    </>
  )
}
