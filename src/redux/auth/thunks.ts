import { AppDispatch } from "../store"
import { createAuthenticatedSessionApi, deleteAuthenticatedSessionApi, getAuthorizedUserApi } from '../../api/auth'
import { deleteCurrentUser, setCurrentUserFailure, setCurrentUserRequest, setCurrentUserSuccess } from "./actions"
import { FORM_ERROR } from "final-form"
import { getUserProfileApi } from "../../api/profile"
import { LoginFormCallBackType, LoginFormValuesType } from "../../pages/LoginPage/LoginPage"

export const getAuthorizedUserThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setCurrentUserRequest())
      const { data: response } = await getAuthorizedUserApi()
      if (response.resultCode === 0) {
        const {data: { photos }} = await getUserProfileApi(response.data.id)
        response.data.photos = {...photos}
        dispatch(setCurrentUserSuccess(response.data))
      }else if(response.resultCode === 1) {
        dispatch(setCurrentUserFailure(response.messages[0]))
      }
    } catch (e) {
      console.log(e)
      dispatch(setCurrentUserFailure('An error occurred during getting authorized user'))
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