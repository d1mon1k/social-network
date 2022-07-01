export enum UsersConstants {
  SET_TOTAL_COUNT = 'users/SET_TOTAL_COUNT',
  SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE',

  FETCH_USERS_REQUEST = 'users/FETCH_USERS_REQUEST',
  FETCH_USERS_SUCCESS = 'users/FETCH_USERS_SUCCESS',
  FETCH_USERS_FAILURE = 'users/FETCH_USERS_FAILURE',
  
  FETCH_SEARCHED_USERS_SUCCESS = 'users/FETCH_SEARCHED_USERS_SUCCESS',
  
  TOGGLE_FOLLOW_ON_USER_REQUEST = 'users/TOGGLE_FOLLOW_ON_USER_REQUEST',
  TOGGLE_FOLLOW_ON_USER_SUCCESS = 'users/TOGGLE_FOLLOW_ON_USER_SUCCESS',
  TOGGLE_FOLLOW_ON_USER_FAILURE = 'users/TOGGLE_FOLLOW_ON_USER_FAILURE',

  CLEAR_USERS_STATE = 'users/CLEAR_USERS_STATE',
}

export type SetUsersActionTypes = 
  | 'searched/people'
  | 'searched/friends'
  | 'people'
  | 'friends'

export interface IUser {
  id: number
  name: string
  status: string | null
  photos: { small: string | null; big: string | null }
  followed: boolean
}

export interface IUsersData {
  friends: {
   items: IUser[]
   totalItemsCount: number
   currentPage: number
  }
  people: {
    items: IUser[]
    totalItemsCount: number
    currentPage: number
  }
}
