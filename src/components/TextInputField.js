import { React, useState } from 'react';

import { Input } from '@material-ui/core';
import classNames from 'classnames';
import styles from '../styles/Input.module.css';

const TextInputField = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const { id, value, placeholder, onChange, error } = props;

  return (
    <Input
      className={classNames({
        [styles.input__base]: true,
        [styles.input__focused]: isFocused,
        [styles.input__error]: error
      })}
      id={id}
      disableUnderline={true}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
    />
  );
};

export default TextInputField;
