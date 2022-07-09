import { PostsConstants, PostsType, PostType } from './types';

/* ------------- Types ------------- */
export interface FetchPostsRequest extends ReturnType<typeof fetchPostsRequest> {}
export interface FetchPostsSuccess extends ReturnType<typeof fetchPostsSuccess> {}
export interface FetchPostsFailure extends ReturnType<typeof fetchPostsFailure> {}
export interface AddPostRequest extends ReturnType<typeof addPostRequest> {}
export interface AddPostSuccess extends ReturnType<typeof addPostSuccess> {}
export interface AddPostFailure extends ReturnType<typeof addPostFailure> {}
export interface SetPostRequest extends ReturnType<typeof setPostRequest> {}
export interface SetPostSuccess extends ReturnType<typeof setPostSuccess> {}
export interface SetPostFailure extends ReturnType<typeof setPostFailure> {}
export interface DeletePostRequest extends ReturnType<typeof deletePostRequest> {}
export interface DeletePostSuccess extends ReturnType<typeof deletePostSuccess> {}
export interface DeletePostFailure extends ReturnType<typeof deletePostFailure> {}
export interface ClearPostsState extends ReturnType<typeof clearPostsState> {}

export type PostsAction =
  | FetchPostsRequest
  | FetchPostsSuccess
  | FetchPostsFailure
  | AddPostRequest
  | AddPostSuccess
  | AddPostFailure
  | SetPostRequest
  | SetPostSuccess
  | SetPostFailure
  | DeletePostRequest
  | DeletePostSuccess
  | DeletePostFailure
  | ClearPostsState;

/* ------------- Actions ------------- */
export const clearPostsState = () => {
  return <const>{ type: PostsConstants.CLEAR_POSTS_STATE };
};

export const fetchPostsRequest = () => {
  return <const>{ type: PostsConstants.FETCH_POSTS_REQUEST };
};

export const fetchPostsSuccess = (posts: PostsType) => {
  return <const>{ type: PostsConstants.FETCH_POSTS_SUCCESS, payload: posts };
};

export const fetchPostsFailure = (error: string) => {
  return <const>{ type: PostsConstants.FETCH_POSTS_FAILURE, payload: error };
};

export const addPostRequest = () => {
  return <const>{ type: PostsConstants.ADD_POST_REQUEST };
};

export const addPostSuccess = (post: PostType) => {
  return <const>{ type: PostsConstants.ADD_POST_SUCCESS, payload: post };
};

export const addPostFailure = (error: string) => {
  return <const>{ type: PostsConstants.ADD_POST_FAILURE, payload: error };
};

export const setPostRequest = () => {
  return <const>{ type: PostsConstants.SET_POST_REQUEST };
};

export const setPostSuccess = (post: PostType) => {
  return <const>{ type: PostsConstants.SET_POST_SUCCESS, payload: post };
};

export const setPostFailure = (error: string) => {
  return <const>{ type: PostsConstants.SET_POST_FAILURE, payload: error };
};

export const deletePostRequest = () => {
  return <const>{ type: PostsConstants.DELETE_POST_REQUEST };
};

export const deletePostSuccess = (id: string) => {
  return <const>{ type: PostsConstants.DELETE_POST_SUCCESS, payload: id };
};

export const deletePostFailure = (error: string) => {
  return <const>{ type: PostsConstants.DELETE_POST_FAILURE, payload: error };
};
