import { fetchUsersApi, followUserApi, unfollowUserApi } from "../../api/users"
import { AppDispatch, RootState } from "../store"
import { setTotalUsersCount, setUsersFailure, setUsersRequest, setUsersSuccess, toggleFollowOnUserError, toggleFollowOnUserRequest, toggleFollowOnUserSuccess } from "./actions"

export const fetchUsersThunk = (currentUsersPage = 1, term = '', friend = null as null | boolean) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(setUsersRequest())
      const { users: { maxPageItemsCount } } = getState()
      const { data: {totalCount, items} } = await fetchUsersApi(currentUsersPage, maxPageItemsCount, term, friend)
      dispatch(setTotalUsersCount(totalCount))
      dispatch(setUsersSuccess(items))
    }catch(e) {
      dispatch(setUsersFailure('An error occurred during fetching developers'))
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
        dispatch(toggleFollowOnUserError(response.messages[0]!))
      }
      dispatch(toggleFollowOnUserRequest(userId))
    }catch(e) {
      console.log(e)
      dispatch(toggleFollowOnUserError('An error occurred during follow/unfollow on user'))
    }
  }
}



