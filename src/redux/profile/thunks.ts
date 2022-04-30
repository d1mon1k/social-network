import { getStatusApi as fetchStatusApi, getUserProfileApi, setStatusApi } from "../../api/profile"
import { AppDispatch } from "../store"
import { fetchProfileFailure, fetchProfileRequest, fetchProfileSuccess, setProfileStatusRequest, setProfileStatusSuccess } from "./actions"

export const getUserProfileThunk = (userId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchProfileRequest())
      const {data: response} = await getUserProfileApi(userId)
      console.warn('должна быть проверка')
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
        console.log(new Error(response.messages[0]))
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