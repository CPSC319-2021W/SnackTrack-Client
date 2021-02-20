import CategoryFilter from './CategoryFilter';
import React from 'react';
import SnackGrid from './SnackGrid';
import styles from '../styles/SnacksContainer.module.css';
import { useSelector } from 'react-redux';

const SnacksContainer = (props) => {
  const { snacks } = props;
  const snackFilter = useSelector((state) => state.snackReducer);
  const currFilter = snackFilter.categories;

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.leftBox}>
          <p> Snacks </p>
        </div>
        <div className={styles.suggestBox}>
          <div className={styles.suggestBoxQ}>{"Can't find what you want?"}</div>
          <div className={styles.suggestBoxLink}>
            <a className={styles.a} href='http://localhost:3000/'>
              Suggest a snack!
            </a>
          </div>
        </div>
      </div>
      <CategoryFilter />
      <div>
        {currFilter.length === 0 ? (
          <SnackGrid snacks={snacks} onClick={alert} />
        ) : (
          <SnackGrid
            snacks={snacks.filter((item) => {
              return currFilter.includes(item.snack_type);
            })}
            onClick={alert}
          />
        )}
      </div>
    </div>
  );
};

export default SnacksContainer;
