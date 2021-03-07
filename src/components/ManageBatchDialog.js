import { React, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  setApiResponse,
  setToastNotificationOpen
} from '../redux/features/notifications/notificationsSlice';
import { setIsManageBatchOpen, setSelectedBatch } from '../redux/features/snacks/snacksSlice';
import { addBatch } from '../services/SnacksService';

import { Button, Card, Dialog, Divider } from '@material-ui/core';
import DatePickerInput from './DatePickerInput';
import InputField from './InputField';

import styles from '../styles/Dialog.module.css';

const ManageBatchDialog = (props) => {
  const dispatch = useDispatch();
  const { batch, open, onCancel } = props;
  const { snack_id, snack_name } = batch;

  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState(new Date());
  const [errors, setErrors] = useState({
    quantity: null,
    date: null
  });

  const closeDialog = () => {
    setQuantity('');
    setErrors({
      quantity: null,
      date: null
    });
    dispatch(setSelectedBatch({ snack_id: null, snack_name: null }));
    dispatch(setIsManageBatchOpen(false));
  };

  const openToastNotification = (bool) => dispatch(setToastNotificationOpen(bool));

  const onApiResponse = (response) => dispatch(setApiResponse(response));

  const handleChangeQuantity = (event) => {
    let input = Number(event.target.value);
    if (!quantity && isNaN(input)) {
      setErrors((prevState) => ({...prevState, quantity: 'Oops - gotta be a number!'}));
    } else if (quantity && isNaN(input)) {
      setErrors((prevState) => ({...prevState, quantity: null}));
    } else {
      setQuantity(Number(input));
      setErrors((prevState) => ({...prevState, quantity: null}));
    }
  };

  const handleChangeDate = (date) => {
    if (!date || date.invalid) {
      setErrors((prevState) => ({...prevState, date: 'Invalid date format.'}));
    } else {
      setErrors((prevState) => ({...prevState, date: null}));
      setDate(date);
    }
  };

  const checkForErrors = (!!errors.quantity || !!errors.date || !quantity);

  const onSubmit = async (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      try {
        await addBatch({ snack_id, quantity, expiration_dtm: date });
        onApiResponse('BATCH_SUCCESS');
        openToastNotification(true);
      } catch (err) {
        onApiResponse('ERROR');
        openToastNotification(true);
      }
      closeDialog();
    }
  };

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
          <div className={styles.header__text}>
            <h3 className={styles.header__sub}>Add new batch of ...</h3>
            <h4 className={styles.headerTitle}>{ snack_name }</h4>
          </div>
        </div>
        <Divider />
        <div className={styles.body}>
          <div className={styles.labelContainer}>
            <InputField
              small
              label='Quantity'
              value={quantity}
              error={errors.quantity ? errors.quantity : null}
              onChange={handleChangeQuantity}
            />
          </div>
          <div className={styles.labelContainer}>
            <div>
              <DatePickerInput
                label='Expiry Date'
                date={date}
                error={errors.date ? errors.date : null}
                onChangeDate={handleChangeDate}
              />
            </div>
          </div>
        </div>
        <Divider />
        <div className={styles.oneButton__footer}>
          <Button
            disabled={checkForErrors}
            className={styles.button}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </Card>
    </Dialog>
  );
};

export default ManageBatchDialog;
