import cl from "./NavBar.module.scss";

export const FriendCard = ({ friend }) => {
  return (
    <li className={cl.friend}>
      <a className={cl.friendLink} href="#">
        <img className={cl.friendAva} src={friend.avatar} alt="avatar" />
        <span className={cl.friendName}>{friend.name}</span>
      </a>
    </li>
  );
};
