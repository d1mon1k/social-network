import React from "react";
import cl from "./Avatar.module.css";

const Avatar = () => {
  return (
    <div className={cl.avatar}>
      <img
        className={cl.img}
        src="https://backlightblog.com/images/2020/10/blur-photo-background-header-1160x710.jpg"
        alt="avatar"
      />
      {/* <span>Joany</span>s */}
    </div>
  );
};

export default Avatar;
