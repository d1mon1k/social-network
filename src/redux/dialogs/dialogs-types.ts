export interface DialogsStore {
  messages: { id: number, text: string }[],
  dialogs: { id: number, name: string, lastMessage: string, time: number, counter: number }[]
}

export enum DialogsActionTypes {
  SET_MESSAGES = 'SET_MESSAGES',
  SET_NEW_MESSAGE = 'SET_NEW_MESSAGE',
}

interface SetMessages {
  type: DialogsActionTypes.SET_MESSAGES
  payload: string
}

export type DialogsAction = SetMessages

