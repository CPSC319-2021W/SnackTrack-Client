import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addCategory, removeCategory } from '../../redux/features/snacks/snacksSlice';
import FilterIcon from './FilterIcon';

import { CATEGORIES_LIST } from '../../constants';
import styles from '../../styles/Category.module.css';

const CategoryFilter = () => {
  const [categories, setCategories] = useState(CATEGORIES_LIST);  
  const dispatch = useDispatch();

  const addFilter = (category) => dispatch(addCategory(category));
  const removeFilter = (category) => dispatch(removeCategory(category));

  const toggleCategory = (i) => {
    categories[i].selected = !categories[i].selected;
    setCategories([...categories]);
    if (categories[i].selected) {
      addFilter(categories[i].id);
    } else {
      removeFilter(categories[i].id);  
    }
  };
  
  return (
    <div className={styles.container}>
      {categories.map(({name, selected}, i) => (
        <div key={i} className={styles.categoryBox}>
          <button className={styles.buttonToggle} onClick={() => toggleCategory(i)}>
            <FilterIcon type={name} isSelected={selected} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
