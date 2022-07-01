import {
  SetCurrentPage,
  FetchUsersFailure,
  FetchUsersSuccess,
  ToggleFollowOnUserSuccess,
  ToggleFollowOnUserRequest,
  UsersAction,
  ToggleFollowOnUserFailure,
  SetTotalCount,
  FetchSearchedUsersSuccess,
} from './actions'
import { IUser, IUsersData, UsersConstants } from './types';

/* ------------- Types ------------- */
type UsersStateType = typeof initialState
interface UsersState extends UsersStateType {}

const initialState = {
  users: {
    friends: {
      items: [],
      totalItemsCount: 0,
      currentPage: 1,
    },
    people: {
      items: [],
      totalItemsCount: 0,
      currentPage: 1,
    }
  } as IUsersData, 

  searchedUsers: {
    friends: {
      items: [],
      totalItemsCount: 0,
      currentPage: 1,
    },
    people: {
      items: [],
      totalItemsCount: 0,
      currentPage: 1,
    }
  } as IUsersData,

  requests: {
    toggleFollowOnUserPending: [] as number[],
    toggleFollowOnUserError: null as string | null,
    fetchUsersPending: false,
    fetchUsersError: null as string | null,
  }
}

/* ------------- Reducers ------------- */
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
  const friendsState = {
    ...state.users,
    friends: { ...state.users.friends, items: [...state.users.friends.items, ...action.payload] },
  }
  const peopleState = {
    ...state.users,
    people: { ...state.users.people,items: [...state.users.people.items, ...action.payload] },
  }

  return {
    ...state,
    users: isFriends ? friendsState : peopleState,
    requests: {
      ...state.requests,
      fetchUsersPending: false,
    },
  }
}

const fetchSearchedUsersSuccess = (state: UsersState, action: FetchSearchedUsersSuccess) => {
  const isFriends = action.payload.every(user => user.followed)
  const friendsState = {
    ...state.searchedUsers,
    friends: { ...state.searchedUsers.friends, items: [...state.searchedUsers.friends.items, ...action.payload] },
  }
  const peopleState = {
    ...state.searchedUsers,
    people: { ...state.searchedUsers.people, items: [...state.searchedUsers.people.items, ...action.payload] },
  }

  return {
    ...state,
    searchedUsers: isFriends ? friendsState : peopleState,
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
    searchedUsers: {
      friends: {
        items: [],
        totalItemsCount: 0,
        currentPage: 1,
      },
      people: {
        items: [],
        totalItemsCount: 0,
        currentPage: 1,
      },
    },
  }
}

const setTotalCount = (state: UsersState, action: SetTotalCount) => {
  const searchedPeople = action.payload.action === 'searched/people' ? {
      people: { ...state.searchedUsers.people, totalItemsCount: action.payload.totalCount }
    } : null
  const searchedFriends = action.payload.action === 'searched/friends' ? {
      friends: { ...state.searchedUsers.friends, totalItemsCount: action.payload.totalCount }
    } : null
  const friends = action.payload.action === 'friends' ? {
      friends: { ...state.users.friends, totalItemsCount: action.payload.totalCount }
    } : null
  const people = action.payload.action === 'people' ? {
      people: { ...state.users.people, totalItemsCount: action.payload.totalCount }
    } : null

  return {
    ...state,
    users: {
      ...state.users,
      ...(searchedFriends || searchedPeople || friends || people)
    }
  }
}

const setCurrentPage = (state: UsersState, action: SetCurrentPage) => {
  const searchedPeople = action.payload.action === 'searched/people' ? {
      people: { ...state.searchedUsers.people, currentPage: action.payload.currentPage }
    } : null
  const searchedFriends = action.payload.action === 'searched/friends' ? {
      friends: { ...state.searchedUsers.friends, currentPage: action.payload.currentPage }
    } : null
  const friends = action.payload.action === 'friends' ? {
      friends: { ...state.users.friends, currentPage: action.payload.currentPage }
    } : null
  const people = action.payload.action === 'people' ? {
      people: { ...state.users.people, currentPage: action.payload.currentPage }
    } : null

  return {
    ...state,
    users: {
      ...state.users,
      ...(searchedPeople || searchedFriends || friends || people)
    }
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
  const people = toggleFollow(state.users.people.items)
  const friends = toggleFollow(state.users.friends.items)

  return {
    ...state,
    users: {
      ...state.users, 
      friends: {
        ...state.users.friends,
        items: [...state.users.friends.items, ...friends]
      }, 
      people: {
        ...state.users.people,
        items: [...state.users.people.items, ...people]
      }  
    },
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
    case UsersConstants.FETCH_SEARCHED_USERS_SUCCESS:
      return fetchSearchedUsersSuccess(state, action)
    case UsersConstants.FETCH_USERS_FAILURE:
      return fetchUsersFailure(state, action)
    case UsersConstants.SET_TOTAL_COUNT:
      return setTotalCount(state, action)
    case UsersConstants.SET_CURRENT_PAGE:
      return setCurrentPage(state, action)
    case UsersConstants.CLEAR_USERS_STATE:
      return clearUsersState(state)
    default:
      return state
  }
}

export default usersReducer

