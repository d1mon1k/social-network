import { FORM_ERROR } from 'final-form'
import {
  getStatusApi as fetchStatusApi,
  getUserProfileApi,
  setProfilePhotoApi,
  setStatusApi,
  setUserProfileApi,
  SetUserRequiredBodyApi,
} from '../../api/profile'
import { ProfileInfoFormCallBackType } from '../../screens/Profile/ProfileInfoBlock/ProfileInfoBlock'
import { AppDispatch, RootState } from '../store'
import {
  fetchProfileFailure,
  fetchProfileRequest,
  fetchProfileSuccess,
  setProfileFailure,
  setProfilePhotoRequest,
  setProfilePhotoSuccess,
  setProfileRequest,
  setProfileStatusFailure,
  setProfileStatusRequest,
  setProfileStatusSuccess,
  setProfileSuccess,
} from './actions'

export const setUserProfileThunk = (userData: SetUserRequiredBodyApi, errorCallBack: ProfileInfoFormCallBackType) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const userId = getState().auth.user!.data.id
      dispatch(setProfileRequest())
      const { data } = await setUserProfileApi(userData)
      if(data.resultCode === 0) {
        dispatch(setProfileSuccess())
        dispatch<any>(getUserProfileThunk(userId!))
      }else if(data.resultCode === 1) {
        errorCallBack!({[FORM_ERROR]: data.messages.join(' ')})
      }
    }catch(e) {
      dispatch(setProfileFailure('Failure'))
    }
  }
}

export const getUserProfileThunk = (userId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchProfileRequest())
      const {data: response} = await getUserProfileApi(userId)
      dispatch(fetchProfileSuccess(response))
    } catch (e) {
      dispatch(fetchProfileFailure('Failure'))
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
      } else {
        dispatch(setProfileStatusFailure(response.messages[0]))
      }
    } catch (e) {
      console.log(e)
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
    }
  }
}

export const setProfilePhotoThunk = (file: File) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setProfilePhotoRequest())
      const response = await setProfilePhotoApi(file)
      if(response.data.resultCode === 0) {
        dispatch(setProfilePhotoSuccess(response.data.data.photos!))
      }
    }catch(e) {
      console.log(e)
    }
  }
}