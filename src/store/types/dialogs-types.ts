export interface DialogsStore {
  messages: { id: number, text: string }[],
  newMessage: string,
  dialogs: { id: number, name: string, lastMessage: string, time: number, counter: number }[]
}

export enum DialogsActionTypes {
  SET_MESSAGES = 'SET_MESSAGES',
  SET_NEW_MESSAGE = 'SET_NEW_MESSAGE',
}

interface SetNewMessage {
  type: DialogsActionTypes.SET_NEW_MESSAGE
  payload: string
}

interface SetMessages {
  type: DialogsActionTypes.SET_MESSAGES
}

export type DialogsAction = 
  SetNewMessage
  | SetMessages

