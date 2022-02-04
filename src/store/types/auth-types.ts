export enum AuthActionTypes {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING',
  FETCHING_ERROR = 'FETCHING_ERROR'
}

export interface ICurrentUser {
  data: {
    id: number | null,
    login: string | null,
    email: string | null
  }
  messages: [] | null,
  fieldsError: [] | null,
  resultCode: 0 | 1 | null
}

export interface AuthStore extends ICurrentUser {
  isAuth: boolean
  isFetching: boolean
  error: string | null
}

interface SetCurrentUser {
  type: AuthActionTypes.SET_CURRENT_USER
  payload: ICurrentUser
}

interface ToggleIsFetching {
  type: AuthActionTypes.TOGGLE_IS_FETCHING
}

interface FetchingError {
  type: AuthActionTypes.FETCHING_ERROR
  payload: string
} 

export type ActionType = 
  SetCurrentUser 
  | ToggleIsFetching 
  | FetchingError
