import { createDialogApi, fetchDialogsApi, fetchMessagesApi, sendMessageApi } from "../../api/messenger";
import { AppDispatch } from "../store";
import { createDialogFailure, createDialogRequest, createDialogSuccess, fetchDialogsFailure, fetchDialogsRequest, fetchDialogsSuccess, fetchMessagesFailure, fetchMessagesRequest, fetchMessagesSuccess, sendMessageFailure, sendMessageRequest, sendMessageSuccess } from "./actions";

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

export const createDialogThunk = (userId: number) => {
  return async (dispatch: AppDispatch) => {
    try{
      createDialogRequest()
      const { data: response } = await createDialogApi(userId)
      if(response.resultCode === 0) {
        createDialogSuccess()
      }else if(response.resultCode === 1) {
        createDialogFailure(response.messages[0])
      }
    }catch(e) {
      console.log(e)
      createDialogFailure('An error occurred during creating dialog')
    }
  }
}