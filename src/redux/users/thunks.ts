import { fetchUsersApi, followUserApi, unfollowUserApi } from "../../api/users"
import { AppDispatch } from "../store"
import { fetchSearchedUsersSuccess, fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess, setTotalCount, toggleFollowOnUserFailure, toggleFollowOnUserRequest, toggleFollowOnUserSuccess } from "./actions"

export const fetchUsersThunk = (currentUsersPage: number, maxPageItemsCount = 100, term = '', friend = null as null | boolean) => {
  return async (dispatch: AppDispatch) => {
    const fetchUsersSuccessCallBack = term ? fetchSearchedUsersSuccess : fetchUsersSuccess
    const action = term ? (friend ? 'searched/friends' : 'searched/people') : (friend ? 'friends' : 'people')

    try {
      dispatch(fetchUsersRequest())
      const { data: response } = await fetchUsersApi(currentUsersPage, maxPageItemsCount, term, friend)
      if(!response.error) {
        dispatch(setTotalCount({totalCount: response.totalCount, action }))
        dispatch(fetchUsersSuccessCallBack(response.items))
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



