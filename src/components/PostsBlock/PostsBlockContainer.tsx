import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { compose } from "redux";
import {
  addPostThunk, deletePostThunk, fetchPostsThunk, setPostThunk
} from '../../redux/posts/thunks';
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/users/types";
import PostsBlock from "./PostsBlock";

/* ------------- Component ------------- */
const PostsBlockApi: React.FC<PostsBlockContainerProps & {friends: IUser[]}> = ({
  posts,
  friends,
  profileName,
  authProfile,
  fetchPostsThunk,
  addPostThunk,
  setPostThunk,
  deletePostThunk
}) => {
  useEffect(() => {
    fetchPostsThunk()
  }, [fetchPostsThunk])

  return <PostsBlock
      friends={friends} 
      posts={posts}
      profileName={profileName}
      authProfile={authProfile}
      addPost={addPostThunk}
      setPost={setPostThunk}
      deletePost={deletePostThunk}
    />
}

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    posts: state.posts.posts,
    profileName: state.profile.profile?.fullName,
    authProfile: state.auth.user
  }
}

const mapDispatchToProps = {
  fetchPostsThunk,
  addPostThunk,
  setPostThunk,
  deletePostThunk,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PostsBlockContainerProps = ConnectedProps<typeof connector>

export default compose(connector)(PostsBlockApi)