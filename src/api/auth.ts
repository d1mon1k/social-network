import api from './api'

/* ------------- Types ------------- */
interface GetAuthorizedUserApiResponse {
  resultCode: 0 | 1
  messages: string[] | []
  fieldsError: string[] | []
  data: {
    id: number
    email: string
    login: string
  }
}

interface CreateAuthenticatedSessionApiResponse {
  resultCode: 0 | 1,
  messages: (string | void)[],
  data: {
    userId: number
  }
}

interface DeleteAuthenticatedSessionApiResponse {
  resultCode: 0 | 1,
  messages: (string | void)[],
  data: {}
}

interface CreateAuthenticatedSessionApiParams {
  email: string
  password: string
}

/* ------------- Api ------------- */
export const getAuthorizedUserApi = () =>
  api.get<GetAuthorizedUserApiResponse>('auth/me')

export const createAuthenticatedSessionApi = (authData: CreateAuthenticatedSessionApiParams) => 
  api.post<CreateAuthenticatedSessionApiResponse>('auth/login', authData)

export const deleteAuthenticatedSessionApi = () =>
  api.delete<DeleteAuthenticatedSessionApiResponse>('/auth/login')
