import { useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Message } from '../../components/MessagesBlock/MessagesList/Message/Message'
import { convertDateFormat } from '../../helpers/helpers'
import { ChatMessageType } from '../../redux/chat/types'
import cl from './Chat.module.scss'


/* ------------- Types ------------- */
interface OutletContextType {
  chatMessages: ChatMessageType[]
  isChatSelected: boolean
  setChatMessages: React.Dispatch<React.SetStateAction<[] | ChatMessageType[]>>
  pathName: string
  webSocketChannel: WebSocket
}

/* ------------- Component ------------- */
const Chat = () => {
  const { chatMessages , isChatSelected, setChatMessages, pathName, webSocketChannel } = useOutletContext<OutletContextType>()

  // useEffect(() => {
  //   const newMessageListener = (e: any) => {
  //     setChatMessages(prev => [...prev, ...JSON.parse(e.data)])
  //   }
  //   if(isChatSelected) {
  //     webSocketChannel?.removeEventListener('message', newMessageListener)
  //     webSocketChannel?.addEventListener('message', newMessageListener)
  //   }

  //   return () => {
  //     webSocketChannel?.removeEventListener('message', newMessageListener)
  //   }
  // }, [webSocketChannel])

  return (
    <ul className={cl.messages}>
      {chatMessages.map((messageObj, i) => {
        return <Message
          key={i}
          message={messageObj.message}
          name={messageObj.userName}
          photo={messageObj.photo}
          time={convertDateFormat("2022-05-20T23:06:26.437", false)}
          userId={messageObj.userId}
        />
      })}
    </ul>
  )
}

export default Chat
