import { fetchUsersApi, followUserApi, unfollowUserApi } from "../../api/users"
import { AppDispatch, RootState } from "../store"
import { setCurrentUsersPage, setTotalUsersCount, setUsersFailure, setUsersRequest, setUsersSuccess, toggleFollowOnUser, toggleIsSubscribePending } from "./actions"

export const fetchUsersThunk = (currentUsersPage = 1) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      dispatch(setUsersRequest())
      dispatch(setCurrentUsersPage(currentUsersPage))
      const { users: { maxPageItemsCount } } = getState()
      const {data: {totalCount, items}} = await fetchUsersApi(currentUsersPage, maxPageItemsCount)
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

//BUG refactor
// return async ( dispatch: AppDispatch ) => {
  //   dispatch(toggleIsSubscribePending(userId))
  //   //unfollowUserApi
  //   followUserApi(userId)
  //   .then(({ data: { resultCode }}) => {
  //     if(resultCode === 0) {
  //       dispatch(toggleFollowOnUser(userId))
  //     }
  //     dispatch(toggleIsSubscribePending(userId))
  //   })
  // }

//BUG возможна данная thunk бесполезна
// export const toggleUnfollowOnUserThunk = (userId: number, state: RootState) => {
//   return async (dispatch: AppDispatch) => {
//     dispatch(toggleIsSubscribePending(userId))
//     unfollowUserApi(userId)
//     .then(({ data: { resultCode }}) => {
//       if(resultCode === 0) {
//         dispatch(toggleFollowOnUser(userId))
//       }
//       dispatch(toggleIsSubscribePending(userId)     )
//     })
//   }
// }

//BUG возможна данная thunk бесполезна
// export const changeCurrentUsersPageThunk = (currentPage = 1) => {
//   return (dispatch: AppDispatch, getState: () => RootState) => {
//     const { users: { maxPageItemsCount } } = getState()
//     dispatch(setCurrentUsersPage(currentPage))

//     dispatch(setUsersRequest())
//       fetchUsersApi(currentPage, maxPageItemsCount)
//       .then(({data: { totalCount, items }}) => {
//         dispatch(setTotalUsersCount(totalCount))
//         dispatch(setUsersSuccess(items))
//       })
//   }
// }



