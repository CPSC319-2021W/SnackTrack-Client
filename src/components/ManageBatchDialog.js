import { Button, Card, Dialog, Divider } from '@material-ui/core';
import { React, useEffect, useState } from 'react';
import { addBatch, deleteBatch, editBatch } from '../services/SnacksService';
import {
  setApiResponse,
  setToastNotificationOpen
} from '../redux/features/notifications/notificationsSlice';
import {
  setIsAddBatchOpen,
  setIsEditBatchOpen,
  setSelectedBatch
} from '../redux/features/snacks/snacksSlice';

import DatePickerInput from './DatePickerInput';
import { DateTime } from 'luxon';
import InputField from './InputField';
import classNames from 'classnames';
import styles from '../styles/Dialog.module.css';
import { useDispatch } from 'react-redux';

const ManageBatchDialog = (props) => {
  const dispatch = useDispatch();
  const { newSnackBatch, batch, open, onAddBatch, onCancel } = props;
  const { snack_id, snack_batch_id, snack_name } = batch;

  const today = DateTime.now().set({ hour: 0, minute: 0 });

  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState(today);
  const [errors, setErrors] = useState({
    quantity: null,
    date: null
  });

  const checkForErrors = !!errors.quantity || !!errors.date || !quantity;

  const closeDialog = () => {
    setErrors({
      quantity: null,
      date: null
    });
    dispatch(setSelectedBatch({ snack_id: null, snack_name: null }));
    dispatch(setIsAddBatchOpen(false));
    dispatch(setIsEditBatchOpen(false));
  };

  const openToastNotification = (bool) => dispatch(setToastNotificationOpen(bool));

  const onApiResponse = (response) => dispatch(setApiResponse(response));

  const handleChangeQuantity = (event) => {
    let input = Number(event.target.value);
    if (!isNaN(input)) {
      if (input >= 0) {
        setQuantity(input);
        setErrors((prevState) => ({ ...prevState, quantity: null }));
      }
    } else if (!quantity && isNaN(input)) {
      setErrors((prevState) => ({ ...prevState, quantity: 'Oops - gotta be a number!' }));
    }
  };

  const handleChangeDate = (date) => {
    if (date && date.invalid) {
      setErrors((prevState) => ({ ...prevState, date: 'Invalid date format.' }));
    } else if (date && date < today) {
      setErrors((prevState) => ({ ...prevState, date: 'Expiry must be after today.' }));
    } else {
      setErrors((prevState) => ({ ...prevState, date: null }));
      setDate(date);
    }
  };

  const onSubmit = async (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      try {
        const dateString = date ? date.toUTC().toISO() : null;
        const batch = await addBatch({ snack_id, quantity, expiration_dtm: dateString });
        onApiResponse('BATCH_SUCCESS');
        openToastNotification(true);
        onAddBatch(batch);
      } catch (err) {
        onApiResponse('ERROR');
        openToastNotification(true);
      }
      closeDialog();
    }
  };

  const editSnackBatch = async (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      try {
        const dateString = date ? date.toUTC().toISO() : null;
        await editBatch({ snack_batch_id, quantity, expiration_dtm: dateString });
        onApiResponse('BATCH_SUCCESS');
        openToastNotification(true);
      } catch (err) {
        onApiResponse('ERROR');
        openToastNotification(true);
      }
    }
  };

  const deleteSnackBatch = async () => {
    try {
      await deleteBatch(snack_batch_id);
      onApiResponse('BATCH_SUCCESS');
      openToastNotification(true);
    } catch (err) {
      onApiResponse('ERROR');
      openToastNotification(true);
    }
  };

  useEffect(() => {
    if (newSnackBatch) {
      setQuantity(0);
    } else {
      if (batch.expiration_dtm) {
        setDate(DateTime.fromISO(batch.expiration_dtm));
      } else {
        setDate(null);
      }
      setQuantity(batch.quantity);
    }
  }, [batch]);

  return (
    <Dialog
      aria-labelledby='edit-order-dialog'
      open={open}
      onClose={closeDialog}
      onSubmit={newSnackBatch ? onSubmit : editSnackBatch}
      onCancel={onCancel}
    >
      <Card
        variant='outlined'
        className={classNames({
          [styles.card]: true,
          [styles.card__small]: true
        })}
      >
        <div className={styles.header}>
          <div className={styles.header__text}>
            <h3 className={styles.header__sub}>
              {newSnackBatch ? 'Add new batch of ...' : 'Editing a batch of ...'}
            </h3>
            <h4 className={styles.headerTitle}>{snack_name}</h4>
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
        <div
          className={classNames({
            [styles.oneButton__footer]: newSnackBatch,
            [styles.twoButton__footer]: !newSnackBatch
          })}
        >
          {newSnackBatch ? null : (
            <Button
              className={classNames({
                [styles.button__light]: true,
                [styles.button__wide]: true
              })}
              onClick={deleteSnackBatch}
            >
              Delete Batch
            </Button>
          )}
          <Button
            disabled={checkForErrors}
            className={classNames({
              [styles.button]: true,
              [styles.button__wide]: !newSnackBatch
            })}
            onClick={newSnackBatch ? onSubmit : editSnackBatch}
          >
            {newSnackBatch ? 'Submit' : 'Save Changes'}
          </Button>
        </div>
      </Card>
    </Dialog>
  );
};

export default ManageBatchDialog;
