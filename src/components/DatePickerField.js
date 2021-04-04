import React, { useState } from 'react';

import { ReactComponent as Calendar } from '../assets/icons/calendar.svg';
import { KeyboardDatePicker } from '@material-ui/pickers';
import classNames from 'classnames';
import styles from '../styles/Field.module.css';

const DatePickerField = (props) => {
  const { id, label, fullWidth, date, onChangeDate, error } = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={classNames({
      [styles.input__group]: true,
      [styles.full]: fullWidth
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
      <div className={classNames({
        [styles.input__container]: true,
        [styles.calendar__adornment]: true
      })}>
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
          keyboardIcon={<Calendar />}
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

export default DatePickerField;
