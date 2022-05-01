// import { authReducer } from './reducers/auth-reducer'
// import { profileReducer } from './reducers/profile-reducer'
import { dialogsReducer } from './reducers/dialogs-reducer'
import { sidebarReducer } from './reducers/sidebar-reducer'
import { usersReducer } from './reducers/users-reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { appReducer } from './reducers/app-reducer'
import authReducer from './auth/reducer'
import profileReducer from './profile/reducer'
import usersReducer1 from './users/reducer'
 
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  users: usersReducer1,
  // profilePage: profileReducer,
  // auth: authReducer,
  dialogsPage: dialogsReducer,  
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  app: appReducer,
})

const composedEnhancers = composeWithDevTools(applyMiddleware(thunk))

export const store = createStore(
  rootReducer, composedEnhancers
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

declare const window: any;
window.store = store.getState()