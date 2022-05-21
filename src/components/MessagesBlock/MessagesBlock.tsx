import { useEffect, useRef, useState } from "react"
import { Outlet } from "react-router-dom"
import { ChatSvg } from "../../helpers/icons/icons"
import { DialogType, MessageType } from "../../redux/messenger/types"
import cl from './MessagesBlock.module.scss'

/* ------------- Types ------------- */
interface MessagesBlockProps {
  dialogs: DialogType[]
  messages: MessageType[]
  interlocutorId: number
  authProfileId: number
  authProfilePhoto: string
  pathName: string
  isChatSelected: boolean
  fetchMessagesPending: boolean
  sendMessage: (userId: number, messageBody: string) => void
  clearMessagesState: () => void
}

/* ------------- Component ------------- */
const MessagesBlock: React.FC<MessagesBlockProps> = ({
  pathName,
  isChatSelected,
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

  const messagesWrapper = useRef<HTMLDivElement>(null)
  useEffect(() => {
    messagesWrapper.current?.scrollTo(0, 99999)
  }, [messages])

  const handleSending = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      sendMessage(interlocutorId, newMessage)
      setNewMessage('')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNewMessage(e.target.value)

  return (
    <div className={cl.messagesBlock}>
      <div ref={messagesWrapper} className={cl.messagesWrapper}>
      {!fetchMessagesPending && <EmptyChatPlaceholder isChatSelected={isChatSelected} messagesLength={messages.length}/>}
      <Outlet context={{ //MessagesList
        pathName,
        authProfileId,
        authProfilePhoto,
        dialogs,
        interlocutorId,
        messages,
        clearMessagesState,
        isChatSelected,
        fetchMessagesPending,
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
  isChatSelected: boolean | null
}

const EmptyChatPlaceholder: React.FC<EmptyChatPlaceholderProps> = ({messagesLength, isChatSelected}) => {
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
