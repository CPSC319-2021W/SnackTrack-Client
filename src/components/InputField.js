import { React, useState } from 'react';

import { Input } from '@material-ui/core';
import classNames from 'classnames';
import styles from '../styles/Input.module.css';

const InputField = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const { id, isNumber, label, value, placeholder, onChange, error } = props;

  return (
    <div className={styles.input__group}>
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
      <div className={styles.input__container}>
        <Input
          className={classNames({
            [styles.input__base]: true,
            [styles.input__number]: isNumber,
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
        <p className={styles.error__message}>
          { error }
        </p>
      </div>
    </div>
  );
};

export default InputField;
