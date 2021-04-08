import React, { Fragment } from 'react';
import { Tooltip } from '@material-ui/core';

import { DEFAULT_ORDER_THRESHOLD } from  '../constants';
import classNames from 'classnames';
import styles from '../styles/StockStatus.module.css';

const StockStatusBar = ({ snack }) => {
  const { quantity, snack_name, order_threshold, expired_quantity } = snack;

  const reorderPoint = order_threshold || DEFAULT_ORDER_THRESHOLD;

  const renderExpiredBar = () => {
    let leftStock = 0;
    let midStock = 0;
    let rightStock = 0;

    const isOverStockWithExpired = quantity - expired_quantity >= reorderPoint;
    const isUnderStock = quantity <= reorderPoint;
    const areEqual = quantity === expired_quantity && quantity === reorderPoint;

    if (isOverStockWithExpired) {
      leftStock = Math.floor((reorderPoint / quantity) * 100);
      midStock =  Math.floor(((quantity - expired_quantity - reorderPoint) / quantity) * 100);
      rightStock =  Math.floor((expired_quantity / quantity) * 100);
    } else if (isUnderStock) {
      leftStock =  Math.floor(((quantity - expired_quantity) / reorderPoint) * 100);
      midStock =  Math.floor((expired_quantity / reorderPoint) * 100);
      rightStock =  Math.floor(((reorderPoint - quantity) / reorderPoint) * 100);
    } else {
      leftStock =  Math.floor(((reorderPoint - (expired_quantity - (quantity - reorderPoint))) / quantity) * 100);
      midStock =  Math.floor(((expired_quantity - (quantity - reorderPoint)) / quantity) * 100);
      rightStock =  Math.floor(((quantity - reorderPoint) / quantity) * 100);
    }

    return (
      <Fragment>
        <div
          className={classNames({
            [styles.bar]: true,
            [styles.bar__left]: true,
            [styles.stock__low]: isOverStockWithExpired || quantity - expired_quantity > 0,
            [styles.stock__low__expired]: quantity === expired_quantity,
            [styles.hide]: areEqual
          })}
          style={{ width: `${leftStock}%` }}
        >
          {/* { leftStock > 15
            ? (isOverStockWithExpired
              ? reorderPoint
              : (isUnderStock
                ? quantity - expired_quantity
                : reorderPoint - (expired_quantity - (quantity - reorderPoint))
              )
            ) : null
          } */}
        </div>
        <div
          className={classNames({
            [styles.bar]: true,
            [styles.bar__mid__full]: areEqual,
            [styles.stock__over]: isOverStockWithExpired,
            [styles.stock__low__expired]: (expired_quantity - (quantity - reorderPoint)) > 0
          })}
          style={{ width: `${midStock}%` }}
        >
          { areEqual ? quantity : null }
          {/* { midStock > 15
            ? (isOverStockWithExpired
              ? quantity - expired_quantity - reorderPoint
              : (isUnderStock
                ? expired_quantity
                : expired_quantity - (quantity - reorderPoint)
              )
            ) : null
          } */}
        </div>
        <div
          className={classNames({
            [styles.bar]: true,
            [styles.bar__right]: true,
            [styles.stock__over__expired]: quantity > reorderPoint,
            [styles.stock__reorder]: quantity <= reorderPoint,
            [styles.hide]: areEqual
          })}
          style={{ width: `${rightStock}%` }}
        >
          { rightStock > 15 ? quantity : null }
          {/* { rightStock > 15
            ? (isUnderStock
              ? reorderPoint
              : quantity
            ) : null
          } */}
        </div>
      </Fragment>
    );
  };

  const renderDefaultBar = () => {
    const isOverStock = quantity >= reorderPoint;
    const isUnderStock = quantity < reorderPoint;
    
    const overStockLeft = Math.ceil((reorderPoint / quantity) * 100);
    const overStockRight = Math.floor(((quantity - reorderPoint) / quantity) * 100);
  
    const underStockLeft = Math.ceil((quantity / reorderPoint) * 100);
    const underStockRight = Math.floor(((reorderPoint - quantity) / reorderPoint) * 100);
    return (
      <Fragment>
        <div
          className={classNames({
            [styles.bar]: true,
            [styles.bar__left]: true,
            [styles.bar__full]: quantity === reorderPoint,
            [styles.stock__low]: isOverStock,
            [styles.stock__under]: isUnderStock
          })}
          style={{ width: `${isOverStock ? overStockLeft : underStockLeft}%` }}
        >
          { quantity === reorderPoint ? reorderPoint : null }
        </div>
        <div
          className={classNames({
            [styles.bar]: true,
            [styles.bar__right]: true,
            [styles.bar__hide]: quantity === reorderPoint,
            [styles.stock__over]: isOverStock,
            [styles.stock__reorder]: isUnderStock
          })}
          style={{ width: `${isOverStock ? overStockRight : underStockRight}%` }}
        >
          { overStockRight > 10 || underStockRight > 10 ? quantity : null }
          {/* { isOverStock
            ? (overStockRight > 10 ? quantity : null)
            : (underStockRight > 10 ? reorderPoint : null)
          } */}
        </div>
      </Fragment>
    );
  };

  const renderTitle = () => {
    return (
      <Fragment>
        <div>{ `Total Stock: ${quantity}` }</div>
        <div>{ `Fresh Stock: ${quantity - expired_quantity}` }</div>
        <div>{ `Expired Stock: ${expired_quantity}` }</div>
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
              expired_quantity === 0
                ? renderDefaultBar()
                : renderExpiredBar()
            )
          }
        </div>
      </Tooltip>
    </div>
  );
};

export default StockStatusBar;
