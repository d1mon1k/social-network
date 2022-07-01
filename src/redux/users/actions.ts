import { IUser, SetUsersActionTypes, UsersConstants } from "./types"

/* ------------- Types ------------- */
export interface FetchUsersRequest extends ReturnType<typeof fetchUsersRequest> {}
export interface FetchUsersSuccess extends ReturnType<typeof fetchUsersSuccess> {}
export interface FetchUsersFailure extends ReturnType<typeof fetchUsersFailure> {}
export interface FetchSearchedUsersSuccess extends ReturnType<typeof fetchSearchedUsersSuccess> {}

export interface ToggleFollowOnUserRequest extends ReturnType<typeof toggleFollowOnUserRequest> {}
export interface ToggleFollowOnUserSuccess extends ReturnType<typeof toggleFollowOnUserSuccess> {}
export interface ToggleFollowOnUserFailure extends ReturnType<typeof toggleFollowOnUserFailure> {}

export interface SetTotalCount extends ReturnType<typeof setTotalCount> {}
export interface SetCurrentPage extends ReturnType<typeof setCurrentPage> {}
export interface ClearUsersState extends ReturnType<typeof clearUsersState> {}

export type UsersAction =
  | FetchUsersRequest
  | FetchUsersSuccess
  | FetchUsersFailure
  | SetTotalCount
  | SetCurrentPage
  | ClearUsersState
  | ToggleFollowOnUserRequest
  | ToggleFollowOnUserSuccess
  | ToggleFollowOnUserFailure
  | FetchSearchedUsersSuccess

/* ------------- Actions ------------- */
export const fetchUsersRequest = () => {
  return <const>{ type: UsersConstants.FETCH_USERS_REQUEST }
}

export const fetchUsersSuccess = (users: IUser[]) => {
  return <const>{ type: UsersConstants.FETCH_USERS_SUCCESS, payload: users }
}

export const fetchSearchedUsersSuccess = (users: IUser[]) => {
  return <const>{ type: UsersConstants.FETCH_SEARCHED_USERS_SUCCESS, payload: users }
}

export const fetchUsersFailure = (error: string) => {
  return <const>{ type: UsersConstants.FETCH_USERS_FAILURE, payload: error }
}

export const toggleFollowOnUserRequest = (id: number) => {
  return <const>{ type: UsersConstants.TOGGLE_FOLLOW_ON_USER_REQUEST, payload: id }
}

export const toggleFollowOnUserSuccess = (userId: number) => {
  return <const>{ type: UsersConstants.TOGGLE_FOLLOW_ON_USER_SUCCESS, payload: userId }
}

export const toggleFollowOnUserFailure = (payload: {error: string, id: number}) => {
  return <const>{ type: UsersConstants.TOGGLE_FOLLOW_ON_USER_FAILURE, payload }
}

export const setTotalCount = (payload: {totalCount: number, action: SetUsersActionTypes}) => {
  return <const>{ type: UsersConstants.SET_TOTAL_COUNT, payload }
}

export const setCurrentPage = (payload: {currentPage: number, action: SetUsersActionTypes}) => {
  return <const>{ type: UsersConstants.SET_CURRENT_PAGE, payload }
}

export const clearUsersState = () => {
  return <const>{ type: UsersConstants.CLEAR_USERS_STATE }
}