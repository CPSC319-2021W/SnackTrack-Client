import React from 'react';

import { KeyboardDatePicker } from '@material-ui/pickers';
import styles from '../styles/Input.module.css';

const InputField = (props) => {
  const { date, onChangeDate, error } = props;

  return (
    <div className={styles.input__group}>
      <div className={styles.input__container}>
        <div className={error ? styles.picker__container__error : null}>
          <KeyboardDatePicker
            autoOk
            disablePast
            disableToolbar
            variant='inline'
            inputVariant='outlined'
            format='MM/dd/yyyy'
            InputAdornmentProps={{ position: 'start' }}
            maxDateMessage=''
            minDateMessage=''
            value={date}
            onChange={onChangeDate}
          />
        </div>
        <p className={styles.error__message}>
          { error }
        </p>
      </div>
    </div>
  );
};

export default InputField;
