import { Button, Card, Dialog, Divider, Input } from '@material-ui/core';

import React from 'react';
import styles from '../styles/OrderSnackDialog.module.css';

const OrderSnackDialog = (props) => {
  const { open, onSubmit, handleClose, onChangeQuantity } = props;

  return (
    <Dialog
      aria-labelledby='snack-order-dialog'
      open={open}
      onClose={handleClose}
      onSubmit={onSubmit}
    >
      <Card variant='outlined' className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.headerTitle}>KitKat</h3>
          <h3 className={styles.headerPrice}>$1.25</h3>
        </div>
        <Divider />
        <div className={styles.body}>
          <div className={styles.bodyImg}>
            <img src='https://cdn.shopify.com/s/files/1/1969/5775/products/nestle-kit-kat-wasabi-flavor-tamaruya-honten-mini-12-bars-japanese-taste-2_2048x.jpg?v=1608561877' alt='Kitkat' width='150' height='150' />
          </div>
          <div className={styles.bodyDecription}>
            <p className={styles.label}>banana</p>
            <p className={styles.label}>Quantity</p>
            <Input
              className={styles.input}
              disableUnderline={true}
              onChange={onChangeQuantity}
              onKeyPress={onSubmit}
            />
          </div>
        </div>
        <Divider />
        <Button className={styles.button} onClick={onSubmit}>
          Confirm
        </Button>
      </Card>
    </Dialog>
  );
};

export default OrderSnackDialog;