import { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { compose } from "redux";
import {
  addPostThunk, deletePostThunk, fetchPostsThunk, setPostThunk
} from '../../redux/posts/thunks';
import { RootState } from "../../redux/store";
import ProfilePostsBlock from "./ProfilePostsBlock";

const ProfilePostsBlockApi: React.FC<ProfilePostsBlockContainerProps> = ({
  posts,
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

  return <ProfilePostsBlock 
            posts={posts}
            profileName={profileName}
            authProfile={authProfile}
            addPost={addPostThunk}
            setPost={setPostThunk}
            deletePost={deletePostThunk}
        />
}

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
export type ProfilePostsBlockContainerProps = ConnectedProps<typeof connector>

export default compose(connector)(ProfilePostsBlockApi)