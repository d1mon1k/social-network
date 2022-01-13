import { ProfileState, ProfileActionTypes, ProfileAction } from './../types/profile-types';

const initialState: ProfileState = {
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

export const profileReducer = (state = initialState, action: ProfileAction): ProfileState => {
  switch (action.type) {
    case ProfileActionTypes.SET_NEW_POST:
      return { ...state, newPost: action.payload, }
    case ProfileActionTypes.SET_POSTS:
      const newPost = { id: Date.now(), message: state.newPost }
      return { ...state, posts: [newPost, ...state.posts], newPost: '' }
    default:
      return state
  }
}

//note Здесь был крутой рефакторинг.. Зачем нам создавать stateCopy = {...}, если мы можем сразу вернуть готовый объект. Конечно же соблюдая концепции имутабельности, т.е копировать ГЛУБОКО объекты или массивы , если собираемся с ними работать!!!


