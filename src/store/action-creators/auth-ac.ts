import { RootState } from './../store';
import { AppDispatch } from '../store'
import { AuthActionTypes, ActionType, ICurrentUser, } from './../types/auth-types'
import { AuthAPI } from '../../API/serviceAPI';

export const setCurrentUserAC = (currentUserData: ICurrentUser): ActionType => {
  return {
    type: AuthActionTypes.SET_CURRENT_USER,
    payload: currentUserData,
  }
}

export const fetchingErrorAC = (error: string): ActionType => {
  return {
    type: AuthActionTypes.FETCHING_ERROR,
    payload: error,
  }
}

export const toggleIsFetching = (): ActionType => {
  return {
    type: AuthActionTypes.IS_FETCHING
  }
}

export const fetchingSuccess = (): ActionType => {
  return {
    type: AuthActionTypes.FETCHING_SUCCESS
  }
}

export const getAuthUser = () => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    try {
      const response = await AuthAPI.authUser()
      if (response.resultCode === 0) {
        dispatch(setCurrentUserAC(response))
      }
    } catch (e) {
      dispatch(fetchingErrorAC('Не удалось войти в учётную запись'))
    }
  }
}

export const authLogin = (values: {email: string, password: string}) => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    try {
      const response = await AuthAPI.authLogin(values)
      if(response.resultCode === 0) {
        dispatch(fetchingSuccess())
      }
    }catch(e) {
      console.log(e)
    }
  }
}