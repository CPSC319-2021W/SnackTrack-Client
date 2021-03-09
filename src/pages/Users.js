import { React, useEffect, useState } from 'react';

import Fuse from 'fuse.js';
import UserCardSkeleton from '../components/UserCard/UserCardSkeleton';
import UserLoginList from '../components/UserLoginList';
import UserSearchBar from '../components/UserSearchBar';
import adminStyles from '../styles/AdminUsersList.module.css';
import { getUsers } from '../services/UsersService';
import styles from '../styles/Page.module.css';
import { useSelector } from 'react-redux';

const Users = () => {
  const [loaded, isLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersToDisplay, setUsersToDisplay] = useState(users);
  const { searchValue } = useSelector((state) => state.searchbarReducer);

  const options = {
    keys: ['first_name', 'last_name', 'username']
  };

  const handleSearch = (value) => {
    if (value === '') {
      setUsersToDisplay(users);
    } else {
      const fuse = new Fuse(users, options);
      const results = fuse.search(value);
      const filteredUsers = results.map((itemIndexPair) => {
        return itemIndexPair.item;
      });
      setUsersToDisplay(filteredUsers);
    }
  };

  useEffect(() => {
    handleSearch(searchValue);
  }, [loaded, searchValue]);

  useEffect(() => {
    isLoaded(users.length > 0);
  }, [users]);

  useEffect(() => {
    const getAllUsers = () => {
      const data = getUsers();
      setUsers(data.users);
    };
    getAllUsers();
  }, []);

  let loginList;

  if (loaded) {
    if (usersToDisplay.length > 0) {
      loginList = <UserLoginList className={adminStyles.list} users={usersToDisplay} />;
    } else {
      loginList = <p>{"We couldn't find that user. Please try again."}</p>;
    }
  } else {
    loginList = (
      <div className={adminStyles.list}>
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
    <div className={styles.base}>
      <div className={styles.header}>
        <h5 className={styles.title}>Users</h5>
      </div>
      <div className={adminStyles.list__container}>
        <UserSearchBar />
        {loginList}
      </div>
    </div>
  );
};

export default Users;
