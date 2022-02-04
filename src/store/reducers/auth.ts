import { AuthStore, ActionType, AuthActionTypes } from './../types/auth-types';

const initialState: AuthStore = {
  data: {
    id: null,
    login: null,
    email: null,
  },
  messages: null,
  fieldsError: null,
  resultCode: null,
  isAuth: false,
  isFetching: false,
  error: null,
}

export const authReducer = (
  state = initialState,
  action: ActionType
): AuthStore => {
  switch (action.type) {
    case AuthActionTypes.TOGGLE_IS_FETCHING:
      return { ...state, isFetching: true }
    case AuthActionTypes.SET_CURRENT_USER:
      return { ...state, ...action.payload, isFetching: false, isAuth: true }
    case AuthActionTypes.FETCHING_ERROR:
      return { ...state, isFetching: false, error: action.payload }
    default:
      return state
  }
}
