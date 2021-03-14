import {React, useState} from 'react';

import classNames from 'classnames';
import styles from '../../styles/ManageSnack.module.css';
import { useField } from 'formik';

const TextInputLiveFeedback = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback =
    (didFocus && field.value.trim().length > 2) || meta.touched;

  return (
    <div
      className={classNames(styles.form__control,
        ` ${
          showFeedback ? (meta.error ? styles.invalid : styles.valid) : ''
        }` ) }
    >
      <div className={styles.form__flex}>
        <div className={styles.label}>{label}</div>
        {showFeedback ? (
          <div
            id={`${props.id}-feedback`}
            aria-live='polite'
            className={classNames(styles.feedback, styles.text__sm)}
          >
            {meta.error ? meta.error : '✓'}
          </div>
        ) : null}
      </div>
      <input className={styles.input}
        {...props}
        {...field}
        aria-describedby={`${props.id}-feedback ${props.id}-help`}
        onFocus={handleFocus}
      />
    </div>
  );
};

export default TextInputLiveFeedback;