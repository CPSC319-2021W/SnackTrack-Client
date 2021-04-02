import { React, useEffect, useState } from 'react';

import { ReactComponent as SnackTrackLogo } from '../assets/snacktrack.svg';
import UserCardSkeleton from '../components/UserCard/UserCardSkeleton';
import UserLoginList from '../components/UserLoginList';
import UserSearchBar from '../components/UserSearchBar';
import { getUsersCommon } from '../services/UsersService';
import { handleSearch } from '../helpers/SearchHelpers';
import styles from '../styles/Login.module.css';
import { useSelector } from 'react-redux';

const SelectLogin = () => {
  const [loaded, isLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersToDisplay, setUsersToDisplay] = useState(users);
  const { usersSearchValue } = useSelector((state) => state.searchbarReducer);

  const searchOptions = {
    keys: ['first_name', 'last_name', 'username']
  };

  useEffect(() => {
    handleSearch(users, usersSearchValue, setUsersToDisplay, searchOptions);
  }, [loaded, usersSearchValue]);

  useEffect(() => {
    isLoaded(users.length > 0);
  }, [users]);

  useEffect(async () => {
    const getAllUsers = async () => {
      const data = await getUsersCommon();
      setUsers(data.users);
    };
    getAllUsers();
  }, []);

  let loginList;

  if (loaded) {
    if (usersToDisplay.length > 0) {
      loginList = <UserLoginList users={usersToDisplay} />;
    } else {
      loginList = <p>{"We couldn't find you. Please try again."}</p>;
    }
  } else {
    loginList = (
      <div className={styles.list}>
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <SnackTrackLogo className={styles.common__logo} />
      <div className={styles.seachbar__container}>
        <UserSearchBar />
      </div>
      <div className={styles.list__container}>{loginList}</div>
    </div>
  );
};

export default SelectLogin;
