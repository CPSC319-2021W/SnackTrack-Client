import { Input, InputAdornment } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import { ROUTES } from '../constants';
import classNames from 'classnames';
import search from '../assets/icons/search.svg';
import { setUserSearchValue } from '../redux/features/searchbar/searchbarSlice';
import styles from '../styles/SearchBar.module.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const UserSearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = history.location;
  const [value, updateValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const WAIT_INTERVAL = 200;

  const handleChange = (event) => {
    updateValue(event.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setUserSearchValue(value));
    }, WAIT_INTERVAL);

    // remove the previous timer if value changed
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      className={classNames({
        [styles.searchBar]: true,
        [styles.searchBar__focused]: isFocused,
        [styles.searchBar__left]: pathname === ROUTES.USERS
      })}
      autoFocus={pathname === ROUTES.COMMON}
      disableUnderline={true}
      startAdornment={(
        <InputAdornment position='start' variant='filled'>
          <img className={styles.icon__base} src={search} />
        </InputAdornment>
      )}
      placeholder={pathname === ROUTES.COMMON ? 'Enter your name' : 'Enter a name'}
      value={value}
      onChange={handleChange}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
    />
  );
};

export default UserSearchBar;
