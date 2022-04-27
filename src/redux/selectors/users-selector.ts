import { RootState } from '../store'

export const usersSelector = (state: RootState) => {
  return state.usersPage.users
}

export const totalCountSelector = (state: RootState) => {
  return state.usersPage.totalCount
}

export const currentPageSelector = (state: RootState) => {
  return state.usersPage.currentPage
}

export const pageItemsCountSelector = (state: RootState) => {
  return state.usersPage.pageItemsCount
}

export const isFetchingSelector = (state: RootState) => {
  return state.usersPage.isFetching
}

export const isFollowingSelector = (state: RootState) => {
  return state.usersPage.isFollowing
}