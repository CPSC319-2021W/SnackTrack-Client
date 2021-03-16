import { Card, Dialog, Divider } from '@material-ui/core';
import { React } from 'react';

import AppButton from '../components/AppButton';
import styles from '../styles/Dialog.module.css';

const TextDialog = (props) => {
  const { open, title, onSubmit, submitText, onDecline, declineText, children, handleClose } = props;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onSubmit={onSubmit}
    >
      <Card variant='outlined' className={styles.card}>
        <div className={styles.header}>
          <h5 className={styles.text__title}>{ title }</h5>
        </div>
        <p className={styles.text__body}>{ children }</p>
        <Divider />
        <div className={onSubmit && onDecline ? styles.twoButton__footer : styles.oneButton__footer}>
          {
            onDecline ? (
              <AppButton
                secondary
                onClick={onDecline}
              >
                { declineText }
              </AppButton>
            ) : null
          }
          <AppButton
            primary
            onClick={onSubmit}
          >
            { submitText }
          </AppButton>
        </div>
      </Card>
    </Dialog>
  );
};

export default TextDialog;
