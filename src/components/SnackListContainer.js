import CategoryFilter from './CategoryFilter';
import { Container } from '@material-ui/core';
import React from 'react';
import { defaultCategories } from '../constants';
import styles from '../styles/SnackListContainer.module.css';
import { useSelector } from 'react-redux';

const SnackListContainer = () => {
  const snackFilter = useSelector((state) => state.snackReducer);
  return (
    <div>
      <Container>
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
      <Container>
        <CategoryFilter category={defaultCategories} />
        {console.log(`current filter is ${snackFilter.categories}`)}
      </Container>
    </div>
  );
};
export default SnackListContainer;
