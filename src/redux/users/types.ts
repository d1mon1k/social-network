export enum UsersConstants {
  SET_TOTAL_PEOPLE_COUNT = 'users/SET_TOTAL_PEOPLE_COUNT',
  SET_TOTAL_FRIENDS_COUNT = 'users/SET_TOTAL_FRIENDS_COUNT',
  SET_CURRENT_PEOPLE_PAGE = 'users/SET_CURRENT_PEOPLE_PAGE',
  SET_CURRENT_FRIENDS_PAGE = 'users/SET_CURRENT_FRIENDS_PAGE',

  FETCH_USERS_REQUEST = 'users/FETCH_USERS_REQUEST',
  FETCH_USERS_SUCCESS = 'users/FETCH_USERS_SUCCESS',
  FETCH_USERS_FAILURE = 'users/FETCH_USERS_FAILURE',
  CLEAR_USERS_STATE = 'users/CLEAR_USERS_STATE',

  TOGGLE_FOLLOW_ON_USER_REQUEST = 'users/TOGGLE_FOLLOW_ON_USER_REQUEST',
  TOGGLE_FOLLOW_ON_USER_SUCCESS = 'users/TOGGLE_FOLLOW_ON_USER_SUCCESS',
  TOGGLE_FOLLOW_ON_USER_FAILURE = 'users/TOGGLE_FOLLOW_ON_USER_FAILURE',

  SET_LAST_REQUEST = 'users/SET_LAST_REQUEST'
}
export interface IUser {
  id: number
  name: string
  status: string | null
  photos: { small: string | null; big: string | null }
  followed: boolean
}

export interface IUsers {
  people: IUser[],
  friends: IUser[]
}

export type LastRequestType = null | 'DevelopersIFollow' | 'Developers' | 'Developer'
