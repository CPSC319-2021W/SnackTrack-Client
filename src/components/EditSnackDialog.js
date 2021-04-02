import * as Yup from 'yup';

import { CATEGORIES_LIST, FIELD_ERROR_MESSAGES } from '../constants';
import { Dialog, Divider } from '@material-ui/core';
import { Form, FormikProvider, useFormik } from 'formik';
import { React, useEffect, useState } from 'react';
import { deleteSnack, editSnack } from '../services/SnacksService';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from './AppButton';
import CategorySelect from './ManageSnack/CategorySelect';
import ImageUploader from './ImageUploader';
import InputLiveFeedback from './ManageSnack/InputLiveFeedback';
import TextAreaField from './TextAreaField';
import dialogStyles from '../styles/Dialog.module.css';
import { saveImage } from '../services/ImagesService';
import { setIsEditSnackOpen } from '../redux/features/snacks/snacksSlice';
import styles from '../styles/ManageSnack.module.css';

const options = CATEGORIES_LIST.map((category) => ({
  value: category.id,
  label: category.name
}));

const EditSnackDialog = (props) => {
  const dispatch = useDispatch();
  const { open } = props;
  const [category, setCategory] = useState('');
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const { username } = useSelector((state) => state.usersReducer.profile);
  const { isEditSnackOpen, snackImageUploadData, selectedSnackToEdit } = useSelector(
    (state) => state.snacksReducer
  );

  const blankState = {
    snackname: '',
    description: '',
    price: '',
    reorder: ''
  };

  const initialState = {
    snackname: selectedSnackToEdit.snack_name,
    description: selectedSnackToEdit.description,
    price: selectedSnackToEdit.price,
    reorder: selectedSnackToEdit.order_threshold
  };

  const handleUpdateDescription = (event) => {
    const { value } = event.target;
    addForm.setFieldValue('description', value);
  };

  const handleCategorySet = (categoryObject) => {
    setCategory(categoryObject);
  };

  const closeDialog = () => {
    dispatch(setIsEditSnackOpen(false));
  };

  const removeSnack = async () => {
    try {
      setIsDeleteLoading(true);
      await deleteSnack(selectedSnackToEdit.snack_id);
      closeDialog();
    } catch (err) {
      console.log(err);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  useEffect(async () => {
    handleCategorySet(options[selectedSnackToEdit.snack_type_id - 1]);
    await addForm.setFieldValue('snackname', selectedSnackToEdit.snack_name);
    await addForm.setFieldValue('description', selectedSnackToEdit.description);
    await addForm.setFieldValue('price', selectedSnackToEdit.price / 100);
    await addForm.setFieldValue('reorder', selectedSnackToEdit.order_threshold ?? '');
  }, [isEditSnackOpen]);

  const addForm = useFormik({
    initialValues: initialState,
    onSubmit: async (values, actions) => {
      setIsSubmitLoading(true);
      let imageUri;
      if (snackImageUploadData) {
        const imageResponse = await saveImage(snackImageUploadData);
        imageUri = imageResponse.url;
      } else {
        imageUri = selectedSnackToEdit.image_uri;
      }
      const snackRequest = {
        snack_id: selectedSnackToEdit.snack_id,
        last_updated_by: username,
        snack_name: values.snackname,
        snack_type_id: parseInt(category.value),
        description: values.description,
        image_uri: imageUri,
        price: Number(values.price) * 100,
        order_threshold: values.reorder === '' ? null : values.reorder
      };
      await editSnack(snackRequest);
      actions.resetForm({ values: blankState });
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
        .matches(/^\d*(.\d{1,2})?$/, FIELD_ERROR_MESSAGES.PRICE),
      reorder: Yup.string()
        .min(0, 'Must be at least $0')
        .max(6, 'Must be less than 6 digits')
        .matches(/^[0-9]*$/, FIELD_ERROR_MESSAGES.NAN)
    })
  });

  return (
    <Dialog
      aria-labelledby='snack-edit-dialog'
      open={open}
      onClose={closeDialog}
      onCancel={closeDialog}
    >
      <div className={styles.form}>
        <FormikProvider variant='outlined' value={addForm}>
          <Form>
            <div className={dialogStyles.header}>
              <div className={styles.title}>Edit Snack</div>
            </div>
            <Divider />
            <div className={styles.container}>
              <div className={styles.frame__image}>
                <ImageUploader src={selectedSnackToEdit.image_uri} />
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
                    categoryValue={category}
                    handleSelectCategory={handleCategorySet}
                  />
                </div>
                <div className={styles.textarea_container}>
                  <TextAreaField
                    label='Description'
                    id='description'
                    name='description'
                    error={addForm.errors.description}
                    value={addForm.values.description}
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
                    label='Reorder Point'
                    id='reorder'
                    name='reorder'
                    type='text'
                  />
                </div>
              </div>
            </div>
            <Divider />
            <div className={dialogStyles.twoButton__footer}>
              <AppButton
                secondary
                loading={isDeleteLoading}
                disabled={isSubmitLoading}
                onClick={removeSnack}
              >
                Delete Snack
              </AppButton>
              <AppButton
                primary
                type='submit'
                loading={isSubmitLoading}
                disabled={!addForm.isValid || !category}
                onClick={addForm.handleSubmit}
              >
                Save Changes
              </AppButton>
            </div>
          </Form>
        </FormikProvider>
      </div>
    </Dialog>
  );
};

export default EditSnackDialog;
