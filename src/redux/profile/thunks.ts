import { getStatusApi as fetchStatusApi, getUserProfileApi, setProfilePhotoApi, setStatusApi } from "../../api/profile"
import { AppDispatch } from "../store"
import { fetchProfileFailure, fetchProfileRequest, fetchProfileSuccess, setProfilePhotoRequest, setProfilePhotoSuccess, setProfileStatusFailure, setProfileStatusRequest, setProfileStatusSuccess } from "./actions"

export const getUserProfileThunk = (userId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchProfileRequest())
      const {data: response} = await getUserProfileApi(userId)
      dispatch(fetchProfileSuccess(response))
    } catch (e) {
      dispatch(fetchProfileFailure('Не удалось получить профиль пользователя'))
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
      console.log(response)
      dispatch(setProfilePhotoSuccess())
    }catch(e) {
      console.log(e)
    }
  }
}