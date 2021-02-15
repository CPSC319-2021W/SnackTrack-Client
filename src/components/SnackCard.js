import '../styles/SnackCard.css';

import { Card, CardActionArea, CardMedia, Typography } from '@material-ui/core';

import NumberFormat from 'react-number-format';
import React from 'react';

const SnackCard = (props) => {
  const { imageUri, snackName, price } = props.snack;

  return (
    <Card>
      <CardActionArea onClick={props.onClick}>
        <div className='card__image'>
          <CardMedia
            className='card--resize-image'
            title={snackName}
            component='img'
            src={imageUri}
          />
        </div>
        <div className='card__label'>
          <Typography className='card__snackName'>{snackName}</Typography>
          <Typography className='card__price'>
            <NumberFormat
              value={price / 100}
              displayType={'text'}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={'$'}
            />
          </Typography>
        </div>
      </CardActionArea>
    </Card>
  );
};

export default SnackCard;
