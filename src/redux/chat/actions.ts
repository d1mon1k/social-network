import { ChatConstants, ChatMessageType } from "./types";

export interface SetMessages extends ReturnType<typeof setMessages> {}

export type ChatAction = 
  | SetMessages

export const setMessages = (messages: ChatMessageType[]) => {
  return <const>{ type: ChatConstants.SET_MESSAGES , payload: messages }
}