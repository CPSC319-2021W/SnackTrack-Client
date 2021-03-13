import React, { Fragment } from 'react';

import { Card } from '@material-ui/core';
import classNames from 'classnames';
import { DateTime as dt } from 'luxon';

import { isCancelled, isPaid, isPaymentPending } from '../helpers/OrdersHelpers';
import AppButton from './AppButton';
import styles from '../styles/TransactionsCard.module.css';

const OrderCard = (props) => {
  const { order, onEdit } = props;
  const {
    payment_id,
    snack_name,
    quantity,
    transaction_amount,
    transaction_dtm,
    transaction_type_id
  } = order;

  const renderDate = () => {
    return dt.fromISO(transaction_dtm).toLocaleString(dt.DATE_MED_WITH_WEEKDAY);
  };

  const renderStatus = (type) => {
    if (isCancelled(transaction_type_id)) {
      return (
        <span
          className={classNames({
            [type ? styles.mobile__status__bar : styles.status__bar]: true,
            [styles.status__red]: true
          })}
        >
          CANCELLED
        </span>
      );
    } else if (isPaid(payment_id)) {
      return (
        <span
          className={classNames({
            [type ? styles.mobile__status__bar : styles.status__bar]: true,
            [styles.status__green]: true
          })}
        >
          PAID
        </span>
      );
    } else {
      return (
        <span className={classNames({
          [type ? styles.mobile__status__bar : styles.status__bar]: true,
          [styles.status__orange]: true
        })}>UNPAID
        </span>
      );
    }
  };

  const renderAmount = () => {
    const amount = transaction_amount / 100;
    return `$${amount.toFixed(2)}`;
  };

  const renderEditButton = () => {
    return (
      isPaymentPending(payment_id, transaction_type_id)
        ? (
          <AppButton
            secondary
            small
            onClick={() => onEdit(order)}
          >
            Edit Order
          </AppButton>
        )
        : null
    );
  };

  return (
    <Fragment>
      <Card variant='outlined' className={styles.card__base}>
        <div className={styles.column__field}>
          <p>{ renderDate() }</p>
        </div>
        <div className={styles.column__field}>
          <p>{ snack_name }</p>
        </div>
        <div className={styles.column__field__small}>
          <p>{ quantity }</p>
        </div>
        <div className={styles.column__field}>
          <p>{ renderAmount() }</p>
        </div>
        <div className={styles.column__field__small}>
          { renderStatus() }
        </div>
        <div className={styles.column__field}>
          { renderEditButton() }
        </div>
      </Card>
      <Card variant='outlined' className={styles.mobile__base}>
        <div className={styles.column__container__left}>
          <div>
            <p className={classNames({
              [styles.column__text]: true,
              [styles.column__text__title]: true
            })}>
              { snack_name }
            </p>
          </div>
          <div>
            <p className={styles.column__text}>{ renderDate() }</p>
          </div>
          <div>
            <p className={styles.column__text}>
              { quantity } { quantity > 1 ? 'items' : 'item' } • { renderAmount() }
            </p>
          </div>
        </div>
        <div className={styles.column__container__right}>
          <div className={styles.status__container}>
            { renderStatus('mobile') }
          </div>
          <div>
            { renderEditButton() }
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default OrderCard;