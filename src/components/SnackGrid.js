import { Grid } from '@material-ui/core';
import React from 'react';
import SnackCard from './SnackCard';
import styles from '../styles/SnackGrid.module.css';

const SnackGrid = (props) => {
  const { snacks, onClick } = props;
  return (
    <Grid container spacing={2} className={styles.container}>
      {snacks.map((snack, index) => {
        return (
          <Grid key={index} item className={styles.item} lg={3} md={4} sm={6}>
            <SnackCard snack={snack} onClick={onClick} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default SnackGrid;
