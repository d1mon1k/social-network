import { debounce } from 'lodash';
import React, { useEffect, useMemo, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import PeopleNav from '../../components/PeopleNav/PeopleNav';
import TabsRowBlock from '../../components/TabsRowBlock/TabsRowBlock';
import cl from './PeoplePage.module.scss';

/* ------------- Types ------------- */
interface PeoplePageProps {
  totalUsersCount: number;
  searchInput: string;
  isUsersFetching: boolean;
  navigate: (link: string) => void;
  setSearchInput: (searchInput: string) => void;
}

export interface PeoplePageContextProps {
  searchInput: string;
}

/* ------------- Component ------------- */
const PeoplePage: React.FC<PeoplePageProps> = ({ totalUsersCount, searchInput, navigate, isUsersFetching, setSearchInput }) => {
  const searchField = useRef<HTMLInputElement>(null);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value);

  const debouncedInputChangeHandler = useMemo(() => {
    return debounce(inputChangeHandler, 600);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      debouncedInputChangeHandler.cancel();
    };
  }, [debouncedInputChangeHandler]);

  return (
    <section className={cl.usersIFollowSection}>
      <section className={cl.usersSection}>
        <TabsRowBlock
          firstTab={['All developers', '/users/all-people']}
          secondTab={['Friends', '/users']}
          totalCount={totalUsersCount}
          button={[() => navigate('/users/all-people'), 'Find developers']}
        />
        <input
          ref={searchField}
          placeholder={'Search users I follow'}
          className={cl.searchInput}
          type='text'
          onChange={debouncedInputChangeHandler}
        />
        <Outlet context={{ searchInput }} /> {/* PeopleContainer, FriendsContainer */}
      </section>
      <PeopleNav />
    </section>
  );
};

export default PeoplePage;
