import { React, useState } from 'react';

import { Input } from '@material-ui/core';
import classNames from 'classnames';
import styles from '../styles/Field.module.css';

const TextAreaField = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const { id, label, value, placeholder, onChange, onBlur, error } = props;

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={styles.textarea__group}>
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
          multiline
          rows={4}
          className={classNames({
            [styles.textarea__base]: true,
            [styles.input__focused]: isFocused,
            [styles.input__error]: error
          })}
          id={id}
          disableUnderline={true}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur || handleBlur}
          onFocus={() => setIsFocused(true)}
        />
        <p className={styles.error__message}>{error}</p>
      </div>
    </div>
  );
};

export default TextAreaField;
