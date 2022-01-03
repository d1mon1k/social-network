const TOGGLE_FOLLOW = 'TOGGLE-FOLLOW'
const SET_USERS = 'SET-USERS'
const SET_TOTAL_COUNT = 'SET-TOTAL-COUNT'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE-IS-FETCHING'

const initialState = {
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
