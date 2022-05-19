import { fetchDialogsApi, fetchMessagesApi } from "../../api/messenger";
import { AppDispatch } from "../store";
import { fetchDialogsFailure, fetchDialogsRequest, fetchDialogsSuccess, fetchMessagesFailure, fetchMessagesRequest, fetchMessagesSuccess } from "./actions";

export const fetchDialogsThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchDialogsRequest())
      const {data: dialogsData} = await fetchDialogsApi()
      dispatch(fetchDialogsSuccess(dialogsData))
    }catch(e) {
      console.log(e)
      dispatch(fetchDialogsFailure('An error occurred during fetching dialogs'))
    }
  }
}

export const fetchMessagesThunk = (userId: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchMessagesRequest())
      const {data: response} = await fetchMessagesApi(userId)
      if(!response.error) {
        dispatch(fetchMessagesSuccess(response.items))
      }else {
        dispatch(fetchMessagesFailure(response.error))
      }
    }catch(e) {
      console.log(e)
      dispatch(fetchMessagesFailure('An error occurred during fetching messages'))
    }
  }
}