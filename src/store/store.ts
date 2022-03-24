import { authReducer } from './reducers/auth'
import { dialogsReducer } from './reducers/dialogs-reducer'
import { profileReducer } from './reducers/profile-reducer'
import { sidebarReducer } from './reducers/sidebar-reducer'
import { usersReducer } from './reducers/users-reducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
 
const rootReducer = combineReducers({
  dialogsPage: dialogsReducer,  
  profilePage: profileReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
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