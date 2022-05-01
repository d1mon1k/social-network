import { dialogsReducer } from './reducers/dialogs-reducer'
import { sidebarReducer } from './reducers/sidebar-reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import authReducer from './auth/reducer'
import profileReducer from './profile/reducer'
import usersReducer from './users/reducer'
import appReducer from './app/reducer' 

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  users: usersReducer,
  app: appReducer,
  // profilePage: profileReducer,
  // auth: authReducer,
  // usersPage: usersReducer,
  // app: appReducer,
  dialogsPage: dialogsReducer,  
  sidebar: sidebarReducer,
})

const composedEnhancers = composeWithDevTools(applyMiddleware(thunk))

export const store = createStore(
  rootReducer, composedEnhancers
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

declare const window: any;
window.store = store.getState()