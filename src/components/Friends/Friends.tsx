import { useCallback } from 'react';
import useObserver from '../../helpers/hooks/useObserver';
import { IUser } from '../../redux/users/types';
import Preloader from '../common/Preloader/Preloader';
import UsersList from '../UsersList/UsersList';

/* ------------- Types ------------- */
interface FriendsProps {
  usersData: { items: IUser[]; totalItemsCount: number; currentPage: number };
  isSubscribePending: number[];
  isUsersFetching: boolean;
  maxPageItemsCount: number;
  searchInput: string;
  fetchUsers: (maxPageItemsCount: number, term: string, friend: boolean) => Promise<void>;
  toggleFollowOnUser: (userId: number, followed: boolean) => void;
  createDialog: (userId: number) => void;
}

/* ------------- Component ------------- */
const Friends: React.FC<FriendsProps> = ({
  usersData,
  searchInput,
  isSubscribePending,
  isUsersFetching,
  toggleFollowOnUser,
  createDialog,
  maxPageItemsCount,
  fetchUsers,
}) => {
  const { items, totalItemsCount } = usersData;
  const isEndList = totalItemsCount === usersData.items.length;

  const fetchUsersCallBack = useCallback(() => {
    return fetchUsers(maxPageItemsCount, searchInput, true);
  }, [maxPageItemsCount, searchInput, fetchUsers]);

  const observedElement = useObserver(isUsersFetching, isEndList, fetchUsersCallBack);

  return (
    <>
      <UsersList usersList={items} isSubscribePending={isSubscribePending} toggleFollowOnUser={toggleFollowOnUser} createDialog={createDialog} />
      {isUsersFetching ? <Preloader width='50px' height='50px' position='absolute' /> : <div style={{ height: '1px' }} ref={observedElement!} />}
    </>
  );
};

export default Friends;
