import React, { useState } from 'react';

import { KeyboardDatePicker } from '@material-ui/pickers';
import classNames from 'classnames';
import styles from '../styles/Input.module.css';

const InputField = (props) => {
  const { id, label, date, onChangeDate, error } = props;
  const [isFocused, setIsFocused] = useState(false);

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
        <KeyboardDatePicker
          autoOk
          disablePast
          disableToolbar
          variant='inline'
          inputVariant='outlined'
          format='MM/dd/yyyy'
          maxDateMessage=''
          minDateMessage=''
          value={date}
          error={!!error}
          onChange={onChangeDate}
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