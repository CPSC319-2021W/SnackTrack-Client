import React from 'react';
import StockStatusBar from './StockStatusBar';
import styles from '../styles/StockStatus.module.css';

const StockStatusBoard = (props) => {
  const { snacks } = props;
  return (
    <div className={styles.board__container}>
      { snacks.map((snack, i) => <StockStatusBar key={i} snack={snack} />) }
    </div>
  );
};

export default StockStatusBoard;
