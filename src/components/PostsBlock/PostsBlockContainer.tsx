import { connect, ConnectedProps } from "react-redux";
import { compose } from "redux";
import {
  addPostThunk, deletePostThunk, setPostThunk
} from '../../redux/posts/thunks';
import { RootState } from "../../redux/store";
import { IUser } from "../../redux/users/types";
import PostsBlock from "./PostsBlock";

/* ------------- Component ------------- */
const PostsBlockContainer: React.FC<PostsBlockContainerProps & {friends: IUser[]}> = ({
  posts,
  friends,
  profileName,
  authProfile,
  isPostLoading,
  addPostThunk,
  setPostThunk,
  deletePostThunk
}) => {
  return <PostsBlock
      friends={friends} 
      posts={posts}
      profileName={profileName}
      authProfile={authProfile}
      isPostLoading={isPostLoading}
      addPost={addPostThunk}
      setPost={setPostThunk}
      deletePost={deletePostThunk}
    />
}

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    posts: state.posts.posts,
    isPostLoading: state.posts.requests.addPostPending,
    profileName: state.profile.profile?.fullName,
    authProfile: state.auth.user
  }
}

const mapDispatchToProps = {
  addPostThunk,
  setPostThunk,
  deletePostThunk,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PostsBlockContainerProps = ConnectedProps<typeof connector>

export default compose(connector)(PostsBlockContainer)