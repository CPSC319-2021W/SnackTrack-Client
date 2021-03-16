import * as Yup from 'yup';

import { Button, Dialog, Divider } from '@material-ui/core';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { React, useEffect, useState } from 'react';
import {
  setIsAddSnackOpen,
  setSnackImageUploadData
} from '../redux/features/snacks/snacksSlice';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from './AppButton';
import CategorySelect from './ManageSnack/CategorySelect';
import { DateTime } from 'luxon';
import { ReactComponent as DeleteIcon } from '../assets/icons/delete.svg';
import ImageUploader from './ImageUploader';
import InputLiveFeedback from './ManageSnack/InputLiveFeedback';
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
  const [isBatchDetailsOpen, setIsBatchDetailsOpen] = useState(false);
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

  useEffect(() => {
    setCategory('');
    addForm.resetForm();
    setIsBatchDetailsOpen(false);
    dispatch(setSnackImageUploadData(null));
  }, [isAddSnackOpen]);

  const addForm = useFormik({
    initialValues: initialState,
    onSubmit: async (values, actions) => {
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
        expiration_dtm: values.expiration ? today.plus(parseInt(values.expiration)) : null
      };
      const snack = await addSnack(snackRequest);
      actions.resetForm({ values: initialState });
      console.log(snack);
      closeDialog();
    },
    validationSchema: Yup.object({
      snackname: Yup.string()
        .min(1, 'Must be at least 1 characters')
        .max(128, 'Must be less than 128 characters')
        .required('Required'),

      description: Yup.string()
        .min(1, 'Must be at least 1 characters')
        .max(128, 'Must be less than 128 characters'),

      price: Yup.string()
        .min(0, 'Must be at least $0')
        .max(6, 'Must be less than 6 digits')
        .required('Required')
        .matches(/^\d*[.]?\d*$/, 'Number only'),

      quantity: Yup.string()
        .min(0, 'Must be at least $0')
        .max(6, 'Must be less than 6 digits')
        .matches(/^[0-9]*$/, 'Number only'),

      reorder: Yup.string()
        .min(0, 'Must be at least $0')
        .max(6, 'Must be less than 6 digits')
        .matches(/^[0-9]*$/, 'Number only'),

      expiration: Yup.string()
        .min(0, 'Must be at least 0')
        .max(6, 'Must be less than 6 digits')
        .matches(/^[0-9]*$/, 'Number only')
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
                <div className={styles.frame__row_mobile}>
                  <InputLiveFeedback
                    label='Snack name'
                    id='snackname'
                    name='snackname'
                    type='text'
                  />
                  <div className={styles.category__label}>
                    <p>Category</p>
                    <CategorySelect handleSelectCategory={handleCategorySet} />
                  </div>
                </div>
                <div className={styles.textarea_label}>
                  <p>Description</p>
                  <Field name='description' as='textarea' className={styles.textarea} />
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
                <div className={styles.frame__row}>
                  {isBatchDetailsOpen ? (
                    <>
                      <InputLiveFeedback
                        label='Quantity'
                        id='quantity'
                        name='quantity'
                        type='text'
                      />
                      <InputLiveFeedback
                        label='Date of expiration'
                        id='expiration'
                        name='expiration'
                        type='text'
                      />
                      <button
                        className={styles.deleteIcon__container}
                        onClick={deleteBatchDetails}
                      >
                        <DeleteIcon className={styles.deleteIcon} />
                      </button>
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
            <div className={styles.bottom}>
              <Button
                type='submit'
                disabled={
                  !addForm.dirty || !addForm.isValid || !category || !snackImageUploadData
                }
                className={styles.button}
              >
                Submit
              </Button>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </Dialog>
  );
};

export default AddSnackDialog;
