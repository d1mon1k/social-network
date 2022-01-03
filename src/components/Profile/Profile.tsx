import React from "react";
import cl from "./Profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = () => {
  return (
    <main className={cl.mainContent}>
      <ProfileInfo />
      <MyPostsContainer />
    </main>
  );
};

export default Profile;
