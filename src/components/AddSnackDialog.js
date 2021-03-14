import * as Yup from 'yup';

import { Button, Dialog, Divider } from '@material-ui/core';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import {React, useState} from 'react';

import CategorySelect from './ManageSnack/CategorySelect';
// import ImageUploader from './ImageUploader';
import InputLiveFeedback from './ManageSnack/InputLiveFeedback';
import dialogStyles from '../styles/Dialog.module.css';
import {
  setIsAddSnackOpen
} from '../redux/features/snacks/snacksSlice';
import styles from '../styles/ManageSnack.module.css';
import { useDispatch } from 'react-redux';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const initialState = { snackname: '',
  description: '',
  price: '',
  quantity: '',
  reorder: '',
  expiration: ''};

const AddSnackDialog = (props) => {
  const dispatch = useDispatch();
  const { open, handleSubmit } = props;
  const [category, setCategory] = useState('');
  const [snackObj, setSnackObj] = useState(initialState);

  const handleCategorySet = (options) => {
    setCategory(options.value);
  };

  const closeDialog = () => {
    setCategory('');
    setSnackObj(initialState);
    dispatch(setIsAddSnackOpen(false));
  };

  const formik = useFormik({
    initialValues: snackObj,
    onSubmit: async (values) => {
      await sleep(500);
      //setSnackObj(values);
      alert(JSON.stringify(values, null, 2));
      closeDialog();
    },
    validationSchema: Yup.object({
      snackname: Yup.string()
        .min(1, 'Must be at least 1 characters')
        .max(30, 'Must be less than 30 characters')
        .required('Required')
        .matches(
          /^[a-zA-Z0-9]+$/,
          'Cannot contain special characters or spaces'
        ),
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
    > 
      <div className={styles.form}>
        <FormikProvider variant='outlined' value={formik}>
          {console.log(formik)}
          <Form>
            <div className={dialogStyles.header}>
              <div className={styles.title}>Add New Snack</div>
            </div>
            <Divider />
            <div className={styles.container}>
              <div className={styles.frame__image}>
                <div className={styles.box}></div>
                {/* <ImageUploader /> */}
                <Button className={styles.button__photo} onClick={() => {}}>Upload photo</Button>
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
                    label='Quantity'
                    id='quantity'
                    name='quantity'
                    type='text'
                  />
                </div>
                <div className={styles.frame__row}>
                  <InputLiveFeedback
                    label='Re-order point'
                    id='reorder'
                    name='reorder'
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
                disabled={category == ''} // make it disabled when input is not entered 
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
