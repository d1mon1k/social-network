import {
  SetCurrentUsersPage,
  SetLastRequest,
  SetTotalUsersCount,
  SetUsersFailure,
  SetUsersSuccess,
  ToggleFollowOnUserSuccess,
  ToggleFollowOnUserRequest,
  UsersAction,
  ToggleFollowOnUserError,
} from './actions'
import { IUser, LastRequestType, UsersConstants } from './types';

/* ------------- Types ------------- */
type UsersStateType = typeof initialState
interface UsersState extends UsersStateType {}

const initialState = {
  users: [] as IUser[] | [], 
  totalUsersCount: 0 as number,
  maxPageItemsCount: 10 as number,
  currentUsersPage: 1 as number,
  requests: {
    toggleFollowOnUserPending: [] as number[],
    toggleFollowOnUserError: null as string | null,
    fetchUsersPending: false,
    fetchUsersFailure: null as string | null,
    lastRequest: null as LastRequestType,
  }
}

/* ------------- Reducers ------------- */
const setLastRequest = (state: UsersState, action: SetLastRequest) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      lastRequest: action.payload
    }
  }
}

const setUsersRequest = (state: UsersState) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      toggleFollowOnUserError: null,
      fetchUsersPending: true,
      fetchUsersFailure: null
    }
  }
}

const setUsersSuccess = (state: UsersState, action: SetUsersSuccess) => {
  return { 
    ...state, 
    users: [...state.users ,...action.payload] ,
    requests: {
      ...state.requests,
      fetchUsersPending: false
    }
  }
}

const setUsersFailure = (state: UsersState, action: SetUsersFailure) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      fetchUsersPending: false,
      fetchUsersFailure: action.payload
    }
  }
}

const clearUsersState = (state: UsersState) => {
  return { 
    ...state, 
    users: [],
    currentUsersPage: 1,
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

const toggleFollowOnUserRequest = (state: UsersState, action: ToggleFollowOnUserRequest) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      toggleFollowOnUserError: null,
      toggleFollowOnUserPending: [...state.requests.toggleFollowOnUserPending].some((num) => num === action.payload)
      ? [...state.requests.toggleFollowOnUserPending].filter((num) => num !== action.payload)
      : [...state.requests.toggleFollowOnUserPending, action.payload]
    }
  } 
}

const toggleFollowOnUserSuccess = (state: UsersState, action: ToggleFollowOnUserSuccess) => {
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

const toggleFollowOnUserError = (state: UsersState, action: ToggleFollowOnUserError) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      toggleFollowOnUserError: action.payload
    }
  }
}

const usersReducer = (state = initialState, action: UsersAction): UsersState => {
  switch (action.type) {
    case UsersConstants.TOGGLE_FOLLOW_ON_USER_REQUEST:
      return toggleFollowOnUserRequest(state, action)
    case UsersConstants.TOGGLE_FOLLOW_ON_USER_SUCCESS:
      return toggleFollowOnUserSuccess(state, action)
    case UsersConstants.TOGGLE_FOLLOW_ON_USER_ERROR:
      return toggleFollowOnUserError(state, action)
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
    case UsersConstants.CLEAR_USERS_STATE:
      return clearUsersState(state)
    case UsersConstants.SET_LAST_REQUEST:
      return setLastRequest(state, action)
    default:
      return state
  }
}

export default usersReducer

