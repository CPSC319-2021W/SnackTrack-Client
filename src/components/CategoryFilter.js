import React, { useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { addCategory, removeCategory } from '../redux/features/snackSlice';
import FilterIcon from './FilterIcon';

import { CATEGORIES_LIST } from '../constants';
import styles from '../styles/Category.module.css';

const CategoryFilter = () => {
  const [filters, setFilters] = useState([]);
  const [categories, setCategories] = useState(CATEGORIES_LIST);  
  const dispatch = useDispatch();

  const addFilter = (category) => dispatch(addCategory(category));
  const removeFilter = (category) => dispatch(removeCategory(category));

  const toggleCategory = (i) => {
    categories[i].selected = !categories[i].selected;
    setCategories([...categories]);
    if (categories[i].selected) { 
      setFilters([...filters, categories[i].name]); 
      addFilter(categories[i].name);
    } else {
      removeFilter (categories[i].name);
      setFilters([...filters.filter(category => category !== categories[i].name)]);     
    }
  };
  
  return (
    <div className={styles.container}>
      {categories.map(({name, selected}, i) => (
        <div key={i} className={styles.categoryBox}>
          <button className={styles.buttonToggle} onClick={() => toggleCategory(i)}>
            <FilterIcon type={name} isSelected={selected} />
            <p className={classNames({
              [styles.categoryText]: true,
              [styles.selectedText]: selected })}>
              { name }
            </p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
