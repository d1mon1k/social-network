import { CrossSvg, MessengerSvg } from '../../helpers/icons/icons'
import cl from './ChatWindow.module.scss'
import React, { useState } from 'react'
import { DialogType, MessageType } from '../../redux/messenger/types'
import ActiveChatPopUp from './ActiveChatPopUp/ActiveChatPopUp'
import { WithDragging } from '../hoc/withDragging/withDragging'
import { StatusType } from '../../redux/chat/types'
import ChatListPopUp from './ChatListPopUp/ChatListPopUp'

/* ------------- Types ------------- */
interface ChatWindowProps {
  authProfileId: number
  authProfilePhoto: string
  dialogs: DialogType[]
  messages: {[id: number]: MessageType[]}
  openedDialogs: DialogType[]
  setOpenedDialogs:  React.Dispatch<React.SetStateAction<DialogType[]>>
  fetchMessagesPending: number[]
  fetchChatMessagesStatus: StatusType
  sendMessage: (userId: number, messageBody: string) => void
  sendChatMessage: (message: string) => void
}

/* ------------- Component ------------- */
const ChatWindow: React.FC<ChatWindowProps> = ({ 
   authProfileId,
   authProfilePhoto,
   dialogs,
   messages,
   setOpenedDialogs,
   openedDialogs,
   fetchMessagesPending,
   fetchChatMessagesStatus,
   sendMessage,
   sendChatMessage,
 }) => {
  const [isVisible, setIsVisible] = useState(false)

  const onChatListClickHandler = () => setIsVisible((prev) => !prev)

  const ActiveChats = openedDialogs.map((dialog) => {
    const isChatId = dialog.id === 9999999
    const sendMessageCallBack = isChatId ? sendChatMessage : sendMessage.bind(null, dialog.id)
    return (
      <ActiveChatPopUp
        key={dialog.id}
        messages={messages[dialog.id] || []}
        openedDialog={dialog}
        setOpenedDialogs={setOpenedDialogs}
        authProfileId={authProfileId} 
        authProfilePhoto={authProfilePhoto} 
        fetchMessagesPending={fetchMessagesPending}
        fetchChatMessagesStatus={fetchChatMessagesStatus}
        sendMessage={sendMessageCallBack}
      />)
    })

  return (
    <>
      {ActiveChats}
      <div className={cl.chatListBtn} onClick={onChatListClickHandler}>
        {isVisible ? (<CrossSvg/>) : (<MessengerSvg/>)}
        <span>Chat list</span>
      </div>
      <WithDragging isVisible={isVisible} setIsVisible={setIsVisible} >
        <ChatListPopUp
          dialogs={dialogs}
          setOpenedDialogs={setOpenedDialogs}
          onChatListClickHandler={onChatListClickHandler}
        />
      </WithDragging>
    </>
  )
}

export default ChatWindow

