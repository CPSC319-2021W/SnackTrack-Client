import { React, useEffect, useState } from 'react';

import { CircularProgress } from '@material-ui/core';
import UserSearchBar from '../components/UserSearchBar';
import UsersContainerAdmin from '../components/UsersContainerAdmin';
import adminStyles from '../styles/AdminUsersList.module.css';
import { getUsersAdmin } from '../services/UsersService';
import { handleSearch } from '../helpers/SearchHelpers';
import styles from '../styles/Page.module.css';
import { useSelector } from 'react-redux';

const Users = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersToDisplay, setUsersToDisplay] = useState(users);
  const { usersSearchValue } = useSelector((state) => state.searchbarReducer);

  const searchOptions = {
    keys: ['first_name', 'last_name', 'username']
  };

  useEffect(async () => {
    const { users } = await getUsersAdmin();
    setUsers(users);
    setIsLoaded(users.length > 0);
  }, []);

  useEffect(() => {
    handleSearch(users, usersSearchValue, setUsersToDisplay, searchOptions);
  }, [isLoaded, usersSearchValue]);

  const renderList = () => {
    if (usersToDisplay.length === 0) {
      return <p>{"We couldn't find that user. Please try again."}</p>;
    } else {
      return <UsersContainerAdmin users={usersToDisplay} />;
    }
  };

  return (
    <div className={styles.base}>
      <div className={styles.header}>
        <h5 className={styles.title}>Users</h5>
      </div>
      <div className={adminStyles.page__content}>
        <UserSearchBar />
        { isLoaded ? renderList() : (
          <div className={adminStyles.list__container}>
            <CircularProgress color='secondary' size={30} thickness={5} />
          </div>
        ) }
      </div>
    </div>
  );
};

export default Users;
