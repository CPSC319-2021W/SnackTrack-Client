import { React, useState } from 'react';

import { Input } from '@material-ui/core';
import classNames from 'classnames';

import InfoLabel from './InfoLabel';
import styles from '../styles/Field.module.css';

const InputField = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const {
    id,
    label,
    small,
    fullWidth,
    value,
    placeholder,
    info,
    onChange,
    onKeyPress,
    error
  } = props;

  return (
    <div
      className={classNames({
        [styles.input__group]: true,
        [styles.input__small]: small,
        [styles.full]: fullWidth
      })}
    >
      <div className={styles.label__container}>
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
        { info ? <InfoLabel info={info} /> : null }
      </div>
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
          onKeyPress={onKeyPress}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
        <p className={styles.error__message}>{error}</p>
      </div>
    </div>
  );
};

export default InputField;
