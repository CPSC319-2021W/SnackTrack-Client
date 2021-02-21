import { Button, Card, Dialog, Divider, Input } from '@material-ui/core';

import React from 'react';
import styles from '../styles/SuggestionDialog.module.css';

const SnackCard = (props) => {
  const { open, onSubmit, handleClose, onChangeText } = props;

  return (
    <Dialog
      aria-labelledby='snack-suggestion-dialog'
      open={open}
      onClose={handleClose}
      onSubmit={onSubmit}
    >
      <Card variant='outlined' className={styles.card}>
        <h4 className={styles.header}>Suggest a snack</h4>
        <Divider />
        <p className={styles.label}>What would you like to snack on next?</p>
        <Input
          className={styles.input}
          disableUnderline={true}
          onChange={onChangeText}
          onKeyPress={onSubmit}
        ></Input>
        <Divider />
        <Button className={styles.button} onClick={onSubmit}>
          Send
        </Button>
      </Card>
    </Dialog>
  );
};

export default SnackCard;
