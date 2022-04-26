import { LoginFormCallBackType } from './../../components/Login/Login';
import { RootState } from './../store';
import { AppDispatch } from '../store'
import { AuthActionTypes, AuthAction, ICurrentUser, } from './../types/auth-types'
import { AuthAPI } from '../../API/serviceAPI';
import { FORM_ERROR } from 'final-form'
import { LoginFormValuesType } from '../../components/Login/Login';

export const setCurrentUserAC = (currentUserData: ICurrentUser): AuthAction => {
  return {
    type: AuthActionTypes.SET_CURRENT_USER,
    payload: currentUserData,
  }
}

export const DeleteCurrentUser = (): AuthAction => {
  return { type: AuthActionTypes.DELETE_CURRENT_USER }
}

export const fetchingErrorAC = (error: string): AuthAction => {
  return {
    type: AuthActionTypes.FETCHING_ERROR,
    payload: error,
  }
}

export const toggleIsFetching = (): AuthAction => {
  return {
    type: AuthActionTypes.IS_FETCHING
  }
}

export const fetchingSuccess = (): AuthAction => {
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

export const authLogin = (values: LoginFormValuesType, errorCallBack: LoginFormCallBackType) => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    try {
      const response = await AuthAPI.authLogin(values)
      if(response.resultCode === 0) {
        //BUG ============================================ >
        // dispatch(getAuthUser())
        const response = await AuthAPI.authUser()
        if (response.resultCode === 0) {
          dispatch(setCurrentUserAC(response))
        }
        //BUG ============================================ >
      }else if(response.resultCode === 1) {
        const error = response.messages.join(' ')
        errorCallBack!({[FORM_ERROR]: error})
      }
    }catch(e) {
      console.log(e)
    }
  }
}

export const authLogout = () => {
  return async (dispatch: AppDispatch, getState: RootState) => {
    try{
      const response = await AuthAPI.authLogout()
      if(response.resultCode === 0) {
        dispatch(DeleteCurrentUser())
      }
    }catch(e) {
      console.log(e)
    }
  }
}