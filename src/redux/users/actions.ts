import { IUser, UsersConstants } from "./types"

/* ------------- Types ------------- */
export interface FetchUsersRequest extends ReturnType<typeof fetchUsersRequest> {}
export interface FetchPeopleSuccess extends ReturnType<typeof fetchPeopleSuccess> {}
export interface FetchFriendsSuccess extends ReturnType<typeof fetchFriendsSuccess> {}
export interface FetchSearchedPeopleSuccess extends ReturnType<typeof fetchSearchedPeopleSuccess> {}
export interface FetchSearchedFriendsSuccess extends ReturnType<typeof fetchSearchedFriendsSuccess> {}
export interface FetchUsersFailure extends ReturnType<typeof fetchUsersFailure> {}

export interface ToggleFollowOnUserRequest extends ReturnType<typeof toggleFollowOnUserRequest> {}
export interface ToggleFollowOnUserSuccess extends ReturnType<typeof toggleFollowOnUserSuccess> {}
export interface ToggleFollowOnUserFailure extends ReturnType<typeof toggleFollowOnUserFailure> {}

export interface SetPeopleTotalCount extends ReturnType<typeof setPeopleTotalCount> {}
export interface SetFriendsTotalCount extends ReturnType<typeof setFriendsTotalCount> {}
export interface SetSearchedPeopleTotalCount extends ReturnType<typeof setSearchedPeopleTotalCount> {}
export interface SetSearchedFriendsTotalCount extends ReturnType<typeof setSearchedFriendsTotalCount> {}

export interface SetPeoplePage extends ReturnType<typeof setPeoplePage> {}
export interface SetFriendsPage extends ReturnType<typeof setFriendsPage> {}
export interface SetSearchedPeoplePage extends ReturnType<typeof setSearchedPeoplePage> {}
export interface SetSearchedFriendsPage extends ReturnType<typeof setSearchedFriendsPage> {}

export interface ClearUsersState extends ReturnType<typeof clearUsersState> {}

export type UsersAction =
  | FetchUsersRequest
  | FetchPeopleSuccess
  | FetchFriendsSuccess
  | FetchSearchedPeopleSuccess
  | FetchSearchedFriendsSuccess
  | FetchUsersFailure
  | SetPeopleTotalCount
  | SetFriendsTotalCount
  | SetSearchedPeopleTotalCount
  | SetSearchedFriendsTotalCount
  | SetPeoplePage
  | SetFriendsPage
  | SetSearchedPeoplePage
  | SetSearchedFriendsPage
  | ClearUsersState
  | ToggleFollowOnUserRequest
  | ToggleFollowOnUserSuccess
  | ToggleFollowOnUserFailure

/* ------------- Actions ------------- */
export const fetchUsersRequest = () => {
  return <const>{ type: UsersConstants.FETCH_USERS_REQUEST }
}

export const fetchPeopleSuccess = (users: IUser[]) => {
  return <const>{ type: UsersConstants.FETCH_PEOPLE_SUCCESS, payload: users }
}

export const fetchFriendsSuccess = (users: IUser[]) => {
  return <const>{ type: UsersConstants.FETCH_FRIENDS_SUCCESS, payload: users }
}

export const fetchSearchedPeopleSuccess = (users: IUser[]) => {
  return <const>{ type: UsersConstants.FETCH_SEARCHED_PEOPLE_SUCCESS, payload: users }
}

export const fetchSearchedFriendsSuccess = (users: IUser[]) => {
  return <const>{ type: UsersConstants.FETCH_SEARCHED_FRIENDS_SUCCESS, payload: users }
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

export const setPeopleTotalCount = (totalCount: number) => {
  return <const>{ type: UsersConstants.SET_PEOPLE_TOTAL_COUNT, payload: totalCount }
}

export const setFriendsTotalCount = (totalCount: number) => {
  return <const>{ type: UsersConstants.SET_FRIENDS_TOTAL_COUNT, payload: totalCount }
}

export const setSearchedPeopleTotalCount = (totalCount: number) => {
  return <const>{ type: UsersConstants.SET_SEARCHED_PEOPLE_TOTAL_COUNT, payload: totalCount }
}

export const setSearchedFriendsTotalCount = (totalCount: number) => {
  return <const>{ type: UsersConstants.SET_SEARCHED_FRIENDS_TOTAL_COUNT, payload: totalCount }
}

export const setPeoplePage = (currentPage: number) => {
  return <const>{ type: UsersConstants.SET_PEOPLE_PAGE, payload: currentPage }
}

export const setFriendsPage = (currentPage: number) => {
  return <const>{ type: UsersConstants.SET_FRIENDS_PAGE, payload: currentPage }
}

export const setSearchedPeoplePage = (currentPage: number) => {
  return <const>{ type: UsersConstants.SET_SEARCHED_PEOPLE_PAGE, payload: currentPage }
}

export const setSearchedFriendsPage = (currentPage: number) => {
  return <const>{ type: UsersConstants.SET_SEARCHED_FRIENDS_PAGE, payload: currentPage }
}

export const clearUsersState = () => {
  return <const>{ type: UsersConstants.CLEAR_SEARCHED_USERS_STATE }
}