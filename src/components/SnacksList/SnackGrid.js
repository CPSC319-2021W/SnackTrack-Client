import { Grid } from '@material-ui/core';
import React from 'react';
import SnackCard from './SnackCard/SnackCard';
import SnackCardSkeleton from './SnackCard/SnackCardSkeleton';
import styles from '../../styles/SnackGrid.module.css';

const DEFAULT_SNACK_COUNT = 10;

const SnackGrid = (props) => {
  const { snacks, onClick, loaded } = props;

  let grid;
  if (loaded) {
    grid = snacks.map((snack, index) => {
      return (
        <div key={index} className={styles.item}>
          <SnackCard snack={snack} onClick={onClick} />
        </div>
      );
    });
  } else {
    let arr = new Array(DEFAULT_SNACK_COUNT);
    for (let i = 0; i < DEFAULT_SNACK_COUNT; i++) {
      arr.push(
        <div key={i} className={styles.item}>
          <SnackCardSkeleton />
        </div>
      );
    }
    grid = arr;
  }

  return (
    <Grid container spacing={2} className={styles.container}>
      {grid}
    </Grid>
  );
};

export default SnackGrid;
