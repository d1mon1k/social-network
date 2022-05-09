import cl from "./Message.module.scss";
import Avatar from "../../../components/Avatar/Avatar";

interface MessageProps {
  key: number
  message: string
  isReverse: boolean
  photo: string | undefined
}

export const Message: React.FC<MessageProps> = (props) => {
  return (
    <li className={cl.messageColumn}>
      <div className={cl.avatar}>
        <Avatar photo={props.photo} />
      </div>
      <div>
        <span className={cl.name}>Marina</span>
        <time className={cl.time} >20:00</time>
      </div>
      <p className={cl.message}>{props.message}</p>
    </li>
  );
};
