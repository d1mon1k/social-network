import { SetCurrentUsersPage, SetTotalUsersCount, SetUsersFailure, SetUsersSuccess, ToggleFollowOnUser, ToggleIsSubscribePending, UsersAction } from './actions';
import { IUser, UsersConstants } from './types';

/* ------------- Types ------------- */
type UsersStateType = typeof initialState
interface UsersState extends UsersStateType {}

const initialState = {
  users: [] as IUser[] | [], 
  totalUsersCount: 0 as number,
  maxPageItemsCount: 10 as number,
  currentUsersPage: 1 as number,
  request: {
    toggleIsSubscribePending: [] as number[],
    fetchUsersPending: false,
    fetchUsersFailure: null as string | null
  }
}

/* ------------- Reducers ------------- */
const setUsersRequest = (state: UsersState) => {
  return {
    ...state,
    request: {
      ...state.request,
      fetchUsersPending: true,
      fetchUsersFailure: null
    }
  }
}

const setUsersSuccess = (state: UsersState, action: SetUsersSuccess) => {
  return { 
    ...state, 
    users: [...state.users ,...action.payload] ,
    request: {
      ...state.request,
      fetchUsersPending: false
    }
  }
}

const setUsersFailure = (state: UsersState, action: SetUsersFailure) => {
  return {
    ...state,
    request: {
      ...state.request,
      fetchUsersPending: false,
      fetchUsersFailure: action.payload
    }
  }
}

const clearUsersState = (state: UsersState) => {
  return { 
    ...state, 
    users: []
  }
}

const toggleFollowOnUser = (state: UsersState, action: ToggleFollowOnUser) => {
  return {
    ...state,
    users: state.users!.map((user) => {
      if (user.id === action.payload) {
        return { ...user, followed: !user.followed }
      }
      return user
    }),
  }
}

const setTotalUsersCount = (state: UsersState, action: SetTotalUsersCount) => {
  return {
    ...state,
    totalUsersCount: action.payload,
  }
}

const setCurrentUsersPage = (state: UsersState, action: SetCurrentUsersPage) => {
  return { 
    ...state,
    currentUsersPage: action.payload
   }
}

const toggleIsSubscribePending = (state: UsersState, action: ToggleIsSubscribePending) => {
  return {
    ...state,
    request: {
      ...state.request,
      toggleIsSubscribePending: [...state.request.toggleIsSubscribePending].some((num) => num === action.payload)
      ? [...state.request.toggleIsSubscribePending].filter((num) => num !== action.payload)
      : [...state.request.toggleIsSubscribePending, action.payload]
    }
  } 
}

const usersReducer = (state = initialState, action: UsersAction): UsersState => {
  switch (action.type) {
    case UsersConstants.TOGGLE_FOLLOW_ON_USER:
      return toggleFollowOnUser(state, action)
    case UsersConstants.SET_USERS_REQUEST:
      return setUsersRequest(state)
    case UsersConstants.SET_USERS_SUCCESS:
      return setUsersSuccess(state, action)
    case UsersConstants.SET_USERS_FAILURE:
      return setUsersFailure(state, action)
    case UsersConstants.SET_TOTAL_USERS_COUNT:
      return setTotalUsersCount(state, action)
    case UsersConstants.SET_CURRENT_USERS_PAGE:
      return setCurrentUsersPage(state, action)
    case UsersConstants.TOGGLE_IS_SUBSCRIBE_PENDING:
      return toggleIsSubscribePending(state, action)
    case UsersConstants.CLEAR_USERS_STATE:
      return clearUsersState(state)
    default:
      return state
  }
}

export default usersReducer

