import { Button, Card, Dialog, Divider, Input } from '@material-ui/core';

import NumberFormat from 'react-number-format';
import React from 'react';
import styles from '../styles/OrderSnackDialog.module.css';
import { useSelector } from 'react-redux';

const OrderSnackDialog = (props) => {
  const { open, onSubmit, handleClose, onChangeQuantity } = props;
  const { selectedSnack } = useSelector(state => state.snacksReducer);
  const { snack_name, description, image_uri, price } = selectedSnack;
  
  return (
    <Dialog
      aria-labelledby='snack-order-dialog'
      open={open}
      onClose={handleClose}
      onSubmit={onSubmit}
    >    
      <Card variant='outlined' className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.headerTitle}>{snack_name}</h3>
          <p className={styles.headerPrice}>
            <NumberFormat
              value={price / 100}
              displayType={'text'}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={'$'}
            />
          </p>
        </div>
        <Divider />
        <div className={styles.body}>
          <div className={styles.bodyImg}>
            <img src={image_uri} alt={snack_name} width='150' height='150' />
          </div>
          <div className={styles.bodyDecription}>
            <p className={styles.description}>{description}</p>
            <p className={styles.quantity}>Quantity</p>
            <Input
              className={styles.input}
              disableUnderline={true}
              defaultValue={1}
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