import { Container } from '@material-ui/core';
import React from 'react';
import styles from '../styles/Layout.module.css';

const Unauthorized = () => {
  return (
    <div className={styles.base}>
      <Container fixed className={styles.content}>
        <h4>401 Unauthorized</h4>
        <h6>
          Missing permissions. If you believe this is incorrect, please contact an
          administrator.
        </h6>
      </Container>
    </div>
  );
};

export default Unauthorized;
