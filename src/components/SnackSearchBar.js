import { Input, InputAdornment } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import search from '../assets/icons/search.svg';
import { setSnackSearchValue } from '../redux/features/searchbar/searchbarSlice';
import styles from '../styles/SearchBar.module.css';
import { useDispatch } from 'react-redux';

const SnackSearchBar = () => {
  const dispatch = useDispatch();
  const [value, updateValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const WAIT_INTERVAL = 200;

  const handleChange = (event) => {
    updateValue(event.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setSnackSearchValue(value));
    }, WAIT_INTERVAL);

    // remove the previous timer if value changed
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <Input
      className={classNames({
        [styles.snackSearchBar]: true,
        [styles.snackSearchBar__focused]: isFocused
      })}
      disableUnderline={true}
      startAdornment={(
        <InputAdornment position='start' variant='filled'>
          <img className={styles.icon__base} src={search} />
        </InputAdornment>
      )}
      placeholder={'Search'}
      value={value}
      onChange={handleChange}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
    />
  );
};

export default SnackSearchBar;
