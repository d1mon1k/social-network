export enum UsersConstants {
  SET_PEOPLE_TOTAL_COUNT = 'users/SET_PEOPLE_TOTAL_COUNT',
  SET_FRIENDS_TOTAL_COUNT = 'users/SET_FRIENDS_TOTAL_COUNT',
  SET_SEARCHED_PEOPLE_TOTAL_COUNT = 'users/SET_SEARCHED_PEOPLE_TOTAL_COUNT',
  SET_SEARCHED_FRIENDS_TOTAL_COUNT = 'users/SET_SEARCHED_FRIENDS_TOTAL_COUNT',

  SET_PEOPLE_PAGE = 'users/SET_PEOPLE_PAGE',
  SET_FRIENDS_PAGE = 'users/SET_FRIENDS_PAGE',
  SET_SEARCHED_PEOPLE_PAGE = 'users/SET_SEARCHED_PEOPLE_PAGE',
  SET_SEARCHED_FRIENDS_PAGE = 'users/SET_SEARCHED_FRIENDS_PAGE',

  FETCH_USERS_REQUEST = 'users/FETCH_USERS_REQUEST',
  FETCH_PEOPLE_SUCCESS = 'users/FETCH_PEOPLE_SUCCESS',
  FETCH_FRIENDS_SUCCESS = 'users/FETCH_FRIENDS_SUCCESS',
  FETCH_SEARCHED_PEOPLE_SUCCESS = 'users/FETCH_SEARCHED_PEOPLE_SUCCESS',
  FETCH_SEARCHED_FRIENDS_SUCCESS = 'users/FETCH_SEARCHED_FRIENDS_SUCCESS',
  FETCH_USERS_FAILURE = 'users/FETCH_USERS_FAILURE',
  
  TOGGLE_FOLLOW_ON_USER_REQUEST = 'users/TOGGLE_FOLLOW_ON_USER_REQUEST',
  TOGGLE_FOLLOW_ON_USER_SUCCESS = 'users/TOGGLE_FOLLOW_ON_USER_SUCCESS',
  TOGGLE_FOLLOW_ON_USER_FAILURE = 'users/TOGGLE_FOLLOW_ON_USER_FAILURE',

  CLEAR_SEARCHED_USERS_STATE = 'users/CLEAR_SEARCHED_USERS_STATE',
}
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
