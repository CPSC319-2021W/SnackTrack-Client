import React, { Fragment } from 'react';

import { Card } from '@material-ui/core';
import classNames from 'classnames';
import { DateTime as dt } from 'luxon';

import styles from '../styles/TransactionsCard.module.css';

const PaymentCard = (props) => {
  const { payment } = props;
  const {
    payment_amount,
    payment_dtm,
    created_by
  } = payment;

  const renderDate = () => {
    return dt.fromISO(payment_dtm).toLocaleString(dt.DATETIME_MED);
  };

  const renderAmount = () => {
    const amount = payment_amount / 100;
    return `$${amount.toFixed(2)}`;
  };

  return (
    <Fragment>
      <Card variant='outlined' className={styles.card__base}>
        <div className={styles.column__field__pay}>
          <p className={styles.column__text}>{ renderDate() }</p>
        </div>
        <div className={styles.column__field__pay}>
          <p className={styles.column__text}>{ renderAmount() }</p>
        </div>
        <div className={styles.column__field__pay}>
          <p className={styles.column__text}>{ created_by }</p>
        </div>
      </Card>
      <Card variant='outlined' className={styles.mobile__base}>
        <div className={styles.column__container__left}>
          <div>
            <p className={styles.column__text__mobile}>{ renderDate() }</p>
          </div>
          <div>
            <p className={classNames({
              [styles.column__text__mobile]: true,
              [styles.column__text__title]: true
            })}>{ renderAmount() }
            </p>
          </div>
        </div>
        <div className={styles.column__container__right}>
          <div>
            <p className={styles.column__text__mobile}>Processed by</p>
          </div>
          <div>
            <p className={classNames({
              [styles.column__text__mobile]: true,
              [styles.column__text__title]: true
            })}>
              { created_by }
            </p>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export default PaymentCard;
