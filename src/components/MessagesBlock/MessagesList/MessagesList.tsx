import { useEffect, useRef } from "react"
import { useOutletContext } from "react-router-dom"
import { convertDateFormat } from "../../../helpers/helpers"
import { StatusType } from "../../../redux/chat/types"
import { DialogType, MessageType } from "../../../redux/messenger/types"
import Preloader from "../../common/Preloader/Preloader"
import { Message } from "./Message/Message"
import cl from './MessagesList.module.scss'

/* ------------- Types ------------- */
interface MessagesListOutlet {
  authProfileId: number
  authProfilePhoto: string
  currentDialog: DialogType
  messages: MessageType[]
  isAutoScroll: boolean
  fetchMessagesPending: number[] 
  fetchChatMessagesStatus: StatusType //bug обработать pending
}

interface MessagesListProps extends MessagesListOutlet {}

/* ------------- Component ------------- */
const MessagesList: React.FC<MessagesListProps | null> = (props) => {
  const messagesAnchorRef = useRef<HTMLDivElement | null>(null)
  const outlet = useOutletContext<MessagesListOutlet>() //from MessagesBlock
  
  const authProfileId = outlet ? outlet.authProfileId : props.authProfileId
  const authProfilePhoto = outlet ? outlet.authProfilePhoto : props.authProfilePhoto
  const fetchMessagesPending = outlet ? outlet.fetchMessagesPending : props.fetchMessagesPending
  const messages = outlet ? outlet.messages : props.messages
  const isAutoScroll = outlet ? outlet.isAutoScroll : props.isAutoScroll
  const currentDialog = outlet ? outlet.currentDialog : props.currentDialog
  const currentDialogId = (currentDialog && currentDialog.id) || null

  useEffect(() => {
    if(isAutoScroll) {
      messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
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
        {fetchMessagesPending.some((id) => id === currentDialogId) ? (
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

