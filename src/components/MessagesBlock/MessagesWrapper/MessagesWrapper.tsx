import { useRef, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { ChatSvg } from '../../../helpers/icons/icons'
import { StatusType } from '../../../redux/chat/types'
import { DialogType, MessageType } from '../../../redux/messenger/types'
import MessagesList from '../MessagesList/MessagesList'
import cl from './MessagesWrapper.module.scss'

/* ------------- Types ------------- */
interface MessengerWrapperProps {
  pathName?: string
  interlocutorId: number
  authProfilePhoto: string
  dialogs: DialogType[]
  dialogMessages: MessageType[]
  authProfileId: number
  chatMessages?: MessageType[]
  isDialogSelected?: boolean
  isWebSocketChatSelected?: boolean
  fetchMessagesPending: number[]
  fetchChatMessagesStatus?: StatusType
}

export const MessagesWrapper: React.FC<MessengerWrapperProps> = ({
  pathName,
  authProfileId,
  isWebSocketChatSelected,
  isDialogSelected,
  interlocutorId,
  authProfilePhoto,
  dialogs,
  dialogMessages,
  chatMessages,
  fetchChatMessagesStatus,
  fetchMessagesPending,
}) => {
  const [isAutoScroll, setIsAutoScroll] = useState(true)
  const messages = isWebSocketChatSelected ? chatMessages : dialogMessages //bug поднять выше это выражение
  const messagesLength = messages!.length

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const scrollHeight = e.currentTarget.scrollHeight
    const scrollTop = e.currentTarget.scrollTop + e.currentTarget.clientHeight
    const difference = scrollHeight - scrollTop
    ;difference > 500 ? (isAutoScroll && setIsAutoScroll(false)) : (!isAutoScroll && setIsAutoScroll(true))
  }

  return (
    <div className={cl.messagesWrapper} onScroll={handleScroll}>
      {!fetchMessagesPending && ( //bug - it doesn't work as expected
        <EmptyChatPlaceholder
          isDialogSelected={isDialogSelected || true}
          messagesLength={messagesLength}
        />
      )}
      {pathName ? (
        <Outlet //MessagesList
          context={{
            isWebSocketChatSelected, //bug extra!
            interlocutorId, //bug current dialog
            dialogs, //bug current dialog
            authProfileId,
            authProfilePhoto,
            isAutoScroll,
            messages,
            fetchMessagesPending,
            fetchChatMessagesStatus, //bug extra?
          }}
        />
      ) : (
        <>
          <MessagesList
            isWebSocketChatSelected={isWebSocketChatSelected} //bug extra!
            interlocutorId={interlocutorId!} //bug current dialog
            dialogs={dialogs} //bug current dialog
            authProfileId={authProfileId}
            authProfilePhoto={authProfilePhoto}
            isAutoScroll={isAutoScroll}
            messages={dialogMessages}
            fetchMessagesPending={fetchMessagesPending}
            fetchChatMessagesStatus={fetchChatMessagesStatus} //bug extra?
          />
        </>
      )}
    </div>
  )
}

export default MessagesWrapper

/* ------------- Nested components ------------- */
interface EmptyChatPlaceholderProps {
  messagesLength: number | null
  isDialogSelected: boolean | null
}

const EmptyChatPlaceholder: React.FC<EmptyChatPlaceholderProps> = ({
  messagesLength,
  isDialogSelected
}) => {
  const tip =
    isDialogSelected === false
      ? 'Select a chat'
      : 'You can write your first message'

  return (
    <>
      {(messagesLength === 0 || isDialogSelected === false) && (
        <div className={cl.emptyChatPlaceholder}>
          <div>
            <ChatSvg />
          </div>
          <div>{tip}</div>
        </div>
      )}
    </>
  )
}