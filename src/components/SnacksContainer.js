import CategoryFilter from './CategoryFilter';
import { Container } from '@material-ui/core';
import React from 'react';
import SnackGrid from './SnackGrid';
import {snacks} from '../mockSnacks';
import styles from '../styles/SnacksContainer.module.css';
import { useSelector } from 'react-redux';

const SnacksContainer = () => {
  const snackFilter = useSelector((state) => state.snackReducer);
  const currFilter = snackFilter.categories;
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
        <CategoryFilter />
        <div className={styles.snackGrid}>
          {(currFilter.length === 0) ? (
            <><SnackGrid snacks={snacks.snacks} onClick={alert} />
            </>
          ) : (
            <><SnackGrid snacks={snacks.snacks.filter((item) => {
              return currFilter.includes(item.snack_type);
            })} onClick={alert} />
            </>
          )}
        </div>
      </Container>
    </div>
  );
};
export default SnacksContainer;