import { ChatMessageType } from "../redux/chat/types"

/* ------------- Types ------------- */
type SubscriberType = (messages: ChatMessageType[]) => void

/* ------------- Api ------------- */
let subscribers = [] as SubscriberType[]
let ws: WebSocket | null = null

const handleCloseWebSocket = () => {
  setTimeout(() => createWebSocket, 3000)
}

const messageListener = (e: any) => {
  const newMessages = JSON.parse(e.data)
  subscribers.forEach(s => s(newMessages))
}

export const createWebSocket = () => {
  ws?.removeEventListener('close', handleCloseWebSocket)
  ws?.removeEventListener('message', messageListener)
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  ws?.addEventListener('close', handleCloseWebSocket)
  ws?.addEventListener('message', messageListener)
}

/* -------------  ------------- */

export const subscribe = (callback: SubscriberType) => {
  subscribers.push(callback)
  // return () => {
  //   subscribers = subscribers.filter(s => s !== callback)
  // }
}

export const unsubscribe = (callback: SubscriberType) => {
  subscribers = subscribers.filter(s => s !== callback)
}

export const sendMessage = (message: string) => {
  ws?.send(message)
}