import { RootState } from "../store"

export const usersSelector = (state: RootState) => {
  return state.users.users
}

export const totalUsersCountSelector = (state: RootState) => {
  return state.users.totalUsersCount
}

export const currentUsersPageSelector = (state: RootState) => {
  return state.users.currentUsersPage
}

export const maxPageItemsCountSelector = (state: RootState) => {
  return state.users.maxPageItemsCount
}

export const fetchUsersPendingSelector = (state: RootState) => {
  return state.users.requests.fetchUsersPending
}

export const toggleIsSubscribePendingSelector = (state: RootState) => {
  return state.users.requests.toggleFollowOnUserPending
}