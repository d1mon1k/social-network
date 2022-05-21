import { useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { ChatMessageType } from '../../components/MessagesBlock/MessagesBlock'
import { Message } from '../../components/MessagesBlock/MessagesList/Message/Message'
import { convertDateFormat } from '../../helpers/helpers'
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

  const conversationWrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const newMessageListener = (e: any) => {
      setChatMessages(prev => [...prev, ...JSON.parse(e.data)])
    }
    if(isChatSelected) {
      console.log('count')
      webSocketChannel.addEventListener('message', newMessageListener)
    }

    return () => {
      webSocketChannel.removeEventListener('message', newMessageListener)
    }
  }, [pathName])
  
  // useEffect(() => {
  //   conversationWrapper.current?.scrollTo(0, 99999)
  // }, [dialogsPage.messages])

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
