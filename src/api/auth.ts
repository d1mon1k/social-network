import api from './api'

/* ------------- Types ------------- */
interface IsUserAuthorizedApiResponse {
  resultCode: 0 | 1
  messages: (string | void)[]
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
const isUserAuthorizedApi = () =>
  api.get<IsUserAuthorizedApiResponse>('auth/me')

const createAuthenticatedSessionApi = (authData: CreateAuthenticatedSessionApiParams) => 
  api.post<CreateAuthenticatedSessionApiResponse>('auth/login', authData)

const deleteAuthenticatedSessionApi = () =>
  api.delete<DeleteAuthenticatedSessionApiResponse>('/auth/login')
