import React from 'react';

import { Button, CircularProgress } from '@material-ui/core';
import classNames from 'classnames';
import { isMobile } from 'react-device-detect';

import styles from '../styles/AppButton.module.css';

const AppButton = (props) => {
  const {
    type,
    primary,
    secondary,
    outline,
    cancel,
    small,
    large,
    fullWidth,
    disabled,
    loading,
    onClick,
    children
  } = props;

  return (
    <Button
      type={type}
      className={classNames({
        [styles.mobile]: isMobile,
        [styles.base]: true,
        [styles.primary]: primary,
        [styles.secondary]: secondary,
        [styles.outline]: outline,
        [styles.cancel]: cancel,
        [styles.large]: large,
        [styles.small]: small,
        [styles.fullWidth]: fullWidth,
        [styles.loading]: loading
      })}
      disabled={(primary || secondary || cancel) && disabled}
      onClick={loading ? null : onClick}>
      {
        loading ? (
          <div className={styles.progress__container}>
            <div className={styles.progress__text}>
              { children }
            </div>
            <CircularProgress
              className={classNames({[styles.secondary__progress]: secondary})}
              size={18}
              thickness={6}
            />
          </div>
        ) : children
      }
    </Button>
  );
};

export default AppButton;
