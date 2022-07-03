import { fetchUsersApi, followUserApi, unfollowUserApi } from "../../api/users"
import { AppDispatch, RootState } from "../store"
import { fetchFriendsSuccess, fetchPeopleSuccess, fetchSearchedFriendsSuccess, fetchSearchedPeopleSuccess, fetchUsersFailure, fetchUsersRequest, setFriendsPage, setFriendsTotalCount, setPeoplePage, setPeopleTotalCount, setSearchedFriendsPage, setSearchedFriendsTotalCount, setSearchedPeoplePage, setSearchedPeopleTotalCount, toggleFollowOnUserFailure, toggleFollowOnUserRequest, toggleFollowOnUserSuccess } from "./actions"

export const fetchPeopleThunk = (maxPageItemsCount: number, term: string, friend: boolean) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { users: { people: { currentPage, items } } } = getState().users
    try {
      dispatch(fetchUsersRequest())
      const { data: response } = await fetchUsersApi(currentPage, maxPageItemsCount, term, friend)
      if(response.error) {
        dispatch(fetchUsersFailure(response.error))
        throw new Error(response.error);
      }
      dispatch(setPeopleTotalCount(response.totalCount))
      dispatch(fetchPeopleSuccess(response.items))
      if(items.length < response.totalCount) {
        dispatch(setPeoplePage(currentPage + 1))
      }
    }catch(e) {
      console.log(e)
      dispatch(fetchUsersFailure('An error occurred during fetching people'))
    }
  }
}

export const fetchFriendsThunk = (maxPageItemsCount: number, term: string, friend: boolean) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { users: { friends: { currentPage, items } } } = getState().users
    try {
      dispatch(fetchUsersRequest())
      const { data: response } = await fetchUsersApi(currentPage, maxPageItemsCount, term, friend)
      if(response.error) {
        dispatch(fetchUsersFailure(response.error))
        throw new Error(response.error);
      }
      dispatch(setFriendsTotalCount(response.totalCount))
      dispatch(fetchFriendsSuccess(response.items))
      if(items.length < response.totalCount) {
        dispatch(setFriendsPage(currentPage + 1))
      }
    }catch(e) {
      console.log(e)
      dispatch(fetchUsersFailure('An error occurred during fetching friends'))
    }
  }
}

export const fetchSearchedPeopleThunk = (maxPageItemsCount: number, term: string, friend: boolean) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { searchedUsers: { people: { currentPage, items } } } = getState().users
    try {
      dispatch(fetchUsersRequest())
      const { data: response } = await fetchUsersApi(currentPage, maxPageItemsCount, term, friend)
      if(response.error) {
        dispatch(fetchUsersFailure(response.error))
        throw new Error(response.error);
      }
      dispatch(setSearchedPeopleTotalCount(response.totalCount))
      dispatch(fetchSearchedPeopleSuccess(response.items))
      if(items.length < response.totalCount) {
        dispatch(setSearchedPeoplePage(currentPage + 1))
      }
    }catch(e) {
      console.log(e)
      dispatch(fetchUsersFailure('An error occurred during fetching people'))
    }
  }
}

export const fetchSearchedFriendsThunk = (maxPageItemsCount: number, term: string, friend: boolean) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { searchedUsers: { friends: { currentPage, items } } } = getState().users
    try {
      dispatch(fetchUsersRequest())
      const { data: response } = await fetchUsersApi(currentPage, maxPageItemsCount, term, friend)
      if(response.error) {
        dispatch(fetchUsersFailure(response.error))
        throw new Error(response.error);
      }
      dispatch(setSearchedFriendsTotalCount(response.totalCount))
      dispatch(fetchSearchedFriendsSuccess(response.items))
      if(items.length < response.totalCount) {
        dispatch(setSearchedFriendsPage(currentPage + 1))
      }
    }catch(e) {
      console.log(e)
      dispatch(fetchUsersFailure('An error occurred during fetching friends'))
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



