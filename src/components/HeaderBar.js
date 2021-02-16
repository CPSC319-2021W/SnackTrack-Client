import styles from '../styles/HeaderBar.module.css';

import { AppBar } from '@material-ui/core';

import NumberFormat from 'react-number-format';
import React from 'react';

const HeaderBar = (props) => {
  const { balance, firstName } = props;

  return (
    <AppBar className={styles.header} color='default'>
      {balance !== null ? (
        <div>
          <h6 className={styles.label}>
            Total Amount Owed
          </h6>
          <h3 className={styles.balance}>
            <NumberFormat
              value={balance / 100}
              displayType={'text'}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={'$'}
            />
          </h3>
        </div>
      ) : (
        <h5 className={styles.greeting}>
          {`Hi, ${firstName}!`}
        </h5>
      )}
    </AppBar>
  );
};

export default HeaderBar;
