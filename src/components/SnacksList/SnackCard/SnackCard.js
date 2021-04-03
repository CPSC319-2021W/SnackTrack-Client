import { Card, CardActionArea, CardMedia } from '@material-ui/core';
import { setQuantity } from '../../../redux/features/snacks/snacksSlice';
import {
  setApiResponse,
  setToastNotificationOpen
} from '../../../redux/features/notifications/notificationsSlice';
import { useDispatch, useSelector } from 'react-redux';

import React, { useState } from 'react';
import AppButton from '../../AppButton';
import NumberFormat from 'react-number-format';
import { TRANSACTION_TYPES } from '../../../constants';
import classNames from 'classnames';
import { isAuthenticated } from '../../../helpers/AuthHelper';
import { makeOrder } from '../../../services/TransactionsService';
import { setBalance } from '../../../redux/features/users/usersSlice';
import styles from '../../../styles/SnackCard.module.css';

const SnackCard = (props) => {
  const dispatch = useDispatch();
  const {
    snack_id,
    image_uri,
    snack_name,
    price,
    quantity,
    order_threshold
  } = props.snack;
  const { onClick } = props;
  const { userId, balance } = useSelector((state) => state.usersReducer.profile);
  const DEFAULT_ORDER_THRESHOLD = 10;
  const [isLoading, setIsLoading] = useState(false);

  const updateSnackQuantity = (snackId, newQuantity) => {
    dispatch(setQuantity({ snackId, newQuantity }));
  };

  const openToastNotification = (bool) => dispatch(setToastNotificationOpen(bool));

  const onApiResponse = (response) => dispatch(setApiResponse(response));

  const updateBalance = (balance) => dispatch(setBalance(balance));

  const handleOrder = async (event) => {
    if (event.type === 'click') {
      setIsLoading(true);
      const { PENDING, PURCHASE } = TRANSACTION_TYPES;
      let transactionTypeId = PENDING;
      if (isAuthenticated()) {
        transactionTypeId = PURCHASE;
      }
      try {
        await makeOrder(userId, transactionTypeId, snack_id, price, 1);
        onApiResponse('ORDER_SUCCESS');
        openToastNotification(true);
        if (transactionTypeId != PENDING) {
          updateBalance(balance + price);
        }
        updateSnackQuantity(snack_id, 1);
      } catch (err) {
        console.log(err);
        onApiResponse('ERROR');
        openToastNotification(true);
      }
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    if (quantity > 0) {
      onClick(snack_id);
    }
  };

  const stockStatusLabel = (quantity, orderThreshold) => {
    orderThreshold = orderThreshold || DEFAULT_ORDER_THRESHOLD;
    let statusLabel;
    let oos = false;
    let los = false;
    if (quantity === 0) {
      oos = true;
      statusLabel = 'OUT OF STOCK';
    } else if (quantity < orderThreshold) {
      los = true;
      statusLabel = 'LOW ON STOCK';
    } else {
      return;
    }
    return (
      <span
        className={classNames({
          [styles.stock]: true,
          [styles.stock__orange]: los,
          [styles.stock__red]: oos
        })}
      >
        {statusLabel}
      </span>
    );
  };

  return (
    <Card variant={'outlined'} className={styles.base}>
      <CardActionArea
        className={classNames({
          [styles.action_area]: true,
          [styles.card__disabled]: quantity === 0
        })}
        onClick={handleCardClick}
      >
        <div className={styles.image}>
          {stockStatusLabel(quantity, order_threshold)}
          <CardMedia
            className={classNames({
              [styles.resize_image]: true,
              [styles.image__disabled]: quantity === 0
            })}
            title={snack_name}
            component='img'
            src={image_uri}
          />
        </div>
        <div className={styles.label}>
          <p className={styles.snack_name} title={snack_name}>
            {snack_name}
          </p>
          <p className={styles.price}>
            <NumberFormat
              value={price / 100}
              displayType={'text'}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={'$'}
            />
          </p>
        </div>
      </CardActionArea>
      <div className={styles.button__container}>
        <AppButton
          primary
          fullWidth
          large
          loading={isLoading}
          disabled={quantity === 0}
          onClick={handleOrder}>
          Grab One
        </AppButton>
      </div>
    </Card>
  );
};

export default SnackCard;
