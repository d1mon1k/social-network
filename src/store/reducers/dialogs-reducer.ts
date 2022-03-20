import { DialogsStore, DialogsAction } from '../types/dialogs-types';
import { DialogsActionTypes } from "../types/dialogs-types"

const nextTodoId = (todos: any[]) => {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
} // function from redux tutorial

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
  dialogs: [
    {
      id: 1,
      name: 'Ora Berge',
      lastMessage: 'Delectus et maiores quo facere.',
      counter: 1,
      time: 1642458862858,
    },
    {
      id: 2,
      name: 'Tyshawn Bergnaum',
      lastMessage: 'Perspiciatis reprehenderit dolore illum quas fugit incidunt sed itaque.',
      counter: 2,
      time: 1642458862858,
    },
    {
      id: 3,
      name: 'Janick Koelpin',
      lastMessage: 'Molestiae impedit rerum deleniti voluptatem quia assumenda non.',
      counter: 2,
      time: 1642458819721,
    },
    {
      id: 4,
      name: 'General Hamill',
      lastMessage: 'Temporibus molestiae temporibus fugit quo assumenda sint et sed cum.',
      counter: 2,
      time: 1642458819721,
    },
    {
      id: 5,
      name: 'Raleigh Renner',
      lastMessage: 'Et rem dolore saepe occaecati omnis.',
      counter: 2,
      time: 1642458819721,
    },
    {
      id: 6,
      name: 'Arno Abbott',
      lastMessage: 'Consequatur assumenda nam velit et quisquam autem.',
      counter: 3,
      time: 1642458819721,
    },
    {
      id: 7,
      name: 'Roy Cartwright',
      lastMessage: 'Illum reiciendis sint non eum eveniet voluptatem.',
      counter: 0,
      time: 1642458819721,
    },
    {
      id: 8,
      name: 'Emilie Schaefer',
      lastMessage: 'Est quis excepturi neque sunt.',
      counter: 0,
      time: 1642458819721,
    },
  ],
}

export const dialogsReducer = (state: DialogsStore = initialState, action: DialogsAction): DialogsStore => {
  switch (action.type) {
    case DialogsActionTypes.SET_MESSAGES:
      const newMessage = { id: nextTodoId(state.messages), text: action.payload, }
      return { ...state, messages: [...state.messages, newMessage] }
    default:
      return state
  }
}


