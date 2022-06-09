import { getAuthorizedUserThunk } from "../auth/thunks"
import { fetchDialogsThunk } from "../messenger/thunks"
import { appInitializationSuccess } from "./actions"

export const initializeAppThunk = () => {
  return async(dispatch: any) => {
    try {
      Promise.all([dispatch(getAuthorizedUserThunk())])
      .then(() => dispatch(appInitializationSuccess()))
    }catch(e) {
      console.log(e)
    }
  }
}
