import { Card, Dialog, Divider, Input } from '@material-ui/core';
import { React, useState } from 'react';

import AppButton from './AppButton';
import classNames from 'classnames';
import styles from '../styles/SuggestionDialog.module.css';

const SuggestionDialog = (props) => {
  const { open, value, error, onSubmit, handleClose, isLoading, onChangeText } = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Dialog
      aria-labelledby='snack-suggestion-dialog'
      open={open}
      onClose={handleClose}
      onSubmit={onSubmit}
    >
      <Card variant='outlined' className={styles.card}>
        <div className={styles.header}>
          <h4 className={styles.header__text}>Suggest a snack</h4>
        </div>
        <p className={styles.label}>What would you like to snack on next?</p>
        <div className={styles.input__container}>
          <Input
            autoFocus
            className={classNames({
              [styles.input__base]: true,
              [styles.input__focused]: isFocused,
              [styles.input__error]: error
            })}
            disableUnderline={true}
            placeholder='One potato, two potato'
            onChange={onChangeText}
            onKeyPress={onSubmit}
            onBlur={() => setIsFocused(false)}
            onFocus={() => setIsFocused(true)}
          />
          <p className={styles.error__message}>{error}</p>
        </div>
        <Divider />
        <div className={styles.button__container}>
          <AppButton
            primary
            loading={isLoading}
            disabled={!value.trim() || error}
            onClick={onSubmit}
          >
            Send
          </AppButton>
        </div>
      </Card>
    </Dialog>
  );
};

export default SuggestionDialog;
