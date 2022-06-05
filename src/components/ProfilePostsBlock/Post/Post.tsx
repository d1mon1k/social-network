import { Link } from "react-router-dom"
import { CommentSvg, DotsSvg, LikeSvg, ShareSvg } from "../../../helpers/icons/icons"
import Avatar from "../../Avatar/Avatar"
import photo from '../../../assets/images/jpeg/no-photo.jpg'
import cl from './Post.module.scss'

interface PostProps {

}

const Post: React.FC<PostProps> = () => {
  return <div className={cl.post}>
  <div className={cl.postTopRow}>
    <div className={cl.avatarContainer}>
      <Avatar photo={photo} />
    </div>
    <div className={cl.columnBlock}>
     <Link to={'/profile'} className={cl.profileName}>Artyom Ostrovskiy</Link>
     <time className={cl.date}>13 oct 2017</time>
    </div>
    <div className={cl.dotsSvgContainer}><DotsSvg/></div>
  </div>
  <div className={cl.postBody}>
    Lorem ipsum dolor sit amet.
  </div>
  <div className={cl.postBottomBtns}>
    <div className={cl.btnSvg}><LikeSvg/><span>1</span></div>
    <div className={cl.btnSvg}><CommentSvg/><span>2</span></div>
    <div className={cl.btnSvg}><ShareSvg/></div>
  </div>
</div>
}

export default Post