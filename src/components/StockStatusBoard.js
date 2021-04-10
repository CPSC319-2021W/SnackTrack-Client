import React, { useState } from 'react';

import { Card, Tooltip } from '@material-ui/core';
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
    return snacks.length > 0
      ? snacks.map((snack, i) => <StockStatusBar key={i} snack={snack} />)
      : renderPlaceholder(true);
  };

  const renderOutOfStockOrExpired = () => {
    const outOfStockOrExpired = snacks.filter(
      (snack) => snack.quantity < snack.order_threshold || snack.quantity === 0 || snack.expired_quantity > 0);
    return (
      outOfStockOrExpired.length > 0
        ? outOfStockOrExpired.map((snack, i) => <StockStatusBar key={i} snack={snack} />)
        : renderPlaceholder(false)
    );
  };

  const renderError = () => {
    return <p className={styles.error__message}>{GENERIC_ERROR}</p>;
  };

  return (
    <Card className={styles.board__container}>
      <div className={styles.header}>
        <h5 className={styles.title}>Inventory Levels</h5>
        <Tooltip title={ showAll ? 'Show Only High Priority Snacks' : 'Show All Snacks' }>
          <span
            className={`${styles.show__button} ${showAll ? styles.show__high : styles.show__all}`}
            onClick={handleShowAll}
          >
            { showAll ? '!' : '*' }
          </span>
        </Tooltip>
      </div>
      { error
        ? renderError()
        : (
          showAll
            ? renderAll()
            : renderOutOfStockOrExpired()
        )
      }
    </Card>
  );
};

export default StockStatusBoard;
