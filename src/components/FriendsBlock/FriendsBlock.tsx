import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import { reduceLine } from '../../helpers/helpers';
import { IUser } from '../../redux/users/types';
import Avatar from '../Avatar/Avatar';
import cl from './FriendsBlock.module.scss';
import FriendsPreloader from './FriendsPreloader/FriendsPreloader';

/* ------------- Types ------------- */
interface FriendsBlockProps {
  friendsAmount: number;
  friendsList: IUser[];
  isFriendsFetching: boolean;
}

/* ------------- Component ------------- */
const FriendsBlock: React.FC<FriendsBlockProps> = ({ friendsList, friendsAmount, isFriendsFetching }) => {
  const isFriends = !isFriendsFetching && friendsAmount;

  return (
    <div className={cl.friendsBlock}>
      {!isFriends ? (
        <>
          <Skeleton className={cl.friendsAmountPreloader} count={0.5} />
          <FriendsPreloader count={6} />
        </>
      ) : (
        <>
          <Link to={'/users'} className={cl.header}>
            <span>Friends</span>
            <span className={cl.amount}>{friendsAmount}</span>
          </Link>
          <div className={cl.friendsGrid}>
            {friendsList?.map((friend) => (
              <div key={friend.id} className={cl.friend}>
                <div
                  className={cl.avatarContainer}
                  children={<Avatar photo={friend.photos.small} userId={friend.id} />}
                />
                <Link to={`/profile/${friend.id}`} className={cl.fullName} children={reduceLine(friend.name, 7)} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FriendsBlock;
