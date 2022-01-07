import cl from "./NavBar.module.scss";

interface Props {
  key: number
  friend: {
    name: string
    avatar: string
    id: number
  }
}

export const FriendCard: React.FC<Props> = ({ friend }) => {
  return (
    <li className={cl.friend}>
      <a className={cl.friendLink} href="#">
        <img className={cl.friendAva} src={friend.avatar} alt="avatar" />
        <span className={cl.friendName}>{friend.name}</span>
      </a>
    </li>
  );
};
