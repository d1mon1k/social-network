import cl from "./Profile.module.scss";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile:React.FC = () => {
  return (
    <main className={cl.mainContent}>
      <ProfileInfo />
      <MyPostsContainer />
    </main>
  );
};

export default Profile;
