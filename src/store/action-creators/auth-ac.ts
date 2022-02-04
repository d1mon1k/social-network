import {
  AuthActionTypes,
  ActionType,
  ICurrentUser,
} from './../types/auth-types'

export const toggleIsFetchingAC = (): ActionType => {
  return {
    type: AuthActionTypes.TOGGLE_IS_FETCHING,
  }
}

export const setCurrentUserAC = (currentUserData: ICurrentUser): ActionType => {
  return {
    type: AuthActionTypes.SET_CURRENT_USER,
    payload: currentUserData,
  }
}

export const fetchingErrorAC = (error: string): ActionType => {
  return {
    type: AuthActionTypes.FETCHING_ERROR,
    payload: error,
  }
}
