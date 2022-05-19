import { DialogsConstants, DialogType, MessageType } from "./types"

export interface FetchDialogsRequest extends ReturnType<typeof fetchDialogsRequest> {}
export interface FetchDialogsSuccess extends ReturnType<typeof fetchDialogsSuccess> {}
export interface FetchDialogsFailure extends ReturnType<typeof fetchDialogsFailure> {}
export interface FetchMessagesRequest extends ReturnType<typeof fetchMessagesRequest> {}
export interface FetchMessagesSuccess extends ReturnType<typeof fetchMessagesSuccess> {}
export interface FetchMessagesFailure extends ReturnType<typeof fetchMessagesFailure> {}

export type DialogsAction =
  | FetchDialogsRequest
  | FetchDialogsSuccess
  | FetchDialogsFailure
  | FetchMessagesRequest
  | FetchMessagesSuccess
  | FetchMessagesFailure

export const fetchDialogsRequest = () => {
  return <const>{ type: DialogsConstants.FETCH_DIALOGS_REQUEST }
}

export const fetchDialogsSuccess = (dialogs: DialogType[]) => {
  return <const>{ type: DialogsConstants.FETCH_DIALOGS_SUCCESS, payload: dialogs }
}

export const fetchDialogsFailure = (error: string) => {
  return <const>{ type: DialogsConstants.FETCH_DIALOGS_FAILURE, payload: error }
}

export const fetchMessagesRequest = () => {
  return <const>{ type: DialogsConstants.FETCH_MESSAGES_REQUEST }
}

export const fetchMessagesSuccess = (messages: MessageType[]) => {
  return <const>{ type: DialogsConstants.FETCH_MESSAGES_SUCCESS, payload: messages }
}

export const fetchMessagesFailure = (error: string) => {
  return <const>{ type: DialogsConstants.FETCH_MESSAGES_FAILURE, payload: error }
}

