import { AddPostFailure, AddPostSuccess, DeletePostFailure, DeletePostSuccess, FetchPostsFailure, FetchPostsSuccess, PostsAction, SetPostFailure, SetPostSuccess } from "./actions";
import { PostsConstants, PostsType } from "./types";

/* ------------- Types ------------- */
type PostsStateType = typeof initialState
interface PostsState extends PostsStateType {}

const initialState = {
  posts: [] as PostsType,
  requests: {
    fetchPostsPending: false,
    fetchPostsError: null as string | null,
    addPostPending: false,
    addPostError: null as string | null,
    setPostPending: false,
    setPostError: null as string | null,
    deletePostPending: false,
    deletePostError: null as string | null
  }
}

/* ------------- Reducers ------------- */
const fetchPostsRequest = (state: PostsState) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      fetchPostsPending: true,
      fetchPostsError: null,
    }   
  }
}

const fetchPostsSuccess = (state: PostsState, action: FetchPostsSuccess) => {
  return {
    ...state,
    posts: action.payload,
    requests: {
      ...state.requests,
      fetchPostsPending: false
    }
  }
}

const fetchPostsFailure = (state: PostsState, action: FetchPostsFailure) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      fetchPostsPending: false,
      fetchPostsError: action.payload
    }
  }
}

const addPostRequest = (state: PostsState) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      addPostPending: true,
      addPostError: null, 
    }
  }
}

const addPostSuccess = (state: PostsState, action: AddPostSuccess) => {
  return {
    ...state,
    posts: [action.payload, ...state.posts],
    requests: {
      ...state.requests,
      addPostPending: false
    }
  }
}

const addPostFailure = (state: PostsState, action: AddPostFailure) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      addPostPending: false,
      addPostError: action.payload,
    }
  }
}

const setPostRequest = (state: PostsState) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      setPostPending: true,
      setPostError: null,
    }
  }
}

const setPostSuccess = (state: PostsState, action: SetPostSuccess) => {
  return {
    ...state,
    posts: [...state.posts, action.payload],
    requests: {
      ...state.requests,
      setPostPending: false
    }
  }
}

const setPostFailure = (state: PostsState, action: SetPostFailure) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      setPostPending: false,
      setPostError: action.payload,
    }
  }
}

const deletePostRequest = (state: PostsState) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      deletePostPending: true,
      deletePostError: null
    }
  }
}

const deletePostSuccess = (state: PostsState, action: DeletePostSuccess) => {
  return {
    ...state,
    posts: state.posts.filter(post => post.id !== action.payload),
    requests: {
      ...state.requests,
      deletePostPending: false,
    }
  }
}

const deletePostFailure = (state: PostsState, action: DeletePostFailure) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      deletePostPending: false,
      deletePostError: action.payload
    }
  }
}

const postsReducer = (state = initialState, action: PostsAction) => {
  switch(action.type) {
    case PostsConstants.FETCH_POSTS_REQUEST:
      return fetchPostsRequest(state)
    case PostsConstants.FETCH_POSTS_SUCCESS: 
      return fetchPostsSuccess(state, action)
    case PostsConstants.FETCH_POSTS_FAILURE: 
      return fetchPostsFailure(state, action)
    case PostsConstants.ADD_POST_REQUEST: 
      return addPostRequest(state)
    case PostsConstants.ADD_POST_SUCCESS: 
      return addPostSuccess(state, action)
    case PostsConstants.ADD_POST_FAILURE: 
      return addPostFailure(state, action)
    case PostsConstants.SET_POST_REQUEST: 
      return setPostRequest(state)
    case PostsConstants.SET_POST_SUCCESS: 
      return setPostSuccess(state, action)
    case PostsConstants.SET_POST_FAILURE: 
      return setPostFailure(state, action)
    case PostsConstants.DELETE_POST_REQUEST: 
      return deletePostRequest(state)
    case PostsConstants.DELETE_POST_SUCCESS: 
      return deletePostSuccess(state, action)
    case PostsConstants.DELETE_POST_FAILURE: 
      return deletePostFailure(state, action)
    default:
      return state
  }
}

export default postsReducer