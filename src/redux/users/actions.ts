import { IUser, LastRequestType, UsersConstants } from "./types"

/* ------------- Types ------------- */
export interface FetchUsersRequest extends ReturnType<typeof fetchUsersRequest> {}
export interface FetchUsersSuccess extends ReturnType<typeof fetchUsersSuccess> {}
export interface FetchUsersFailure extends ReturnType<typeof fetchUsersFailure> {}

export interface ToggleFollowOnUserRequest extends ReturnType<typeof toggleFollowOnUserRequest> {}
export interface ToggleFollowOnUserSuccess extends ReturnType<typeof toggleFollowOnUserSuccess> {}
export interface ToggleFollowOnUserFailure extends ReturnType<typeof toggleFollowOnUserFailure> {}

export interface SetTotalPeopleCount extends ReturnType<typeof setTotalPeopleCount> {}
export interface SetTotalFriendsCount extends ReturnType<typeof setTotalFriendsCount> {}
export interface SetCurrentUsersPage extends ReturnType<typeof setCurrentPeoplePage> {}
export interface SetCurrentFriendsPage extends ReturnType<typeof setCurrentFriendsPage> {}
export interface ClearUsersState extends ReturnType<typeof clearUsersState> {}
export interface SetLastRequest extends ReturnType<typeof setLastRequest> {}

export type UsersAction =
  | FetchUsersRequest
  | FetchUsersSuccess
  | FetchUsersFailure
  | SetTotalPeopleCount
  | SetTotalFriendsCount
  | SetCurrentUsersPage
  | SetCurrentFriendsPage
  | ClearUsersState
  | SetLastRequest
  | ToggleFollowOnUserRequest
  | ToggleFollowOnUserSuccess
  | ToggleFollowOnUserFailure

/* ------------- Actions ------------- */
export const fetchUsersRequest = () => {
  return <const>{ type: UsersConstants.FETCH_USERS_REQUEST }
}

export const fetchUsersSuccess = (users: IUser[]) => {
  return <const>{ type: UsersConstants.FETCH_USERS_SUCCESS, payload: users }
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

export const setTotalPeopleCount = (totalCount: number) => {
  return <const>{ type: UsersConstants.SET_TOTAL_PEOPLE_COUNT, payload: totalCount }
}

export const setTotalFriendsCount = (totalCount: number) => {
  return <const>{ type: UsersConstants.SET_TOTAL_FRIENDS_COUNT, payload: totalCount }
}

export const setCurrentPeoplePage = (currentPage: number) => {
  return <const>{ type: UsersConstants.SET_CURRENT_PEOPLE_PAGE, payload: currentPage }
}

export const setCurrentFriendsPage = (currentPage: number) => {
  return <const>{ type: UsersConstants.SET_CURRENT_FRIENDS_PAGE, payload: currentPage }
}

export const setLastRequest = (lastRequest: LastRequestType) => {
  return <const>{ type: UsersConstants.SET_LAST_REQUEST, payload: lastRequest }
}

export const clearUsersState = () => { //bug it useless
  return <const>{ type: UsersConstants.CLEAR_USERS_STATE }
}