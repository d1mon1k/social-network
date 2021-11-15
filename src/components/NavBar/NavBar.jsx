import React from "react";
import cl from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { FriendCard } from "./FriendCard";

const NavBar = ({ friends }) => {
  const friendsList = friends.map((friend) => {
    return <FriendCard key={friend.id} friend={friend} />;
  });

  return (
    <aside className={cl.aside}>
      <nav className={cl.mainNav}>
        <ul>
          <li className={cl.aside__item}>
            <NavLink
              exact
              activeClassName={cl.active}
              to="/"
              className={cl.aside__link}
            >
              Profile
            </NavLink>
          </li>
          <li className={cl.aside__item}>
            <NavLink
              activeClassName={cl.active}
              to="/dialogs"
              className={cl.aside__link}
            >
              Dialogs
            </NavLink>
          </li>
          <li className={cl.aside__item}>
            <NavLink
              activeClassName={cl.active}
              to="/music"
              className={cl.aside__link}
            >
              Music
            </NavLink>
          </li>
          <li className={cl.aside__item}>
            <NavLink
              activeClassName={cl.active}
              to="/news"
              className={cl.aside__link}
            >
              News
            </NavLink>
          </li>

          <li className={cl.aside__item}>
            <NavLink
              activeClassName={cl.active}
              to="/settings"
              className={cl.aside__link}
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
      <nav>
        {/* //BUG change structure of sidebar */}
        <h2 className={cl.friendsTitle}>
          <a href="#">Friends</a>
        </h2>
        <ul className={cl.friendsList}>{friendsList}</ul>
      </nav>
    </aside>
  );
};

export default NavBar;
