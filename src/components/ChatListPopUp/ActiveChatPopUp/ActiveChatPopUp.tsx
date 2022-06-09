import { AttachSvg, CrossSvg, FullScreenSvg, SearchSvg } from "../../../helpers/icons/icons"
import ChatListPopUpItem from "../ChatListPopUpItem/ChatListPopUpItem"
import cl from './ActiveChatPopUp.module.scss'
import photo from '../../../assets/images/jpeg/no-photo.jpg'
import Avatar from "../../Avatar/Avatar"
import { Message } from "../../MessagesBlock/MessagesList/Message/Message"
import MessagesList from "../../MessagesBlock/MessagesList/MessagesList"
import { DialogType, MessageType } from "../../../redux/messenger/types"
import { WithDragging } from "../../../helpers/hooks/withDragging"
import { useEffect, useState } from "react"

interface ActiveChatPopUpProps {
  dialogs: DialogType[]
  messages: MessageType[]
  currentDialog: DialogType
  interlocutorId: number | undefined
  authProfileId: number
  authProfilePhoto: string
  fetchMessagesPending: boolean
  clearMessagesState: () => void
}

const ActiveChatPopUp: React.FC<ActiveChatPopUpProps> = ({
  dialogs,
  messages,
  currentDialog,
  interlocutorId,
  authProfileId,
  authProfilePhoto,
  clearMessagesState,
  fetchMessagesPending,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const onClickHandler = () => {
    setIsVisible((prev) => !prev)
  }

  useEffect(() => {
    if(currentDialog) {
      setIsVisible(true)
    }
  }, [currentDialog])

  return (
    <WithDragging isVisible={isVisible} setIsVisible={setIsVisible}>
      <section className={cl.chatWindow}>
        <header className={cl.header}>
          <div className={cl.currentChat}>
            <div className={cl.avatarContainer}>
              <Avatar photo={currentDialog.photos.small} />
            </div>
            <span className={cl.dialogName}>{currentDialog.userName}</span>
          </div>
          <div className={cl.btnsRowContainer}>
            <FullScreenSvg className={cl.fullScreenSvg} />
            <CrossSvg className={cl.crossSvg} onClick={onClickHandler} />
          </div>
        </header>
        <main className={cl.messages}>
          <MessagesList
            dialogs={dialogs}
            messages={messages}
            interlocutorId={interlocutorId!}
            authProfileId={authProfileId}
            authProfilePhoto={authProfilePhoto}
            clearMessagesState={clearMessagesState}
            fetchMessagesPending={fetchMessagesPending}
          />
        </main>
        <footer className={cl.footer}>
          <AttachSvg />
          <input
            placeholder={'Message'}
            className={cl.searchInput}
            type="text"
          />
        </footer>
      </section>
    </WithDragging>
  )
}

export default ActiveChatPopUp