import {
  SetCurrentUsersPage,
  SetLastRequest,
  SetTotalUsersCount,
  FetchUsersFailure,
  FetchUsersSuccess,
  ToggleFollowOnUserSuccess,
  ToggleFollowOnUserRequest,
  UsersAction,
  ToggleFollowOnUserFailure,
} from './actions'
import { IUser, LastRequestType, UsersConstants } from './types';

/* ------------- Types ------------- */
type UsersStateType = typeof initialState
interface UsersState extends UsersStateType {}

const initialState = {
  users: [] as IUser[] | [], 
  totalUsersCount: 0 as number,
  maxPageItemsCount: 9 as number,
  currentUsersPage: 1 as number,
  requests: {
    toggleFollowOnUserPending: [] as number[],
    toggleFollowOnUserError: null as string | null,
    fetchUsersPending: false,
    fetchUsersError: null as string | null,
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

const fetchUsersRequest = (state: UsersState) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      toggleFollowOnUserError: null,
      fetchUsersPending: true,
      fetchUsersError: null,
    }
  }
}

const fetchUsersSuccess = (state: UsersState, action: FetchUsersSuccess) => {
  return { 
    ...state, 
    users: [...state.users ,...action.payload] ,
    requests: {
      ...state.requests,
      fetchUsersPending: false
    }
  }
}

const fetchUsersFailure = (state: UsersState, action: FetchUsersFailure) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      fetchUsersPending: false,
      fetchUsersError: action.payload
    }
  }
}

const clearUsersState = (state: UsersState) => {
  return { 
    ...state, 
    users: [],
    currentUsersPage: 1,
    totalUsersCount: 0,
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
      toggleFollowOnUserPending: [...state.requests.toggleFollowOnUserPending, action.payload]
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
    requests: {
      ...state.requests,
      toggleFollowOnUserPending: [...state.requests.toggleFollowOnUserPending].filter((id) => id !== action.payload)
    }
  }
}

const toggleFollowOnUserError = (state: UsersState, action: ToggleFollowOnUserFailure) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      toggleFollowOnUserError: action.payload.error,
      toggleFollowOnUserPending: [...state.requests.toggleFollowOnUserPending].filter((id) => id !== action.payload.id)
    }
  }
}

const usersReducer = (state = initialState, action: UsersAction): UsersState => {
  switch (action.type) {
    case UsersConstants.TOGGLE_FOLLOW_ON_USER_REQUEST:
      return toggleFollowOnUserRequest(state, action)
    case UsersConstants.TOGGLE_FOLLOW_ON_USER_SUCCESS:
      return toggleFollowOnUserSuccess(state, action)
    case UsersConstants.TOGGLE_FOLLOW_ON_USER_FAILURE:
      return toggleFollowOnUserError(state, action)
    case UsersConstants.FETCH_USERS_REQUEST:
      return fetchUsersRequest(state)
    case UsersConstants.FETCH_USERS_SUCCESS:
      return fetchUsersSuccess(state, action)
    case UsersConstants.FETCH_USERS_FAILURE:
      return fetchUsersFailure(state, action)
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

