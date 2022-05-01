import { getAuthorizedUserThunk } from "../auth/thunks"
import { AppDispatch } from "../store"
import { appInitializationRequest, appInitializationSuccess } from "./actions"

export const initializeAppThunk = () => {
  return async(dispatch: any) => {
    try {
      // dispatch(appInitializationRequest())
      Promise.all([dispatch(getAuthorizedUserThunk())])
      .then(() => dispatch(appInitializationSuccess()))
    }catch(e) {
      console.log(e)
    }
  }
}
