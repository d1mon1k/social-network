import { CrossSvg, MessengerSvg, SearchSvg } from '../../helpers/icons/icons'
import cl from './ChatListPopUp.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import { DialogType, MessageType } from '../../redux/messenger/types'
import ActiveChatPopUp from './ActiveChatPopUp/ActiveChatPopUp'
import ChatListPopUpItem from './ChatListPopUpItem/ChatListPopUpItem'
import { WithDragging } from '../hoc/withDragging/withDragging'

/* ------------- Types ------------- */
interface ChatListPopUpProps {
  dialogs: DialogType[]
  messages: {[id: number]: MessageType[]}
  interlocutorId: number | undefined
  authProfileId: number
  authProfilePhoto: string
  setOpenedDialogs:  React.Dispatch<React.SetStateAction<DialogType[]>>
  currentDialog: DialogType[]
  fetchMessagesPending: number[]
  clearMessagesState: () => void
}

/* ------------- Component ------------- */
const ChatListPopUp: React.FC<ChatListPopUpProps> = ({ 
   dialogs,
   messages,
   interlocutorId,
   authProfileId,
   authProfilePhoto,
   setOpenedDialogs,
   currentDialog,
   fetchMessagesPending,
   clearMessagesState,
 }) => {
  const [isVisible, setIsVisible] = useState(false)

  const onChatListClickHandler = () => {
    setIsVisible((prev) => !prev)
  }

  return (
    <>
      {currentDialog.map((dialog) => {
        return <ActiveChatPopUp
          key={dialog.id}
          dialogs={dialogs}
          messages={messages[dialog.id] || []}
          openedDialog={dialog}
          setOpenedDialogs={setOpenedDialogs}
          interlocutorId={dialog.id}
          authProfileId={authProfileId}
          authProfilePhoto={authProfilePhoto}
          activeClass={cl.activeDraggingBlock}
          fetchMessagesPending={fetchMessagesPending}
          clearMessagesState={clearMessagesState}
        />
      })}
      <div className={cl.chatListBtn} onClick={onChatListClickHandler}>
        {isVisible ? (<CrossSvg/>) : (<MessengerSvg/>)}
        <span>Chat list</span>
      </div>
      <WithDragging
        activeClass={cl.activeDraggingBlock}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      >
        <ChatWindow 
          dialogs={dialogs}
          setOpenedDialogs={setOpenedDialogs}
          onChatListClickHandler={onChatListClickHandler}
        />
      </WithDragging>
    </>
  )
}

export default ChatListPopUp

interface ChatWindowProps {
  setOpenedDialogs: React.Dispatch<React.SetStateAction<DialogType[]>>
  dialogs: DialogType[]
  onChatListClickHandler: () => void
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  setOpenedDialogs,
  dialogs,
  onChatListClickHandler
}) => {
  return (
    <>
      <section className={cl.chatWindow}>
          <header className={cl.header}>
            <span>Chats</span>
            <CrossSvg onClick={onChatListClickHandler}/>
          </header>
          <main className={cl.list}>
            {dialogs.map((dialog) => {
              return (
                <ChatListPopUpItem 
                  key={dialog.id}
                  dialogItem={dialog}
                  setCurrentDialog={setOpenedDialogs}
                />
              )
            })}
          </main>
          <footer className={cl.footer}>
            <SearchSvg />
            <input placeholder={'Search'} className={cl.searchInput} type="text" />
          </footer>
        </section>
    </>
  )
}