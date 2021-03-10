import { Card, CardActionArea, CardMedia } from '@material-ui/core';

import NumberFormat from 'react-number-format';
import React from 'react';
import styles from '../../../styles/SnackCard.module.css';

const SnackCard = (props) => {
  const { snack_id, image_uri, snack_name, price } = props.snack;

  const { onClick } = props;

  return (
    <Card variant={'outlined'} className={styles.base}>
      <CardActionArea className={styles.action_area} onClick={() => onClick(snack_id)}>
        <div className={styles.image}>
          <CardMedia
            className={styles.resize_image}
            title={snack_name}
            component='img'
            src={image_uri}
          />
        </div>
        <div className={styles.label}>
          <p className={styles.snack_name} title={snack_name}>
            {snack_name}
          </p>
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
