import { Alert } from '@material-ui/lab';
import React from 'react';
import { Snackbar } from '@material-ui/core';
import classNames from 'classnames';
import styles from '../styles/ToastNotification.module.css';

const ToastNotification = (props) => {
  const { notification, open, onClose } = props;
  const { type, message } = notification;

  const classes = classNames({
    [styles.toast__base]: true,
    [styles.toast__success]: type === 'success',
    [styles.toast__error]: type === 'error'
  });

  return (
    <Snackbar className={styles.container} open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert className={classes} severity={type} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastNotification;
