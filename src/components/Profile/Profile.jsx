import React from "react";
import cl from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = ({ profilePage, addPost, onPostChange }) => {
  return (
    <main className={cl.mainContent}>
      <ProfileInfo />
      <MyPosts
        addPost={addPost}
        profilePage={profilePage}
        onPostChange={onPostChange}
      />
    </main>
  );
};

export default Profile;
