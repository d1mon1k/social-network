import { useOutletContext } from "react-router-dom"
import { convertDateFormat } from "../../../helpers/helpers"
import { DialogType, MessageType } from "../../../redux/messenger/types"
import Preloader from "../../common/Preloader/Preloader"
import { Message } from "./Message/Message"
import cl from './MessagesList.module.scss'

/* ------------- Types ------------- */
interface OutletContext {
  dialogs: DialogType[]
  messages: MessageType[]
  interlocutorId: number
  authProfileId: number
  authProfilePhoto: string
  fetchMessagesPending: number[]
}

/* ------------- Component ------------- */
const MessagesList: React.FC<OutletContext | null> = (props) => {
  const outlet = useOutletContext<OutletContext>() //from MessagesBlock
  const dialogs = outlet ? outlet.dialogs : props.dialogs
  const authProfileId = outlet ? outlet.authProfileId : props.authProfileId
  const authProfilePhoto = outlet ? outlet.authProfilePhoto : props.authProfilePhoto
  const interlocutorId = outlet ? outlet.interlocutorId : props.interlocutorId
  const fetchMessagesPending = outlet ? outlet.fetchMessagesPending : props.fetchMessagesPending
  const messages = outlet ? outlet.messages : props.messages
  const currentDialog = dialogs.filter((dialog) => dialog.id === interlocutorId)[0]

  const MessagesList = messages.map((message) => {
    const photo = message.senderId === authProfileId? authProfilePhoto: currentDialog?.photos.small
    const id = message.senderId === authProfileId ? authProfileId : interlocutorId

    return (
      <Message
        userId={id}
        photo={photo}
        name={message.senderName}
        key={message.id}
        message={message.body}
        time={convertDateFormat(message.addedAt, true)}
      />
    )
  })

  return (
    <ul className={cl.messages}>
      {fetchMessagesPending.some((id) => id === interlocutorId) ? (
        <div className={cl.preloaderContainer}>
          <Preloader height="55px" width="55px" position="absolute" />
        </div>
      ) : (
        MessagesList
      )}
    </ul>
  )
}

export default MessagesList

