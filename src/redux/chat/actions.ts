import { MessageType } from "../messenger/types";
import { ChatConstants, ChatMessageType, StatusType } from "./types";

export interface SetMessages extends ReturnType<typeof setMessages> {}
export interface SetStatus extends ReturnType<typeof setStatus> {}

export type ChatAction = 
  | SetMessages
  | SetStatus

export const setMessages = (messages: MessageType[]) => {
  return <const>{ type: ChatConstants.SET_MESSAGES , payload: messages }
}

export const setStatus = (status: StatusType) => {
  return <const>{ type: ChatConstants.SET_STATUS, payload: status }
}