import { Card, Dialog, Divider, Input } from '@material-ui/core';
import { React, useEffect, useState } from 'react';
import { cancelOrder, editOrder } from '../services/TransactionsService';
import {
  setApiResponse,
  setToastNotificationOpen
} from '../redux/features/notifications/notificationsSlice';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from './AppButton';
import NumberFormat from 'react-number-format';
import { DateTime as dt } from 'luxon';
import editOrderStyles from '../styles/EditOrderDialog.module.css';
import { setBalance } from '../redux/features/users/usersSlice';
import { setIsEditOrderOpen } from '../redux/features/transactions/transactionsSlice';
import styles from '../styles/Dialog.module.css';

const EditOrderDialog = (props) => {
  const dispatch = useDispatch();
  const { transaction, open, onCancel } = props;
  const {
    transaction_id,
    snack_name,
    transaction_amount,
    quantity,
    transaction_dtm
  } = transaction;
  const unitPrice = transaction_amount / quantity;
  const [newTotal, setNewTotal] = useState(transaction_amount);
  const { balance } = useSelector((state) => state.usersReducer.profile);

  const [newQuantity, setNewQuantity] = useState(quantity);
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isCancelLoading, setIsCancelLoading] = useState(false);

  const updateBalance = (balance) => {
    dispatch(setBalance(balance));
  };

  const closeDialog = () => dispatch(setIsEditOrderOpen(false));

  const openToastNotification = (bool) => dispatch(setToastNotificationOpen(bool));

  const onApiResponse = (response) => dispatch(setApiResponse(response));

  const formatPrice = (amount) => {
    amount = amount / 100;
    return `$${amount.toFixed(2)}`;
  };

  const onChangeQuantity = (event) => {
    setNewQuantity(event.target.value);
  };

  const onCancelOrder = async (event) => {
    if (event.type === 'click') {
      setIsCancelLoading(true);
      try {
        await cancelOrder(transaction_id);
        onApiResponse('CANCEL_SUCCESS');
        openToastNotification(true);
        updateBalance(balance - transaction_amount);
      } catch (err) {
        console.log(err);
        onApiResponse('ERROR');
        openToastNotification(true);
      }
      setIsCancelLoading(false);
      closeDialog();
    }
  };

  const onSubmit = async (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      setIsSaveLoading(true);
      try {
        await editOrder(transaction_id, parseInt(newQuantity), parseInt(newTotal));
        onApiResponse('CHANGES_SUCCESS');
        openToastNotification(true);
        // TODO: Uncomment when PUT /orders is implemented
        // updateBalance(balance - (transaction_amount - newTotal));
      } catch (err) {
        console.log(err);
        onApiResponse('ERROR');
        openToastNotification(true);
      }
      setIsSaveLoading(false);
      closeDialog();
    }
  };

  useEffect(() => {
    if (open) {
      setNewQuantity(quantity);
    }
  }, [open]);

  useEffect(() => {
    setNewTotal(newQuantity * unitPrice);
  }, [newQuantity]);

  return (
    <Dialog
      aria-labelledby='edit-order-dialog'
      open={open}
      onClose={closeDialog}
      onSubmit={onSubmit}
      onCancel={onCancel}
    >
      <Card variant='outlined' className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.headerTitle}>{snack_name}</h3>
          <p className={styles.headerPrice}>
            <NumberFormat
              value={unitPrice / 100}
              displayType='text'
              decimalScale={2}
              fixedDecimalScale={true}
              prefix='$'
            />
          </p>
        </div>
        <Divider />
        <div className={styles.body}>
          <div className={styles.labelContainer}>
            <p className={styles.label}>Order Date</p>
            <p className={styles.quantity}>
              {dt.fromISO(transaction_dtm).toLocaleString(dt.DATE_SHORT)}
            </p>
          </div>
          <div className={styles.labelContainer}>
            <p className={styles.label}>Previous Quantity</p>
            <p className={styles.quantity}>{quantity}</p>
          </div>
          <div className={styles.labelContainer}>
            <p className={styles.label}>New Quantity</p>
            <Input
              className={`${styles.input} ${styles.input__small}`}
              disableUnderline={true}
              value={newQuantity}
              type='number'
              onChange={onChangeQuantity}
              onKeyPress={onSubmit}
            />
          </div>
          <div className={styles.labelContainer}>
            <p className={styles.label}>New Total</p>
            <p className={editOrderStyles.newTotal}>{formatPrice(newTotal)}</p>
          </div>
        </div>
        <Divider />
        <div className={styles.twoButton__footer}>
          <AppButton
            secondary
            loading={isCancelLoading}
            disabled={isSaveLoading}
            onClick={onCancelOrder}
          >
            Cancel Order
          </AppButton>
          <AppButton
            primary
            loading={isSaveLoading}
            disabled={isCancelLoading}
            onClick={onSubmit}
          >
            Save
          </AppButton>
        </div>
      </Card>
    </Dialog>
  );
};

export default EditOrderDialog;
