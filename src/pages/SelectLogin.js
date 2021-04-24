import { React, useEffect, useState } from 'react';

import { DEFAULT_SEARCH_THRESHOLD, NOTIFICATIONS } from '../constants';
import { ReactComponent as SnackTrackLogo } from '../assets/logos/snacktrack.svg';
import UserCardSkeleton from '../components/UserCard/UserCardSkeleton';
import UserLoginList from '../components/UserLoginList';
import UserSearchBar from '../components/UserSearchBar';
import { getUsersCommon } from '../services/UsersService';
import { handleSearch } from '../helpers/SearchHelpers';
import styles from '../styles/Login.module.css';
import { useSelector } from 'react-redux';

const SelectLogin = () => {
  const [error, setError] = useState(null);
  const [loaded, isLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersToDisplay, setUsersToDisplay] = useState(users);
  const { usersSearchValue } = useSelector((state) => state.searchbarReducer);

  users.forEach(user => {
    user.full_name = `${user.first_name} ${user.last_name}`;
  });

  const searchOptions = {
    keys: ['full_name', 'email_address'],
    threshold: DEFAULT_SEARCH_THRESHOLD
  };

  const renderList = () => {
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
    return loginList;
  };

  const renderError = () => {
    return (
      <p className={styles.error__message}>
        { NOTIFICATIONS.ERROR.message }
      </p>
    );
  };

  useEffect(() => {
    handleSearch(users, usersSearchValue, setUsersToDisplay, searchOptions);
  }, [loaded, usersSearchValue]);

  useEffect(() => {
    isLoaded(users.length > 0);
  }, [users]);

  useEffect(async () => {
    const getAllUsers = async () => {
      try {
        const data = await getUsersCommon();
        setUsers(data.users);
      } catch (err) {
        console.log(err);
        setError(err);
      }
    };
    getAllUsers();
  }, []);

  return (
    <div className={styles.container}>
      <SnackTrackLogo className={styles.common__logo} />
      <div className={styles.seachbar__container}>
        <UserSearchBar />
      </div>
      <div className={styles.list__container}>
        { error ? renderError() : renderList() }
      </div>
    </div>
  );
};

export default SelectLogin;
