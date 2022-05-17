import { IUser, LastRequestType, UsersConstants } from "./types"

/* ------------- Types ------------- */
export interface SetUsersRequest extends ReturnType<typeof setUsersRequest> {}
export interface SetUsersSuccess extends ReturnType<typeof setUsersSuccess> {}
export interface SetUsersFailure extends ReturnType<typeof setUsersFailure> {}

export interface ToggleFollowOnUserRequest extends ReturnType<typeof toggleFollowOnUserRequest> {}
export interface ToggleFollowOnUserSuccess extends ReturnType<typeof toggleFollowOnUserSuccess> {}
export interface ToggleFollowOnUserError extends ReturnType<typeof toggleFollowOnUserError> {}

export interface SetTotalUsersCount extends ReturnType<typeof setTotalUsersCount> {}
export interface SetCurrentUsersPage extends ReturnType<typeof setCurrentUsersPage> {}
export interface ClearUsersState extends ReturnType<typeof clearUsersState> {}
export interface SetLastRequest extends ReturnType<typeof setLastRequest> {}

export type UsersAction =
  | SetUsersRequest
  | SetUsersSuccess
  | SetUsersFailure
  | SetTotalUsersCount
  | SetCurrentUsersPage
  | ClearUsersState
  | SetLastRequest
  | ToggleFollowOnUserRequest
  | ToggleFollowOnUserSuccess
  | ToggleFollowOnUserError

/* ------------- Actions ------------- */
export const setUsersRequest = () => {
  return <const>{ type: UsersConstants.SET_USERS_REQUEST }
}

export const setUsersSuccess = (users: IUser[]) => {
  return <const>{ type: UsersConstants.SET_USERS_SUCCESS, payload: users }
}

export const setUsersFailure = (error: string) => {
  return <const>{ type: UsersConstants.SET_USERS_FAILURE, payload: error }
}

export const clearUsersState = () => {
  return <const>{ type: UsersConstants.CLEAR_USERS_STATE }
}

export const setLastRequest = (lastRequest: LastRequestType) => {
  return <const>{ type: UsersConstants.SET_LAST_REQUEST, payload: lastRequest }
}

export const toggleFollowOnUserRequest = (id: number) => {
  return <const>{ type: UsersConstants.TOGGLE_FOLLOW_ON_USER_REQUEST, payload: id }
}

export const toggleFollowOnUserSuccess = (userId: number) => {
  return <const>{ type: UsersConstants.TOGGLE_FOLLOW_ON_USER_SUCCESS, payload: userId }
}

export const toggleFollowOnUserError = (error: string) => {
  return <const>{ type: UsersConstants.TOGGLE_FOLLOW_ON_USER_ERROR, payload: error }
}

export const setTotalUsersCount = (totalCount: number) => {
  return <const>{ type: UsersConstants.SET_TOTAL_USERS_COUNT, payload: totalCount }
}

export const setCurrentUsersPage = (currentPage: number) => {
  return <const>{ type: UsersConstants.SET_CURRENT_USERS_PAGE, payload: currentPage }
}
