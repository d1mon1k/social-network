import Skeleton from 'react-loading-skeleton';
import cl from './FriendsPreloader.module.scss';

/* ------------- Component ------------- */
const FriendsPreloader = ({ count }: { count: number }) => {
  const friends = new Array(count).fill(0);

  const FriendPreloader = () => (
    <div className={cl.friend}>
      <Skeleton inline circle width={50} height={50} />
      <Skeleton width={50} inline />
    </div>
  );

  return (
    <div className={cl.friendsGrid}>
      {friends.map((friend, i) => (
        <FriendPreloader key={i} />
      ))}
    </div>
  );
};

export default FriendsPreloader;
