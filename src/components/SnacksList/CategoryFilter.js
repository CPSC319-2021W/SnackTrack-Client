import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';

import { addCategory, removeCategory } from '../../redux/features/snacks/snacksSlice';
import FilterIcon from './FilterIcon';

import { CATEGORIES_LIST } from '../../constants';
import styles from '../../styles/Category.module.css';

const CategoryFilter = ({ selectedFilters }) => {
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

  useEffect(() => {
    categories.forEach((category) => {
      selectedFilters.includes(category.id)
        ? category.selected = true
        : category.selected = false;
    });
  });
  
  return (
    <div className={styles.container}>
      {categories.map(({name, selected}, i) => (
        <div key={i} className={styles.categoryBox}>
          <button
            className={classNames({
              [styles.buttonToggle]: true,
              [styles.buttonToggle__lastChild]: i === categories.length - 1
            })}
            onClick={() => toggleCategory(i)}>
            <FilterIcon type={name} isSelected={selected} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
