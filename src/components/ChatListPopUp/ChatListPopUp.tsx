import { CrossSvg, MessengerSvg, SearchSvg } from '../../helpers/icons/icons'
import cl from './ChatListPopUp.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import { DialogType, MessageType } from '../../redux/messenger/types'
import ActiveChatPopUp from './ActiveChatPopUp/ActiveChatPopUp'
import ChatListPopUpItem from './ChatListPopUpItem/ChatListPopUpItem'
import { InjectedProps, WithDragging } from '../../helpers/hooks/withDragging'

/* ------------- Types ------------- */
interface ChatListPopUpProps {
  dialogs: DialogType[]
  messages: MessageType[]
  interlocutorId: number | undefined
  authProfileId: number
  authProfilePhoto: string
  setCurrentDialog: React.Dispatch<React.SetStateAction<DialogType | null>>
  currentDialog: DialogType | null
  fetchMessagesPending: boolean
  clearMessagesState: () => void
}

/* ------------- Component ------------- */
const ChatListPopUp: React.FC<ChatListPopUpProps> = ({ 
   dialogs,
   messages,
   interlocutorId,
   authProfileId,
   authProfilePhoto,
   setCurrentDialog,
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
      {currentDialog && (
        <ActiveChatPopUp
          dialogs={dialogs}
          messages={messages}
          currentDialog={currentDialog!}
          interlocutorId={interlocutorId}
          authProfileId={authProfileId}
          authProfilePhoto={authProfilePhoto}
          fetchMessagesPending={fetchMessagesPending}
          clearMessagesState={clearMessagesState}
        />
      )}
      <div className={cl.chatListBtn} onClick={onChatListClickHandler}>
        {isVisible ? (<CrossSvg/>) : (<MessengerSvg/>)}
        <span>Chat list</span>
      </div>
      <WithDragging
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      >
        <ChatWindow 
          dialogs={dialogs}
          setCurrentDialog={setCurrentDialog}
          onChatListClickHandler={onChatListClickHandler}
        />
      </WithDragging>
    </>
  )
}

export default ChatListPopUp

interface ChatWindowProps {
  setCurrentDialog: React.Dispatch<React.SetStateAction<DialogType | null>>
  dialogs: DialogType[]
  onChatListClickHandler: () => void
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  setCurrentDialog,
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
                  setCurrentDialog={setCurrentDialog}
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