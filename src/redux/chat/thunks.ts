import { subscribe, unsubscribe, sendMessage, createWebSocket } from "../../api/chat"
import { AppDispatch } from "../store"
import { setMessages } from "./actions"
import { ChatMessageType } from "./types"

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: AppDispatch) => {
  if(_newMessageHandler === null) {
    _newMessageHandler = (messages: ChatMessageType[]) => {
      dispatch(setMessages(messages))
    }
  }
  
  return _newMessageHandler
}

export const startMessagesListeningThunk = () => {
  createWebSocket()
  return async ( dispatch: AppDispatch ) => {
    subscribe(newMessageHandlerCreator(dispatch))
  }
}

export const stopMessagesListeningThunk = () => {
  return async ( dispatch: AppDispatch ) => {
    unsubscribe(newMessageHandlerCreator(dispatch))
  }
}

export const sendChatMessageThunk = (message: string) => {
  return async( dispatch: AppDispatch ) => {
    sendMessage(message)
  }
}