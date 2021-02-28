import { React, useState } from 'react';

import { Input } from '@material-ui/core';
import classNames from 'classnames';
import styles from '../styles/Input.module.css';

const TextInputField = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const { id, label, value, placeholder, onChange, error } = props;

  return (
    <div className={styles.input__container}>
      <label
        className={classNames({
          [styles.label__base]: true,
          [styles.label__focused]: isFocused,
          [styles.label__error]: error
        })}
        htmlFor={id}
      >
        {label}
      </label>
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
    </div>
  );
};

export default TextInputField;
