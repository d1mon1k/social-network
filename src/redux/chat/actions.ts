import { MessageType } from "../messenger/types";
import { ChatConstants, StatusType } from "./types";

/* ------------- Types ------------- */
export interface SetMessages extends ReturnType<typeof setMessages> {}
export interface SetStatus extends ReturnType<typeof setStatus> {}
export interface ClearMessagesState extends ReturnType<typeof clearMessagesState> {}

export type ChatAction = 
  | SetMessages
  | SetStatus
  | ClearMessagesState

/* ------------- Actions ------------- */
export const setMessages = (messages: MessageType[]) => {
  return <const>{ type: ChatConstants.SET_MESSAGES , payload: messages }
}

export const setStatus = (status: StatusType) => {
  return <const>{ type: ChatConstants.SET_STATUS, payload: status }
}

export const clearMessagesState = () => {
  return <const>{ type: ChatConstants.CLEAR_MESSAGES_STATE }
}