import { AuthConstants, AuthenticatedUser } from './types'

/* ------------- Types ------------- */
export interface SetCurrentUserRequest extends ReturnType<typeof setCurrentUserRequest> {}
export interface SetCurrentUserSuccess extends ReturnType<typeof setCurrentUserSuccess> {}
export interface SetCurrentUserFailure extends ReturnType<typeof setCurrentUserFailure> {}
export interface DeleteCurrentUser extends ReturnType<typeof deleteCurrentUser> {}

export type AuthAction =
  | SetCurrentUserRequest
  | SetCurrentUserSuccess
  | SetCurrentUserFailure
  | DeleteCurrentUser

/* ------------- Actions ------------- */
export const setCurrentUserRequest = () => {
  return <const>{ type: AuthConstants.SET_CURRENT_USER_REQUEST }
}

export const setCurrentUserSuccess = (currentUserData: AuthenticatedUser) => {
  return <const>{ type: AuthConstants.SET_CURRENT_USER_SUCCESS, payload: currentUserData }
}

export const setCurrentUserFailure = (error: string) => {
  return <const>{ type: AuthConstants.SET_CURRENT_USER_FAILURE, payload: error }
}

export const deleteCurrentUser = () => {
  return <const>{ type: AuthConstants.DELETE_CURRENT_USER }
}