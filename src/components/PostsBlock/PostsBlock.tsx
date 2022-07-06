import React from 'react'
import { randomNum } from '../../helpers/helpers'
import { AuthenticatedUser } from '../../redux/auth/types'
import { PostsType } from '../../redux/posts/types'
import { IUser } from '../../redux/users/types'
import TabsRowBlock from '../TabsRowBlock/TabsRowBlock'
import NewPostField from './NewPostField/NewPostField'
import Post from './Post/Post'

/* ------------- Types ------------- */
interface PostsBlockProps {
  friends: IUser[]
  profileName: string | undefined
  authProfile: AuthenticatedUser | undefined
  posts: PostsType
  isPostLoading: boolean
  addPost: (body: string, image?: File) => void
  setPost: (id: string, body: string, image: string) => void
  deletePost: (id: string) => void
}

/* ------------- Component ------------- */
const PostsBlock: React.FC<PostsBlockProps> = ({
  friends,
  profileName,
  authProfile,
  posts,
  isPostLoading,
  addPost,
  deletePost,
  setPost
}) => {
  const isHomePage = (profileName === authProfile?.login) ? true : false
  const isFriendsLoaded = friends.length > 0

  const PostsComponent = isFriendsLoaded && posts.map((post) => {
    const i = randomNum(friends.length - 1)
    // if(i % 2 !== 0) return - random posts switch off
    return <Post
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
  })

  return (
    <section>
      <NewPostField
        isHomePage={isHomePage}
        isPostLoading={isPostLoading}
        addPost={addPost}
        authProfile={authProfile}
      />
      <TabsRowBlock
        firstTab={['All posts', '#']}
        secondTab={[`Posts by ${profileName}`, '/users']}
      />
      {PostsComponent}
    </section>
  )
}

export default PostsBlock

