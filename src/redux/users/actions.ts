import { IUser, UsersConstants } from "./types"

/* ------------- Types ------------- */
export interface SetUsersRequest extends ReturnType<typeof setUsersRequest> {}
export interface SetUsersSuccess extends ReturnType<typeof setUsersSuccess> {}
export interface SetUsersFailure extends ReturnType<typeof setUsersFailure> {}
export interface ToggleFollowOnUser extends ReturnType<typeof toggleFollowOnUser> {}
export interface SetTotalUsersCount extends ReturnType<typeof setTotalUsersCount> {}
export interface SetCurrentUsersPage extends ReturnType<typeof setCurrentUsersPage> {}
export interface ToggleIsSubscribePending extends ReturnType<typeof toggleIsSubscribePending> {}
export interface ClearUsersState extends ReturnType<typeof clearUsersState> {}

export type UsersAction =
  | SetUsersRequest
  | SetUsersSuccess
  | SetUsersFailure
  | ToggleFollowOnUser
  | SetTotalUsersCount
  | SetCurrentUsersPage
  | ToggleIsSubscribePending
  | ClearUsersState

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

export const toggleFollowOnUser = (userId: number) => {
  return <const>{ type: UsersConstants.TOGGLE_FOLLOW_ON_USER, payload: userId }
}

export const setTotalUsersCount = (totalCount: number) => {
  return <const>{ type: UsersConstants.SET_TOTAL_USERS_COUNT, payload: totalCount }
}

export const setCurrentUsersPage = (currentPage: number) => {
  return <const>{ type: UsersConstants.SET_CURRENT_USERS_PAGE, payload: currentPage }
}

export const toggleIsSubscribePending = (id: number) => {
  return <const>{ type: UsersConstants.TOGGLE_IS_SUBSCRIBE_PENDING, payload: id }
}