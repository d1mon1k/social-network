import { AttachSvg, CrossSvg, FullScreenSvg, SearchSvg } from "../../../helpers/icons/icons"
import ChatListPopUpItem from "../ChatListPopUpItem/ChatListPopUpItem"
import cl from './ActiveChatPopUp.module.scss'
import photo from '../../../assets/images/jpeg/no-photo.jpg'
import Avatar from "../../Avatar/Avatar"
import { Message } from "../../MessagesBlock/MessagesList/Message/Message"
import MessagesList from "../../MessagesBlock/MessagesList/MessagesList"
import { DialogType, MessageType } from "../../../redux/messenger/types"
import { WithDragging } from "../../hoc/withDragging/withDragging"
import { useEffect, useState } from "react"
import { MessagesWrapper } from "../../MessagesBlock/MessagesBlock"

interface ActiveChatPopUpProps {
  dialogs: DialogType[]
  messages: MessageType[]
  openedDialog: DialogType
  setOpenedDialogs:  React.Dispatch<React.SetStateAction<DialogType[]>>
  interlocutorId: number | undefined
  authProfileId: number
  authProfilePhoto: string
  activeClass: string
  fetchMessagesPending: number[]
  clearMessagesState: () => void
}

const ActiveChatPopUp: React.FC<ActiveChatPopUpProps> = ({
  dialogs,
  messages,
  openedDialog,
  setOpenedDialogs,
  interlocutorId,
  authProfileId,
  authProfilePhoto,
  activeClass,
  clearMessagesState,
  fetchMessagesPending,
}) => {
  const [isVisible, setIsVisible] = useState(false)

  const onClickHandler = () => {
    setIsVisible((prev) => !prev)
    setOpenedDialogs(prev => prev.filter(dialog => dialog.id !== openedDialog.id))
  }

  useEffect(() => {
    if(openedDialog) {
      setIsVisible(true)
    }
  }, [openedDialog])

  return (
    <WithDragging activeClass={activeClass} isVisible={isVisible} setIsVisible={setIsVisible} openedDialog={openedDialog} setOpenedDialogs={setOpenedDialogs}>
      <section className={cl.chatWindow}>
        <header className={cl.header}>
          <div className={cl.currentChat}>
            <div className={cl.avatarContainer}>
              <Avatar photo={openedDialog && openedDialog.photos.small} />
            </div>
            <span className={cl.dialogName}>{openedDialog && openedDialog.userName}</span>
          </div>
          <div className={cl.btnsRowContainer}>
            <FullScreenSvg className={cl.fullScreenSvg} />
            <CrossSvg className={cl.crossSvg} onClick={onClickHandler} />
          </div>
        </header>
        <MessagesWrapper
          dialogs={dialogs}
          messages={messages}
          interlocutorId={interlocutorId!}
          authProfileId={authProfileId}
          authProfilePhoto={authProfilePhoto}
          fetchMessagesPending={fetchMessagesPending}
        />
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