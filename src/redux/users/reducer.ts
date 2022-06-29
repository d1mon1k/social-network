import {
  SetCurrentUsersPage,
  SetLastRequest,
  FetchUsersFailure,
  FetchUsersSuccess,
  ToggleFollowOnUserSuccess,
  ToggleFollowOnUserRequest,
  UsersAction,
  ToggleFollowOnUserFailure,
  SetCurrentFriendsPage,
  SetTotalPeopleCount,
  SetTotalFriendsCount,
} from './actions'
import { IUser, IUsers, LastRequestType, UsersConstants } from './types';

/* ------------- Types ------------- */
type UsersStateType = typeof initialState
interface UsersState extends UsersStateType {}

const initialState = {
  users: {
    friends: [],
    people: []
  } as IUsers, 
  totalPeopleCount: 0,
  totalFriendsCount: 0,
  currentPeoplePage: 1,
  currentFriendsPage: 1,
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
  const isFriends = action.payload.every(user => user.followed)
  return {
    ...state,
    users: isFriends
      ? { ...state.users, friends: [...state.users.friends, ...action.payload] }
      : { ...state.users, people: [...state.users.people, ...action.payload] },
    requests: {
      ...state.requests,
      fetchUsersPending: false,
    },
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
  }
}

const setTotalPeopleCount = (state: UsersState, action: SetTotalPeopleCount) => {
  return {
    ...state,
    totalPeopleCount: action.payload,
  }
}

const setTotalFriendsCount = (state: UsersState, action: SetTotalFriendsCount) => {
  return {
    ...state,
    totalFriendsCount: action.payload,
  }
}

const setCurrentPeoplePage = (state: UsersState, action: SetCurrentUsersPage) => {
  return { 
    ...state,
    currentPeoplePage: action.payload
   }
}

const setCurrentFriendsPage = (state: UsersState, action: SetCurrentFriendsPage) => {
  return { 
    ...state,
    currentFriendsPage: action.payload
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
  const toggleFollow = (users: IUser[]) => users.map((user) => {
    if (user.id === action.payload) {
      return { ...user, followed: !user.followed }
    }
    return user
  })
  const people = toggleFollow(state.users.people)
  const friends = toggleFollow(state.users.friends)

  return {
    ...state,
    users: { ...state.users, friends, people  },
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
    case UsersConstants.SET_TOTAL_PEOPLE_COUNT:
      return setTotalPeopleCount(state, action)
    case UsersConstants.SET_TOTAL_FRIENDS_COUNT:
      return setTotalFriendsCount(state, action)
    case UsersConstants.SET_CURRENT_PEOPLE_PAGE:
      return setCurrentPeoplePage(state, action)
    case UsersConstants.SET_CURRENT_FRIENDS_PAGE:
      return setCurrentFriendsPage(state, action)
    case UsersConstants.SET_LAST_REQUEST:
      return setLastRequest(state, action)
    default:
      return state
  }
}

export default usersReducer

