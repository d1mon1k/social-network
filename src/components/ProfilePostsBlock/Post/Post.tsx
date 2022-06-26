import { Link } from "react-router-dom"
import { CommentSvg, DotsSvg, LikeSvg, ShareSvg } from "../../../helpers/icons/icons"
import { convertDateFormat } from '../../../helpers/helpers'
import Avatar from "../../Avatar/Avatar"
import photo from '../../../assets/images/jpeg/no-photo.jpg'
import cl from './Post.module.scss'

interface PostProps {
  postBody: string
  image: string | null
  time: string
  likes: number
  setPost: (id: string, body: string, image: string) => void
  deletePost: (id: string) => void
}

const Post: React.FC<PostProps> = ({
  postBody,
  image,
  time,
  likes,
}) => {
  const PostBodyComponent = postBody.split('\n').map((paragraph, index) => <p className={cl.postParagraph} key={index}>{paragraph}</p>)

  return <div className={cl.post}>
  <div className={cl.postTopRow}>
    <div className={cl.avatarContainer}>
      <Avatar photo={photo} />
    </div>
    <div className={cl.columnBlock}>
     <Link to={'/profile'} className={cl.profileName}>Artyom Ostrovskiy</Link>
     <time className={cl.date}>{convertDateFormat(time, true)}</time>
    </div>
    <div className={cl.dotsSvgContainer}><DotsSvg/></div>
  </div>
  <div className={cl.postBody}>
    {PostBodyComponent}
  </div>
  {image && <img className={cl.image} src={image} alt="" />}
  <div className={cl.postBottomBtns}>
    <div className={cl.btnSvg}><LikeSvg/><span>{likes}</span></div>
    <div className={cl.btnSvg}><CommentSvg/><span>2</span></div>
    <div className={cl.btnSvg}><ShareSvg/></div>
  </div>
</div>
}

export default Post