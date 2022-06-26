import TabsRowBlock from '../TabsRowBlock/TabsRowBlock'
import cl from './ProfilePostsBlock.module.scss'
import Post from './Post/Post'
import photo from '../../assets/images/jpeg/no-photo.jpg'
import Avatar from '../Avatar/Avatar'
import MyButton from '../common/MyButton/MyButton'
import { PostsType } from '../../redux/posts/types'
import React, { useState } from 'react'
import { AttachSvg } from '../../helpers/icons/icons'

interface ProfilePostsBlockProps {
  profileName: string | undefined
  posts: PostsType
  addPost: (body: string, image?: File) => void
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
      deletePost={deletePost}
      setPost={setPost}
      key={post.id}
      postBody={post.body}
      image={post.image}
      time={post.createdTime}
      likes={post.likes}
    />
  ))

  return <section>
    <NewPostArea addPost={addPost} />
    <TabsRowBlock firstTabName={'All posts'} secondTabName={`Posts by ${profileName}`} />
    {PostsComponent}
  </section>
}

export default ProfilePostsBlock

/* ------------- NewPostArea ------------- */
interface NewPostAreaProps {
  addPost: (body: string, image?: File ) => void
}

const NewPostArea: React.FC<NewPostAreaProps> = ({ addPost }) => {
  const [textArea, setTextArea] = useState('')
  const [file, setFile] = useState<File | undefined>(undefined)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTextArea(e.target.value)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      addPost(textArea, file)
      setFile(undefined)
      setTextArea('')
    }
  }

  const handleClick = () => {
    addPost(textArea, file)
    setFile(undefined)
    setTextArea('')
  }

  const handleAttach = () => {
    
  }

  return (
    <div className={cl.newPost}>
      <div className={cl.avatarContainer}>
        <Avatar photo={photo} />
      </div>
      <textarea onChange={handleChange} onKeyDown={handleKeyDown} value={textArea} placeholder={`What's new`} className={cl.textArea} />
      <div className={cl.btnContainer}>
        <input accept='image/*' onChange={(e) => setFile(e.target.files![0])} type="file"/>
        {/* <AttachSvg/> */}
        <MyButton callBack={handleClick} >Post</MyButton>
      </div>
    </div>
  )
}