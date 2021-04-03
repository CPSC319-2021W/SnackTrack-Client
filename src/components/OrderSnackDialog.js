import { Button, Card, CardMedia, Dialog, Divider, Input } from '@material-ui/core';
import { React, useEffect, useState } from 'react';

import AppButton from './AppButton';
import { CATEGORIES_LIST } from '../constants';
import NumberFormat from 'react-number-format';
import classNames from 'classnames';
import styles from '../styles/Dialog.module.css';
import { useSelector } from 'react-redux';

const OrderSnackDialog = (props) => {
  const {
    open,
    value,
    onSubmit,
    setSnackQuantity,
    handleClose,
    onChangeQuantity,
    isOrderLoading
  } = props;
  const { selectedSnack } = useSelector((state) => state.snacksReducer);
  const { snack_id, snack_name, description, image_uri, price, quantity, snack_type_id } = selectedSnack;
  const [isDisabled, setIsDisabled] = useState(false);

  const category = CATEGORIES_LIST.find((category) => category.id === snack_type_id);
  const image = image_uri || category?.defaultImage;

  const increaseQuantity = () => {
    if (quantity > value) {
      setSnackQuantity(parseInt(value) + 1);
    }
  };

  const decreaseQuantity = () => {
    if (value > 0) {
      setSnackQuantity(parseInt(value) - 1);
    }
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = category?.defaultImage;
  };

  useEffect(() => {
    const qty = parseInt(value);
    if (qty === 0 || qty > selectedSnack?.quantity) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [selectedSnack, value]);

  return (
    <Dialog
      aria-labelledby='snack-order-dialog'
      open={open}
      onClose={handleClose}
      onSubmit={(event) => onSubmit(event, snack_id)}
    >
      <Card variant='outlined' className={styles.card}>
        <div className={styles.header}>
          <div>
            <h3 className={styles.headerTitle}>{snack_name}</h3>
            <p className={styles.categoryName}>{category?.name}</p>
          </div>
          <p className={styles.headerPrice}>
            <NumberFormat
              value={price / 100}
              displayType='text'
              decimalScale={2}
              fixedDecimalScale={true}
              prefix='$'
            />
          </p>
        </div>
        <Divider />
        <div className={styles.body}>
          <div className={styles.image}>
            <CardMedia
              title={snack_name}
              component='img'
              src={image}
              onError={handleImageError}
            />
          </div>
          <div>
            <p className={styles.description}>{description}</p>
            <div className={styles.quant__container}>
              <p className={styles.quantity}>How many can you fit in your pockets?</p>
              <div className={styles.stepper}>
                <Button
                  className={classNames({
                    [styles.stepper__button]: true,
                    [styles.stepper__button__left]: true
                  })}
                  disabled={value === 0}
                  onClick={decreaseQuantity}
                >
                  -
                </Button>
                <Input
                  className={classNames({
                    [styles.input]: true,
                    [styles.input__small]: true,
                    [styles.input__stepper]: true
                  })}
                  disableUnderline={true}
                  value={value}
                  type='number'
                  onChange={onChangeQuantity}
                  onKeyPress={(event) => onSubmit(event, snack_id)}
                />
                <Button
                  className={classNames({
                    [styles.stepper__button]: true,
                    [styles.stepper__button__right]: true
                  })}
                  disabled={value >= quantity}
                  onClick={increaseQuantity}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className={styles.oneButton__footer}>
          <AppButton
            primary
            disabled={isDisabled}
            loading={isOrderLoading}
            onClick={(event) => onSubmit(event, snack_id)}
          >
            Confirm
          </AppButton>
        </div>
      </Card>
    </Dialog>
  );
};

export default OrderSnackDialog;
