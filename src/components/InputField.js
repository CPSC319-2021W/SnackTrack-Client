import { React, useState } from 'react';

import { Input } from '@material-ui/core';
import classNames from 'classnames';
import styles from '../styles/Field.module.css';

const InputField = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const { id, label, small, value, placeholder, onChange, onFocus, error } = props;

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className={classNames({
      [styles.input__group]: true,
      [styles.input__small]: small
    })}>
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
            [styles.input__focused]: isFocused,
            [styles.input__error]: error
          })}
          id={id}
          disableUnderline={true}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={onFocus ? onFocus : handleFocus}
        />
        <p className={styles.error__message}>
          { error }
        </p>
      </div>
    </div>
  );
};

export default InputField;
