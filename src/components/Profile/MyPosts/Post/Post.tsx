import Avatar from '../../../Avatar/Avatar'
import cl from './Post.module.scss'

interface Props {
  key: number
  message: string
}

const Post: React.FC<Props> = (props) => {
  return (
    <li className={cl.item}>
      <a className={cl.imgContainer} href="/">
        <Avatar />
      </a>
      <p className={cl.article}>{props.message}</p>
    </li>
  )
}

export default Post
