export enum AuthActionTypes {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  DELETE_CURRENT_USER = 'DELETE_CURRENT_USER',
  IS_FETCHING = 'AUTH/IS_FETCHING',
  FETCHING_ERROR = 'AUTH/FETCHING_ERROR',
  FETCHING_SUCCESS = 'AUTH/FETCHING_SUCCESS'
}

export type ICurrentUser = {
  data: {
    id: number | null
    login: string | null
    email: string | null
  }
  messages: [] | null
  fieldsError: [] | null
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

interface DeleteCurrentUser {
  type: AuthActionTypes.DELETE_CURRENT_USER
}

interface IsFetching {
  type: AuthActionTypes.IS_FETCHING
}

interface FetchingSuccess {
  type: AuthActionTypes.FETCHING_SUCCESS
}

interface FetchingError {
  type: AuthActionTypes.FETCHING_ERROR
  payload: string
}

export type AuthAction = 
  SetCurrentUser 
  | DeleteCurrentUser
  | FetchingError 
  | IsFetching 
  | FetchingSuccess
  | IsFetching
