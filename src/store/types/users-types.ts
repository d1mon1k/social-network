export interface UsersState {
  users: IUser[],
  totalCount: number,
  pageItemsCount: number,
  currentPage: number,
  isFetching: boolean
  isFollowing: number[]
}

export interface IUser {id: number, name: string, status: string, photos: {small: string, big: string}, followed: boolean}

export enum UsersActionTypes {
  TOGGLE_FOLLOW = 'TOGGLE_FOLLOW',
  SET_USERS = 'SET_USERS',
  SET_TOTAL_COUNT = 'SET_TOTAL_COUNT',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING',
  TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING',
}

interface ToggleFollow {
  type: UsersActionTypes.TOGGLE_FOLLOW
  payload: number
}
interface ToggleIsFetching {
  type: UsersActionTypes.TOGGLE_IS_FETCHING
}
interface SetUsers {
  type: UsersActionTypes.SET_USERS
  payload: IUser[]
}
interface SetCurrentPage {
  type: UsersActionTypes.SET_CURRENT_PAGE
  payload: number
}
interface SetTotalCount {
  type: UsersActionTypes.SET_TOTAL_COUNT
  payload: number
}

interface ToggleIsFollowing {
  type: UsersActionTypes.TOGGLE_IS_FOLLOWING
  payload: number
}

export type UsersAction = 
  ToggleFollow
  | ToggleIsFetching
  | SetUsers
  | SetCurrentPage
  | SetTotalCount
  | ToggleIsFollowing