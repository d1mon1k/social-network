import { ChatMessageType, StatusType } from "../redux/chat/types"
import { MessageType } from "../redux/messenger/types"
import { v4 as uuidv4 } from 'uuid';

/* ------------- Types ------------- */
type MessagesReceivedSubscriberType = (messages: MessageType[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void
type EventsNamesType = 'messages-received' | 'status-changed'

/* ------------- Api ------------- */
let ws: WebSocket | null = null
let subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[]
}

const notifySubscribersAboutStatus = (status: StatusType) => {
  subscribers['status-changed'].forEach(subscriber => subscriber(status))
}

const cleanUpListeners = () => {
  ws?.removeEventListener('close', handleCloseWebSocket)
  ws?.removeEventListener('message', handleReceivingMessages)
  ws?.removeEventListener('open', handleOpenWebSocket)
  ws?.removeEventListener('error', handleWebSocketError)
}

const handleCloseWebSocket = () => {
  notifySubscribersAboutStatus('pending')
  setTimeout(() => createWebSocket(), 3000)
}

const handleOpenWebSocket = () => {
  notifySubscribersAboutStatus('ready')
}

const handleWebSocketError = () => {
  notifySubscribersAboutStatus('error')
  console.log('REFRESH PAGE')
}

const handleReceivingMessages = (e: {data: string}) => {
  const newMessages: ChatMessageType[] = JSON.parse(e.data)
  const convertedMessages: MessageType[] = newMessages.map((message, i) => {
    return {
      id: `${uuidv4()}`,
      body: message.message,
      senderName: message.userName,
      senderId: message.userId,
      addedAt: "2022-05-20T23:06:26.437",
      photo: message.photo
    }
  })
  subscribers["messages-received"].forEach(subscriber => subscriber(convertedMessages))
}

export const createWebSocket = () => {
  cleanUpListeners()
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  notifySubscribersAboutStatus('pending')
  ws.addEventListener('open', handleOpenWebSocket)
  ws.addEventListener('close', handleCloseWebSocket)
  ws.addEventListener('error', handleWebSocketError)
  ws.addEventListener('message', handleReceivingMessages)
}

export const subscribeOnEvent = (eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) => {
  //@ts-ignore
  subscribers[eventName].push(callback)
}

export const unsubscribeOnEvent = (eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) => {
  //@ts-ignore
  subscribers[eventName] = subscribers[eventName].filter(subscriber => subscriber !== callback)
} 

export const sendMessage = (message: string) => ws?.send(message)