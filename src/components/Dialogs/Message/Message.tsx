import cl from "./Message.module.scss";
import Avatar from "../../Avatar/Avatar";

export const Message = (props) => {
  let date = new Date();
  date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  let itemStyle = [cl.userMessage];
  if (props.isReverse) {
    itemStyle.push(cl.reverse);
  }
  return (
    <li className={itemStyle.join(" ")}>
      <Avatar />
      <div className={cl.userColumn}>
        <span className={cl.userName}>{`Marina ${date}`}</span>
        <span className={cl.userMessage}>{props.message}</span>
      </div>
    </li>
  );
};
