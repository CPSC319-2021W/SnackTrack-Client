import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSnacks } from '../redux/features/snacks/snacksSlice';

import SnacksContainer from '../components/SnacksList/SnacksContainer';
import styles from '../styles/Snacks.module.css';

const Snacks = () => {
  const dispatch = useDispatch();
  const { snacks, categories } = useSelector((state) => state.snacksReducer);

  useEffect(() => {
    dispatch(fetchSnacks());
  }, [dispatch]);

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
      <SnacksContainer snacks={snacks} filters={categories} />
    </div>
  );
};

export default Snacks;
