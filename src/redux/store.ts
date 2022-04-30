// import { authReducer } from './reducers/auth-reducer'
import { dialogsReducer } from './reducers/dialogs-reducer'
// import { profileReducer } from './reducers/profile-reducer'
import { sidebarReducer } from './reducers/sidebar-reducer'
import { usersReducer } from './reducers/users-reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { appReducer } from './reducers/app-reducer'
import authReducer from './auth/reducer'
import profileReducer from './profile/reducer'
 
const rootReducer = combineReducers({
  // profilePage: profileReducer,
  profile: profileReducer,
  dialogsPage: dialogsReducer,  
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  // auth: authReducer,
  app: appReducer,
  auth: authReducer,
})

const composedEnhancers = composeWithDevTools(applyMiddleware(thunk))

export const store = createStore(
  rootReducer, composedEnhancers
)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

declare const window: any;
window.store = store.getState()