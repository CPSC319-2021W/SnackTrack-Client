import React from 'react';
import styles from '../styles/SnackListContainer.module.css';
import {Container} from '@material-ui/core';
import CategoryFilter from './CategoryFilter';

const SnackListContainer = () => (
  <div className={styles.root}>
    <Container maxWidth='lg'>
      <div className={styles.header}>
        <div className={styles.leftBox}>
          <p> Snacks List </p>
        </div>
        <div className={styles.suggestBox}>
          <div className={styles.suggestBoxQ}>
            Can&apos;t find what you want?
          </div>
          <div className={styles.suggestBoxLink}>
            <a className={styles.a} href='http://localhost:3000/'>
              Suggest a snack!
            </a>
          </div>
        </div>
      </div>
    </Container>
    <Container maxWidth='lg'>
      <CategoryFilter />
    </Container>
  </div>
);
export default SnackListContainer;
