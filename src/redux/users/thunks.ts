import { fetchUsersApi, followUserApi, unfollowUserApi } from "../../api/users"
import { AppDispatch, RootState } from "../store"
import { setTotalUsersCount, fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess, toggleFollowOnUserFailure, toggleFollowOnUserRequest, toggleFollowOnUserSuccess } from "./actions"

export const fetchUsersThunk = (currentUsersPage = 1, maxPageItemsCount = 10, term = '', friend = null as null | boolean) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(fetchUsersRequest())
      const { data: response } = await fetchUsersApi(currentUsersPage, maxPageItemsCount, term, friend)
      if(!response.error) {
        dispatch(setTotalUsersCount(response.totalCount))
        dispatch(fetchUsersSuccess(response.items))
      }else {
        dispatch(fetchUsersFailure(response.error))
      }
    }catch(e) {
      console.log(e)
      dispatch(fetchUsersFailure('An error occurred during fetching developers'))
    }
  }
}

export const toggleFollowOnUserThunk = (userId: number, followed: boolean) => {
  return async ( dispatch: AppDispatch ) => {
    try{
      dispatch(toggleFollowOnUserRequest(userId))
      const apiMethod = followed ? unfollowUserApi : followUserApi
      const { data: response} = await apiMethod(userId)
      if(response.resultCode === 0) {
        dispatch(toggleFollowOnUserSuccess(userId))
      }else if(response.resultCode === 1) {
        dispatch(toggleFollowOnUserFailure({error: response.messages[0]!, id: userId}))
      }
    }catch(e) {
      console.log(e)
      dispatch(toggleFollowOnUserFailure({error: 'An error occurred during follow/unfollow on user', id: userId}))
    }
  }
}



