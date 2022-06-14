import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { StatusType } from '../../../redux/chat/types'
import { DialogType, MessageType } from '../../../redux/messenger/types'
import EmptyChatPlaceholder from '../../EmptyChatPlaceholder/EmptyChatPlaceholder'
import MessagesList from '../MessagesList/MessagesList'
import cl from './MessagesWrapper.module.scss'

/* ------------- Types ------------- */
interface MessengerWrapperProps {
  pathName?: string
  isDialogSelected?: boolean
  authProfilePhoto: string
  currentDialog: DialogType
  messages: MessageType[]
  authProfileId: number
  fetchMessagesPending: number[]
  fetchChatMessagesStatus: StatusType
}

/* ------------- Component ------------- */
export const MessagesWrapper: React.FC<MessengerWrapperProps> = ({
  pathName,
  authProfileId,
  authProfilePhoto,
  isDialogSelected,
  currentDialog,
  messages,
  fetchChatMessagesStatus,
  fetchMessagesPending,
}) => {
  const [isAutoScroll, setIsAutoScroll] = useState(true)
  const messagesLength = messages!.length
  const currentDialogId = (currentDialog && currentDialog.id) || null

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const scrollHeight = e.currentTarget.scrollHeight
    const scrollTop = e.currentTarget.scrollTop + e.currentTarget.clientHeight
    const difference = scrollHeight - scrollTop
    ;difference > 500 ? (isAutoScroll && setIsAutoScroll(false)) : (!isAutoScroll && setIsAutoScroll(true))
  }

  return (
    <div className={cl.messagesWrapper} onScroll={handleScroll}>
      {fetchMessagesPending.every(id => id !== currentDialogId) && (
        <EmptyChatPlaceholder
          isDialogSelected={isDialogSelected}
          messagesLength={messagesLength}
        />
      )}
      {pathName ? (
        <Outlet //MessagesList
          context={{
            currentDialog,
            authProfileId,
            authProfilePhoto,
            isAutoScroll,
            messages,
            fetchMessagesPending,
            fetchChatMessagesStatus, 
          }}
        />
      ) : (
        <MessagesList
          currentDialog={currentDialog}
          authProfileId={authProfileId}
          authProfilePhoto={authProfilePhoto}
          isAutoScroll={isAutoScroll}
          messages={messages}
          fetchMessagesPending={fetchMessagesPending}
          fetchChatMessagesStatus={fetchChatMessagesStatus} 
        />
      )}
    </div>
  )
}

export default MessagesWrapper

