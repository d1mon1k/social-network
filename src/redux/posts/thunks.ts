import { addPostApi, deletePostApi, getPostsApi, postImage, setPostApi } from "../../api/posts"
import { AppDispatch } from "../store"
import { addPostFailure, addPostRequest, addPostSuccess, deletePostFailure, deletePostRequest, deletePostSuccess, fetchPostsFailure, fetchPostsRequest, fetchPostsSuccess, setPostFailure, setPostRequest, setPostSuccess } from "./actions"

export const fetchPostsThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(fetchPostsRequest())
      const { data } = await getPostsApi()
      if(!('error' in data)) {
        const convertedData = data.records.map((record) => ({
          id: record.id,
          body: record.fields.body,
          image: record.fields.image,
          likes: parseInt(record.fields.likes),
          createdTime: record.createdTime
        }))
        dispatch(fetchPostsSuccess(convertedData))
      }
      if('error' in data) {
        dispatch(fetchPostsFailure(data.error.message))
      }
    }catch(e) {
      dispatch(fetchPostsFailure('An error occurred during fetching posts'))
    }
  }
}

export const addPostThunk = (postBody: string, file?: File) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(addPostRequest())
      let image
      if(file) {
        const { data } = await postImage(file)
        image = data.url
      }
      const { data } = await addPostApi(postBody, image)
      if(!('error' in data)) {
        const convertedData = {
          ...data.fields,
          id: data.id,
          createdTime: data.createdTime
        }
        dispatch(addPostSuccess(convertedData))
      }
      if('error' in data) {
        dispatch(addPostFailure(data.error.message))
      }
    }catch(e) {
      dispatch(addPostFailure('An error occurred during adding post'))
    }
  }
}

export const setPostThunk = (id: string, postBody: string, image: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setPostRequest())
      const { data } = await setPostApi(id, postBody, image)
      if(!('error' in data)) {
        const convertedData = {
          ...data.fields,
          id: data.id,
          createdTime: data.createdTime
        }
        dispatch(setPostSuccess(convertedData))
      }
      if('error' in data) {
        dispatch(setPostFailure(data.error.message))
      }
    }catch(e) {
      dispatch(setPostFailure('An error occurred during changing post'))
    }
  }
}

export const deletePostThunk = (id: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(deletePostRequest())
      let { data } = await deletePostApi(id)
      if(!('error' in data)) {
        dispatch(deletePostSuccess(data.id))
      }
      if('error' in data) {
        dispatch(deletePostFailure(data.error.message))
      }
    }catch(e) {
      dispatch(deletePostFailure('An error occurred during deleting post'))
    }
  }
}