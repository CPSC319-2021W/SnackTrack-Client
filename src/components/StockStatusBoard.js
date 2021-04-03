import React, { useState } from 'react';
import { Card } from '@material-ui/core';

import AppButton from './AppButton';
import StockStatusBar from './StockStatusBar';
import styles from '../styles/StockStatus.module.css';

const StockStatusBoard = ({ snacks }) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => setShowAll(!showAll);

  const renderPlaceholder = () => {
    return (
      <div className={styles.placeholder}>
        No snacks found.
      </div>
    );
  };

  const renderAll = () => {
    return (
      snacks.length > 0
        ? snacks.map((snack, i) => <StockStatusBar key={i} snack={snack} />)
        : renderPlaceholder()
    );
  };

  const renderOutOfStock = () => {
    const outOfStock = snacks.filter((snack) => snack.quantity === 0);
    return (
      outOfStock.length > 0
        ? outOfStock.map((snack, i) => <StockStatusBar key={i} snack={snack} />)
        : renderPlaceholder()
    );
  };

  return (
    <Card variant='outlined' className={styles.board__container}>
      <div className={styles.header}>
        <h5 className={styles.title}>Inventory Levels</h5>
        <AppButton
          primary
          onClick={handleShowAll}
        >
          { showAll ? 'Out of Stock' : 'Show All' }
        </AppButton>
      </div>
      { showAll
        ? renderAll()
        : renderOutOfStock()
      }
    </Card>
  );
};

export default StockStatusBoard;
