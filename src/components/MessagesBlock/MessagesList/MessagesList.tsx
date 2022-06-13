import { useEffect, useRef } from "react"
import { useOutletContext } from "react-router-dom"
import { convertDateFormat } from "../../../helpers/helpers"
import { ChatMessageType, StatusType } from "../../../redux/chat/types"
import { DialogType, MessageType } from "../../../redux/messenger/types"
import Preloader from "../../common/Preloader/Preloader"
import { Message } from "./Message/Message"
import cl from './MessagesList.module.scss'

/* ------------- Types ------------- */
interface MessagesListOutlet {
  authProfileId: number
  dialogs: DialogType[] //bug надо current dialog
  interlocutorId: number //bug можно будет убрать если будет current dialog
  isWebSocketChatSelected?: boolean //bug extra!
  messages: MessageType[]
  authProfilePhoto: string
  isAutoScroll: boolean
  fetchMessagesPending: number[] 
  fetchChatMessagesStatus?: StatusType //bug extra ?
}

interface MessagesListProps extends MessagesListOutlet {}

/* ------------- Component ------------- */
const MessagesList: React.FC<MessagesListProps | null> = (props) => {
  const messagesAnchorRef = useRef<HTMLDivElement | null>(null)
  const outlet = useOutletContext<MessagesListOutlet>() //from MessagesBlock

  const authProfileId = outlet ? outlet.authProfileId : props.authProfileId
  const dialogs = outlet ? outlet.dialogs : props.dialogs
  const authProfilePhoto = outlet ? outlet.authProfilePhoto : props.authProfilePhoto
  const interlocutorId = outlet ? outlet.interlocutorId : props.interlocutorId
  const fetchMessagesPending = outlet ? outlet.fetchMessagesPending : props.fetchMessagesPending
  const messages = outlet ? outlet.messages : props.messages
  const isAutoScroll = outlet ? outlet.isAutoScroll : props.isAutoScroll
  const currentDialog = dialogs.filter((dialog) => dialog.id === interlocutorId)[0]
  
  useEffect(() => {
    if(isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({'behavior': 'smooth'})
    }
  }, [messages])

  const MessagesList = messages.map((message) => {
    const photo = message.photo || (message.senderId === authProfileId? authProfilePhoto : currentDialog?.photos.small)
    return (
      <Message
        userId={message.senderId}
        photo={photo}
        name={message.senderName}
        key={message.id}
        message={message.body}
        time={convertDateFormat(message.addedAt, true)}
      />
    )
  })

  return (
    <>
      <ul className={cl.messages}>
        {fetchMessagesPending.some((id) => id === interlocutorId) ? (
          <div className={cl.preloaderContainer}>
            <Preloader height="55px" width="55px" position="absolute" />
          </div>
        ) : (
          MessagesList
        )}
      </ul>
      <div ref={messagesAnchorRef}></div>
    </>
  )
}

export default MessagesList

