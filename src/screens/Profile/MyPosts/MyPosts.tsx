import { useRef } from 'react'
import Post from './Post/Post'
import cl from './MyPosts.module.scss'
import { PropsFromRedux } from './MyPostsContainer'

interface Props extends PropsFromRedux {}

const MyPosts: React.FC<Props> = (props) => {
  const textAreaElem = useRef<HTMLTextAreaElement>(null)
  const posts = props.profile.posts && props.profile.posts.map((post) => {
    return <Post key={post.id} message={post.body} />
  })

  const addPost = () => {
    // props.setPostsActionCreator()
  }

  const onPostChange = () => {
    // const message = textAreaElem.current!.value
    // props.setNewPostActionCreator(message)
  }

  return (
    <>
      <div></div>
      <h2>My posts</h2>
      <div className={cl.newPost}>
        <textarea
          ref={textAreaElem}
          onChange={onPostChange}
          placeholder="Write something."
          className={cl.textArea}
        ></textarea>
        <button onClick={addPost}>Add post</button>
      </div>
      <ul>{posts}</ul>
    </>
  )
}

export default MyPosts
