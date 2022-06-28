export enum AuthConstants {
  SET_CURRENT_USER_REQUEST = 'auth/SET_CURRENT_USER_REQUEST',
  SET_CURRENT_USER_FAILURE = 'auth/SET_CURRENT_USER_FAILURE',
  SET_CURRENT_USER_SUCCESS = 'auth/SET_CURRENT_USER_SUCCESS',

  DELETE_CURRENT_USER = 'auth/DELETE_CURRENT_USER',
}

export interface AuthenticatedUser {
  id: number 
  login: string 
  email: string 
  photos?: {
    small: string | null
    large: string | null
  }
}

