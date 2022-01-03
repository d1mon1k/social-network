const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW'
const SET_USERS = 'SET_USERS'
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

interface UsersReducer {
  users: {id: number, name: string, status: string, photos: {small: string, big: string}, followed: boolean}[],
  totalCount: number,
  pageItemsCount: number,
  currentPage: number,
  isFetching: boolean
}

const initialState: UsersReducer = {
  users: [],
  totalCount: 0,
  pageItemsCount: 55,
  currentPage: 1,
  isFetching: false,
}

//============================== REDUCER ==============================

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FOLLOW:
      return {
        ...state,
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: !user.followed }
          }
          return user
        }),
      }
    case SET_USERS:
      return {
        ...state,
        users: [...action.users],
      }
    case SET_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.totalCount,
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      }
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: !state.isFetching }
    default:
      return state
  }
}

//============================== ACTION CREATORS ==============================

export const toggleUserFollow = (userId) => {
  return { type: TOGGLE_FOLLOW, userId }
}

export const setUsers = (users) => {
  return { type: SET_USERS, users }
}

export const setTotalCount = (totalCount) => {
  return { type: SET_TOTAL_COUNT, totalCount }
}

export const setCurrentPage = (currentPage) => {
  return { type: SET_CURRENT_PAGE, currentPage }
}

export const toggleIsFetching = () => {
  return { type: TOGGLE_IS_FETCHING }
}
