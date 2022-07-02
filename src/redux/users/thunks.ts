import { fetchUsersApi, followUserApi, unfollowUserApi } from "../../api/users"
import { getPagesAmount } from "../../helpers/helpers"
import { AppDispatch, RootState } from "../store"
import { fetchSearchedUsersSuccess, fetchUsersFailure, fetchUsersRequest, fetchUsersSuccess, setCurrentPage, setTotalCount, toggleFollowOnUserFailure, toggleFollowOnUserRequest, toggleFollowOnUserSuccess } from "./actions"

export const fetchUsersThunk = (maxPageItemsCount = 100, term = '', friend = null as null | boolean) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { users, searchedUsers } = getState().users
    const fetchUsersSuccessCallBack = term ? fetchSearchedUsersSuccess : fetchUsersSuccess
    const action = term ? (friend ? 'searched/friends' : 'searched/people') : (friend ? 'friends' : 'people')
    const currentUsersPage = term 
      ? (friend ? searchedUsers.friends.currentPage : searchedUsers.people.currentPage) 
      : (friend ? users.friends.currentPage : users.people.currentPage)
    const usersTotalCount = term 
      ? (friend ? searchedUsers.friends.totalItemsCount : searchedUsers.people.totalItemsCount) 
      : (friend ? users.friends.totalItemsCount : users.people.totalItemsCount)

    try {
      dispatch(fetchUsersRequest())
      const { data: response } = await fetchUsersApi(currentUsersPage, maxPageItemsCount, term, friend)
      if(!response.error) {
        dispatch(setTotalCount({totalCount: response.totalCount, action }))
        dispatch(fetchUsersSuccessCallBack(response.items))
        if(currentUsersPage < getPagesAmount(response.totalCount, maxPageItemsCount)) {
          dispatch(setCurrentPage({ currentPage: currentUsersPage + 1, action }))
        }
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



