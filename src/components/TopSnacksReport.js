import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '@material-ui/core';
import { DateTime } from 'luxon';

import { TOP_SNACK_REQUEST } from '../constants';
import { getPopularSnacks } from '../services/SnacksService';
import { setPopularSnacks } from '../redux/features/snacks/snacksSlice';
import styles from '../styles/TopSnacksReport.module.css';

const TopSnacksReport = () => {
  const dispatch = useDispatch();
  const { popularSnacks } = useSelector((state) => state.snacksReducer);
  const today= DateTime.local().toISO();
  useEffect(async () => {
    try {
      const popularSnackResponse = await getPopularSnacks(
        TOP_SNACK_REQUEST.START_DATE, today, 
        TOP_SNACK_REQUEST.TRANSACTION_TYPE_ID, TOP_SNACK_REQUEST.LIMIT);
      dispatch(setPopularSnacks(popularSnackResponse));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const renderEmptyState = () => {
    return (
      <p>
        No snacks.
      </p>
    );
  };
  return (
    <Card className={styles.card__base}>
      <div className={styles.header}>
        <h5 className={styles.title}>Most Popular Snacks</h5>
        <p>(by units sold)</p>
      </div>
      <div className={styles.container}>
        { popularSnacks
          ? popularSnacks.map((snack, i) => (
            <div key={i} className={styles.card__container}>
              <div className={styles.image}>
                <img src={snack.image_uri} alt={snack.snack_name}/>
              </div>
              <div className={styles.card__unit}>
                <div className={styles.card__description}>
                  <h6>{snack.snack_name}</h6>
                </div>
                <p> {snack.total_quantity} units</p>
              </div> 
            </div>
          )) : renderEmptyState()}
      </div>
    </Card>
  );
};

export default TopSnacksReport;