import { DialogsConstants, DialogType, MessageType } from "./types"

export interface FetchDialogsRequest extends ReturnType<typeof fetchDialogsRequest> {}
export interface FetchDialogsSuccess extends ReturnType<typeof fetchDialogsSuccess> {}
export interface FetchDialogsFailure extends ReturnType<typeof fetchDialogsFailure> {}
export interface FetchMessagesRequest extends ReturnType<typeof fetchMessagesRequest> {}
export interface FetchMessagesSuccess extends ReturnType<typeof fetchMessagesSuccess> {}
export interface FetchMessagesFailure extends ReturnType<typeof fetchMessagesFailure> {}
export interface SendMessageRequest extends ReturnType<typeof sendMessageRequest> {} 
export interface SendMessageSuccess extends ReturnType<typeof sendMessageSuccess> {} 
export interface SendMessageFailure extends ReturnType<typeof sendMessageFailure> {} 
export interface CreateDialogRequest extends ReturnType<typeof createDialogRequest> {}
export interface CreateDialogSuccess extends ReturnType<typeof createDialogSuccess> {}
export interface CreateDialogFailure extends ReturnType<typeof createDialogFailure> {}
export interface ClearMessagesState extends ReturnType<typeof clearMessagesState> {}

export type DialogsAction =
  | FetchDialogsRequest
  | FetchDialogsSuccess
  | FetchDialogsFailure
  | FetchMessagesRequest
  | FetchMessagesSuccess
  | FetchMessagesFailure
  | ClearMessagesState
  | SendMessageRequest
  | SendMessageSuccess
  | SendMessageFailure
  | CreateDialogRequest
  | CreateDialogSuccess
  | CreateDialogFailure

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

export const fetchMessagesSuccess = (payload: {id: number, messages: MessageType[]}) => {
  return <const>{ type: DialogsConstants.FETCH_MESSAGES_SUCCESS, payload }
}

export const fetchMessagesFailure = (error: string) => {
  return <const>{ type: DialogsConstants.FETCH_MESSAGES_FAILURE, payload: error }
}

export const clearMessagesState = () => {
  return <const>{ type: DialogsConstants.CLEAR_MESSAGES_STATE }
}

export const sendMessageRequest = () => {
  return <const>{ type: DialogsConstants.SEND_MESSAGE_REQUEST }
}

export const sendMessageSuccess = () => {
  return <const>{ type: DialogsConstants.SEND_MESSAGE_SUCCESS }
}

export const sendMessageFailure = (error: string) => {
  return <const>{ type: DialogsConstants.SEND_MESSAGE_FAILURE, payload: error }
}

export const createDialogRequest = () => {
  return <const>{ type: DialogsConstants.CREATE_DIALOG_REQUEST }
}

export const createDialogSuccess = () => {
  return <const>{ type: DialogsConstants.CREATE_DIALOG_SUCCESS }
}

export const createDialogFailure = (error: string) => {
  return <const>{ type: DialogsConstants.CREATE_DIALOG_FAILURE, payload: error}
}

