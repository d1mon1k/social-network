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
  dialogsMessages: {[id: number]: MessageType[]}
  chatMessages: MessageType[]
  openedDialogs: DialogType[]
  setOpenedDialogs:  React.Dispatch<React.SetStateAction<DialogType[]>>
  fetchMessagesPending: number[]
  fetchChatMessagesStatus: StatusType
  sendMessage: (userId: number, messageBody: string) => void
  sendChatMessage: (message: string) => void
  clearMessagesState: () => void
}

/* ------------- Component ------------- */
const ChatWindow: React.FC<ChatWindowProps> = ({ 
   authProfileId,
   authProfilePhoto,
   dialogs,
   dialogsMessages,
   chatMessages,
   setOpenedDialogs,
   openedDialogs,
   fetchMessagesPending,
   fetchChatMessagesStatus,
   clearMessagesState,
   sendMessage,
   sendChatMessage,
 }) => {
  const [isVisible, setIsVisible] = useState(false)

  const onChatListClickHandler = () => setIsVisible((prev) => !prev)

  const ActiveChats = openedDialogs.map((dialog) => (
    <ActiveChatPopUp
      key={dialog.id}
      dialogs={dialogs}
      messages={dialogsMessages[dialog.id] || []}
      openedDialog={dialog}
      setOpenedDialogs={setOpenedDialogs}
      interlocutorId={dialog.id}
      authProfileId={authProfileId}
      authProfilePhoto={authProfilePhoto}
      activeClass={cl.activeDraggingBlock}
      fetchMessagesPending={fetchMessagesPending}
      sendMessage={sendMessage}
      clearMessagesState={clearMessagesState}
    />
  ))

  return (
    <>
      {ActiveChats}
      <div className={cl.chatListBtn} onClick={onChatListClickHandler}>
        {isVisible ? (<CrossSvg/>) : (<MessengerSvg/>)}
        <span>Chat list</span>
      </div>
      <WithDragging activeClass={cl.activeDraggingBlock} isVisible={isVisible} setIsVisible={setIsVisible} >
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

