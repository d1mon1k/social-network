import { AttachSvg, CrossSvg, FullScreenSvg } from "../../../helpers/icons/icons"
import cl from './ActiveChatPopUp.module.scss'
import Avatar from "../../Avatar/Avatar"
import { DialogType, MessageType } from "../../../redux/messenger/types"
import { WithDragging } from "../../hoc/withDragging/withDragging"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import MessagesWrapper from "../../MessagesBlock/MessagesWrapper/MessagesWrapper"
import { StatusType } from "../../../redux/chat/types"

/* ------------- Types ------------- */
interface ActiveChatPopUpProps {
  messages: MessageType[]
  openedDialog: DialogType
  setOpenedDialogs:  React.Dispatch<React.SetStateAction<DialogType[]>>
  authProfileId: number
  authProfilePhoto: string
  fetchMessagesPending: number[]
  fetchChatMessagesStatus: StatusType
  sendMessage: (messageBody: string) => void
}

/* ------------- Component ------------- */
const ActiveChatPopUp: React.FC<ActiveChatPopUpProps> = ({
  messages,
  openedDialog,
  setOpenedDialogs,
  authProfileId,
  authProfilePhoto,
  fetchMessagesPending,
  fetchChatMessagesStatus,
  sendMessage,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if(openedDialog) {
      setIsVisible(true)
    }
  }, [openedDialog])
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(message)
      setMessage('')
    }
  }

  const handleOnCrossClick = () => {
    setIsVisible((prev) => !prev)
    setOpenedDialogs(prev => prev.filter(dialog => dialog.id !== openedDialog.id))
  }
  
  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(target.value)

  const handleOnFullScreenClick = () => navigate(`messenger/${openedDialog.id === 9999999 ? 'chat' : openedDialog.id}`)

  return (
    <WithDragging
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      openedDialog={openedDialog}
      setOpenedDialogs={setOpenedDialogs}
    >
      <section className={cl.chatWindow}>
        <header className={cl.header}>
          <div className={cl.currentChat}>
            <div className={cl.avatarContainer}>
              <Avatar photo={openedDialog && openedDialog.photos.small} />
            </div>
            <span className={cl.dialogName}>{openedDialog && openedDialog.userName}</span>
          </div>
          <div className={cl.btnsRowContainer}>
            <FullScreenSvg className={cl.fullScreenSvg} onClick={handleOnFullScreenClick}/>
            <CrossSvg className={cl.crossSvg} onClick={handleOnCrossClick} />
          </div>
        </header>
        <MessagesWrapper
          currentDialog={openedDialog}
          messages={messages}
          authProfileId={authProfileId}
          authProfilePhoto={authProfilePhoto}
          fetchMessagesPending={fetchMessagesPending}
          fetchChatMessagesStatus={fetchChatMessagesStatus}
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