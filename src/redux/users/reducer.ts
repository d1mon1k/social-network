import { toggleFollow } from '../../helpers/helpers';
import {
  FetchFriendsSuccess, FetchPeopleSuccess, FetchSearchedFriendsSuccess, FetchSearchedPeopleSuccess, FetchUsersFailure, SetFriendsPage, SetFriendsTotalCount, SetPeoplePage, SetPeopleTotalCount, SetSearchedFriendsPage, SetSearchedFriendsTotalCount, SetSearchedPeoplePage, SetSearchedPeopleTotalCount, ToggleFollowOnUserFailure, ToggleFollowOnUserRequest, ToggleFollowOnUserSuccess, UsersAction
} from './actions';
import { IUsersData, UsersConstants } from './types';

/* ------------- Types ------------- */
type UsersStateType = typeof initialState
interface UsersState extends UsersStateType {}

const initialState = {
  users: {
    friends: { items: [], totalItemsCount: 0, currentPage: 1, },
    people: { items: [], totalItemsCount: 0, currentPage: 1, }
  } as IUsersData, 
  searchedUsers: {
    friends: { items: [], totalItemsCount: 0, currentPage: 1, },
    people: { items: [], totalItemsCount: 0, currentPage: 1, }
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

const fetchPeopleSuccess = (state: UsersState, action: FetchPeopleSuccess) => {
  return {
    ...state,
    users: {
      ...state.users,
      people: { ...state.users.people, items: [...state.users.people.items, ...action.payload] },
    },
    requests: {
      ...state.requests,
      fetchUsersPending: false,
    },
  }
}

const fetchFriendsSuccess = (state: UsersState, action: FetchFriendsSuccess) => {
  return {
    ...state,
    users: {
      ...state.users,
      friends: { ...state.users.friends, items: [...state.users.friends.items, ...action.payload] }
    },
    requests: {
      ...state.requests,
      fetchUsersPending: false,
    },
  }
}

const fetchSearchedPeopleSuccess = (state: UsersState, action: FetchSearchedPeopleSuccess) => {
  return {
    ...state,
    searchedUsers: {
      ...state.searchedUsers,
      people: { ...state.searchedUsers.people, items: [...state.searchedUsers.people.items, ...action.payload] },
    },
    requests: {
      ...state.requests,
      fetchUsersPending: false,
    },
  }
}

const fetchSearchedFriendsSuccess = (state: UsersState, action: FetchSearchedFriendsSuccess) => {
  return {
    ...state,
    searchedUsers: {
      ...state.searchedUsers,
      friends: { ...state.searchedUsers.friends, items: [...state.searchedUsers.friends.items, ...action.payload] },
    },
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
      },
    },
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

const setPeopleTotalCount = (state: UsersState, action: SetPeopleTotalCount) => {
  return {
    ...state,
    users: {
      ...state.users,
      people: { ...state.users.people, totalItemsCount: action.payload }
    },
  }
}

const setFriendsTotalCount = (state: UsersState, action: SetFriendsTotalCount) => {
  return {
    ...state,
    users: {
      ...state.users,
      friends: { ...state.users.friends, totalItemsCount: action.payload }
    }
  }  
}

const setSearchedPeopleTotalCount = (state: UsersState, action: SetSearchedPeopleTotalCount) => {
  return {
    ...state,
    searchedUsers: {
      ...state.searchedUsers,
      people: { ...state.searchedUsers.people, totalItemsCount: action.payload }
    }
  }
}

const setSearchedFriendsTotalCount = (state: UsersState, action: SetSearchedFriendsTotalCount) => {
  return {
    ...state,
    searchedUsers: {
      ...state.searchedUsers,
      friends: { ...state.searchedUsers.friends, totalItemsCount: action.payload }
    }
  }
}

const setPeoplePage = (state: UsersState, action: SetPeoplePage) => {
  return {
    ...state,
    users: {
      ...state.users,
      people: {
        ...state.users.people,
        currentPage: action.payload,
      },
    },
  }
}

const setFriendsPage = (state: UsersState, action: SetFriendsPage) => {
  return {
    ...state,
    users: {
      ...state.users,
      friends: {
        ...state.users.friends,
        currentPage: action.payload,
      },
    },
  }
}

const setSearchedPeoplePage = (state: UsersState, action: SetSearchedPeoplePage) => {
  return {
    ...state,
    searchedUsers: {
      ...state.users,
      people: {
        ...state.searchedUsers.people,
        currentPage: action.payload,
      },
    },
  }
}

const setSearchedFriendsPage = (state: UsersState, action: SetSearchedFriendsPage) => {
  return {
    ...state,
    searchedUsers: {
      ...state.users,
      friends: {
        ...state.searchedUsers.friends,
        currentPage: action.payload,
      },
    },
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
    users: {
      ...state.users,
      friends: { ...state.users.friends, items: toggleFollow(state.users.friends.items, action.payload) },
      people: { ...state.users.people, items: toggleFollow(state.users.people.items, action.payload) },
    },
    searchedUsers: {
      ...state.searchedUsers,
      friends: { ...state.searchedUsers.friends, items: toggleFollow(state.searchedUsers.friends.items, action.payload) },
      people: { ...state.searchedUsers.people, items: toggleFollow(state.searchedUsers.people.items, action.payload) },
    },
    requests: {
      ...state.requests,
      toggleFollowOnUserPending: [
        ...state.requests.toggleFollowOnUserPending
      ].filter((id) => id !== action.payload),
    },
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
    case UsersConstants.FETCH_PEOPLE_SUCCESS:
      return fetchPeopleSuccess(state, action)
    case UsersConstants.FETCH_FRIENDS_SUCCESS:
      return fetchFriendsSuccess(state, action)
    case UsersConstants.FETCH_SEARCHED_PEOPLE_SUCCESS:
      return fetchSearchedPeopleSuccess(state, action)
    case UsersConstants.FETCH_SEARCHED_FRIENDS_SUCCESS:
      return fetchSearchedFriendsSuccess(state, action)
    case UsersConstants.FETCH_USERS_FAILURE:
      return fetchUsersFailure(state, action)
    case UsersConstants.SET_PEOPLE_TOTAL_COUNT:
      return setPeopleTotalCount(state, action)
    case UsersConstants.SET_FRIENDS_TOTAL_COUNT:
      return setFriendsTotalCount(state, action)
    case UsersConstants.SET_SEARCHED_PEOPLE_TOTAL_COUNT:
      return setSearchedPeopleTotalCount(state, action)
    case UsersConstants.SET_SEARCHED_FRIENDS_TOTAL_COUNT:
      return setSearchedFriendsTotalCount(state, action)
    case UsersConstants.SET_PEOPLE_PAGE:
      return setPeoplePage(state, action)
    case UsersConstants.SET_FRIENDS_PAGE:
      return setFriendsPage(state, action)
    case UsersConstants.SET_SEARCHED_PEOPLE_PAGE:
      return setSearchedPeoplePage(state, action)
    case UsersConstants.SET_SEARCHED_FRIENDS_PAGE:
      return setSearchedFriendsPage(state, action)
    case UsersConstants.CLEAR_SEARCHED_USERS_STATE:
      return clearUsersState(state)
    default:
      return state
  }
}

export default usersReducer

