import { DialogsAction, DialogsActionTypes } from './dialogs-types';

export const setMessages = (message: string): DialogsAction => {
  return { type: DialogsActionTypes.SET_MESSAGES, payload: message }
}

// export const setNewMessage = (message: string): DialogsAction => {
//   return {
//     type: DialogsActionTypes.SET_NEW_MESSAGE,
//     payload: message,
//   }
// }