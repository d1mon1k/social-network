// import { AuthAction, AuthActionTypes, AuthStore } from '../types/auth-types'
export {}
// const initialState: AuthStore = {
//   data: {
//     id: null,
//     login: null,
//     email: null,
//   },
//   messages: null,
//   fieldsError: null,
//   resultCode: null,
//   isAuth: false,
//   isFetching: false,
//   error: null,
// }

// export const authReducer = (
//   state = initialState,
//   action: AuthAction
// ): AuthStore => {
//   switch (action.type) {
//     case AuthActionTypes.SET_CURRENT_USER:
//       return { ...state, ...action.payload, isAuth: true }
//     case AuthActionTypes.DELETE_CURRENT_USER:
//       return {
//         ...state,
//         isAuth: false,
//         data: { ...state.data, id: null, login: null, email: null },
//         messages: null,
//         fieldsError: null,
//         resultCode: null,
//       }
//     case AuthActionTypes.FETCHING_ERROR:
//       return { ...state, isFetching: false, error: action.payload }
//     case AuthActionTypes.FETCHING_SUCCESS:
//       return { ...state, isFetching: false, isAuth: true }
//     case AuthActionTypes.IS_FETCHING:
//       return { ...state, isFetching: true }
//     default:
//       return state
//   }
// }
