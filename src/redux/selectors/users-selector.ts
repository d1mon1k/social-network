import { RootState } from '../store'

export const usersSelector = (state: RootState) => {
  return state.users.users
}

export const totalCountSelector = (state: RootState) => {
  return state.users.totalUsersCount
}

export const currentPageSelector = (state: RootState) => {
  return state.users.currentUsersPage
}

export const pageItemsCountSelector = (state: RootState) => {
  return state.users.maxPageItemsCount
}

export const isFetchingSelector = (state: RootState) => {
  return state.users.request.fetchUsersPending
}

export const isFollowingSelector = (state: RootState) => {
  return state.users.request.toggleIsSubscribePending
}

// export const totalCountSelector = (state: RootState) => {
//   return state.usersPage.totalCount
// }

// export const currentPageSelector = (state: RootState) => {
//   return state.usersPage.currentPage
// }

// export const pageItemsCountSelector = (state: RootState) => {
//   return state.usersPage.pageItemsCount
// }

// export const isFetchingSelector = (state: RootState) => {
//   return state.usersPage.isFetching
// }

// export const isFollowingSelector = (state: RootState) => {
//   return state.usersPage.isFollowing
// }