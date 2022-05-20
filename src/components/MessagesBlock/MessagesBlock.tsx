import { useEffect, useRef, useState } from "react"
import { Outlet } from "react-router-dom"
import { DialogType, MessageType } from "../../redux/messenger/types"
import cl from './MessagesBlock.module.scss'

/* ------------- Types ------------- */
interface MessagesBlockProps {
  dialogs: DialogType[]
  messages: MessageType[]
  interlocutorId: number
  authProfileId: number
  authProfilePhoto: string
  sendMessage: (userId: number, messageBody: string) => void
}

/* ------------- Component ------------- */
const MessagesBlock: React.FC<MessagesBlockProps> = ({
  dialogs,
  messages,
  interlocutorId,
  authProfileId,
  authProfilePhoto,
  sendMessage,
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
      <Outlet context={{ //MessagesList
        authProfileId,
        authProfilePhoto,
        dialogs,
        interlocutorId,
        messages,
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

