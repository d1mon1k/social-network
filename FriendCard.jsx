import React from "react";
export function FriendCard({}) {
  return <li className={cl.friend}>
        <a className={cl.friendLink} href="#">
          <img className={cl.friendAva} src={friend.avatar} alt="avatar" />
          <span className={cl.friendName}>{friend.name}</span>
        </a>
      </li>;
}
  