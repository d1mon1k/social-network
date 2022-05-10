import cl from "./Avatar.module.scss";
import defaultPhoto from '../../assets/images/jpeg/no-photo.jpg'

interface AvatarProps {
  photo: string | null | undefined
}

const Avatar: React.FC<AvatarProps> = ({photo}) => {
  return (
    <div className={cl.avatar}>
      <img
        className={cl.img}
        src={photo || defaultPhoto}
        alt="avatar"
      />
      {/* <span>Joany</span>s */}
    </div>
  );
};

export default Avatar;
