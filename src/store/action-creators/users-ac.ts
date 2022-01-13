import { User, UsersAction, UsersActionTypes } from './../types/users-types';

export const toggleUserFollow = (userId: number): UsersAction => {
  return { type: UsersActionTypes.TOGGLE_FOLLOW, payload: userId }
}

export const setUsers = (users: User[]): UsersAction => {
  return { type: UsersActionTypes.SET_USERS, payload: users }
}

export const setTotalCount = (totalCount: number): UsersAction => {
  return { type: UsersActionTypes.SET_TOTAL_COUNT, payload: totalCount }
}

export const setCurrentPage = (currentPage: number): UsersAction => {
  return { type: UsersActionTypes.SET_CURRENT_PAGE, payload: currentPage }
}

export const toggleIsFetching = (): UsersAction => {
  return { type: UsersActionTypes.TOGGLE_IS_FETCHING }
}
