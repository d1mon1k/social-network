import cl from "./Message.module.scss";
import Avatar from "../../Avatar/Avatar";

interface Props {
  key: number
  message: string
  isReverse: boolean
}

export const Message: React.FC<Props> = (props) => {
  return (
    <li className={cl.messageColumn}>
      <div className={cl.avatar}>
        <Avatar />
      </div>
      <div>
        <span className={cl.name}>Marina</span>
        <time className={cl.time} >20:00</time>
      </div>
      <p className={cl.message}>{props.message}</p>
    </li>
  );
};
