import styles from '../styles/SnackCard.module.css';

import { Card, CardActionArea, CardMedia } from '@material-ui/core';

import NumberFormat from 'react-number-format';
import React from 'react';

const SnackCard = (props) => {
  const { imageUri, snackName, price } = props.snack;

  return (
    <Card className={styles.base}>
      <CardActionArea className={styles.action__area} onClick={props.onClick}>
        <div className={styles.image}>
          <CardMedia
            className={styles.resize__image}
            title={snackName}
            component='img'
            src={imageUri}
          />
        </div>
        <div className={styles.label}>
          <p className={styles.snackName}>{snackName}</p>
          <p className={styles.price}>
            <NumberFormat
              value={price / 100}
              displayType={'text'}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={'$'}
            />
          </p>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default SnackCard;
