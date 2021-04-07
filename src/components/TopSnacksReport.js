import { Card, Tooltip } from '@material-ui/core';
import { React, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DateTime } from 'luxon';
import { TOP_SNACK_REQUEST } from '../constants';
import { getPopularSnacks } from '../services/SnacksService';
import { setPopularSnacks } from '../redux/features/snacks/snacksSlice';
import styles from '../styles/TopSnacksReport.module.css';

const TopSnacksReport = () => {
  const dispatch = useDispatch();
  const { popularSnacks } = useSelector((state) => state.snacksReducer);
  const tomorrow = DateTime.local().plus({days: 1}).toISODate();
  useEffect(async () => {
    const popularSnackResponse = await getPopularSnacks(
      TOP_SNACK_REQUEST.START_DATE, tomorrow, 
      TOP_SNACK_REQUEST.TRANSACTION_TYPE_ID, TOP_SNACK_REQUEST.LIMIT);
    dispatch(setPopularSnacks(popularSnackResponse));
    console.log(popularSnackResponse);
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
        <h5 className={styles.title}>Popular Snacks</h5>
        <p>(by units sold)</p>
      </div>
      <div className={styles.container}>
        { popularSnacks
          ? popularSnacks.map((snack, i) => {
            const card = (
              <div className={styles.card__container}>
                <div className={styles.image}>
                  <img src={snack.image_uri} alt={snack.snack_name}/>
                </div>
                <div className={styles.card__unit}>
                  <div className={styles.card__description}>
                    {snack.snack_name.length > 7 
                      ? (
                        <Tooltip key={i} title={snack.snack_name}>
                          <h6>{snack.snack_name.slice(0, 13)}..</h6>
                        </Tooltip>
                      ) : <h6>{snack.snack_name}</h6> }
                    {/* <p>{snack.category}</p>  */}
                  </div>
                  <p> {snack.total_quantity} units</p>
                </div> 
              </div>
            );
            return (
              <div key={i} className={styles.card}>{ card }</div>
            );
          })
          :
          renderEmptyState()}
      </div>
    </Card>
  );
};

export default TopSnacksReport;