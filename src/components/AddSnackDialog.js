import * as Yup from 'yup';

import { Button, Dialog, Divider } from '@material-ui/core';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import {React, useState} from 'react';

import CategorySelect from './ManageSnack/CategorySelect';
import InputLiveFeedback from './ManageSnack/InputLiveFeedback';
import dialogStyles from '../styles/Dialog.module.css';
import styles from '../styles/ManageSnack.module.css';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const AddSnackDialog = (props) => {
  const { open, handleClose, onChangeObj, onSubmit } = props;
  const [category, setCategory] = useState(null);

  const handleSelectCategory = (event) => {
    setCategory(event.target.value);
    // console.log(handleSubmit);
  };

  const closeDialog = () => {
    setCategory(null);
    handleClose();
  };
  // const checkForErrors = !category;
  // const onSubmit = async (event) => {
  //   await sleep(500);
  //   if (event.key == 'enter' || event.key == 'click') {
  //       try {
  //         console.log(onChangeObj);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //   }
  //   closeDialog();
  // }
  // const handleSubmit = (values) => { 
  //   console.log(values);
  // };

  const formik = useFormik({
    initialValues: {
      snackname: '',
      description: '',
      price: '',
      quantity: '',
      reorder: '',
      expiration: ''
    },
    onSubmit: async (values) => {
      await sleep(500);
      console.log(values);
      alert(JSON.stringify(values, null, 2));
      console.log(onChangeObj);
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
      onSubmit={onSubmit}
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
              <div className={styles.frame__center}>
                <div className={styles.box}></div>
                <button className={styles.button__photo} onClick={() => {}}>Upload photo</button>
              </div>
              <div className={styles.frame__column}>
                <div className={styles.frame__row}>
                  <InputLiveFeedback
                    label='Snack name'
                    id='snackname'
                    name='snackname'
                    type='text'
                  />
                  <div className={styles.frame__column}>
                    <p>Catetogy</p>
                    <CategorySelect onChange={handleSelectCategory}/>
                  </div>
                </div>
                <p>Description</p>
                <Field name='description' as='textarea' className={styles.textarea} />
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
                    label='Date of Expiration'
                    id='expiration'
                    name='expiration'
                    type='text'
                  />
                </div>
              </div>
            </div>
            <Divider />
            <Button
              type='submit'
              disabled={category} // make it disabled when input is not entered 
              className={styles.button}
            >
              Submit
            </Button>
          </Form>
          
        </FormikProvider>
      </div>
    </Dialog>
  );
};

export default AddSnackDialog;
