import TabsRowBlock from '../TabsRowBlock/TabsRowBlock'
import cl from './ProfilePostsBlock.module.scss'
import Post from './Post/Post'
import photo from '../../assets/images/jpeg/no-photo.jpg'
import Avatar from '../Avatar/Avatar'
import MyButton from '../common/MyButton/MyButton'

interface ProfilePostsBlockProps {
  profileName: string
}

const ProfilePostsBlock = ({}) => {
  return <section>
    <NewPost/>
    <TabsRowBlock firstTabName={'All posts'} secondTabName={`Posts by Artyom`} />
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
    <Post/>
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