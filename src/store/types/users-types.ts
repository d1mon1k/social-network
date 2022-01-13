export interface UsersState {
  users: User[],
  totalCount: number,
  pageItemsCount: number,
  currentPage: number,
  isFetching: boolean
}

export interface User {id: number, name: string, status: string, photos: {small: string, big: string}, followed: boolean}

export enum UsersActionTypes {
  TOGGLE_FOLLOW = 'TOGGLE_FOLLOW',
  SET_USERS = 'SET_USERS',
  SET_TOTAL_COUNT = 'SET_TOTAL_COUNT',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
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
  payload: User[]
}
interface SetCurrentPage {
  type: UsersActionTypes.SET_CURRENT_PAGE
  payload: number
}
interface SetTotalCount {
  type: UsersActionTypes.SET_TOTAL_COUNT
  payload: number
}

export type UsersAction = 
  ToggleFollow
  | ToggleIsFetching
  | SetUsers
  | SetCurrentPage
  | SetTotalCount