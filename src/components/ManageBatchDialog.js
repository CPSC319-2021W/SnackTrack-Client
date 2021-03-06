import { React, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  setApiResponse,
  setToastNotificationOpen
} from '../redux/features/notifications/notificationsSlice';
import { setIsManageBatchOpen, setSelectedBatch } from '../redux/features/snacks/snacksSlice';
import { addBatch } from '../services/SnacksService';

import { Button, Card, Dialog, Divider } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import InputField from './InputField';

import styles from '../styles/Dialog.module.css';

const ManageBatchDialog = (props) => {
  const dispatch = useDispatch();
  const { batch, open, onCancel } = props;
  const { snack_id, snack_name } = batch;

  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState(new Date());
  //   const [error, setError] = useState(null);
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
    //   setError('Oops - gotta be a number!');
      setErrors((prevState) => ({...prevState, quantity: 'Oops - gotta be a number!'}));
    } else if (quantity && isNaN(input)) {
      setErrors((prevState) => ({...prevState, quantity: null}));
    //   setError(null);
    } else {
      setQuantity(Number(input));
      setErrors((prevState) => ({...prevState, quantity: null}));
    //   setError(null);
    }
  };

  const handleChangeDate = (date) => {
    console.log(date);
    setDate(date);
  };

  const handleDateError = (error) => {
    console.log(error);
    setErrors((prevState) => ({...prevState, date: date}));
  };

  const onSubmit = async (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      try {
        await addBatch({ snack_id, quantity, expiry_dtm: date });
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
          <h3 className={styles.headerTitle}>Add Snack Batch</h3>
        </div>
        <Divider />
        <div className={styles.body}>
          <div className={styles.labelContainer}>
            <p className={styles.snackTitle}>{ snack_name }</p>
          </div>
          <div className={styles.labelContainer}>
            <p className={styles.label}>Quantity</p>
            <InputField
              isNumber
              value={quantity}
              error={errors.quantity ? errors.quantity : null}
              onChange={handleChangeQuantity}
            />
          </div>
          <div className={styles.labelContainer}>
            <p className={styles.label}>Expiry Date</p>
            <div>
              <KeyboardDatePicker
                autoOk
                disablePast
                disableToolbar
                variant='inline'
                inputVariant='outlined'
                format='MM/dd/yyyy'
                InputAdornmentProps={{ position: 'start' }}
                helperText={errors.date ? 'Invalid date format' : null}
                value={date}
                onChange={handleChangeDate}
                onError={handleDateError}
              />
            </div>
          </div>
        </div>
        <Divider />
        <div className={styles.oneButton__footer}>
          <Button className={styles.button} onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </Card>
    </Dialog>
  );
};

export default ManageBatchDialog;
