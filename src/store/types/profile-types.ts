export interface ProfileState {
  posts: { id: number; message: string }[]
  newPost: string
}

export enum ProfileActionTypes {
  SET_POSTS = 'SET_POSTS',
  SET_NEW_POST = 'SET_NEW_POST',
}

interface SetNewPost {
  type: ProfileActionTypes.SET_NEW_POST
  payload: string
}

interface SetPosts {
  type: ProfileActionTypes.SET_POSTS,
}

export type ProfileAction = 
  SetNewPost
  | SetPosts
