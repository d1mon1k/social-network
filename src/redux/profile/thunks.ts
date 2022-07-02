import { FORM_ERROR } from 'final-form'
import {
  getStatusApi as fetchStatusApi,
  getUserProfileApi,
  setProfilePhotoApi,
  setStatusApi,
  setUserProfileApi,
  SetUserRequiredBodyApi,
} from '../../api/profile'
import { fetchUsersApi, followUserApi, unfollowUserApi } from '../../api/users'
import { ProfileInfoFormCallBackType } from '../../pages/Profile/ProfileInfoBlock/ProfileInfoBlock'
import { AppDispatch, RootState } from '../store'
import {
  fetchProfileFailure,
  fetchProfileRequest,
  fetchProfileSuccess,
  setProfileFailure,
  setProfilePhotoFailure,
  setProfilePhotoRequest,
  setProfilePhotoSuccess,
  setProfileRequest,
  setProfileStatusFailure,
  setProfileStatusRequest,
  setProfileStatusSuccess,
  setProfileSuccess,
  toggleFollowOnProfileFailure,
  toggleFollowOnProfileRequest,
  toggleFollowOnProfileSuccess,
} from './actions'

export const setUserProfileThunk = (userData: SetUserRequiredBodyApi, errorCallBack: ProfileInfoFormCallBackType) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const userId = getState().auth.user!.id
      dispatch(setProfileRequest())
      const { data: response } = await setUserProfileApi(userData)
      if(response.resultCode === 0) {
        dispatch(setProfileSuccess())
        dispatch<any>(getUserProfileThunk(userId!))
      }else if(response.resultCode === 1) {
        errorCallBack!({[FORM_ERROR]: response.messages.join(' ')})
      }
    }catch(e) {
      console.log(e)
      dispatch(setProfileFailure(`An error occurred during setting profile information`))
    }
  }
}

export const getUserProfileThunk = (userId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchProfileRequest())
      const {data: response} = await getUserProfileApi(userId)
      const { data: {items} } = await fetchUsersApi(1, 1, response.fullName, false)
      dispatch(fetchProfileSuccess({...response, followed: items[0].followed}))
    } catch (e) {
      console.log(e)
      dispatch(fetchProfileFailure('An error occurred during fetching profile information'))
    }
  }
}

export const setUserStatusThunk = (status: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setProfileStatusRequest())
      const {data: response} = await setStatusApi(status)
      if (response.resultCode === 0) {
        dispatch(setProfileStatusSuccess(status))
      } else if(response.resultCode === 1) {
        dispatch(setProfileStatusFailure(response.messages[0]))
      }
    } catch (e) {
      console.log(e)
      dispatch(setProfileStatusFailure('An error occurred during setting profile status'))
    }
  }
}

export const fetchUserStatusThunk = (userId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const {data: response} = await fetchStatusApi(userId)
      dispatch(setProfileStatusSuccess(response))
    } catch (e) {
      console.log(e)
      dispatch(setProfileStatusFailure('An error occurred during fetching profile status'))
    }
  }
}

export const setProfilePhotoThunk = (file: File) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setProfilePhotoRequest())
      const {data: response} = await setProfilePhotoApi(file)
      if(response.resultCode === 0) {
        dispatch(setProfilePhotoSuccess(response.data.photos!))
      }else if(response.resultCode === 1) {
        dispatch(setProfilePhotoFailure(response.messages[0]))
      }
    }catch(e) {
      console.log(e)
      dispatch(setProfilePhotoFailure('An error occurred during uploading profile photo'))
    }
  }
}

export const toggleFollowOnProfileThunk = (userId: number, followed: boolean) => {
  return async ( dispatch: AppDispatch ) => {
    try{
      dispatch(toggleFollowOnProfileRequest())
      const apiMethod = followed ? unfollowUserApi : followUserApi
      const { data: response} = await apiMethod(userId)
      if(response.resultCode === 0) {
        dispatch(toggleFollowOnProfileSuccess())
      }else if(response.resultCode === 1) {
        dispatch(toggleFollowOnProfileFailure(response.messages[0]!))
      }
    }catch(e) {
      console.log(e)
      dispatch(toggleFollowOnProfileFailure('An error occurred during follow/unfollow on user'))
    }
  }
}