import '../styles/HeaderBar.css';

import { AppBar, Typography } from '@material-ui/core';

import NumberFormat from 'react-number-format';
import React from 'react';

const SnackCard = (props) => {
  const { balance, firstName } = props;

  return (
    <AppBar className='header' color='default'>
      {balance ? (
        <div>
          <Typography className='header__balance header--default-text-color'>
            Total Amount Owed
          </Typography>
          <Typography className='header__balance' variant='h4'>
            <NumberFormat
              value={balance / 100}
              displayType={'text'}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={'$'}
            />
          </Typography>
        </div>
      ) : (
        <Typography
          className='header__greeting header--default-text-color'
          align='left'
          variant='h5'
        >
          {`Hi, ${firstName}!`}
        </Typography>
      )}
    </AppBar>
  );
};

export default SnackCard;
