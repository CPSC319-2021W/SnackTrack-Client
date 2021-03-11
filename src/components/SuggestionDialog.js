import { Button, Card, Dialog, Divider, Input } from '@material-ui/core';
import { React, useState } from 'react';

import classNames from 'classnames';
import styles from '../styles/SuggestionDialog.module.css';

const SuggestionDialog = (props) => {
  const { open, value, onSubmit, handleClose, onChangeText } = props;
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
        <Input
          autoFocus
          className={classNames({
            [styles.input__base]: true,
            [styles.input__focused]: isFocused
          })}
          disableUnderline={true}
          onChange={onChangeText}
          onKeyPress={onSubmit}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
        />
        <Divider />
        <Button disabled={!value.trim()} className={styles.button} onClick={onSubmit}>
          Send
        </Button>
      </Card>
    </Dialog>
  );
};

export default SuggestionDialog;
