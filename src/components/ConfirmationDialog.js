import { Card, Dialog, Divider } from '@material-ui/core';
import { React } from 'react';

import AppButton from './AppButton';
import styles from '../styles/Dialog.module.css';

const ConfirmationDialog = (props) => {
  const {
    open,
    title,
    onSubmit,
    submitText,
    isSubmitLoading,
    onDecline,
    declineText,
    isDeclineLoading,
    children,
    handleClose
  } = props;

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
                loading={isDeclineLoading}
                onClick={onDecline}
              >
                { declineText }
              </AppButton>
            ) : null
          }
          <AppButton
            primary
            loading={isSubmitLoading}
            onClick={onSubmit}
          >
            { submitText }
          </AppButton>
        </div>
      </Card>
    </Dialog>
  );
};

export default ConfirmationDialog;
