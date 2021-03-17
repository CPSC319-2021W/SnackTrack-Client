import * as Yup from 'yup';

import { Dialog, Divider, Tooltip } from '@material-ui/core';
import { Form, FormikProvider, useFormik } from 'formik';
import { React, useEffect, useState } from 'react';
import {
  setIsAddSnackOpen,
  setSnackImageUploadData
} from '../redux/features/snacks/snacksSlice';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from './AppButton';
import CategorySelect from './ManageSnack/CategorySelect';
import DatePickerField from './DatePickerField';
import { DateTime } from 'luxon';
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';
import { FIELD_ERROR_MESSAGES } from '../constants';
import ImageUploader from './ImageUploader';
import InputLiveFeedback from './ManageSnack/InputLiveFeedback';
import TextAreaField from './TextAreaField';
import { addSnack } from '../services/SnacksService';
import dialogStyles from '../styles/Dialog.module.css';
import { saveImage } from '../services/ImagesService';
import styles from '../styles/ManageSnack.module.css';

const today = DateTime.now().set({ hour: 0, minute: 0 });

const initialState = {
  snackname: '',
  description: '',
  price: '',
  quantity: '',
  reorder: '',
  expiration: ''
};

const AddSnackDialog = (props) => {
  const dispatch = useDispatch();
  const { open } = props;
  const [category, setCategory] = useState('');
  const [expiryDate, setExpiryDate] = useState(null);
  const [dateError, setDateError] = useState('');
  const [isBatchDetailsOpen, setIsBatchDetailsOpen] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const { username } = useSelector((state) => state.usersReducer.profile);
  const { isAddSnackOpen, snackImageUploadData } = useSelector(
    (state) => state.snacksReducer
  );

  const handleCategorySet = (options) => {
    setCategory(options.value);
  };

  const deleteBatchDetails = () => {
    setIsBatchDetailsOpen(false);
    addForm.setFieldValue('quantity', '');
    addForm.setFieldValue('expiration', '');
  };

  const closeDialog = () => {
    dispatch(setIsAddSnackOpen(false));
  };

  const handleChangeDate = (date) => {
    if (date && date.invalid) {
      setDateError('Invalid date format.');
    } else if (date && date < today) {
      setDateError('Expiry must be after today.');
    } else {
      setDateError('');
      setExpiryDate(date);
    }
  };

  useEffect(() => {
    setCategory('');
    setExpiryDate(null);
    addForm.resetForm();
    setIsBatchDetailsOpen(false);
    dispatch(setSnackImageUploadData(null));
  }, [isAddSnackOpen]);

  const addForm = useFormik({
    initialValues: initialState,
    onSubmit: async (values, actions) => {
      setIsSubmitLoading(true);
      const imageResponse = await saveImage(snackImageUploadData);
      const snackRequest = {
        last_updated_by: username,
        snack_name: values.snackname,
        snack_type_id: parseInt(category),
        description: values.description,
        image_uri: imageResponse.url,
        price: parseInt(values.price) * 100,
        quantity: values.quantity === '' ? 0 : values.quantity,
        order_threshold: values.reorder === '' ? null : values.reorder,
        expiration_dtm: expiryDate ? expiryDate.toUTC().toISO() : null
      };
      const snack = await addSnack(snackRequest);
      actions.resetForm({ values: initialState });
      console.log(snack);
      setIsSubmitLoading(false);
      closeDialog();
    },
    validationSchema: Yup.object({
      snackname: Yup.string()
        .min(1, 'Must be at least 1 characters')
        .max(128, 'Must be less than 128 characters')
        .required(FIELD_ERROR_MESSAGES.EMPTY),

      description: Yup.string()
        .min(1, 'Must be at least 1 characters')
        .max(128, 'Must be less than 128 characters'),

      price: Yup.string()
        .min(0, 'Must be at least $0')
        .max(6, 'Must be less than 6 digits')
        .required(FIELD_ERROR_MESSAGES.EMPTY)
        .matches(/^\d*[.]?\d*$/, FIELD_ERROR_MESSAGES.NAN),

      quantity: Yup.string()
        .min(0, 'Must be at least $0')
        .max(6, 'Must be less than 6 digits')
        .matches(/^[0-9]*$/, FIELD_ERROR_MESSAGES.NAN),

      reorder: Yup.string()
        .min(0, 'Must be at least $0')
        .max(6, 'Must be less than 6 digits')
        .matches(/^[0-9]*$/, FIELD_ERROR_MESSAGES.NAN)
    })
  });

  return (
    <Dialog
      aria-labelledby='snack-manage-dialog'
      open={open}
      onClose={closeDialog}
      onCancel={closeDialog}
    >
      <div className={styles.form}>
        <FormikProvider variant='outlined' value={addForm}>
          <Form>
            <div className={dialogStyles.header}>
              <div className={styles.title}>Add New Snack</div>
            </div>
            <Divider />
            <div className={styles.container}>
              <div className={styles.frame__image}>
                <ImageUploader />
              </div>
              <div className={styles.frame__column}>
                <div className={styles.frame__row}>
                  <InputLiveFeedback
                    label='Snack name'
                    id='snackname'
                    name='snackname'
                    type='text'
                  />
                  <CategorySelect
                    label='Category'
                    handleSelectCategory={handleCategorySet}
                  />
                </div>
                <div className={styles.textarea_container}>
                  <TextAreaField
                    label='Description'
                    id='description'
                    name='description'
                  />
                </div>
                <div className={styles.frame__row}>
                  <InputLiveFeedback
                    label='Price ($)'
                    id='price'
                    name='price'
                    type='text'
                  />
                  <InputLiveFeedback
                    label='Re-order point'
                    id='reorder'
                    name='reorder'
                    type='text'
                  />
                </div>
                <div>
                  {isBatchDetailsOpen ? (
                    <>
                      <Divider className={styles.divide} />
                      <div className={styles.frame__row}>
                        <InputLiveFeedback
                          small
                          label='Quantity'
                          id='quantity'
                          name='quantity'
                          type='text'
                        />
                        <DatePickerField
                          label='Expiration Date'
                          id='expiration'
                          error={dateError}
                          date={expiryDate}
                          onChangeDate={handleChangeDate}
                        />
                        <Tooltip title='Remove'>
                          <button
                            className={styles.deleteIcon__container}
                            onClick={deleteBatchDetails}
                          >
                            <DeleteIcon className={styles.deleteIcon} />
                          </button>
                        </Tooltip>
                      </div>
                    </>
                  ) : (
                    <AppButton
                      secondary
                      fullWidth
                      onClick={() => setIsBatchDetailsOpen(true)}
                    >
                      Add First Batch
                    </AppButton>
                  )}
                </div>
              </div>
            </div>
            <Divider />
            <div className={dialogStyles.oneButton__footer}>
              <AppButton
                primary
                type='submit'
                loading={isSubmitLoading}
                disabled={!addForm.isValid || !category || !snackImageUploadData}
                onClick={addForm.handleSubmit}
              >
                Submit
              </AppButton>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </Dialog>
  );
};

export default AddSnackDialog;
