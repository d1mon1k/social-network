import { useRef } from 'react'
import Post from './Post/Post'
import cl from './MyPosts.module.scss'

const MyPosts = (props) => {
  const textAreaElem = useRef()
  const posts = props.profilePage.posts.map((post) => {
    return <Post key={post.id} message={post.message} />
  })

  const addPost = () => {
    props.addPost()
  }

  const onPostChange = () => {
    const message = textAreaElem.current.value
    props.onPostChange(message)
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
          value={props.profilePage.newPost}
          className={cl.textArea}
        ></textarea>
        <button onClick={addPost}>Add post</button>
      </div>
      <ul>{posts}</ul>
    </>
  )
}

export default MyPosts
