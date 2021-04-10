import { Card, Dialog, Divider } from '@material-ui/core';
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

import AppButton from './AppButton';
import DatePickerField from './DatePickerField';
import { DateTime } from 'luxon';
import InputField from './InputField';
import classNames from 'classnames';
import styles from '../styles/Dialog.module.css';
import { useDispatch } from 'react-redux';

const ManageBatchDialog = (props) => {
  const dispatch = useDispatch();
  const { newSnackBatch, batch, open, onDeleteBatch, onAddBatchOrEdit, onCancel } = props;
  const { snack_id, snack_batch_id, snack_name } = batch;

  const today = DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

  const [oldQuantity, setOldQuantity] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [date, setDate] = useState(today);
  const [errors, setErrors] = useState({
    quantity: null,
    date: null
  });
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

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

  const handleSubmit = async (event, func, apiResponse) => {
    if (event.key === 'Enter' || event.type === 'click') {
      setIsSubmitLoading(true);
      try {
        const dateString = date ? date.toUTC().toISO() : null;
        const newBatch = await func({
          snack_id,
          snack_batch_id,
          quantity,
          expiration_dtm: dateString
        });
        onApiResponse(apiResponse);
        openToastNotification(true);
        onAddBatchOrEdit(newBatch, oldQuantity);
      } catch (err) {
        console.log(err);
        onApiResponse('ERROR');
        openToastNotification(true);
      }
      setIsSubmitLoading(false);
      closeDialog(); 
    }
  };

  const deleteSnackBatch = async () => {
    setIsDeleteLoading(true);
    try {
      await deleteBatch(snack_batch_id);
      onApiResponse('BATCH_DELETE_SUCCESS');
      openToastNotification(true);
      onDeleteBatch({ snack_id, snack_batch_id, quantity });
    } catch (err) {
      console.log(err);
      onApiResponse('ERROR');
      openToastNotification(true);
    }
    setIsDeleteLoading(false);
    closeDialog();
  };

  useEffect(() => {
    if (newSnackBatch) {
      setDate(today);
      setQuantity(0);
    } else {
      if (batch.expiration_dtm) {
        setDate(DateTime.fromISO(batch.expiration_dtm));
      } else {
        setDate(null);
      }
      setQuantity(batch.quantity);
      setOldQuantity(batch.quantity);
    }
  }, [batch]);

  return (
    <Dialog
      aria-labelledby='edit-order-dialog'
      open={open}
      onClose={closeDialog}
      onSubmit={
        newSnackBatch
          ? (event) => {
            handleSubmit(event, addBatch, 'BATCH_SUCCESS');
          }
          : (event) => {
            handleSubmit(event, editBatch, 'CHANGES_SUCCESS');
          }
      }
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
              fullWidth
              label='Quantity'
              value={quantity}
              error={errors.quantity ? errors.quantity : null}
              onChange={handleChangeQuantity}
              onKeyPress={
                newSnackBatch
                  ? (event) => {
                    handleSubmit(event, addBatch, 'BATCH_SUCCESS');
                  }
                  : (event) => {
                    handleSubmit(event, editBatch, 'CHANGES_SUCCESS');
                  }
              }
            />
          </div>
          <div className={styles.labelContainer}>
            <DatePickerField
              fullWidth
              label='Expiration Date'
              date={date}
              error={errors.date}
              onChangeDate={handleChangeDate}
              onKeyPress={
                newSnackBatch
                  ? (event) => {
                    handleSubmit(event, addBatch, 'BATCH_SUCCESS');
                  }
                  : (event) => {
                    handleSubmit(event, editBatch, 'CHANGES_SUCCESS');
                  }
              }
            />
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
            <AppButton
              cancel
              disabled={isSubmitLoading}
              loading={isDeleteLoading}
              onClick={deleteSnackBatch}
            >
              Delete Batch
            </AppButton>
          )}
          <AppButton
            primary
            disabled={checkForErrors || isDeleteLoading}
            loading={isSubmitLoading}
            onClick={
              newSnackBatch
                ? (event) => {
                  handleSubmit(event, addBatch, 'BATCH_SUCCESS');
                }
                : (event) => {
                  handleSubmit(event, editBatch, 'CHANGES_SUCCESS');
                }
            }
          >
            { newSnackBatch ? 'Submit' : 'Save' }
          </AppButton>
        </div>
      </Card>
    </Dialog>
  );
};

export default ManageBatchDialog;
