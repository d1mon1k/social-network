import React from "react";
import cl from "./DialogItem.module.css";
import { NavLink } from "react-router-dom";

export const DialogItem = (props) => {
  return (
    <li className={cl.userItem}>
      <NavLink
        className={cl.userName}
        activeClassName={cl.active}
        to={`/dialogs/${props.id}`}
      >
        {props.name}
      </NavLink>
    </li>
  );
};
