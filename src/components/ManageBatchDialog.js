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

import { DateTime } from 'luxon';
import classNames from 'classnames';

import styles from '../styles/Dialog.module.css';

const ManageBatchDialog = (props) => {
  const dispatch = useDispatch();
  const { batch, open, onCancel } = props;
  const { snack_id, snack_name } = batch;

  const today = DateTime.now().set({ hour: 0, minute: 0 });

  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState(today);
  const [errors, setErrors] = useState({
    quantity: null,
    date: null
  });

  const checkForErrors = (!!errors.quantity || !!errors.date || !quantity);

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
    if (!isNaN(input)) {
      if (input >= 0) {
        setQuantity(input);
        setErrors((prevState) => ({...prevState, quantity: null}));
      }
    } else if (!quantity && isNaN(input)) {
      setErrors((prevState) => ({...prevState, quantity: 'Oops - gotta be a number!'}));
    }
  };

  const handleChangeDate = (date) => {
    if (date && date.invalid) {
      setErrors((prevState) => ({...prevState, date: 'Invalid date format.'}));
    } else if (date && date < today) {
      setErrors((prevState) => ({...prevState, date: 'Expiry must be after today.'}));
    } else {
      setErrors((prevState) => ({...prevState, date: null}));
      setDate(date);
    }
  };

  const onSubmit = async (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      try {
        const dateString = date ? date.toUTC().toISO() : null;
        await addBatch({ snack_id, quantity, expiration_dtm: dateString });
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
      <Card variant='outlined' className={classNames({
        [styles.card]: true,
        [styles.card__small]: true
      })}>
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
                error={errors.date}
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
