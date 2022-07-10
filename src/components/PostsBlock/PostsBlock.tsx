import React from 'react';
import { randomNum } from '../../helpers/helpers';
import { AuthenticatedUser } from '../../redux/auth/types';
import { PostsType } from '../../redux/posts/types';
import { IUser } from '../../redux/users/types';
import TabsRowBlock from '../TabsRowBlock/TabsRowBlock';
import NewPostField from './NewPostField/NewPostField';
import Post from './Post/Post';
import PostsPreloader from './PostsPreloader/PostsPreloader';

/* ------------- Types ------------- */
interface PostsBlockProps {
  friends: IUser[];
  profileName: string | undefined;
  authProfile: AuthenticatedUser | undefined;
  posts: PostsType | undefined;
  isPostLoading: boolean;
  isPostDeleting: boolean;
  isPostsFetching: boolean;
  addPost: (body: string, image?: File) => void;
  setPost: (id: string, body: string, image: string) => void;
  deletePost: (id: string) => void;
}

/* ------------- Component ------------- */
const PostsBlock: React.FC<PostsBlockProps> = ({
  friends,
  profileName,
  authProfile,
  posts,
  isPostLoading,
  isPostsFetching,
  isPostDeleting,
  addPost,
  deletePost,
  setPost,
}) => {
  const isHomePage = profileName === authProfile?.login ? true : false;
  const isFriendsLoaded = friends.length > 0;

  const PostsComponent =
    isFriendsLoaded &&
    posts?.map((post) => {
      const i = randomNum(friends.length - 1); //random author of each post
      return (
        <Post
          key={post.id}
          authorId={friends[i].id}
          authorName={friends[i].name}
          authorPhoto={friends[i].photos.small}
          id={post.id}
          postBody={post.body}
          image={post.image}
          time={post.createdTime}
          likes={post.likes}
          deletePost={deletePost}
          setPost={setPost}
        />
      );
    });

  const PreloaderComponent = <PostsPreloader count={8} />;

  return (
    <section>
      <NewPostField
        isHomePage={isHomePage}
        isPostDeleting={isPostDeleting}
        isPostLoading={isPostLoading}
        addPost={addPost}
        authProfile={authProfile}
      />
      <TabsRowBlock firstTab={['All posts', '#']} secondTab={[`Posts by ${profileName}`, '/users']} />
      {!posts && PreloaderComponent}
      {isPostsFetching ? PreloaderComponent : PostsComponent}
    </section>
  );
};

export default PostsBlock;
