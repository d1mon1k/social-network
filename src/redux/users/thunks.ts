import { fetchUsersApi, followUserApi, unfollowUserApi } from "../../api/users"
import { AppDispatch, RootState } from "../store"
import { setTotalUsersCount, setUsersFailure, setUsersRequest, setUsersSuccess, toggleFollowOnUser, toggleIsSubscribePending } from "./actions"

export const fetchUsersThunk = (currentUsersPage = 1, term = '', friend = null as null | boolean) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(setUsersRequest())
      const { users: { maxPageItemsCount } } = getState()
      const {data: {totalCount, items}} = await fetchUsersApi(currentUsersPage, maxPageItemsCount, term, friend)
      dispatch(setTotalUsersCount(totalCount))
      dispatch(setUsersSuccess(items))
    }catch(e) {
      dispatch(setUsersFailure('Error'))
    }
  }
}

export const toggleFollowOnUserThunk = (userId: number, followed: boolean) => {
  return async ( dispatch: AppDispatch ) => {
    try{
      const apiMethod = followed ? unfollowUserApi : followUserApi
      dispatch(toggleIsSubscribePending(userId))
      const { data: { resultCode }} = await apiMethod(userId)
      resultCode === 0 &&  dispatch(toggleFollowOnUser(userId))
      dispatch(toggleIsSubscribePending(userId))
    }catch(e) {
      console.log(e)
    }
  }
}



