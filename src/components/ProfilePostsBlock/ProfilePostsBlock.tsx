import TabsRowBlock from '../TabsRowBlock/TabsRowBlock'
import cl from './ProfilePostsBlock.module.scss'
import Post from './Post/Post'
import photo from '../../assets/images/jpeg/no-photo.jpg'
import Avatar from '../Avatar/Avatar'
import MyButton from '../common/MyButton/MyButton'
import { PostsType } from '../../redux/posts/types'
import React, { useEffect, useRef, useState } from 'react'
import { AttachSvg, CrossSvg, FileSvg } from '../../helpers/icons/icons'
import { reduceLine } from '../../helpers/helpers'
import { AuthenticatedUser } from '../../redux/auth/types'

interface ProfilePostsBlockProps {
  profileName: string | undefined
  posts: PostsType
  authProfile: AuthenticatedUser | undefined
  addPost: (body: string, image?: File) => void
  setPost: (id: string, body: string, image: string) => void
  deletePost: (id: string) => void
}

const ProfilePostsBlock: React.FC<ProfilePostsBlockProps> = ({
  profileName,
  authProfile,
  posts,
  addPost,
  deletePost,
  setPost
}) => {
  const isHomePage = profileName === authProfile?.login ? true : false

  const PostsComponent = posts.map((post) => (
    <Post
      id={post.id}
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
    <NewPostArea isHomePage={isHomePage} addPost={addPost} authProfile={authProfile} />
    <TabsRowBlock firstTabName={'All posts'} secondTabName={`Posts by ${profileName}`} />
    {PostsComponent}
  </section>
}

export default ProfilePostsBlock

/* ------------- NewPostArea ------------- */
interface NewPostAreaProps {
  addPost: (body: string, image?: File ) => void
  authProfile: AuthenticatedUser | undefined
  isHomePage: boolean
}

const NewPostArea: React.FC<NewPostAreaProps> = ({ addPost, authProfile, isHomePage }) => {
  const [textArea, setTextArea] = useState('')
  const [file, setFile] = useState<File | undefined>(undefined)
  const inputFile = useRef<HTMLInputElement | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setTextArea(e.target.value)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      addPost(textArea, file)
      setFile(undefined)
      setTextArea('')
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0])
    inputFile.current!.value = ''
  }

  const handleDeleteFile = () => {
    setFile(undefined)
    inputFile.current!.value = ''
  }

  return (
    <div className={cl.newPost}>
      <div className={cl.avatarContainer}>
        <Avatar photo={authProfile?.photos?.small} />
      </div>
      <div className={cl.textAreaContainer}>
        <textarea
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          value={textArea}
          placeholder={isHomePage ? `What's new` : 'Write something...'}
          className={cl.textArea}
        />
        {file?.name && (
          <div className={cl.fileDescrBlock}>
            <div className={cl.fileDescr}>{reduceLine(file.name, 60)}</div>
            <CrossSvg className={cl.crossSvg} onClick={handleDeleteFile} />
          </div>
        )}
      </div>
      <div className={cl.fileInput}>
        <label className={cl.uploadAreaLabel} htmlFor="file-input">
          <FileSvg className={cl.fileSvg} />
        </label>
        <input
          ref={inputFile}
          className={cl.uploadArea}
          id="file-input"
          name="file-input"
          accept="image/*"
          onChange={handleFileUpload}
          type="file"
        />
      </div>
    </div>
  )
}