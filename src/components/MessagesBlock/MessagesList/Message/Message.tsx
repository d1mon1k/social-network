import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../../Avatar/Avatar";
import cl from "./Message.module.scss";

/* ------------- Types ------------- */
interface MessageProps {
  message: string
  photo: string | null | undefined
  name: string
  time: string
  userId: number
}

/* ------------- Component ------------- */
export const Message: React.FC<MessageProps> = React.memo(({
  message,
  name,
  photo,
  time,
  userId
}) => {
  const messageParse = (message: string) => (
    message.split('<br />').map((item, index) => <p key={index} className={cl.message}>{item}</p>)
  )

  return (
    <li className={cl.messageColumn}>
      <div className={cl.avatar}><Avatar userId={userId} photo={photo} /></div>
      <div>
        <div>
          <Link to={`/profile/${userId}`} className={cl.name}>{name}</Link>
          <time className={cl.time}>{time}</time>
        </div>
        {messageParse(message)}
      </div>
    </li>
  );
})
