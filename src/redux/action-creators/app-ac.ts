import { getAuthUser } from './auth-ac';
import { AppAction, AppActionTypes } from "../types/app-types"

export const initializedSuccess = (): AppAction => {
  return {
    type: AppActionTypes.INITIALIZED_SUCCESS
  }
}

export const initializeApp = () => {
  return async(dispatch: any) => {
    try {
      let getUserPromise = dispatch(getAuthUser())
      Promise.all([getUserPromise]).then(() => dispatch(initializedSuccess()))
    }catch(e) {
      console.log(e)
    }
  }
}