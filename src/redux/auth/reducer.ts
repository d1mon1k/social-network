import { AuthAction, SetCurrentUserFailure, SetCurrentUserSuccess } from "./actions"
import { AuthConstants, AuthenticatedUser } from "./types"

/* ------------- State ------------- */
type AuthStateType = typeof initialState
export interface AuthState extends AuthStateType {}

const initialState = {
  user: undefined as AuthenticatedUser | undefined,
  requests: {
    setCurrentUserPending: false,
    setCurrentUserError: null as string | null
  }
}

/* ------------- Reducers ------------- */
const setCurrentUserRequest = (state: AuthState): AuthState => {
  return { 
    ...state, 
    requests: {...state.requests, setCurrentUserPending: true} 
  }
}

const setCurrentUserSuccess = (state: AuthState, action: SetCurrentUserSuccess): AuthState => {
    return {
      ...state,
      user: {...state.user, ...action.payload},
      requests: { ...state.requests, setCurrentUserPending: false },
    }
}

const setCurrentUserFailure = (state: AuthState, action: SetCurrentUserFailure): AuthState => {
  return { 
    ...state, 
    requests: {...state.requests, setCurrentUserPending: false, setCurrentUserError: action.payload}
  }
}

const deleteCurrentUser = (state: AuthState): AuthState => {
  return {
    ...state,
    user: undefined
  }
}

const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthConstants.SET_CURRENT_USER_REQUEST:
      return setCurrentUserRequest(state)
    case AuthConstants.SET_CURRENT_USER_SUCCESS:
      return setCurrentUserSuccess(state, action)
    case AuthConstants.SET_CURRENT_USER_FAILURE:
      return setCurrentUserFailure(state, action)
    case AuthConstants.DELETE_CURRENT_USER:
      return deleteCurrentUser(state)
    default:
      return state
  }
}

export default authReducer
