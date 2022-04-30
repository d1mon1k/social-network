export enum AuthConstants {
  SET_CURRENT_USER_REQUEST = 'auth/SET_CURRENT_USER_REQUEST',
  SET_CURRENT_USER_FAILURE = 'auth/SET_CURRENT_USER_FAILURE',
  SET_CURRENT_USER_SUCCESS = 'auth/SET_CURRENT_SUCCESS',

  DELETE_CURRENT_USER = 'auth/DELETE_CURRENT_USER',
}

export interface AuthenticatedUser {
  data: {
    id: number | null
    login: string | null
    email: string | null
  }
  messages: string[] | []
  fieldsError: string[] | []
  resultCode: 0 | 1 | null
}

// export interface AuthStore extends ICurrentUser {
//   isAuth: boolean
//   isFetching: boolean
//   error: string | null
// }

// interface SetCurrentUser {
//   type: AuthActionTypes.SET_CURRENT_USER
//   payload: ICurrentUser
// }

// interface DeleteCurrentUser {
//   type: AuthActionTypes.DELETE_CURRENT_USER
// }

// interface IsFetching {
//   type: AuthActionTypes.SET_CURRENT_USER_REQUEST
// }

// interface FetchingSuccess {
//   type: AuthActionTypes.SET_CURRENT_USER_SUCCESS
// }

// interface FetchingError {
//   type: AuthActionTypes.SET_CURRENT_USER_FAILURE
//   payload: string
// }

// export type AuthAction = 
//   SetCurrentUser 
//   | DeleteCurrentUser
//   | FetchingError 
//   | IsFetching 
//   | FetchingSuccess
//   | IsFetching
