import * as Yup from 'yup';

import { BASE_BLUE, DARKER_GREY, DARK_BLUE, LIGHT_BLUE, WHITE } from '../styles/Colors.module.css';
import { Button, Dialog, Divider } from '@material-ui/core';
import { Field, Form, FormikProvider, useField, useFormik } from 'formik';
import {React, useState} from 'react';

import Select from 'react-select';
import classNames from 'classnames';
import dialogStyles from '../styles/Dialog.module.css';
import styles from '../styles/ManageSnack.module.css';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'candy', label: 'Candy' },
  { value: 'chips', label: 'Chips' },
  { value: 'cookies', label: 'Cookies' },
  { value: 'crackers', label: 'Crackers' },
  { value: 'fruits', label: 'Fruits' }
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const TextInputLiveFeedback = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [didFocus, setDidFocus] = useState(false);
  const handleFocus = () => setDidFocus(true);
  const showFeedback =
    (!!didFocus && field.value.trim().length > 2) || meta.touched;

  return (
    <div
      className={classNames(styles.form__control,
        ` ${
          showFeedback ? (meta.error ? styles.invalid : styles.valid) : ''
        }` ) }
    >
      <div className={styles.form__flex}>
        <div className={dialogStyles.lable}>{label}</div>{' '}
        {showFeedback ? (
          <div
            id={`${props.id}-feedback`}
            aria-live='polite'
            className={classNames(styles.feedback, styles.text__sm)}
          >
            {meta.error ? meta.error : '✓'}
          </div>
        ) : null}
      </div>
      <input className={styles.input}
        {...props}
        {...field}
        aria-describedby={`${props.id}-feedback ${props.id}-help`}
        onFocus={handleFocus}
      />
    </div>
  );
};

const ManageSnackDialog = (props) => {
  const { open, value, onSubmit, handleClose, onChangeObj } = props;

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
      console.log(onChangeObj);
      alert(JSON.stringify(values, null, 2));
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

  const customStyles = {
    container: (base) => ({
      ...base,
      width: '180px',
      height: '24',
      marginRight: '1rem'
    }),
    option: (base, state) => ({
      ...base,
      color: state.isSelected ? DARK_BLUE : DARKER_GREY,
      fontWeight: state.isSelected ? '600' : '400',
      backgroundColor: state.isSelected ? LIGHT_BLUE : WHITE,
      '&:hover': {
        backgroundColor: '#F1F9FF'
      },
      cursor: 'pointer'
    }),
    control: (base, state) => ({
      ...base,
      height: '28px',
      minHeight: '20px',
      border: `2px solid ${BASE_BLUE}`,
      '&:hover': {
        border: `2px solid ${DARK_BLUE}`
      },
      fontWeight: '600',
      backgroundColor: state.hasValue ? LIGHT_BLUE : WHITE,
      boxShadow: 'none',
      cursor: 'pointer'
    })
  };

  return (
    <Dialog
      aria-labelledby='snack-manage-dialog'
      open={open}
      onClose={handleClose} 
      onSubmit={onSubmit}
    > 
      {/* TODO: handleClose needs to reset form */}
      <div className={styles.form}>
        <FormikProvider variant='outlined' value={formik}>
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
                  <TextInputLiveFeedback
                    label='Snack name'
                    id='snackname'
                    name='snackname'
                    type='text'
                  />
                  <div className={styles.frame__column}>
                    <p>Catetogy</p>
                    {/* TODO: selectCategory component */}
                    <Select options={options} 
                      styles={customStyles}
                      onChange={() => (alert(options.value))}/>
                  </div>
                </div>
                <p>Description</p>
                <Field name='description' as='textarea' className={styles.textarea} />
                <div className={styles.frame__row}>
                  <TextInputLiveFeedback
                    label='Price ($)'
                    id='price'
                    name='price'
                    type='text'
                  />
                  <TextInputLiveFeedback
                    label='Quantity'
                    id='quantity'
                    name='quantity'
                    type='text'
                  />
                </div>
                <div className={styles.frame__row}>
                  <TextInputLiveFeedback
                    label='Re-order point'
                    id='reorder'
                    name='reorder'
                    type='text'
                  />
                  <TextInputLiveFeedback
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
              disabled={!value} // make it disabled when input is not entered 
              className={styles.button}
              onClick={onSubmit}>
              Submit
            </Button>
          </Form>
        </FormikProvider>
      </div>
    </Dialog>
  );
};

export default ManageSnackDialog;
