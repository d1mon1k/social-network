import cl from "./Message.module.scss";
import Avatar from "../../../components/Avatar/Avatar";

interface MessageProps {
  message: string
  photo: string | null | undefined
  name: string
  time: string
}

export const Message: React.FC<MessageProps> = ({
  message,
  name,
  photo,
  time
}) => {
  const messageParse = (message: string) => {
    return  message.split('<br />').map((item, index) => {
      return <p key={index} className={cl.message}>{item}</p>
    })
  }

  return (
    <li className={cl.messageColumn}>
      <div className={cl.avatar}><Avatar photo={photo} /></div>
      <div>
        <div>
          <span className={cl.name}>{name}</span>
          <time className={cl.time} >{time}</time>
        </div>
        {messageParse(message)}
      </div>
    </li>
  );
};
