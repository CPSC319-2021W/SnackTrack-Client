import { React, useEffect, useState } from 'react';

import Fuse from 'fuse.js';
// import UserCard from '../components/UserCard/UserCard';
import UserCardSkeleton from '../components/UserCard/UserCardSkeleton';
import UserLoginList from '../components/UserLoginList';
import UserSearchBar from '../components/UserSearchBar';
import { getUsers } from '../services/UsersService';
import styles from '../styles/SnackTrack.module.css';
import { useSelector } from 'react-redux';

const SelectLogin = () => {
  // // TODO: temporary, remove these calls when making UserLoginList component (SNAK-)
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
      // loginList = <UserCard user={usersToDisplay[0]} />;
      loginList = <UserLoginList users={usersToDisplay}/>;
    } else {
      loginList = <p>{"we couldn't find you. try again"}</p>;
    }
  } else {
    loginList = <UserCardSkeleton />;
  }

  return (
    <div>
      <h3 className={styles.SnackTrack}>SnackTrack</h3>
      <UserSearchBar />
      {loginList}
    </div>
  );
};

export default SelectLogin;
