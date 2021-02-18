import CategoryFilter from './CategoryFilter';
import { Container } from '@material-ui/core';
import React from 'react';
import SnackGrid from './SnackGrid';
import { defaultCategories } from '../constants';
import {snacks} from '../mockSnacks';
import styles from '../styles/SnacksContainer.module.css';
import { useSelector } from 'react-redux';

const SnacksContainer = () => {
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
        <div className={styles.snackGrid}>
          <SnackGrid snacks={snacks.snacks} onClick={alert} />
        </div>
      </Container>
    </div>
  );
};
export default SnacksContainer;