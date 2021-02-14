import '../styles/SnackCard.css';

import { Card, CardActionArea, CardMedia, Typography } from '@material-ui/core';

import NumberFormat from 'react-number-format';
import React from 'react';

const SnackCard = (props) => {
  const { imageUri, snackName, price } = props.snack;

  return (
    <Card>
      <CardActionArea onClick={props.onClick}>
        <CardMedia class='card__image' title={snackName} component='img' src={imageUri} />
        <div class='card__label'>
          <Typography class='card__snackName'>{snackName}</Typography>
          <Typography class='card__price'>
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
