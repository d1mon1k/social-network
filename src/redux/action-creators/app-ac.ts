import { getAuthorizedUserThunk } from '../auth/thunks';
import { AppAction, AppActionTypes } from "../types/app-types"

export const initializedSuccess = (): AppAction => {
  return {
    type: AppActionTypes.INITIALIZED_SUCCESS
  }
}

export const initializeApp = () => {
  return async(dispatch: any) => {
    try {
      let getUserPromise = dispatch(getAuthorizedUserThunk())
      Promise.all([getUserPromise]).then(() => dispatch(initializedSuccess()))
    }catch(e) {
      console.log(e)
    }
  }
}