import { AppDispatch } from "../store"
import { createAuthenticatedSessionApi, deleteAuthenticatedSessionApi, getAuthorizedUserApi } from '../../api/auth'
import { deleteCurrentUser, setCurrentUserFailure, setCurrentUserSuccess } from "./actions"
import { LoginFormCallBackType, LoginFormValuesType } from "../../screens/Login/Login"
import { FORM_ERROR } from "final-form"
import { getUserProfileApi } from "../../api/profile"

export const getAuthorizedUserThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      // const { data: response } = await getAuthorizedUserApi()
      // response.resultCode === 0 && dispatch(setCurrentUserSuccess(response))
      const { data: response } = await getAuthorizedUserApi()
      if (response.resultCode === 0) {
        const {data: { photos }} = await getUserProfileApi(response.data.id)
        response.data.photos = {...photos}
        dispatch(setCurrentUserSuccess(response))
      }
    } catch (e) {
      dispatch(setCurrentUserFailure('Не удалось войти в учётную запись'))
    }
  }
}

export const createAuthenticatedSessionThunk = (values: LoginFormValuesType, errorCallBack: LoginFormCallBackType) => {
  return async (dispatch: AppDispatch) => {
    try {
      const {data: response} = await createAuthenticatedSessionApi(values)
      if(response.resultCode === 0) {
        dispatch<any>(getAuthorizedUserThunk())
      }else if(response.resultCode === 1) {
        const error = response.messages.join(' ')
        errorCallBack!({[FORM_ERROR]: error})
      }
    }catch(e) {
      console.log(e)
    }
  }
}

export const deleteAuthenticatedSessionThunk = () => {
  return async (dispatch: AppDispatch) => {
    try{
      const {data: response} = await deleteAuthenticatedSessionApi()
      response.resultCode === 0 && dispatch(deleteCurrentUser())
    }catch(e) {
      console.log(e)
    }
  }
}