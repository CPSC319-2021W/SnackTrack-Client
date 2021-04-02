import React from 'react';

import { Card } from '@material-ui/core';
import StockStatusBar from './StockStatusBar';
import styles from '../styles/StockStatus.module.css';

const StockStatusBoard = (props) => {
  const { snacks } = props;
  return (
    <Card variant='outlined' className={styles.board__container}>
      <h5 className={styles.title}>Inventory Levels</h5>
      { snacks.map((snack, i) => <StockStatusBar key={i} snack={snack} />) }
    </Card>
  );
};

export default StockStatusBoard;
