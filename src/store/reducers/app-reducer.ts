import { AppActionTypes } from '../types/app-types';
import { AppAction } from "../types/app-types"

const initialState = {
  isInitialized: false as boolean,
}

type AppReducerType = typeof initialState

export const appReducer = (state = initialState, action: AppAction):AppReducerType  => {
  switch(action.type) {
    case AppActionTypes.INITIALIZED_SUCCESS: 
      return {...state, isInitialized: true}
    default: 
      return state
  }
}