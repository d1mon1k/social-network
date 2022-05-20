import { useOutletContext } from "react-router-dom"
import { convertDateFormat } from "../../../helpers/helpers"
import { DialogType, MessageType } from "../../../redux/messenger/types"
import { Message } from "./Message/Message"
import cl from './MessagesList.module.scss'

/* ------------- Types ------------- */
interface OutletContext {
  dialogs: DialogType[]
  messages: MessageType[]
  interlocutorId: number
  authProfileId: number
  authProfilePhoto: string
}

/* ------------- Component ------------- */
const MessagesList = () => {
  const {dialogs, messages, interlocutorId, authProfileId, authProfilePhoto} = useOutletContext<OutletContext>()

  const currentDialog = [...dialogs].filter((dialog) => dialog.id === interlocutorId)[0]

  return (
    <ul className={cl.messages}>
      {messages.map((message) => {
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
      })}
    </ul>
  )
}

export default MessagesList