import { combineReducers, createStore } from 'redux'
import { dialogsReducer } from './reducers/dialogs-reducer.ts'
import { profileReducer } from './reducers/profile-reducer'
import { sidebarReducer } from './reducers/sidebar-reducer'
import { usersReducer } from './reducers/users-reducer'

let reducers = combineReducers({
  //note объединить преобразователи (редукторы)
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
})

export let store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

window.store = store
