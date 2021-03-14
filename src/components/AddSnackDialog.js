import * as Yup from 'yup';

import { Button, Dialog, Divider } from '@material-ui/core';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import { React, useEffect, useState } from 'react';
import {
  setIsAddSnackOpen,
  setSnackImageUpload
} from '../redux/features/snacks/snacksSlice';
import { useDispatch, useSelector } from 'react-redux';

import CategorySelect from './ManageSnack/CategorySelect';
import { DateTime } from 'luxon';
import ImageUploader from './ImageUploader';
import InputLiveFeedback from './ManageSnack/InputLiveFeedback';
import {addSnack} from '../services/SnacksService';
import dialogStyles from '../styles/Dialog.module.css';
import styles from '../styles/ManageSnack.module.css';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
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
  const { open, handleSubmit } = props;
  const [category, setCategory] = useState('');
  const [snackObj, setSnackObj] = useState(initialState);
  const [date, setDate] = useState(today);
  const { username } = useSelector((state) => state.usersReducer.profile);
  const { isAddSnackOpen, snackImageUpload } = useSelector(
    (state) => state.snacksReducer
  );

  const handleCategorySet = (options) => {
    setCategory(options.value); // category id 
  };

  const closeDialog = () => {
    setCategory('');
    setSnackObj(initialState);
    addForm.resetForm();
    dispatch(setIsAddSnackOpen(false));
  };

  useEffect(() => {
    dispatch(setSnackImageUpload(null));
  }, [isAddSnackOpen]);

  const addForm = useFormik({
    initialValues: initialState,
    onSubmit: async (values, actions) => {
      await sleep(500);
      values.quantity = values.quantity === '' ? 0 : values.quantity;
      values.image_uri = snackImageUpload;
      setSnackObj(values);
      setDate(today.plus(parseInt(values.expiration)));
      addSnack(username, snackObj, category, date);
      actions.resetForm({values: initialState});
      closeDialog();
    },
    validationSchema: Yup.object({
      snackname: Yup.string()
        .min(1, 'Must be at least 1 characters')
        .max(30, 'Must be less than 30 characters')
        .required('Required'),
      description: Yup.string()
        .min(1, 'Must be at least 1 characters')
        .max(200, 'Must be less than 200 characters'),
      price: Yup.string()
        .min(0, 'Must be at least $0')
        .max(6, 'Must be less than 6 digits')
        .required('Required')
        .matches(/^\d*[.]?\d*$/, 'Number only'),

      quantity: Yup.string()
        .min(0, 'Must be at least $0')
        .max(6, 'Must be less than 6 digits')
        .matches(/^\d*[.]?\d*$/, 'Number only'),

      reorder: Yup.string()
        .min(0, 'Must be at least $0')
        .max(6, 'Must be less than 6 digits')
        .matches(/^\d*[.]?\d*$/, 'Number only'),

      expiration: Yup.string()
        .min(0, 'Must be at least 0')
        .max(6, 'Must be less than 6 digits')
        .matches(/^\d*[.]?\d*$/, 'Number only')
    })
  });

  return (
    <Dialog
      aria-labelledby='snack-manage-dialog'
      open={open}
      onClose={closeDialog} 
      onSubmit={handleSubmit}
      onCancel={closeDialog}
    > 
      <div className={styles.form}>
        <FormikProvider variant='outlined' value={addForm}>
          {console.log(snackObj)}
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
                  <div className={styles.category__lable}>
                    <p>Category</p>
                    <CategorySelect 
                      handleSelectCategory={handleCategorySet}
                    />
                  </div>
                </div>
                <div className={styles.textarea_lable}>
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
                </div>
              </div>
            </div>
            <Divider />
            <div className={styles.bottom}>
              <Button
                type='submit'
                disabled={
                  !addForm.dirty || !addForm.isValid || !category || !snackImageUpload
                } // make it disabled when input is not entered
                className={styles.button}
              >
                Submit
              </Button>
              {/* TODO: Needs to change AppButton */}
            </div>
          </Form> 
        </FormikProvider>
      </div>
    </Dialog>
  );
};

export default AddSnackDialog;
