import cl from "./ProfileInfo.module.scss";

const ProfileInfo: React.FC = () => {
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
