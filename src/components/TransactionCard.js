/* eslint-disable */
import React, { Fragment } from 'react';

import { Button, Card } from '@material-ui/core';
import classNames from 'classnames';

import styles from '../styles/TransactionCard.module.css';

const TransactionCard = (props) => {
  const { date, snack_name, quantity, status, total, onEdit } = props;
  return (
      <Fragment>
          <Card variant='outlined' className={styles.card__base}>
            <div className={styles.column__field}>
                <p>Date</p>
            </div>
            <div className={styles.column__field}>
                <p>KitKat</p>
            </div>
            <div className={styles.column__field}>
                <p>1</p>
            </div>
            <div className={styles.column__field}>
                <p>$1.50</p>
            </div>
            <div className={styles.column__field}>
                <span className={classNames({
                    [styles.status__bar]: true,
                    [styles.status__green]: true
                })}>PAID</span>
            </div>
            <div className={styles.column__field}>
                <Button className={styles.edit__button}>
                    Edit Order
                </Button>
            </div>
        </Card>
        <Card variant='outlined' className={styles.mobile__base}>
            <div className={styles.column__container__left}>
                <div>
                    <p className={classNames({
                        [styles.column__text]: true,
                        [styles.column__text__title]: true
                    })}>KitKat</p>
                </div>
                <div>
                    <p className={styles.column__text}>March 12, 2021</p>
                </div>
                <div>
                    <p className={styles.column__text}>1 item • $1.50</p>
                </div>
            </div>
            <div className={styles.column__container__right}>
                <div>
                    <span className={classNames({
                        [styles.mobile__status__bar]: true,
                        [styles.status__green]: true
                    })}>PAID</span>
                </div>
                <div>
                    <Button className={classNames({
                        [styles.edit__button]: true,
                        [styles.mobile__edit__button]: true
                    })}>
                        Edit Order
                    </Button>
                </div>
            </div>
        </Card>
      </Fragment>
  );
};

export default TransactionCard;