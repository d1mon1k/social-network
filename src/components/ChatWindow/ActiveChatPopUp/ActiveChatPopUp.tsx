import { AttachSvg, CrossSvg, FullScreenSvg, SearchSvg } from "../../../helpers/icons/icons"
import ChatListPopUpItem from "../ChatListPopUpItem/ChatListPopUpItem"
import cl from './ActiveChatPopUp.module.scss'
import photo from '../../../assets/images/jpeg/no-photo.jpg'
import Avatar from "../../Avatar/Avatar"
import { Message } from "../../MessagesBlock/MessagesList/Message/Message"
import MessagesList from "../../MessagesBlock/MessagesList/MessagesList"
import { DialogType, MessageType } from "../../../redux/messenger/types"
import { WithDragging } from "../../hoc/withDragging/withDragging"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MessagesWrapper from "../../MessagesBlock/MessagesWrapper/MessagesWrapper"

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
  sendMessage: (userId: number, messageBody: string) => void
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
  fetchMessagesPending,
  sendMessage,
  clearMessagesState,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleOnCrossClick = () => {
    setIsVisible((prev) => !prev)
    setOpenedDialogs(prev => prev.filter(dialog => dialog.id !== openedDialog.id))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(interlocutorId!, message)
      setMessage('')
    }
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(target.value)

  const handleOnFullScreenClick = () => navigate(`messenger/${interlocutorId}`)

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
            <FullScreenSvg className={cl.fullScreenSvg} onClick={handleOnFullScreenClick} />
            <CrossSvg className={cl.crossSvg} onClick={handleOnCrossClick} />
          </div>
        </header>
        <MessagesWrapper
          dialogs={dialogs}
          dialogMessages={messages}
          interlocutorId={interlocutorId!}
          authProfileId={authProfileId}
          authProfilePhoto={authProfilePhoto}
          fetchMessagesPending={fetchMessagesPending}
        />
        <footer className={cl.footer}>
          <AttachSvg />
          <textarea
            placeholder={'Message'}
            className={cl.textArea}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            value={message}
          />
        </footer>
      </section>
    </WithDragging>
  )
}

export default ActiveChatPopUp