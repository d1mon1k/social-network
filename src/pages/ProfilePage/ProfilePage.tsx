import { useEffect, useState } from 'react';
import InfoBlockContainer from '../../components/InfoBlock/InfoBlockContainer';
import PhotoBlockContainer from '../../components/PhotoBlock/PhotoBlockContainer';
import PostsBlockContainer from '../../components/PostsBlock/PostsBlockContainer';
import { IUser } from '../../redux/users/types';
import cl from './ProfilePage.module.scss';
import FriendsBlockContainer from '../../components/FriendsBlock/FriendsBlockContainer';

/* ------------- Types ------------- */
interface ProfilePageProps {
  friends: IUser[];
  totalFriendsCount: number;
}

/* ------------- Component ------------- */
const ProfilePage: React.FC<ProfilePageProps> = ({ friends, totalFriendsCount }) => {
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  }, []);

  return (
    <section className={cl.profile}>
      <div className={cl.leftCol}>
        <PhotoBlockContainer isEdit={isEdit} setIsEdit={setIsEdit} />
        <FriendsBlockContainer friendsList={friends.slice(0, 6)} friendsAmount={totalFriendsCount} />
      </div>
      <div className={cl.rightCol}>
        <InfoBlockContainer isEdit={isEdit} />
        <PostsBlockContainer friends={friends} />
      </div>
    </section>
  );
};

export default ProfilePage;
