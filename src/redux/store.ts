import { configureStore } from '@reduxjs/toolkit'
import { dialogsReducer } from './reducers/dialogs-reducer'
import { profileReducer } from './reducers/profile-reducer'
import { sidebarReducer } from './reducers/sidebar-reducer'
import { usersReducer } from './reducers/users-reducer'

//note объединить преобразователи (редукторы)

const store = configureStore({
  reducer: {
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
