import { useDispatch, useSelector } from 'react-redux';
import { addCategory, removeCategory } from '../redux/features/snackFilterSlice';
import styles from '../styles/Category.module.css';
import { defaultCategory } from '../constant';
import React from 'react';

const CategoryContainer = ({name, src, selected = false}) => {
  const dispatch = useDispatch();
  const snackFilter = useSelector((state) => state.snackFilterReducer.category);
  const snackFilterSet = (category) => dispatch(addCategory(category));
  const snackFilterDel= (category) => dispatch(removeCategory(category));
  const selectFilter = () => {
    if (!selected) {
      snackFilterSet(name);
      selected = true;
    } else {
      snackFilterDel(name);
      selected = false;
    }
  };
  return (
    <div className={styles.categoryBox}>
      {console.log(snackFilter)}
      <button className={styles.button} onClick={() => selectFilter(name)}>
        <img src={src} className={styles.img} alt={name} />
        <br />
        {name}
      </button>
    </div>
  );
};

const CategoryFilter = () => (
  <div className={styles.container}>
    {defaultCategory.map((props, i) => (
      <CategoryContainer key={i} {...props} />
    ))}
  </div>
);

export default CategoryFilter;