import { Container } from '@material-ui/core';
import React from 'react';
import styles from '../styles/Layout.module.css';

const Fallback = () => {

  return (
    <div className={styles.base}>
      <Container fixed className={styles.content}>
        <div className={styles.message__container}>
          <h2>Uh-oh!</h2>
          <p className={styles.fallback__mainMessage}>
            {'Either you\'re not supposed to be here or we made a mistake.'}
          </p>
          <p className={styles.fallback__subMessage}>
            {'We like to think it\'s not the latter, so head back to the home page and try something else!'}
          </p>
          <p className={styles.fallback__disclaimer}>
            {'Meanwhile, we\'ll go check what those darn squirrels have been up to.'}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Fallback;
