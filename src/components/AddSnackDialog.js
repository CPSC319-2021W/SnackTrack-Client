import * as Yup from 'yup';

import { Dialog, Divider } from '@material-ui/core';
import { Form, FormikProvider, useFormik } from 'formik';
import { React, useEffect, useState } from 'react';
import {
  setIsAddSnackOpen,
  setSnackImageUploadData
} from '../redux/features/snacks/snacksSlice';
import { useDispatch, useSelector } from 'react-redux';

import { FIELD_ERROR_MESSAGES, INFO_LABELS } from '../constants';
import AppButton from './AppButton';
import CategorySelect from './ManageSnack/CategorySelect';
import DatePickerField from './DatePickerField';
import { DateTime } from 'luxon';
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';
import ImageUploader from './ImageUploader';
import InputLiveFeedback from './ManageSnack/InputLiveFeedback';
import TextAreaField from './TextAreaField';
import { addSnack } from '../services/SnacksService';
import dialogStyles from '../styles/Dialog.module.css';
import { saveImage } from '../services/ImagesService';
import styles from '../styles/ManageSnack.module.css';

const today = DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

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
  const { open, onAddSnack, onHandleApiResponse } = props;
  const [category, setCategory] = useState('');
  const [expiryDate, setExpiryDate] = useState(null);
  const [dateError, setDateError] = useState('');
  const [isBatchDetailsOpen, setIsBatchDetailsOpen] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const { emailAddress } = useSelector((state) => state.usersReducer.profile);
  const { isAddSnackOpen, snackImageUploadData } = useSelector(
    (state) => state.snacksReducer
  );

  const handleUpdateDescription = (event) => {
    const { value } = event.target;
    addForm.setFieldValue('description', value);
  };

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
      setDateError(FIELD_ERROR_MESSAGES.DATE_FORMAT);
    } else if (date && date < today) {
      setDateError(FIELD_ERROR_MESSAGES.DATE_RANGE);
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
  }, [isAddSnackOpen]);

  const addForm = useFormik({
    initialValues: initialState,
    onSubmit: async (values, actions) => {
      setIsSubmitLoading(true);
      let imageResponse = '';
      if (snackImageUploadData) {
        const { url } = await saveImage(snackImageUploadData);
        imageResponse = url;
      }
      const snackRequest = {
        last_updated_by: emailAddress,
        snack_name: values.snackname,
        snack_type_id: parseInt(category),
        description: values.description,
        image_uri: imageResponse,
        price: Number(values.price) * 100,
        quantity: values.quantity === '' ? 0 : parseInt(values.quantity),
        order_threshold: values.reorder === '' ? null : values.reorder,
        expiration_dtm: expiryDate ? expiryDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 }).toUTC().toISO() : null
      };
      try {
        const snack = await addSnack(snackRequest);
        onAddSnack(snack);
        onHandleApiResponse('SNACK_SUCCESS');
      } catch (err) {
        console.log('err', err);
        onHandleApiResponse('ERROR');
      }
      actions.resetForm({ values: initialState });
      dispatch(setSnackImageUploadData(null));
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
        .max(6, FIELD_ERROR_MESSAGES.OVER_SIX)
        .required(FIELD_ERROR_MESSAGES.EMPTY)
        .matches(/^\d*(\.\d{1,2})?$/, FIELD_ERROR_MESSAGES.PRICE),

      quantity: Yup.number()
        .typeError(FIELD_ERROR_MESSAGES.NAN)
        .integer(FIELD_ERROR_MESSAGES.NAI)
        .min(1, FIELD_ERROR_MESSAGES.UNDER_ONE)
        .max(999999, FIELD_ERROR_MESSAGES.OVER_SIX),

      reorder: Yup.number()
        .typeError(FIELD_ERROR_MESSAGES.NAN)
        .integer(FIELD_ERROR_MESSAGES.NAI)
        .min(0, FIELD_ERROR_MESSAGES.NAN)
        .max(999999, FIELD_ERROR_MESSAGES.OVER_SIX)
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
                    label='Snack Name'
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
                    error={addForm.errors.description}
                    onChange={handleUpdateDescription}
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
                    info={INFO_LABELS.REORDER_POINT}
                    label='Reorder Point'
                    id='reorder'
                    name='reorder'
                    type='text'
                  />
                </div>
                <Divider className={styles.divide} />

                <div>
                  {isBatchDetailsOpen ? (
                    <>
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
                        <button
                          className={styles.deleteIcon__container}
                          onClick={deleteBatchDetails}
                        >
                          <DeleteIcon className={styles.deleteIcon} />
                        </button>
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
                disabled={!addForm.isValid || !category}
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
