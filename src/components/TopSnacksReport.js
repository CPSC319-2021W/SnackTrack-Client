import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card } from '@material-ui/core';
import { DateTime } from 'luxon';
import { TOP_SNACK_REQUEST } from '../constants';
import TopSnackSelect from './TopSnackSelect';
import dashStyles from '../styles/Dashboard.module.css';
import { getPopularSnacks } from '../services/SnacksService';
import { setPopularSnacks } from '../redux/features/snacks/snacksSlice';
import styles from '../styles/TopSnacksReport.module.css';

const TopSnacksReport = () => {
  const dispatch = useDispatch();
  const DEFAULT_RANGE = 1;

  const [range, setRange] = useState(DEFAULT_RANGE);
  const { popularSnacks } = useSelector((state) => state.snacksReducer);
  const today= DateTime.local().toISO();

  useEffect(async () => {
    if (range) {
      try {
        let startDate = DateTime.local();
        switch(range) {
        case 1:
          startDate = TOP_SNACK_REQUEST.START_DATE;
          break;
        case 2:
          startDate = startDate.minus({ days: 7 }).toISO();
          break;
        case 3:
          startDate = startDate.minus({ days: 30 }).toISO();
          break;
        case 4:
          startDate = startDate.minus({ days: 180 }).toISO();
          break;
        } 
        const popularSnackResponse = await getPopularSnacks(
          startDate, today, 
          TOP_SNACK_REQUEST.TRANSACTION_TYPE_ID, TOP_SNACK_REQUEST.LIMIT);
        dispatch(setPopularSnacks(popularSnackResponse));
      } catch (err) {
        console.log(err);
      }
    }
  },[range]);

  const handleRangeSet = (options) => {
    setRange(options.value);
  };

  const renderEmptyState = () => {
    return (
      <p className={dashStyles.placeholder}>
        No snacks.
      </p>
    );
  };
  return (
    <Card className={styles.card__base}>
      <div className={styles.header}>
        <h5 className={styles.title}>Most Popular Snacks (units sold)</h5>
        <div className={styles.select__container}>
          <TopSnackSelect rangeValue={range} handleSelectRange={handleRangeSet}/>
        </div>
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