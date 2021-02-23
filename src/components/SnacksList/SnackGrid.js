import { Grid } from '@material-ui/core';
import React from 'react';
import SnackCard from './SnackCard/SnackCard';
import SnackCardSkeleton from './SnackCard/SnackCardSkeleton';
import styles from '../../styles/SnackGrid.module.css';

const DEFAULT_SNACK_COUNT = 8;

const SnackGrid = (props) => {
  const { snacks, onClick, loaded } = props;

  let grid;
  if (loaded) {
    grid = snacks.map((snack, index) => {
      return (
        <Grid key={index} item className={styles.item} lg={3} md={4} sm={6}>
          <SnackCard snack={snack} onClick={onClick} />
        </Grid>
      );
    });
  } else {
    let arr = new Array(DEFAULT_SNACK_COUNT);
    for (let i = 0; i < DEFAULT_SNACK_COUNT; i++) {
      arr.push(
        <Grid key={i} item className={styles.item} lg={3} md={4} sm={6}>
          <SnackCardSkeleton />
        </Grid>
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
