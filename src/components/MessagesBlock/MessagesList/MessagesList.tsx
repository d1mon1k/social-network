import { useEffect } from "react"
import { Outlet, useOutletContext } from "react-router-dom"
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
  pathName?: string
  fetchMessagesPending: boolean
  clearMessagesState: () => void
}

/* ------------- Component ------------- */
const MessagesList: React.FC<OutletContext | null> = (props) => {
  const outlet = useOutletContext<OutletContext>() //MessagesBlock

  const currentDialog = (outlet ? outlet.dialogs : props.dialogs).filter((dialog) => dialog.id === (props.interlocutorId || outlet.interlocutorId))[0]

  const messages = (outlet ? outlet.messages : props.messages).map((message) => {
    let photo
    let id

    if(outlet) {
      photo = message.senderId === outlet.authProfileId? outlet.authProfilePhoto: currentDialog?.photos.small
      id = message.senderId === outlet.authProfileId ? outlet.authProfileId : outlet.interlocutorId
    }else {
      photo = message.senderId === props.authProfileId? props.authProfilePhoto: currentDialog?.photos.small
      id = message.senderId === props.authProfileId ? props.authProfileId : props.interlocutorId
    }

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
      {(outlet ? outlet.fetchMessagesPending : props.fetchMessagesPending) ? (
        <div className={cl.preloaderContainer}>
          <Preloader height="55px" width="55px" position="absolute" />
        </div>
      ) : (
        messages
      )}
    </ul>
  )
}

export default MessagesList

