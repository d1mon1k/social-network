import cl from "./Avatar.module.scss";
import defaultPhoto from '../../assets/images/jpeg/no-photo.jpg'
import { useNavigate } from "react-router-dom";

interface AvatarProps {
  photo: string | null | undefined
  userId?: number
}

const Avatar: React.FC<AvatarProps> = ({photo, userId}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/profile/${userId}`)
  }

  return (
    <img
      className={cl.img}
      src={photo || defaultPhoto}
      alt="avatar"
      onClick={userId ? handleClick : () => {}}
    />
  )
};

export default Avatar;
