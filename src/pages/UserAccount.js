import React from 'react';
import { useParams } from 'react-router-dom';

import { Container } from '@material-ui/core';
import styles from '../styles/Layout.module.css';

const Fallback = () => {
  const { id } = useParams();

  return (
    <div className={styles.base}>
      <Container fixed className={styles.content}>
        <h4>Account: { id }</h4>
      </Container>
    </div>
  );
};

export default Fallback;
