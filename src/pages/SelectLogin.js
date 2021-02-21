import { React, useEffect, useState } from 'react';

import Fuse from 'fuse.js';
import UserCard from '../components/UserCard/UserCard';
import UserCardSkeleton from '../components/UserCard/UserCardSkeleton';
import UserSearchBar from '../components/UserSearchBar';
import { getUsers } from '../services/UsersService';
import styles from '../styles/SnackTrack.module.css';
import { useSelector } from 'react-redux';

const SelectLogin = () => {
  // // TODO: temporary, remove these calls when making UserLoginList component (SNAK-)
  const [loaded, isLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [usersToDisplay, setUsersToDisplay] = useState([]);
  const { searchValue } = useSelector((state) => state.searchbarReducer);

  const handleSearch = (value) => {
    const options = {
      keys: ['first_name', 'last_name', 'username']
    };
    const fuse = new Fuse(users, options);
    const results = fuse.search(value);
    const filteredUsers = results.map((itemIndexPair) => {
      return itemIndexPair.item;
    });
    setUsersToDisplay(filteredUsers);
  };

  useEffect(() => {
    handleSearch(searchValue);
  }, [searchValue]);

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

  let card;
  if (loaded) {
    if (searchValue === '') {
      card = <UserCard user={users[0]} />;
    } else if (usersToDisplay.length > 0) {
      card = <UserCard user={usersToDisplay[0]} />;
    } else {
      card = <p>{"we couldn't find you. try again"}</p>;
    }
  } else {
    card = <UserCardSkeleton />;
  }

  return (
    <div>
      <h3 className={styles.SnackTrack}>SnackTrack</h3>
      <UserSearchBar />
      {card}
    </div>
  );
};

export default SelectLogin;
