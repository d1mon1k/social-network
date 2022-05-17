export enum UsersConstants {
  SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT',
  SET_CURRENT_USERS_PAGE = 'users/SET_CURRENT_USERS_PAGE',

  SET_USERS_REQUEST = 'users/SET_USERS_REQUEST',
  SET_USERS_SUCCESS = 'users/SET_USERS_SUCCESS',
  SET_USERS_FAILURE = 'users/SET_USERS_FAILURE',
  CLEAR_USERS_STATE = 'users/CLEAR_USERS_STATE',

  TOGGLE_FOLLOW_ON_USER_REQUEST = 'users/TOGGLE_FOLLOW_ON_USER_REQUEST',
  TOGGLE_FOLLOW_ON_USER_SUCCESS = 'users/TOGGLE_FOLLOW_ON_USER_SUCCESS',
  TOGGLE_FOLLOW_ON_USER_ERROR = 'users/TOGGLE_FOLLOW_ON_USER_ERROR',

  SET_LAST_REQUEST = 'users/SET_LAST_REQUEST'
}
export interface IUser {
  id: number
  name: string
  status: string | null
  photos: { small: string | null; big: string | null }
  followed: boolean
}

export type LastRequestType = null | 'DevelopersIFollow' | 'Developers' | 'Developer'
