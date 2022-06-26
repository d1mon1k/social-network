import TabsRowBlock from '../TabsRowBlock/TabsRowBlock'
import cl from './ProfilePostsBlock.module.scss'
import Post from './Post/Post'
import photo from '../../assets/images/jpeg/no-photo.jpg'
import Avatar from '../Avatar/Avatar'
import MyButton from '../common/MyButton/MyButton'
import { PostsType } from '../../redux/posts/types'

interface ProfilePostsBlockProps {
  profileName: string | undefined
  posts: PostsType
  addPost: (body: string, image: string ) => void
  setPost: (id: string, body: string, image: string) => void
  deletePost: (id: string) => void
}

const ProfilePostsBlock: React.FC<ProfilePostsBlockProps> = ({
  profileName,
  posts,
  addPost,
  deletePost,
  setPost
}) => {
  const PostsComponent = posts.map((post) => (
    <Post
      key={post.id}
      postBody={post.body}
      image={post.image}
      time={post.createdTime}
      likes={post.likes}
    />
  ))

  return <section>
    <NewPost/>
    <TabsRowBlock firstTabName={'All posts'} secondTabName={`Posts by ${profileName}`} />
    {PostsComponent}
  </section>
}

export default ProfilePostsBlock

const NewPost = () => {
  return (
    <div className={cl.newPost}>
      <div className={cl.avatarContainer}>
        <Avatar photo={photo} />
      </div>
      <textarea placeholder={`What's new`} className={cl.textArea} />
      <div className={cl.btnContainer}>
        <MyButton callBack={() => {}} >Post</MyButton>
      </div>
    </div>
  )
}