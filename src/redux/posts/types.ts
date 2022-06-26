export enum PostsConstants {
  FETCH_POSTS_REQUEST = 'posts/FETCH_POSTS_REQUEST',
  FETCH_POSTS_SUCCESS = 'posts/FETCH_POSTS_SUCCESS',
  FETCH_POSTS_FAILURE = 'posts/FETCH_POSTS_FAILURE',
  ADD_POST_REQUEST = 'posts/ADD_POST_REQUEST',
  ADD_POST_SUCCESS = 'posts/ADD_POST_SUCCESS',
  ADD_POST_FAILURE = 'posts/ADD_POST_FAILURE',
  SET_POST_REQUEST = 'posts/SET_POST_REQUEST',
  SET_POST_SUCCESS = 'posts/SET_POST_SUCCESS',
  SET_POST_FAILURE = 'posts/SET_POST_FAILURE',
  DELETE_POST_REQUEST = 'posts/DELETE_POST_REQUEST',
  DELETE_POST_SUCCESS = 'posts/DELETE_POST_SUCCESS',
  DELETE_POST_FAILURE = 'posts/DELETE_POST_FAILURE',
}

export type PostsType = PostType[]

export type PostType = {
  id: string,
  body: string,
  image: string | null,
  likes: number
  createdTime: string
}