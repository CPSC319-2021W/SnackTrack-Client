import React, { Fragment } from 'react';
import { Tooltip } from '@material-ui/core';

import { DEFAULT_ORDER_THRESHOLD } from  '../constants';
import classNames from 'classnames';
import styles from '../styles/StockStatus.module.css';

const StockStatusBar = ({ snack }) => {
  const { quantity, snack_name, order_threshold } = snack;

  const reorderPoint = order_threshold || DEFAULT_ORDER_THRESHOLD;

  const isOverStock = quantity >= reorderPoint;
  const isUnderStock = quantity < reorderPoint;

  const overStockLeft = Math.ceil((reorderPoint / quantity) * 100);
  const overStockRight = Math.floor(((quantity - reorderPoint) / quantity) * 100);

  const underStockLeft = Math.ceil((quantity / reorderPoint) * 100);
  const underStockRight = Math.floor(((reorderPoint - quantity) / reorderPoint) * 100);

  const renderTitle = () => {
    return (
      <Fragment>
        <div>{ `Quantity: ${quantity}` }</div>
        <div>{ `Reorder Point: ${reorderPoint}` }</div>
      </Fragment>
    );
  };

  return (
    <div className={styles.bar__container}>
      <span className={styles.snack__label}>{ snack_name }</span>
      <Tooltip title={renderTitle()}>
        <div className={styles.bar__base}>
          { quantity === 0
            ? (
              <div
                className={classNames({
                  [styles.bar]: true,
                  [styles.stock__none]: true
                })}
                style={{ width: '100%' }}
              >
                Out of Stock
              </div>
            ) : (
              <Fragment>
                <div
                  className={classNames({
                    [styles.bar]: true,
                    [styles.bar__left]: true,
                    [styles.stock__low]: isOverStock,
                    [styles.stock__under]: isUnderStock
                  })}
                  style={{ width: `${isOverStock ? overStockLeft : underStockLeft}%` }}
                >
                  { isOverStock
                    ? (overStockLeft > 10 ? reorderPoint : null)
                    : (underStockLeft > 10 ? quantity : null)
                  }
                </div>
                <div
                  className={classNames({
                    [styles.bar]: true,
                    [styles.bar__right]: true,
                    [styles.stock__over]: isOverStock,
                    [styles.stock__reorder]: isUnderStock
                  })}
                  style={{ width: `${isOverStock ? overStockRight : underStockRight}%` }}
                >
                  { isOverStock
                    ? (overStockRight > 10 ? quantity : null)
                    : (underStockRight > 10 ? reorderPoint : null)
                  }
                </div>
              </Fragment>
            )
          }
        </div>
      </Tooltip>
    </div>
  );
};

export default StockStatusBar;
