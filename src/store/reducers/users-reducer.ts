import { UsersState, UsersActionTypes, UsersAction } from './../types/users-types';

const initialState: UsersState = {
  users: [],
  totalCount: 0,
  pageItemsCount: 55,
  currentPage: 1,
  isFetching: false,
}

export const usersReducer = (state = initialState, action: UsersAction): UsersState => {
  switch (action.type) {
    case UsersActionTypes.TOGGLE_FOLLOW:
      return { ...state,
        users: state.users.map((user) => {
          if (user.id === action.payload) { return { ...user, followed: !user.followed } }
          return user
        }),
      }
    case UsersActionTypes.SET_USERS:
      return { ...state, users: [...action.payload] }
    case UsersActionTypes.SET_TOTAL_COUNT:
      return { ...state, totalCount: action.payload, }
    case UsersActionTypes.SET_CURRENT_PAGE:
      return { ...state, currentPage: action.payload }
    case UsersActionTypes.TOGGLE_IS_FETCHING:
      return { ...state, isFetching: !state.isFetching }
    default:
      return state
  }
}