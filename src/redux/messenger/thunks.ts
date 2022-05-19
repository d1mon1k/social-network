import { fetchDialogsApi, fetchMessagesApi, sendMessageApi } from "../../api/messenger";
import { AppDispatch } from "../store";
import { fetchDialogsFailure, fetchDialogsRequest, fetchDialogsSuccess, fetchMessagesFailure, fetchMessagesRequest, fetchMessagesSuccess, sendMessageFailure, sendMessageRequest, sendMessageSuccess } from "./actions";

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

export const sendMessageThunk = (userId: number, messageBody: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(sendMessageRequest())
      const {data: response} = await sendMessageApi(userId, messageBody)
      if(response.resultCode === 0) {
        dispatch(sendMessageSuccess())
        dispatch<any>(fetchMessagesThunk(userId))
      }else {
        dispatch(sendMessageFailure(response.messages[0]))
      }
    }catch(e) {
      console.log(e)
      dispatch(sendMessageFailure('An error occurred during sending the message'))
    }
  }
}