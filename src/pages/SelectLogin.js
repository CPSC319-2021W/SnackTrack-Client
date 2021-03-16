import { React, useEffect, useState } from 'react';

import Fuse from 'fuse.js';
import UserCardSkeleton from '../components/UserCard/UserCardSkeleton';
import UserLoginList from '../components/UserLoginList';
import UserSearchBar from '../components/UserSearchBar';
import { getUsersCommon } from '../services/UsersService';
import styles from '../styles/Login.module.css';
import { useSelector } from 'react-redux';

const SelectLogin = () => {
  const [loaded, isLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersToDisplay, setUsersToDisplay] = useState(users);
  const { usersSearchValue } = useSelector((state) => state.searchbarReducer);

  const options = {
    keys: ['first_name', 'last_name', 'username']
  };

  const handleSearch = (value) => {
    value = value.trim();
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
    handleSearch(usersSearchValue);
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
      <h2 className={styles.title}>SnackTrack</h2>
      <UserSearchBar />
      <div className={styles.list__container}>{loginList}</div>
    </div>
  );
};

export default SelectLogin;
