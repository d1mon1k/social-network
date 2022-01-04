import { AnyAction } from "redux"

const SET_POSTS = 'SET_POSTS'
const SET_NEW_POST = 'SET_NEW_POST'

interface ProfileReducer {
  posts: {id: number, message: string}[],
  newPost: string
}

const initialState: ProfileReducer = {
  posts: [
    {
      id: 0,
      message:
        'Numquam officia sint. Ut molestias eligendi. Rerum vero vero dolor optio dolorum qui vero mollitia quae. Molestias ducimus repellat quo eos. In voluptatibus nobis expedita adipisci reiciendis quibusdam aliquid quod. Vero quia vel quas quam quos reprehenderit.',
    },
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
  ],
  newPost: 'Sasha is cute',
}

export const profileReducer = (state = initialState, action: AnyAction): ProfileReducer => {
  switch (action.type) {
    case SET_NEW_POST:
      //note Здесь был крутой рефакторинг.. Зачем нам создавать stateCopy = {...}, если мы можем сразу вернуть готовый объект. Конечно же соблюдая концепции имутабельности, т.е копировать ГЛУБОКО объекты или массивы , если собираемся с ними работать!!!
      return {
        ...state,
        newPost: action.message,
      }

    case SET_POSTS:
      const newPost = {
        id: Date.now(),
        message: state.newPost,
      }
      return {
        ...state,
        posts: [newPost, ...state.posts],
        newPost: '',
      }

    default:
      return state
  }
}

export const setPostsActionCreator = () => {
  return { type: SET_POSTS }
}

export const setNewPostActionCreator = (message: string) => {
  return { type: SET_NEW_POST, message: message }
}
