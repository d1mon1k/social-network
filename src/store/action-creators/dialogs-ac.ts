import { DialogsAction, DialogsActionTypes } from './../types/dialogs-types';

export const setMessages = (): DialogsAction => {
  return { type: DialogsActionTypes.SET_MESSAGES }
}

export const setNewMessage = (message: string): DialogsAction => {
  return {
    type: DialogsActionTypes.SET_NEW_MESSAGE,
    payload: message,
  }
}