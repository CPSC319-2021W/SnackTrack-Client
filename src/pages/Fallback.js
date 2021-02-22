import { Container } from '@material-ui/core';
import React from 'react';
import styles from '../styles/Layout.module.css';

const Fallback = () => {

  return (
    <div className={styles.base}>
      <Container fixed className={styles.content}>
        <h4>Looks like you got lost!</h4>
        <h6>{"Try going back to '/'"}</h6>
      </Container>
    </div>
  );
};

export default Fallback;
