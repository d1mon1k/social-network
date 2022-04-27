import { ProfileAPI } from '../../API/serviceAPI'
import { AppDispatch, RootState } from '../store'
import { ProfileAction, ProfileActionTypes, ProfileType } from '../types/profile-types'

export const setPosts = (): ProfileAction => {
  return { type: ProfileActionTypes.SET_PROFILE_POSTS }
}

export const setNewPost = (message: string): ProfileAction => {
  return { type: ProfileActionTypes.SET_PROFILE_NEW_POST, payload: message }
}

export const setStatus = (status: string): ProfileAction => {
  return { type: ProfileActionTypes.SET_PROFILE_STATUS, payload: status }
}

export const fetchProfile = (): ProfileAction => {
  return { type: ProfileActionTypes.FETCH_PROFILE }
}

export const fetchProfileSuccess = (profile: ProfileType): ProfileAction => {
  return { type: ProfileActionTypes.FETCH_PROFILE_SUCCESS, payload: profile}
}

export const fetchProfileError = (error: string): ProfileAction => {
  return { type: ProfileActionTypes.FETCH_PROFILE_ERROR, payload: error}
}

export const getProfile = (userId: number) => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    try {
      dispatch(fetchProfile())
      const response = await ProfileAPI.getUserProfile(userId)
      dispatch(fetchProfileSuccess(response))
    } catch (e) {
      dispatch(fetchProfileError('Не удалось получить профиль пользователя'))
    }
  }
}

export const getUserStatus = (userId: number) => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    try{
      const response = await ProfileAPI.getStatus(userId)
      dispatch(setStatus(response))
    }catch(e) {
      console.log(e)
    }
  }
}

export const setUserStatus = (status: string) => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    try{
      const response = await ProfileAPI.setStatus(status)
      if(response.resultCode === 0) {
        dispatch(setStatus(status))
      }else {
        console.log(new Error(response.messages))
      }
    }catch(e) {
      console.log(e)
    }
  }
}
