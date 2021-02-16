import { useDispatch, useSelector } from 'react-redux';
import { addCategory, removeCategory } from '../redux/features/snackFilterSlice';
import candy from '../images/illustrations/candy.svg';
import styles from '../styles/Category.module.css';
import cookies from '../images/illustrations/cookies.svg';
import chips from '../images/illustrations/chips.svg';
import chocolate from '../images/illustrations/chocolate.svg';
import crackers from '../images/illustrations/crackers.svg';
import fruits from '../images/illustrations/fruits.svg';
import React from 'react';

const category = [
  {
    name: 'Chocolate',
    src: chocolate
  },
  {
    name: 'Candy',
    src: candy
  },
  {
    name: 'Cookies',
    src: cookies
  },
  {
    name: 'Crackers',
    src: crackers
  },
  {
    name: 'Chips',
    src: chips
  },
  {
    name: 'Fruits',
    src: fruits
  }
];

const CategoryBox = ({name, src, selected = false}) => {
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
    {category.map((props, i) => (
      <CategoryBox key={i} {...props} />
    ))}
  </div>
);

export default CategoryFilter;