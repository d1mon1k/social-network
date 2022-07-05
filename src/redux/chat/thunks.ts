import { subscribeOnEvent, unsubscribeOnEvent, sendMessage, createWebSocket } from "../../api/chat"
import { MessageType } from "../messenger/types"
import { AppDispatch } from "../store"
import { clearMessagesState, setMessages, setStatus } from "./actions"
import { StatusType } from "./types"

let _newMessageHandler: ((messages: MessageType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: AppDispatch) => {
  if(_newMessageHandler === null) {
    _newMessageHandler = (messages: MessageType[]) => {
      dispatch(setMessages(messages))
    }
  }
  return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void ) | null = null
const statusChangedHandlerCreator = (dispatch: AppDispatch) => {
  if(_statusChangedHandler === null) {
    _statusChangedHandler = (status: StatusType) => {
      dispatch(setStatus(status))
    }
  }
  return _statusChangedHandler
}

export const startMessagesListeningThunk = () => {
  createWebSocket()
  return async ( dispatch: AppDispatch ) => {
    dispatch(clearMessagesState())
    subscribeOnEvent('messages-received', newMessageHandlerCreator(dispatch))
    subscribeOnEvent('status-changed', statusChangedHandlerCreator(dispatch))
  }
}

export const stopMessagesListeningThunk = () => {
  return async ( dispatch: AppDispatch ) => {
    unsubscribeOnEvent('messages-received', newMessageHandlerCreator(dispatch))
    unsubscribeOnEvent('status-changed', statusChangedHandlerCreator(dispatch))
  }
}

export const sendChatMessageThunk = (message: string) => {
  return async( dispatch: AppDispatch ) => {
    sendMessage(message)
  }
}