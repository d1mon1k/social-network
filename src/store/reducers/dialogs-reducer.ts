import { DialogsStore, DialogsAction } from './../types/dialogs-types';
import { DialogsActionTypes } from "../types/dialogs-types"

const initialState: DialogsStore = {
  messages: [
    {
      id: 1,
      text: 'Lorem ipsum dolor sit adipisicing elit. Molestiae, quos!',
    },
    {
      id: 2,
      text: 'Lorem ipsum dolor sit amet, consectetur, quos!',
    },
    {
      id: 3,
      text: 'Lorem ipsum dolor sit amet, consectetur',
    },
    {
      id: 4,
      text:
        'Lorem  dolor sit amet, consectetur adipisicing elit. Molestiae, quos!',
    },
    {
      id: 5,
      text: 'Ipsam et asperiores et occaecati vero.',
    },
    {
      id: 6,
      text: 'eum amet et',
    },
  ],
  newMessage: 'new qwe',
  dialogs: [
    {
      id: 1,
      name: 'Ora',
    },
    {
      id: 2,
      name: 'Tyshawn',
    },
    {
      id: 3,
      name: 'Janick',
    },
    {
      id: 4,
      name: 'General',
    },
    {
      id: 5,
      name: 'Raleigh',
    },
    {
      id: 6,
      name: 'Arno',
    },
    {
      id: 7,
      name: 'Roy',
    },
    {
      id: 8,
      name: 'Emilie',
    },
  ],
}

export const dialogsReducer = (state: DialogsStore = initialState, action: DialogsAction): DialogsStore => {
  switch (action.type) {
    case DialogsActionTypes.SET_NEW_MESSAGE:
      return { ...state, newMessage: action.payload, }
    case DialogsActionTypes.SET_MESSAGES:
      const newMessage = { id: Date.now(), text: state.newMessage, } //Bug SideEffect cannot be in reducer
      return { ...state, messages: [...state.messages, newMessage], newMessage: '', }
    default:
      return state
  }
}


