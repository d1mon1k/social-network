import { useEffect } from "react"
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
  pathName: string
  fetchMessagesPending: boolean
  clearMessagesState: () => void
}

/* ------------- Component ------------- */
const MessagesList = () => {
  const {
    dialogs,
    messages,
    interlocutorId,
    authProfileId,
    authProfilePhoto,
    clearMessagesState,
    pathName,
    fetchMessagesPending
  } = useOutletContext<OutletContext>() //MessagesBlock

  useEffect(() => {
    return () => {
      clearMessagesState()
    }
  }, [pathName])

  const currentDialog = [...dialogs].filter((dialog) => dialog.id === interlocutorId)[0]

  const _messages = messages.map((message) => {
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
      {fetchMessagesPending ? (
        <div className={cl.preloaderContainer}>
          <Preloader height="55px" width="55px" position="absolute" />
        </div>
      ) : (
        _messages
      )}
    </ul>
  )
}

export default MessagesList

