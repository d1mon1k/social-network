import { DialogsAction, DialogsActionTypes } from './../types/dialogs-types';

export const setMessagesActionCreator = (): DialogsAction => {
  return { type: DialogsActionTypes.SET_MESSAGES }
}

export const setNewMessageActionCreator = (message: string): DialogsAction => {
  return {
    type: DialogsActionTypes.SET_NEW_MESSAGE,
    payload: message,
  }
}