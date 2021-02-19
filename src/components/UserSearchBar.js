import { Input, InputAdornment } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import React from 'react';
import search from '../assets/icons/search.svg';
import { setValue } from '../redux/features/searchbar/searchbarSlice';
import styles from '../styles/UserSearchBar.module.css';

const UserSearchBar = () => {
  const dispatch = useDispatch();
  const { searchValue } = useSelector((state) => state.searchbarReducer);

  const handleChange = (event) => {
    dispatch(setValue(event.target.value));
  };

  return (
    <Input
      className={styles.searchBar}
      autoFocus={true}
      disableUnderline={true}
      startAdornment={(
        <InputAdornment position='start' variant='filled'>
          <img className={styles.icon__base} src={search} />
        </InputAdornment>
      )}
      placeholder='Enter your name...'
      value={searchValue}
      onChange={handleChange}
    />
  );
};

export default UserSearchBar;
