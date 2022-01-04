import { AnyAction } from "redux"

const SET_MESSAGES = 'SET_MESSAGES'
const SET_NEW_MESSAGE = 'SET_NEW_MESSAGE'

export interface DialogsReducer {
  messages: {id: number, message: string}[],
  newMessage: string,
  dialogs: {id: number, name: string}[]
}

const initialState: DialogsReducer = {
  messages: [
    {
      id: 1,
      message: 'Lorem ipsum dolor sit adipisicing elit. Molestiae, quos!',
    },
    {
      id: 2,
      message: 'Lorem ipsum dolor sit amet, consectetur, quos!',
    },
    {
      id: 3,
      message: 'Lorem ipsum dolor sit amet, consectetur',
    },
    {
      id: 4,
      message:
        'Lorem  dolor sit amet, consectetur adipisicing elit. Molestiae, quos!',
    },
    {
      id: 5,
      message: 'Ipsam et asperiores et occaecati vero.',
    },
    {
      id: 6,
      message: 'eum amet et',
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

export const dialogsReducer = (state: DialogsReducer = initialState, action: AnyAction): DialogsReducer => {
  switch (action.type) {
    case SET_NEW_MESSAGE:
      return {
        ...state,
        newMessage: action.message,
      }

    case SET_MESSAGES:
      const newMessage = {
        id: Date.now(),
        message: state.newMessage,
      }
      return {
        ...state,
        messages: [...state.messages, newMessage],
        newMessage: '',
      }

    default:
      return state
  }
}

export const setMessagesActionCreator = () => {
  return { type: SET_MESSAGES }
}

export const setNewMessageActionCreator = (message: string) => {
  return {
    type: SET_NEW_MESSAGE,
    message: message,
  }
}
