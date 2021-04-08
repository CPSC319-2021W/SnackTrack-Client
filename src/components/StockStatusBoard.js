import React, { useState } from 'react';
import { Card } from '@material-ui/core';

import AppButton from './AppButton';
import { GENERIC_ERROR } from '../constants';
import StockStatusBar from './StockStatusBar';
import dashStyles from '../styles/Dashboard.module.css';
import styles from '../styles/StockStatus.module.css';

const StockStatusBoard = ({ snacks, error }) => {
  const [showAll, setShowAll] = useState(false);

  const handleShowAll = () => setShowAll(!showAll);

  const renderPlaceholder = (all) => {
    return (
      <div className={dashStyles.placeholder}>
        No snacks {all ? 'found' : 'out of stock'}.
      </div>
    );
  };

  const renderAll = () => {
    return (
      snacks.length > 0
        ? snacks.map((snack, i) => <StockStatusBar key={i} snack={snack} />)
        : renderPlaceholder(true)
    );
  };

  const renderOutOfStock = () => {
    const outOfStock = snacks.filter((snack) => snack.quantity === 0);
    return (
      outOfStock.length > 0
        ? outOfStock.map((snack, i) => <StockStatusBar key={i} snack={snack} />)
        : renderPlaceholder(false)
    );
  };

  const renderError = () => {
    return (
      <p className={styles.error__message}>
        { GENERIC_ERROR }
      </p>
    );
  };

  return (
    <Card variant='outlined' className={styles.board__container}>
      <div className={styles.header}>
        <h5 className={styles.title}>Inventory Levels</h5>
        <AppButton
          primary
          disabled={error}
          onClick={handleShowAll}
        >
          { showAll ? 'Out of Stock' : 'Show All' }
        </AppButton>
      </div>
      { error
        ? renderError()
        : (
          showAll
            ? renderAll()
            : renderOutOfStock()
        )
      }
    </Card>
  );
};

export default StockStatusBoard;
