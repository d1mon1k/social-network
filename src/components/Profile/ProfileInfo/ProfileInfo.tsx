import React from "react";
import cl from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
  return (
    <>
      <div className={cl.main__imgContainer}>
        <div className={cl.main__img}></div>
      </div>
      <div>ava + descriptor</div>
    </>
  );
};

export default ProfileInfo;
