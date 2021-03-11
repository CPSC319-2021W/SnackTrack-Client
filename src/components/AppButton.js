import React from 'react';

import { Button, CircularProgress } from '@material-ui/core';
import classNames from 'classnames';

import styles from '../styles/AppButton.module.css';

const AppButton = (props) => {
  const {
    primary,
    secondary,
    outline,
    small,
    fullWidth,
    disabled,
    loading,
    onClick,
    children
  } = props;

  return (
    <Button className={classNames({
      [styles.base]: true,
      [styles.primary]: primary,
      [styles.secondary]: secondary,
      [styles.outline]: outline,
      [styles.small]: small,
      [styles.fullWidth]: fullWidth
    })}
    disabled={(primary || secondary) && disabled}
    onClick={loading ? null : onClick}>
      {
        loading ? (
          <div className={styles.progress__container}>
            <div className={styles.progress__text}>
              { children }
            </div>
            <CircularProgress size={18} thickness={6} />
          </div>
        ) : children
      }
    </Button>
  );
};

export default AppButton;