import { Input, InputAdornment } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import React, { useEffect, useState } from 'react';
import search from '../assets/icons/search.svg';
import { setValue } from '../redux/features/searchbar/searchbarSlice';
import styles from '../styles/UserSearchBar.module.css';

const UserSearchBar = () => {
  // Interval to wait after the user stops typing before updating the Redux store
  // Improves performance, stops filtering on each keystroke
  const WAIT_INTERVAL = 200;

  const dispatch = useDispatch();
  const [value, updateValue] = useState('');

  const handleChange = (event) => {
    updateValue(event.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setValue(value));
    }, WAIT_INTERVAL);

    // remove the previous timer if value changed
    return () => clearTimeout(timeout);
  }, [value]);

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
      value={value}
      onChange={handleChange}
    />
  );
};

export default UserSearchBar;
