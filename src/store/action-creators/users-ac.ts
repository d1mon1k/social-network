import { UsersAPI } from '../../API/serviceAPI';
import { AppDispatch, RootState } from './../store';
import { IUser, UsersAction, UsersActionTypes } from './../types/users-types';

export const toggleUserFollow = (userId: number): UsersAction => {
  return { type: UsersActionTypes.TOGGLE_FOLLOW, payload: userId }
}

export const setUsers = (users: IUser[]): UsersAction => {
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

export const toggleIsFollowing = (id: number): UsersAction => {
  return { type: UsersActionTypes.TOGGLE_IS_FOLLOWING, payload: id }
}

export const getUsers = () => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const { usersPage } = getState()
    dispatch(toggleIsFetching()) 
    UsersAPI
      .getUsers(usersPage.currentPage, usersPage.pageItemsCount)
      .then(({ totalCount, items }) => {
        dispatch(setTotalCount(totalCount))
        dispatch(setUsers(items))
        dispatch(toggleIsFetching())
      })
  }
}

export const changeCurrentPage = (currentPage = 1) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const { usersPage } = getState()
    dispatch(setCurrentPage(currentPage))
    dispatch(toggleIsFetching())
      UsersAPI.getUsers(currentPage, usersPage.pageItemsCount)
      .then(({ totalCount, items }) => {
        dispatch(setTotalCount(totalCount))
        dispatch(setUsers(items))
        dispatch(toggleIsFetching())
      })
  }
}

export const userFollow = (userId: number) => {
  return (dispatch: AppDispatch, getState: RootState) => {
    dispatch(toggleIsFollowing(userId))
    UsersAPI.followUser(userId)
    .then(({ resultCode }) => {
      if(resultCode === 0) {
        dispatch(toggleUserFollow(userId))
      }
      dispatch(toggleIsFollowing(userId))
    })
  }
}

export const userUnFollow = (userId: number) => {
  return (dispatch: AppDispatch, getState: RootState) => {
    dispatch(toggleIsFollowing(userId))
    UsersAPI.unFollowUser(userId)
    .then(({ resultCode }) => {
      if(resultCode === 0) {
        dispatch(toggleUserFollow(userId))
      }
      dispatch(toggleIsFollowing(userId)     )
    }) 
  }
} 