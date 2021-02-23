import { Grid } from '@material-ui/core';
import React from 'react';
import SnackCard from './SnackCard';
import styles from '../../styles/SnackGrid.module.css';

const SnackGrid = (props) => {
  const { snacks, onClick } = props;
  return (
    <Grid container spacing={2} className={styles.container}>
      {snacks.map((snack, index) => {
        return (
          <div key={index} className={styles.item}>
            <SnackCard snack={snack} onClick={onClick} />
          </div>
        );
      })}
    </Grid>
  );
};

export default SnackGrid;
