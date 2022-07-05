import { Link } from "react-router-dom"
import { CommentSvg, DotsSvg, LikeSvg, ShareSvg } from "../../../helpers/icons/icons"
import { convertDateFormat } from '../../../helpers/helpers'
import Avatar from "../../Avatar/Avatar"
import cl from './Post.module.scss'

/* ------------- Types ------------- */
interface PostProps {
  postBody: string
  image: string | null
  time: string
  likes: number
  id: string
  authorName: string,
  authorPhoto: string | null,
  authorId: number,
  setPost: (id: string, body: string, image: string) => void
  deletePost: (id: string) => void
}

/* ------------- Component ------------- */
const Post: React.FC<PostProps> = ({
  authorName,
  authorPhoto,
  authorId,
  postBody,
  image,
  time,
  likes,
  id,
  deletePost,
}) => {
  const PostBodyComponent = postBody.split('\n').map((paragraph, index) => 
    <p className={cl.postParagraph} key={index}>{paragraph}</p>)

  const handleDeletePost = () => deletePost(id)

  return (
    <div className={cl.post}>
      <div className={cl.postTopRow}>
        <div className={cl.avatarContainer}>
          <Avatar photo={authorPhoto} userId={authorId} />
        </div>
        <div className={cl.columnBlock}>
          <Link to={`/profile/${authorId}`} className={cl.profileName}>
            {authorName}
          </Link>
          <time className={cl.date}>{convertDateFormat(time, true)}</time>
        </div>
        <div className={cl.dotsSvgContainer}>
          <ul className={cl.dotsSvgPopUp}>
            <li onClick={handleDeletePost}>Delete post</li>
          </ul>
          <DotsSvg />
        </div>
      </div>
      <div className={cl.postBody}>{PostBodyComponent}</div>
      {image && <img className={cl.image} src={image} alt="" />}
      <div className={cl.postBottomBtns}>
        <div className={cl.btnSvg}>
          <LikeSvg />
          <span>{likes}</span>
        </div>
        <div className={cl.btnSvg}>
          <CommentSvg />
          <span>2</span>
        </div>
        <div className={cl.btnSvg}>
          <ShareSvg />
        </div>
      </div>
    </div>
  )
}

export default Post